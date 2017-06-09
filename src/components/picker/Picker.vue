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
      <li class="ui-picker__item" v-for="item in pickerData" :data-value="item.value || item" ref="item">{{item.name || item}}</li>
    </ul>
  </div>
</template>

<script>
// style="transform: translate3d(0px, 102px, 0px); transition: all 0.3s;"
import Transform from 'css3transform'
import $ from '../../libs/util.js'
export default {
  name: "ui-picker",
  props: {
    pickerData: [Array],
    columns: [Number],
    divider: [String],
    value: [Object, String]
  },
  data () {
    return {
      isTransition:true,
      startY:null,
      startTime:null,
      currentY:0,
      //滚动后的index值 
      index:null,
      //pickerData类型
      dataType: false,
      //选中的值
      selectedName: undefined,
      selectedValue: undefined,
      selectedSub:undefined
    }
  },
  computed: {
    selected(){
      if(this.dataType){
        return this.selectedSub ? {name:this.selectedName, value:this.selectedValue, sub:this.selectedSub} : {name:this.selectedName, value:this.selectedValue}
      }else{
        return this.selectedValue
      }
    }
  },
  watch: {
    index(i){
      this.currentY = this.itemH * (3 - i)
      this.$refs.list.translateY = this.currentY
      this.selectedValue = this.dataType ? this.pickerData[i].value : this.pickerData[i]
      this.selectedName = this.dataType ? this.pickerData[i].name : undefined
      this.selectedSub = this.dataType ? this.pickerData[i].sub : undefined
    },
    value(newVal){
      this.selected = newVal
    },
    selected(newVal){
      this.$emit('input', newVal)
      this.$emit('change', newVal, this.columns)
    }
  },
  created(){
    if(typeof this.pickerData[0] === 'object'){
      this.dataType = true
    }
  },
  mounted(){
    Transform(this.$refs.list)
    this.itemH = this.$refs.indicator.offsetHeight
    if(!this.value){
      this.setDefaultVal()
    }else{
      this.setModelVal()
    }
  },
  beforeUpdate(){
    if(!this.pickerData[this.index]){
      this.index = 0
    }else{
      this.selectedValue = this.dataType ? this.pickerData[this.index].value : this.pickerData[this.index]
      this.selectedName = this.dataType ? this.pickerData[this.index].name : undefined
      this.selectedSub = this.dataType ? this.pickerData[this.index].sub : undefined
    }
  },
  methods: {
    setDefaultVal () {
      let list = this.$refs.list
      let item = this.$refs.item || []
      let groupH = this.$refs.group.offsetHeight
      let rows = groupH / this.itemH
      let ratioY = (rows % 2 === 1) && (rows - 1) / 2
      this.index = (item.length < rows) ? 0 : ratioY
    },
    setModelVal(){
      let modelVal = this.dataType ? this.value.value : this.value
      this.pickerData.forEach((cur, index)=>{
        let curVal = this.dataType ? cur.value : cur
        if(modelVal === curVal){
          this.index = index
        }
      })
    },
    onTouchStart(event){
      event = event.changedTouches[0]
      this.isTransition = false
      this.startY = event.pageY
      this.startTime = new Date().getTime()
    },
    onTouchMove(event){
      event = event.changedTouches[0]
      let length = this.$refs.item.length || 0
      let offset = this.currentY + event.pageY - this.startY
      if (offset > this.itemH * 3) {
        offset = this.itemH * 3 + this.itemH / 2
      }
      if (offset < -this.itemH * (length-4)) {
        offset = -this.itemH * (length-4) - this.itemH / 2
      }
      this.$refs.list.style.transition = 'none'
      this.$refs.list.translateY = offset
    },
    onTouchEnd(event){
      let length = this.$refs.item.length
      event = event.changedTouches[0]
      this.isTransition = true
      let endTime = new Date().getTime()
      let time = endTime - this.startTime
      time = time > 200 ? 10000 : time

      let distant =  event.pageY - this.startY
      let offset = this.currentY + distant + 238 * (distant/time)

      offset = Math.round(offset/this.itemH) * this.itemH
      if (offset > this.itemH * 3) {
        offset = this.itemH * 3
      }
      if (offset < -this.itemH*(length-4)) {
        offset = -this.itemH*(length-4);
      }
      this.currentY=offset
      //be compatible with the low vision android
      this.$refs.list.style.transition = 'all .2s ease-out'
      this.$refs.list.translateY = offset
      let index = offset / this.itemH - 3
      this.index = Math.abs(index)
    }
  }
}
</script>