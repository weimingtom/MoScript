//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FRenderObject(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._context = null;
   //..........................................................
   // @method
   o.linkContext = FRenderObject_linkContext;
   // @method
   o.setup       = FRenderObject_setup;
   return o;
}

//==========================================================
// <T>关联环境处理。</T>
//
// @method
// @param c:context:FContext3d 渲染环境
//==========================================================
function FRenderObject_linkContext(c){
   this._context = c;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FRenderObject_setup(){
}
