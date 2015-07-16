//==========================================================
// <T>页面。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
MO.FUiFramePage = function FUiFramePage(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   //..........................................................
   // @style
   o._styleContainer = MO.Class.register(o, new MO.AStyle('_styleContainer'));
   //..........................................................
   // @html
   o._hContainer     = null;
   //..........................................................
   // @event
   o.onBuildPanel    = MO.FUiFramePage_onBuildPanel;
   o.onBuild         = MO.FUiFramePage_onBuild;
   //..........................................................
   // @process
   o.oeResize        = MO.FUiFramePage_oeResize;
   //..........................................................
   // @method
   o.appendChild     = MO.FUiFramePage_appendChild;
   o.removeChild     = MO.FUiFramePage_removeChild;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FUiFramePage_onBuildPanel = function FUiFramePage_onBuildPanel(p){
   var o = this;
   var hPanel = o._hPanel = MO.Window.Builder.createTableCell(p, o.styleName('Panel'));
   hPanel.vAlign = 'top';
   hPanel.height = '100%';
}

//==========================================================
// <T>创建控件布局。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FUiFramePage_onBuild = function FUiFramePage_onBuild(p){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   if(o._scrollCd != MO.EUiScroll.None){
      var hc = o._hContainer = MO.Window.Builder.appendDiv(h, o.styleName('Container'));
      MO.RUiControl.setStyleScroll(hc, o._scrollCd);
   }else{
      o._hContainer = h;
   }
}

//==========================================================
// <T>改变当前控件的显示大小。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FUiFramePage_oeResize = function FUiFramePage_oeResize(p){
   var o = this;
   var p = o._parent;
   if(p._directionCd == MO.EUiDirection.Horizontal){
      // 横向排布
      //var v = o._hPanel.offsetHeight;
      //o._hContainer.style.height = v + 'px';
   }else if(p._directionCd == MO.EUiDirection.Vertical){
      // 纵向排布
   }else{
      throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param control:FDuiControl 控件
//==========================================================
MO.FUiFramePage_appendChild = function FUiFramePage_appendChild(control){
   var o = this;
   if(control._hPanel){
      o._hContainer.appendChild(control._hPanel);
   }
}

//==========================================================
// <T>移除一个控件。</T>
//
// @method
// @param control:FDuiControl 控件
//==========================================================
MO.FUiFramePage_removeChild = function FUiFramePage_removeChild(control){
   var o = this;
   o._hContainer.removeChild(control._hPanel);
}
