//==========================================================
// <T>资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150409
//==========================================================
function FDsResourceCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName                 = 'design3d.resource.CatalogToolBar';
   //..........................................................
   // @attribute
   o._controlFolderCreateButton = null;
   o._controlFolderDeleteButton = null;
   o._controlFolderOpenButton   = null;
   o._controlFolderCloseButton  = null;
   //..........................................................
   // @event
   o.onBuilded                  = FDsResourceCatalogToolBar_onBuilded;
   // @event
   o.onFolderCreateClick        = FDsResourceCatalogToolBar_onFolderCreateClick;
   o.onFolderDeleteLoad         = FDsResourceCatalogToolBar_onFolderDeleteLoad;
   o.onFolderDeleteExcute       = FDsResourceCatalogToolBar_onFolderDeleteExcute;
   o.onFolderDeleteClick        = FDsResourceCatalogToolBar_onFolderDeleteClick;
   o.onFolderOpenClick          = FDsResourceCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick         = FDsResourceCatalogToolBar_onFolderCloseClick;
   //..........................................................
   // @method
   o.construct                  = FDsResourceCatalogToolBar_construct;
   // @method
   o.dispose                    = FDsResourceCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlFolderCreateButton.addClickListener(o, o.onFolderCreateClick);
   o._controlFolderDeleteButton.addClickListener(o, o.onFolderDeleteClick);
   o._controlFolderOpenButton.addClickListener(o, o.onFolderOpenClick);
   o._controlFolderCloseButton.addClickListener(o, o.onFolderCloseClick);
}

//==========================================================
// <T>文件夹创建点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsResourceCatalogToolBar_onFolderCreateClick(event){
   var o = this;
   var parentGuid = null;
   var parentLabel = null;
   // 获得选中节点
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(node){
      parentGuid = node.guid();
      parentLabel = node.label();
   }
   // 显示窗口
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._parentGuid = parentGuid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel('');
   dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>文件夹删除加载处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsResourceCatalogToolBar_onFolderDeleteLoad(event){
   var o = this;
   // 隐藏窗口
   RConsole.find(FUiDesktopConsole).hide();
   // 刷新目录
   o._frameSet._catalogContent.reloadService();
}

//==========================================================
// <T>文件夹删除点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsResourceCatalogToolBar_onFolderDeleteExcute(event){
   var o = this;
   // 检查按键
   if(event.resultCd != EResult.Success){
      return;
   }
   // 获得选中节点
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   // 画面禁止操作
   RConsole.find(FUiDesktopConsole).showUploading();
   // 删除数据处理
   var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
   connection.addLoadListener(o, o.onFolderDeleteLoad);
}

//==========================================================
// <T>文件夹删除点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsResourceCatalogToolBar_onFolderDeleteClick(event){
   var o = this;
   // 获得选中节点
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   // 删除确认窗口
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
   dialog.addResultListener(o, o.onFolderDeleteExcute);
}

//==========================================================
// <T>文件夹打开点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsResourceCatalogToolBar_onFolderOpenClick(event){
}

//==========================================================
// <T>文件夹关闭点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsResourceCatalogToolBar_onFolderCloseClick(event){
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}