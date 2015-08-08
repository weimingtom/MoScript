//==========================================================
// <T>场景渲染页面。</T>
//
// @author maocy
// @history 150216
//==========================================================
MO.FEditorDsListListProperty = function FEditorDsListListProperty(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   //..........................................................
   // @attribute
   o._activeFrame   = null;
   o._activeControl = null;
   //..........................................................
   // @event
   o.onBuilded      = MO.FEditorDsListListProperty_onBuilded;
   o.onDataChanged  = MO.FEditorDsListListProperty_onDataChanged;
   //..........................................................
   // @method
   o.construct      = MO.FEditorDsListListProperty_construct;
   // @method
   o.loadObject     = MO.FEditorDsListListProperty_loadObject;
   // @method
   o.dispose        = MO.FEditorDsListListProperty_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsListListProperty_onBuilded = function FEditorDsListListProperty_onBuilded(event){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, event);
   // 关联事件
   //o._controlSize.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsListListProperty_onDataChanged = function FEditorDsListListProperty_onDataChanged(event){
   var o  = this;
   o.__base.FDuiForm.onDataChanged.call(o, event);
   var frame = o._activeFrame;
   var control = o._activeControl;
   // 设置组件属性
   var size = o._controlSize.get();
   control.size().set(size.x, size.y);
   frame.build();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListListProperty_construct = function FEditorDsListListProperty_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiForm.construct.call(o);
}

//==========================================================
// <T>加载页面控件信息。</T>
//
// @method
// @param frame:FGuiFrame 界面
// @param control:FGuiControl 控件
//==========================================================
MO.FEditorDsListListProperty_loadObject = function FEditorDsListListProperty_loadObject(frame, control){
   var o = this;
   o.__base.FDuiForm.loadObject.call(o, frame, control);
   // 设置属性
   o._activeFrame = frame;
   o._activeControl = control;
   // 设置控件属性
   var location = control.location();
   o._controlLocation.set(location);
   var size = control.size();
   o._controlSize.set(size);
   // 设置背景属性
   o._controlForeColor.set(control.foreColor());
   o._controlBackColor.set(control.backColor());
   o._controlBackResource.set(control.backResource());
   o._controlBackGrid.set(control.backGrid());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListListProperty_dispose = function FEditorDsListListProperty_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiForm.dispose.call(o);
}
