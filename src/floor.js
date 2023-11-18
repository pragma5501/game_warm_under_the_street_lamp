
export class Floor {
    constructor(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.w = stageWidth;
        this.h = 100;
    }
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.rect(0, this.stageHeight - this.h, this.w, this.h);
        ctx.fill();
    }
}