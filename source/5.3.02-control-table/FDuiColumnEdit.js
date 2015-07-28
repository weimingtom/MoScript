with(MO){
   //==========================================================
   // <T>表格编辑列。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FDuiColumnEdit = function FDuiColumnEdit(o){
      o = RClass.inherits(this, o, FDuiColumnEditControl, MPropertyEdit);
      //..........................................................
      // @attribute
      o._cellClass     = FCellEdit;




      //o.hasDropArea    = true;
      //..........................................................
      // @event
      //o.onCellMouseEnter = FDuiColumnEdit_onCellMouseEnter;
      //o.onCellMouseLeave = FDuiColumnEdit_onCellMouseLeave;
      //o.onListClick      = FDuiColumnEdit_onListClick;
      //o.onZoomClick      = RClass.register(o, new AEventClick('onZoomClick'), FDuiColumnEdit_onZoomClick);
      //o.onZoomHover      = RClass.register(o, new AEventMouseEnter('onZoomHover'), FDuiColumnEdit_onZoomHover);
      //o.onZoomLeave      = RClass.register(o, new AEventMouseLeave('onZoomLeave'), FDuiColumnEdit_onZoomLeave);

      return o;
   }
   //==========================================================
   MO.FDuiColumnEdit_onCellMouseEnter = function FDuiColumnEdit_onCellMouseEnter(s, e){
      //if(s.hLovImage){
         //s.hLovImage.style.display = 'block';
      //}
   }
   //==========================================================
   MO.FDuiColumnEdit_onCellMouseLeave = function FDuiColumnEdit_onCellMouseLeave(s, e){
      //if(s.hLovImage){
         //s.hLovImage.style.display = 'none';
      //}
   }
   //==========================================================
   MO.FDuiColumnEdit_onListClick = function FDuiColumnEdit_onListClick(s, e){
      var o = this;
      o.table.__focusCell = s;
      var cvs = s.row.saveRow().toAttributes();
      o.doListView(cvs);
   }

   //==========================================================
   MO.FDuiColumnEdit_onZoomHover = function FDuiColumnEdit_onZoomHover(s, e){
      s.hEdit.style.color='black';
   }

   //==========================================================
   MO.FDuiColumnEdit_onZoomLeave = function FDuiColumnEdit_onZoomLeave(s, e){
      s.hEdit.style.color='blue';
   }

   //==========================================================
   MO.FDuiColumnEdit_onZoomClick = function FDuiColumnEdit_onZoomClick(s, e){
      var o = this;
      // 选择行处理
      o.table.clickRow(s.row);
      // 放大处理
      var r = s.row.saveRow();
      var v = r.get(o.zoomField)
      if(!RString.isEmpty(v)){
         o.doZoom(v);
      }
   }
}
