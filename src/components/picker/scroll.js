; (function () {

  function PickerScroll (options = {}){
    this.container = options.container
    this.item = options.item
    this.maxRows = this.container.offsetHeight / this.item[0].offsetHeight
    this.init()
  }
  PickerScroll.prototype = {
    init(){
      console.log(this.maxRows);
    },
    setTranslate(el, val) {
        el.style.transform = `translate3d(0, ${val}px, 0)`
    },
    setDefaultTransform(){
      let itemCount = this.item.length;
      if(itemCount < this.maxRows){
        this.setTranslate(this.container, )
      }
    }
  }

  if (typeof module !== 'undefined' && typeof exports === 'object') {
      module.exports = PickerScroll;
  }else {
      window.Transform = PickerScroll;
  }
})();