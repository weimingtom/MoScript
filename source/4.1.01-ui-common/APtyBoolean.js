﻿//==========================================================
// <T>布尔的属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @param v:value:Boolean 缺省内容
// @author maocy
// @version 141231
//==========================================================
MO.APtyBoolean = function APtyBoolean(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   //..........................................................
   // @attribute
   o._value    = v ? v : false;
   //..........................................................
   // @method
   o.build    = MO.APtyBoolean_build;
   o.load     = MO.APtyBoolean_load;
   o.save     = MO.APtyBoolean_save;
   o.toString = MO.APtyBoolean_toString;
   return o;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param v:value:Object 对象
//============================================================
MO.APtyBoolean_build = function APtyBoolean_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param v:value:Object 对象
// @param x:config:TNode 节点
//============================================================
MO.APtyBoolean_load = function APtyBoolean_load(v, x){
   var o = this;
   v[o._name] = MO.Lang.Boolean.parse(x.get(o._linker));
}

//============================================================
// <T>存储属性值。</T>
//
// @method
// @param v:value:Object 对象
// @param x:config:TNode 节点
//============================================================
MO.APtyBoolean_save = function APtyBoolean_save(v, x){
   var o = this;
   var d = v[o._name];
   if(d){
      x.set(o._linker, MO.Lang.Boolean.toString(d));
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.APtyBoolean_toString = function APtyBoolean_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}