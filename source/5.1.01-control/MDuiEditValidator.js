//==========================================================
// <T>校验管理类。</T>
//
// @face
// @author maocy
// @version 150102
//==========================================================
MO.MUiEditValidator = function MUiEditValidator(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._validable = false;
   o._valid     = true;
   o._validText = null;
   //..........................................................
   // @process
   o.oeValid    = MO.Method.empty;
   return o;
}
