//==========================================================
// <T>全国地图实体类</T>
//
// @class
// @author sunpeng
// @history 150606
//==========================================================
MO.FEaiMapEntity = function FEaiMapEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   //..........................................................
   // @property
   o._provinceEntities = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities     = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   //..........................................................
   // @method
   o.construct         = MO.FEaiMapEntity_construct;
   // @method
   o.findCityByCard    = MO.FEaiMapEntity_findCityByCard;
   // @method
   o.dispose           = MO.FEaiMapEntity_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_construct = function FEaiMapEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   // 设置属性
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}

//==========================================================
// <T>根据代码查找城市。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_findCityByCard = function FEaiMapEntity_findCityByCard(card){
   var o = this;
   // 检查参数
   if(card.length != 4){
      return null;
   }
   // 查找4位
   var cityEntities = o._cityEntities;
   var cityEntity = cityEntities.get(card);
   if(cityEntity){
      return cityEntity;
   }
   // 查找2位
   var cityEntities = o._cityEntities;
   var cityEntity = cityEntities.get(card.substring(0, 2));
   if(cityEntity){
      return cityEntity;
   }
   return null;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_dispose = function FEaiMapEntity_dispose(){
   var o = this;
   o._provinceEntities = MO.RObject.dispose(o._provinceEntities);
   o._cityEntities = MO.RObject.dispose(o._cityEntities);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
