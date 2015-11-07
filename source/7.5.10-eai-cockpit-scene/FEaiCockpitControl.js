//==========================================================
// <T>立方面控件。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiCockpitControl = function FEaiCockpitControl(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._moduleManager = MO.Class.register(o, new MO.AGetSet('_moduleManager'));
   o._module        = MO.Class.register(o, new MO.AGetSet('_module'));
   o._cellLocation  = MO.Class.register(o, new MO.AGetter('_cellLocation'));
   o._cellSize      = MO.Class.register(o, new MO.AGetter('_cellSize'));
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitControl_construct;
   // @method
   o.placeInCell    = MO.FEaiCockpitControl_placeInCell;
   o.processLogic   = MO.FEaiCockpitControl_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitControl_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControl_construct = function FEaiCockpitControl_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 配置属性
   o._cellLocation = new MO.SPoint3();
   o._cellSize = new MO.SSize2();
}

//==========================================================
// <T>放置到格子上。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControl_placeInCell = function FEaiCockpitControl_placeInCell(){
   var o = this;
   o._moduleManager.placeCellControl(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControl_processLogic = function FEaiCockpitControl_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControl_dispose = function FEaiCockpitControl_dispose() {
   var o = this;
   o._cellLocation = MO.Lang.Object.dispose(o._cellLocation);
   o._cellSize = MO.Lang.Object.dispose(o._cellSize);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
