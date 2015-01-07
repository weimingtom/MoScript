﻿//==========================================================
// <T>效果器管理器。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FG3dEffectConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._effects = null;
   o._path = "/assets/shader/";
   //..........................................................
   // @method
   o.construct  = FG3dEffectConsole_construct;
   o.find       = FG3dEffectConsole_find;
   o.findByName = FG3dEffectConsole_findByName;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._effects = new TDictionary();
}

//==========================================================
// <T>根据类名称或对象获得效果器。</T>
//
// @method
// @param c:context:FG3dContext 环境对象
// @param p:class:Object 类对象
// @return FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_find(c, p){
   var o = this;
   var n = RClass.name(p);
   var e = o._effects.get(n);
   if(e == null){
      e = RClass.createByName(n);
      e.linkContext(c);
      e._path = o._path;
      e.load();
      o._effects.set(n, e);
   }
   return e;
}

//==========================================================
// <T>根据类名称或对象获得效果器。</T>
//
// @method
// @param c:context:FG3dContext 环境对象
// @param p:class:Object 类对象
// @return FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_findByName(c, p){
   var o = this;
   if(o._effect == null){
      o._effect = RClass.create(FG3dSampleAutomaticEffect);
      o._effect.linkContext(c);
      o._effect._path = o._path;
      o._effect.load();
   }
   return o._effect;
}
