//==========================================================
// <T>界面控件。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridControl = function FGuiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl, MO.MUiGridControl);
   //..........................................................
   // @attribute
   o._rowScroll      = 0;
   o._rowScrollSpeed = 1;
   //..........................................................
   // @event
   o.onPaintBegin = MO.FGuiGridControl_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FGuiGridControl_construct;
   // @method
   o.dispose      = MO.FGuiGridControl_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiGridControl_onPaintBegin = function FGuiGridControl_onPaintBegin(event){
   var o = this;
   var padding = o._padding;
   // 绘制边框
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left + padding.left;
   var top = rectangle.top + padding.top;
   var bottom = rectangle.bottom() - padding.bottom;
   var width = rectangle.width - padding.left - padding.right;
   var height = rectangle.height - padding.top - padding.bottom;
   //graphic.drawRectangle(left, top, width, height, '#FF0000', 1);
   var drawX = left;
   var drawY = top;
   // 计算列总长
   var gridWidth = width;
   var columnWidthTotal = 0;
   var columns = o._columns;
   var columnCount = columns.count();
   for(var i = 0; i < columnCount; i++){
      var column = columns.at(i);
      columnWidthTotal += column.width();
   }
   //..........................................................
   // 绘制表头
   if(o._displayHead){
      var columnX = drawX;
      var columnY = top;
      var headTextTop = columnY + 0;
      var headHeight = o._headHeight;
      for(var i = 0; i < columnCount; i++){
         var column = columns.at(i);
         var columnWidth = gridWidth * column.width() / columnWidthTotal;
         column.draw(graphic, columnX, columnY, columnWidth, headHeight);
         columnX += columnWidth;
      }
      drawY += headHeight;
   }
   //..........................................................
   // 计算可绘制行数
   var rowsHeight = bottom - drawY;
   var rowHeight = o._rowHeight;
   graphic.clip(drawX, drawY, gridWidth, rowsHeight);
   //..........................................................
   // 绘制数据
   var rows = o._rows;
   var rowCount = rows.count();
   drawY += o._rowScroll;
   for(var rowIndex = 0; rowIndex < rowCount; rowIndex++){
      var columnX = drawX;
      if(drawY > -rowHeight){
         var row = rows.at(rowIndex);
         for(var i = 0; i < columnCount; i++){
            var column = columns.at(i);
            var dataName = column.dataName();
            var columnWidth = gridWidth * column.width() / columnWidthTotal;
            var cell = row.cells().get(dataName);
            cell.draw(graphic, columnX, drawY, columnWidth, rowHeight);
            columnX += columnWidth;
         }
      }
      drawY += rowHeight;
      if(drawY > bottom){
         break;
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridControl_construct = function FGuiGridControl_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o.__base.MUiGridControl.construct.call(o);
   // 设置变量
   o._rowClass = MO.FGuiGridRow;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridControl_dispose = function FGuiGridControl_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridControl.dispose.call(o);
   o.__base.FGuiControl.dispose.call(o);
}
