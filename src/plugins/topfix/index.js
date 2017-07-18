// class TopFix{
//   constructor(options){
//     this.container = options && options.container || window
//     this.distance = options && options.distance || 0
//     this.rankArr = []
//     this.curArr = []
//   }
//   getFixDate(el){
//     let curScrollTop = options && options.container && options.container.scrollTop || document.body.scrollTop;
//     let offsetTop = el.getBoundingClientRect().top;
//     let fixObj = {
//       dom:el,
//       width: el.offsetWidth,
//       height: el.offsetHeight,
//       offset: offsetTop + curScrollTop
//     };
//     rankArr.push(fixObj)
//   }
//   inPosition(){
//     let scrollTop = options && options.container && options.container.scrollTop || document.body.scrollTop;
//     rankArr.forEach((cur,index)=>{
//       let nearTop = cur.offset + distance - scrollTop;
//       if(nearTop <= 0 && curArr.indexOf(index) === -1){
//         curArr.unshift(index);
//         cur.dom.classList.add('fix-t');
//         cur.dom.style.width = `${cur.width}px`
//         cur.dom.nextElementSibling.style.height = `${cur.height}px`
//       }else if(nearTop >0 && curArr.indexOf(index) !== -1){
//         curArr.shift(index);
//         cur.dom.classList.remove('fix-t');
//         cur.dom.nextElementSibling.style.height = '0px'
//       }
      
//       if(curArr.length && curArr[0] === index - 1){
//         let current = rankArr[curArr[0]];
//         let daff = nearTop - current.height;
//         if(daff <= 0 && nearTop >= 0){
//           current.dom.style.transform = `translate3d(0,${daff}px,0)`;
//         }else{
//           current.dom.style.transform = `translate3d(0,0,0)`;
//         }
//         if(curArr.length > 1){
//           curArr.forEach((val,index)=>{
//             if(index > 0){
//               rankArr[val].dom.style.transform = `translate3d(0,-${rankArr[curArr[1]].height}px,0)`;
//             }
//           })
//         }
//       }
//     })
//   }
//   onScroll(){
//     container.addEventListener('scroll', this.inPosition, false);
//   }
// }

export default {
  install (vue, options = {}){
    //let param = Object.assign({},options);
    let container = options.container || window;
    let distance = options.distance || 0;
    let rankArr = [];
    let curArr = [];
    function onScroll(){
      let scrollTop = container === window ? document.body.scrollTop : container.scrollTop;
      rankArr.forEach((cur,index)=>{
        let nearTop = cur.offset - distance - scrollTop;
        if(nearTop <= 0 && curArr.indexOf(index) === -1){
          curArr.unshift(index);
          if(cur.className) cur.dom.classList.add(cur.className);
          cur.dom.classList.add('fix-t');
          cur.dom.style.top = `${distance}px`
          cur.dom.style.width = `${cur.width}px`
          cur.dom.nextElementSibling.style.height = `${cur.height}px`
          if(cur.onTop) cur.onTop(cur.dom)
        }else if(nearTop >0 && curArr.indexOf(index) !== -1){
          curArr.shift(index);
          cur.dom.classList.remove('fix-t');
          if(cur.className) cur.dom.classList.remove(cur.className);
          cur.dom.style.top = ''
          cur.dom.style.width = ''
          cur.dom.nextElementSibling.style.height = '0px'
        }
        
        if(curArr.length && curArr[0] === index - 1){
          let current = rankArr[curArr[0]];
          let daff = nearTop - current.height;
          if(daff <= 0 && nearTop >= 0){
            current.dom.style.transform = `translate3d(0,${daff}px,0)`;
          }else{
            current.dom.style.transform = '';
          }
          if(curArr.length > 1){
            curArr.forEach((val,index)=>{
              if(index > 0){
                rankArr[val].dom.style.transform = `translate3d(0,-${rankArr[curArr[1]].height}px,0)`;
              }
            })
          }
        }
      })
    }
    container.addEventListener('scroll', onScroll, false);

    vue.directive('topfix', {
      bind (el, binding, vnode, oldVnode) {
        
      },
      inserted(el, binding, vnode, oldVnode){
        let scrollTop = options.container ? options.container.scrollTop : document.body.scrollTop;
        let _className, _onTop, _distance;
        el.insertAdjacentHTML('afterend', `<div style="height:0px"></div>`);
        let fixObj = {
          dom:el,
          width: el.offsetWidth,
          height: el.offsetHeight,
          offset: el.getBoundingClientRect().top + scrollTop,
        };
        if(typeof binding.value === 'object'){
          fixObj['className'] = binding.value.className && binding.value.className
          fixObj['distance'] = binding.value.distance && binding.value.distance
          fixObj['onTop'] = typeof binding.value.onTop === 'function' ? binding.value.onTop : undefined
        }
        rankArr.push(fixObj)
      },
      update(el, binding, vnode, oldVnode){
        console.log('update');
      },
      componentUpdated(){
        console.log('componentUpdated');
      }
    })
  }
}
