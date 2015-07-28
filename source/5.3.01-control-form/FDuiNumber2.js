with(MO){
   //==========================================================
   // <T>文本编辑框。</T>
   //
   // @class
   // @author maocy
   // @version 150102
   //==========================================================
   MO.FDuiNumber2 = function FDuiNumber2(o){
      o = RClass.inherits(this, o, FDuiEditControl, MListenerDataChanged);
      //..........................................................
      // @property
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      //..........................................................
      // @style
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      //..........................................................
      // @attribute
      o._innerOriginValue = null;
      o._innerDataValue   = null;
      //..........................................................
      // @html
      o._hInput          = null;
      //..........................................................
      // @event
      o.onBuildEditInput  = FDuiNumber3_onBuildEditInput;
      o.onBuildEditValue = FDuiNumber2_onBuildEditValue;
      // @event
      o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FDuiNumber2_onInputKeyPress);
      o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FDuiNumber2_onInputChanged);
      //..........................................................
      // @process
      //o.oeDataLoad       = FDuiNumber2_oeDataLoad;
      //o.oeDataSave       = FDuiNumber2_oeDataSave;
      //..........................................................
      // @method
      o.construct        = FDuiNumber2_construct;
      // @method
      o.get              = FDuiNumber2_get;
      o.set              = FDuiNumber2_set;








      //o.onKeyDown    = RClass.register(o, new AEventKeyDown('onKeyDown'));
      //o.onKeyPress   = RClass.register(o, new AEventKeyPress('onKeyPress'));
      //o.onKeyUp      = RClass.register(o, new AEventKeyUp('onKeyUp'));
      //o.stUnit        = RClass.register(o, new AStyle('Unit'));
      //..........................................................
      // @attribute
      //o.borderStyle   = EUiBorder.Round;
      //..........................................................
      // @html
      //o.hUnit         = null;
      //..........................................................
      // @event
      //o.onDataKeyDown = FDuiNumber2_onDataKeyDown;
      //..........................................................
      // @method
      //o.formatValue   = FDuiNumber2_formatValue;
      //o.setText       = FDuiNumber2_setText;
      //o.validText     = FDuiNumber2_validText;
      //o.findEditor    = FDuiNumber2_findEditor;
      //o.drop          = FDuiNumber2_drop;
      //o.link          = FDuiNumber2_link;
      //o.clone         = FDuiNumber2_clone;
      return o;
   }

   //==========================================================
   // <T>数据源从加载数据处理。</T>
   //
   // @method
   // @param p:dataSource:FDataSource 数据源
   //==========================================================
   MO.FDuiNumber2_oeDataLoad = function FDuiNumber2_oeDataLoad(p){
      var o = this;
      alert(p);
      return EEventStatus.Stop;
   }

   //==========================================================
   // <T>存储数据到数据源处理。</T>
   //
   // @method
   // @param p:dataSource:FDataSource 数据源
   //==========================================================
   MO.FDuiNumber2_oeDataSave = function FDuiNumber2_oeDataSave(p){
      var o = this;
      return EEventStatus.Stop;
   }

   //==========================================================
   // <T>建立编辑器输入。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   // @param h:html:HtmlTag 页面元素
   //==========================================================
   MO.FDuiNumber3_onBuildEditInput = function FDuiNumber3_onBuildEditInput(p, h){
      var o = this;
      o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
      o.attachEvent('onInputChanged', h, o.onInputChanged);
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FDuiNumber2_onBuildEditValue = function FDuiNumber2_onBuildEditValue(event){
      var o = this;
      var h = o._hValuePanel;
      h.className = o.styleName('InputPanel');
      //..........................................................
      // 建立改变栏
      var hf = o._hInputForm = RBuilder.appendTable(h);
      var hr = RBuilder.appendTableRow(hf);
      //..........................................................
      // 建立输入框1
      var hCell = RBuilder.appendTableCell(hr);
      hCell.style.borderRight = '1px solid #666666';
      var hInput = o._hInput1 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(event, hInput)
      //..........................................................
      // 建立输入框2
      var hCell = RBuilder.appendTableCell(hr);
      hCell.style.borderLeft = '1px solid #999999';
      var hInput = o._hInput2 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(event, hInput)

      //htb.style.tableLayout = 'fixed';
      //var hr = o.hEdit = htb.insertRow();
      // 建立修改标志
      //o.onBuildChange(hr.insertCell());
      // 建立编辑控件
      //var hep = hr.insertCell();
      //var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
      // 设置大小
      //RHtml.setSize(he, o._inputSize);
      // 设置可以输入的最大长度
      //if(o._editLength){
         //he.maxLength = o._editLength;
      //}
   }

   //==========================================================
   // <T>编辑控件中键盘按下处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.FDuiNumber2_onInputKeyPress = function FDuiNumber2_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      // 允许输入百分号(%)
      //if(he.shiftKey && 53 == kc){
      //   return;
      //}
      // 检查输入字符是否为数字，否则给清除输入内容
      if(!EKeyCode.floatCodes[c]){
         p.cancel();
      }
   }

   //==========================================================
   // <T>编辑控件中数据修改处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.FDuiNumber2_onInputChanged = function FDuiNumber2_onInputChanged(p){
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
   MO.FDuiNumber2_construct = function FDuiNumber2_construct(){
      var o = this;
      o.__base.FDuiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
      o._innerOriginValue = new SPoint2();
      o._innerDataValue = new SPoint2();
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @param value:Obejct 内容
   // @return String 数据
   //==========================================================
   MO.FDuiNumber2_get = function FDuiNumber2_get(value){
      var o = this;
      o.__base.FDuiEditControl.get.call(o, value);
      var dataValue = o._innerDataValue;
      // 获得数据1
      var hInput = o._hInput1;
      if(hInput){
         dataValue.x = RFloat.parse(hInput.value);
      }
      // 获得数据2
      var hInput = o._hInput2;
      if(hInput){
         dataValue.y = RFloat.parse(hInput.value);
      }
      return dataValue;
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @method
   // @param value:Object 数据
   //==========================================================
   MO.FDuiNumber2_set = function FDuiNumber2_set(value){
      var o = this;
      o.__base.FDuiEditControl.set.call(o, value);
      // 设置数据
      var originValue = o._innerOriginValue;
      var vd = o._innerDataValue;
      if(arguments.length == 1){
         var value = arguments[0];
         if(value.constructor == SPoint2){
            originValue.assign(value);
            vd.assign(value);
         }else if(value.constructor == SSize2){
            originValue.set(value.width, value.height);
            vd.set(value.width, value.height);
         }else{
            throw new TError('Invalid value format.');
         }
      }else if(arguments.length == 2){
         originValue.set(arguments[0], arguments[1]);
         vd.assign(originValue);
      }else{
         throw new TError('Invalid value format.');
      }
      // 设置数据1
      var hInput = o._hInput1;
      if(hInput){
         hInput.value = RFloat.format(vd.x, 0, null, 2, null);
      }
      // 设置数据2
      var hInput = o._hInput2;
      if(hInput){
         hInput.value = RFloat.format(vd.y, 0, null, 2, null);
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
   MO.FDuiNumber2_onDataKeyDown = function FDuiNumber2_onDataKeyDown(s, e){
      var o = this;
      o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
      // 大小写限制
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
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
   // <T>格式化数据。</T>
   //
   // @method
   // @param v:value:String 显示内容
   //==========================================================
   MO.FDuiNumber2_formatValue = function FDuiNumber2_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }

   //==========================================================
   // <T>设置内容。</T>
   //
   // @method
   // @param t:text:String 内容
   //==========================================================
   MO.FDuiNumber2_setText = function FDuiNumber2_setText(t){
      var o = this;
      if(!o.hEdit){
         return;
      }
      if('U'== o.editCase){
         o.hEdit.value = RString.toUpper(t);
      }else if('L'== o.editCase){
            o.hEdit.value = RString.toLower(t);
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
   MO.FDuiNumber2_validText = function FDuiNumber2_validText(t){
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
   MO.FDuiNumber2_findEditor = function FDuiNumber2_findEditor(){
      var o = this;
      if(o.editComplete){
         var de = o.editor;
         if(!de){
            o.dsControl = o.topControl(MDataset);
            if(o.dsControl){
               de = o.editor = RConsole.find(FDuiNumber2Console).focus(o, FDuiNumber2Editor);
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
   MO.FDuiNumber2_drop = function FDuiNumber2_drop(){
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

   //==========================================================
   //<T>下拉处理。</T>
   //
   //@method
   //==========================================================
   MO.FDuiNumber2_clone = function FDuiNumber2_clone(){
      var o = this;
      var r = o._class.newInstance();
      GHtml_clone(r, o.hPanel);
      return r;
   }

   //==========================================================
   //<T>下拉处理。</T>
   //
   //@method
   //==========================================================
   MO.FDuiNumber2_link = function FDuiNumber2_link(){
      var o = this;
      
   }
}
