<template>
  <div>
    <ui-mask transparent v-if="show" @click.native="onRetract"></ui-mask>
    <transition name="slideUp">
    <div class="ui-keypad" v-show="show">
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
  </div>
</template>


<script>
import UiMask from '../mask'
export default {
    name: "ui-keypad",
    components:{UiMask},
    props: {
      value: String,
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
        return {
          panel: ['1','2','3','4','5','6','7','8','9','.','0'],
          keyValue: []
        }
    },
    computed: {
    },
    created(){
      this.timer = undefined
    },
    watch:{
      keyValue(newVal){
        let toString = newVal.join('')
        this.$emit('input',toString)
      }
    },
    methods:{
      onKey(val){
        let overlap = 0;
        if(val === '.'){
          this.keyValue.forEach((v)=>{
            if(v === val) overlap++
          })
          if(this.keyValue.length === 0){
            this.keyValue.push('0')
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
      onRetract(){
        this.$emit('update:show',false)
      },
      onConfirm(){
        this.$emit('onConfirm', this.value)
      }
    }
};
</script>