export class canvasObject {
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.selected = false;
    }


    drawHandle(ctx, x, y) {
        ctx.beginPath();
        
        ctx.arc(x, y, 5, 0, Math.PI * 2, false)
        ctx.fillStyle = 'white';
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.stroke();

        ctx.closePath();
    }


}
