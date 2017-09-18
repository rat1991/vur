import $ from '@/libs/utils'
  /**
   * 滚动固定函数
   * @param options {Object} 参数默认
   * @param options.container {Object} 滚动对象
   * @param options.distance {Number} 距离滚动对象的间隔
   * @param options.className {String} 固定时的样式
   * @returns {null}
   */
class ScrollFix {
  constructor(options = {}){
    this.scroller = options.container || window
    this.distance = options.distance || 0
    this.className = options.className || 'fix-t'
    this.counter = 0
    this.bindEl = []
    this.fixEl = []
    //绑定事件
    this.scrollEvent = $.debounce(this.onScroll, 10)
    this.scroller.addEventListener('scroll', this.scrollEvent.bind(this), false);
  }
  /**
   * 获取固定元素的信息对象，并推入到this.bindEl数组
   * @param el {Object} 固定的DOM元素
   * @param value {Object} vue指令的binding对象的value
   * @returns {null}
   */
  getBindEl(el, value){
    let scrollTop = this.scroller === window ? document.body.scrollTop : this.scroller.scrollTop;
    let bindObj = {
      el: el,
      index: this.counter++,
      width: el.offsetWidth,
      height: el.offsetHeight,
      className: value && value.className || this.className,
      distance: value && value.distance || this.distance,
      onFix: value && value.onFix || undefined
    };
    //添加fix元素信息对象
    this.bindEl.push(bindObj)
  }
  removeBind(){
    //清空绑定元素数组
    this.bindEl = []
    //解绑事件
    this.scroller.removeEventListener('scroll', this.onScroll.bind(this), false);
  }
  onFix(cur, index){
    let stuffEl = document.createElement('div');
    stuffEl.style.height = `${cur.height}px`
    cur.el.parentNode.insertBefore(stuffEl, cur.el.nextSibling)
    cur.el.classList.add(cur.className);
    cur.el.style.width = `${cur.width}px`
    cur.el.style.top = `${cur.distance}px`

    //定义onfix 信息对象
    Object.assign(cur, {
      stuffEl: stuffEl,
    })
    this.fixEl.unshift(cur)
    this.bindEl.shift()
  }
  unFix(cur){
    cur.stuffEl.remove()
    cur.el.classList.remove(cur.className)
    cur.el.style.width = ''
    cur.el.style.top = ''
    this.fixEl.shift()
    this.bindEl.unshift(cur)
  }
  fixTransform(cur, nearTop, index){
    if(this.fixEl.length === 0) return;
    let topObj = this.fixEl[0];
    if(cur.index !== topObj.index && nearTop <= topObj.height){
      let daff = nearTop <= 0 ? -topObj.height : nearTop - topObj.height;
      topObj.el.style.transition = ''
      topObj.el.style.transform =`translate3d(0, ${daff}px, 0)`
    }else if(index === 0 && nearTop > topObj.height){
      topObj.el.style.transition = 'all .2s ease'
      topObj.el.style.transform =''
    }
  }
  onScroll(){
    let scrollTop = this.scroller === window ? document.body.scrollTop : this.scroller.scrollTop;
    this.bindEl.forEach((cur, index)=>{
      let curEl = cur.el,
          offsetTop = cur.el.getBoundingClientRect().top,
          distance = cur.distance;
      let nearTop = offsetTop - distance;
      $.throttle(this.fixTransform, 100).call(this, cur, nearTop, index)
      
      if(nearTop <= 0){
        cur.onFix && cur.onFix(curEl)
        this.onFix(cur, index)
      }
    });
    //if(this.fixEl.length === 0) return;
    this.fixEl.forEach((cur, index)=>{
      let curEl = cur.stuffEl,
          offsetTop = cur.stuffEl.getBoundingClientRect().top,
          distance = cur.distance;
      let farTop = offsetTop + distance;
      if(farTop >= 0){
        this.unFix(cur)
      }
    });
  }
}
export default {
  install (vue, options = {}){
    //创建scrollFix实例
    const scrollFix = new ScrollFix(options);

    vue.directive('topfix', {
      bind (el, binding, vnode, oldVnode) {
        // console.log('bind');
      },
      inserted(el, binding, vnode, oldVnode){
        scrollFix.getBindEl(el, binding.value)
      },
      update(el, binding, vnode, oldVnode){
        //console.log('update');
      },
      componentUpdated(){
        // console.log('componentUpdated');
      },
      unbind(){
        scrollFix.removeBind()
      }
    })
  }
}
