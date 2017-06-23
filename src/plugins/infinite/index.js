import {UiInfinite} from '../../components/infinite'

export default {
  install (vue, options){
    let $vm;
    let Options = Object.assign({},options)
    let scroller = Options.scroller || window,
        distance = Options.distance || 20,
        clientHeight, scrollHeight, scrollTop
    let Loading = true
    let loadEvent = function (){}
    const VM = vue.extend(UiInfinite)
    vue.directive('infinite', {
      bind (el, binding, vnode, oldVnode) {
        console.log(binding);
      },
      inserted(el, binding, vnode, oldVnode){
        $vm = new VM().$mount()
        el.parentNode.insertBefore($vm.$el, el.nextSibling)
        clientHeight = document.documentElement.clientHeight
        scrollHeight = document.body.scrollHeight
        console.log('scrollHeight:'+ clientHeight, scrollHeight);
        console.log('el:'+ el.offsetHeight);
        loadEvent = function (){
          let scrollTop = this.document.body.scrollTop
          let offset = scrollHeight - (clientHeight + scrollTop)
          let handle = function(){}
          console.log('scrollTop:'+ offset);
          if(typeof binding.value === 'function'){
            handle = binding.value
          }else if(binding.value instanceof Array && typeof binding.value[0] === 'function'){
            handle = binding.value[0]
          }else{
            console.log('v-infinite value is not function')
            return false
          }
          if(Loading && offset <= distance){
            handle()
            Loading = false
          }
        }
        scroller.addEventListener('scroll', loadEvent, false)
      },
      update(el, binding, vnode, oldVnode){
        scrollHeight = document.documentElement.scrollHeight
        Loading = true
        console.log('update');
        if(binding.value instanceof Array && binding.value[1] === true){
          $vm.loading = false
          Loading = false
          scroller.removeEventListener('scroll', loadEvent, false)
        }
      },
      componentUpdated(){
        console.log('componentUpdated');
      }

    })
  }
}
