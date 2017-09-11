<template>
  <div class="container">
    <transition :name="transitionView">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from '@/libs/utils'
  //路由过渡
  import routerTransition from './router/routes-transition'
  //公共样式
  import UiStyle from './style'
  //组件页面
  import Index from './views/Index.vue'
  import UiCell from './views/Cell.vue'
  import UiForm from './views/Form.vue'
  import FormValidation from './views/FormValidation.vue'
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
  import Lazyload from './views/Lazyload.vue'
  import Keypad from './views/Keypad.vue'
  import ScrollFix from './views/ScrollFix.vue'
  import Feedback from './views/Feedback.vue'
  import Msg from './views/Msg.vue'

  export default {
    name: 'app',
    components: {
      UiStyle,
      Index,
      UiCell,
      UiForm,
      FormValidation,
      UiButton,
      SearchBar,
      Toast,
      UiDialog,
      ActionSheet,
      Picker,
      Tab,
      Swiper,
      Infinite,
      Calendar,
      Lazyload,
      Keypad,
      ScrollFix,
      Feedback,
      Msg
    },
    data(){
      return {
        transitionView: ''
      }
    },
    created(){

    },
    watch: {
      '$route' (to, from) {
        this.transitionView = routerTransition(to, from, {
          enter: 'slideIn',
          leave: 'slideOut'
        })
      }
    }
  };
</script>
