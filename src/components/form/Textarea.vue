<template>
  <section class="ui-cell">
    <div style="position: relative; width: 100%;">
    <textarea 
      :class="[autoheight ? 'ui-textarea_autoheight' : 'ui-textarea']"
      :name="name"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :maxlength="max"
      :placeholder="placeholder"
      :rows="rows"
      :value="value"
      ref="textarea"
      @compositionstart="cpstStart"
      @compositionend="cpstEnd"
      @keyup="onInput">
    </textarea>
    <p class="ui-textarea-seat" ref="seat" v-if="autoheight">{{value ? value : '0'}}</p>
    </div>
    <div class="ui-cell__desc text-right text-12 text-lighter" v-if="max">{{count}}/{{max}}</div>
  </section>
</template>

<script>
export default {
  name: "ui-textarea",
  props: {
    rows: {
      type: Number,
      default: 3
    },
    value: String,
    max: Number,
    name: String,
    placeholder: {
      type: String,
      default: '请输入...'
    },
    autoheight: Boolean,
    maxheight: String,
    // https://github.com/yisibl/blog/issues/3
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
    }
  },
  computed:{
    count(){
      let len = 0;
      if(this.value && this.max) len = this.value.replace(/\n/g, '&&').length;
      return len > this.max ? this.max : len;
    }
  },
  mounted(){
    //window.getComputedStyle(this.$refs.textarea, null).height
    this.setHeight();
  },
  methods:{
    setHeight(){
      if(!this.autoheight) return;
      let defaultHeight = this.value ? this.$refs.seat.offsetHeight : this.$refs.seat.offsetHeight * this.rows;
      this.$refs.seat.style.minHeight = defaultHeight + 'px'
    },
    cpstStart(event){
      //console.log('satrt',event);
    },
    cpstEnd(event){
      //console.log('end',event);
    },
    onInput(event){
      if(this.count === this.max && event.key !== 'Backspace') alert("超出可输入范围！");
      this.$emit('input', event.target.value)
    },
  }
};
</script>