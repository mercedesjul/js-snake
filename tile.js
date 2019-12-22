class Tile {
    x;
    y;
    constructor(pos, gameSize) {
        this.x = Math.floor(pos % gameSize);
        this.y = Math.floor(pos / gameSize);
    }
    toRender() {
        return {x: this.x, y: this.y};
    }
}