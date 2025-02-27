import Paddle from "./Paddle.js";

export default class Player extends Paddle {
  constructor(x, canvas, ball) {
    super(x, canvas, ball, 'red');
  }
}