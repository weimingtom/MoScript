//==========================================================
// <T>预测视图页面。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateView = function FEaiCockpitAchievementInvestmentRateView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   //o._backgroundUri        = '{eai.resource}/cockpit/forecast/view.png';
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitAchievementInvestmentRateView_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementInvestmentRateView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementInvestmentRateView_setup;
   o.processLogic          = MO.FEaiCockpitAchievementInvestmentRateView_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementInvestmentRateView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateView_onPaintBegin = function FEaiCockpitAchievementInvestmentRateView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateView_construct = function FEaiCockpitAchievementInvestmentRateView_construct() {
   var o = this;
   o.__base.FEaiCockpitControlView.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateView_setup = function FEaiCockpitAchievementInvestmentRateView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateView_processLogic = function FEaiCockpitAchievementInvestmentRateView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateView_dispose = function FEaiCockpitAchievementInvestmentRateView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}