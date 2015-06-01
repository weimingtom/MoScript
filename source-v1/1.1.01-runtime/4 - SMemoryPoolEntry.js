﻿//==========================================================
// <T>内存缓冲节点。</T>
//
// @struct
// @author maocy
// @version 150523
//==========================================================
function SMemoryPoolEntry(){
   var o = this;
   //..........................................................
   // @attribute
   o.next    = null;
   // @attribute
   o.value   = null;
   //..........................................................
   // @method
   o.dispose = SMemoryPoolEntry_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function SMemoryPoolEntry_dispose(){
   var o = this;
   // 释放内容
   var value = o.value;
   if(value){
      value.__pool = null;
      value.dispose();
   }
   // 释放属性
   o.next = null;
   o.value = null;
}
