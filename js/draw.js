let myCanvas = null;
let colors = ["#ff0", "#0f0", "#ffa500", "#ff00ff"]; // 黄色，绿色，橙色，粉色
let brushSize;
let currentColor;
let prevX, prevY;

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight); // 创建全屏画布
  let container = document.getElementById("canvasBox2");
  console.log(container, "container");

  container.appendChild(myCanvas.elt);
  noLoop(); // 禁用 draw 循环，除非手动调用
}

function draw() {
  // 使用记录的颜色和笔刷粗细绘制线条
  if (prevX != null && prevY != null) {
    stroke(currentColor); // 使用当前颜色
    strokeWeight(brushSize); // 使用当前笔刷粗细
    line(prevX, prevY, mouseX, mouseY); // 绘制线条
  }

  // 更新之前的鼠标位置
  prevX = mouseX;
  prevY = mouseY;
}

function mousePressed() {
  // 随机生成新的颜色和笔刷大小
  currentColor = random(colors); // 随机颜色
  brushSize = random(0.2, 30); // 调整笔刷粗细的范围，增加对比度

  // 重置鼠标位置
  prevX = mouseX;
  prevY = mouseY;

  loop(); // 允许 draw 循环执行
}

function mouseReleased() {
  noLoop(); // 当鼠标释放时停止绘制
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 当窗口大小改变时调整画布大小
}
