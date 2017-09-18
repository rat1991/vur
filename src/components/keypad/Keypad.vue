<template>
  <transition name="slideUp" @after-leave="afterLeave">
    <div class="ui-keypad" v-show="show" @touchmove.prevent>
      <main class="ui-keypad__inner">
        <section class="ui-keypad__panel">
          <span class="ui-keypad__key"
          v-for="(key, index) in panel" :key="key"
          @click="onKey(key)">{{key}}</span>
          <span class="ui-keypad__key retract" @click="onRetract"></span>
        </section>
        <section class="ui-keypad__handle">
          <div class="backspace" @touchstart="onBackAll" @touchend="onBack"></div>
          <div class="confirm" @click="onConfirm">确认</div>
        </section>
      </main>
    </div>
    </transition>
</template>

<script>
import Vue from 'vue'
import UiMask from '../mask'
import {UiToptips} from '../toptips'
export default {
    name: "ui-keypad",
    props: {
      value: String,
      show: {
        type: Boolean,
        default: false
      },
      max: Number,
      maxTips: {
        type: String,
        default: `超出上限`
      },
      min: Number,
      minTips: {
        type: String,
        default: `少于最小值`
      }
    },
    data () {
        return {
          panel: ['1','2','3','4','5','6','7','8','9','.','0'],
          keyValue: [],
          timer: undefined
        }
    },
    computed: {
    },
    created(){
      //定义mask组件
      const VM_Mask = Vue.extend(UiMask);
      this.$mask = new VM_Mask().$mount();
      this.$mask.show = this.show
      this.$mask.transparent = true
      this.$mask.onMask = ()=>{
        this.$emit('update:show', false)
      }
      //定义toptips组件
      const VM_Toptips = Vue.extend(UiToptips);
      this.$toptips = new VM_Toptips().$mount();
      this.$toptips.type = 'error';
      this.$toptips.text = this.maxTips
      this.$nextTick(()=>{
        //向Dom插入mask组件
        this.$el.parentNode.insertBefore(this.$mask.$el, this.$el);
        //向Dom插入toptips组件
        document.body.appendChild(this.$toptips.$el);
      })
    },
    beforeDestroy(){
        this.$el.parentNode.removeChild(this.$mask.$el);
        this.$mask.$destroy();
        document.body.removeChild(this.$toptips.$el);
        this.$toptips.$destroy();
    },
    watch:{
      show(newVal){
        this.$mask.show = newVal
      },
      keyValue(newVal){
        let valString = newVal.join('')
        if(Number(valString) > this.max){
          this.$toptips.state = true
          this.keyValue.pop()
        }else{
          this.$emit('input', valString)
        }
      }
    },
    methods:{
      onKey(val){
        let overlap = 0;
        if(val === '.'){
          this.keyValue.indexOf(val) > -1 && overlap++
          this.keyValue.length === 0 && this.keyValue.push('0')
        }else if(val === '0'){
          if(this.keyValue.length === 0){
            overlap++
            this.keyValue.push(val, '.')
          }
        }
        if(overlap === 0) this.keyValue.push(val);
      },
      onBackAll(){
        this.timer = setTimeout(()=>{
          this.keyValue = []
        },1000)
      },
      onBack(){
        clearTimeout(this.timer)
        this.keyValue.pop()
      },
      afterLeave(){
        console.log("08585")
      },
      onRetract(){
        this.$emit('update:show',false)
      },
      onConfirm(){
        this.$emit('update:show', false)
        this.$emit('onConfirm', this.value)
      }
    }
};
</script>