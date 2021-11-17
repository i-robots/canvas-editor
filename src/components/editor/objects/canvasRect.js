import { canvasObject } from '@/components/editor/objects/canvasObject.js'

import utils from '@/utils/utils.js'

const margin = 5;

export class canvasRect extends canvasObject {
    constructor(id, x1, x2, y1, y2, fill) {
        super(id, 'rect');
        
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.minW = 10;
        this.minH = 10;

        this.fill = fill;
    }

    getHitZone(curX, curY) {

        if (utils.contains(curX, curY, this.x1, this.y1, this.x2, this.y2)) return "center";

        let handleSize = 5; //todo: global

        let x;
        let y;

        x = this.x1 - margin;
        y = this.y1 - margin;
        if (utils.contains(curX, curY, x - handleSize, y - handleSize, x + handleSize, y + handleSize)) return "lt";

        x = this.x2 + margin;
        y = this.y1 - margin;
        if (utils.contains(curX, curY, x - handleSize, y - handleSize, x + handleSize, y + handleSize)) return "rt";

        x = this.x2 + margin;
        y = this.y2 + margin;
        if (utils.contains(curX, curY, x - handleSize, y - handleSize, x + handleSize, y + handleSize)) return "rb";

        x = this.x1 - margin;
        y = this.y2 + margin;
        if (utils.contains(curX, curY, x - handleSize, y - handleSize, x + handleSize, y + handleSize)) return "lb";


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
            case "lt":
                this.x1 = this._x1 + deltaX;
                this.y1 = this._y1 + deltaY;
                break;
            case "rt":
                this.x2 = this._x2 + deltaX;
                this.y1 = this._y1 + deltaY;

                break;
            case "rb":

                this.x2 = this._x2 + deltaX;
                this.y2 = this._y2 + deltaY;

                if (this.x2 < this.x1 + this.minW) this.x2 = this.x1 + this.minW;
                if (this.y2 < this.y1 + this.minH) this.y2 = this.y1 + this.minH;

                break;
            case "lb":
                this.x1 = this._x1 + deltaX;
                this.y2 = this._y2 + deltaY;
                break;

        }

    }

    drawHandles(ctx) {

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';

        let w = this.x2 - this.x1;
        let h = this.y2 - this.y1;
        ctx.strokeRect(this.x1 - margin, this.y1 - margin, w + 2 * margin, h + 2 * margin);


        //handles are all the same, circle will use the same function to draw its handles

        this.drawHandle(ctx, this.x1 - margin, this.y1 - margin);
        this.drawHandle(ctx, this.x2 + margin, this.y1 - margin);
        this.drawHandle(ctx, this.x2 + margin, this.y2 + margin);
        this.drawHandle(ctx, this.x1 - margin, this.y2 + margin);


    }


}
