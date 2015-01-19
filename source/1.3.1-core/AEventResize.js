﻿//==========================================================
// <T>尺寸改变事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventResize(n){
   var o = this;
   AEvent(o, n, 'resize', 'onresize');
   //..........................................................
   // @html
   o._hSource = null;
   //..........................................................
   // @atribute
   o._x       = null;
   o._y       = null;
   //..........................................................
   // @method
   o.attach   = AEventResize_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
function AEventResize_attach(p){
   var o = this;
   o._x = p.x;
   o._y = p.y;
}
