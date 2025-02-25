export default class Ball {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 10;
        this.color = "blue";
        this.ctx = canvas.getContext("2d");
        this.speedX = -1;
        this.speedY = -0.4;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    update(paddle1, paddle2) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y - this.radius <= 0 || this.y + this.radius >= this.canvas.height) {
            this.speedY *= -1;
        }

        if (this.checkCollision(paddle1) || this.checkCollision(paddle2)) {
            this.speedX *= -1;
        }
    }

    checkCollision(paddle) {
        return (
            this.x - this.radius <= paddle.x + paddle.width && this.x + this.radius >= paddle.x &&
            this.y >= paddle.y && this.y <= paddle.y + paddle.height
        );
    }
}