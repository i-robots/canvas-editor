<template>
  <div class="props-rect">
      circle props goes here, fill:  {{ selected.fill }}
  </div>      
</template>

<script>
    // import { bus } from '@/main';
    // import utils from "@/utils/utils.js"; 

    import { store } from '@/store/store.js';


    export default {
        name: 'propCircle',
        props: {

        },
        computed: {
            selected: () => { return store.selected ? JSON.parse(store.selected) : undefined }
        },

        mounted() {

        },

        methods: {

        }

    }
</script>

<style scoped>
    .props-rect {
        /*height: 4rem;*/
        /*background: red;*/

    }
</style>
