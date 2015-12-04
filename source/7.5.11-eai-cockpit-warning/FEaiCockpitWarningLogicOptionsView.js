//==========================================================
// <T>预测目录视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogicOptionsView = function FEaiCockpitWarningLogicOptionsView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitWarningLogicOptionsView_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitWarningLogicOptionsView_construct;
   // @method
   o.setup        = MO.FEaiCockpitWarningLogicOptionsView_setup;
   o.processLogic = MO.FEaiCockpitWarningLogicOptionsView_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitWarningLogicOptionsView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsView_onPaintBegin = function FEaiCockpitWarningLogicOptionsView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsView_construct = function FEaiCockpitWarningLogicOptionsView_construct() {
   var o = this;
   o.__base.FEaiCockpitControlView.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsView_setup = function FEaiCockpitWarningLogicOptionsView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsView_processLogic = function FEaiCockpitWarningLogicOptionsView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsView_dispose = function FEaiCockpitWarningLogicOptionsView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
