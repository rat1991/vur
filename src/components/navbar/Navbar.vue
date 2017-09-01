<template>
  <nav class="ui-navbar" ref="navbar">
      <li v-for="(item, index) in menu" :key="index"
      :class="['ui-navbar__item', item.label === value && 'active']"
      @click="onSwitch(item)">
        <i :class="['ui-navbar__icon', item.icon || 'icon-star']"></i>
        <span class="ui-navbar__label">{{item.label}}</span>
      </li>
  </nav>
</template>

<script>
import $ from '../../libs/utils.js';
export default {
    name: "ui-navbar",
    props: {
      menu: {
        type: Array,
        default(){
          return [{
            label: '菜单',
            icon: 'icon-star'
          }]
        }
      },
      value: String
    },
    data(){
      return {
        current: ''
      }
    },
    created(){
      if(this.$route){
        let path = this.$route.path;
        this.menu.forEach((cur)=>{
          if(path === cur.to){
            this.current = cur.label
          }
        })
      }
    },
    mounted(){
      this.addGap()
    },
    watch: {
      value(newVal){
        this.current = newVal
      },
      current(newVal){
        this.$emit('input',newVal)
      }
    },
    methods: {
      addGap(){
        let gap = this.$refs.navbar.offsetHeight + 1;
        let page = this.$parent.$el;
        page.style.paddingBottom = `${gap}px`
      },
      onSwitch(item){
        this.current = item.label
        $.url(item.to, this.$router)
      }
    }
}
</script>