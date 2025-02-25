export default class Paddle {
    constructor(x, canvas) {
        this.x = x;
        this.y = (canvas.height - 80) / 2;
        this.width = 10;
        this.height = 120;
        this.color = "blue";
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");}

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }


}