class Game {
    height;
    width;
    tiles = [];
    snake = null;
    render = null;
    constructor(height = 20, width = 20) {
        this.height = height;
        this.width = width;
        this.render = new Render();
        for(let i = 0; i < height*width; i++){
            this.tiles.push(new Tile(i, this.width));
        }
        this.snake = new Snake(this.tiles[315]);
        console.log()
        setInterval(this.mainLoop, 1000, this.render, this.snake);
    }
    mainLoop (render, snake) {
        render.clear();
        let head = snake.head;
        render.drawTile(head.x, head.y); 
    }

}