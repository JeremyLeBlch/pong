import Paddle from "./Paddle.js";

export default class Player extends Paddle {
    constructor(x, canvas) {
        super(x, canvas);
        this.color = "red";
        this.speed = 20;
    }

    moveUp() {
        if (this.y > 0) this.y -= this.speed;
    }

    moveDown() {
        if (this.y < this.canvas.height - this.height) this.y += this.speed;
    }
}