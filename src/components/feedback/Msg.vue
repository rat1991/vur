<template>
    <page current>
        <div class="ui-msg">
            <div class="ui-msg__icon">
                <i :class="['icon', typeIcon]"></i>
            </div>
            <div class="ui-msg__content">
                <h2 class="ui-msg__title">{{title}}</h2>
                <p class="ui-msg__desc">{{text}}</p>
            </div>
            <div class="ui-msg__opr">
                <slot name="opr"></slot>
            </div>
        </div>
        <ui-footer :link="footerLink">{{footerText}}</ui-footer>
    </page>
</template>

<script>
import Page from '../page'
import UiFooter from '../footer'
export default {
    name: 'ui-msg',
    components: { Page, UiFooter },
    props: {
        type: {
            type: String,
            default: 'success' //目前支持三种类型： 'success','error','warn'
        },
        title: {
            type: String,
            default: '提示标题'
        },
        text: {
            type: String,
            default: '提示文字'
        },
        footerLink: Object,
        footerText: String
    },
    data() {
        return {
            typeArr: {
                success: 'icon-circle-success',
                error: 'icon-circle-error',
                warn: 'icon-circle-warn'
            }
        }
    },
    computed:{
        typeIcon(){
            let icon;
            Object.keys(this.typeArr).forEach(curType =>{
             if(curType === this.type){
                 icon = this.typeArr[curType]
             }
            })
            return icon;
        }
    },
    created() {
    },
    watch: {
    },
    methods: {
    }
}
</script>