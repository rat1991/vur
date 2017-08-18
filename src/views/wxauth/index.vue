<template>
  <page current>
    <div class="gap-sides mt-20">
      <ui-button link="/login">登陆验证</ui-button>
      <ui-button link="/profile" type="success">微信授权</ui-button>
    </div>
  </page>
</template>
<script>
  import Page from '@/components/page'
  import {UiButton} from '@/components/buttons'
  export default {
    name: 'index',
    components: {
      Page,
      UiButton
    },
    data(){
      return {}
    },
    computed: {
    },
    created(){
      console.log(this.$store.state)
    },
    watch:{

    }
  }
</script>