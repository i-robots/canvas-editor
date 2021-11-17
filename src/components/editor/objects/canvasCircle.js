import { canvasObject } from '@/components/editor/objects/canvasObject.js'

import utils from '@/utils/utils.js'

export class canvasCircle extends canvasObject{
    constructor(id,x,y,radius,fill){
        super(id,'circle'); 
        this.radius =radius; 
        this.x = x;
        this.y = y;  
        
        this.minR = 10;
        
        this.fill = fill;
    }

    getHitZone(curX,curY){
        if (utils.distance(this.x, curX, this.y, curY) < this.radius) return "center";
        
        const margin = 6;
        const handleRadius = 5; 
        if (utils.distance(this.x + this.radius + margin, curX, this.y, curY) < handleRadius) return "handler";
        return undefined;
    }
    
    pin(){
        this._x = this.x;
        this._y = this.y;
        this._radius = this.radius;
    }
    
    move(deltaX, deltaY){
        this.x = this._x + deltaX;
        this.y = this._y + deltaY;
    }
    
    dragHandle(handle, deltaX) {
        if(handle == "handler"){
            
            this.radius = this._radius + deltaX
            
            //and now check the min
            if(this.radius < this.minR) this.radius = this.minR;
            
        }
    }
    
    drawHandles(ctx){
        const margin = 6;
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'grey';
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + margin, 0, Math.PI*2, false);
        ctx.stroke();
        ctx.closePath();
        
        this.drawHandle(ctx, this.x + this.radius + margin, this.y)
    }
}