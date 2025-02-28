import Player from "./Player.js";
import Ball from "./Ball.js";
import Opponent from "./Opponent.js";
import KeyboardController from "../controllers/Keyboard-controller.js";
import IAController from "../controllers/IA-controller.js";

/*

abstraction !!

interface -> plusieurs implementation

 */

/* ECS (entity component system)

const world = new World(new CanvasRendererEngine());

World
 - renderEngine: RenderEngine (html, ios, android...)
 - gameObjects: GameObject[]
 - update : gameObjects.forEach(go => go.update(deltaTime));

GameObject
    - position: Vector2
    - scale: Vector2
    - children: GameObject[]
    - components: Component[]
          - renderer (1 max)
          - colliders[] (collisions)
          - script custom !
    - update : children.forEach(go => go.update(deltaTime));


 SpriteRenderer {
   render(){
     World.rendererEngine.fillRect(this.x, this.y, this.width, this.height);
   }
 }

 const ball = new GameObject('Ball');
 ball.addComponent(new BallScript()); // script perso

 const ballDesign = new GameObject('BallDesign');
 ballDesign.addComponent(new SpriteRenderer('../image.png', 100, 100));
 ballDesign.addComponent(new CircleCollider(50));

 ball.addChildren(ballDesign);
 */

export default class Game {

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.ball = new Ball(this.canvas);

    this.player = new Player(0, this.canvas, this.ball);
    this.player.setController(new KeyboardController(this.player));

    this.opponent = new Opponent(this.canvas.width - 10, this.canvas, this.ball);
    this.opponent.setController(new IAController(this.opponent));

    this.lastTime = -1;

    this.isRunning = false;
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.gameLoop(0);
    }
  }

  end() {
    this.isRunning = false;
  }

  gameLoop(currentTime) {
    if (!this.lastTime < 0) {
      this.lastTime = currentTime;
    }

    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.update(deltaTime);
    this.opponent.update(deltaTime);
    this.ball.update(this.player, this.opponent);

    this.player.draw(this.ctx);
    this.ball.draw(this.ctx);
    this.opponent.draw(this.ctx);

    const score = this.ball.getScore();

    //score draw
    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`${score.player} - ${score.opponent}`, this.canvas.width / 2, 30);

    //end game
    if (score.player === 5 || score.opponent === 5) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "24px Arial";
      this.ctx.textAlign = "center";
      if (score.player === 5) {
        this.ctx.fillText(`Victoire du joueur`, this.canvas.width / 2, this.canvas.height / 2);
      } else {
        this.ctx.fillText(`Victoire de l'adversaire`, this.canvas.width / 2, this.canvas.height / 2);
      }
      this.end();
    }

    if (this.isRunning) {
      requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
  }
}