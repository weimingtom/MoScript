//==========================================================
// <T>渲染地球立方体。</T>
//
// @class
// @author maocy
// @history 150207
//==========================================================
MO.FEaiEarthFlat = function FEaiEarthFlat(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay, MO.MProcessReady);
   //..........................................................
   // @attribute
   o._textureCloud  = MO.Class.register(o, new MO.AGetter('_textureCloud'));
   o._textureLand   = MO.Class.register(o, new MO.AGetter('_textureLand'));
   o._textureOcean  = MO.Class.register(o, new MO.AGetter('_textureOcean'));
   o._textureWater  = MO.Class.register(o, new MO.AGetter('_textureWater'));
   //..........................................................
   // @method
   o.onProcessReady = MO.FEaiEarthFlat_onProcessReady;
   //..........................................................
   // @method
   o.construct      = MO.FEaiEarthFlat_construct;
   // @method
   o.setup          = MO.FEaiEarthFlat_setup;
   o.drawBoundary   = MO.FEaiEarthFlat_drawBoundary;
   o.process        = MO.FEaiEarthFlat_process;
   // @method
   o.dispose        = MO.FEaiEarthFlat_dispose;
   return o;
}

//==========================================================
// <T>绘制边线。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_drawBoundary = function FEaiEarthFlat_drawBoundary(handle, boundaryData, scaleX, scaleY, centerX, centerY, lineWidth, lineColor){
   var o = this;
   var positionCount = boundaryData.positionCount();
   var positions = boundaryData.positions();
   handle.beginPath();
   handle.moveTo(positions[0] * scaleX + centerX ,-positions[1] * scaleY + centerY);
   for(var n = 0; n < positionCount; n++){
      var x = positions[2 * n] * scaleX + centerX;
      var y = -positions[2 * n + 1] * scaleY + centerY;
      handle.lineTo(x,y);
   }
   handle.closePath();
   handle.lineWidth = lineWidth;
   handle.strokeStyle = lineColor;
   handle.stroke();
}

//==========================================================
// <T>准备处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_onProcessReady = function FEaiEarthFlat_onProcessReady(){
   var o = this;
   //..........................................................
   // 加载海洋纹理
   var loader = o._textureCloudLoader;
   o._textureCloud = loader.pickTexture();
   o._textureCloudLoader = MO.Lang.Object.dispose(loader);
   //..........................................................
   // 加载陆地纹理
   var image = o._imageLand;
   var context = o._graphicContext;
   var size = image.size();
   var sizeWidth = size.width;
   var sizeHeight = size.height;
   // 创建画板
   var canvas = MO.Class.create(MO.FE2dCanvas);
   canvas.size().assign(size);
   canvas.build(MO.Window._hDocument);
   var context2d = canvas.graphicContext();
   var handle = context2d._handle;
   context2d.drawImage(image, 0, 0, sizeWidth, size.height);
   handle.lineCap = 'round';
   var scaleX = sizeWidth / 360;
   var scaleY = sizeHeight / 180;
   var centerX = sizeWidth * 0.5;
   var centerY = sizeHeight * 0.5;
   var countries = o._worldResource.data().countries();
   var count = countries.count();
   for(var k = 0; k < count; k++){
      var country = countries.at(k);
      var lineWidth = 1;
      var lineColor = "#0085E6";
      if(country.code() == 'China'){
         lineWidth = 4;
         lineColor = "#004596";
      }
      var boundaries = country.boundaries();
      var boundaryCount = boundaries.count();
      for(var j = 0; j < boundaryCount; j++){
         var boundary = boundaries.at(j);
         if(MO.Class.isClass(boundary, MO.FEaiMapBoundaryData)){
            o.drawBoundary(handle, boundary, scaleX, scaleY, centerX, centerY, lineWidth, lineColor);
         }else{
            var boundaryDatas = boundary.items();
            var boundaryDataCount = boundaryDatas.count();
            for(var i = 0; i < boundaryDataCount; i++){
               var boundaryData = boundaryDatas.at(i);
               o.drawBoundary(handle, boundaryData, scaleX, scaleY, centerX, centerY, lineWidth, lineColor);
            }
         }
      }
   }
   //handle.fillStyle = "rgba(8, 13, 25, 0.63)";
   //handle.fill();
   // 创建纹理
   var texture = o._textureLand = context.createFlatTexture();
   texture.setCode('land');
   texture.upload(canvas);
   // 释放数据
   canvas.dispose();
   image.dispose();
   o._imageLand = null;
   //..........................................................
   // 加载海洋纹理
   var loader = o._textureOceanLoader;
   o._textureOcean = loader.pickTexture();
   o._textureOceanLoader = MO.Lang.Object.dispose(loader);
   //..........................................................
   // 加载水纹纹理
   var loader = o._textureWaterLoader;
   o._textureWater = loader.pickTexture();
   o._textureWaterLoader = MO.Lang.Object.dispose(loader);
   // 加载水纹纹理
   var loader = o._textureWaterNormalLoader;
   o._textureWaterNormal = loader.pickTexture();
   o._textureWaterNormalLoader = MO.Lang.Object.dispose(loader);
   //..........................................................
   // 设置矩形
   var rectangle = o._rectangle;
   rectangle.pushTexture(o._textureCloud);
   rectangle.pushTexture(o._textureLand);
   rectangle.pushTexture(o._textureOcean);
   rectangle.pushTexture(o._textureWater);
   rectangle.pushTexture(o._textureWaterNormal);
   o.pushRenderable(rectangle);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_construct = function FEaiEarthFlat_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o.__base.MProcessReady.construct.call(o);
   // 设置属性
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_setup = function FEaiEarthFlat_setup(){
   var o = this;
   // 加载国家信息
   var resourceConsole = MO.Console.find(MO.FEaiResourceConsole);
   var worldResource = o._worldResource = resourceConsole.mapModule().loadWorld();
   o._readyLoader.push(worldResource);
   //..........................................................
   // 加载水波纹
   var loader = o._textureCloudLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'cloud');
   loader.loadUrl('{eai.resource}/world/cloud1024.jpg');
   o._readyLoader.push(loader);
   // 加载陆地
   var image = o._imageLand = MO.Class.create(MO.FImage);
   var qualityCd = MO.Desktop.qualityCd();
   if(qualityCd == MO.EGraphicQuality.Highest){
      image.loadUrl('{eai.resource}/world/land4096.png');
   }else{
      image.loadUrl('{eai.resource}/world/land2048.png');
   }
   o._readyLoader.push(image);
   // 加载海洋
   var loader = o._textureOceanLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'ocean');
   loader.loadUrl('{eai.resource}/world/ocean2048.jpg');
   o._readyLoader.push(loader);
   // 加载水波纹
   var loader = o._textureWaterLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'water');
   loader.loadUrl('{eai.resource}/world/water.jpg');
   o._readyLoader.push(loader);
   // 加载水法线波纹
   var loader = o._textureWaterNormalLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'water_normal');
   loader.loadUrl('{eai.resource}/world/water-normal.png');
   o._readyLoader.push(loader);
   //..........................................................
   // 创建矩形
   var rectangle = o._rectangle = MO.Class.create(MO.FE3dRectangleArea);
   //rectangle.setCoordFlip(true);
   rectangle.linkGraphicContext(o);
   rectangle.setup();
   rectangle.material().info().effectCode = 'eai.earth.flat';
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_process = function FEaiEarthFlat_process(){
   var o = this;
   o.__base.FE3dDisplay.process.call(o);
   // 测试状态
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   // 逻辑处理
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MFrameProcessor_dispose = function MFrameProcessor_dispose(){
   var o = this;
   // 父处理
   o.__base.MProcessReady.dispose.call(o);
   o.__base.FE3dDisplay.dispose.call(o);
}