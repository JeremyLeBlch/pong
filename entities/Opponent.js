import Paddle from "./Paddle.js";

export default class Opponent extends Paddle {
    constructor(x, canvas) {
        super(x, canvas);
        this.color = "blue";
        this.speed = 0.2;

    }
    move(ballY) {
        let targetY = ballY - this.height / 2;
        this.y += (targetY - this.y) * this.speed;
    }
}