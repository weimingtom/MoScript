//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FE3sModel(o){
   o = RClass.inherits(this, o, FE3sSpace);
   //..........................................................
   // @attribute
   o._dataCompress  = true;
   // @attribute
   o._meshes        = null;
   o._skeletons     = null;
   o._animations    = null;
   //..........................................................
   // @method
   o.findMeshByCode = FE3sModel_findMeshByCode;
   o.meshes         = FE3sModel_meshes;
   o.skeletons      = FE3sModel_skeletons;
   o.animations     = FE3sModel_animations;
   // @method
   o.unserialize    = FE3sModel_unserialize;
   return o;
}

//==========================================================
// <T>根据代码查找网格。</T>
//
// @method
// @param p:code:String 代码
// @return FE3sMesh 网格
//==========================================================
function FE3sModel_findMeshByCode(p){
   var s = this._meshes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._code == p){
         return m;
      }
   }
   return null;
}

//==========================================================
// <T>获得网格集合。</T>
//
// @method
// @return TObjects 网格集合
//==========================================================
function FE3sModel_meshes(){
   return this._meshes;
}

//==========================================================
// <T>获得骨骼集合。</T>
//
// @method
// @return TObjects 骨骼集合
//==========================================================
function FE3sModel_skeletons(){
   return this._skeletons;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FE3sModel_animations(){
   return this._animations;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sModel_unserialize(input){
   // 读取父信息
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   //..........................................................
   // 存储模型
   var modelConsole = RConsole.find(FE3sModelConsole);
   modelConsole.models().set(o.guid(), o);
   //..........................................................
   // 读取几何体集合
   var meshCount = input.readInt16();
   if(meshCount > 0){
      var meshes = o._meshes = new TObjects();
      for(var i = 0; i < meshCount; i++){
         var mesh = modelConsole.unserialMesh(input)
         meshes.push(mesh);
      }
   }
   //..........................................................
   // 读取骨骼集合
   var skeletonCount = input.readInt16();
   if(skeletonCount > 0){
      var s = o._skeletons = new TObjects();
      for(var i = 0; i < skeletonCount; i++){
         var skeleton = modelConsole.unserialSkeleton(input)
         s.push(skeleton);
      }
   }
   //..........................................................
   // 读取动画集合
   var animationCount = input.readInt16();
   if(animationCount > 0){
      var animations = o._animations = new TObjects();
      for(var i = 0; i < animationCount; i++){
         var animation = modelConsole.unserialAnimation(o, input)
         animations.push(animation);
      }
   }
   RLogger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}
