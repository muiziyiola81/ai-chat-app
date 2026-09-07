const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");

function addMessage(text, type) {
const message = document.createElement("div");
message.className = "message " + type;
message.textContent = text;

chatBox.appendChild(message);
chatBox.scrollTop = chatBox.scrollHeight;

return message;
}

async function sendMessage() {
const message = userInput.value.trim();

if (!message) return;

addMessage(message, "user");
userInput.value = "";

// Show loading message
const thinkingMessage = addMessage("AI is thinking...", "ai");

try {
const response = await fetch("http://127.0.0.1:3000/chat", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
message: message
})
});

if (!response.ok) {
  throw new Error("Server returned an error");
}

const data = await response.json();

// Remove loading message
thinkingMessage.remove();

if (data.reply) {
  addMessage(data.reply, "ai");
} else {
  addMessage("Sorry, I couldn't get a response.", "ai");
}

} catch (error) {
console.error("Connection error:", error);

// Remove loading message
thinkingMessage.remove();

addMessage("Unable to connect to the AI backend.", "ai");

}
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function (event) {
if (event.key === "Enter") {
event.preventDefault();
sendMessage();
}
});