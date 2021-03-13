const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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

function onMouseDown(event) {
  painting = true;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor; //클릭한 색깔의 정보 가져오기
  ctx.strokeStyle = color; //선택한 색상으로 기본값이 바뀐다.
}

function handleRangeChange(event) {
  const stroke = event.target.value;
  ctx.lineWidth = stroke;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // canvas 안에 마우스 움직임시 호출처리
  canvas.addEventListener("mousedown", startPainting); //canvas 안에서 마우스 클릭
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}
