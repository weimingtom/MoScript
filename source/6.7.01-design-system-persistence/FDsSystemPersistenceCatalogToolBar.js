with(MO){
   //==========================================================
   // <T>资源目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150409
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar = function FDsSystemPersistenceCatalogToolBar(o){
      o = RClass.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName = 'system.design.frame.CatalogToolBar';
      //..........................................................
      // @attribute
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      // @attribute
      o._activeNodeGuid              = null;
      //..........................................................
      // @event
      o.onBuilded                    = FDsSystemPersistenceCatalogToolBar_onBuilded;
      // @event
      o.onFolderCreateClick          = FDsSystemPersistenceCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemPersistenceCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemPersistenceCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemPersistenceCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemPersistenceCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemPersistenceCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemPersistenceCatalogToolBar_onFolderCloseClick;
      //..........................................................
      // @method
      o.construct                    = FDsSystemPersistenceCatalogToolBar_construct;
      // @method
      o.dispose                      = FDsSystemPersistenceCatalogToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar_onBuilded = function FDsSystemPersistenceCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      //o._controlFolderCreateButton.addClickListener(o, o.onFolderCreateClick);
      //o._controlFolderDeleteButton.addClickListener(o, o.onFolderDeleteClick);
      //o._controlFolderPropertyButton.addClickListener(o, o.onFolderPropertyClick);
      //o._controlFolderOpenButton.addClickListener(o, o.onFolderOpenClick);
      //o._controlFolderCloseButton.addClickListener(o, o.onFolderCloseClick);
   }

   //==========================================================
   // <T>文件夹创建点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar_onFolderCreateClick = function FDsSystemPersistenceCatalogToolBar_onFolderCreateClick(event){
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
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>文件夹删除加载处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar_onFolderDeleteLoad = function FDsSystemPersistenceCatalogToolBar_onFolderDeleteLoad(event){
      var o = this;
      // 隐藏窗口
      RConsole.find(FUiDesktopConsole).hide();
      // 刷新目录
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }

   //==========================================================
   // <T>文件夹删除点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar_onFolderDeleteExcute = function FDsSystemPersistenceCatalogToolBar_onFolderDeleteExcute(event){
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
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }

   //==========================================================
   // <T>文件夹删除点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar_onFolderDeleteClick = function FDsSystemPersistenceCatalogToolBar_onFolderDeleteClick(event){
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
   // <T>文件夹属性点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar_onFolderPropertyClick = function FDsSystemPersistenceCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      // 显示属性窗口
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>文件夹打开点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar_onFolderOpenClick = function FDsSystemPersistenceCatalogToolBar_onFolderOpenClick(event){
   }

   //==========================================================
   // <T>文件夹关闭点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar_onFolderCloseClick = function FDsSystemPersistenceCatalogToolBar_onFolderCloseClick(event){
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar_construct = function FDsSystemPersistenceCatalogToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemPersistenceCatalogToolBar_dispose = function FDsSystemPersistenceCatalogToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
