<template>
  <section
   :class="['ui-cell', {'ui-cell_access': access || !!link}]" 
   @click="onClick">
    <div class="ui-cell__hd" v-if="slothd">
      <slot name="hd"></slot>
    </div>
    <div class="ui-cell__bd">
      <slot></slot>
    </div>
    <div class="ui-cell__ft"  v-if="slotft">
      <slot name="ft"></slot>
    </div>
    <div class="ui-cell__desc" v-if="slotdesc">
      <slot name="desc"></slot>
    </div>
  </section>
</template>

<script>
  import {go} from '../../libs/util_url.js';
  
  export default {
    name: 'ui-cell',
    props: {
      access: {
        type: Boolean,
        default: false
      },
      link: [String, Object]
    },
    computed: {
      slothd: function(){
        return this.$slots.hd;
      },
      slotft: function(){
        return this.$slots.ft;
      },
      slotdesc: function(){
        return this.$slots.desc;
      }
    },
    methods: {
      onClick () {
        go(this.link, this.$router)
      }
    }
  }
</script>