MO.FEaiChartMarketerDynamicInfo = function FEaiChartMarketerDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._investmentTotal    = MO.Class.register(o, new MO.AGetter('_investmentTotal'));
   o._redemptionTotal    = MO.Class.register(o, new MO.AGetter('_redemptionTotal'));
   o._netinvestmentTotal = MO.Class.register(o, new MO.AGetter('_netinvestmentTotal'));
   o._interestTotal      = MO.Class.register(o, new MO.AGetter('_interestTotal'));
   o._performanceTotal   = MO.Class.register(o, new MO.AGetter('_performanceTotal'));
   o.construct           = MO.FEaiChartMarketerDynamicInfo_construct;
   o.unserialize         = MO.FEaiChartMarketerDynamicInfo_unserialize;
   o.dispose             = MO.FEaiChartMarketerDynamicInfo_dispose;
   return o;
}
MO.FEaiChartMarketerDynamicInfo_construct = function FEaiChartMarketerDynamicInfo_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FEaiChartMarketerDynamicInfo_unserialize = function FEaiChartMarketerDynamicInfo_unserialize(input){
   var o = this;
   o._investmentTotal = input.readDouble();
   o._redemptionTotal = input.readDouble();
   o._netinvestmentTotal = input.readDouble();
   o._interestTotal = input.readDouble();
   o._performanceTotal = input.readDouble();
}
MO.FEaiChartMarketerDynamicInfo_dispose = function FEaiChartMarketerDynamicInfo_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartMarketerDynamicUnit = function FEaiChartMarketerDynamicUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._recordDate           = MO.Class.register(o, new MO.AGetter('_recordDate'));
   o._departmentLabel      = MO.Class.register(o, new MO.AGetter('_departmentLabel'));
   o._marketerLabel        = MO.Class.register(o, new MO.AGetter('_marketerLabel'));
   o._customerLabel        = MO.Class.register(o, new MO.AGetter('_customerLabel'));
   o._customerCard         = MO.Class.register(o, new MO.AGetter('_customerCard'));
   o._customerPhone        = MO.Class.register(o, new MO.AGetter('_customerPhone'));
   o._customerActionCd     = MO.Class.register(o, new MO.AGetter('_customerActionCd'));
   o._customerActionAmount = MO.Class.register(o, new MO.AGetter('_customerActionAmount'));
   o.construct             = MO.FEaiChartMarketerDynamicUnit_construct;
   o.unserialize           = MO.FEaiChartMarketerDynamicUnit_unserialize;
   o.dispose               = MO.FEaiChartMarketerDynamicUnit_dispose;
   return o;
}
MO.FEaiChartMarketerDynamicUnit_construct = function FEaiChartMarketerDynamicUnit_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FEaiChartMarketerDynamicUnit_unserialize = function FEaiChartMarketerDynamicUnit_unserialize(input){
   var o = this;
   o._recordDate = input.readString();
   o._departmentLabel = input.readString();
   o._marketerLabel = input.readString();
   o._customerLabel = input.readString();
   o._customerCard = input.readString();
   o._customerPhone = input.readString();
   o._customerActionCd = input.readUint8();
   o._customerActionAmount = input.readDouble();
}
MO.FEaiChartMarketerDynamicUnit_dispose = function FEaiChartMarketerDynamicUnit_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartMarketerProcessor = function FEaiChartMarketerProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._intervalMinute          = 1;
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   o._rankUnits               = MO.Class.register(o, new MO.AGetter('_rankUnits'));
   o._units                   = MO.Class.register(o, new MO.AGetter('_units'));
   o._tableUnits              = MO.Class.register(o, new MO.AGetter('_tableUnits'));
   o._tableCount              = 40;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   o._unitPool                = null;
   o._autios                  = null;
   o._eventDataChanged        = null;
   o._listenersDataChanged    = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onDynamicData             = MO.FEaiChartMarketerProcessor_onDynamicData;
   o.construct                = MO.FEaiChartMarketerProcessor_construct;
   o.allocUnit                = MO.FEaiChartMarketerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartMarketerProcessor_allocShape;
   o.setup                    = MO.FEaiChartMarketerProcessor_setup;
   o.calculateInvestmentLevel = MO.FEaiChartMarketerProcessor_calculateInvestmentLevel;
   o.calculateCurrent         = MO.FEaiChartMarketerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartMarketerProcessor_focusEntity;
   o.process                  = MO.FEaiChartMarketerProcessor_process;
   o.dispose                  = MO.FEaiChartMarketerProcessor_dispose;
   return o;
}
MO.FEaiChartMarketerProcessor_onDynamicData = function FEaiChartMarketerProcessor_onDynamicData(event){
   var o = this;
   var content = event.content;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(event.content);
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo.unserialize(view);
   var units = o._units;
   var count = view.readInt32();
   for(var i = 0; i < count; i++){
      var unit = o.allocUnit();
      unit.unserialize(view);
      units.push(unit);
   }
   view.dispose();
   var unitCount = units.count();
   o._tableInterval = 1000 * 60 * o._intervalMinute / unitCount;
   o._tableTick = 0;
   var changeEvent = o._eventDataChanged;
   changeEvent.unit = null;
   changeEvent.rank = o._rankUnits;
   changeEvent.data = o._tableUnits;
   o.processDataChangedListener(changeEvent);
}
MO.FEaiChartMarketerProcessor_construct = function FEaiChartMarketerProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableUnits = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._dynamicInfo = MO.Class.create(MO.FEaiChartMarketerDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
}
MO.FEaiChartMarketerProcessor_allocUnit = function FEaiChartMarketerProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMarketerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartMarketerProcessor_setup = function FEaiChartMarketerProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartMarketerProcessor_calculateInvestmentLevel = function FEaiChartMarketerProcessor_calculateInvestmentLevel(investment){
   var o = this;
   if(investment >= 5000000){
      return 5;
   }else if(investment >= 1000000){
      return 4;
   }else if(investment >= 100000){
      return 3;
   }else if(investment >= 10000){
      return 2;
   }else if(investment >= 1000){
      return 1;
   }
   return 0;
}
MO.FEaiChartMarketerProcessor_calculateCurrent = function FEaiChartMarketerProcessor_calculateCurrent(){
   var o = this;
   var units = o._units;
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var amount = unit.customerActionAmount();
   }
}
MO.FEaiChartMarketerProcessor_focusEntity = function FEaiChartMarketerProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   var card = unit.customerCard();
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
   }
   var changedEvent = o._eventDataChanged;
   changedEvent.unit = unit;
   changedEvent.rank = o._rankUnits;
   changedEvent.data = o._tableUnits;
   o.processDataChangedListener(changedEvent);
}
MO.FEaiChartMarketerProcessor_process = function FEaiChartMarketerProcessor_process(){
   var o = this;
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
   systemDate.truncMinute();
   if(!o._dateSetup){
      o._endDate.assign(systemDate);
      o._endDate.addMinute(-o._intervalMinute);
      o._dateSetup = true;
   }
   if(o._dataTicker.process()){
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      statistics.doMarketerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      beginDate.assign(endDate);
   }
   var currentTick = MO.Timer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      if(o._tableUnits.count() >= o._tableCount){
         var unit = o._tableUnits.pop();
         o._unitPool.free(unit);
      }
      var units = o._units;
      if(!units.isEmpty()){
         var unit = units.shift();
         o._tableUnits.unshift(unit);
         o.focusEntity(unit);
      }
      o.calculateCurrent();
      o._tableTick = currentTick;
   }
   o._mapEntity.process();
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._units.count();
   dynamicInfo._investmentTableEntityCount = o._tableUnits.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}
MO.FEaiChartMarketerProcessor_dispose = function FEaiChartMarketerProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartMarketerScene = function FEaiChartMarketerScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                   = MO.EEaiScene.ChartMarketer;
   o._processor              = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent       = 0;
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._24HLastTick            = 0;
   o._24HTrendInterval       = 1000 * 60 * 5;
   o._logoBar                = null;
   o._timeline               = null;
   o._liveTable              = null;
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o._groundAutioUrl         = '{eai.resource}/music/statistics.mp3';
   o.onInvestmentDataChanged = MO.FEaiChartMarketerScene_onInvestmentDataChanged;
   o.onOperationVisibility   = MO.FEaiChartMarketerScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartMarketerScene_onProcessReady;
   o.onProcess               = MO.FEaiChartMarketerScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartMarketerScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartMarketerScene_onSwitchComplete;
   o.setup                   = MO.FEaiChartMarketerScene_setup;
   o.showParticle            = MO.FEaiChartMarketerScene_showParticle;
   o.showFace                = MO.FEaiChartMarketerScene_showFace;
   o.fixMatrix               = MO.FEaiChartMarketerScene_fixMatrix;
   o.processResize           = MO.FEaiChartMarketerScene_processResize;
   return o;
}
MO.FEaiChartMarketerScene_onInvestmentDataChanged = function FEaiChartMarketerScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   var table = o._liveTable;
   table.setRank(event.rank);
   table.pushUnit(unit);
   table.dirty();
}
MO.FEaiChartMarketerScene_onOperationVisibility = function FEaiChartMarketerScene_onOperationVisibility(event){
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if(event.visibility){
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   }else{
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiChartMarketerScene_onProcessReady = function FEaiChartMarketerScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartMarketerScene_onProcess = function FEaiChartMarketerScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if(!o._statusStart){
      if(MO.Window.Browser.capability().soundConfirm){
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      }else{
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
      if (o._statusLayerLevel <= 0) {
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
         var countryEntity = o._countryEntity;
         countryEntity.start();
         o._mapEntity.showCountry(countryEntity);
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   if (o._playing) {
      var countryEntity = o._countryEntity;
      if(!countryEntity.introAnimeDone()){
         countryEntity.process();
      }
      if (!o._mapReady) {
         o._guiManager.show();
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      o._processor.process();
      var logoBar = o._logoBar;
      var investmentTotal = logoBar.findComponent('investmentTotal');
      var invementTotalCurrent = o._processor.invementTotalCurrent();
      investmentTotal.setValue(parseInt(invementTotalCurrent).toString());
      var investmentDay = logoBar.findComponent('investmentDay');
      var invementDayCurrent = o._processor.invementDayCurrent();
      investmentDay.setValue(parseInt(invementDayCurrent).toString());
      if(o._nowTicker.process()){
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
   }
}
MO.FEaiChartMarketerScene_onSwitchProcess = function FEaiChartMarketerScene_onSwitchProcess(event){
   var o = this;
}
MO.FEaiChartMarketerScene_onSwitchComplete = function FEaiChartMarketerScene_onSwitchComplete(event){
   var o = this;
}
MO.FEaiChartMarketerScene_setup = function FEaiChartMarketerScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartMarketerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartMarketerTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartMarketerTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   o._guiManager.hide();
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.cityModule().build(o);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
}
MO.FEaiChartMarketerScene_showParticle = function FEaiChartMarketerScene_showParticle(provinceEntity, cityResource){
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   particle.color().set(1, 1, 0, 1);
   for(var i = 0; i < count; i++){
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      particle.setSpeed(4 + 0.4 * i);
      particle.setAcceleration(0);
      particle.setAttenuation(0.8);
      particle.start();
   }
}
MO.FEaiChartMarketerScene_showFace = function FEaiChartMarketerScene_showFace(){
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartMarketerScene_fixMatrix = function FEaiChartMarketerScene_fixMatrix(matrix){
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   }else{
      matrix.tx = -34.8;
      matrix.ty = -11.0;
      matrix.tz = 0;
      matrix.setScale(0.28, 0.31, 0.28);
   }
   matrix.update();
}
MO.FEaiChartMarketerScene_processResize = function FEaiChartMarketerScene_processResize(){
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   o.fixMatrix(o._processor.display().matrix());
   var logoBar = o._logoBar;
   if(isVertical){
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   }else{
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   var control = o._southSea;
   if(isVertical){
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(100);
   }else{
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(780);
      control.setBottom(260);
   }
   var timeline = o._timeline;
   if(isVertical){
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   }else{
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(780);
      timeline.setHeight(250);
   }
   var liveTable = o._liveTable;
   if(isVertical){
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   }else{
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(750);
   }
}
MO.FEaiChartMarketerTable = function FEaiChartMarketerTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetSet('_rank'));
   o._rankLogoImage        = null;
   o._rankTitleImage       = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   o._columnLabels         = null;
   o._columnDefines        = null;
   o._columnWidths         = null;
   o._tableCount           = 0;
   o._units                = null;
   o._lineScroll           = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad           = MO.FEaiChartMarketerTable_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartMarketerTable_onPaintBegin;
   o.oeUpdate              = MO.FEaiChartMarketerTable_oeUpdate;
   o.construct             = MO.FEaiChartMarketerTable_construct;
   o.setup                 = MO.FEaiChartMarketerTable_setup;
   o.pushUnit              = MO.FEaiChartMarketerTable_pushUnit;
   o.drawRow               = MO.FEaiChartMarketerTable_drawRow;
   o.dispose               = MO.FEaiChartMarketerTable_dispose;
   return o;
}
MO.FEaiChartMarketerTable_onImageLoad = function FEaiChartMarketerTable_onImageLoad() {
   this.dirty();
}
MO.FEaiChartMarketerTable_onPaintBegin = function FEaiChartMarketerTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   var columnCount = o._columnCount;
   var widthDefine = 0;
   for(var i = 0; i < columnCount; i++){
      widthDefine += o._columnDefines[i];
   }
   for(var i = 0; i < columnCount; i++){
      o._columnWidths[i] = (o._columnDefines[i] / widthDefine * drawWidth) - 7;
   }
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   var titleText = '全球实时投资数据展示中心(中国)';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   graphic.setFont(o._rowFontStyle);
   var tableTop = top + o._rankStart;
   graphic.drawGridImage(o._rankLineImage, left + 6, tableTop + o._rankTitleStart, width - 22, o._rankHeight, o._rankLinePadding);
   graphic.drawImage(o._rankTitleImage, left + (width - 167) * 0.5, tableTop + 3, 167, 40);
   var rankUnit = o._rank;
   if(rankUnit){
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankUnit.count();
      tableTop += 90;
      for(var i = 0; i < count; i++) {
         var unit = rankUnit.at(i);
         o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
   var headText = '';
   var headTextWidth = 0;
   var headLeft = drawLeft;
   var headTop = top + o._headStart;
   var headTextTop = headTop + o._headTextTop;
   for(var i = 0; i < columnCount; i++){
      var headText = o._columnLabels[i];
      var headTextWidth = graphic.textWidth(headText);
      graphic.fillRectangle(headLeft, headTop, o._columnWidths[i] - 4, o._headHeight, '#122A46');
      graphic.drawText(headText, headLeft + (o._columnWidths[i] - headTextWidth - 4) * 0.5, headTextTop, '#00B2F2');
      headLeft += o._columnWidths[i];
   }
   var entities = o._units;
   if(!entities.isEmpty()){
      var tableTop = top + o._rowStart;
      var tableText = '';
      var tableTextWidth = 0;
      graphic.clip(drawLeft, tableTop, drawWidth - 38, o._rowHeight * (o._tableCount - 1));
      tableTop += 24;
      var count = entities.count();
      for(var i = 0; i < count; i++) {
         var unit = entities.at(i);
         o.drawRow(graphic, unit, false, i, drawLeft, tableTop + o._rowHeight * i + o._lineScroll, drawWidth);
      }
   }
}
MO.FEaiChartMarketerTable_oeUpdate = function FEaiChartMarketerTable_oeUpdate(event){
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if(event.isBefore()){
      if(o._lineScroll < 0){
         o._lineScroll += 1;
         if(o._lineScroll < -o._rowHeight){
            o._lineScroll = 0;
         }
         if(o._lineScroll >= 0){
            var entities = o._units;
            if(entities.count() > o._tableCount){
               entities.pop();
            }
            o._lineScroll = 0;
         }
         o._gridControl.dirty();
         o.dirty();
      }
   }
}
MO.FEaiChartMarketerTable_construct = function FEaiChartMarketerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
   o._columnLabels = new Array('时间', '公司', '理财师', '城市', '用户-手机', '投资额(元)');
      o._columnDefines = new Array(110, 120, 120, 100, 160, 120);
   o._columnWidths = new Array();
   o._columnCount = o._columnLabels.length;
}
MO.FEaiChartMarketerTable_setup = function FEaiChartMarketerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/live/tank-title.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank1Image = imageConsole.load('{eai.resource}/live/1.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank2Image = imageConsole.load('{eai.resource}/live/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank3Image = imageConsole.load('{eai.resource}/live/3.png');
   image.addLoadListener(o, o.onImageLoad);
   var font = new MO.SUiFont();
   font.font = 'Microsoft YaHei';
   font.size = 25;
   font.color = '#54F0FF';
   var grid = o._gridControl = MO.Class.create(MO.FGuiGridControl);
   grid.setLocation(50, 450);
   grid.setSize(800, 500);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('recordDate');
   column.setLabel('时间');
   column.setDataName('record_date');
   column.font().assign(font);
   column.setWidth(110);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('departmentLabel');
   column.setLabel('公司');
   column.setDataName('department_label');
   column.font().assign(font);
   column.setWidth(120);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerLabel');
   column.setLabel('理财师');
   column.setDataName('marketer_label');
   column.font().assign(font);
   column.setWidth(120);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCard');
   column.setLabel('城市');
   column.setDataName('customer_card');
   column.font().assign(font);
   column.setWidth(100);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerInfo');
   column.setLabel('用户-手机');
   column.setDataName('customer_phone');
   column.font().assign(font);
   column.setWidth(160);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerAmount');
   column.setLabel('投资额(元)');
   column.setDataName('customer_amount');
   column.font().assign(font);
   column.setWidth(120);
   grid.pushColumn(column);
   o.push(grid);
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = -5;
      o._rankHeight = 249;
      o._rankRowHeight = 50;
      o._rankIconStart = 22;
      o._rankTextStart = 8;
      o._rankRowUp = 36;
      o._rankRowDown = 68;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
      o._rowHeight = 46;
   }else{
      o._tableCount = 19;
      o._rankStart = 110;
      o._rankTitleStart = 0;
      o._rankHeight = 219;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankTextStart = 0;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
      o._rowHeight = 36;
   }
}
MO.FEaiChartMarketerTable_pushUnit = function FEaiChartMarketerTable_pushUnit(unit){
   var o = this;
   if(!unit){
      return null;
   }
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   if(entities.count() > o._tableCount){
      entities.pop();
   }
}
MO.FEaiChartMarketerTable_drawRow = function FEaiChartMarketerTable_drawRow(graphic, unit, flag, index, x, y, width){
   var o = this;
   var widths = o._columnWidths;
   var fontColor = null;
   if(flag){
      fontColor = '#E5BD1D';
   }else{
      fontColor = '#59FDE9';
   }
   if(flag){
      var columnWidth = widths[0];
      var imageX = x + (columnWidth * 0.5) - 23;
      var imageY = y - o._rankIconStart;
      if((index == 0) && o._rank1Image.testReady()){
         graphic.drawImage(o._rank1Image, imageX - 6, imageY - 28, 58, 65);
      }
      if((index == 1) && o._rank2Image.testReady()){
         graphic.drawImage(o._rank2Image, imageX, imageY, 46, 37);
      }
      if((index == 2) && o._rank3Image.testReady()){
         graphic.drawImage(o._rank3Image, imageX, imageY, 46, 37);
      }
   }
   y += o._rankTextStart;
   var textWidth = 0;
   if(!flag){
      o._currentDate.parse(unit.recordDate());
      var text = o._currentDate.format('HH24:MI:SS');
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, x + widths[0] * 0.5 - textWidth * 0.5, y, fontColor);
   }
   x += widths[0];
   text = unit.departmentLabel();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[1] * 0.5 - textWidth * 0.5, y, fontColor);
   x += widths[1];
   text = unit.marketerLabel();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[2] * 0.5 - textWidth * 0.5, y, fontColor);
   x += widths[2];
   var cityResource = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(unit.customerCard());
   text = '';
   if(cityResource){
      text = cityResource.label();
   }
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[3] * 0.5 - textWidth * 0.5, y, fontColor);
   x += widths[3];
   text = unit.customerLabel() + ' - ' + unit.customerPhone();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[4] * 0.5 - textWidth * 0.5, y, fontColor);
   x += widths[4];
   var amount = MO.Lang.Float.format(unit.customerActionAmount(), null, null, 2, '0');
   var amountRight = x + widths[5] - 15;
   if(unit.customerActionCd() == 1){
      if (amount.length > 7) {
         var highColor = null;
         if(amount.length > 9){
            highColor = '#FDEF01';
         }else{
            highColor = '#EB6C03';
         }
         var high = amount.substring(0, amount.length - 7);
         var low = amount.substring(amount.length - 7, amount.length);
         var highWidth = graphic.textWidth(high);
         var lowWidth = graphic.textWidth(low);
         graphic.drawText(high, amountRight - lowWidth - highWidth, y, highColor);
         graphic.drawText(low, amountRight - lowWidth, y, '#59FDE9');
      }else{
         textWidth = graphic.textWidth(amount);
         graphic.drawText(amount, amountRight - textWidth, y, fontColor);
      }
   }else if(unit.customerActionCd() == 2){
      var text = '-' + amount;
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, amountRight - textWidth, y, '#FF0000');
   }else{
      throw new TError('Invalid action code.');
   }
}
MO.FEaiChartMarketerTable_dispose = function FEaiChartMarketerTable_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiChartMarketerTimeline = function FEaiChartMarketerTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._startTime        = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime          = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._ready            = false;
   o._investmentTotal  = 0;
   o._intervalMiniute  = 10;
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth    = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight   = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap      = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth    = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o.oeUpdate          = MO.FEaiChartMarketerTimeline_oeUpdate;
   o.construct         = MO.FEaiChartMarketerTimeline_construct;
   o.sync              = MO.FEaiChartMarketerTimeline_sync;
   o.drawTrend         = MO.FEaiChartMarketerTimeline_drawTrend;
   o.onPaintBegin      = MO.FEaiChartMarketerTimeline_onPaintBegin;
   o.on24HDataFetch    = MO.FEaiChartMarketerTimeline_on24HDataFetch;
   return o;
}
MO.FEaiChartMarketerTimeline_construct = function FEaiChartMarketerTimeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartMarketerTrendInfo);
}
MO.FEaiChartMarketerTimeline_sync = function FEaiChartMarketerTimeline_sync() {
   var o = this;
   if (!o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!systemLogic.testReady()){
      return;
   }
   var currentDate = systemLogic.currentDate();
   currentDate.truncMinute(o._intervalMiniute);
   var startTime = o._startTime;
   startTime.assign(currentDate);
   startTime.addDay(-1);
   var endTime = o._endTime;
   endTime.assign(currentDate);
   var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
   statisticsLogic.doMarketerTrend(o, o.on24HDataFetch, startTime.format(), endTime.format());
}
MO.FEaiChartMarketerTimeline_on24HDataFetch = function FEaiChartMarketerTimeline_on24HDataFetch(event) {
   var o = this;   var content = event.content;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(event.content);
   var trendInfo = o._trendInfo;
   trendInfo.unserialize(view);
   view.dispose();
   o.dirty();
}
MO.FEaiChartMarketerTimeline_oeUpdate = function FEaiChartMarketerTimeline_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if (o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
      o.sync();
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiChartMarketerTimeline_drawTrend = function FEaiChartMarketerTimeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, lineColor){
   var o = this;
   var startTime = o._startTime;
   var trendInfo = o._trendInfo;
   var units = trendInfo.trendUints();
   var count = units.count();
   var unitFirst = units.first();
   var handle = graphic._handle;
   handle.lineCap = 'round';
   var pixPer10k = dataHeight * 10000 / maxAmount;
   var amount = unitFirst[propertyName];
   var lastX = dataLeft;
   var lastY = dataBottom - amount / 10000 * pixPer10k;
   handle.beginPath();
   handle.moveTo(lastX, lastY);
   var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
   for(var i = 1; i < count; i++){
      var unit = units.get(i);
      var value = unit[propertyName];
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var degreeSpan = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
      var y = dataBottom - value / 10000 * pixPer10k;
      y -= o._baseHeight;
      handle.lineTo(x, y);
   }
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
   var bottomColor = '#' + hexColor.substring(2);
   var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
   var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   gradient.addColorStop('0', bottomColor);
   gradient.addColorStop('1', lineColor);
   var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   opGradient.addColorStop('0', opBottomColor);
   opGradient.addColorStop('1', opTopColor);
   handle.strokeStyle = gradient;
   handle.lineWidth = 4;
   handle.stroke();
}
MO.FEaiChartMarketerTimeline_onPaintBegin = function FEaiChartMarketerTimeline_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 30;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var dataTop = top + 60;
   var dataBottom = bottom - 30;
   var dataHeight = dataBottom - dataTop;
   graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
   var startTime = o.startTime();
   var endTime = o.endTime();
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var bakTime = startTime.date.getTime();
   var text;
   var drawText = false;
   var textWidth = 0;
   while (!startTime.isAfter(endTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
      text = startTime.format('HH24:00');
      startTime.addHour(1);
      drawText = !drawText;
      if (drawText) {
         graphic.setFont('bold 20px Microsoft YaHei');
         textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
      }
   }
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var trendInfo = o._trendInfo;
   var units = trendInfo.trendUints();
   if (units.isEmpty()){
      return;
   }
   var unitFirst = units.first();
   var maxAmount = 0;
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      var investment = unit.investment();
      if (investment > maxAmount) {
         maxAmount = investment;
      }
      var redemption = unit.redemption();
      if (redemption > maxAmount) {
         maxAmount = redemption;
      }
   }
   o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF0000');
   o.drawTrend(graphic, '_redemption', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#0000FF');
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var lastHour = -1;
   var hourInves = 0;
   var maxHourInves = 0;
   startTime.parseAuto(unitFirst.recordDate());
   startTime.refresh();
   lastHour = startTime.date.getHours();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var hour = startTime.date.getHours();
      if (lastHour == hour) {
         hourInves += unit.redemption();
      }else{
         if(hourInves > maxHourInves){
            maxHourInves = hourInves;
            hourInves = 0;
         }
         lastHour = hour;
      }
   }
   graphic.setFont('bold 24px Microsoft YaHei');
   graphic.drawText("24小时投资曲线", decoLeft, top, '#54F0FF');
   graphic.setFont('22px Microsoft YaHei');
   var rowStart = top + 30;
   var rowHeight = 22;
   var textWidth = graphic.textWidth('小时峰值：');
   var textHourPeakValue = MO.Lang.Float.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
   var textHourPeakWidth = graphic.textWidth(textHourPeakValue);
   var textDayTotalValue = MO.Lang.Float.unitFormat(o._investmentTotal, 0, 0, 2, 0, 10000, '万');
   var textDayTotalWidth = graphic.textWidth(textDayTotalValue);
   var textHourAvrgValue = MO.Lang.Float.unitFormat(o._investmentTotal / 24, 0, 0, 2, 0, 10000, '万');
   var textHourAvrgWidth = graphic.textWidth(textHourAvrgValue);
   var textValueWidth = Math.max(Math.max(textHourPeakWidth, textDayTotalWidth), textHourAvrgWidth);
   graphic.drawText('24H总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
   graphic.drawText(textDayTotalValue, decoLeft + textWidth + textValueWidth - textDayTotalWidth, rowStart + rowHeight * 0, '#00B5F6');
   graphic.drawText('小时峰值：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
   graphic.drawText(textHourPeakValue, decoLeft + textWidth + textValueWidth - textHourPeakWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');
   graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
   graphic.drawText(textHourAvrgValue, decoLeft + textWidth + textValueWidth - textHourAvrgWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
   startTime.date.setTime(bakTime);
   startTime.refresh();
}
MO.FEaiChartMarketerTrendInfo = function FEaiChartMarketerTrendInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._trendUints    = MO.Class.register(o, new MO.AGetter('_trendUints'));
   o.construct      = MO.FEaiChartMarketerTrendInfo_construct;
   o.unserialize    = MO.FEaiChartMarketerTrendInfo_unserialize;
   o.dispose        = MO.FEaiChartMarketerTrendInfo_dispose;
   return o;
}
MO.FEaiChartMarketerTrendInfo_construct = function FEaiChartMarketerTrendInfo_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._trendUints = new MO.TObjects();
}
MO.FEaiChartMarketerTrendInfo_unserialize = function FEaiChartMarketerTrendInfo_unserialize(input){
   var o = this;
   var units = o._trendUints;
   units.clear();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var unit = MO.Class.create(MO.FEaiChartMarketerTrendUnit);
      unit.unserialize(input);
      units.push(unit);
   }
}
MO.FEaiChartMarketerTrendInfo_dispose = function FEaiChartMarketerTrendInfo_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartMarketerTrendUnit = function FEaiChartMarketerTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._recordDate    = MO.Class.register(o, new MO.AGetter('_recordDate'));
   o._investment    = MO.Class.register(o, new MO.AGetter('_investment'));
   o._redemption    = MO.Class.register(o, new MO.AGetter('_redemption'));
   o._netinvestment = MO.Class.register(o, new MO.AGetter('_netinvestment'));
   o._interest      = MO.Class.register(o, new MO.AGetter('_interest'));
   o._performance   = MO.Class.register(o, new MO.AGetter('_performance'));
   o.construct      = MO.FEaiChartMarketerTrendUnit_construct;
   o.unserialize    = MO.FEaiChartMarketerTrendUnit_unserialize;
   o.dispose        = MO.FEaiChartMarketerTrendUnit_dispose;
   return o;
}
MO.FEaiChartMarketerTrendUnit_construct = function FEaiChartMarketerTrendUnit_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FEaiChartMarketerTrendUnit_unserialize = function FEaiChartMarketerTrendUnit_unserialize(input){
   var o = this;
   o._recordDate = input.readString();
   o._investment = input.readDouble();
   o._redemption = input.readDouble();
   o._netinvestment = input.readDouble();
   o._interest = input.readDouble();
   o._performance = input.readDouble();
}
MO.FEaiChartMarketerTrendUnit_dispose = function FEaiChartMarketerTrendUnit_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
