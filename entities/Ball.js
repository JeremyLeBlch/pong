export default class Ball {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = 6;
    this.color = "white";
    this.ctx = canvas.getContext("2d");

    this.initialSpeed = 2;

    this.reset();

    this.maxSpeed = 4;
    this.speedIncrement = 0.2;
    this.score = {player: 0, opponent: 0};
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  update(paddle1, paddle2) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y - this.radius <= 0 || this.y + this.radius >= this.canvas.height) {
      this.speedY *= -1;
      if (this.y - this.radius <= 0) {
        this.y = this.radius;
      } else if (this.y + this.radius >= this.canvas.height) {
        this.y = this.canvas.height - this.radius;
      }
    }

    const paddle = this.speedX < 0 ? paddle1 : paddle2;
    if (this.checkCollision(paddle)) {
      this.handlePaddleCollision(paddle);
    }

    if (this.x + this.radius < 0) {
      this.score.opponent++;
      this.reset();
    } else if (this.x - this.radius > this.canvas.width) {
      this.score.player++;
      this.reset();
    }
  }

  checkCollision(paddle) {
    return (
      this.x - this.radius <= paddle.x + paddle.width &&
      this.x + this.radius >= paddle.x &&
      this.y >= paddle.y &&
      this.y <= paddle.y + paddle.height
    );
  }

  handlePaddleCollision(paddle) {
    const relativeIntersectY = (paddle.y + (paddle.height / 2)) - this.y;
    const normalizedRelativeIntersectionY = relativeIntersectY / (paddle.height / 2);

    const bounceAngle = normalizedRelativeIntersectionY * (Math.PI / 3);

    const direction = this.speedX < 0 ? 1 : -1;

    const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);

    const newSpeed = Math.min(currentSpeed * (1 + this.speedIncrement), this.maxSpeed);

    this.speedX = direction * Math.cos(bounceAngle) * newSpeed;
    this.speedY = Math.sin(bounceAngle) * newSpeed;

    if (direction > 0) {
      this.x = paddle.x + paddle.width + this.radius;
    } else {
      this.x = paddle.x - this.radius;
    }
  }

  reset() {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;

    const angle = (Math.random() * 0.5 - 0.25) * Math.PI;

    const direction = Math.random() < 0.5 ? 1 : -1;

    this.speedX = direction * Math.cos(angle) * this.initialSpeed;
    this.speedY = Math.sin(angle) * this.initialSpeed;
  }

  setInitialSpeed(speed) {
    this.initialSpeed = speed;
    this.reset();
  }

  getScore() {
    return this.score;
  }
}