const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

app.use(
  express.json({
    limit: "25mb"
  })
);

// Serve your frontend files
app.use(express.static(__dirname));

// OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// AI chat
app.post("/chat", async (req, res) => {
  try {
    const {
      message = "",
      conversation = [],
      image = null,
      thinkMode = false
    } = req.body;

    if (!message && !image) {
      return res.status(400).json({
        reply: "Please enter a message."
      });
    }

    const input = [];

    // Rebuild the conversation
    if (Array.isArray(conversation)) {
      for (const item of conversation) {
        if (!item || !item.role) continue;

        // Image message
        if (item.type === "image" && item.image) {
          const content = [];

          if (item.content) {
            content.push({
              type: "input_text",
              text: String(item.content)
            });
          }

          content.push({
            type: "input_image",
            image_url: item.image
          });

          input.push({
            role: "user",
            content
          });

          continue;
        }

        // Normal text message
        if (item.content) {
          input.push({
            role: item.role === "assistant" ? "assistant" : "user",
            content: String(item.content)
          });
        }
      }
    }

    // If the frontend didn't include the current message in
    // conversation, add it here.
    const lastMessage = conversation[conversation.length - 1];

    const currentAlreadyIncluded =
      lastMessage &&
      lastMessage.role === "user" &&
      String(lastMessage.content || "") === String(message || "") &&
      (!image || lastMessage.image === image);

    if (!currentAlreadyIncluded) {
      const currentContent = [];

      if (message) {
        currentContent.push({
          type: "input_text",
          text: String(message)
        });
      }

      if (image) {
        currentContent.push({
          type: "input_image",
          image_url: image
        });
      }

      input.push({
        role: "user",
        content: currentContent
      });
    }

    // Ask OpenAI
    const responseOptions = {
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      input: input
    };

    // Enable extra reasoning when Think Mode is selected.
    if (thinkMode) {
      responseOptions.reasoning = {
        effort: "medium"
      };
    }

    const response = await client.responses.create(responseOptions);

    const reply =
      response.output_text ||
      "I received your message, but I couldn't generate a response.";

    res.json({
      reply
    });

  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      reply: "Sorry, something went wrong while connecting to the AI."
    });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`GPT Hub server running on port ${PORT}`);
});