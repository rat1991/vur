/**
 * calenday swiper
 * @param key 缓存名称
 * @returns {*}
 */
export default class CalendarSwiper {
  constructor(options = {}){
    this.container   = options.container
    this.swiperList  = options.swiperList
    this.swiperWidth = this.container.offsetWidth
    this.beforeSwiper = options.beforeSwiper
    this.prev        = this.onPrev
    this.next        = this.onNext
    this.translateRetain = this.getTranslateX(this.container)
    this.init()
    this.onTouch()
  }
  init(){
    this.setTranslateX(this.container, 0)
    this.setTranslateX(this.swiperList[0], -100)
    this.setTranslateX(this.swiperList[1], 0)
    this.setTranslateX(this.swiperList[2], 100)
    
  }
  setTranslateX(el, ratio){
    el.style.transform = `translate3d(${ratio}%, 0, 0)`
  }
  getTranslateX(el){
    let matrix = window.getComputedStyle(el, null).transform;
    let formatPer = matrix.split(',')[4] / this.swiperWidth * 100
    return formatPer || 0
  }
  onTouch(){
    let startTime, endTime, startX, moveX, endX;
    //SWIPER start
    this.container.addEventListener('touchstart', (e) =>{
      startTime = new Date().getTime()
      startX = e.changedTouches[0].pageX
    }, false)
    //SWIPER move
    this.container.addEventListener('touchmove', (e) =>{
      e.preventDefault()
      moveX = e.changedTouches[0].pageX
      let distance = moveX - startX
      let ratio = (distance / this.swiperWidth * 100) + this.translateRetain
      this.container.style.transition = 'none'
      this.setTranslateX(this.container, ratio)
    }, false)
    //SWIPER end
    this.container.addEventListener('touchend', (e) =>{
      endTime = new Date().getTime()
      endX = e.changedTouches[0].pageX
      let interval = endTime - startTime
      let distance = endX - startX
      let ratio = (distance / this.swiperWidth * 100)
      this.container.style.transition = 'all 300ms ease'
      if(Math.abs(ratio) >= 30 || Math.abs(ratio) > 10 && interval < 120){
        let direction = ratio > 0 ? 'prev' : 'next'
        if(this.beforeSwiper && typeof this.beforeSwiper === 'function'){
          this.beforeSwiper(direction).then((e)=>{
            //判断左滑动or右滑动
            ratio > 0 ? this.onPrev() : this.onNext()
          })
        }
      }else{
        this.setTranslateX(this.container, this.translateRetain)
      }
    }, false)
  }
  setSwiper(val){
    this.setTranslateX(this.container, val)
    this.swiperList.forEach((cur, index)=>{
        let ratio = (100 * index - 100) - val
        this.setTranslateX(cur, ratio)
    })
  }
  onPrev(){
    let translateRetain = this.translateRetain += 100;
    //执行swiper
    this.setSwiper(translateRetain)
  }
  onNext(){
    let translateRetain = this.translateRetain -= 100;
    //执行swiper
    this.setSwiper(translateRetain)
  }
}
