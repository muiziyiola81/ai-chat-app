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

const historyDrawer = document.getElementById("historyDrawer");
const historyOverlay = document.getElementById("historyOverlay");
const closeHistoryButton = document.getElementById("closeHistoryButton");
const historyList = document.getElementById("historyList");


/* =========================
   THREE DOT MENU
========================= */

const settingsButton =
  document.getElementById("settingsButton");

const themeMenu =
  document.getElementById("themeMenu");

const upgradeMenuButton =
  document.getElementById("upgradeMenuButton");

const darkThemeButton =
  document.getElementById("darkThemeButton");

const lightThemeButton =
  document.getElementById("lightThemeButton");

const darkCheck =
  document.getElementById("darkCheck");

const lightCheck =
  document.getElementById("lightCheck");


/* =========================
   PRO SCREEN
========================= */

const proScreen =
  document.getElementById("proScreen");

const closeProButton =
  document.getElementById("closeProButton");

const upgradeProButton =
  document.getElementById("upgradeProButton");


/* =========================
   PAYMENT CHOICE
========================= */

const paymentScreen =
  document.getElementById("paymentScreen");

const closePaymentButton =
  document.getElementById("closePaymentButton");

const cardPaymentButton =
  document.getElementById("cardPaymentButton");

const cryptoPaymentButton =
  document.getElementById("cryptoPaymentButton");


/* =========================
   CRYPTO SCREEN
========================= */

const cryptoScreen =
  document.getElementById("cryptoScreen");

const closeCryptoButton =
  document.getElementById("closeCryptoButton");

const bitcoinButton =
  document.getElementById("bitcoinButton");

const ethereumButton =
  document.getElementById("ethereumButton");

const usdtButton =
  document.getElementById("usdtButton");


/* =========================
   CRYPTO DETAILS
========================= */

const cryptoDetailsScreen =
  document.getElementById("cryptoDetailsScreen");

const closeCryptoDetailsButton =
  document.getElementById("closeCryptoDetailsButton");

const selectedCryptoIcon =
  document.getElementById("selectedCryptoIcon");

const selectedCryptoName =
  document.getElementById("selectedCryptoName");

const selectedCryptoSubtitle =
  document.getElementById("selectedCryptoSubtitle");


/* =========================
   SAFE LOCAL STORAGE LOADING
========================= */

function loadArrayFromStorage(key) {

  try {

    const saved =
      localStorage.getItem(key);

    if (!saved) {
      return [];
    }

    const parsed =
      JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch (error) {

    console.error(
      "Failed to load " + key + ":",
      error
    );

    return [];
  }
}


/* =========================
   STATE
========================= */

let selectedImage = null;
let thinkMode = false;
let cameraStream = null;

let conversation =
  loadArrayFromStorage("aiConversation");

let chatHistory =
  loadArrayFromStorage("aiChatHistory");

let touchStartX = 0;


/* =========================
   THREE DOT MENU
========================= */

if (
  settingsButton &&
  themeMenu
) {

  settingsButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      themeMenu.classList.toggle("open");

      if (toolsMenu) {
        toolsMenu.classList.remove("open");
      }

    }
  );

}


/* =========================
   UPGRADE TO PRO
========================= */

if (upgradeMenuButton) {

  upgradeMenuButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (themeMenu) {
        themeMenu.classList.remove("open");
      }

      if (proScreen) {
        proScreen.classList.add("open");
      }

    }
  );

}


/* =========================
   PRO → PAYMENT
========================= */

if (upgradeProButton) {

  upgradeProButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (proScreen) {
        proScreen.classList.remove("open");
      }

      if (paymentScreen) {
        paymentScreen.classList.add("open");
      }

    }
  );

}


/* =========================
   CLOSE MENUS OUTSIDE
========================= */

document.addEventListener(
  "click",
  function(event) {

    if (
      themeMenu &&
      settingsButton &&
      !themeMenu.contains(event.target) &&
      !settingsButton.contains(event.target)
    ) {

      themeMenu.classList.remove("open");

    }

    if (
      toolsMenu &&
      plusButton &&
      !toolsMenu.contains(event.target) &&
      !plusButton.contains(event.target)
    ) {

      toolsMenu.classList.remove("open");

    }

  }
);


/* =========================
   CLOSE PRO
========================= */

if (closeProButton) {

  closeProButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (proScreen) {
        proScreen.classList.remove("open");
      }

    }
  );

}


/* =========================
   PAYMENT SCREEN
========================= */

if (closePaymentButton) {

  closePaymentButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (paymentScreen) {
        paymentScreen.classList.remove("open");
      }

    }
  );

}


/* =========================
   CARD PAYMENT
========================= */

if (cardPaymentButton) {

  cardPaymentButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      /*
        Card payment will be connected later.
      */

    }
  );

}


/* =========================
   OPEN CRYPTO PAYMENT
========================= */

if (cryptoPaymentButton) {

  cryptoPaymentButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (paymentScreen) {
        paymentScreen.classList.remove("open");
      }

      if (cryptoScreen) {
        cryptoScreen.classList.add("open");
      }

    }
  );

}


/* =========================
   CLOSE CRYPTO
========================= */

if (closeCryptoButton) {

  closeCryptoButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (cryptoScreen) {
        cryptoScreen.classList.remove("open");
      }

    }
  );

}


/* =========================
   BITCOIN → PAYMENT PAGE
========================= */

if (bitcoinButton) {

  bitcoinButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      window.location.href =
        "bitcoin-payment.html";

    }
  );

}


/* =========================
   ETHEREUM
========================= */


if (ethereumButton) {
  ethereumButton.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();

    window.location.href = "ethereum-payment.html";
  });
}

/* =========================
   USDT
========================= */

if (usdtButton) {

  usdtButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      openCryptoDetails(
        "₮",
        "USDT",
        "Tether"
      );

    }
  );

}


/* =========================
   OPEN CRYPTO DETAILS
========================= */

function openCryptoDetails(
  icon,
  name,
  symbol
) {

  if (cryptoScreen) {
    cryptoScreen.classList.remove("open");
  }

  if (selectedCryptoIcon) {
    selectedCryptoIcon.textContent =
      icon;
  }

  if (selectedCryptoName) {
    selectedCryptoName.textContent =
      name;
  }

  if (selectedCryptoSubtitle) {
    selectedCryptoSubtitle.textContent =
      name +
      " payment (" +
      symbol +
      ")";
  }

  if (cryptoDetailsScreen) {
    cryptoDetailsScreen.classList.add("open");
  }

}


/* =========================
   CLOSE CRYPTO DETAILS
========================= */

if (closeCryptoDetailsButton) {

  closeCryptoDetailsButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (cryptoDetailsScreen) {

        cryptoDetailsScreen.classList.remove(
          "open"
        );

      }

    }
  );

}


/* =========================
   THEME
========================= */

function updateThemeChecks() {

  const currentTheme =
    localStorage.getItem("gptHubTheme") ||
    "dark";

  if (darkCheck) {

    darkCheck.style.display =
      currentTheme === "dark"
        ? "inline"
        : "none";

  }

  if (lightCheck) {

    lightCheck.style.display =
      currentTheme === "light"
        ? "inline"
        : "none";

  }

}


function setTheme(theme) {

  document.body.classList.toggle(
    "light-theme",
    theme === "light"
  );

  localStorage.setItem(
    "gptHubTheme",
    theme
  );

  updateThemeChecks();

}


if (darkThemeButton) {

  darkThemeButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      setTheme("dark");

      if (themeMenu) {
        themeMenu.classList.remove("open");
      }

    }
  );

}


if (lightThemeButton) {

  lightThemeButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      setTheme("light");

      if (themeMenu) {
        themeMenu.classList.remove("open");
      }

    }
  );

}


setTheme(
  localStorage.getItem("gptHubTheme") ||
  "dark"
);


/* =========================
   SAVE CURRENT CHAT
========================= */

function saveCurrentChatToHistory() {

  if (!conversation.length) {
    return;
  }

  const userMessages =
    conversation.filter(
      message =>
        message.role === "user"
    );

  if (!userMessages.length) {
    return;
  }

  let title =
    userMessages[0].content ||
    "Image conversation";

  if (!title.trim()) {
    title =
      "Image conversation";
  }

  title =
    title.substring(0, 45);

  chatHistory.unshift({

    id: Date.now(),

    title: title,

    messages: JSON.parse(
      JSON.stringify(
        conversation
      )
    )

  });

  localStorage.setItem(
    "aiChatHistory",
    JSON.stringify(
      chatHistory
    )
  );

}


/* =========================
   IMAGE VIEWER
========================= */

function openImageViewer(imageSrc) {

  let viewer =
    document.getElementById(
      "imageViewer"
    );

  if (!viewer) {

    viewer =
      document.createElement("div");

    viewer.id =
      "imageViewer";

    viewer.style.position =
      "fixed";

    viewer.style.inset =
      "0";

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


    const image =
      document.createElement("img");

    image.id =
      "viewerImage";

    image.style.maxWidth =
      "95%";

    image.style.maxHeight =
      "90%";

    image.style.objectFit =
      "contain";

    image.style.borderRadius =
      "12px";


    const closeButton =
      document.createElement("button");

    closeButton.type =
      "button";

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


    closeButton.addEventListener(
      "click",
      function(event) {

        event.preventDefault();
        event.stopPropagation();

        viewer.remove();

      }
    );


    image.addEventListener(
      "click",
      function(event) {

        event.preventDefault();
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


    viewer.appendChild(image);
    viewer.appendChild(closeButton);

    document.body.appendChild(viewer);

  }


  const viewerImage =
    viewer.querySelector(
      "#viewerImage"
    );

  viewerImage.src =
    imageSrc;

  viewer.style.display =
    "flex";

}


/* =========================
   ADD MESSAGE
========================= */

function addMessage(
  text,
  type
) {

  const message =
    document.createElement("div");

  message.className =
    "message " + type;

  message.textContent =
    text;

  chatBox.appendChild(
    message
  );


  if (
    type === "ai" &&
    text !== "Thinking..."
  ) {

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
        <rect
          x="9"
          y="9"
          width="11"
          height="11"
          rx="2"
        />

        <path
          d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        />
      </svg>
    `;


    copyButton.addEventListener(
      "click",
      async function(event) {

        event.preventDefault();
        event.stopPropagation();

        try {

          await navigator.clipboard.writeText(
            text
          );

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
   SAVE MESSAGE
========================= */

function saveMessage(
  text,
  role
) {

  conversation.push({

    role: role,

    content: text,

    type: "text"

  });

  localStorage.setItem(
    "aiConversation",
    JSON.stringify(
      conversation
    )
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
    JSON.stringify(
      conversation
    )
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

    if (fileName) {
      fileName.textContent =
        "Please select an image.";
    }

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

      if (previewImage) {
        previewImage.src =
          imageData;
      }

      if (imagePreview) {
        imagePreview.style.display =
          "block";
      }

      if (fileName) {
        fileName.textContent =
          file.name ||
          "Image selected";
      }


      if (previewImage) {

        previewImage.onclick =
          function(event) {

            event.preventDefault();
            event.stopPropagation();

            openImageViewer(
              imageData
            );

          };

      }

    };


  reader.readAsDataURL(file);

}


/* =========================
   REMOVE IMAGE
========================= */

if (removeImageButton) {

  removeImageButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      selectedImage =
        null;

      if (previewImage) {
        previewImage.src =
          "";
      }

      if (imagePreview) {
        imagePreview.style.display =
          "none";
      }

      if (photoInput) {
        photoInput.value =
          "";
      }

      if (cameraInput) {
        cameraInput.value =
          "";
      }

      if (fileInput) {
        fileInput.value =
          "";
      }

      if (fileName) {
        fileName.textContent =
          "";
      }

    }
  );

}


/* =========================
   DISPLAY SENT IMAGE
========================= */

function addSavedImage(
  imageData,
  text
) {

  const container =
    document.createElement("div");

  container.className =
    "sent-image";


  const image =
    document.createElement("img");

  image.src =
    imageData;

  image.style.display =
    "block";

  image.style.maxWidth =
    "220px";

  image.style.maxHeight =
    "220px";

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


  container.appendChild(
    image
  );

  chatBox.appendChild(
    container
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

    if (cameraInput) {
      cameraInput.click();
    }

    return;
  }


  const viewer =
    document.createElement("div");

  viewer.id =
    "cameraViewer";

  viewer.style.position =
    "fixed";

  viewer.style.inset =
    "0";

  viewer.style.background =
    "#000";

  viewer.style.zIndex =
    "100000";

  viewer.style.display =
    "flex";

  viewer.style.flexDirection =
    "column";

  viewer.style.alignItems =
    "center";

  viewer.style.justifyContent =
    "center";

  viewer.style.padding =
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

  controls.style.gap =
    "20px";

  controls.style.marginTop =
    "20px";


  const capture =
    document.createElement("button");

  capture.type =
    "button";

  capture.textContent =
    "Capture";

  capture.style.width =
    "110px";

  capture.style.height =
    "44px";

  capture.style.border =
    "none";

  capture.style.borderRadius =
    "22px";

  capture.style.background =
    "#26332c";

  capture.style.color =
    "white";


  const cancel =
    document.createElement("button");

  cancel.type =
    "button";

  cancel.textContent =
    "Cancel";

  cancel.style.width =
    "90px";

  cancel.style.height =
    "44px";

  cancel.style.border =
    "1px solid #303833";

  cancel.style.borderRadius =
    "22px";

  cancel.style.background =
    "#1b211e";

  cancel.style.color =
    "white";


  controls.appendChild(
    capture
  );

  controls.appendChild(
    cancel
  );

  viewer.appendChild(
    video
  );

  viewer.appendChild(
    controls
  );

  document.body.appendChild(
    viewer
  );


  function closeCamera() {

    if (cameraStream) {

      cameraStream
        .getTracks()
        .forEach(
          track =>
            track.stop()
        );

      cameraStream =
        null;

    }

    viewer.remove();

  }


  cancel.addEventListener(
    "click",
    closeCamera
  );


  capture.addEventListener(
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

      if (!context) {
        return;
      }


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
                type:
                  "image/jpeg"
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
          ideal:
            "environment"
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

        if (fileName) {
          fileName.textContent =
            "Camera permission was not available.";
        }

      }
    );

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


      reader.readAsDataURL(file);

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


  if (previewImage) {
    previewImage.src =
      "";
  }

  if (imagePreview) {
    imagePreview.style.display =
      "none";
  }

  if (photoInput) {
    photoInput.value =
      "";
  }

  if (cameraInput) {
    cameraInput.value =
      "";
  }

  if (fileInput) {
    fileInput.value =
      "";
  }

  if (fileName) {
    fileName.textContent =
      "";
  }

  if (toolsMenu) {
    toolsMenu.classList.remove(
      "open"
    );
  }


  const thinkingMessage =
    addMessage(
      "Thinking...",
      "ai"
    );


  try {

    const response = await fetch("/chat", {
  method: "POST",

  headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({
    message: text,
    conversation: conversation,
    image: imageDataForAPI,
    thinkMode: thinkMode
  })
});
    


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
   SEND BUTTON
========================= */

if (sendButton) {

  sendButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      sendMessage();

    }
  );

}


/* =========================
   ENTER TO SEND
========================= */

if (userInput) {

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

}


/* =========================
   PLUS BUTTON
========================= */

if (plusButton) {

  plusButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (toolsMenu) {

        toolsMenu.classList.toggle(
          "open"
        );

      }

      if (themeMenu) {

        themeMenu.classList.remove(
          "open"
        );

      }

    }
  );

}


/* =========================
   UPLOAD
========================= */

if (uploadButton) {

  uploadButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (toolsMenu) {

        toolsMenu.classList.remove(
          "open"
        );

      }

      if (fileInput) {

        fileInput.click();

      }

    }
  );

}


/* =========================
   FILE SELECTED
========================= */

if (fileInput) {

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
        file.type.startsWith(
          "image/"
        )
      ) {

        showImagePreview(
          file
        );

      } else {

        if (fileName) {

          fileName.textContent =
            "Selected: " +
            file.name;

        }

      }

    }
  );

}


/* =========================
   PHOTO BUTTON
========================= */

if (photoButton) {

  photoButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (toolsMenu) {

        toolsMenu.classList.remove(
          "open"
        );

      }

      if (photoInput) {

        photoInput.click();

      }

    }
  );

}
/* =========================
   PHOTO SELECTED
========================= */

if (photoInput) {

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

}


/* =========================
   CAMERA BUTTON
========================= */

if (cameraButton) {

  cameraButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      if (toolsMenu) {

        toolsMenu.classList.remove(
          "open"
        );

      }

      openCamera();

    }
  );

}


/* =========================
   CAMERA INPUT
========================= */

if (cameraInput) {

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

}


/* =========================
   THINK MODE
========================= */

if (thinkButton) {

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

      if (fileName) {

        fileName.textContent =
          thinkMode
            ? "Think mode enabled"
            : "Think mode disabled";

      }

    }
  );

}


/* =========================
   MICROPHONE
========================= */

if (micButton) {

  micButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();


      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


      if (!SpeechRecognition) {

        if (fileName) {

          fileName.textContent =
            "Voice input is not supported on this browser.";

        }

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


      if (fileName) {

        fileName.textContent =
          "Listening...";

      }


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


          if (fileName) {

            fileName.textContent =
              "";

          }

        };


      recognition.onerror =
        function(error) {

          console.error(
            "Voice input error:",
            error
          );

          if (fileName) {

            fileName.textContent =
              "Voice input failed.";

          }

        };


      recognition.onend =
        function() {

          if (
            fileName &&
            fileName.textContent ===
            "Listening..."
          ) {

            fileName.textContent =
              "";

          }

        };

    }
  );

}


/* =========================
   HISTORY
========================= */

function openHistoryDrawer() {

  if (historyDrawer) {

    historyDrawer.classList.add(
      "open"
    );

  }

  if (historyOverlay) {

    historyOverlay.classList.add(
      "open"
    );

  }

  updateHistoryList();

}


function closeHistoryDrawer() {

  if (historyDrawer) {

    historyDrawer.classList.remove(
      "open"
    );

  }

  if (historyOverlay) {

    historyOverlay.classList.remove(
      "open"
    );

  }

}


if (closeHistoryButton) {

  closeHistoryButton.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      closeHistoryDrawer();

    }
  );

}


if (historyOverlay) {

  historyOverlay.addEventListener(
    "click",
    function(event) {

      event.preventDefault();
      event.stopPropagation();

      closeHistoryDrawer();

    }
  );

}


/* =========================
   SWIPE DRAWER
========================= */

document.addEventListener(
  "touchstart",
  function(event) {

    if (!event.touches.length) {
      return;
    }

    touchStartX =
      event.touches[0].clientX;

  },
  {
    passive: true
  }
);


document.addEventListener(
  "touchend",
  function(event) {

    if (!event.changedTouches.length) {
      return;
    }


    const touchEndX =
      event.changedTouches[0].clientX;


    const differenceX =
      touchEndX -
      touchStartX;


    if (
      differenceX > 70 &&
      historyDrawer &&
      !historyDrawer.classList.contains(
        "open"
      )
    ) {

      openHistoryDrawer();

      return;
    }


    if (
      historyDrawer &&
      historyDrawer.classList.contains(
        "open"
      ) &&
      differenceX < -70
    ) {

      closeHistoryDrawer();

    }

  },
  {
    passive: true
  }
);


/* =========================
   UPDATE HISTORY
========================= */

function updateHistoryList() {

  if (!historyList) {
    return;
  }


  historyList.innerHTML =
    "";


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
        chat.title ||
        "Untitled chat";


      item.appendChild(
        title
      );


      item.addEventListener(
        "click",
        function(event) {

          event.preventDefault();
          event.stopPropagation();

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
   LOAD HISTORY CHAT
========================= */

function loadChatFromHistory(
  chatId
) {

  const selectedChat =
    chatHistory.find(
      chat =>
        chat.id === chatId
    );


  if (!selectedChat) {
    return;
  }


  conversation =
    JSON.parse(
      JSON.stringify(
        selectedChat.messages || []
      )
    );


  localStorage.setItem(
    "aiConversation",
    JSON.stringify(
      conversation
    )
  );


  if (chatBox) {

    chatBox.innerHTML =
      "";

  }


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


  if (chatBox) {

    chatBox.scrollTop =
      chatBox.scrollHeight;

  }


  closeHistoryDrawer();

}


/* =========================
   RESTORE CURRENT CHAT
========================= */

function restoreConversation() {

  if (!conversation.length) {
    return;
  }


  if (chatBox) {

    chatBox.innerHTML =
      "";

  }


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


  if (chatBox) {

    chatBox.scrollTop =
      chatBox.scrollHeight;

  }

}


/* =========================
   START
========================= */

restoreConversation();