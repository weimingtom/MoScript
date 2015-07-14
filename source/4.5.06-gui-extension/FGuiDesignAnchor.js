//==========================================================
// <T>设计锚点。</T>
//
// @class
// @author maocy
// @version 150714
//==========================================================
MO.FGuiDesignAnchor = function FGuiDesignAnchor(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   // @method
   o.construct = MO.FGuiDesignAnchor_construct;
   // @method
   o.dispose   = MO.FGuiDesignAnchor_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiDesignAnchor_construct = function FGuiDesignAnchor_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
}

//==========================================================
// <T>析构处理。</T>
//
// @method
//==========================================================
MO.FGuiDesignAnchor_dispose = function FGuiDesignAnchor_dispose(){
   var o = this;
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
