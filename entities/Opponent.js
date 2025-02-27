import Paddle from "./Paddle.js";

export default class Opponent extends Paddle {
  constructor(x, canvas, ball) {
    super(x, canvas, ball, "blue");
  }
}