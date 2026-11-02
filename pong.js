let leftY = 160;
let rightY = 160;

let ballX = 300;
let ballY = 200;

let speedX = 6;
let speedY = 5;

let trail = [];

let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(20);

  if (keyIsDown("w")) {
    leftY -= 5;
  }

  if (keyIsDown("s")) {
    leftY += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    rightY -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    rightY += 5;
  }

  leftY = constrain(leftY, 0, height - 80);
  rightY = constrain(rightY, 0, height - 80);

  ballX += speedX;
  ballY += speedY;

  trail.push({
    x: ballX,
    y: ballY,
  });

  if (trail.length > 12) {
    trail.shift();
  }

  noStroke();

  for (let i = 0; i < trail.length; i++) {
    fill(255, i * 20);
    circle(trail[i].x, trail[i].y, i);
  }

  if (ballY < 0 || ballY > height) {
    speedY *= -1;
  }

  if (speedX < 0 && ballX - speedX >= 35 && ballX <= 35) {
  let t = (35 - (ballX - speedX)) / speedX;
  let hitY = ballY - speedY * (1 - t);

  if (hitY + 7.5 >= leftY && hitY - 7.5 <= leftY + 80) {
    ballX = 35;
    speedX *= -1;

    let vect = p5.Vector.rotate(
      createVector(speedX, speedY),
     ((hitY - (leftY + 40)) / 40) * PI / 12
    );

    speedX = vect.x;
    speedY = vect.y;
  }
}

if (speedX > 0 && ballX - speedX <= 565 && ballX >= 565) {
  let t = (565 - (ballX - speedX)) / speedX;
  let hitY = ballY - speedY * (1 - t);

  if (hitY + 7.5 >= rightY && hitY - 7.5 <= rightY + 80) {
    ballX = 565;
    speedX *= -1;

    let vect = p5.Vector.rotate(
      createVector(speedX, speedY),
      ((hitY - (rightY + 40)) / 40) * PI / 12
    );

    speedX = vect.x;
    speedY = vect.y;
  }
}

  if (ballX < 0) {
    rightScore++;
    resetBall();
  }

  if (ballX > width) {
    leftScore++;
    resetBall();
  }

  stroke(100);
  line(width / 2, 0, width / 2, height);

  noStroke();
  fill(255);
  rect(20, leftY, 10, 80);
  rect(width - 30, rightY, 10, 80);

  circle(ballX, ballY, 15);

  textSize(32);
  fill(255);
  text(leftScore, 150, 50);
  text(rightScore, 450, 50);
}

function resetBall() {
  ballX = width / 2;
  ballY = height / 2;

  speedX *= -1;
}
