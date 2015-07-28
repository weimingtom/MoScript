with(MO){
   //==========================================================
   // <T>场景画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsSystemListPropertyToolBar = function FDsSystemListPropertyToolBar(o){
      o = RClass.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName           = 'system.design.frame.PropertyToolBar';
      //..........................................................
      // @attribute
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      //..........................................................
      // @event
      o.onBuilded            = FDsSystemListPropertyToolBar_onBuilded;
      // @event
      o.onUpdateClick        = FDsSystemListPropertyToolBar_onUpdateClick;
      //..........................................................
      // @method
      o.construct            = FDsSystemListPropertyToolBar_construct;
      // @method
      o.dispose              = FDsSystemListPropertyToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemListPropertyToolBar_onBuilded = function FDsSystemListPropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 按键事件关联
      //o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   }

   //==========================================================
   // <T>更新按键点击处理。</T>
   //
   // @method
   // @param event:SClickEvent 点击事件
   //==========================================================
   MO.FDsSystemListPropertyToolBar_onUpdateClick = function FDsSystemListPropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemListPropertyToolBar_construct = function FDsSystemListPropertyToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemListPropertyToolBar_dispose = function FDsSystemListPropertyToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
