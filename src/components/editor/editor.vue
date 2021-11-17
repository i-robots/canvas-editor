<template>
  <div>
    <canvas ref="can" width="800" height="600" @mousedown="mousedown" @mouseup="mouseup" @mousemove="mousemove"></canvas>
    <div>{{scale*100 + '%'}}</div>
  </div>
</template>

<script>
  import { Line } from '@/components/editor/objects/line.js'
  import { Circle } from '@/components/editor/objects/circle.js'
  import { Rectangle } from '@/components/editor/objects/rect.js'
  // import { Image } from '@/components/editor/objects/image.js'


  // import { bus } from '@/main';
  // import utils from "@/utils/utils.js"; 

  import { store } from '@/store/store.js';

  export default {
    name: 'editor',
    props: {
      scale: {
        type: Number,
        default: 1
      }

    },

    data: () => {
      return {
        canvas: undefined,
        objects: [],
        selectedObj: null,

        drag: undefined,
        dragX: 0,
        dragY: 0,


      }
    },

    mounted() {
      this.canvas = this.$refs.can;   

      let rectangle = new Rectangle('r1', 500, 600, 100, 200, 'green');
      let line = new Line('l1', 20, 80, 60, 10, 'red');
      let circle = new Circle('c1', 200, 150, 100, '#f56');

      this.objects.push(circle);
      this.objects.push(rectangle);
      this.objects.push(line);
      this.render();
    },

    methods: {
      getCurXY(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return { x, y };

      },

      mousedown(event) {
        let { x, y } = this.getCurXY(event);
        let res = this.getHitZone(x, y);

        if(res) { 
          store.selected = JSON.stringify(this.objects[res.index])
        }
        
        this.drag = undefined;

        this.unselectAll();

        if (res) {
          this.drag = JSON.parse(JSON.stringify(res));
          this.dragX = x;
          this.dragY = y;


          let object = this.objects[this.drag.index];
          object.selected = true;

          this.pin();
        }

        this.render();

      },

      mousemove(event) {
        if (!this.drag) return;
        let { x, y } = this.getCurXY(event);

        let deltaX = x - this.dragX;
        let deltaY = y - this.dragY;

        // console.log('dragging', deltaX, deltaY, );


        let object = this.objects[this.drag.index];
        if (this.drag.hit == "center") {
          object.move(deltaX, deltaY);

        }
        else {
          object.dragHandle(this.drag.hit, deltaX, deltaY)
        }



        this.render();


      },


      mouseup() {
        if (!this.drag) return;

        // console.log('end drag')

        this.drag = undefined;

        this.render();


      },



      getHitZone(curX, curY) {
        for (let i = this.objects.length - 1; i >= 0; i--) {
          let hit = this.objects[i].getHitZone(curX, curY)
          if (hit) return { index: i, hit: hit }
        }

        return undefined;
      },


      pin() {

        //save locations
        this.objects.forEach(object => { object.pin() })

      },

      selectAll() {
        this.objects.forEach(object => { object.selected = true })

      },
      unselectAll() {
        this.objects.forEach(object => { object.selected = false })

      },

      render() {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.objects.forEach(object => {
          object.render(ctx);
        })

      },





    }
  }
</script>

<style scoped>
canvas {
  /*width: 800px;*/
  /*height: 600px;*/
  max-width: none;
}
</style>
