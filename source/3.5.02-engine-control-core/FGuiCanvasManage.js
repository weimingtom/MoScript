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
   o._desktop          = MO.Class.register(o, new MO.AGetSet('_desktop'));
   o._canvas           = MO.Class.register(o, new MO.AGetSet('_canvas'));
   // @attribute
   o._readyControls    = null;
   o._dirtyControls    = null;
   // @attribute
   o._paintEvent       = null;
   //..........................................................
   // @event
   o.onOperationResize = MO.FGuiCanvasManager_onOperationResize;
   //..........................................................
   // @method
   o.construct         = MO.FGuiCanvasManager_construct;
   // @method
   o.filterByRectangle = MO.FGuiCanvasManager_filterByRectangle;
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
   o._readyControls = new MO.TObjects();
   o._dirtyControls = new MO.TObjects();
   o._paintEvent = new MO.SGuiPaintEvent();
}

//==========================================================
// <T>查找和当前大小重合的所有控件。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_filterByRectangle = function FGuiCanvasManager_filterByRectangle(dirtyControls, rectangle){
   var o = this;
   var controls = o._readyControls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      var clientRectangle = control.clientRectangle();
      if(rectangle.testRectangle(clientRectangle)){
         dirtyControls.pushUnique(control);
      }
   }
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
   var graphic = o._canvas.context();
   // 绘制处理
   var event = o._paintEvent;
   event.optionContainer = true;
   event.graphic = graphic;
   event.parentRectangle.set(0, 0, o._size.width, o._size.height);
   event.calculateRate = o._calculateRate;
   event.rectangle.reset();
   control.paint(event);
   // console.log('Draw control.', control);
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
   // 获得大小
   var desktop = o._desktop;
   o._size.assign(desktop.logicSize());
   o._calculateRate.assign(desktop.calculateRate());
   // 获得准备好的控件集合
   var readyControls = o._readyControls;
   readyControls.clear();
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      if(control.processReady()){
         if(control.visible()){
            readyControls.push(control)
         }
      }
   }
   // 脏处理
   var graphic = o._canvas.context();
   if(o._statusDirty){
      // 重绘全部控件
      graphic.clear();
      var readyCount = readyControls.count();
      for(var i = 0; i < readyCount; i++){
         var control = readyControls.at(i);
         o.processControl(control);
      }
      o._statusDirty = false;
   }else{
      // 获得脏的控件集合
      var dirtyControls = o._dirtyControls;
      dirtyControls.clear();
      var readCount = readyControls.count();
      for(var i = 0; i < readCount; i++){
         var control = readyControls.at(i);
         if(control.testDirty()){
            var controlRectangle = control.clientRectangle();
            dirtyControls.push(control);
            // 处理所有位置有交叉的控件
            o.filterByRectangle(dirtyControls, controlRectangle)
         }
      }
      // 重绘脏的控件
      var dirtyCount = dirtyControls.count();
      for(var i = 0; i < dirtyCount; i++){
         var control = dirtyControls.at(i);
         if(control.isDirty()){
            // 清空控件
            var clientRectangle = control.clientRectangle();
            if(!clientRectangle.isEmpty()){
               graphic.clearRectangle(clientRectangle);
            }
            // 处理控件
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
   o._readyControls = RObject.dispose(o._readyControls);
   o._dirtyControls = RObject.dispose(o._dirtyControls);
   o._paintEvent = RObject.dispose(o._paintEvent);
   // 父处理
   o.__base.FGuiManager.dispose.call(o);
}
