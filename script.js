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

let selectedImage = null;
let thinkMode = false;
let cameraStream = null;

let conversation = JSON.parse(
  localStorage.getItem("aiConversation") || "[]"
);


/* =========================
   IMAGE VIEWER
========================= */

function openImageViewer(imageSrc) {

  let viewer = document.getElementById("imageViewer");
  let largeImage;

  if (!viewer) {

    viewer = document.createElement("div");

    viewer.id = "imageViewer";

    viewer.style.position = "fixed";
    viewer.style.inset = "0";
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    viewer.style.background = "rgba(0,0,0,0.96)";
    viewer.style.zIndex = "99999";
    viewer.style.display = "flex";
    viewer.style.alignItems = "center";
    viewer.style.justifyContent = "center";
    viewer.style.padding = "20px";

    largeImage = document.createElement("img");

    largeImage.id = "viewerImage";

    largeImage.style.display = "block";
    largeImage.style.maxWidth = "95%";
    largeImage.style.maxHeight = "90%";
    largeImage.style.width = "auto";
    largeImage.style.height = "auto";
    largeImage.style.objectFit = "contain";
    largeImage.style.borderRadius = "12px";

    const closeButton =
      document.createElement("button");

    closeButton.id = "closeImageViewer";

    closeButton.textContent = "×";

    closeButton.style.position = "absolute";
    closeButton.style.top = "15px";
    closeButton.style.right = "15px";
    closeButton.style.width = "44px";
    closeButton.style.height = "44px";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "50%";
    closeButton.style.background = "#1b211e";
    closeButton.style.color = "white";
    closeButton.style.fontSize = "28px";
    closeButton.style.lineHeight = "44px";
    closeButton.style.padding = "0";
    closeButton.style.zIndex = "2";
    closeButton.style.cursor = "pointer";

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

  reader.readAsDataURL(
    file
  );

}


/* =========================
   REMOVE SELECTED IMAGE
========================= */

removeImageButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    event.stopPropagation();

    selectedImage = null;

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
   CAMERA WINDOW
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

  video.id =
    "cameraVideo";

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

      cameraStream =
        null;

    }

    cameraViewer.remove();

  }


  closeButton.addEventListener(
    "click",
    function() {

      closeCamera();

    }
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

          showImagePreview(
            file
          );

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
          "Camera permission was not available. Opening camera option...";

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

  toolsMenu.classList.remove(
    "open"
  );


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

          resolve(
            reader.result
          );

        };

      reader.onerror =
        function() {

          reject(
            reader.error
          );

        };

      reader.readAsDataURL(
        file
      );

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

    toolsMenu.classList.toggle(
      "open"
    );

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

      showImagePreview(
        file
      );

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

    toolsMenu.classList.remove(
      "open"
    );

    openCamera();

  }
);


/* =========================
   CAMERA INPUT FALLBACK
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
   RESTORE CONVERSATION
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