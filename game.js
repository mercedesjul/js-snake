class Game {
  keycode = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };
  interval = null;
  height;
  width;
  tiles = [];
  snake = null;
  foodtile = null;
  render = null;
  constructor(height = 30, width = 30) {
    document.addEventListener("keydown", e => {
      this.handleKey(e.keyCode);
    });
    this.init(height,width);
  }
  init(height, width) {
    this.interval = null;
    this.height;
    this.width;
    this.tiles = [];
    this.snake = null;
    this.foodtile = null;
    this.render = null;

    this.height = height;
    this.width = width;
    this.render = new Render();
    for (let i = 0; i < height * width; i++) {
      this.tiles.push(new Tile(i, this.width));
    }
    this.snake = new Snake(this, this.getTileByXY(15, 15), [this.getTileByXY(15,16),this.getTileByXY(15,17)]);
    this.foodtile = this.generateFoodTile();
    this.interval = setInterval(this.mainLoop, 200, this);
  }
  
  mainLoop(game) {
    game.snake.move(game.snake.facing);
    game.render.clear();
    let head = game.snake.head;
    let tail = game.snake.tail;
    if (game.checkIfHeadCollidesWithBody()) {
      alert("You ate yourself");
      location.reload();
    }
    if (game.checkIfTileCollidesHead(game.foodtile)){
      tail.push(game.foodtile);
      game.foodtile = game.generateFoodTile();
    }

    //Render
    game.render.drawTile(game.foodtile.x, game.foodtile.y, "rgb(50,205,50)");
    tail.forEach(element => {
      game.render.drawTile(element.x, element.y);
    });
    game.render.drawTile(head.x, head.y, "rgb(200, 0, 0)");
  }
  generateFoodTile() {
    let tmp = [];
    tmp = this.tiles.filter(tile => this.checkIfTileCollides(tile), this);

    return tmp[Math.floor(Math.random() * tmp.length)];
  }
  checkIfTileCollides(tile) {
    let tmp = this.snake.tail.filter(tail => tile.equalTo(tail), tile);
    return tile.equalTo(this.snake.head) || this.snake.tail.filter(tail => tile.equalTo(tail), tile).length == 0;
  }
  checkIfTileCollidesHead(tile) {
    return tile.equalTo(this.snake.head);
  }
  checkIfHeadCollidesWithBody(){
    return !this.snake.tail.filter(tail => this.snake.head.equalTo(tail), this.snake.head).length == 0;
  }
  getTileByXY(x, y) {
    if(x > 29 || y > 29 || x < 0 || y < 0) {
      alert("You died!");
      location.reload();
    }
    return this.tiles[x + this.width * y];
  }
  handleKey(keyCode) {
    switch (keyCode) {
      case this.keycode.left:
        this.snake.facing = this.snake.directions.left;
        break;
      case this.keycode.right:
        this.snake.facing = this.snake.directions.right;
        break;
      case this.keycode.up:
        this.snake.facing = this.snake.directions.up;
        break;
      case this.keycode.down:
        this.snake.facing = this.snake.directions.down;
        break; 
      }
      this.mainLoop(this);
      clearInterval(this.interval);
      this.interval = setInterval(this.mainLoop, 200, this);
  }
}
