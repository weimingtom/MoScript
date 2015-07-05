//==========================================================
// <T>浏览器环境信息。</T>
//
// @class
// @author maocy
// @history 150316
//==========================================================
MO.SBrowserCapability = function SBrowserCapability(){
   var o = this;
   //..........................................................
   // @attribute Boolean 支持进程
   o.optionProcess = false;
   // @attribute Boolean 支持存储
   o.optionStorage = false;
   // @attribute Boolean 支持创建二进制
   o.blobCreate    = false;
   // @attribute Integer 像素比率
   o.pixelRatio    = 1;
   return o;
}
