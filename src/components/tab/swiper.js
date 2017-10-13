
class Swiper {
  constructor(options){
    this._default = {
      containerEl: document.querySelector('.swiper'),
      item: '.item',
      direction: 'horizontal',
      activeClass: 'active',
      isScroll: false,
      threshold: 60,
      duration: 400
    }
    this._options = Object.assign(this._default, options)
    this._start = {}
    this._move = {}
    this._end = {}
    this._current = 0
    this._offset = 0

    this._event = {
      beforeSwipe: this._options.beforeSwipe,
      swiping: this._options.swiping,
      afterSwipe: this._options.afterSwipe
    }

    this.$container = this._options.containerEl
    this.$items = this.$container.querySelectorAll(this._options.item)
    this.count = this.$items.length

    this._width = this.$container.offsetWidth
    this._height = this.$container.offsetHeight
    this.init()
    this.bind()
  }
   /**
    * 初始化
    * @private
    * @returns {*}
    */
  init(){
    let _width = this._width;
    let _height = this._height;
    if(this._options.direction === 'horizontal'){
      this.$container.style.width = `${_width * this.count}px`
      Array.prototype.forEach.call(this.$items, ($item, index)=>{
        $item.style.width = `${_width}px`
        $item.style.left = `${_width * index}px`
      })
    }else{
      this.$container.style.height = `${_height * this.count}px`
      Array.prototype.forEach.call(this.$items, $item=>{
        $item.style.height = `${_height}px`
      })
    }
  }
  /**
   * 绑定事件监听
   * @private
   * @returns {*}
   */
  bind(){
    let offsetX, offsetY;
    // 监听touchstart
    this.$container.addEventListener('touchstart', e=>{
      this._start.x = e.changedTouches[0].pageX
      this._start.y = e.changedTouches[0].pageY

      this.$container.style['-webkit-transition'] = 'none'
      this.$container.style.transition = 'none'
    },false)
    // 监听touchmove
    this.$container.addEventListener('touchmove', e=>{
      this._move.x = e.changedTouches[0].pageX
      this._move.y = e.changedTouches[0].pageY

      offsetX = this._move.x - this._start.x
      offsetY = this._move.y - this._start.y
      let transform, isScroll;
      if(this._options.direction === 'horizontal'){
        // if(this._current === 0 || this._current + 1 === this.count){
        //   offsetX = offsetX / 4
        // }
        isScroll = Math.abs(offsetY) - Math.abs(offsetX);
        transform = `translate3d(${offsetX - this._offset}px, 0, 0)`
      }else{
        // if(this._current === 0 || this._current + 1 === this.count){
        //   offsetY = offsetY / 4
        // }
        transform = `translate3d(0, ${offsetY - this._offset}px, 0)`
      }
      if(this._options.isScroll){
        isScroll < 0 && e.preventDefault();
        return
      };
      this.$container.style['-webkit-transform'] = transform;
      this.$container.style.transform = transform;
      e.preventDefault();

    }, false)

    // 监听touchend
    this.$container.addEventListener('touchend', e=>{
      this._end.x = e.changedTouches[0].pageX
      this._end.y = e.changedTouches[0].pageY
      let distance = this._options.direction === 'horizontal' ? this._end.x - this._start.x : this._end.y - this._start.y;
      if(distance > this._options.threshold){
        this._current = this._current === 0 ? 0 : --this._current
      }else if(distance < -this._options.threshold){
        this._current = this._current + 1 === this.count ? this._current : ++this._current
      }
      this.switch(this._current)
    }, false)
    this.$container.addEventListener('transitionEnd', this.transitionEnd.bind(this), false);
    this.$container.addEventListener('webkitTransitionEnd', this.transitionEnd.bind(this), false);
  }
  /**
   * 切换事件
   * @private
   * @param index //引索值
   * @returns {*}
   */
  switch(index){
    let transform;
    if(this._options.direction === 'horizontal'){
      this._offset = this._width * index
      transform = `translate3d(-${this._offset}px, 0, 0)`
    }else{
      this._offset = this._height * index
      transform = `translate3d(0, -${this._offset}px, 0)`
    }
    let duration = `all ${this._options.duration}ms ease`;
    this.$container.style['-webkit-transition'] = duration;
    this.$container.style.transition = duration;
    this.$container.style['-webkit-transform'] = transform;
    this.$container.style.transform = transform;
  }
   /**
   * 切换完成后执行的事件
   * @private
   * @param e //transitionEnd事件
   * @returns {*}
   */
  transitionEnd(e){
    let height = this.$items[this._current].offsetHeight;
    if(this._event.afterSwipe && typeof this._event.afterSwipe === 'function'){
      this._event.afterSwipe.apply(this, [this, this._current]);
    }
  }
  /**
   * 执行切换到指定引索
   * @param e //引索值
   * @returns {*}
   */
  go(index){
    if(index < 0 || index > this.count -1 || index === this._current) return;
    this._current = index
    this.switch(index)
  }
}

export default Swiper;