import PaddleController from "./PaddleController.js";

export default class IAController extends PaddleController {

  update() {
    const ball = this.paddle.ball;

    const ballY = ball.y - ball.radius / 2;
    const targetY = ballY - this.paddle.height / 2;
    const distance = Math.abs(this.paddle.y - targetY);

    if (distance < 10) {
      this.paddle.stopMoveDown();
      this.paddle.stopMoveUp();
      return;
    }

    if (targetY < this.paddle.y) {
      this.paddle.startMoveUp();
    } else {
      this.paddle.startMoveDown();
    }
  }
}