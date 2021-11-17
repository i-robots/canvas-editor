import { canvasRect } from '@/components/editor/objects/canvasRect.js'

export class Rectangle extends canvasRect {
  constructor(id, x1, x2, y1, y2, fill) {
    super(id, x1, x2, y1, y2, fill)
  }

  render(ctx) {
    ctx.fillStyle = this.fill;

    let w = this.x2 - this.x1;
    let h = this.y2 - this.y1;
    ctx.fillRect(this.x1, this.y1, w, h);


    if (this.selected)
      this.drawHandles(ctx);

  }







}
