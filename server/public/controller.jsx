const Models = ["Mug", "Shirt", "Cap", "Poster"];
let SELECTED_MODEL = "Mug";
let SelectedCustomization = "Image";
let ProductColor = "#ffffff";
let AnimatedCanvas = true;
let IniModel = true;

let Loading = false;

const Canvas = document.querySelector("#canvas");
Canvas.src = `https://damn-3dproduct-mpb8.vercel.app/?model=${SELECTED_MODEL}`;

// enable loading anim
document.querySelector(".loading-indicator").style.display = "block";

let selectedText = false;
let selectedImage = false;

const Images = [];
const Texts = [];

//  text sliders
const size_slider = document.querySelector("#text-customization #size-slider");
const X_slider = document.querySelector("#text-customization #x-position");
const Y_slider = document.querySelector("#text-customization #y-position");
const rot_slider = document.querySelector(
  "#text-customization #rotation-slider"
);
const line_height_slider = document.querySelector(
  "#text-customization #line-height-slider"
);

//  image sliders
const size_slider_image = document.querySelector(
  "#image-customization #size-slider"
);
const X_slider_image = document.querySelector(
  "#image-customization #x-position"
);
const Y_slider_image = document.querySelector(
  "#image-customization #y-position"
);
const rot_slider_image = document.querySelector(
  "#image-customization #rotation-slider"
);

Canvas.addEventListener("load", (e) => {
  console.log("loaded");
  document.querySelector(".loading-indicator").style.display = "none";
  if (!IniModel) {
    setTimeout(() => {
      console.log("sent");
      postToIframe({
        type: "ini-layers",
        payload: { textLayers: Texts, imageLayers: Images },
      });
    }, 1000);
  }
});

document.querySelector(".product-buttons").addEventListener("click", (e) => {
  if (SELECTED_MODEL !== e.target.getAttribute("data-product")) {
    // animate canvas
    AnimatedCanvas = true;
    const btn = document.getElementById("auto-rotate-btn");
    btn.classList.add("active");
    btn.textContent = "Stop Rotate";

    IniModel = false;
    SELECTED_MODEL = e.target.getAttribute("data-product");
    Texts.forEach((it) => (it.prevRotation = undefined));
    Images.forEach((it) => (it.prevRotation = undefined));
    selectedText = false;
    selectedImage = false;
    document
      .querySelector(".selected_layer")
      ?.classList.remove("selected_layer");

    if (SELECTED_MODEL === "Mug") {
      size_slider_image.max = 920;
      size_slider_image.min = 100;

      X_slider_image.min = 12;
      X_slider_image.max = 806;

      Y_slider_image.min = -21;
      Y_slider_image.max = 823;

      X_slider.min = 12;
      X_slider.max = 806;

      Y_slider.min = -21;
      Y_slider.max = 823;
    } else if (SELECTED_MODEL === "Shirt") {
      X_slider.min = 245;
      X_slider.max = 427;

      Y_slider.min = 272;
      Y_slider.max = 748;
    } else if (SELECTED_MODEL === "Cap") {
      X_slider.min = 363;
      X_slider.max = 673;

      Y_slider.min = 172;
      Y_slider.max = 745;
    } else if (SELECTED_MODEL === "Poster") {
      X_slider.min = 281;
      X_slider.max = 746;

      Y_slider.min = 221;
      Y_slider.max = 707;
    }

    Canvas.src = `https://damn-3dproduct-mpb8.vercel.app/?model=${SELECTED_MODEL}`;
    document.querySelector(".loading-indicator").style.display = "block";
  }
});

const TextMessageWrapper = (func) => {
  if (selectedText === false) {
    !notifications.showing &&
      notifications.show("Please Select a layer", "error");
  } else if (Texts[selectedText].locked) {
    !notifications.showing && notifications.show("Layer is Locked!", "error");
  } else {
    func();
  }
};

const ImageMessageWrapper = (func) => {
  if (selectedImage === false) {
    !notifications.showing &&
      notifications.show("Please Select a layer", "error");
  } else if (Images[selectedImage].locked) {
    !notifications.showing && notifications.show("Layer is Locked!", "error");
  } else {
    func();
  }
};

document
  .querySelector(".customization-buttons")
  .addEventListener("click", (e) => {
    if (SelectedCustomization !== e.target.innerText) {
      if (SelectedCustomization === "Image") {
        document.querySelector("#image-customization").style.display = "none";
        document.querySelector("#text-customization").style.display = "block";
      } else {
        document.querySelector("#image-customization").style.display = "block";
        document.querySelector("#text-customization").style.display = "none";
      }

      document
        .querySelector(".customization-buttons>button.active")
        .classList.remove("active");
      SelectedCustomization = e.target.innerText;
      e.target.classList.add("active");
    }
  });

// add text layer to dom
const CreateTextLayer = (text, id) => {
  // Create the main container
  const textLayer = document.createElement("div");
  textLayer.setAttribute("data-id", id);
  textLayer.className = "text_layer";

  textLayer.onclick = function () {
    postToIframe({ type: "select-layer", payload: { _id: id } });
  };

  // Create the inner container with flex row
  const flexRow = document.createElement("div");
  flexRow.style.display = "flex";
  flexRow.style.flexDirection = "row";
  flexRow.style.alignItems = "center";
  flexRow.style.gap = "8px";

  // Create the first SVG
  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg1.setAttribute("width", "18");
  svg1.setAttribute("height", "18");
  svg1.setAttribute("viewBox", "0 0 21 24");
  svg1.setAttribute("fill", "none");
  svg1.setAttribute("stroke", "#000000");

  const path1_1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  path1_1.setAttribute("d", "M7.66406 20.125H15.3307");
  path1_1.setAttribute("stroke", "inherit");
  path1_1.setAttribute("stroke-width", "2");
  path1_1.setAttribute("stroke-linecap", "round");
  path1_1.setAttribute("stroke-linejoin", "round");

  const path1_2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  path1_2.setAttribute("d", "M11.5 2.875V20.125");
  path1_2.setAttribute("stroke", "inherit");
  path1_2.setAttribute("stroke-width", "2");
  path1_2.setAttribute("stroke-linecap", "round");
  path1_2.setAttribute("stroke-linejoin", "round");

  const path1_3 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  path1_3.setAttribute(
    "d",
    "M3.83203 7.66667V5.75C3.83203 4.9875 4.13493 4.25624 4.6741 3.71707C5.21327 3.1779 5.94453 2.875 6.70703 2.875H16.2904C17.0529 2.875 17.7841 3.1779 18.3233 3.71707C18.8625 4.25624 19.1654 4.9875 19.1654 5.75V7.66667"
  );
  path1_3.setAttribute("stroke", "inherit");
  path1_3.setAttribute("stroke-width", "2");
  path1_3.setAttribute("stroke-linecap", "round");
  path1_3.setAttribute("stroke-linejoin", "round");

  svg1.appendChild(path1_1);
  svg1.appendChild(path1_2);
  svg1.appendChild(path1_3);

  // Create the span
  const span = document.createElement("span");
  span.textContent = text.slice(0, 15);

  // Append svg and span to the flex row
  flexRow.appendChild(svg1);
  flexRow.appendChild(span);

  // Create a wrapper for the buttons (bin and your new SVG)
  const buttonWrapper = document.createElement("div");
  buttonWrapper.style.display = "flex";
  buttonWrapper.style.alignItems = "center";
  buttonWrapper.style.gap = "8px";

  // === Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.style.border = "none";
  deleteButton.style.background = "transparent";
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M20 7H4M18 10L17.33 17.36C17.24 18.36 16.78 19.28 16.04 19.96C15.3 20.63 14.33 21 13.33 21H10.63C9.63 21 8.66 20.63 7.92 19.96C7.18 19.28 6.72 18.36 6.63 17.36L6 10M10 12V15M13.99 12V15M16.5 7H7.5L8 4.89C8.13 4.34 8.45 3.86 8.89 3.52C9.34 3.17 9.89 2.99 10.45 3H13.55C14.11 2.99 14.66 3.17 15.11 3.52C15.55 3.86 15.87 4.34 16 4.89L16.5 7Z" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  deleteButton.onclick = () => {
    const index = Texts.findIndex((ele) => ele._id == id);
    Texts.splice(index, 1);
    textLayer.remove();
    notifications.show("Layer Deleted!", "success");
    postToIframe({ type: "delete-layer", payload: { _id: id } });
  };

  // === Lock Button
  const lockButton = document.createElement("button");
  lockButton.style.border = "none";
  lockButton.style.background = "transparent";

  const lockIcon = (locked) => {
    return locked
      ? `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.584 6C15.8124 4.2341 14.0503 3 12 3C9.23858 3 7 5.23858 7 8V10.0288M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C16.8802 10 17.7202 10 18.362 10.327C18.9265 10.6146 19.3854 11.0735 19.673 11.638C20 12.2798 20 13.1198 20 14.8V16.2C20 17.8802 20 18.7202 19.673 19.362C19.3854 19.9265 18.9265 20.3854 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V14.8C4 13.1198 4 12.2798 4.32698 11.638C4.6146 11.0735 5.07354 10.6146 5.63803 10.327C5.99429 10.1455 6.41168 10.0647 7 10.0288Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
      : `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
  };

  let isLocked = false;
  lockButton.innerHTML = lockIcon(isLocked);
  lockButton.onclick = () => {
    isLocked = !isLocked;
    lockButton.innerHTML = lockIcon(isLocked);
    const index = Texts.findIndex((ele) => ele._id == id);
    if (index >= 0) {
      Texts[index].locked = isLocked;
      notifications.show(
        isLocked ? "Layer locked!" : "Layer unlocked",
        "success"
      );
      postToIframe({
        type: "lock-layer",
        payload: { _id: id, lock: isLocked },
      });
    }
  };

  // === Append both buttons to wrapper
  buttonWrapper.appendChild(deleteButton);
  buttonWrapper.appendChild(lockButton);

  // === Append everything to main container
  textLayer.appendChild(flexRow);
  textLayer.appendChild(buttonWrapper);

  // Finally, append to body or any container
  document.querySelector(".text_layers").appendChild(textLayer);
};

const CreateImageLayer = (url, id) => {
  // Main image layer container
  const imageLayer = document.createElement("div");
  imageLayer.setAttribute("data-id", id);
  imageLayer.className = "image_layer";

  imageLayer.onclick = function () {
    postToIframe({ type: "select-layer", payload: { _id: id } });
  };

  // Wrapper for image and icon
  const flexRow = document.createElement("div");
  flexRow.style.display = "flex";
  flexRow.style.alignItems = "center";
  flexRow.style.gap = "8px";

  // Image icon (your static SVG)
  const imageIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  imageIcon.setAttribute("viewBox", "0 0 32 32");
  imageIcon.setAttribute("width", "20");
  imageIcon.setAttribute("height", "20");
  imageIcon.setAttribute("fill", "#000000");
  imageIcon.innerHTML = `
    <g transform="translate(-360.000000, -99.000000)" fill="#000000">
      <path d="M368,109 C366.896,109 366,108.104 366,107 C366,105.896 366.896,105 368,105 C369.104,105 370,105.896 370,107 C370,108.104 369.104,109 368,109 Z M368,103 C365.791,103 364,104.791 364,107 C364,109.209 365.791,111 368,111 C370.209,111 372,109.209 372,107 C372,104.791 370.209,103 368,103 Z M390,116.128 L384,110 L374.059,120.111 L370,116 L362,123.337 L362,103 C362,101.896 362.896,101 364,101 L388,101 C389.104,101 390,101.896 390,103 L390,116.128 Z M390,127 C390,128.104 389.104,129 388,129 L382.832,129 L375.464,121.535 L384,112.999 L390,118.999 L390,127 Z M364,129 C362.896,129 362,128.104 362,127 L362,126.061 L369.945,118.945 L380.001,129 L364,129 Z M388,99 L364,99 C361.791,99 360,100.791 360,103 L360,127 C360,129.209 361.791,131 364,131 L388,131 C390.209,131 392,129.209 392,127 L392,103 C392,100.791 390.209,99 388,99 Z"/>
    </g>
  `;

  // Thumbnail image
  const img = document.createElement("img");
  img.src = url;
  img.width = 20;
  img.height = 20;
  img.style.borderRadius = "5px";

  flexRow.appendChild(imageIcon);
  flexRow.appendChild(img);

  // === Buttons
  const buttonWrapper = document.createElement("div");
  buttonWrapper.style.display = "flex";
  buttonWrapper.style.alignItems = "center";
  buttonWrapper.style.gap = "8px";

  // === Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.style.border = "none";
  deleteButton.style.background = "transparent";
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M20 7H4M18 10L17.33 17.36C17.24 18.36 16.78 19.28 16.04 19.96C15.3 20.63 14.33 21 13.33 21H10.63C9.63 21 8.66 20.63 7.92 19.96C7.18 19.28 6.72 18.36 6.63 17.36L6 10M10 12V15M13.99 12V15M16.5 7H7.5L8 4.89C8.13 4.34 8.45 3.86 8.89 3.52C9.34 3.17 9.89 2.99 10.45 3H13.55C14.11 2.99 14.66 3.17 15.11 3.52C15.55 3.86 15.87 4.34 16 4.89L16.5 7Z" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  deleteButton.onclick = () => {
    const index = Images.findIndex((ele) => ele._id == id);
    Images.splice(index, 1);
    imageLayer.remove();
    notifications.show("Layer Deleted!", "success");
    postToIframe({ type: "delete-layer", payload: { _id: id } });
  };

  // === Lock Button
  const lockButton = document.createElement("button");
  lockButton.style.border = "none";
  lockButton.style.background = "transparent";

  const lockIcon = (locked) => {
    return locked
      ? `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.584 6C15.8124 4.2341 14.0503 3 12 3C9.23858 3 7 5.23858 7 8V10.0288M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C16.8802 10 17.7202 10 18.362 10.327C18.9265 10.6146 19.3854 11.0735 19.673 11.638C20 12.2798 20 13.1198 20 14.8V16.2C20 17.8802 20 18.7202 19.673 19.362C19.3854 19.9265 18.9265 20.3854 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V14.8C4 13.1198 4 12.2798 4.32698 11.638C4.6146 11.0735 5.07354 10.6146 5.63803 10.327C5.99429 10.1455 6.41168 10.0647 7 10.0288Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
      : `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
  };

  let isLocked = false;
  lockButton.innerHTML = lockIcon(isLocked);
  lockButton.onclick = () => {
    isLocked = !isLocked;
    lockButton.innerHTML = lockIcon(isLocked);
    const index = Images.findIndex((ele) => ele._id == id);
    if (index >= 0) {
      Images[index].locked = isLocked;
      notifications.show(
        isLocked ? "Layer locked!" : "Layer unlocked",
        "success"
      );
      postToIframe({
        type: "lock-layer",
        payload: { _id: id, lock: isLocked },
      });
    }
  };

  // Append buttons
  buttonWrapper.appendChild(deleteButton);
  buttonWrapper.appendChild(lockButton);

  // Combine all into imageLayer
  imageLayer.appendChild(flexRow);
  imageLayer.appendChild(buttonWrapper);

  // Append to container
  document.querySelector(".image_layers").appendChild(imageLayer);
};

// Add text Layer
document.querySelector("#add_text").addEventListener("click", () => {
  const inputElement = document.querySelector("#add_text_inp");
  const textValue = inputElement.value.trim();

  if (textValue) {
    const textObject = {
      text: textValue,
      fontSize: 2,
      left: parseFloat(document.querySelector("#x-position").value),
      top: parseFloat(document.querySelector("#y-position").value),
      rotation: parseFloat(document.querySelector("#rotation-slider").value),
      _id: crypto.randomUUID(),
    };

    // Add to global array
    Texts.push(textObject);

    // Optionally log or debug
    console.log("Texts Array:", Texts);

    // Post message to iframe
    postToIframe({
      type: "add-text",
      payload: textObject,
    });

    // Clear input
    inputElement.value = "";
    CreateTextLayer(textObject.text, textObject._id);
  }
});

// Update Font Size
size_slider.addEventListener("input", (e) => {
  TextMessageWrapper(() => {
    Texts[selectedText].fontSize = e.target.value;
    updateText({ fontSize: e.target.value });
  });
});

//  update Font postion
X_slider.addEventListener("input", (e) => {
  TextMessageWrapper(() => {
    Texts[selectedText].left = e.target.value;
    updateText({ left: Texts[selectedText].left });
  });
});

Y_slider.addEventListener("input", (e) => {
  TextMessageWrapper(() => {
    Texts[selectedText].top = e.target.value;
    updateText({ top: Texts[selectedText].top });
  });
});

//  update text rotation
rot_slider.addEventListener("input", (e) => {
  TextMessageWrapper(() => {
    const newValue = parseInt(e.target.value);

    const selectedObj = Texts[selectedText];

    // Initialize if not set
    if (selectedObj.prevRotation === undefined) {
      selectedObj.prevRotation = newValue;
    }

    // Calculate difference from previous
    const diff = newValue - selectedObj.prevRotation;

    // Apply difference to current left
    selectedObj.angle += diff * 0.5;

    // Update previous value
    selectedObj.prevRotation = newValue;

    updateText({ angle: Texts[selectedText].angle });
  });
});

//  line  height slider
line_height_slider.addEventListener("input", (e) => {
  TextMessageWrapper(() => {
    Texts[selectedText].lineHeight = e.target.value;
    updateText({ lineHeight: Texts[selectedText].lineHeight });
  });
});

// update text Color
Coloris({
  themeMode: "dark",
  alpha: false,
  onChange: (color, inputEl) => {
    Texts[selectedText].fill = color;
    updateText({ fill: color });
  },
});

var colorPicker = new iro.ColorPicker("#picker", {
  width: 120,
  color: "#ffffff",
  layout: [
    {
      component: iro.ui.Box,
    },
    {
      component: iro.ui.Slider,
      options: {
        id: "hue-slider",
        sliderType: "hue",
      },
    },
  ],
});

//  add fonts
const fonts = [
  "Arial",
  "Verdana",
  "Tahoma",
  "Calibri",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Roboto",
  "Hammersmith One",
  "Ultra",
  "Pacifico",
  "Ga Maamli",
  "Lobster",
  "Oswald",
  "Montserrat",
  "Rancho",
  "Reggae One",
  "Sansita",
  "Praise",
  "Poppins",
  "Raleway",
  "Anton",
  "Bebas Neue",
  "Playfair Display",
  "Ubuntu",
  "Hanalei",
  "Stalinist One",
  "Bad Script",
  "IM Fell Double Pica",
  "IM Fell English",
  "Merriweather",
  "Pangolin",
  "Open Sans",
  "Catamaran",
  "Shadows Into Light",
];

const selectEleFont = document.querySelector(".font-inp > select");

selectEleFont.addEventListener("input", (e) => {
  TextMessageWrapper(() => {
    updateText({ fontFamily: e.target.value });
  });
});

fonts.forEach((it) => {
  const option = document.createElement("option");
  option.innerText = it;
  option.setAttribute("data-font", it);
  selectEleFont.appendChild(option);
});

// update Model Color
colorPicker.on("color:change", function (color) {
  document.querySelector("#model-color-inp").value = color.hexString;
  postToIframe({
    type: "change-color",
    payload: {
      clr: color.hexString,
    },
  });
});

document.querySelector("#model-color-inp").addEventListener("input", (e) => {
  colorPicker.color.set(e.target.value);
});

document.querySelector("#color-dor-parent").addEventListener("click", (e) => {
  colorPicker.color.set(e.target.getAttribute("data-color"));
});

// Image upload

// Image upload functionality
document.getElementById("upload-area").addEventListener("click", () => {
  document.getElementById("image-upload").click();
});

document.getElementById("image-upload").addEventListener("input", (e) => {
  console.log(e);
  const file = e.target.files[0];
  if (file) {
    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      notifications.show(
        "Please upload a valid image file (JPG, PNG, WebP)",
        "error"
      );
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      notifications.show(
        "Image file too large. Please use images under 5MB",
        "error"
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      const id = crypto.randomUUID();
      Images.push({
        _id: id,
        width: 500,
        height: 500,
        top: 20,
        left: 20,
        url: imageUrl,
      });
      CreateImageLayer(imageUrl, id);
      postToIframe({
        type: "add-image",
        payload: { url: imageUrl, _id: id },
      });
      e.target.value = "";
    };

    reader.onerror = () => {
      notifications.show("Error reading image file", "error");
    };

    reader.readAsDataURL(file);
  }
});

size_slider_image.addEventListener("input", (e) => {
  ImageMessageWrapper(() => {
    Images[selectedImage].scale = e.target.value;
    updateImage({ scale: e.target.value });
  });
});

//  update Image postion
X_slider_image.addEventListener("input", (e) => {
  ImageMessageWrapper(() => {
    Images[selectedImage].left = e.target.value;
    updateImage({ left: Images[selectedImage].left });
  });
});

Y_slider_image.addEventListener("input", (e) => {
  ImageMessageWrapper(() => {
    Images[selectedImage].top = e.target.value;
    updateImage({ top: Images[selectedImage].top });
  });
});

rot_slider_image.addEventListener("input", (e) => {
  ImageMessageWrapper(() => {
    const newValue = parseInt(e.target.value);

    const selectedObj = Images[selectedImage];

    // Initialize if not set
    if (selectedObj.prevRotation === undefined) {
      selectedObj.prevRotation = newValue;
    }

    // Calculate difference from previous
    const diff = newValue - selectedObj.prevRotation;

    // Apply difference to current left
    selectedObj.angle += diff * 0.5;

    // Update previous value
    selectedObj.prevRotation = newValue;

    updateImage({ angle: Images[selectedImage].angle });
  });
});

// remove bg image
document.querySelector(".remove-bg-btn").addEventListener("click", (e) => {
  ImageMessageWrapper(() => {
    if (Images[selectedImage].backgroundRemoved) {
      !notifications.showing &&
        notifications.show("Backgound Already Removed", "success");
    } else {
      document.querySelector("#loading-indicator-image").style.display =
        "block";
      postToIframe({
        type: "remove-bg",
        payload: { _id: Images[selectedImage]._id },
      });
    }
  });
});

// Export design
document.querySelector("#export-view-btn").addEventListener("click", (e) => {
  postToIframe({ type: "export-data", payload: {} });
  notifications.show("Design exported!", "success");
});

// rest view
document.querySelector("#reset-view-btn").addEventListener("click", (e) => {
  Texts.length = 0;
  Images.length = 0;
  document.querySelectorAll(".text_layer").forEach((it) => it.remove());
  document.querySelectorAll(".image_layer").forEach((it) => it.remove());
  notifications.show("View has been reset!", "success");
  postToIframe({ type: "reset-view", payload: {} });
});

//  Auto Rotate
document.getElementById("auto-rotate-btn").addEventListener("click", () => {
  AnimatedCanvas = !AnimatedCanvas;
  const btn = document.getElementById("auto-rotate-btn");
  if (AnimatedCanvas) {
    btn.classList.add("active");
    btn.textContent = "Stop Rotate";
    postToIframe({ type: "rotate-control", payload: { enable: true } });
  } else {
    btn.classList.remove("active");
    btn.textContent = "Auto Rotate";
    postToIframe({ type: "rotate-control", payload: { enable: false } });
  }
});

//  changes to model
function postToIframe(data) {
  if (Canvas && Canvas.contentWindow) {
    Canvas.contentWindow.postMessage(
      data,
      "https://damn-3dproduct-mpb8.vercel.app"
    );
  }
}
//  update Text
const updateText = (payload) => {
  postToIframe({ type: "update-text", payload: payload });
};

//  update image
const updateImage = (payload) => {
  postToIframe({ type: "update-image", payload: payload });
};

//  select layer
const updateSelectedLayer = (payload) => {
  document.querySelector(".selected_layer")?.classList.remove("selected_layer");
  document
    .querySelector(`[data-id='${payload._id}']`)
    .classList.add("selected_layer");
};

// receive messages
window.addEventListener("message", (event) => {
  const { type, payload } = event.data;
  if (!payload) {
    return;
  }

  // console.log(payload);

  switch (type) {
    case "update-text":
      selectedText = Texts.findIndex((ele) => ele._id === payload._id);
      updateSelectedLayer(payload);
      console.log(selectedText);
      X_slider.value = payload.left;
      Y_slider.value = payload.top;
      size_slider.value = payload.fontSize;
      rot_slider.value = payload.angle * 2;
      selectEleFont.value = payload.fontFamily;
      line_height_slider.value = payload.lineHeight;
      Texts[selectedText] = { ...payload };
      break;
    case "select-clear":
      selectedText = false;
      selectedImage = false;
      document
        .querySelector(".selected_layer")
        ?.classList.remove("selected_layer");
      break;
    case "update-image":
      selectedImage = Images.findIndex((ele) => ele._id === payload._id);
      updateSelectedLayer(payload);
      console.log(selectedImage);
      X_slider_image.value = payload.left;
      Y_slider_image.value = payload.top;
      size_slider_image.value = payload.scale;
      rot_slider_image.value = payload.angle * 2;
      Images[selectedImage] = { ...Images[selectedImage], ...payload };
      break;
    case "export-image":
      const link = document.createElement("a");
      link.href = payload.url;
      link.download = "Exported Design.png";
      link.click();
      break;
    case "loading-false-image":
      document.querySelector("#loading-indicator-image").style.display = "none";
      selectedImage = Images.findIndex((ele) => ele._id === payload._id);
      Images[selectedImage].url = payload.url;
      Images[selectedImage].backgroundRemoved = true;
      break;
  }
});
