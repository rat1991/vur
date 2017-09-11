<template>
    <label :class="['ui-cell', to && 'ui-cell_access']" @click="onClick">
        <div class="ui-cell__hd" v-if="label">
            {{label}}
            <slot></slot>
        </div>
        <div class="ui-cell__bd" style="line-height: 1">
            <input :autocomplete="autocomplete"
            :autocapitalize="autocapitalize"
            :autocorrect="autocorrect"
            :spellcheck="spellcheck"
            :class="['ui-input',textClass, textAlign && 'text-' + textAlign]"
            :type="type" :value="inputVal"
            :placeholder="placeholder"
            :required="required"
            :readonly="readonly || !!to"
            :pattern="pattern || type === 'phone' && '[0-9]*'"
            :minlength="min"
            :maxlength="max"
            ref="input"
            @focus="onFocus" @input="onInput">
        </div>
        <div class="ui-cell__ft" v-if="clear && inputVal">
            <i class="icon icon-circle-error text-lighter" @click="onClear"></i>
        </div>
    </label>
</template>
<script>
import Vue from 'vue'
import { UiKeypad } from '@/components/keypad'
import $ from '../../libs/utils.js';
export default {
    name: "ui-input",
    props: {
        label: String,
        name: String,
        value: [Number, String],
        textAlign: String,
        textClass: String,
        min: [Number, String],
        max: [Number, String],
        type: {
            type: String,
            default: "text" //email、phone、
        },
        placeholder: {
            type: String,
            default: '请输入...'
        },
        clear: {
            type: Boolean,
            default: false
        },
        required: Boolean,
        pattern: String,
        readonly: {
            type: Boolean,
            default: false
        },
        focus: Boolean,
        to: [Object, Function],
        // https://github.com/yisibl/blog/issues/3
        autocomplete: 'off',
        autocapitalize: 'off',
        autocorrect: 'off',
        spellcheck: 'false'
    },
    data() {
        return {
            inputVal: this.value,
            keypadState: this.focus
        }
    },
    watch: {
        value(newVal) {
            this.inputVal = newVal;
        },
        keypadState(newVal){
            this.$keypad.show = newVal
            if(newVal){
                let clientHeight = document.documentElement.clientHeight;
                let keypadHeight = 204 + this.$el.offsetHeight;
                let offsetTop = this.$el.getBoundingClientRect().top;
                if(clientHeight - offsetTop < keypadHeight){
                    console.log(keypadHeight - (clientHeight - offsetTop))
                    document.body.style.paddingBottom = `${keypadHeight - (clientHeight - offsetTop)}px`
                    document.body.scrollTop = document.documentElement.scrollHeight
                }
            }else{
                document.body.style.paddingBottom = ''
            }
        }
    },
    mounted() {
        if(this.focus && this.type !== 'keypad'){
            this.$refs.input.focus()
        }
        this.addKeyPad()
    },
    beforeDestroy(){
        if (this.type !== 'keypad') return;
        document.body.removeChild(this.$keypad.$el);
        this.$keypad.$destroy();
    },
    methods: {
        addKeyPad(val) {
            if (this.type !== 'keypad') return;
            //定义keypad组件
            const VM_KEYPAD = Vue.extend(UiKeypad);
            this.$keypad = new VM_KEYPAD().$mount();
            this.$keypad.max = this.max
            this.$keypad.maxTy = this.max
            this.$keypad.show = this.keypadState
            this.$keypad.$on('update:show', (e)=>{
                this.keypadState = e
            })
            this.$keypad.$on('input', (e)=>{
                this.inputVal = e
                this.$emit('input', this.inputVal)
            })
            document.body.appendChild(this.$keypad.$el);
            this.$refs.input.setAttribute('readonly', true)
            this.$refs.input.addEventListener('click',(e)=>{
                 this.keypadState = !this.keypadState
            })
        },
        onClick () {
            if(typeof this.to === 'function'){
            this.to()
            }else{
            $.url(this.to, this.$router)
            }
        },
        onInput(event) {
            this.inputVal = event.target.value;
            this.$emit('input', this.inputVal)
        },
        onClear(event) {
            this.inputVal = '';
            this.$emit('input', this.inputVal)
        },
        onFocus(event) {
            let readonly = event.target.getAttribute('readonly');
            readonly && event.target.blur()
        }
    }
};
</script>