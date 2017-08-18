<template>
  <div class="ui-picker__group" 
  @touchstart.stop.prevent="onTouchStart"
  @touchmove.stop.prevent="onTouchMove"
  @touchend.stop.prevent="onTouchEnd"
   ref="group">
    <div class="ui-picker__mask"></div>
    <div class="ui-picker__indicator" ref="indicator"></div>
    <div class="ui-picker__divider" v-if="divider">{{divider}}</div>
    <ul class="ui-picker__content" ref="list">
      <li class="ui-picker__item" v-for="(item, index) in pickerData" :key="index" :data-value="item.value || item" ref="item">{{item.name || item}}</li>
    </ul>
  </div>
</template>
<style lang="sass" type="text/css">
  @import './Picker';
</style>
<script>
export default {
  name: "ui-picker",
  props: {
    pickerData: [Array],
    divider: [String],
    value: [Object, String]
  },
  data () {
    return {
      //滚动事件项目
      startY:null,
      startTime:null,
      //当前选中项index
      index:null,
      currentY:0,
      //选中的值
      selected: undefined
    }
  },
  computed: {
    dataType(){
      return typeof this.pickerData[0] === 'object' && true
    },
    layer(){
      let groupHeight = this.$refs.group.offsetHeight;
      let itemHeight = this.$refs.indicator.offsetHeight;
      return groupHeight / itemHeight
    },
    reLayer(){
      if(this.layer % 2 === 1){
        return ((this.layer - 1) / 2)
      }else{
        console.error('layer 必须大于5')
      }
    }
  },
  watch: {
    pickerData(newVal){
      if(this.index + 1 > newVal.length){
        this.index = 0
      }
    },
    index(newVal){
      this.currentY = this.itemH * (this.reLayer - newVal)
      this.setTranslateY(this.$refs.list, this.currentY)
      this.selected = this.pickerData[newVal]
      this.$emit('change', newVal)
    },
    value(newVal){
      this.selected = newVal
    },
    selected(newVal){
      this.$emit('input', newVal)
    }
  },
  mounted(){
    this.itemH = this.$refs.indicator.offsetHeight
    this.setDefaultVal()
  },
  beforeUpdate(){
    this.selected = this.pickerData[this.index]
  },
  methods: {
    setTranslateY(el, val){
      el.style.transform = `translate3d(0, ${val}px, 0)`
    },
    setDefaultVal () {
      if(this.value){
        let modelVal = this.value.value || this.value
        this.pickerData.forEach((curVal, index)=>{
          let value = curVal.value || curVal
          this.index = modelVal === value ?  index : this.index
        })
      }else{
        this.index = this.pickerData.length < this.layer ? 0 : this.reLayer
      }
    },
    onTouchStart(event){
      event = event.changedTouches[0]
      this.startY = event.pageY
      this.startTime = new Date().getTime()
    },
    onTouchMove(event){
      event = event.changedTouches[0]
      let length = this.$refs.item.length || 0
      let offset = this.currentY + event.pageY - this.startY
      if (offset > this.itemH * this.reLayer) {
        offset = this.itemH * this.reLayer + this.itemH / 2
        this.$refs.list.style.transition = 'all 1s ease-out'
      }else if(offset < -this.itemH * (length-this.reLayer-1)){
        offset = -this.itemH * (length-this.reLayer-1) - this.itemH / 2
        this.$refs.list.style.transition = 'all 1s ease-out'
      }else{
        this.$refs.list.style.transition = 'none'
      }
      this.setTranslateY(this.$refs.list, offset)
    },
    onTouchEnd(event){
      event = event.changedTouches[0]
      let length = this.$refs.item.length
      let endTime = new Date().getTime()
      let time = endTime - this.startTime
      time = time > 200 ? 10000 : time

      let distant =  event.pageY - this.startY
      let offset = this.currentY + distant + 238 * (distant/time)

      offset = Math.round(offset/this.itemH) * this.itemH
      if (offset > this.itemH * this.reLayer) {
        offset = this.itemH * this.reLayer
      }
      if (offset < -this.itemH * (length-this.reLayer-1)) {
        offset = -this.itemH * (length-this.reLayer-1)
      }
      this.currentY=offset
      this.index = Math.abs(offset / this.itemH - this.reLayer)
      //be compatible with the low vision android
      this.$refs.list.style.transition = 'all .2s ease-out'
      this.setTranslateY(this.$refs.list, offset)
      
    }
  }
}
</script>
