function FG3dAnimation(o){
   o = RClass.inherits(this, o, FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0
   o._bones       = null;
   o.construct    = FG3dAnimation_construct;
   o.findBone     = FG3dAnimation_findBone;
   o.process      = FG3dAnimation_process;
   o.dispose      = FG3dAnimation_dispose;
   return o;
}
function FG3dAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new TObjects();
}
function FG3dAnimation_findBone(p){
   var o = this;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.get(i);
      if(b.boneId() == p){
         return b;
      }
   }
   return null;
}
function FG3dAnimation_process(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) / 1000;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.get(i);
      b.update(o._currentTick);
   }
   return true;
}
function FG3dAnimation_dispose(){
   var o = this;
   o._bones.dispose();
   o._bones = null;
   o.__base.FObject.dispose.call(o);
}
function FG3dBaseMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._name      = null;
   o._info      = null;
   o.construct  = FG3dBaseMaterial_construct;
   o.info       = FG3dBaseMaterial_info;
   o.assignInfo = FG3dBaseMaterial_assignInfo;
   return o;
}
function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new SG3dMaterialInfo();
}
function FG3dBaseMaterial_info(){
   return this._info;
}
function FG3dBaseMaterial_assignInfo(p){
   this._info.assign(p);
}
function FG3dBone(o){
   o = RClass.inherits(this, o, FObject);
   o._boneId   = 0;
   o._modeId   = null;
   o.update    = FG3dBone_update;
   return o;
}
function FG3dBone_update(p){
}
function FG3dCamera(o){
   o = RClass.inherits(this, o, FObject);
   o.__rotationX   = null;
   o.__rotationY   = null;
   o.__rotationZ   = null;
   o._position     = null;
   o._direction    = null;
   o._rotation     = null;
   o._matrix       = null;
   o._centerFront  = 0;
   o._centerBack   = 0;
   o._focalNear    = 0.1;
   o._focalFar     = 100.0;
   o._planes       = null;
   o._frustum      = null;
   o._projection   = null;
   o._viewport     = null;
   o._axisUp       = null;
   o._axisX        = null;
   o._axisY        = null;
   o._axisZ        = null;
   o.construct     = FG3dCamera_construct;
   o.position      = FG3dCamera_position;
   o.setPosition   = FG3dCamera_setPosition;
   o.matrix        = FG3dCamera_matrix;
   o.doWalk        = FG3dCamera_doWalk;
   o.doStrafe      = FG3dCamera_doStrafe;
   o.doFly         = FG3dCamera_doFly;
   o.doYaw         = FG3dCamera_doYaw;
   o.doPitch       = FG3dCamera_doPitch;
   o.lookAt        = FG3dCamera_lookAt;
   o.updateFrustum = FG3dCamera_updateFrustum;
   o.update        = FG3dCamera_update;
   return o;
}
function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__rotationX = new SQuaternion();
   o.__rotationY = new SQuaternion();
   o.__rotationZ = new SQuaternion();
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._rotation = new SQuaternion();
   o._matrix = new SMatrix3d();
   o.viewport = RClass.create(FG3dViewport);
   o.projection = RClass.create(FG3dProjection);
   o._axisUp = new SVector3();
   o._axisUp.set(0, 1, 0);
   o._axisX = new SVector3();
   o._axisY = new SVector3();
   o._axisZ = new SVector3();
}
function FG3dCamera_position(){
   return this._position;
}
function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}
function FG3dCamera_matrix(){
   return this._matrix;
}
function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}
function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o._axisY.x * p;
   o._position.z += o._axisY.z * p;
}
function FG3dCamera_doFly(p){
   var o = this;
   o._position.y += p;
}
function FG3dCamera_doYaw(p){
   var o = this;
}
function FG3dCamera_doPitch(p){
   var o = this;
}
function FG3dCamera_lookAt(x, y, z){
   var o = this;
   var p = o._position;
   o._direction.set(x - p.x, y - p.y, z - p.z);
   o._direction.normalize();
}
function FG3dCamera_updateFrustum(){
}
function FG3dCamera_update(){
   var o = this;
   var ax = o._axisX;
   var ay = o._axisY;
   var az = o._axisZ;
   az.assign(o._direction);
   az.normalize();
   o._axisUp.cross2(ax, az);
   ax.normalize();
   az.cross2(ay, ax);
   ay.normalize();
   var d = o._matrix.data();
   d[ 0] = ax.x;
   d[ 1] = ay.x;
   d[ 2] = az.x;
   d[ 3] = 0.0;
   d[ 4] = ax.y;
   d[ 5] = ay.y;
   d[ 6] = az.y;
   d[ 7] = 0.0;
   d[ 8] = ax.z;
   d[ 9] = ay.z;
   d[10] = az.z;
   d[11] = 0.0;
   d[12] = -ax.dotPoint3(o._position);
   d[13] = -ay.dotPoint3(o._position);
   d[14] = -az.dotPoint3(o._position);
   d[15] = 1.0;
}
function FG3dDirectionalLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   o._direction = null;
   o.construct = FG3dDirectionalLight_construct;
   o.direction = FG3dDirectionalLight_direction;
   return o;
}
function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._direction = new SVector3();
}
function FG3dDirectionalLight_direction(){
   return this._direction;
}
function FG3dEffect(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._program       = null;
   o.program        = FG3dEffect_program;
   o.setParameter   = FG3dEffect_setParameter;
   o.setSampler     = FG3dEffect_setSampler;
   o.drawRenderable = FG3dEffect_drawRenderable;
   o.loadUrl        = FG3dEffect_loadUrl;
   return o;
}
function FG3dEffect_program(){
   return this._program;
}
function FG3dEffect_setParameter(pn, pv, pc){
   this._program.setParameter(pn, pv, pc);
}
function FG3dEffect_setSampler(pn, pt){
   this._program.setSampler(pn, pt);
}
function FG3dEffect_drawRenderable(r){
   var o = this;
   var c = o._context;
   var p = o._program;
   c.setProgram(p);
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(vb == null){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dEffect_loadUrl(u){
   var o = this;
   var c = o._context;
   var x = RClass.create(FXmlConnection);
   var d = x.send(u);
   var p = o._program = c.createProgram();
   p.loadConfig(d);
   p.build();
   p.link();
}
function FG3dEffectConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._effects         = null;
   o._path            = "/assets/shader/";
   o._effectInfo      = null;
   o.construct        = FG3dEffectConsole_construct;
   o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
   o.find             = FG3dEffectConsole_find;
   o.findByName       = FG3dEffectConsole_findByName;
   o.findByRenderable = FG3dEffectConsole_findByRenderable;
   return o;
}
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._effects = new TDictionary();
   o._effectInfo = new SG3dEffectInfo();
}
function FG3dEffectConsole_buildEffectInfo(f, r){
   var o = this;
   var vs = r.vertexBuffers();
   var c = vs.count();
   for(var i = 0; i < c; i++){
      var v = vs.get(i);
      f.attributes[v.name()] = true;
   }
   var ts = r.textures();
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var n = ts.name(i);
      var t = ts.value(i);
      f.textures[n] = t;
   }
   var m = r.material();
}
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
function FG3dEffectConsole_findByName(c, p){
   var o = this;
   var es = o._effects;
   var e = es.get(p);
   if(e == null){
      if(p == 'skeleton'){
         e = RClass.create(FG3dSampleSkeletonEffect);
      }else{
         e = RClass.create(FG3dSampleAutomaticEffect);
      }
      e.linkContext(c);
      e._path = o._path;
      e.load();
      RLogger.info(o, 'Create effect. (name={1}, instance={2})', p, e);
      es.set(p, e);
   }
   return e;
}
function FG3dEffectConsole_findByRenderable(pc, pr){
   var o = this;
   var en = pr.material().info().effectName;
   var es = o._effects;
   var e = es.get(en);
   if(e == null){
      o.buildEffectInfo(o._effectInfo, pr);
      if(en == 'skeleton'){
         e = RClass.create(FG3dSampleSkeletonEffect);
      }else{
         e = RClass.create(FG3dSampleAutomaticEffect);
      }
      e.linkContext(pc);
      e._path = o._path;
      e.load();
      RLogger.info(o, 'Create effect. (name={1}, instance={2})', en, e);
      es.set(en, e);
   }
   return e;
}
function FG3dLight(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FG3dLightMaterial(o){
   o = RClass.inherits(this, o, FG3dBaseMaterial);
   return o;
}
function FG3dMaterial(o){
   o = RClass.inherits(this, o, FG3dBaseMaterial);
   o._textures = null;
   o.textures  = FG3dMaterial_textures;
   return o;
}
function FG3dMaterial_textures(){
   return this._textures;
}
function FG3dMaterialTexture(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   o._texture  = null;
   o.construct = FG3dMaterialTexture_construct;
   return o;
}
function FG3dMaterialTexture_construct(){
   var o = this;
}
function FG3dObject(o){
   o = RClass.inherits(this, o, FObject);
   o._context = null;
   o.linkContext = FG3dObject_linkContext;
   o.setup       = FG3dObject_setup;
   return o;
}
function FG3dObject_linkContext(c){
   this._context = c;
}
function FG3dObject_setup(){
}
function FG3dPointLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dProjection(o){
   o = RClass.inherits(this, o, FObject);
   o.width       = 0;
   o.height      = 0;
   o.angle       = 60;
   o.fieldOfView = 0;
   o.scale       = 0;
   o.znear       = 0.1;
   o.zfar        = 100;
   o._matrix     = null;
   o.construct   = FG3dProjection_construct;
   o.matrix      = FG3dProjection_matrix;
   o.update      = FG3dProjection_update;
   return o;
}
function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SPerspectiveMatrix3d();
}
function FG3dProjection_matrix(){
   return this._matrix;
}
function FG3dProjection_update(){
   var o = this;
   o.fieldOfView = RMath.DEGREE_RATE * o.angle;
   o._matrix.perspectiveFieldOfViewLH(o.fieldOfView, o.width / o.height, o.znear, o.zfar);
}
function FG3dRegion(o){
   o = RClass.inherits(this, o, FObject);
   o._camera               = null;
   o._projection           = null;
   o._directionalLight     = null
   o._renderables          = null;
   o._matrixViewProjection = null;
   o._cameraPosition       = null;
   o._lightDirection       = null;
   o.construct             = FG3dRegion_construct;
   o.matrixViewProjection  = FG3dRegion_matrixViewProjection;
   o.cameraPosition        = FG3dRegion_cameraPosition;
   o.lightDirection        = FG3dRegion_lightDirection;
   o.renderables           = FG3dRegion_renderables;
   o.pushRenderable        = FG3dRegion_pushRenderable;
   o.prepare               = FG3dRegion_prepare;
   o.update                = FG3dRegion_update;
   o.dispose               = FG3dRegion_dispose;
   return o;
}
function FG3dRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._renderables = new TObjects();
   o._matrixViewProjection = new SMatrix3d();
   o._cameraPosition = new Float32Array(3);
   o._lightDirection = new Float32Array(3);
}
function FG3dRegion_matrixViewProjection(p){
   return this._matrixViewProjection;
}
function FG3dRegion_cameraPosition(){
   return this._cameraPosition;
}
function FG3dRegion_lightDirection(){
   return this._lightDirection;
}
function FG3dRegion_renderables(p){
   return this._renderables;
}
function FG3dRegion_pushRenderable(p){
   this._renderables.push(p);
}
function FG3dRegion_prepare(){
   var o = this;
   o._matrixViewProjection.assign(o._camera.matrix());
   o._matrixViewProjection.append(o._projection.matrix());
   var cp = o._camera.position();
   o._cameraPosition[0] = cp.x;
   o._cameraPosition[1] = cp.y;
   o._cameraPosition[2] = cp.z;
   var ld = o._directionalLight.direction();
   ld.normalize();
   o._lightDirection[0] = ld.x;
   o._lightDirection[1] = ld.y;
   o._lightDirection[2] = ld.z;
   o._renderables.clear();
}
function FG3dRegion_update(){
}
function FG3dRegion_dispose(){
   var o = this;
   o._renderables = null;
   o.__base.FObject.dispose.call(o);
}
function FG3dRenderable(o){
   o = RClass.inherits(this, o, FGraphicRenderable);
   o._matrix       = null;
   o._effectName   = null;
   o._effect       = null;
   o._materialName = null;
   o._material     = null;
   o.construct     = FG3dRenderable_construct;
   o.matrix        = FG3dRenderable_matrix;
   o.effectName    = FG3dRenderable_effectName;
   o.effect        = FG3dRenderable_effect;
   o.material      = FG3dRenderable_material;
   o.testVisible   = RMethod.virtual(o, 'testVisible');
   o.update        = FG3dRenderable_update;
   return o;
}
function FG3dRenderable_construct(){
   var o = this;
   o.__base.FGraphicRenderable.construct.call(o);
   o._matrix = new SMatrix3d();
   o._material = RClass.create(FG3dMaterial);
}
function FG3dRenderable_matrix(){
   return this._matrix;
}
function FG3dRenderable_effectName(){
   return this._effectName;
}
function FG3dRenderable_effect(){
   return this._effect;
}
function FG3dRenderable_setEffect(p){
   this._effect = p;
}
function FG3dRenderable_material(){
   return this._material;
}
function FG3dRenderable_update(p){
   var o = this;
   o._matrix.assign(p);
}
function FG3dShader(o){
   o = RClass.inherits(this, o, FG3dObject);
   o.source = null;
   return o;
}
function FG3dSpotLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dTechnique(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name      = null;
   o._passes    = null;
   o.construct  = FG3dTechnique_construct;
   o.name       = FG3dTechnique_name;
   o.drawRegion = FG3dTechnique_drawRegion;
   return o;
}
function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._passes = new TObjects();
}
function FG3dTechnique_name(){
   return this._name;
}
function FG3dTechnique_drawRegion(r){
   var o = this;
   var ps = o._passes;
   var c = ps.count();
   for(var n = 0; n < c; n++){
      var p = ps.get(n);
      p.drawRegion(r);
   }
   o._context.present();
}
function FG3dTechniqueConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._techniques = null;
   o.construct   = FG3dTechniqueConsole_construct;
   o.find        = FG3dTechniqueConsole_find;
   return o;
}
function FG3dTechniqueConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._techniques = new TDictionary();
}
function FG3dTechniqueConsole_find(c, p){
   var o = this;
   var n = RClass.name(p);
   var t = o._techniques.get(n);
   if(t == null){
      t = RClass.createByName(n);
      t.linkContext(c);
      t.setup();
      o._techniques.set(n, t);
   }
   return t;
}
function FG3dTechniquePass(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name      = null;
   o.name       = FG3dTechniquePass_name;
   o.drawRegion = FG3dTechniquePass_drawRegion;
   return o;
}
function FG3dTechniquePass_name(){
   return this._name;
}
function FG3dTechniquePass_drawRegion(p){
   var o = this;
   var ec = RConsole.find(FG3dEffectConsole);
   var rs = p.renderables();
   var c = rs.count();
   for(var n = 0; n < c; n++){
      var r = rs.get(n);
      var e = r.effect();
      if(e == null){
         e = ec.findByRenderable(o._context, r);
      }
      o._context.setProgram(e.program());
      e.drawRenderable(p, r);
   }
}
function FG3dTexture(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._textureCd  = EG3dTexture.Unknown;
   o._statusLoad = false;
   o.textureCd   = FG3dTexture_textureCd;
   return o;
}
function FG3dTexture_textureCd(){
   return this._textureCd;
}
function FG3dTrack(o){
   o = RClass.inherits(this, o, FObject);
   o._frames = null;
   o.construct = FG3dTrack_construct;
   o.calculate = FG3dTrack_calculate;
   return o;
}
function FG3dTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FG3dTrack_update(p){
   var o = this;
   var info = new SG3dFrameInfo();
   o._trackResource.calculateFrameInfo(info, tick);
   info.update();
   o._matrix.assign(o._trackResource.matrixInvert());
   o._matrix.append(info.matrix);
   return true;
}
function FG3dTrack_calculate(tick){
   var o = this;
   var frameCount = o._frames.count();
   if(frameCount == 0){
      return false;
   }
   if(tick < 0){
      tick = -tick;
   }
   var pCurrentFrame = o._frames.Get(index);
   var pNextFrame = null;
   if(index < frameCount -1){
      pNextFrame = o._frames.Get(index + 1);
   }else{
      pNextFrame = o._frames.Get(0);
   }
   info.tick = tick;
   info.currentFrame = pCurrentFrame;
   info.nextFrame = pNextFrame;
   return true;
}
function FG3dViewport(o){
   o = RClass.inherits(this, o, FObject);
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   o.set    = FG3dViewport_set;
   return o;
}
function FG3dViewport_set(l, t, w, h){
   var o = this;
   o.left = l;
   o.top = t;
   o.width = w;
   o.height= h;
}
var REngine3d = new function REngine3d(){
   var o = this;
   o.contexts = new TObjects();
   o.createContext = REngine3d_createContext;
   return o;
}
function REngine3d_createContext(c, h){
   var o = this;
   var r = RClass.create(c);
   r.linkCanvas(h);
   o.contexts.push(r);
   return r;
}
function SG3dEffectInfo(o){
   if(!o){o = this;}
   o._code                 = null;
   o.fillModeCd            = EG3dFillMode.Fill;
   o.optionCullMode        = true;
   o.cullModeCd            = EG3dCullMode.Front;
   o.optionDepthTest       = true;
   o.depthModeCd           = EG3dDepthMode.Less;
   o.optionDepthWrite      = true;
   o.optionBlendMode       = false;
   o.blendSourceMode       = EG3dBlendMode.SourceAlpha;
   o.blendTargetMode       = EG3dBlendMode.OneMinusSourceAlpha;
   o.optionAlphaTest       = false;
   o.supportInstance       = false;
   o.vertexColor           = false;
   o.vertexCoord           = false;
   o.vertexNormal          = false;
   o.vertexNormalFull      = false;
   o.vertexSkeleton        = false;
   o.fragmentAlpha         = false;
   o.fragmentBump          = false;
   o.fragmentAmbient       = false;
   o.fragmentDiffuse       = false;
   o.fragmentDiffuseView   = false;
   o.fragmentSpecularColor = false;
   o.fragmentSpecularLevel = false;
   o.fragmentSpecularView  = false;
   o.fragmentEnvironment   = false;
   o.fragmentLight         = false;
   o.fragmentReflect       = false;
   o.fragmentRefract       = false;
   o.fragmentEmissive      = false;
   o.fragmentHeight        = false;
   o.attributes            = new Object();
   o.textures              = new Object();
   o.code                  = SG3dEffectInfo_code;
   return o;
}
function SG3dEffectInfo_code(p){
   var o = this;
}
function SG3dMaterialInfo(o){
   if(!o){o = this;}
   o.effectName    = null;
   o.transformName = null;
   o.optionLight = null;
   o.optionMerge = null;
   o.optionSort = null;
   o.sortLevel = null;
   o.optionAlpha = null;
   o.optionDepth = null;
   o.optionCompare = null;
   o.optionDouble = null;
   o.optionShadow = null;
   o.optionShadowSelf = null;
   o.optionDynamic = null;
   o.optionTransmittance = null;
   o.optionOpacity = null;
   o.coordRateWidth  = 1.0;
   o.coordRateHeight = 1.0;
   o.colorMin        = 0.0;
   o.colorMax        = 1.0;
   o.colorRate       = 1.0;
   o.colorMerge      = 1.0;
   o.alphaBase       = 1.0;
   o.alphaRate       = 1.0;
   o.alphaLevel      = 1.0;
   o.alphaMerge      = 1.0;
   o.ambientColor         = new SColor4();
   o.ambientShadow        = 1.0;
   o.diffuseColor         = new SColor4();
   o.diffuseShadow        = 1.0;
   o.diffuseViewColor     = new SColor4();
   o.diffuseViewShadow    = 1.0;
   o.specularColor        = new SColor4();
   o.specularBase         = 1.0;
   o.specularRate         = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   o.specularInfo         = null;
   o.specularViewColor    = new SColor4();
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   o.specularViewShadow   = null;
   o.reflectColor         = new SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   o.refractFrontColor    = new SColor4();
   o.refractBackColor     = new SColor4();
   o.opacityColor         = new SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
   o.emissiveColor        = new SColor4();
   o.assign = SG3dMaterialInfo_assign;
   o.reset  = SG3dMaterialInfo_reset;
   return o;
}
function SG3dMaterialInfo_assign(p){
   var o = this;
   o.effectName = p.effectName;
   o.transformName = p.transformName;
   o.optionLight = p.optionLight;
   o.optionMerge = p.optionMerge;
   o.optionDepth = p.optionDepth;
   o.optionCompare = p.optionCompare;
   o.optionAlpha = p.optionAlpha;
   o.optionDouble = p.optionDouble;
   o.optionOpacity = p.optionOpacity;
   o.optionShadow = p.optionShadow;
   o.optionShadowSelf = p.optionShadowSelf;
   o.optionTransmittance = p.optionTransmittance;
   o.sortLevel = p.sortLevel;
   o.colorMin = p.colorMin;
   o.colorMax = p.colorMax;
   o.colorRate = p.colorRate;
   o.colorMerge = p.colorMerge;
   o.alphaBase = p.alphaBase;
   o.alphaRate = p.alphaRate;
   o.alphaLevel = p.alphaLevel;
   o.alphaMerge = p.alphaMerge;
   o.ambientColor.assign(p.ambientColor);
   o.ambientShadow = p.ambientShadow;
   o.diffuseColor.assign(p.diffuseColor);
   o.diffuseShadow = p.diffuseShadow;
   o.diffuseViewColor.assign(p.diffuseViewColor);
   o.diffuseViewShadow = p.diffuseViewShadow;
   o.specularColor.assign(p.specularColor);
   o.specularBase = p.specularBase;
   o.specularRate = p.specularRate;
   o.specularAverage = p.specularAverage;
   o.specularShadow = p.specularShadow;
   o.specularViewColor.assign(p.specularViewColor);
   o.specularViewBase = p.specularViewBase;
   o.specularViewRate = p.specularViewRate;
   o.specularViewAverage = p.specularViewAverage;
   o.specularViewShadow = p.specularViewShadow;
   o.reflectColor.assign(p.reflectColor);
   o.reflectMerge = p.reflectMerge;
   o.reflectShadow = p.reflectShadow;
   o.refractFrontColor.assign(p.refractFrontColor);
   o.refractFrontMerge = p.refractFrontMerge;
   o.refractFrontShadow = p.refractFrontShadow;
   o.refractBackColor.assign(p.refractBackColor);
   o.refractBackMerge = p.refractBackMerge;
   o.refractBackShadow = p.refractBackShadow;
   o.opacityColor.assign(p.opacityColor);
   o.opacityRate = p.opacityRate;
   o.opacityAlpha = p.optionAlpha;
   o.opacityDepth = p.optionDepth;
   o.opacityTransmittance = p.optionTransmittance;
   o.emissiveColor.assign(p.emissiveColor);
}
function SG3dMaterialInfo_reset(){
   var o = this;
   o.coordRateWidth = 1.0;
   o.coordRateHeight = 1.0;
   o.colorMin = 0.0;
   o.colorMax = 1.0;
   o.colorRate = 1.0;
   o.colorMerge = 1.0;
   o.alphaBase = 1.0;
   o.alphaRate = 1.0;
   o.alphaLevel = 1.0;
   o.alphaMerge = 1.0;
   o.ambientColor.set(1.0, 1.0, 1.0, 1.0);
   o.ambientShadow = 1.0;
   o.diffuseColor.set(1.0, 1.0, 1.0, 1.0);
   o.diffuseShadow = 1.0;
   o.diffuseViewColor.set(1.0, 1.0, 1.0, 1.0);
   o.diffuseViewShadow = 1.0;
   o.specularColor.set(1.0, 1.0, 1.0, 1.0);
   o.specularBase = 1.0;
   o.specularRate = 1.0;
   o.specularAverage = 1.0;
   o.specularShadow = 1.0;
   o.specularViewColor.set(1.0, 1.0, 1.0, 1.0);
   o.specularViewBase = 1.0;
   o.specularViewRate = 1.0;
   o.specularViewAverage = 1.0;
   o.specularViewShadow = 1.0;
   o.reflectColor.set(1.0, 1.0, 1.0, 1.0);
   o.reflectMerge = 1.0;
   o.reflectShadow = 1.0;
   o.refractFrontColor.set(1.0, 1.0, 1.0, 1.0);
   o.refractFrontMerge = 1.0;
   o.refractFrontShadow = 1.0;
   o.refractBackColor.set(1.0, 1.0, 1.0, 1.0);
   o.refractBackMerge = 1.0;
   o.refractBackShadow = 1.0;
   o.opacityColor.set(1.0, 1.0, 1.0, 1.0);
   o.opacityRate = 1.0;
   o.opacityAlpha = 1.0;
   o.opacityDepth = 1.0;
   o.opacityTransmittance = 1.0;
   o.emissiveColor.set(1.0, 1.0, 1.0, 1.0);
}
