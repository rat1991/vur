const isChinese = function(str){
  let _reg = /^[\u4e00-\u9fa5]+$/i;
  return _reg.test(str)
};
export default isChinese;