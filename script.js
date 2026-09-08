const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");

const plusButton = document.getElementById("plusButton");
const toolsMenu = document.getElementById("toolsMenu");

const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");

const thinkButton = document.getElementById("thinkButton");

const cameraButton = document.getElementById("cameraButton");
const cameraInput = document.getElementById("cameraInput");

const photoButton = document.getElementById("photoButton");
const photoInput = document.getElementById("photoInput");

const micButton = document.getElementById("micButton");

const imagePreview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");
const removeImageButton = document.getElementById("removeImageButton");

const newChatButton = document.getElementById("newChatButton");

const historyDrawer =
  document.getElementById("historyDrawer");

const historyOverlay =
  document.getElementById("historyOverlay");

const closeHistoryButton =
  document.getElementById("closeHistoryButton");

const historyList =
  document.getElementById("historyList");


let selectedImage = null;
let thinkMode = false;
let cameraStream = null;

let conversation = JSON.parse(
  localStorage.getItem("aiConversation") || "[]"
);

let chatHistory = JSON.parse(
  localStorage.getItem("aiChatHistory") || "[]"
);

let touchStartX = 0;
let touchStartY = 0;


/* =========================
   SAVE CURRENT CHAT
========================= */

function saveCurrentChatToHistory() {

  if (!conversation.length) {
    return;
  }

  const userMessages =
    conversation.filter(
      function(message) {
        return message.role === "user";
      }
    );

  if (!userMessages.length) {
    return;
  }

  const firstUserMessage =
    userMessages[0];

  let title =
    firstUserMessage.content ||
    "Image conversation";

  if (!title.trim()) {
    title = "Image conversation";
  }

  title =
    title.substring(0, 45);

  const chatObject = {
    id: Date.now(),
    title: title,
    messages: JSON.parse(
      JSON.stringify(conversation)
    )
  };

  chatHistory.unshift(chatObject);

  localStorage.setItem(
    "aiChatHistory",
    JSON.stringify(chatHistory)
  );

}


/* =========================
   IMAGE VIEWER
========================= */

function openImageViewer(imageSrc) {

  let viewer =
    document.getElementById("imageViewer");

  let largeImage;

  if (!viewer) {

    viewer =
      document.createElement("div");

    viewer.id =
      "imageViewer";

    viewer.style.position =
      "fixed";

    viewer.style.inset =
      "0";

    viewer.style.width =
      "100%";

    viewer.style.height =
      "100%";

    viewer.style.background =
      "rgba(0,0,0,0.96)";

    viewer.style.zIndex =
      "99999";

    viewer.style.display =
      "flex";

    viewer.style.alignItems =
      "center";

    viewer.style.justifyContent =
      "center";

    viewer.style.padding =
      "20px";


    largeImage =
      document.createElement("img");

    largeImage.id =
      "viewerImage";

    largeImage.style.display =
      "block";

    largeImage.style.maxWidth =
      "95%";

    largeImage.style.maxHeight =
      "90%";

    largeImage.style.width =
      "auto";

    largeImage.style.height =
      "auto";

    largeImage.style.objectFit =
      "contain";

    largeImage.style.borderRadius =
      "12px";


    const closeButton =
      document.createElement("button");

    closeButton.id =
      "closeImageViewer";

    closeButton.textContent =
      "×";

    closeButton.style.position =
      "absolute";

    closeButton.style.top =
      "15px";

    closeButton.style.right =
      "15px";

    closeButton.style.width =
      "44px";

    closeButton.style.height =
      "44px";

    closeButton.style.border =
      "none";

    closeButton.style.borderRadius =
      "50%";

    closeButton.style.background =
      "#1b211e";

    closeButton.style.color =
      "white";

    closeButton.style.fontSize =
      "28px";

    closeButton.style.lineHeight =
      "44px";

    closeButton.style.padding =
      "0";

    closeButton.style.zIndex =
      "2";

    closeButton.style.cursor =
      "pointer";


    closeButton.addEventListener(
      "click",
      function(event) {

        event.stopPropagation();

        viewer.remove();

      }
    );


    largeImage.addEventListener(
      "click",
      function(event) {

        event.stopPropagation();

      }
    );


    viewer.addEventListener(
      "click",
      function(event) {

        if (event.target === viewer) {

          viewer.remove();

        }

      }
    );


    viewer.appendChild(
      largeImage
    );

    viewer.appendChild(
      closeButton
    );

    document.body.appendChild(
      viewer
    );

  } else {

    largeImage =
      viewer.querySelector("#viewerImage") ||
      viewer.querySelector("img");

  }


  largeImage.src =
    imageSrc;

  viewer.style.display =
    "flex";

}


/* =========================
   NORMAL MESSAGE
========================= */

function addMessage(text, type) {

  const message =
    document.createElement("div");

  message.className =
    "message " + type;

  message.textContent =
    text;

  chatBox.appendChild(
    message
  );


  /* COPY BUTTON FOR AI REPLIES */

  if (type === "ai" && text !== "Thinking...") {

    const copyButton =
  document.createElement("button");

copyButton.type =
  "button";

copyButton.className =
  "copy-reply-button";

copyButton.title =
  "Copy AI reply";

copyButton.innerHTML = `
  <svg
    viewBox="0 0 24 24"
    width="17"
    height="17"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="9" y="9" width="11" height="11" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
`;

copyButton.addEventListener(
  "click",
  async function(event) {

    event.preventDefault();
    event.stopPropagation();

    try {

      await navigator.clipboard.writeText(text);

      copyButton.innerHTML = `
        <svg
          viewBox="0 0 24 24"
          width="17"
          height="17"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;

      setTimeout(
        function() {

          copyButton.innerHTML = `
            <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="9" y="9" width="11" height="11" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          `;

        },
        1500
      );

    } catch (error) {

      console.error(
        "Copy failed:",
        error
      );

    }

  }
);


    chatBox.appendChild(
      copyButton
    );

  }


  chatBox.scrollTop =
    chatBox.scrollHeight;

  return message;

}


/* =========================
   SAVE TEXT MESSAGE
========================= */

function saveMessage(text, role) {

  conversation.push({

    role: role,

    content: text,

    type: "text"

  });

  localStorage.setItem(
    "aiConversation",
    JSON.stringify(conversation)
  );

}


/* =========================
   SAVE IMAGE MESSAGE
========================= */

function saveImageMessage(
  imageData,
  text
) {

  conversation.push({

    role: "user",

    content: text || "",

    type: "image",

    image: imageData

  });

  localStorage.setItem(
    "aiConversation",
    JSON.stringify(conversation)
  );

}


/* =========================
   IMAGE PREVIEW
========================= */

function showImagePreview(file) {

  if (!file) {
    return;
  }

  if (
    !file.type ||
    !file.type.startsWith("image/")
  ) {

    fileName.textContent =
      "Please select an image.";

    return;

  }

  selectedImage =
    file;

  const reader =
    new FileReader();

  reader.onload =
    function(event) {

      const imageData =
        event.target.result;

      previewImage.src =
        imageData;

      imagePreview.style.display =
        "block";

      fileName.textContent =
        file.name || "Image selected";

      previewImage.style.cursor =
        "pointer";

      previewImage.onclick =
        function(event) {

          event.preventDefault();

          event.stopPropagation();

          openImageViewer(
            imageData
          );

        };

    };

  reader.readAsDataURL(file);

}


/* =========================
   REMOVE IMAGE
========================= */

removeImageButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    event.stopPropagation();

    selectedImage = null;

    previewImage.src = "";

    imagePreview.style.display =
      "none";

    photoInput.value = "";

    cameraInput.value = "";

    fileInput.value = "";

    fileName.textContent = "";

  }
);


/* =========================
   DISPLAY SENT IMAGE
========================= */

function addSavedImage(
  imageData,
  text
) {

  const imageContainer =
    document.createElement("div");

  imageContainer.className =
    "sent-image";

  imageContainer.style.alignSelf =
    "flex-end";

  imageContainer.style.width =
    "fit-content";

  imageContainer.style.maxWidth =
    "220px";

  imageContainer.style.margin =
    "0";

  imageContainer.style.padding =
    "0";

  imageContainer.style.background =
    "transparent";


  const image =
    document.createElement("img");

  image.src =
    imageData;

  image.alt =
    "Sent image";

  image.style.display =
    "block";

  image.style.width =
    "auto";

  image.style.maxWidth =
    "220px";

  image.style.maxHeight =
    "220px";

  image.style.height =
    "auto";

  image.style.objectFit =
    "contain";

  image.style.borderRadius =
    "14px";

  image.style.cursor =
    "pointer";


  image.addEventListener(
    "click",
    function(event) {

      event.preventDefault();

      event.stopPropagation();

      openImageViewer(
        imageData
      );

    }
  );


  imageContainer.appendChild(
    image
  );

  chatBox.appendChild(
    imageContainer
  );


  if (text) {

    const textMessage =
      document.createElement("div");

    textMessage.className =
      "message user";

    textMessage.textContent =
      text;

    chatBox.appendChild(
      textMessage
    );

  }


  chatBox.scrollTop =
    chatBox.scrollHeight;

}


/* =========================
   CAMERA
========================= */

function openCamera() {

  if (
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getUserMedia
  ) {

    cameraInput.click();

    return;

  }


  const cameraViewer =
    document.createElement("div");

  cameraViewer.id =
    "cameraViewer";

  cameraViewer.style.position =
    "fixed";

  cameraViewer.style.inset =
    "0";

  cameraViewer.style.width =
    "100%";

  cameraViewer.style.height =
    "100%";

  cameraViewer.style.background =
    "#000";

  cameraViewer.style.zIndex =
    "100000";

  cameraViewer.style.display =
    "flex";

  cameraViewer.style.flexDirection =
    "column";

  cameraViewer.style.alignItems =
    "center";

  cameraViewer.style.justifyContent =
    "center";

  cameraViewer.style.padding =
    "20px";


  const video =
    document.createElement("video");

  video.autoplay =
    true;

  video.playsInline =
    true;

  video.muted =
    true;

  video.style.width =
    "100%";

  video.style.maxWidth =
    "600px";

  video.style.maxHeight =
    "75vh";

  video.style.objectFit =
    "cover";

  video.style.borderRadius =
    "16px";


  const controls =
    document.createElement("div");

  controls.style.display =
    "flex";

  controls.style.alignItems =
    "center";

  controls.style.justifyContent =
    "center";

  controls.style.gap =
    "20px";

  controls.style.marginTop =
    "20px";


  const captureButton =
    document.createElement("button");

  captureButton.textContent =
    "Capture";

  captureButton.style.width =
    "110px";

  captureButton.style.height =
    "44px";

  captureButton.style.border =
    "none";

  captureButton.style.borderRadius =
    "22px";

  captureButton.style.background =
    "#26332c";

  captureButton.style.color =
    "white";

  captureButton.style.fontSize =
    "15px";

  captureButton.style.cursor =
    "pointer";


  const closeButton =
    document.createElement("button");

  closeButton.textContent =
    "Cancel";

  closeButton.style.width =
    "90px";

  closeButton.style.height =
    "44px";

  closeButton.style.border =
    "1px solid #303833";

  closeButton.style.borderRadius =
    "22px";

  closeButton.style.background =
    "#1b211e";

  closeButton.style.color =
    "white";

  closeButton.style.fontSize =
    "15px";

  closeButton.style.cursor =
    "pointer";


  controls.appendChild(
    captureButton
  );

  controls.appendChild(
    closeButton
  );

  cameraViewer.appendChild(
    video
  );

  cameraViewer.appendChild(
    controls
  );

  document.body.appendChild(
    cameraViewer
  );


  function closeCamera() {

    if (cameraStream) {

      cameraStream
        .getTracks()
        .forEach(
          function(track) {
            track.stop();
          }
        );

      cameraStream = null;

    }

    cameraViewer.remove();

  }


  closeButton.addEventListener(
    "click",
    closeCamera
  );


  captureButton.addEventListener(
    "click",
    function() {

      if (!video.videoWidth) {
        return;
      }

      const canvas =
        document.createElement("canvas");

      canvas.width =
        video.videoWidth;

      canvas.height =
        video.videoHeight;

      const context =
        canvas.getContext("2d");

      context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );


      canvas.toBlob(
        function(blob) {

          if (!blob) {
            return;
          }

          const file =
            new File(
              [blob],
              "camera-photo.jpg",
              {
                type: "image/jpeg"
              }
            );

          closeCamera();

          showImagePreview(file);

        },
        "image/jpeg",
        0.92
      );

    }
  );


  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: {
          ideal: "environment"
        }
      },
      audio: false
    })
    .then(
      function(stream) {

        cameraStream =
          stream;

        video.srcObject =
          stream;

      }
    )
    .catch(
      function(error) {

        console.error(
          "Camera error:",
          error
        );

        closeCamera();

        fileName.textContent =
          "Camera permission was not available.";

        setTimeout(
          function() {
            cameraInput.click();
          },
          300
        );

      }
    );

}


/* =========================
   SEND MESSAGE
========================= */

async function sendMessage() {

  const text =
    userInput.value.trim();

  if (
    !text &&
    !selectedImage
  ) {
    return;
  }


  const imageToSend =
    selectedImage;

  let imageDataForAPI =
    null;


  if (imageToSend) {

    try {

      imageDataForAPI =
        await fileToBase64(
          imageToSend
        );

    } catch (error) {

      console.error(
        "Image conversion failed:",
        error
      );

      addMessage(
        "Unable to read the selected image.",
        "ai"
      );

      return;

    }


    addSavedImage(
      imageDataForAPI,
      text
    );

    saveImageMessage(
      imageDataForAPI,
      text
    );

  } else {

    addMessage(
      text,
      "user"
    );

    saveMessage(
      text,
      "user"
    );

  }


  userInput.value = "";

  userInput.style.height =
    "44px";

  selectedImage = null;

  previewImage.src = "";

  imagePreview.style.display =
    "none";

  photoInput.value = "";

  cameraInput.value = "";

  fileInput.value = "";

  fileName.textContent = "";

  toolsMenu.classList.remove("open");


  const thinkingMessage =
    addMessage(
      "Thinking...",
      "ai"
    );


  try {

    const response =
      await fetch(
        "http://localhost:3000/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            message:
              text,

            conversation:
              conversation,

            image:
              imageDataForAPI,

            thinkMode:
              thinkMode

          })

        }
      );


    if (!response.ok) {

      throw new Error(
        "Server returned " +
        response.status
      );

    }


    const data =
      await response.json();


    thinkingMessage.remove();


    const reply =
      data.reply ||
      data.message ||
      data.response ||
      "I received your message.";


    addMessage(
      reply,
      "ai"
    );

    saveMessage(
      reply,
      "assistant"
    );


  } catch (error) {

    console.error(
      "AI server error:",
      error
    );

    thinkingMessage.remove();

    addMessage(
      "Unable to connect to the AI server.",
      "ai"
    );

  }

}


/* =========================
   FILE TO BASE64
========================= */

function fileToBase64(file) {

  return new Promise(
    function(resolve, reject) {

      const reader =
        new FileReader();

      reader.onload =
        function() {
          resolve(reader.result);
        };

      reader.onerror =
        function() {
          reject(reader.error);
        };

      reader.readAsDataURL(file);

    }
  );

}


/* =========================
   SEND BUTTON
========================= */

sendButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    sendMessage();

  }
);


/* =========================
   ENTER TO SEND
========================= */

userInput.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();

    }

  }
);


/* =========================
   AUTO GROW
========================= */

userInput.addEventListener(
  "input",
  function() {

    this.style.height =
      "44px";

    this.style.height =
      Math.min(
        this.scrollHeight,
        100
      ) + "px";

  }
);


/* =========================
   PLUS BUTTON
========================= */

plusButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    event.stopPropagation();

    toolsMenu.classList.toggle("open");

  }
);


/* =========================
   UPLOAD
========================= */

uploadButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    event.stopPropagation();

    fileInput.click();

  }
);


/* =========================
   FILE SELECTED
========================= */

fileInput.addEventListener(
  "change",
  function() {

    if (!this.files.length) {
      return;
    }

    const file =
      this.files[0];

    if (
      file.type &&
      file.type.startsWith("image/")
    ) {

      showImagePreview(file);

    } else {

      fileName.textContent =
        "Selected: " +
        file.name;

    }

  }
);


/* =========================
   PHOTO BUTTON
========================= */

photoButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    event.stopPropagation();

    photoInput.click();

  }
);


/* =========================
   PHOTO SELECTED
========================= */

photoInput.addEventListener(
  "change",
  function() {

    if (!this.files.length) {
      return;
    }

    showImagePreview(
      this.files[0]
    );

  }
);


/* =========================
   CAMERA BUTTON
========================= */

cameraButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    event.stopPropagation();

    toolsMenu.classList.remove("open");

    openCamera();

  }
);


/* =========================
   CAMERA INPUT
========================= */

cameraInput.addEventListener(
  "change",
  function() {

    if (!this.files.length) {
      return;
    }

    showImagePreview(
      this.files[0]
    );

  }
);


/* =========================
   THINK MODE
========================= */

thinkButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    event.stopPropagation();

    thinkMode =
      !thinkMode;

    this.classList.toggle(
      "active",
      thinkMode
    );

    fileName.textContent =
      thinkMode
        ? "Think mode enabled"
        : "Think mode disabled";

  }
);


/* =========================
   MICROPHONE
========================= */

micButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    event.stopPropagation();

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      fileName.textContent =
        "Voice input is not supported on this browser.";

      return;

    }


    const recognition =
      new SpeechRecognition();

    recognition.lang =
      "en-US";

    recognition.interimResults =
      false;

    recognition.maxAlternatives =
      1;

    recognition.start();

    fileName.textContent =
      "Listening...";


    recognition.onresult =
      function(event) {

        const transcript =
          event.results[0][0]
            .transcript;

        userInput.value +=
          (
            userInput.value
              ? " "
              : ""
          ) +
          transcript;

        userInput.dispatchEvent(
          new Event("input")
        );

        fileName.textContent =
          "";

      };


    recognition.onerror =
      function(event) {

        console.error(
          "Voice input error:",
          event
        );

        fileName.textContent =
          "Voice input failed.";

      };


    recognition.onend =
      function() {

        if (
          fileName.textContent ===
          "Listening..."
        ) {

          fileName.textContent =
            "";

        }

      };

  }
);


/* =========================
   NEW CHAT
========================= */

newChatButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    event.stopPropagation();


    const confirmed =
      confirm(
        "Start a new chat? Your current conversation will be saved in Chat History."
      );


    if (!confirmed) {
      return;
    }


    /* SAVE CURRENT CHAT */

    saveCurrentChatToHistory();


    /* STOP CAMERA */

    if (cameraStream) {

      cameraStream
        .getTracks()
        .forEach(
          function(track) {
            track.stop();
          }
        );

      cameraStream = null;

    }


    const cameraViewer =
      document.getElementById(
        "cameraViewer"
      );

    if (cameraViewer) {
      cameraViewer.remove();
    }


    const imageViewer =
      document.getElementById(
        "imageViewer"
      );

    if (imageViewer) {
      imageViewer.remove();
    }


    /* CLEAR CURRENT CHAT */

    conversation = [];

    localStorage.removeItem(
      "aiConversation"
    );


    chatBox.innerHTML =
      "";

    addMessage(
      "Hello! How can I help you today?",
      "ai"
    );


    userInput.value =
      "";

    userInput.style.height =
      "44px";


    selectedImage =
      null;

    previewImage.src =
      "";

    imagePreview.style.display =
      "none";


    photoInput.value =
      "";

    cameraInput.value =
      "";

    fileInput.value =
      "";

    fileName.textContent =
      "";


    thinkMode =
      false;

    thinkButton.classList.remove(
      "active"
    );


    toolsMenu.classList.remove(
      "open"
    );

  }
);


/* =========================
   HISTORY DRAWER
========================= */

function openHistoryDrawer() {

  historyDrawer.classList.add("open");

  historyOverlay.classList.add("open");

  updateHistoryList();

}


function closeHistoryDrawer() {

  historyDrawer.classList.remove("open");

  historyOverlay.classList.remove("open");

}


closeHistoryButton.addEventListener(
  "click",
  function() {

    closeHistoryDrawer();

  }
);


historyOverlay.addEventListener(
  "click",
  function() {

    closeHistoryDrawer();

  }
);


/* =========================
   SWIPE DRAWER — ANYWHERE
========================= */

document.addEventListener(
  "touchstart",
  function(event) {

    if (!event.touches.length) {
      return;
    }

    touchStartX =
      event.touches[0].clientX;

    touchStartY =
      event.touches[0].clientY;

  },
  { passive: true }
);


document.addEventListener(
  "touchend",
  function(event) {

    if (!event.changedTouches.length) {
      return;
    }

    const touchEndX =
      event.changedTouches[0].clientX;

    const touchEndY =
      event.changedTouches[0].clientY;

    const differenceX =
      touchEndX - touchStartX;

    const differenceY =
      Math.abs(
        touchEndY - touchStartY
      );


    /* =========================
       OPEN FROM ANYWHERE
    ========================= */

    if (
      differenceX > 70 &&
      differenceY < 100 &&
      !historyDrawer.classList.contains("open")
    ) {

      openHistoryDrawer();

      return;

    }


    /* =========================
       CLOSE DRAWER
    ========================= */

    if (
      historyDrawer.classList.contains("open") &&
      differenceX < -70 &&
      differenceY < 100
    ) {

      closeHistoryDrawer();

    }

  },
  { passive: true }
);


/* =========================
   UPDATE HISTORY LIST
========================= */

function updateHistoryList() {

  historyList.innerHTML = "";


  if (!chatHistory.length) {

    const empty =
      document.createElement("div");

    empty.className =
      "history-empty";

    empty.textContent =
      "No chat history yet.";

    historyList.appendChild(
      empty
    );

    return;

  }


  chatHistory.forEach(
    function(chat) {

      const item =
        document.createElement("div");

      item.className =
        "history-item";


      const title =
        document.createElement("div");

      title.className =
        "history-item-title";

      title.textContent =
        chat.title;


      item.appendChild(
        title
      );


      item.addEventListener(
        "click",
        function() {

          loadChatFromHistory(
            chat.id
          );

        }
      );


      historyList.appendChild(
        item
      );

    }
  );

}


/* =========================
   LOAD CHAT FROM HISTORY
========================= */

function loadChatFromHistory(chatId) {

  const selectedChat =
    chatHistory.find(
      function(chat) {
        return chat.id === chatId;
      }
    );


  if (!selectedChat) {
    return;
  }


  conversation =
    JSON.parse(
      JSON.stringify(
        selectedChat.messages
      )
    );


  localStorage.setItem(
    "aiConversation",
    JSON.stringify(conversation)
  );


  chatBox.innerHTML =
    "";


  conversation.forEach(
    function(message) {

      if (
        message.type === "image" &&
        message.image
      ) {

        addSavedImage(
          message.image,
          message.content
        );

      } else {

        addMessage(
          message.content || "",
          message.role === "user"
            ? "user"
            : "ai"
        );

      }

    }
  );


  chatBox.scrollTop =
    chatBox.scrollHeight;


  closeHistoryDrawer();

}


/* =========================
   RESTORE CURRENT CHAT
========================= */

function restoreConversation() {

  if (!conversation.length) {
    return;
  }


  chatBox.innerHTML =
    "";


  conversation.forEach(
    function(message) {

      if (
        message.type === "image" &&
        message.image
      ) {

        addSavedImage(
          message.image,
          message.content
        );

        return;

      }


      addMessage(
        message.content || "",
        message.role === "user"
          ? "user"
          : "ai"
      );

    }
  );


  chatBox.scrollTop =
    chatBox.scrollHeight;

}


/* =========================
   START APP
========================= */

restoreConversation();