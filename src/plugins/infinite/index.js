import {UiInfinite} from '../../components/infinite'

class Infinite {
  constructor(options){
    this.container = {}
  }
}
export default {
  install (vue, options){
    let $vm;
    const VM = vue.extend(UiInfinite);
    let container = options && options.container && options.container || window,
        distance = options && options.distance && options.distance || 20;
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight, scrollTop;
    let Loading = true;
    let handle, loaded;
    function OnScroll(event, state){
      container.addEventListener('scroll', function(){
        scrollTop = container === window ? document.body.scrollTop : container.scrollTop;
        scrollHeight = document.documentElement.scrollHeight
        let offset = scrollHeight - (clientHeight + scrollTop);
        
        if(offset <= distance && Loading){
          event()
          Loading = false
        }
      },false)
    };
    vue.directive('infinite', {
      bind (el, binding, vnode, oldVnode) {
        $vm = new VM().$mount();
        vue.nextTick(function () {
          let elPosition = el.getBoundingClientRect().bottom;
          el.parentNode.insertBefore($vm.$el, el.nextSibling)
          $vm.state = elPosition > clientHeight ? true : false
        })
        if(typeof binding.value === 'object'){
          handle = binding.value.callback
          loaded = binding.value.loaded
        }else if(typeof binding.value === 'function'){
          handle = loaded = binding.value
        }
        new OnScroll(handle, loaded);
      },
      inserted(el, binding, vnode, oldVnode){
        //console.log('inserted');
      },
      update(el, binding, vnode, oldVnode){
        //console.log('update:');
        if(typeof binding.value === 'object'){
          handle = binding.value.callback
          loaded = binding.value.loaded
        }
        $vm.loading = !loaded;
        Loading = !loaded;
      },
      componentUpdated(){
        //console.log('componentUpdated');
      }

    })
  }
}
