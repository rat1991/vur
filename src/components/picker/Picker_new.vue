<template>
  <div class="ui-picker__bd">
    <div class="ui-picker__group" ref="group">
      <div class="ui-picker__mask"></div>
      <div class="ui-picker__indicator" ref="indicator"></div>
      <div class="ui-picker__divider" v-if="divider">{{divider}}</div>
      <ul class="ui-picker__content" ref="list">
        <li class="ui-picker__item" 
        v-for="(item, index) in value" :key="index"
        ref="item"
        :data-value="item.value || item">{{item.name || item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// style="transform: translate3d(0px, 102px, 0px); transition: all 0.3s;"
import PickerScroll from './scroll'
import Transform from 'css3transform'
export default {
  name: "ui-picker",
  props: {
    value: Array,
    divider: String
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
    value(newVal){
      this.$emit('input', newVal)
      console.log(newVal);
    }
  },
  created(){
  },
  mounted(){
    let _self = this;
    new PickerScroll({
      container : _self.$refs.group,
      item: _self.$refs.item
    })
  },
  methods: {
    renderList(){

    }
  }
}
</script>