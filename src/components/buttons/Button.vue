<template>
  <button :class="classes" :disabled="disabled" @click="onLink">
      <slot></slot>
  </button>
</template>

<script>
import $ from '../../libs/utils.js';

export default {
    name: "ui-button",
    props: {
      type: {
        type: String,
        default: 'default'  // default, success, info, warn, danger
      },
      size: {
        type: String,
        default: 'md' // sm, md(default)
      },
      plain: {
        type: Boolean,
        default: false // plain style
      },
      round: {
        type: Boolean,
        default: false // round style
      },
      disabled: {
        type: Boolean,
        default: false
      },
      link: [String, Object]
    },
    computed: {
      classes(){
        let baseClass = this.plain ? 'ui-btn-plain' : 'ui-btn',
            typeClass = this.plain ? `ui-btn-plain_${this.type}` : `ui-btn_${this.type}`,
            sizeClass = (this.size != 'md') ? `ui-btn_${this.size}` : '';
        return [
            baseClass,
            sizeClass,
            typeClass,
            {
              'ui-btn_disabled': this.disabled,
              'ui-btn_round': this.round
            }
        ]
      }
    },
    methods: {
      onLink () {
        this.$emit('click');
        $.url(this.link, this.$router);
      }
    }
}
</script>