//==========================================================
// <T>数字编辑框。</T>
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬---------------------------------┬--------------------┐
// │hChangePanel<TD> │ hInputPanel<TD>                 │ hAdjustPanel<TD>   │hValueLine<TR>
// │                 │                                 │ hAdjustForm<TABLE> │
// │hChangeIcon<IMG> │┌-----------------------------┐│┌----------------┐│
// │                 ││                             │││hUpPanel<TD>    ││
// │                 ││                             │││hUpIcon<IMG>    ││
// │                 ││hInput<INPUT>                ││├----------------┤│
// │                 ││                             │││hDownPanel<TD>  ││
// │                 ││                             │││hDownIcon<IMG>  ││
// │                 │└-----------------------------┘│└----------------┘│
// └-----------------┴---------------------------------┴--------------------┘
//
// @class
// @author maocy
// @version 150131
//==========================================================
MO.FDuiNumber = function FDuiNumber(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MListenerDataChanged, MO.MUiPropertyNumber);
   //..........................................................
   // @property
   o._inputSize        = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   //..........................................................
   // @style
   o._styleValuePanel  = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInput       = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._styleAdjustForm  = MO.Class.register(o, new MO.AStyle('_styleAdjustForm'));
   o._styleUpPanel     = MO.Class.register(o, new MO.AStyle('_styleUpPanel'));
   o._styleDownPanel   = MO.Class.register(o, new MO.AStyle('_styleDownPanel'));
   //..........................................................
   // @attribute
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   //..........................................................
   // @html
   o._hInput           = null;
   o._iconUp           = null;
   o._iconDown         = null;
   //..........................................................
   // @event
   o.onBuildEditValue  = FDuiNumber_onBuildEditValue;
   // @event
   o.onInputKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiNumber_onInputKeyPress);
   o.onInputChanged    = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), MO.FDuiNumber_onInputChanged);
   //..........................................................
   // @method
   o.construct         = MO.FDuiNumber_construct;
   // @method
   o.formatDisplay     = MO.FDuiNumber_formatDisplay;
   o.formatValue       = MO.FDuiNumber_formatValue;
   // @method
   o.get               = MO.FDuiNumber_get;
   o.set               = MO.FDuiNumber_set;



   //o.onKeyDown    = MO.Class.register(o, new MO.AEventKeyDown('onKeyDown'));
   //o.onKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onKeyPress'));
   //o.onKeyUp      = MO.Class.register(o, new MO.AEventKeyUp('onKeyUp'));
   //o.stUnit        = MO.Class.register(o, new MO.AStyle('Unit'));
   //..........................................................
   // @event
   //o.onDataKeyDown = FDuiNumber_onDataKeyDown;
   //..........................................................
   // @method
   //o.setText       = FDuiNumber_setText;
   //o.validText     = FDuiNumber_validText;
   //o.findEditor    = FDuiNumber_findEditor;
   //o.drop          = FDuiNumber_drop;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiNumber_onBuildEditValue = function FDuiNumber_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立输入栏
   var hip = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hip, o.styleName('Input'));
   //o.attachEvent('onEditFocus', he, o.onEditFocus);
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   //o.attachEvent('onEditBlur', he, o.onEditBlur);
   //o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp); 
   // 设置大小
   //MO.Window.Html.setSize(he, o._inputSize);
   // 设置可以输入的最大长度
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   //..........................................................
   // 建立调整栏
   var hap = o._hAdjustPanel = MO.Window.Builder.appendTableCell(hl);
   hap.style.borderLeft = '1px solid #666666';
   hap.width = 12;
   var haf = o.hAdjustForm = MO.Window.Builder.appendTable(hap, o.styleName('AdjustForm'));
   // 建立上按键
   var hc = MO.Window.Builder.appendTableRowCell(haf);
   hc.className = o.styleName('UpPanel');
   var hi = o._hUpIcon = MO.Window.Builder.appendIcon(hc, null, 'control.number.up');
   hi.align = 'center';
   //o.attachEvent('onUpMouseDown', hi);
   // 建立下按键
   var hc = MO.Window.Builder.appendTableRowCell(haf);
   hc.className = o.styleName('DownPanel');
   var hi = o._hDownIcon = MO.Window.Builder.appendIcon(hc, null, 'control.number.down');
   //o.attachEvent('onDownMouseDown', hi);
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiNumber_onInputKeyPress = function FDuiNumber_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   // 检查输入字符是否为浮点数，否则给清除输入内容
   if(!MO.RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}

//==========================================================
// <T>编辑控件中数据修改处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiNumber_onInputChanged = function FDuiNumber_onInputChanged(p){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
   // 检查内容是否变更
   //var v = o._hInput.value;
   //if(o._dataDisplay != v){
   //   o.processDataChangedListener(o);
   //}
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiNumber_construct = function FDuiNumber_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   // 设置属性
   o._editSize.set(100, 20);
   o._inputSize = new SSize2(80, 0);
}

//==========================================================
// <T>格式化显示内容。</T>
//
// @method
// @param p:value:String 数据
// @return 内容
//==========================================================
MO.FDuiNumber_formatDisplay = function FDuiNumber_formatDisplay(p){
   var o = this;
   var r = o._dataDisplay = MO.Lang.Float.format(p, 0, null, o._valuePrecision, null);
   return r;
}

//==========================================================
// <T>格式化数据内容。</T>
//
// @method
// @param p:value:String 内容
// @return 数据
//==========================================================
MO.FDuiNumber_formatValue = function FDuiNumber_formatValue(p){
   return p;
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiNumber_get = function FDuiNumber_get(p){
   var o = this;
   var r = o.__base.FDuiEditControl.get.call(o, p);
   // 获得显示
   var h = o._hInput;
   if(h){
      r = o.formatValue(h.value);
   }
   return r;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
MO.FDuiNumber_set = function FDuiNumber_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   // 获得内容
   var v = MO.Lang.String.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   // 设置显示
   var h = o._hInput;
   if(h){
      h.value = o.formatDisplay(p);
   }
   // 设置修改状态
   o.changeSet(false);
}













//==========================================================
// <T>数据区按键按下事件。</T>
//
// @method
// @param s:sender:FControl 控件对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiNumber_onDataKeyDown = function FDuiNumber_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   // 大小写限制
   if(o.editCase){
      MO.RKey.fixCase(e, o.editCase);
   }
   // 自动提示
   //if(o._editable){
   //   if(o.editComplete){
   //      if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
   //         var ed = o.findEditor();
   //         if(ed){
   //            ed.onEditKeyDown(s, e);
   //         }
   //      }
   //   }
   //}
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param t:text:String 内容
//==========================================================
MO.FDuiNumber_setText = function FDuiNumber_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}

//==========================================================
// <T>校验内容。</T>
//
// @method
// @param t:text:String 内容
// @return 校验结果
//==========================================================
MO.FDuiNumber_validText = function FDuiNumber_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
   if(!r){
      // 最小长度的校验
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      // 最大长度的校验
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}

//==========================================================
// <T>查找编辑器。</T>
//
// @method
// @return 编辑器
//==========================================================
MO.FDuiNumber_findEditor = function FDuiNumber_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumberConsole).focus(o, FDuiNumberEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}

//==========================================================
// <T>下拉处理。</T>
//
// @method
//==========================================================
MO.FDuiNumber_drop = function FDuiNumber_drop(){
   var o = this;
   var de = o.findEditor();
   if(de){
      var t = o.reget();
      if(t.length > 0){
         if(o.finded != t){
            if(de.source != o){
               de.linkControl(o);
            }
            de.search(t);
         }
         o.finded = t;
      }
   }
}