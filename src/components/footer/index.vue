<template>
  <div :class="['ui-footer',{'ui-footer_fixed':isFix}]">
    <p class="ui-footer__links">
        <a href="javascript:void(0);" 
           class="ui-footer__link" 
           v-for="(url, title) in link"
           :key="title"
           @click="onClick(url)">
            {{title}}
        </a>
    </p>
    <p class="ui-footer__text">
        <slot></slot>
    </p>
  </div>
</template>

<style lang="sass">
  @import "./Footer";
</style>

<script>
import $ from '../../libs/utils.js';
    
export default {
    name: 'ui-footer',
    props: {
        link:{
            type: Object,
        }
    },
    data(){
        return {
            isFix: true
        }
    },
    mounted() {
        let clientHeight = document.documentElement.clientHeight;
        let prevElOffset = this.$el.previousElementSibling.getBoundingClientRect();
        this.isFix = prevElOffset.bottom > clientHeight ? false : true;
        if(this.isFix){
            let elHeight = this.$el.offsetHeight;
            let fillerTpl = `<div style="height: ${elHeight}px; visibility: hidden">ui-footer filler</div>`;
            this.$el.insertAdjacentHTML('afterend', fillerTpl);
        }
        
    },
    methods: {
        onClick (url) {
            $.url(url, this.$router)
        }
    }
}
</script>