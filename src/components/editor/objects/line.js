//fabric.util.createClass

import { canvasObject } from '@/components/editor/objects/canvasObject.js'
import utils from '@/utils/utils.js'

export class Line extends canvasObject {
    constructor(id, x1, x2, y1, y2, fill) {
        super(id, 'line');
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.fill = fill;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.storkeStyle = this.fill;
        ctx.stroke();

        if (this.selected) this.drawHandles(ctx);
    }


    getHitZone(curX, curY) {
        const handleRadius = 5;
        if (utils.distance(this.x1, curX, this.y1, curY) < handleRadius) return 'handle1'
        if (utils.distance(this.x2, curX, this.y2, curY) < handleRadius) return 'handle2'

        let p1 = this.x2 - this.x1,
            p2 = this.y2 - this.y1,
            x0 = this.x1 - curX,
            y0 = this.y1 - curY;

        const distance = Math.abs(p1 * y0 - p2 * x0) / Math.sqrt((p1 * p1) + (p2 * p2))

        //check if mouse is on the clockwise or counter-clockwise side
        const tolerance = (p1 * y0 - p2 * x0) > 0 ? 6 : 1;

        if (distance < tolerance) return "center";

        return undefined;
    }

    pin() {
        this._x1 = this.x1;
        this._y1 = this.y1;
        this._x2 = this.x2;
        this._y2 = this.y2;
    }

    move(deltaX, deltaY) {
        this.x1 = this._x1 + deltaX;
        this.y1 = this._y1 + deltaY;

        this.x2 = this._x2 + deltaX;
        this.y2 = this._y2 + deltaY;
    }

    dragHandle(handle, deltaX, deltaY) {

        switch (handle) {
            case "handle1":
                this.x1 = this._x1 + deltaX;
                this.y1 = this._y1 + deltaY;

                break;
            case "handle2":
                this.x2 = this._x2 + deltaX;
                this.y2 = this._y2 + deltaY;
                break;
        }

    }


    drawHandles(ctx) {
        this.drawHandle(ctx, this.x1, this.y1);
        this.drawHandle(ctx, this.x2, this.y2);
    }
}
