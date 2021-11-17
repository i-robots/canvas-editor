<template>
  <div class="props">
      
      <!--{{selected}}-->
      
      selected: {{selected ? selected.type : "none"}}
      
      <propsRect v-if="selected && selected.type == 'rect'"  /> 
      <propsCircle v-if="selected && selected.type == 'circle'"  /> 
      
     <!--...etc-->
      
  </div>      
</template>

<script>
    // import { bus } from '@/main';
    // import utils from "@/utils/utils.js"; 

    import { store } from '@/store/store.js';

    import propsRect from '@/components/props/props-rect.vue'
    import propsCircle from '@/components/props/props-circle.vue'
    // import propsLine from '@/components/props/props-line.vue'


    export default {
        name: 'props',
        props: {

        },
        components: {
            propsRect,
            propsCircle,
            // propsLine

        },
        computed: {
            selected: () => { return store.selected ? JSON.parse(store.selected) : undefined }
        },
        watch: {
            "selected": function() {
                console.log("selection has been changed");
            }
        },

        mounted() {

        },

        methods: {

        }

    }
</script>

<style scoped>
    .props {
        height: 50px;
        background: #dddddd;

    }
</style>
