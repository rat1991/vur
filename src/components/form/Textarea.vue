<template>
  <section class="ui-cell">
    <textarea 
      class="ui-textarea"
      :name="name"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :maxlength="max"
      :placeholder="placeholder"
      :rows="rows"
      :value="value"
      @input="onInput">
    </textarea>
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
      if(this.value && this.max) len = this.value.replace(/\n/g, 'aa').length;
      return len > this.max ? this.max : len;
    }
  },
  methods:{
    onInput: function(event){
        if(this.count === this.max) alert("超出可输入范围！");
      this.$emit('input', event.target.value)
    },
  }
};
</script>