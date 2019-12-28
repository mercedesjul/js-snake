class Snake {
  directions = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
  };
  game;
  facing;
  head;
  tail = [];
  constructor(game, head, tail = [], facing = 0) {
    this.head = head;
    this.tail = tail;
    this.facing = this.directions.up;
    this.game = game;
    this.facing = facing;
  }
  move(direction) {
    let tmp = [];
    tmp.push(this.head);
    switch (direction) {
      case this.directions.up:
        this.head = this.game.getTileByXY(this.head.x, this.head.y - 1);
        break;

      case this.directions.down:
        this.head = this.game.getTileByXY(this.head.x, this.head.y + 1);
        break;

      case this.directions.right:
        this.head = this.game.getTileByXY(this.head.x + 1, this.head.y);
        break;

      case this.directions.left:
        this.head = this.game.getTileByXY(this.head.x - 1, this.head.y);
        break;
    }
    for (let i = 0; i < this.tail.length - 1; i++) {
      tmp.push(this.tail[i]);
    }
    this.tail = tmp;
  }
}
