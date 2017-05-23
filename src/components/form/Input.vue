<template>
    <label :class="['ui-cell']">
        <div class="ui-cell__hd" v-if="label">
          {{label}}<slot></slot>
        </div>
        <div class="ui-cell__bd">
          <input
            :autocomplete="autocomplete"
            :autocapitalize="autocapitalize"
            :autocorrect="autocorrect"
            :spellcheck="spellcheck"
            :class="['ui-input', textAlign ? 'text-' + textAlign : '']"
            :type="type"
            :value="inputVal"
            :placeholder="placeholder"
            :readonly="readonly"
            :pattern="pattern"
            @input="onInput">
        </div>
        <div class="ui-cell__ft" v-if="clear && inputVal">
            <i class="icon icon-circle-error text-lighter" @click="onClear"></i>
        </div>
    </label>
</template>


<script>
export default {
    name: "ui-input",
    props: {
        label: String,
        name: String,
        value: String,
        textAlign: String,
        type: {
          type: String,
          default: "text"
        },
        placeholder: {
          type: String,
          default: '请输入...'
        },
        clear: {
          type: Boolean,
          default: false
        },
        readonly: {
          type: Boolean,
          default: false
        },
        // https://github.com/yisibl/blog/issues/3
        autocomplete: 'off',
        autocapitalize: 'off',
        autocorrect: 'off',
        spellcheck: 'false'
    },
    data () {
        return {
          inputVal: ''
        }
    },
    computed: {
        pattern(){
            if (this.type === 'phone') {
                return '[0-9]*'
            }
        }
    },
    created(){
        this.inputVal = this.value;
    },
    watch:{
        value(newVal) {
            this.inputVal = newVal;
        }
    },
    methods:{
        onInput: function(event){
            this.inputVal = event.target.value;
            this.$emit('input', this.inputVal)
        },
        onClear: function(event){
            this.inputVal = '';
            this.$emit('input', this.inputVal)
        }
    }
};
</script>