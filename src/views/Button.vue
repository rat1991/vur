<template>
    <page current>
        <div class="ui-btn-area">
            <ui-button>按钮01</ui-button>
            <ui-button type="primary">按钮primary</ui-button>
            <ui-button type="primary" disabled>按钮primary</ui-button>
            <ui-button type="success">按钮success</ui-button>
            <ui-button type="warn">按钮warn</ui-button>
            <ui-button type="danger">按钮danger</ui-button>
            <ui-button type="info">按钮info</ui-button>
        </div>
        <div class="ui-btn-area">
            <ui-button plain>按钮01</ui-button>
            <ui-button type="primary" plain>按钮plain-info</ui-button>
            <ui-button type="primary" plain disabled>按钮plain-info</ui-button>
        </div>
        <div class="ui-btn-area">
            <ui-button type="primary" size="sm">按钮sm-plain-info</ui-button>
            <ui-button type="primary" size="sm" plain>按钮sm-plain-info</ui-button>
        </div>
    </page>
</template>

<script>
  import Page from '../components/page'
  import {UiButton} from '../components/buttons'
  
  export default {
    name: 'button',
    components: {
      Page,
      UiButton
    },
    created(){
      console.log(this.$route);
    }
  }
</script>