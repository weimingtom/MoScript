//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FGraphicContext = function FGraphicContext(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._hCanvas   = null;
   //..........................................................
   // @method
   o.linkCanvas = MO.RMethod.virtual(o, 'linkCanvas');
   // @method
   o.dispose    = MO.FGraphicContext_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGraphicContext_dispose = function FGraphicContext_dispose(){
   var o = this;
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
