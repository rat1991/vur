<template>
  <div :class="['ui-footer',{'ui-footer_fixed-bottom':isFix}]">
    <p class="ui-footer__links">
        <a href="javascript:void(0);" 
           class="ui-footer__link" 
           v-for="(title, url) in link"
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
import {go} from '../../libs/util_url.js';
    
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
        var elPage = document.getElementsByClassName("page-current")[0];
        var elFooter = this.$el;
        if(elPage.scrollHeight > elPage.offsetHeight){
            this.isFix = false
        };
        if(this.isFix) elPage.style.paddingBottom = elFooter.offsetHeight + 'px';
        
    },
    methods: {
        onClick (url) {
            go(url, this.$router)
        }
    }
}
</script>