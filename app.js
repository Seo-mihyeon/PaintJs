const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}

// canvas 안에 마우스움직임확인 함수
function onMouseMove(event) {
  // canvas 안에 x, y의 좌표값
  const x = event.offsetX;
  const y = event.offsetY;

  // 클릭하지 않았을 경우에의 발생하는 조건문, 마우스 클릭전까지의 좌표를 불러온다.
  if (!painting) {
    ctx.beginPath(); //경로 생성
    ctx.moveTo(x, y); //선 시작 좌표
  } else {
    ctx.lineTo(x, y); //선 끝 좌표
    ctx.stroke(); // 선 그리기
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor; //클릭한 색깔의 정보 가져오기
  ctx.strokeStyle = color; //선택한 색상으로 기본값이 바뀐다.
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // canvas 안에 마우스 움직임시 호출처리
  canvas.addEventListener("mousedown", startPainting); //canvas 안에서 마우스 클릭
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
