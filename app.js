import Game from "./entities/Game.js";

const game = new Game("pongpong", "start");

function startTheGame() {
  game.start();
}

window.startTheGame = startTheGame;
