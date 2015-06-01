//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150128
//==========================================================
function ME3sGeometry(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._outline         = null;
   o._streams         = null;
   //..........................................................
   // @method
   o.construct        = ME3sGeometry_construct;
   // @method
   o.outline          = ME3sGeometry_outline;
   o.findStream       = ME3sGeometry_findStream;
   o.streams          = ME3sGeometry_streams;
   // @method
   o.calculateOutline = ME3sGeometry_calculateOutline;
   // @method
   o.dispose          = ME3sGeometry_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function ME3sGeometry_construct(){
   var o = this;
   // 设置属性
   o._outline = new SOutline3d();
}

//==========================================================
// <T>获得轮廓。</T>
//
// @method
// @return SOutline3 轮廓
//==========================================================
function ME3sGeometry_outline(){
   return this._outline;
}

//==========================================================
// <T>根据代码查找数据流。</T>
//
// @method
// @param code:String 代码
// @return FE3sStream 数据流
//==========================================================
function ME3sGeometry_findStream(code){
   var o = this;
   var streams = o._streams;
   var count = streams.count();
   for(n = 0; n < count; n++){
      var stream = streams.getAt(n);
      if(stream.code() == code){
         return stream;
      }
   }
   return null;
}

//==========================================================
// <T>获得数据流集合。</T>
//
// @method
// @return TObjects 数据流集合
//==========================================================
function ME3sGeometry_streams(){
   return this._streams;
}

//==========================================================
// <T>计算三维轮廓。</T>
//
// @method
// @return SOutline3 三维轮廓
//==========================================================
function ME3sGeometry_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      outline.setMin();
      var stream = o.findStream('position');
      var dataCount = stream.dataCount();
      var data = new Float32Array(stream.data())
      var index = 0;
      for(var i = 0; i < dataCount; i++){
         var x = data[index++];
         var y = data[index++];
         var z = data[index++];
         outline.mergePoint(x, y, z);
      }
      outline.update();
   }
   return outline;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function ME3sGeometry_dispose(){
   var o = this;
   o._outline = RObject.dispose(o._outline);
   // 父处理
   o.__base.FE3sSpace.dispose.call(o);
}
