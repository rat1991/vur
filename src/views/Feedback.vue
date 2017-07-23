<template>
  <page current>
    <div class="gap-sides mt-10">
      <ui-button link="/feedback/success">成功提示页</ui-button>
      <ui-button link="/feedback/error">失败提示页</ui-button>
      <ui-button link="/feedback/warn">警告提示页</ui-button>
    </div>
  </page>
</template>

<script>
import Page from '../components/page'
import { UiButton } from '../components/buttons'

export default {
  name: 'feedback',
  components: {
    Page,
    UiButton,
  },
  created() {
  }
}
</script>