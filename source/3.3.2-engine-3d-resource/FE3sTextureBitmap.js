//==========================================================
// <T>资源纹理位图。</T>
//
// @class
// @author maocy
// @history 150302
//==========================================================
function FE3sTextureBitmap(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @method
   o.unserialize = FE3sTextureBitmap_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sTextureBitmap_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
}
