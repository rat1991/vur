<template>
  <section
   :class="['ui-cell', {'ui-cell_access': access || to}, dropdown && 'ui-cell_dropdown', dropdownState && 'open']"
   @click="onClick">
    <slot></slot>
    <div :class="['ui-cell__icon', iconSize]" v-if="icon">
      <i :class="['icon', icon, iconClass]"></i>
    </div>
    <div class="ui-cell__hd" v-if="!dropdown && slothd">
      <slot name="hd"></slot>
    </div>
    <div class="ui-cell__bd" v-if="!dropdown && slotbd">
      <slot name="bd"></slot>
    </div>
    <div class="ui-cell__ft"  v-if="!dropdown && slotft">
      <slot name="ft"></slot>
    </div>
    <div class="ui-cell__desc" v-if="slotdesc">
      <slot name="desc"></slot>
    </div>

    <div class="ui-cell__bd" v-if="dropdown">
      <section class="ui-cell" @click="onDropdown">
        <div class="ui-cell__hd" v-if="slothd">
          <slot name="hd"></slot>
        </div>
        <div class="ui-cell__bd" v-if="slotbd">
          <slot name="bd"></slot>
        </div>
        <div class="ui-cell__ft"  v-if="slotft">
          <slot name="ft"></slot>
        </div>
      </section>
      <div :class="['ui-cell_dropdown__content']" v-show="dropdownState">
        <section class="ui-cell" v-if="slotContent">
          <div class="ui-cell__bd">
            <slot name="dropdown"></slot>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
  import $ from '../../libs/utils.js';

  export default {
    name: 'ui-cell',
    props: {
      value: Boolean,
      access: {
        type: Boolean,
        default: false
      },
      dropdown: Boolean,
      to: [String, Object,Function],
      icon: String,
      iconSize: String, //xs, sm, md, lg
      iconClass: String,
    },
    data(){
      return {
        dropdownState: this.value,
      }
    },
    computed: {
      slothd: function(){
        return this.$slots.hd;
      },
      slotbd: function(){
        return this.$slots.bd;
      },
      slotft: function(){
        return this.$slots.ft;
      },
      slotdesc: function(){
        return this.$slots.desc;
      },
      slotContent: function(){
        return this.dropdown && this.$slots.dropdown;
      }
    },
    watch: {
      value(newVal){
        this.dropdownState = newVal
      },
      dropdownState(newVal){
        this.$emit('input', newVal)
      }
    },
    methods: {
      onDropdown(){
        this.dropdownState = !this.dropdownState
      },
      onClick () {
        if(typeof this.to === 'function'){
          this.to()
        }else{
          $.url(this.to, this.$router)
        }
      }
    }
  }
</script>