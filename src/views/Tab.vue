<template>
  <page current>
    <ui-tab-navbar :navbar="navbar" v-model="active"></ui-tab-navbar>
    <ui-tab-content :navbar="navbar" v-model="active" :swiper="true">
      <p class="content" slot="0">
  然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏览器必须考虑样式更新这一事实（box.offsetWidth是在上一次迭代中请求的），因此它必须应用样式更改，然后执行布局。这会导致每次迭代都会产生强制同步布局，正确的做法应该先读取值，然后再写入值 这段代码的问题在于每次迭代都会读取box.offsetWidth，然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏览器必须考虑样式更新这一事实（box.offsetWidth是在上一次迭代中请求的），因此它必须应用样式更改，然后执行布局。这会导致每次迭代都会产生强制同步布局，正确的做法应该先读取值，然后再写入值这段代码的问题在于每次迭代都会读取box.offsetWidth，然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏览器必须考虑样式更新这一事实（box.offsetWidth是在上一次迭代中请求的），因此它必须应用样式更改，然后执行布局。这会导致每次迭代都会产生强制同步布局，正确的做法应该先读取值，然后再写入值 这段代码的问题在于每次迭代都会读取box.offsetWidth，然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏览器必须考虑样式更新这一事实（box.offsetWidth是在上一次迭代中请求的），因此它必须应用样式更改，然后执行布局。这会导致每次迭代都会产生强制同步布局，正确的做法应该先读取值，然后再写入值这段代码的问题在于每次迭代都会读取box.offsetWidth，然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏览器必须考虑样式更新这一事实（box.offsetWidth是在上一次迭代中请求的），因此它必须应用样式更改，然后执行布局。这会导致每次迭代都会产生强制同步布局，这会导致每次迭代都会产生强制同步布局，正确的做法应该先读取值，然后再写入值这段代码的问题在于每次迭代都会读取box.offsetWidth，然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏览器必须考虑样式更新这一事实（box.offsetWidth是在上一次迭代中请求的），因此它必须应用样式更改，然后执行布局。这会导致每次迭代都会产生强制同步布局，这会导致每次迭代都会产生强制同步布局，正确的做法应该先读取值，然后再写入值这段代码的问题在于每次迭代都会读取box.offsetWidth，然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏览器必须考虑样式更新这一事实（box.offsetWidth是在上一次迭代中请求的），因此它必须应用样式更改，然后执行布局。这会导致每次迭代都会产生强制同步布局，这会导致每次迭代都会产生强制同步布局，正确的做法应该先读取值，然后再写入值这段代码的问题在于每次迭代都会读取box.offsetWidth，然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏览器必须考虑样式更新这一事实（box.offsetWidth是在上一次迭代中请求的），因此它必须应用样式更改，然后执行布局。这会导致每次迭代都会产生强制同步布局，
      </p>
      <p class="content" slot="1">
  然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏览器必须考虑样式更新这一事实（box.offsetWidth是在上一次迭代中请求的），因此它必须应用样式更改，然后执行布局。这会导致每次迭代都会产生强制同步布局，正确的做法应该先读取值，然后再写入值 这段代码的问题在于每次迭代都会读取box.offsetWidth，然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏览器必须考虑样式更新这一事实（box.offsetWidth是在上一次迭代中请求的），因此它必须应用样式更改，然后执行布局。这会导致每次迭代都会产生强制同步布局，正确的做法应该先读取值，然后再写入值这段代码的问题在于每次迭代都会读取box.offsetWidth，然后立即使用此值来更新段落的宽度。在循环的下次迭代中，浏
      </p>
      <span slot="2">tabcontent03</span>
      <span slot="3">tabcontent04</span>
    </ui-tab-content>
  </page>
</template>
<style lang="scss" scoped>
  @import "../style/common";
  .content{
    padding: torem(40px) $gapSides;
    line-height: 2;
  }
</style>

<script>
  import Page from '../components/page'
  import {UiTabNavbar, UiTabContent} from '../components/tab'

  export default {
    name: 'PageTab',
    data(){
      return {
        navbar: ['已完成','未完成','已结束','待结束'],
        active: 0
      }
    },
    components: {
        Page,
        UiTabNavbar,
        UiTabContent
    }
  }
</script>