//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 150702
//==========================================================
MO.FEaiChartMarketerTable = function FEaiChartMarketerTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetSet('_rank'));
   // @attribute
   o._rankLogoImage        = null;
   o._rankTitleImage       = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   // @attribute
   o._columnLabels         = null;
   o._columnDefines        = null;
   o._columnWidths         = null;
   // @attibute
   o._tableCount           = 0;
   o._units                = null;
   o._lineScroll           = 0;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiChartMarketerTable_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartMarketerTable_onPaintBegin;
   //..........................................................
   // @process
   o.oeUpdate              = MO.FEaiChartMarketerTable_oeUpdate;
   //..........................................................
   // @method
   o.construct             = MO.FEaiChartMarketerTable_construct;
   // @method
   o.setup                 = MO.FEaiChartMarketerTable_setup;
   o.pushUnit              = MO.FEaiChartMarketerTable_pushUnit;
   o.drawRow               = MO.FEaiChartMarketerTable_drawRow;
   // @method
   o.dispose               = MO.FEaiChartMarketerTable_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTable_onImageLoad = function FEaiChartMarketerTable_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTable_onPaintBegin = function FEaiChartMarketerTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   //..........................................................
   // 计算宽度
   var columnCount = o._columnCount;
   var widthDefine = 0;
   for(var i = 0; i < columnCount; i++){
      widthDefine += o._columnDefines[i];
   }
   for(var i = 0; i < columnCount; i++){
      o._columnWidths[i] = (o._columnDefines[i] / widthDefine * drawWidth) - 7;
   }
   //..........................................................
   // 绘制背景
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   //..........................................................
   // 绘制标题
   var titleText = '全球实时投资数据展示中心(中国)';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   //..........................................................
   graphic.setFont(o._rowFontStyle);
   // 绘制前3名
   var tableTop = top + o._rankStart;
   graphic.drawGridImage(o._rankLineImage, left + 6, tableTop + o._rankTitleStart, width - 22, o._rankHeight, o._rankLinePadding);
   graphic.drawImage(o._rankTitleImage, left + (width - 167) * 0.5, tableTop + 3, 167, 40);
   var rankUnit = o._rank;
   if(rankUnit){
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankUnit.count();
      tableTop += 90;
      for(var i = 0; i < count; i++) {
         var unit = rankUnit.at(i);
         o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
   //..........................................................
   // 绘制表头
   var headText = '';
   var headTextWidth = 0;
   var headLeft = drawLeft;
   var headTop = top + o._headStart;
   var headTextTop = headTop + o._headTextTop;
   for(var i = 0; i < columnCount; i++){
      var headText = o._columnLabels[i];
      var headTextWidth = graphic.textWidth(headText);
      graphic.fillRectangle(headLeft, headTop, o._columnWidths[i] - 4, o._headHeight, '#122A46');
      graphic.drawText(headText, headLeft + (o._columnWidths[i] - headTextWidth - 4) * 0.5, headTextTop, '#00B2F2');
      headLeft += o._columnWidths[i];
   }
   //..........................................................
   // 绘制即时列表
   var entities = o._units;
   if(!entities.isEmpty()){
      var tableTop = top + o._rowStart;
      var tableText = '';
      var tableTextWidth = 0;
      graphic.clip(drawLeft, tableTop, drawWidth - 38, o._rowHeight * (o._tableCount - 1));
      tableTop += 24;
      var count = entities.count();
      for(var i = 0; i < count; i++) {
         var unit = entities.at(i);
         o.drawRow(graphic, unit, false, i, drawLeft, tableTop + o._rowHeight * i + o._lineScroll, drawWidth);
      }
   }
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTable_oeUpdate = function FEaiChartMarketerTable_oeUpdate(event){
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if(event.isBefore()){
      // 是否要刷新
      if(o._lineScroll < 0){
         o._lineScroll += 1;
         // 小于一行，直接显示
         if(o._lineScroll < -o._rowHeight){
            o._lineScroll = 0;
         }
         // 删除多余的数据
         if(o._lineScroll >= 0){
            var entities = o._units;
            if(entities.count() > o._tableCount){
               entities.pop();
            }
            o._lineScroll = 0;
         }
         o._gridControl.dirty();
         o.dirty();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTable_construct = function FEaiChartMarketerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 创建属性
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
   o._columnLabels = new Array('时间', '公司', '理财师', '城市', '用户-手机', '投资额(元)');
   //if(MO.Runtime.isPlatformMobile()){
      //o._columnDefines = new Array(130, 130, 180, 186);
   //}else{
      o._columnDefines = new Array(110, 120, 120, 100, 160, 120);
   //}
   o._columnWidths = new Array();
   o._columnCount = o._columnLabels.length;
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTable_setup = function FEaiChartMarketerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 创建图片
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/live/tank-title.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片
   var image = o._rank1Image = imageConsole.load('{eai.resource}/live/1.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank2Image = imageConsole.load('{eai.resource}/live/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank3Image = imageConsole.load('{eai.resource}/live/3.png');
   image.addLoadListener(o, o.onImageLoad);
   //..........................................................
   var font = new MO.SUiFont();
   font.font = 'Microsoft YaHei';
   font.size = 25;
   font.color = '#54F0FF';
   var grid = o._gridControl = MO.Class.create(MO.FGuiGridControl);
   grid.setLocation(50, 450);
   grid.setSize(800, 500);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('recordDate');
   column.setLabel('时间');
   column.setDataName('record_date');
   column.font().assign(font);
   column.setWidth(110);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('departmentLabel');
   column.setLabel('公司');
   column.setDataName('department_label');
   column.font().assign(font);
   column.setWidth(120);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerLabel');
   column.setLabel('理财师');
   column.setDataName('marketer_label');
   column.font().assign(font);
   column.setWidth(120);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCard');
   column.setLabel('城市');
   column.setDataName('customer_card');
   column.font().assign(font);
   column.setWidth(100);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerInfo');
   column.setLabel('用户-手机');
   column.setDataName('customer_phone');
   column.font().assign(font);
   column.setWidth(160);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerAmount');
   column.setLabel('投资额(元)');
   column.setDataName('customer_amount');
   column.font().assign(font);
   column.setWidth(120);
   grid.pushColumn(column);
   o.push(grid);
   //..........................................................
   // 设置数据
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = -5;
      o._rankHeight = 249;
      o._rankRowHeight = 50;
      o._rankIconStart = 22;
      o._rankTextStart = 8;
      o._rankRowUp = 36;
      o._rankRowDown = 68;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
      o._rowHeight = 46;
   }else{
      o._tableCount = 19;
      o._rankStart = 110;
      o._rankTitleStart = 0;
      o._rankHeight = 219;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankTextStart = 0;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
      o._rowHeight = 36;
   }
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiChartMarketerTable_pushUnit = function FEaiChartMarketerTable_pushUnit(unit){
   var o = this;
   // 检查参数
   if(!unit){
      return null;
   }
   // 放入队列
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   // 大于个数从尾部弹出
   if(entities.count() > o._tableCount){
      entities.pop();
   }
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTable_drawRow = function FEaiChartMarketerTable_drawRow(graphic, unit, flag, index, x, y, width){
   var o = this;
   var widths = o._columnWidths;
   var fontColor = null;
   if(flag){
      fontColor = '#E5BD1D';
   }else{
      fontColor = '#59FDE9';
   }
   // 绘制底框
   if(flag){
      var columnWidth = widths[0];
      var imageX = x + (columnWidth * 0.5) - 23;
      var imageY = y - o._rankIconStart;
      if((index == 0) && o._rank1Image.testReady()){
         graphic.drawImage(o._rank1Image, imageX - 6, imageY - 28, 58, 65);
      }
      if((index == 1) && o._rank2Image.testReady()){
         graphic.drawImage(o._rank2Image, imageX, imageY, 46, 37);
      }
      if((index == 2) && o._rank3Image.testReady()){
         graphic.drawImage(o._rank3Image, imageX, imageY, 46, 37);
      }
   }
   y += o._rankTextStart;
   // 绘制时间
   var textWidth = 0;
   if(!flag){
      o._currentDate.parse(unit.recordDate());
      var text = o._currentDate.format('HH24:MI:SS');
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, x + widths[0] * 0.5 - textWidth * 0.5, y, fontColor);
   }
   // 绘制公司
   x += widths[0];
   text = unit.departmentLabel();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[1] * 0.5 - textWidth * 0.5, y, fontColor);
   // 绘制理财师
   x += widths[1];
   text = unit.marketerLabel();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[2] * 0.5 - textWidth * 0.5, y, fontColor);
   // 绘制城市
   x += widths[2];
   var cityResource = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(unit.customerCard());
   text = '';
   if(cityResource){
      text = cityResource.label();
   }
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[3] * 0.5 - textWidth * 0.5, y, fontColor);
   // 绘制客户
   x += widths[3];
   text = unit.customerLabel() + ' - ' + unit.customerPhone();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[4] * 0.5 - textWidth * 0.5, y, fontColor);
   // 绘制颜色
   x += widths[4];
   var amount = MO.Lang.Float.format(unit.customerActionAmount(), null, null, 2, '0');
   var amountRight = x + widths[5] - 15;
   if(unit.customerActionCd() == 1){
      if (amount.length > 7) {
         var highColor = null;
         if(amount.length > 9){
            highColor = '#FDEF01';
         }else{
            highColor = '#EB6C03';
         }
         var high = amount.substring(0, amount.length - 7);
         var low = amount.substring(amount.length - 7, amount.length);
         var highWidth = graphic.textWidth(high);
         var lowWidth = graphic.textWidth(low);
         graphic.drawText(high, amountRight - lowWidth - highWidth, y, highColor);
         graphic.drawText(low, amountRight - lowWidth, y, '#59FDE9');
      }else{
         textWidth = graphic.textWidth(amount);
         graphic.drawText(amount, amountRight - textWidth, y, fontColor);
      }
   }else if(unit.customerActionCd() == 2){
      var text = '-' + amount;
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, amountRight - textWidth, y, '#FF0000');
   }else{
      throw new TError('Invalid action code.');
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTable_dispose = function FEaiChartMarketerTable_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
