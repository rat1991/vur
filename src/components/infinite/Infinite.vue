<template>
  <div :class="['ui-infinite', !loading && 'ui-infinite-complete']" v-show="state">
    <ui-loading size="24px" v-if="loading"></ui-loading>
    <span class="ui-infinite__tips">{{loading ? tips : completeTips}}</span>
  </div>
</template>

<script>
import {UiLoading} from "../loading"
export default {
  name: "ui-infinite",
  components: {
    UiLoading
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    tips: {
      type: String,
      default: '正在加载'
    },
    completeTips: {
      type: String,
      default: '加载完毕'
    }
  },
  data () {
    return {
      state: true
    }
  }
}
</script>