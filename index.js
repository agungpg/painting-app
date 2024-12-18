"use strict";
var isPainting = false;
function Circle(positionX, positionY, radius, fill, stroke, stroke_width) {
  this.positionX = positionX || 0;
  this.positionY = positionY || 0;
  this.radius = radius || 7;
  this.fill = fill || randColor();
  this.stroke = stroke || randColor();
  this.stroke_width = stroke_width || 2;
  this.draw = function () {
    JScontentCreation.innerHTML += `<circle class="circle" onclick="Erase(this)" cx="${this.positionX}" cy="${this.positionY}" 
      r="${this.radius}" fill="${this.fill}" 
      stroke="${this.stroke}" stroke-width="${this.stroke_width}"/>`;
  };
}
function Squere(
  positionX,
  positionY,
  height,
  width,
  fill,
  stroke,
  strokeWidth
) {
  this.positionX = positionX || 0;
  this.positionY = positionY || 0;
  this.height = height;
  this.width = width;
  this.fill = fill;
  this.stroke = stroke;
  this.stroke_width = strokeWidth ?? 2;
  this.draw = function () {
    JScontentCreation.innerHTML += `<rect class="squere" x="${this.positionX}" y="${this.positionY}" width="${this.width}" height="${height}" fill="blue" stroke="black" stroke-width="2" />`;
  };
}

var Pointer = "circle";
function randColor() {
  let r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);
  return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}
window.addEventListener("mousedown", function () {
  isPainting = true;
});
window.addEventListener("mouseup", function () {
  isPainting = false;
});

window.addEventListener(
  "mousemove",
  function (e) {
    if (!isPainting) return;
    if (Pointer == "eraser") {
      for (let i = 0; i < JScontentCreation.children.length; i++) {
        const el = JScontentCreation.children[i];
        const cx = el.attributes.cx.value;
        const cy = el.attributes.cy.value;
        if (
          parseInt(cx) >= e.pageX - 8 &&
          parseInt(cx) <= e.pageX + 8 &&
          parseInt(cy) >= e.pageY - 8 &&
          parseInt(cy) <= e.pageY + 8
        ) {
          el.remove();
        }
      }
      return;
    }

    let c1 =
      Pointer == "circle"
        ? new Circle(e.pageX, e.pageY, 4, "#000", "#000")
        : new Squere(e.pageX, e.pageY, 8, 8, "black", "black");
    c1.draw();
  },
  false
);

document.getElementById("exportBtn").addEventListener("click", () => {
  const svgElement = document.getElementById("JScontentCreation");
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);

  // Create a Blob for the SVG data
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });

  // Create a download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "exported.svg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

document.getElementById("squere").addEventListener("click", () => {
  Pointer = "squere";
});

document.getElementById("circle").addEventListener("click", () => {
  Pointer = "circle";
});
document.getElementById("eraser").addEventListener("click", () => {
  Pointer = "eraser";
});

function Erase(e) {
  if (Pointer != "eraser") return;
  e.remove();
}
document.getElementById("reset").addEventListener("click", () => {
  JScontentCreation.innerHTML = "";
});
