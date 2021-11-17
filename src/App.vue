<template>
  <div>
    
    <props />
    <editor />
    
  </div>
</template>

<script>
import editor from '@/components/editor/editor.vue'
import props from '@/components/props/props.vue'

export default {
  name: 'App',
  components: {
    editor,
    props
  }
}
</script>

<style>


</style>
