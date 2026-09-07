const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");

const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const micButton = document.getElementById("micButton");
const thinkButton = document.getElementById("thinkButton");

let selectedFile = null;
let thinkHarder = false;
let recognition = null;
let isListening = false;


// Add message to chat
function addMessage(text, type) {
  const message = document.createElement("div");

  message.className = "message " + type;
  message.textContent = text;

  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;

  return message;
}


// THINK HARDER
thinkButton.addEventListener("click", function () {
  thinkHarder = !thinkHarder;

  thinkButton.classList.toggle("active", thinkHarder);

  if (thinkHarder) {
    thinkButton.textContent = "🧠 Think harder ✓";
  } else {
    thinkButton.textContent = "🧠 Think harder";
  }
});


// FILE UPLOAD
uploadButton.addEventListener("click", function () {
  fileInput.click();
});


fileInput.addEventListener("change", function () {
  if (fileInput.files.length > 0) {
    selectedFile = fileInput.files[0];

    fileName.textContent = "📎 " + selectedFile.name;
    fileName.style.display = "block";
  }
});

// SPEECH TO TEXT
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {

  recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onstart = function () {
    isListening = true;
    micButton.textContent = "⏹";
    micButton.classList.add("active");
  };

  recognition.onend = function () {
    isListening = false;
    micButton.textContent = "🎤";
    micButton.classList.remove("active");
  };

  recognition.onresult = function (event) {

    const speechText =
      event.results[0][0].transcript;

    userInput.value +=
      (userInput.value ? " " : "") + speechText;

    userInput.focus();

    // Make textarea grow
    userInput.style.height = "auto";
    userInput.style.height =
      Math.min(userInput.scrollHeight, 130) + "px";
  };

  recognition.onerror = function (event) {

    console.error(
      "Speech recognition error:",
      event.error
    );

    isListening = false;
    micButton.textContent = "🎤";
    micButton.classList.remove("active");

    if (event.error === "not-allowed") {
      alert("Please allow microphone permission for this website.");
    }
  };

} else {

  micButton.disabled = true;

  micButton.title =
    "Speech recognition is not supported in this browser";

}


// MICROPHONE BUTTON
micButton.addEventListener("click", function () {

  if (!recognition) {
    alert(
      "Speech-to-text is not supported by this browser. Try Chrome."
    );
    return;
  }

  if (isListening) {

    recognition.stop();

  } else {

    try {
      recognition.start();
    } catch (error) {
      console.error(error);
    }

  }

});


// AUTO-GROW TEXT BOX
userInput.addEventListener("input", function () {

  userInput.style.height = "auto";

  userInput.style.height =
    Math.min(userInput.scrollHeight, 130) + "px";

});


// SEND MESSAGE
async function sendMessage() {

  const message = userInput.value.trim();

  // Don't send if there is nothing
  if (!message && !selectedFile) return;

  // Show user's message
  if (message) {
    addMessage(message, "user");
  }

  // Show uploaded file
  if (selectedFile) {
    addMessage("📎 " + selectedFile.name, "user");
  }

  // Clear input
  userInput.value = "";
  userInput.style.height = "auto";

  // Show loading
  const thinkingMessage =
    addMessage("AI is thinking...", "ai");

  try {

    const response = await fetch(
      "http://127.0.0.1:3000/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          message: message,

          thinkHarder: thinkHarder,

          fileName: selectedFile
            ? selectedFile.name
            : null

        })
      }
    );

    if (!response.ok) {
      throw new Error("Server returned an error");
    }

    const data = await response.json();

    thinkingMessage.remove();

    if (data.reply) {

      addMessage(data.reply, "ai");

    } else {

      addMessage(
        "Sorry, I couldn't get a response.",
        "ai"
      );

    }

  } catch (error) {

    console.error("Connection error:", error);

    thinkingMessage.remove();

    addMessage(
      "Unable to connect to the AI backend.",
      "ai"
    );
  }

  // Clear selected file
  selectedFile = null;
  fileInput.value = "";
  fileName.textContent = "";
  fileName.style.display = "none";
}


// SEND BUTTON
sendButton.addEventListener(
  "click",
  sendMessage
);


// ENTER TO SEND
userInput.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Enter" && !event.shiftKey) {

      event.preventDefault();

      sendMessage();

    }

  }
);