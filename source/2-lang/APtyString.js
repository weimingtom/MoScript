﻿//============================================================
// <T>字符串的属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @param v:value:String 缺省内容
// @author maocy
// @version 141231
//============================================================
function APtyString(o, n, l, v){
   if(!o){o = this;}
   AProperty(o, n, l);
   //..........................................................
   // @attribute
   o._value    = v ? v : null;
   //..........................................................
   // @method
   o.build    = APtyString_build;
   o.toString = APtyString_toString;
   return o;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param v:value:Object 对象
//============================================================
function APtyString_build(v){
   var o = this;
   v[o.name] = o._value;
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
function APtyString_toString(){
   var o = this;
   return '<StringProperty:linker=' + o.linker + ',value=' + o._value +  '>';
}
