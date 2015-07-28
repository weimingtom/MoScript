with(MO){
   //==========================================================
   // <T>列表项控件。</T>
   //
   //  hLine<TR>
   // ┌--------------┬-----------------------┐
   // │┌----------┐│┌-------------------┐│
   // ││hIcon<IMG>│││hLabel<SPAN>       ││
   // │└----------┘│└-------------------┘│
   // └--------------┴-----------------------┘
   //
   // @class
   // @author maocy
   // @history 150224
   //==========================================================
   MO.FDuiListViewItem = function FDuiListViewItem(o){
      o = RClass.inherits(this, o, FDuiControl);
      //..........................................................
      // @style
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleNormal    = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover     = RClass.register(o, new AStyle('_styleHover'));
      o._styleSelect    = RClass.register(o, new AStyle('_styleSelect'));
      o._styleForm      = RClass.register(o, new AStyle('_styleForm'));
      o._styleContent   = RClass.register(o, new AStyle('_styleContent'));
      o._styleIconPanel = RClass.register(o, new AStyle('_styleIconPanel'));
      o._styleIcon      = RClass.register(o, new AStyle('_styleIcon'));
      o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
      //..........................................................
      // @attribute
      o._checked        = false;
      o._contentHeight  = 28;
      //..........................................................
      // @html
      o._hPanel         = null;
      o._hBorder        = null;
      o._hForm          = null;
      o._hContentForm   = null;
      o._hContentLine   = null;
      o._hIconPanel     = null;
      o._hIcon          = null;
      o._hLabel         = null;
      //..........................................................
      // @event
      o.onBuildPanel    = FDuiListViewItem_onBuildPanel;
      o.onBuild         = FDuiListViewItem_onBuild;
      o.onEnter         = FDuiListViewItem_onEnter;
      o.onLeave         = FDuiListViewItem_onLeave;
      o.onClick         = RClass.register(o, new AEventClick('onClick'), FDuiListViewItem_onClick);
      o.onDoubleClick   = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FDuiListViewItem_onDoubleClick);
      //..........................................................
      // @method
      o.label           = FDuiListViewItem_label;
      o.setLabel        = FDuiListViewItem_setLabel;
      o.setChecked      = FDuiListViewItem_setChecked;
      // @method
      o.dispose         = FDuiListViewItem_dispose;
      return o;
   }

   //==========================================================
   // <T>建立控件面板。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiListViewItem_onBuildPanel = function FDuiListViewItem_onBuildPanel(p){
      var o = this;
      // 建立编辑控件
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiListViewItem_onBuild = function FDuiListViewItem_onBuild(p){
      var o = this;
      // 建立控件
      o.__base.FDuiControl.onBuild.call(o, p);
      var hPanel = o._hPanel;
      //..........................................................
      // 建立边框
      var hBorder = o._hBorder = RBuilder.appendDiv(hPanel, o.styleName('Normal'));
      var hTable = o._hForm = RBuilder.appendTable(hBorder, o.styleName('Form'));
      var hLine1 = o._hLine1 = RBuilder.appendTableRowCell(hTable)
      var hLine2 = o._hLine2 = RBuilder.appendTableRowCell(hTable)
      hLine2.height = o._contentHeight;
      // 建立内容区域
      var hContentForm = o._hContentForm = RBuilder.appendTable(hLine2, o.styleName('Content'));
      var hContentLine = o._hContentLine = RBuilder.appendTableRow(hContentForm);
      // 建立图标区域
      o._hIconPanel = RBuilder.appendTableCell(hContentLine, o.styleName('IconPanel'))
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), RString.nvl(o._icon, 'tools.select'));
      RHtml.displaySet(o._hIcon, false);
      // 建立文本区域
      o._hLabel = RBuilder.appendTableCell(hContentLine, o.styleName('Label'));
      if(o._label){
         o.setLabel(o._label);
      }
      // 关联事件
      o.attachEvent('onClick', hPanel);
      o.attachEvent('onDoubleClick', hPanel);
   }

   //==========================================================
   // <T>响应鼠标进入事件</T>
   //
   // @method
   //==========================================================
   MO.FDuiListViewItem_onEnter = function FDuiListViewItem_onEnter(){
      var o = this;
      o.__base.FDuiControl.onEnter.call(o);
      o._hBorder.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
   }

   //==========================================================
   // <T>响应鼠标离开事件</T>
   //
   // @method
   //==========================================================
   MO.FDuiListViewItem_onLeave = function FDuiListViewItem_onLeave(){
      var o = this;
      o._hBorder.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
      o.__base.FDuiControl.onLeave.call(o);
   }

   //==========================================================
   // <T>点击事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FDuiListViewItem_onClick = function FDuiListViewItem_onClick(event){
      var o = this;
      if(o._checked){
         o._parent.doDoubleClickItem(o);
      }else{
         o._parent.doClickItem(o);
      }
   }

   //==========================================================
   // <T>双击事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FDuiListViewItem_onDoubleClick = function FDuiListViewItem_onDoubleClick(event){
      var o = this;
      o._parent.doDoubleClickItem(o);
   }

   //==========================================================
   // <T>获得标签。</T>
   //
   // @method
   // @return String 标签内容
   //==========================================================
   MO.FDuiListViewItem_label = function FDuiListViewItem_label(p){
      return this._label;
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @method
   // @param p:value:String 标签内容
   //==========================================================
   MO.FDuiListViewItem_setLabel = function FDuiListViewItem_setLabel(p){
      var o = this;
      o._label = p;
      o._hLabel.innerHTML = RString.nvl(p);
   }

   //==========================================================
   // <T>设置选中状态。</T>
   //
   // @method
   // @param checked:Boolean 是否选中
   //==========================================================
   MO.FDuiListViewItem_setChecked = function FDuiListViewItem_setChecked(checked){
      var o = this;
      o._checked = checked;
      if(o._hIcon){
         o._hIcon.style.display = checked ? 'block' : 'none';
      }else{
         o._hIconPanel.innerHTML = checked ? 'O' : '';
      }
      o._hBorder.className = checked ? o.styleName('Select') : o.styleName('Normal');
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiListViewItem_dispose = function FDuiListViewItem_dispose(){
      var o = this;
      o._hPanel = RHtml.free(o._hPanel);
      o._hBorder = RHtml.free(o._hBorder);
      o._hForm = RHtml.free(o._hForm);
      o._hLine1 = RHtml.free(o._hLine1);
      o._hLine2 = RHtml.free(o._hLine2);
      o._hContentForm = RHtml.free(o._hContentForm);
      o._hContentLine = RHtml.free(o._hContentLine);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hLabel = RHtml.free(o._hLabel);
      o.__base.FDuiControl.dispose.call(o);
   }
}
