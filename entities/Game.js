import Player from "./Player.js";
import Ball from "./Ball.js";
import Opponent from "./Opponent.js";

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.player = new Player(10, this.canvas);
        this.ball = new Ball(this.canvas);
        this.opponent = new Opponent(this.canvas.width - 10, this.canvas);

        document.addEventListener("keydown", (event) => this.handleKeyPress(event));

        this.gameLoop();
    }

    handleKeyPress(event) {
        if (event.key === "ArrowUp") this.player.moveUp();
        if (event.key === "ArrowDown") this.player.moveDown();
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.opponent.draw(this.ctx);
        this.opponent.move(this.ball.y);
        this.ball.update(this.player, this.opponent);
        requestAnimationFrame(() => this.gameLoop());
        console.log(this.ball.y);
    }
}