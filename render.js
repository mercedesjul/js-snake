class Render {
    board = null;;
    ctx = null;
    constructor () {
        this.board = document.getElementById("board");
        this.ctx = board.getContext("2d");
    }
    drawTile(x, y, color = "rgb(0, 0, 0)") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * 20, y * 20, 20, 20);
    }
    clear() {
        this.ctx.clearRect(0,0,600,600);
    }
    draw() {
        
    }
}