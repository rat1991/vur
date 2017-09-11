<template>
  <div class="ui-default">
    <div class="ui-default__icon">
      <i :class="['icon',icon]"></i>
    </div>
    <div class="ui-default__content">
      <h4 v-if="title">{{title}}</h4>
      <p v-if="text">{{text}}</p>
    </div>
    <div class="ui-default__links" v-if="links">
      <a v-for="(item, index) in links" :key="index" @click="onLink(item.to)">{{item.label}}</a>
    </div>
  </div>
</template>

<script>
import $ from '../../libs/utils.js';
export default {
    name: 'ui-default',
    props: {
      icon: {
        type: String,
        default: 'icon-circle-warn'
      },
      title: String,
      text: String,
      links: Array
    },
    data() {
      return {

      }
    },
    computed:{
    },
    created() {
    },
    watch: {
    },
    methods: {
      onLink(url){
        $.url(url, this.$router)
      }
    }
}
</script>