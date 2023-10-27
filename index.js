// Old code
const pencil = document.getElementById("pencil");
let isPencilActive = false; // Initially, the pencil is inactive.

const colorPicker = document.getElementById("color-picker");

colorPicker.addEventListener("change", () => {
    drawingColor = colorPicker.value;
    console.log(drawingColor);
});

function onPencilClick() {
    pencil.classList.toggle("active");
    isPencilActive = !isPencilActive; // Enabling the drawing
    if (isPencilActive) {
        canvas.style.cursor = "crosshair";
        canvas.addEventListener("mousedown", onMouseDown);
    } else {
        canvas.style.cursor = "auto";
        canvas.removeEventListener("mousedown", onMouseDown);
    }
}

pencil.addEventListener("click", onPencilClick);

const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

function drawLine(p1, p2, color = "blue", thickness = 2) {
    c.beginPath();
    c.strokeStyle = color;
    c.lineWidth = thickness;
    c.moveTo(p1.x, p1.y);
    c.lineTo(p2.x, p2.y);
    c.stroke();
    c.closePath();
}

let drawingColor = "blue";
let previousPosition = null;

function onMouseDown(e) {
    previousPosition = { x: e.clientX, y: e.clientY };
    c.strokeStyle = drawingColor;
    c.lineWidth = 2;
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e) {
    let currentPosition = { x: e.clientX, y: e.clientY };
    c.beginPath();
    c.moveTo(previousPosition.x, previousPosition.y);
    c.lineTo(currentPosition.x, currentPosition.y);
    c.stroke();
    c.closePath();
    previousPosition = currentPosition;
}

function onMouseUp(e) {
    canvas.removeEventListener("mousemove", onMouseMove);
}

// New code for squares and circles
const squareButton = document.getElementById("square");
const circleButton = document.getElementById("circle");
let isSquareActive = false;
let isCircleActive = false;

squareButton.addEventListener("click", onSquareClick);
circleButton.addEventListener("click", onCircleClick);

function onSquareClick() {
    squareButton.classList.toggle("active");
    isSquareActive = !isSquareActive;

    if (isSquareActive) {
        isCircleActive = false;
        circleButton.classList.remove("active");
        canvas.style.cursor = "crosshair";
        canvas.addEventListener("mousedown", onSquareMouseDown);
    } else {
        canvas.style.cursor = "auto";
        canvas.removeEventListener("mousedown", onSquareMouseDown);
    }
}

function onCircleClick() {
    circleButton.classList.toggle("active");
    isCircleActive = !isCircleActive;

    if (isCircleActive) {
        isSquareActive = false;
        squareButton.classList.remove("active");
        canvas.style.cursor = "crosshair";
        canvas.addEventListener("mousedown", onCircleMouseDown);
    } else {
        canvas.style.cursor = "auto";
        canvas.removeEventListener("mousedown", onCircleMouseDown);
    }
}

function onSquareMouseDown(e) {
    previousPosition = { x: e.clientX, y: e.clientY };
    canvas.addEventListener("mousemove", onSquareMouseMove);
    canvas.addEventListener("mouseup", onSquareMouseUp);
}

function onSquareMouseMove(e) {
    const currentPosition = { x: e.clientX, y: e.clientY };
    const width = currentPosition.x - previousPosition.x;
    const height = currentPosition.y - previousPosition.y;

    c.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    if (width >= 0 && height >= 0) {
        c.strokeRect(previousPosition.x, previousPosition.y, width, height);
    }

    if (width < 0 && height >= 0) {
        c.strokeRect(previousPosition.x + width, previousPosition.y, -width, height);
    }

    if (width >= 0 && height < 0) {
        c.strokeRect(previousPosition.x, previousPosition.y + height, width, -height);
    }

    if (width < 0 && height < 0) {
        c.strokeRect(previousPosition.x + width, previousPosition.y + height, -width, -height);
    }
}

function onSquareMouseUp(e) {
    canvas.removeEventListener("mousemove", onSquareMouseMove);
}

function onCircleMouseDown(e) {
    previousPosition = { x: e.clientX, y: e.clientY };
    canvas.addEventListener("mousemove", onCircleMouseMove);
    canvas.addEventListener("mouseup", onCircleMouseUp);
}

function onCircleMouseMove(e) {
    const currentPosition = { x: e.clientX, y: e.clientY };
    const radius = Math.sqrt(
        Math.pow(currentPosition.x - previousPosition.x, 2) + Math.pow(currentPosition.y - previousPosition.y, 2)
    );

    c.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    c.beginPath();
    c.arc(previousPosition.x, previousPosition.y, radius, 0, Math.PI * 2);
    c.stroke();
    c.closePath();
}

function onCircleMouseUp(e) {
    canvas.removeEventListener("mousemove", onCircleMouseMove);
}
