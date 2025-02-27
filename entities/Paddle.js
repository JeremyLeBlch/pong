export default class Paddle {
  constructor(x, canvas, ball, color = 'red') {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ball = ball;
    this.controller = null;
    this.x = x;
    this.y = (canvas.height - 80) / 2;
    this.width = 10;
    this.height = 70;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.color = color;
    this.speed = 300;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  setController(controller) {
    this.controller = controller;
  }

  startMoveUp() {
    this.isMovingUp = true;
  }

  stopMoveUp() {
    this.isMovingUp = false;
  }

  startMoveDown() {
    this.isMovingDown = true;
  }

  stopMoveDown() {
    this.isMovingDown = false;
  }

  update(deltaTime) {
    this.controller?.update();

    if (this.isMovingUp && this.y > 0) {
      this.y -= this.speed * deltaTime;
      if (this.y < 0) this.y = 0;
    }

    if (this.isMovingDown && this.y < this.canvas.height - this.height) {
      this.y += this.speed * deltaTime;
      if (this.y > this.canvas.height - this.height) {
        this.y = this.canvas.height - this.height;
      }
    }
  }
}