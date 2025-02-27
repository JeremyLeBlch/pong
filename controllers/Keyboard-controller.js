import PaddleController from "./PaddleController.js";

export default class KeyboardController extends PaddleController {

  constructor(paddle, ups = ['ArrowUp', 'z'], downs = ['ArrowDown', 's']) {
    super(paddle);
    this.ups = ups;
    this.downs = downs;

    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    document.addEventListener("keyup", (event) => this.handleKeyUp(event));
  }

  handleKeyDown(event) {
    if (this.ups.includes(event.key)) {
      this.paddle.startMoveUp();
    }
    if (this.downs.includes(event.key)) {
      this.paddle.startMoveDown();
    }
  }

  handleKeyUp(event) {
    if (this.ups.includes(event.key)) {
      this.paddle.stopMoveUp();
    }
    if (this.downs.includes(event.key)) {
      this.paddle.stopMoveDown();
    }
  }
}