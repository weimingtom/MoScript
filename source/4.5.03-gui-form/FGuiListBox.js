//==========================================================
// <T>列表控件。</T>
//
// @class
// @author 孙鹏
// @version 151105
//==========================================================
MO.FGuiListBox = function FGuiListBox(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._gap            = MO.Class.register(o, new MO.AGetSet('_gap'), 0);
   o._items          = MO.Class.register(o, new MO.AGetSet('_items'));
   // @attribute
   o._itemRectangle  = null;
   //..........................................................
   // @event
   o.onPaintBegin    = MO.FGuiListBox_onPaintBegin;
   //..........................................................
   // @method
   o.construct       = MO.FGuiListBox_construct;
   // @method
   o.dispose         = MO.FGuiListBox_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiListBox_onPaintBegin = function FGuiListBox_onPaintBegin(event) {
   var o = this;
   var rectangle = event.rectangle;
   var graphic = event.graphic;
   var padding = o._padding;
   var left = rectangle.left + padding.left;
   var top = rectangle.top + padding.top;
   var bottom = rectangle.bottom() - padding.bottom;
   var width = rectangle.width - padding.left - padding.right;
   var height = rectangle.height - padding.top - padding.bottom;

   var itemRect = o._itemRectangle;
   var itemDrawX = left;
   var itemDrawY = top;
   var itemWidth = 0;
   var itemHeight = 0;

   var items = o._items;
   var itemCount = items.count();
   var gap = o._gap;
   for (var i = 0; i < itemCount; i++) {
      var item = items.at(i);
      itemWidth = item.width() > rectangle.width ? rectangle.width : item.width();
      itemHeight = item.height();
      itemRect.set(itemDrawX, itemDrawY, itemWidth, itemHeight);
      item.draw(graphic, itemRect);
      itemDrawY += itemHeight + gap;
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiListBox_construct = function FGuiListBox_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 设置变量
   o._items = new MO.TObjects();
   o._itemRectangle = new MO.SRectangle();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiListBox_dispose = function FGuiListBox_dispose() {
   var o = this;
   o._items = MO.Lang.Object.dispose(o._items);
   o._itemRectangle = MO.Lang.Object.dispose(o._itemRectangle);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
