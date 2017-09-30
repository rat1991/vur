import $ from 'balajs'
import ua from './device'
import * as storage from './storage'


Object.assign($, {
  /**
   * 获取设备系统信息
   * @return {Object} 设备对象信息
   */
  device(){
    return ua.device()
  },
  /**
   * 设置localStorage缓存
   * @return {Object} 获取或设置localStorage的对象方法
   */
  local: storage.local,
  /**
   * 设置localStorage缓存
   * @return {Object} 获取或设置localStorage的对象方法
   */
  session: storage.session,
  /**
   * debounce 函数去抖
   * @param fn {Function}
   * @param delay {number}
   * @returns {function()}
   */
  debounce: (fn, delay = 500)=> {
      let timer;
      return function() {
          let context = this;
          let args = arguments;
          clearTimeout(timer)
          timer = setTimeout(() => {
              fn.apply(this, arguments)
          }, delay)
      }
  },
  /**
   * debounce 函数节流
   * @param fn {Function}
   * @param delay {number}
   * @returns {function()}
   */
  throttle: function(fn, delay = 500){
    let timer, last;
    return function() {
      let now = +new Date();
      let context = this;
      let args = arguments;
      if(last && now - last < delay){
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
            last = now
        }, delay)
      }else{
        fn.apply(context, args)
        last = now
      }
    }
  },
  /**
   * 获取touch事件位置
   * @param e {Event} touch event
   * @return {Obejct} x,y位置信息
   */
  getTouchPosition: function (e) {
    if (e === undefined) return console.warn("not event");
    if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
      return {
        x: e.targetTouches[0].pageX,
        y: e.targetTouches[0].pageY
      };
    } else {
      return {
        x: e.pageX,
        y: e.pageY
      };
    }
  },
  /**
   * 判断链接为url链接还是路由导航
   * @param url {String} 导航的链接或路由地址
   * @param router {Object} 路由对象
   * @return {null} null
   */
  url: function (url, router) {
    if (/^javas/.test(url) || !url) return
    const useRouter = typeof url === 'object' || (router && typeof url === 'string' && !/^(\/\/|https?|tel:)/.test(url))
    if (useRouter) {
      router.push(url)
    } else {
      window.location.href = url
    }
  }
});

Object.assign($.fn, {
  transitionEnd(callback){
    let events = ['webkitTransitionEnd', 'transitionend'];
    let dom = this;
    function fireCallBack(e, eventName) {
      if(e.target !== this) return;
      callback.call(this, e)
      for(let i of events){
        dom[0].removeEventListener(i, fireCallBack)
      }
    }
    for(let i of events){
      dom[0].addEventListener(i, fireCallBack)
    }
  },
  //  只能是一个 HTMLElement 元素或者 HTMLElement 数组，不支持字符串
  //  @param {Element|Element[]} $child
  //  @returns {append}
  append: function ($child) {
    if (!($child instanceof HTMLElement)) {
      $child = $child[0]
    }
    this.forEach(($element) => {
      $element.appendChild($child)
    });
    return this;
  },
  //  @returns {remove}
  remove: function () {
    this.forEach(($element) => {
      $element.parentNode.removeChild($element);
    });
    return this;
  },
  //  @param selector
  //  @returns {HTMLElement}
  find: function (selector) {
    return $(selector, this);
  },

  //  @param {String} className
  //  @returns {addClass}
  addClass: function (className) {
    this.forEach(($element) => {
      // http://caniuse.com/#search=classList
      $element.classList.add(className);
    });
    return this;
  },

  //  @param {String} className
  //  @returns {removeClass}
  removeClass: function (className) {
    this.forEach(($element) => {
      // http://caniuse.com/#search=classList
      $element.classList.remove(className);
    });
    return this;
  },

  //  @param index
  //  @returns {*|jQuery|HTMLElement}
  eq: function (index) {
    return $(this[index]);
  },

  // @returns {show}
  show: function () {
    this.forEach(($element) => {
      $element.style.display = 'block';
    });
    return this;
  },
  //  @returns {hide}
  hide: function () {
    this.forEach(($element) => {
      $element.style.display = 'none';
    });
    return this;
  },

  //  @param html 目前只能接受字符串
  //  @returns {html}
  html: function (html) {
    this.forEach(($element) => {
      $element.innerHTML = html;
    });
    return this;
  },

  // @param {Object} obj 目前只能接受object
  // @returns {css}
  css: function (obj) {
    Object.keys(obj).forEach((key) => {
      this.forEach(($element) => {
        $element.style[key] = obj[key];
      });
    });
    return this;
  },

  // @param eventType
  // @param selector
  // @param handler
  on: function (eventType, selector, handler) {
    const isDelegate = typeof selector === 'string' && typeof handler === 'function';
    if (!isDelegate) {
      handler = selector;
    }
    this.forEach(($element) => {
      eventType.split(' ').forEach((event) => {
        $element.addEventListener(event, function (evt) {
          if (isDelegate) {
            // http://caniuse.com/#search=closest
            if (this.contains(evt.target.closest(selector))) {
              handler.call(evt.target, evt);
            }
          } else {
            handler.call(this, evt);
          }
        });
      });
    });
    return this;
  },

  // @param {String} eventType
  // @param {String|Function} selector
  // @param {Function=} handler
  // @returns {off}
  off: function (eventType, selector, handler) {
    if (typeof selector === 'function') {
      handler = selector;
      selector = null;
    }

    this.forEach(($element) => {
      eventType.split(' ').forEach((event) => {
        if (typeof selector === 'string') {
          $element.querySelectorAll(selector).forEach(($element) => {
            $element.removeEventListener(event, handler);
          });
        } else {
          $element.removeEventListener(event, handler);
        }
      });
    });
    return this;
  },

  // @returns {Number}
  index: function () {
    const $element = this[0];
    const $parent = $element.parentNode;
    return Array.prototype.indexOf.call($parent.children, $element);
  },

  // @desc 因为off方法目前不可以移除绑定的匿名函数，现在直接暴力移除所有listener
  // @returns {offAll}
  offAll: function () {
    this.forEach(($element, index) => {
      var clone = $element.cloneNode(true);
      $element.parentNode.replaceChild(clone, $element);

      this[index] = clone;
    });
    return this;
  },

  // @returns {*}
  val: function () {
    if (arguments.length) {
      this.forEach(($element) => {
        $element.value = arguments[0];
      });
      return this;
    }
    return this[0].value;
  },

  // @returns {*}
  attr: function () {
    if (typeof arguments[0] == 'object') {
      const attrsObj = arguments[0];
      const that = this;
      Object.keys(attrsObj).forEach((attr) => {
        that.forEach(($element) => {
          $element.setAttribute(attr, attrsObj[attr]);
        });
      });
      return this;
    }

    if (typeof arguments[0] == 'string' && arguments.length < 2) {
      return this[0].getAttribute(arguments[0]);
    }

    this.forEach(($element) => {
      $element.setAttribute(arguments[0], arguments[1]);
    });
    return this;
  }
})
export default $;
