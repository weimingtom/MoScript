//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150212
//==========================================================
MO.FG2dObject = function FG2dObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   //..........................................................
   // @method
   o.setup   = MO.FG2dObject_setup;
   // @method
   o.dispose = MO.FG2dObject_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FG2dObject_setup = function FG2dObject_setup(){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG2dObject_dispose = function FG2dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}