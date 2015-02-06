//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FRd3SkeletonAnimation(o){
   o = RClass.inherits(this, o, FRd3Animation);
   //..........................................................
   // @method
   o.process = FRd3SkeletonAnimation_process;
   return o;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
function FRd3SkeletonAnimation_process(p){
   var o = this;
   // 获得间隔
   var ct = o._currentTick;
   // 计算间隔
   var bs = p.bones();
   var c = bs.count();
   for(var i = 0; i < c; i++){
      bs.get(i).update(o._playInfo, ct);
   }
}
