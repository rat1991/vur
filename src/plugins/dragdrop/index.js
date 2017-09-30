import $ from '@/libs/utils.js';
class Dragdrop {
  constructor(el, options ={}){
    this.el = el
    this.options = Object.assign({}, options)
    this.width = this.el.offsetWidth
    this.height = this.el.offsetHeight
    this.dragClass = this.options.dragClass || 'float-t'
    this.dragId = this.options.dragId
    this.placeholder = undefined
    this.startX = 0
    this.startY = 0
    this.bindOffsetEvent = this.onOffset.bind(this)
    this.bind()
  }
  bind(){
    let timer;
    let isDrag = false;
    this.el.addEventListener('touchstart', event=>{
      event.preventDefault()
      this.startX = event.changedTouches[0].pageX
      this.startY = event.changedTouches[0].pageY
      timer = setTimeout(() => {
        isDrag = true
        this.onDrag()
      }, 800)
    })
    this.el.addEventListener('touchmove', event=>{
      if(!isDrag) return;
      event.preventDefault()
      event.stopPropagation();
      this.onOffset()
    }, false)
    this.el.addEventListener('touchend', event=>{
      isDrag = false;
      clearTimeout(timer)
      this.onDrop()
    })
  }
  onDrag(){
    this.el.classList.add(this.dragClass)
    this.options.onDrag && this.options.onDrag()
  }
  onOffset(){
    let moveX, moveY, offsetX, offsetY;
    moveX = event.changedTouches[0].pageX
    moveY = event.changedTouches[0].pageY
    offsetX = moveX - this.startX
    offsetY = moveY - this.startY
    this.el.style.transition = 'none'
    let matrix = getComputedStyle(this.el, null).transform.match(/[^\(]+(?=\))/g)[0].split(',');
    matrix[4] = offsetX;
    matrix[5] = offsetY;
    this.el.style.transform = `matrix(${matrix.join()})`
    let clientRect = this.el.getBoundingClientRect();
    let param = Object.assign(clientRect, {el: this.el, id: this.dragId});
    this.options.onOffset && this.options.onOffset(clientRect)
  }
  onDrop(){
    this.el.removeEventListener('touchmove', this.bindOffsetEvent)
    this.el.classList.remove(this.dragClass)
    this.el.style.transition = 'all .3s ease'
    this.el.style.transform = ''
    let clientRect = this.el.getBoundingClientRect();
    let param = Object.assign(clientRect, {el: this.el, id: this.dragId});
    this.options.onDrop && this.options.onDrop(param)
  }
}
export default {
  install (vue, options){
    vue.directive('drag', {
      bind (el, binding, vnode, oldVnode) {

      },
      inserted(el, binding, vnode, oldVnode){
        //console.log('inserted');
        new Dragdrop(el, binding.value)
      },
      update(el, binding, vnode, oldVnode){
        //console.log('update:');
      },
      componentUpdated(){
        //console.log('componentUpdated');
      }

    })
  }
}