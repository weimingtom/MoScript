//==========================================================
// <T>页面对象。</T>
//
// @class
// @author maocy
// @version 150612
//==========================================================
MO.FGuiCanvasManager = function FGuiCanvasManager(o){
   o = MO.Class.inherits(this, o, MO.FGuiManager);
   //..........................................................
   // @attribute
   o._size             = MO.Class.register(o, new MO.AGetter('_size'));
   o._calculateRate    = MO.Class.register(o, new MO.AGetter('_calculateRate'));
   o._canvas           = MO.Class.register(o, new MO.AGetSet('_canvas'));
   // @attribute
   o._paintEvent       = null;
   //..........................................................
   // @event
   o.onOperationResize = MO.FGuiCanvasManager_onOperationResize;
   //..........................................................
   // @method
   o.construct         = MO.FGuiCanvasManager_construct;
   // @method
   o.processResize     = MO.FGuiCanvasManager_processResize;
   o.processControl    = MO.FGuiCanvasManager_processControl;
   o.process           = MO.FGuiCanvasManager_process;
   // @method
   o.dispose           = MO.FGuiCanvasManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_onOperationResize = function FGuiCanvasManager_onOperationResize(event){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_construct = function FGuiCanvasManager_construct(){
   var o = this;
   o.__base.FGuiManager.construct.call(o);
   // 设置属性
   o._size = new MO.SSize2();
   o._calculateRate = new MO.SSize2();
   o._paintEvent = new MO.SGuiPaintEvent();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_processResize = function FGuiCanvasManager_processResize(control){
   //control.psResize();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_processControl = function FGuiCanvasManager_processControl(control){
   var o = this;
   o.__base.FGuiManager.process.call(o);
   // 检查准备好
   if(!control.testReady()){
      //return false;
   }
   // 检查是否脏
   if(!control.testDirty()){
      //return false;
   }
   // 获得尺寸
   var graphic = o._canvas.context();
   // 绘制处理
   var event = o._paintEvent;
   event.optionContainer = true;
   event.graphic = graphic;
   event.parentRectangle.set(0, 0, o._size.width, o._size.height);
   event.calculateRate = o._calculateRate;
   event.clientRectangle.set(control.location().x, control.location().y, control.size().width, control.size().height);
   event.rectangle.reset();
   control.paint(event);
   return true;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_process = function FGuiCanvasManager_process(){
   var o = this;
   o.__base.FGuiManager.process.call(o);
   var controls = o._controls;
   var count = controls.count();
   // 获得大小
   var desktop = MO.Desktop.activeDesktop();
   o._size.assign(desktop.logicSize());
   o._calculateRate.assign(desktop.calculateRate());
   // 检查变更
   var changed = false;
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      if(control.testDirty()){
         changed = true;
         break;
      }
   }
   // 重绘画板
   changed = true;
   if(changed){
      var graphic = o._canvas.context();
      graphic.clear();
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         if(control.visible()){
            o.processControl(control);
         }
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_dispose = function FGuiCanvasManager_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o._calculateRate = RObject.dispose(o._calculateRate);
   o._paintEvent = RObject.dispose(o._paintEvent);
   // 父处理
   o.__base.FGuiManager.dispose.call(o);
}
