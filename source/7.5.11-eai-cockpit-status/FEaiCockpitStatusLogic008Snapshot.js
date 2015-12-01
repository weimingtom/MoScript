//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitStatusLogic008Snapshot = function FEaiCockpitStatusLogic008Snapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._comingSoon    = true;
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/forecast/logic.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitStatusLogic008Snapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitStatusLogic008Snapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitStatusLogic008Snapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitStatusLogic008Snapshot_setup;
   o.processLogic   = MO.FEaiCockpitStatusLogic008Snapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitStatusLogic008Snapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic008Snapshot_onPaintBegin = function FEaiCockpitStatusLogic008Snapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic008Snapshot_onPaintEnd = function FEaiCockpitStatusLogic008Snapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic008Snapshot_construct = function FEaiCockpitStatusLogic008Snapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(7, 13, 0);
   o._cellSize.set(6, 4);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic008Snapshot_setup = function FEaiCockpitStatusLogic008Snapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic008Snapshot_processLogic = function FEaiCockpitStatusLogic008Snapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic008Snapshot_dispose = function FEaiCockpitStatusLogic008Snapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
