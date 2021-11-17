//fabric.util.createClass
import { canvasCircle } from '@/components/editor/objects/canvasCircle.js'

export class Circle extends canvasCircle{
    constructor(id, x, y, radius, fill){
        super(id, x, y, radius, fill);
    }

    render(ctx){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        ctx.fill();
        ctx.closePath();
        
        if (this.selected)
            this.drawHandles(ctx);
    }
}