
<template>
  <div class="container">
    <transition name="slideIn">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import UiStyle from './style'
  import Index from './views/Index.vue'
  import UiCell from './views/Cell.vue'
  import UiForm from './views/Form.vue'
  import UiButton from './views/Button.vue'
  import SearchBar from './views/SearchBar.vue'
  import Toast from './views/Toast.vue'
  import UiDialog from './views/Dialog.vue'
  import ActionSheet from './views/ActionSheet.vue'
  import Picker from './views/Picker.vue'
  import Tab from './views/Tab.vue'
  import Swiper from './views/Swiper.vue'
  import Infinite from './views/Infinite.vue'
  import Calendar from './views/Calendar.vue'


  export default {
    name: 'app',
    components: {
      Index,
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
      Infinite,
      Calendar
    },
  };
</script>
