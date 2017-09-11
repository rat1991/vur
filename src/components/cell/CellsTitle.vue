<template>
  <div :class="['ui-cells__title',className]">
    <span class="content">{{title}}<slot></slot></span>
    <span class="link" v-if="link" @click="onLink">{{link.label}}<slot name="link"></slot></span>
  </div>
</template>

<script>
import $ from '@/libs/utils'

export default {
  name: 'ui-cells-title',
  props: {
    title: String,
    link: Object, // {label: '上传文件', to: '/'}
    className: [String, Object, Array],
  },
  methods: {
    onLink(){
      if(typeof this.link.to === 'function'){
        this.link.to()
      }else{
        $.url(this.link.to, this.$router)
      }
    }
  }
}
</script>