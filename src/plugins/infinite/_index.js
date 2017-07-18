import {UiInfinite} from '../../components/infinite'

export default {
  install (vue, options){
    let $vm;
    let Options = Object.assign({},options)
    let scroller = Options.scroller || window,
        distance = Options.distance || 20,
        clientHeight,elHeight, scrollHeight, scrollTop
    let Loading = true
    let loadEvent = function (){}
    const VM = vue.extend(UiInfinite)
    function getElRealHelght(elm){
      let marginArr = window.getComputedStyle(elm).margin.split('px');
      return  elm.offsetHeight + parseFloat(marginArr[0]) + parseFloat(marginArr[2])
    };
    vue.directive('infinite', {
      bind (el, binding, vnode, oldVnode) {
      },
      inserted(el, binding, vnode, oldVnode){
        $vm = new VM().$mount()
        clientHeight = document.documentElement.clientHeight
        elHeight = getElRealHelght(el)
        if(clientHeight < elHeight){
          el.parentNode.insertBefore($vm.$el, el.nextSibling)
        }
        loadEvent = function (){
          scrollHeight = document.body.scrollHeight
          scrollTop = this.document.body.scrollTop
          let offset = scrollHeight - (clientHeight + scrollTop)
          let handle = function(){}
          if(typeof binding.value === 'function'){
            handle = binding.value
          }else if(binding.value instanceof Array && typeof binding.value[0] === 'function'){
            handle = binding.value[0]
          }else{
            console.error('v-infinite value is not function')
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
        //console.log('update');
        if(binding.value instanceof Array && binding.value[1] === true){
          $vm.loading = false
          Loading = false
          scroller.removeEventListener('scroll', loadEvent, false)
        }
      },
      componentUpdated(){
        //console.log('componentUpdated');
      }

    })
  }
}
