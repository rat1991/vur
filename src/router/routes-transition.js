export default function(to, from, options){
  let excVoid = function(path){
    let depth = path.length;
    path.forEach((item, index)=>{
      if(!item) depth--;
    })
    return depth;
  };
  const toDepth = excVoid(to.path.split('/'))
  const fromDepth = excVoid(from.path.split('/'))
  if(to.meta.transitionEnter){
    return to.meta.transitionEnter
  }else if(from.meta.transitionLeave){
    return from.meta.transitionLeave
  }else{
    return toDepth >= fromDepth ? options.enter : options.leave
  }
};