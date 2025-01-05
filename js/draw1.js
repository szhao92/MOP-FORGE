let myCanvas = null;

let radian1 = 0;
let radian2 = 0;
let leftNumber = 0;
let paintColor;
let brushSize = 20;
let photos = [];

// 5
let droops;
let brushies;
let drawing = false; // Variable to track if the mouse is being dragged

let index = -1;
const brushSize2 = 100; // 固定的笔刷大小

let isDrawing = false; // 记录是否在绘制

let isClear = false;

// 颜色定义（只保留冷色调，去除红色）
let colors = [
  { hue: 64, saturation: 95, brightness: 98 }, // #78FF88 (鲜艳的淡绿色)
  { hue: 310, saturation: 42, brightness: 100 }, // #00BFFF (鲜艳的蓝色)
];

// 7

let segments = []; // Store all the segments
let segLength = 1; // Base segment length
let variance = 30; // Variance in segment length
let currentColor; // Store the current random color
let inactivityTime = 0; // Track inactivity time

// 8
// let brushStr = "Normal";
// let brushMarks = []; // Array to store brush objects
// let colors1 = [
//   "#F9B15F",
//   "#FF5FFF",
//   "#2DD5FC",
//   "#F1D7FF",
//   "#5A50E2",
//   "#2CC654",
//   "#F93D77",
//   "#DAF440",
// ]; // Color options
let drawnShapes = []; // Array to store drawn shapes

function setup() {
  myCanvas = createCanvas(380, 500);
  colorMode(HSB, 360, 100, 100, 100); // 使用 HSB 颜色模式
  radian1 = 0;
  radian2 = PI;
  paintColor = color(random(255), random(255), random(255), random(127, 255)); // 初始随机颜色
  // 将 canvas 添加到 id 为 boxCont 的 div 容器中
  let container = document.getElementById("canvasBox1");
  container.appendChild(myCanvas.elt);
  $(".numbers img").on("click", function () {
    const index = $(this).data("index");
    leftNumber = index;
    console.log(index);
    setBgColor();
    setSelectColor();
    clear();
    setKeybord();
  });
  smooth();
  droops = [];
  brushies = [];
  // Initialize brushes to start from mouse position
  for (let i = 0; i < 3; i++) {
    brushies.push(new Brush(mouseX, mouseY, 10 + random(40), 5 + random(50)));
  }
  currentColor = randomFluorescentColor();
}

function draw() {
  // 不更新背景以保留绘制痕迹
  if (leftNumber === 1) {
    func1();
  } else if (leftNumber === 2) {
    func2();
  } else if (leftNumber === 3) {
    func3();
  } else if (leftNumber === 4) {
    func4();
  } else if (leftNumber === 5) {
    func5();
  } else if (leftNumber === 6) {
    func6();
  } else if (leftNumber === 7) {
    func7();
  } else if (leftNumber === 8) {
    func8();
  } else if (leftNumber === 9) {
    func9();
  }
}

function func1() {
  let radius = height * 0.1; // 控制笔刷的范围大小

  // 只有在鼠标按下时才更新角度并绘制
  if (mouseIsPressed) {
    radian1 = frameCount * 0.009 + mouseX * 0.01;
    radian2 = -frameCount * 0.008 + mouseY * 0.01;

    let pos1 = createVector();
    let pos2 = createVector();

    // 根据鼠标的位置设置笔刷的两个关键点
    pos1.x = mouseX + sin(radian1) * radius;
    pos1.y = mouseY + cos(radian1) * radius;

    pos2.x = mouseX + sin(radian2) * radius;
    pos2.y = mouseY + cos(radian2) * radius;

    brush(pos1, pos2); // 调用笔刷函数
  }
}

function func2() {
  // 当鼠标被按下时，绘制线条
  if (mouseIsPressed) {
    // 设置随机颜色作为描边
    stroke(random(255), random(255), random(255)); // 随机化描边颜色

    // 计算鼠标速度
    var speed = dist(pmouseX, pmouseY, mouseX, mouseY);
    strokeWeight(30 - speed); // 根据速度设置线条宽度

    line(pmouseX, pmouseY, mouseX, mouseY); // 绘制线条

    // 随机化椭圆的大小和位置
    var size = random(10, 30); // 椭圆大小范围
    var x = mouseX + random(-10, 10); // 椭圆X位置偏移
    var y = mouseY + random(-10, 10); // 椭圆Y位置偏移
    ellipse(x, y, size, size); // 绘制椭圆
  }
}

function func3() {
  if (mouseIsPressed) {
    stroke(paintColor);
    strokeWeight(brushSize);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    let angle = atan2(mouseY - pmouseY, mouseX - pmouseY);
    let x = mouseX + brushSize * cos(angle);
    let y = mouseY + brushSize * sin(angle);
    line(mouseX, mouseY, x, y);
    noStroke();
    fill(paintColor);
    let numSpatters = int(random(3, 6));
    for (let i = 0; i < numSpatters; i++) {
      let spatterX = mouseX + random(-20, 20);
      let spatterY = mouseY + random(-20, 20);
      ellipse(spatterX, spatterY, random(5, 10));
    }
  }
}

function func3_1() {
  brushSize = random([10, 20, 30, 40, 50]); // 随机笔刷大小，不超过50
  let brushOpacity = random(127, 255); // 随机透明度在50%到100%之间
  paintColor = color(random(255), random(255), random(255), brushOpacity); // 随机颜色和透明度
}

function preload() {
  photos[0] = loadImage("images/img13.jpg", imgLoaded, imgFailed);
  photos[1] = loadImage("images/img14.jpg", imgLoaded, imgFailed);
  photos[2] = loadImage("images/img15.jpeg", imgLoaded, imgFailed);
}

function func4() {
  if (mouseIsPressed && index >= 0) {
    // Draw the image at the current mouse position with fixed size
    image(
      photos[index],
      mouseX - brushSize / 2,
      mouseY - brushSize / 2,
      brushSize*3,
      brushSize*3
    );
  }

  // Optionally, draw instructional text in the top left of the canvas
  textSize(32);
  fill(0); // Set text color to black
}

function func4_1() {
  index = (index + 1) % photos.length; // Loop back to the first image if we exceed the array length
}
function func5() {
  if (drawing) {
    // Only draw if the mouse is being pressed
    // Update brush position to follow mouse
    for (let i = brushies.length - 1; i >= 0; i--) {
      let br = brushies[i];
      br.x = mouseX; // Set the brush's x position to the mouseX
      br.y = mouseY; // Set the brush's y position to the mouseY
      br.draw();
    }

    for (let i = droops.length - 1; i >= 0; i--) {
      let drp = droops[i];
      drp.draw();

      if (drp.isDead) {
        droops.splice(i, 1);
      }
    }
  }
}
function func6() {
  let radius = height * 0.3;

  if (isDrawing) {
    // Oscillating movement based on radians
    radian1 = frameCount * 0.009;
    radian2 = -frameCount * 0.008;

    let pos1 = createVector(
      mouseX + sin(radian1) * radius * 0.1,
      mouseY + cos(radian1) * radius * 0.1
    );
    let pos2 = createVector(
      mouseX + sin(radian2) * radius * 0.1,
      mouseY + cos(radian2) * radius * 0.1
    );

    // Create the brush effect
    brush2(pos1, pos2);
  }
}
function func7() {

  if (isClear) {
    segments = []
    isClear = false
  }

  if (mouseIsPressed) {
    inactivityTime = 0; // Reset inactivity timer
  } else {
    inactivityTime++;
    if (inactivityTime > 30) {
      // After ~0.5 seconds of inactivity
      isDrawing = false; // Stop drawing
    }
  }

  // Only update drawing when isDrawing is true
  if (isDrawing) {
    // Create a new segment and add it to the segments array
    let newSegment = {
      x: mouseX,
      y: mouseY,
      length: segLength + random(-variance, variance),
      angle: atan2(mouseY - pmouseY, mouseX - pmouseX), // Set the angle only once
    };
    segments.push(newSegment);
  }

  // Draw all segments using the same fluorescent color
  for (let i = 0; i < segments.length; i++) {
    let seg = segments[i];
    // Draw each segment with its stored angle
    segment(seg.x, seg.y, seg.length, seg.angle, currentColor);
  }
}
function func8() {
  if (mouseIsPressed && frameCount % 10 == 0) {
    drawShapes(mouseX, mouseY);
  }

  if (isClear) {
    isClear = false;
    drawnShapes = []
  }
}

function func9() {
  let branch = 3;

  if (mouseIsPressed) {
    for (let j = 0; j < branch; j++) {
      // 为每个分支循环
      // 从提供的颜色列表中随机选择颜色
      let colors = [
        "#78FF88",
        "#FF27D6",
        "#FFFECF",
        "#FE4CD8",
        "#D9DADC",
        "#4FC3FC",
        "#AC8B3C",
      ];
      let myColorIndex = int(random(colors.length)); // 随机选择颜色索引

      stroke(colors[myColorIndex]); // 设置随机颜色
      noFill(); // 不填充颜色

      translate(mouseX, mouseY); // 移动到鼠标位置
      rotate((180 / branch) * j); // 旋转

      for (let i = 0; i < random(2, 8); i++) {
        // 每个分支的曲线数量
        let lineAngle = random(-45, 135); // 随机的角度范围

        translate(0, i * 5); // 每次向下移动一点

        // 随机生成控制点和终点
        let controlX1 = random(-30, 30); // 第一个控制点的X坐标
        let controlY1 = random(-30, 30); // 第一个控制点的Y坐标
        let controlX2 = random(-30, 30); // 第二个控制点的X坐标
        let controlY2 = random(-30, 30); // 第二个控制点的Y坐标
        let endX = 10 + i * 3 * cos(lineAngle); // 终点的X坐标
        let endY = 10 + i * 3 * sin(lineAngle); // 终点的Y坐标

        // 绘制曲线
        strokeWeight(2); // 设置描边宽度
        beginShape(); // 开始绘制形状
        vertex(0, 0); // 当前点
        bezierVertex(controlX1, controlY1, controlX2, controlY2, endX, endY); // 添加控制点和终点
        endShape();

        translate(0, -i * 5); // 恢复位置
      }
      rotate((-180 / branch) * j); // 恢复旋转
      translate(-mouseX, -mouseY); // 恢复位置
    }
  }
}

function imgLoaded() {
  console.log("Image loaded successfully");
}

// Function called when an image fails to load
function imgFailed() {
  console.error("Image failed to load");
}

// 删除了鼠标按下时清空背景的代码
function mousePressed() {
  // 不清空背景，保留每次绘制痕迹
  if (leftNumber == 3) {
    func3_1();
  } else if (leftNumber == 4) {
    func4_1();
  } else if (leftNumber == 5) {
    drawing = true; // Start drawing when the mouse is pressed
  } else if (leftNumber == 6) {
    isDrawing = true; // 开始绘制
  }
  //  else 
  // if (leftNumber == 8) {
  //   drawShapes(mouseX, mouseY);
  // }
}

function mouseReleased() {
  drawing = false; // Stop drawing when the mouse is released
  isDrawing = false; // 停止绘制
}
function mouseDragged() {
  // Allow drawing segments while dragging
  isDrawing = true; // Keep drawing state
  // if (leftNumber == 8) {
  //   drawShapes(mouseX, mouseY);
  // }
}
// 笔刷绘制函数
function brush(pos1, pos2) {
  let lastVertex = pos1;
  let nrOfVertices = 60; // 控制线段的数量

  for (let i = 0; i < nrOfVertices; i++) {
    let amount = i / nrOfVertices;
    let sinVal = (cos(frameCount * 0.05 + amount * TWO_PI) + 1) * 0.5;

    // 在颜色之间进行插值
    let colorIndex = floor(amount * (colors.length - 1));
    let nextColorIndex = min(colorIndex + 1, colors.length - 1);
    let interpAmount = (amount * (colors.length - 1)) % 1;

    let hue = lerp(
      colors[colorIndex].hue,
      colors[nextColorIndex].hue,
      interpAmount
    );
    let saturation = lerp(
      colors[colorIndex].saturation,
      colors[nextColorIndex].saturation,
      interpAmount
    );

    // 亮度过渡，增加浅色
    let brightness = lerp(
      colors[colorIndex].brightness,
      colors[nextColorIndex].brightness,
      interpAmount
    );
    brightness = lerp(brightness, 80, 0.5); // 增加亮度向浅色过渡（避免过于明亮）

    strokeWeight(2 + sinVal * 10);
    stroke(hue, saturation, brightness, 80); // 使用插值后的颜色

    // 计算两点之间的位置，逐步绘制
    let vertexPos = p5.Vector.lerp(pos1, pos2, amount);
    line(lastVertex.x, lastVertex.y, vertexPos.x, vertexPos.y);

    lastVertex = vertexPos.copy(); // 更新最后的点
  }
}

function brush2(pos1, pos2) {
  let lastVertex = pos1;
  let nrOfVertices = 60;

  for (let i = 0; i < nrOfVertices; i++) {
    let amount = i / nrOfVertices;
    let sinVal = (cos(frameCount * 0.05 + amount * TWO_PI) + 1) * 1;

    // Dynamic stroke weight for the brush effect
    strokeWeight(2 + sinVal * 20);
    stroke(255 * sinVal, 100 + amount * 150, 200 - amount * 255, 150); // Color changes with some transparency

    let vertexPos = p5.Vector.lerp(pos1, pos2, amount);
    line(lastVertex.x, lastVertex.y, vertexPos.x, vertexPos.y);
    lastVertex = vertexPos.copy();
  }
}
function randomFluorescentColor() {
  // Generate a fluorescent color with restricted hue, saturation, and brightness
  let hue = random(60, 300); // Choose bright hues
  let saturation = random(80, 100); // High saturation
  let brightness = random(90, 100); // High brightness
  return color(hue, saturation, brightness);
}

function segment(x, y, length, angle, chosenColor) {
  let thickness = random(1, 3); // Generate random thickness between 0.1 and 1
  strokeWeight(thickness); // Set line thickness
  stroke(chosenColor); // Use current fluorescent color
  push();
  translate(x, y);
  rotate(angle); // Rotate by the given angle
  line(0, 0, length, random(30, 50)); // Randomize segment height
  pop();
}

class Brush {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = 1;
    this.h = h;
    this.vel = 1 + random(3);
    this.hue = int(random(255));
    this.sat = 22 + int(random(233));
    this.val = 255;
    this.angle = random(TWO_PI);
    this.angleChange = (0 - 1 + random(2)) / (TWO_PI * 10);

    this.hairs = [];
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        this.hairs.push(new BrushHair(i, j, this.hue, this.sat, this.val));
      }
    }
  }

  draw() {
    for (let i = 0; i < this.vel; i++) {
      let mx = cos(this.angle);
      let my = sin(this.angle);

      push();
      translate(this.x, this.y); // Use updated mouse position
      rotate(this.angle);

      let cumulativeSaturation = 0;

      for (let h of this.hairs) {
        cumulativeSaturation += h.draw();
      }

      pop();

      if (cumulativeSaturation <= 0) {
        this.reset();
      }

      this.angle += this.angleChange;
      this.angleChange += ((0 - 1 + random(1) * 2) * TWO_PI) / 1000;

      if (random(100) > 98) {
        droops.push(
          new Droop(
            this.x + cos(this.angle) * random(this.w),
            this.y + sin(this.angle) * random(this.h)
          )
        );
      }
    }
  }

  reset() {
    this.angleChange = (0 - 1 + random(2)) / (TWO_PI * 10);
    // Reset position to current mouse position
    this.x = mouseX;
    this.y = mouseY;
    this.hue = int(random(255));
    this.sat = 22 + int(random(233));
    this.val = 255;
    this.vel = 1 + random(3);
    this.w = 10;
    this.h = 5 + random(20);
    this.angle = random(TWO_PI);
    this.hairs = [];

    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        this.hairs.push(new BrushHair(i, j, this.hue, this.sat, this.val));
      }
    }
  }
}

class Droop {
  constructor(x, y) {
    this.xp = x;
    this.yp = y;
    this.mass = 4 + random(7);
    let dcol = get(int(x), int(y));
    this.r = red(dcol);
    this.g = green(dcol);
    this.b = blue(dcol);
    this.isDead = false;
  }

  draw() {
    if (this.mass <= 0) this.isDead = true;

    noStroke();
    colorMode(RGB, 255);
    fill(this.r, this.g, this.b, 128);
    ellipse(this.xp, this.yp, this.mass, this.mass);
    this.mass *= 0.9;
    this.yp += this.mass / 2;
  }
}

class BrushHair {
  constructor(x, y, ih, is, iv) {
    this.x = x;
    this.y = y;
    this.angle = random(TWO_PI);
    this.thickness = 1 + random(3);
    this.contactLen = 1 + random(6);
    this.h = ih;
    this.s = is;
    this.v = iv;
    this.saturation = (255 - random(80)) / 10;
  }

  draw() {
    if (this.saturation <= 0) return this.saturation;

    push();
    translate(this.x, this.y);
    rotate(this.angle);

    strokeWeight(this.thickness);
    colorMode(HSB, 255);
    stroke(this.h, this.s, this.v, round(this.saturation));

    this.saturation -= (1 + random(2)) / 50;

    line(0, 0, this.contactLen, 0);
    pop();

    return this.saturation;
  }
}

// Class for the marks
class Mark {
  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
    this.size = 50; // Default size, will be overridden with random size
    this.hue = color(300); // Default hue, but will be overridden
  }

  render() {
    push();
    translate(this.xPos, this.yPos, 0); // Move the box to the correct position
    fill(this.hue); // Set color using the random color
    box(this.size); // Draw a 3D box with random size
    pop();
  }
}

function drawShapes(x, y) {

  var count = 1; // Random count of shapes
  var baseSize = random(70, 30); // Base size for shapes
  var delta = 0; // Set a smaller delta for closer spacing

  noStroke(); // No outline for shapes
  for (var i = 0; i < count; i++) {
    // Randomly choose a shape type
    let shapeType = int(random(3)); // 0: ellipse, 1: square, 2: triangle
    let newX = x + random(-delta, delta);
    let newY = y + random(-delta, delta);

    // Check for overlap with previously drawn shapes
    // if (!checkOverlap(newX, newY, baseSize)) {
    if (true) {
      // Set random fill color based on mouse position and frame count
      let fillColor = color(random(255), random(255), random(255),
        150
      );

      console.log(fillColor, "fillColor");

      fill(fillColor);

      // Set shadow for glowing effect based on fill color
      drawingContext.shadowBlur = 10; // Adjust glow size
      drawingContext.shadowColor = fillColor; // Use the same color for the glow

      // Draw the selected shape
      if (shapeType === 0) {
        // Draw ellipse
        ellipse(newX, newY, baseSize);
      } else if (shapeType === 1) {
        // Draw square
        rect(newX - baseSize / 2, newY - baseSize / 2, baseSize, baseSize);
      } else if (shapeType === 2) {
        // Draw triangle
        triangle(
          newX,
          newY - baseSize,
          newX - baseSize / 2,
          newY + baseSize / 2,
          newX + baseSize / 2,
          newY + baseSize / 2
        );
      }

      // Store the drawn shape's position and size
      drawnShapes.push({ x: newX, y: newY, r: baseSize });
    }
    baseSize *= 1.2; // Reduce size for the next shape, with smaller decrement
  }
}

// Function to check overlap with existing shapes
function checkOverlap(x, y, r) {
  for (let shape of drawnShapes) {
    let d = dist(x, y, shape.x, shape.y);
    // Check if the distance is less than the sum of radii (for circles) or half the width (for squares)
    if (d < r + shape.r) {
      return true; // Overlap detected
    }
  }
  return false; // No overlap
}
