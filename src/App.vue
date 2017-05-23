
<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
  import UiStyle from './style'
  import UiCell from './pages/Cell.vue'
  import UiForm from './pages/Form.vue'
  import UiButton from './pages/Button.vue'
  import SearchBar from './pages/SearchBar.vue'
  import Toast from './pages/Toast.vue'
  import UiDialog from './pages/Dialog.vue'
  import ActionSheet from './pages/ActionSheet.vue'
  import Picker from './pages/Picker.vue'
  import Tab from './pages/Tab.vue'
  import Swiper from './pages/Swiper.vue'
  import Infinite from './pages/Infinite.vue'


  export default {
    name: 'app',
    components: {
        UiStyle,
        UiCell,
        UiForm,
        UiButton,
        SearchBar,
        Toast,
        UiDialog,
        ActionSheet,
        Picker,
        Tab,
        Swiper,
        Infinite
    },
  };
</script>
