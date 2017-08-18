/* storage
 * By rat1991
 * 
 */
function Storage (type) {
  this.storage = window[type] || window.localStorage
}
Storage.prototype = {
    /**
     * 设置缓存，可以设置过期时间，单位：秒
     * @param key 缓存名称
     * @param val 缓存的值，如果未定义或为null，则删除该缓存
     * @param exp 缓存的过期时间
     * @returns {*}
     */
    set(key, val, exp){
      if(typeof(key) !== 'string'){
        console.warn(`param error! ${key} is not a string`);
        key = key + '';
      }
      if(exp && typeof(exp) !== 'number'){
        console.error(`param error! ${exp} is not a number`);
        exp = false
      }else{
        let toTime = new Date().getTime();
        exp = toTime + exp * 1000;
      }
      let _item = exp ? {v: val, e: exp} : val;

      this.storage.setItem(key, JSON.stringify(_item))
      return _item;
    },
    /**
   * 设置修改缓存的过期时间
   * @param key 缓存的名称
   * @param exp 新的过期时间 单位：秒
   */
    setExp(key, exp){
      let _item = this.get(key);
      if(_item.e && typeof(_item.e) === 'number'){
        exp = new Date().getTime() + exp * 1000;
        this.set(key, _item.v, exp)
      }else if(_item){
        this.set(key, _item, exp)
      }
    },
    /**
     * 获取缓存，如果已经过期，会主动删除缓存，并返回null
     * @param key 缓存名称
     * @returns {*} 缓存的值，默认已经做好序列化
     */
    get(key){
      let _item = this.storage.getItem(key);
      if(_item !== null && _item !== undefined){
        _item = JSON.parse(_item);
        if(_item.e !== undefined && typeof(_item.e) === 'number'){
          let toTime = new Date().getTime();
          if(toTime < _item.e){
            return _item.v
          }else{
            this.remove(key)
            console.warn(`localStorage of '${key}' has expired`)
          }
        }else{
          return _item
        }
      }
      return null;
    },
    /**
     * 获取缓存的过期时间
     * @param key 缓存的名称
     * @returns {*} 单位：秒
     */
    getExp(key){
      let _item = this.get(key);
      if(_item && _item.e){
        return _item.e
      }
    },
     /**
     *  删除指定的缓存
     * @param key 要删除缓存的主键
     * @returns {*}
     */
    remove(key){
      this.storage.removeItem(key)
    },
    /**
     *  清空缓存
     */
    clear(){
      this.storage.clear()
    },
    /**
     *  删除所有过期的缓存
     * @returns {Array}
     */
    clearExp(){
      let storage = Object.keys(this.storage),
          _caches = [],
          _self = this;
      if(storage.length) return;
      for(let i=0; i < storage.length; i ++){
        let _key = storage[i],
            _itme = this.get(_key);
        if(_itme.e) {
          let toTime = new Date().getTime();
          toTime > _itme.e && _caches.push(_key)
        }
      }
      _caches.forEach(cur =>{
        this.remove(cur)
      })
      return _caches;
    }
  }

  export const local = new Storage('localStorage');
  export const session = new Storage('sessionStorage');