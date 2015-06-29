MO.EEaiChapter = new function EEaiChapter(){
   var o = this;
   o.Loading = 'loading';
   o.Login   = 'login';
   o.Scene   = 'scene';
   o.Chart   = 'chart';
   return o;
}
MO.EEaiConstant = new function EEaiConstant(){
   var o = this;
   o.ServiceHost = "eai.logic.service";
   return o;
}
MO.EEaiRate = new function EEaiRate(){
   var o = this;
   o.Line = 0;
   o.Map  = 1;
   return o;
}
MO.EEaiScene = new function EEaiScene(){
   var o = this;
   o.Group           = 'group';
   o.GroupReport     = 'group.report';
   o.Company         = 'company';
   o.Country         = 'country';
   o.ChartHistory    = 'chart.history';
   o.ChartIndustry   = 'chart.industry';
   o.ChartInvestment = 'chart.investment';
   o.ChartCustomer   = 'chart.customer';
   o.ChartStatistics = 'chart.statistics';
   return o;
}
MO.Eai = new function FEai(){
   var o = this;
   o.Application = null;
   o.Canvas      = null;
   return o;
}
MO.FEaiEntity = function FEaiEntity(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   return o;
}
with(MO){
   MO.FEaiTable = function FEaiTable(o){
      o = RClass.inherits(this, o, FObject);
      o._headLineCount = 0;
      o._hTable        = null
      o.setDataCount   = FEaiCityEntity_setDataCount;
      o.dataRow        = FEaiCityEntity_dataRow;
      return o;
   }
   MO.FEaiCityEntity_setDataCount = function FEaiCityEntity_setDataCount(count){
      var o = this;
      var headLineCount = o._headLineCount;
      var total = headLineCount + count;
      var rowCount = o._hTable.rows.length;
      for(var i = rowCount; i < total; i++){
         var hRow = RBuilder.appendTableRow(o._hTable);
         hRow.className = 'Investment_DataGrid_Row';
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.className = 'Investment_DataGrid_Cell';
         hCell.align = 'center';
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.className = 'Investment_DataGrid_Cell';
         hCell.align = 'center';
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.className = 'Investment_DataGrid_Cell';
         hCell.align = 'center';
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.className = 'Investment_DataGrid_Cell';
         hCell.align = 'right';
      }
      var rowCount = o._hTable.rows.length;
      for(var i = headLineCount; i < rowCount; i++){
         var hRow = o._hTable.rows[i];
         hRow.style.display = (i - headLineCount < count) ? null : 'none';
      }
   }
   MO.FEaiCityEntity_dataRow = function FEaiCityEntity_dataRow(index){
      var o = this;
      var rowIndex = o._headLineCount + index;
      return o._hTable.rows[rowIndex];
  }
}
