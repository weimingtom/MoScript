//==========================================================
// <T>资源菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsResourceMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @attribute
   o._controlImportPicture = null;
   o._controlImportMesh    = null;
   o._controlDelete        = null;
   o._controlShareOpen     = null;
   o._controlShareClose    = null;
   //..........................................................
   // @event
   o.onImportPictureClick  = FDsResourceMenuBar_onImportPictureClick;
   o.onImportMeshClick     = FDsResourceMenuBar_onImportMeshClick;
   o.onDeleteLoad          = FDsResourceMenuBar_onDeleteLoad;
   o.onDeleteExecute       = FDsResourceMenuBar_onDeleteExecute;
   o.onDeleteClick         = FDsResourceMenuBar_onDeleteClick;
   o.onShareLoad           = FDsResourceMenuBar_onShareLoad;
   o.onShareClick          = FDsResourceMenuBar_onShareClick;
   //..........................................................
   // @method
   o.construct             = FDsResourceMenuBar_construct;
   // @method
   o.dispose               = FDsResourceMenuBar_dispose;
   return o;
}

//==========================================================
// <T>导入模型按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsResourceMenuBar_onImportPictureClick(p){
   var o = this;
   // 获得选中节点
   var frameSet = o._workspace._activeFrameSet;
   var catalog = frameSet._catalogContent;
   var node = catalog.focusNode();
   var nodeGuid = null;
   var nodeLabel = null;
   if(node){
      nodeGuid = node.guid();
      nodeLabel = node.label();
   }
   // 弹出内容
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceImportDialog);
   dialog._frameSet = o._frameSet;
   dialog._workspace = o._workspace;
   dialog._nodeGuid = nodeGuid;
   dialog.setNodeLabel(nodeLabel);
   dialog.switchMode('picture');
   dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>导入模型按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsResourceMenuBar_onImportMeshClick(p){
   var o = this;
   // 获得选中节点
   var frameSet = o._workspace._activeFrameSet;
   var catalog = frameSet._catalogContent;
   var node = catalog.focusNode();
   var nodeGuid = null;
   var nodeLabel = null;
   if(node){
      nodeGuid = node.guid();
      nodeLabel = node.label();
   }
   // 弹出内容
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceImportDialog);
   dialog._frameSet = o._frameSet;
   dialog._workspace = o._workspace;
   dialog._nodeGuid = nodeGuid;
   dialog.setNodeLabel(nodeLabel);
   dialog.switchMode('mesh');
   dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>更新按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourceMenuBar_onDeleteLoad(event){
   var o = this;
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
   RWindow.enable();
}

//==========================================================
// <T>删除按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourceMenuBar_onDeleteExecute(event){
   var o = this;
   var item = o._frameSet._listContent._activeItem;
   var typeCd = item._typeCd;
   var guid = item._guid;
   RWindow.disable();
   // 发送数据请求
   var connection = RConsole.find(FDrResourceConsole).doDelete(typeCd, guid);
   connection.addLoadListener(o, o.onDeleteLoad);
}

//==========================================================
// <T>删除按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourceMenuBar_onDeleteClick(event){
   var o = this;
   var item = o._frameSet._listContent._activeItem;
   if(!item){
      return alert('请选中后再点击删除');
   }
   // 删除确认窗口
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前资源？');
   dialog.addResultListener(o, o.onDeleteExecute);
}

//==========================================================
// <T>共享加载处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourceMenuBar_onShareLoad(){
   var o = this;
   // 隐藏窗口处理
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>共享点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourceMenuBar_onShareClick(event){
   var o = this;
   var item = o._frameSet._listContent.focusItem();
   if(!item){
      return alert('请选中后再点击删除');
   }
   var sender = event.sender;
   var name = sender.name();
   var shareCd = null;
   if(name == 'shareOpen'){
      shareCd = 'Public';
   }else{
      shareCd = 'Private';
   }
   var guid = item._guid;
   // 禁止窗口处理
   RConsole.find(FUiDesktopConsole).showUploading();
   // 发送数据请求
   var connection = RConsole.find(FDrResourceConsole).doShare(guid, shareCd);
   connection.addLoadListener(o, o.onShareLoad);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}