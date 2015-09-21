//==========================================================
// <T>报表舞台。</T>
//
// @class
// @author maocy
// @history 150604
//==========================================================
MO.FEaiChartChapter = function FEaiChartChapter(o){
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
   //..........................................................
   // @attribute
   o._code                    = MO.EEaiChapter.Chart;
   // @attribute
   o._sceneTotal              = MO.Class.register(o, new MO.AGetter('_sceneTotal'));
   o._sceneHistory            = MO.Class.register(o, new MO.AGetter('_sceneHistory'));
   o._sceneCustomer           = MO.Class.register(o, new MO.AGetter('_sceneCustomer'));
   o._sceneCustomerSphere     = MO.Class.register(o, new MO.AGetter('_sceneCustomerSphere'));
   o._sceneMarketerCustomer   = MO.Class.register(o, new MO.AGetter('_sceneMarketerCustomer'));
   o._sceneMarketerMarketer   = MO.Class.register(o, new MO.AGetter('_sceneMarketerMarketer'));
   o._sceneMarketerProduct    = MO.Class.register(o, new MO.AGetter('_sceneMarketerProduct'));  
   o._sceneMarketerManage     = MO.Class.register(o, new MO.AGetter('_sceneMarketerManage'));
   o._sceneDepartmentMarketer = MO.Class.register(o, new MO.AGetter('_sceneDepartmentMarketer'));
   o._scenePerformence        = MO.Class.register(o, new MO.AGetter('_scenePerformence'));
   o._sceneStatisticsMarketer = MO.Class.register(o, new MO.AGetter('_sceneStatisticsMarketer'));
   o._sceneDepartment         = MO.Class.register(o, new MO.AGetter('_sceneDepartment'));
   o._sceneLive               = MO.Class.register(o, new MO.AGetter('_sceneLive'));
   o._sceneWorld              = MO.Class.register(o, new MO.AGetter('_sceneWorld'));
   o._sceneSales              = MO.Class.register(o, new MO.AGetter('_sceneSales'));   
   //..........................................................
   // @method
   o.construct                = MO.FEaiChartChapter_construct;
   // @method
   o.createScene              = MO.FEaiChartChapter_createScene;
   o.process                  = MO.FEaiChartChapter_process;
   // @method
   o.dispose                  = MO.FEaiChartChapter_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartChapter_construct = function FEaiChartChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}

//==========================================================
// <T>根据代码创建场景。</T>
//
// @method
// @param code:String 代码
// @return FEaiScene 场景
//==========================================================
MO.FEaiChartChapter_createScene = function FEaiChartChapter_createScene(code){
   var o = this;
   var scene = null;
   switch(code){
      // 创建客户球型数据图表
      case MO.EEaiScene.ChartCustomerSphere:
         scene = o._sceneCustomerSphere = MO.Class.create(MO.FEaiChartCustomerSphereScene);
         break;
      // 创建理财师客户数据图表
      case MO.EEaiScene.ChartMarketerCustomer:
         scene = o._sceneMarketerCustomer = MO.Class.create(MO.FEaiChartMktCustomerScene);
         break;
      // 创建理财师理财师数据图表
      case MO.EEaiScene.ChartMarketerMarketer:
         scene = o._sceneMarketerMarketer = MO.Class.create(MO.FEaiChartMktMarketerScene);
         break;
       case MO.EEaiScene.ChartMarketerProduct:
         scene = o._sceneMarketerMarketer = MO.Class.create(MO.FEaiChartMktProductScene);
         break;
      // 创建理财师管理数据图表
      case MO.EEaiScene.ChartMarketerManage:
         scene = o._sceneMarketerManage = MO.Class.create(MO.FEaiChartMktManageScene);
         break;
      // 创建公司理财师数据图表
      case MO.EEaiScene.ChartDepartmentMarketer:
         scene = o._sceneDepartmentMarketer = MO.Class.create(MO.FEaiChartDptMarketerScene);
         break;
      // 创建业绩数据图表
      case MO.EEaiScene.ChartPerformence:
         scene = o._scenePerformence = MO.Class.create(MO.FEaiChartPerformenceScene);
         break;
      // 创建理财师分布数据图表
      case MO.EEaiScene.ChartStatisticsMarketer:
         scene = o._sceneStatisticsMarketer = MO.Class.create(MO.FEaiChartStatMarketerScene);
         break;
      // 创建理财师业绩数据图表
      case MO.EEaiScene.ChartPerformenceMarketer:
         scene = o._sceneStatisticsMarketer = MO.Class.create(MO.FEaiChartPerfMarketerScene);
         break;
   }
   scene.linkGraphicContext(o);
   return scene;
   // 创建总计图表
   //var scene = o._sceneTotal = MO.Class.create(MO.FEaiChartTotalScene);
   //scene.linkGraphicContext(o);
   //o.registerScene(scene);
   // 创建历史图表
   //var scene = o._sceneHistory = MO.Class.create(MO.FEaiChartHistoryScene);
   //scene.linkGraphicContext(o);
   //o.registerScene(scene);
   // 创建部门数据图表
   //var scene = o._sceneDepartment = MO.Class.create(MO.FEaiChartDepartmentScene);
   //scene.linkGraphicContext(o);
   //o.registerScene(scene);
   // 创建即时图表
   //var scene = o._sceneLive = MO.Class.create(MO.FEaiChartLiveScene);
   //scene.linkGraphicContext(o);
   //o.registerScene(scene);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartChapter_process = function FEaiChartChapter_process(){
   var o = this;
   o.__base.FEaiChapter.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartChapter_dispose = function FEaiChartChapter_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiChapter.dispose.call(o);
}
