//==========================================================
// <T>WebGL渲染环境。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglContext(o){
   o = RClass.inherits(this, o, FRenderContext);
   //..........................................................
   // @attribute
   o._native             = null;
   o._textureActiveSlot  = 0;
   //..........................................................
   // @method
   o.linkCanvas          = FWglContext_linkCanvas;
   //..........................................................
   // @method
   o.createProgram       = FWglContext_createProgram;
   o.createVertexBuffer  = FWglContext_createVertexBuffer;
   o.createIndexBuffer   = FWglContext_createIndexBuffer;
   o.createFlatTexture   = FWglContext_createFlatTexture;
   o.createCubeTexture   = FWglContext_createCubeTexture;
   // @method
   o.setViewPort         = FWglContext_setViewPort;
   o.setFillMode         = FWglContext_setFillMode;
   o.setDepthMode        = FWglContext_setDepthMode;
   o.setCullingMode      = FWglContext_setCullingMode;
   o.setBlendFactors     = FWglContext_setBlendFactors;
   o.setScissorRectangle = FWglContext_setScissorRectangle;
   o.setProgram          = FWglContext_setProgram;
   // @method
   o.bindConst           = FWglContext_bindConst;
   o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
   o.bindTexture         = FWglContext_bindTexture;
   // @method
   o.clear               = FWglContext_clear;
   o.drawTriangles       = FWglContext_drawTriangles;
   o.present             = FWglContext_present;
   // @method
   o.checkError          = FWglContext_checkError;
   return o;
}

//==========================================================
// <T>关联页面画布标签。</T>
//
// @method
// @param h:hCanvas:HtmlCanvasTag 页面画布标签
//==========================================================
function FWglContext_linkCanvas(h){
   //this._native = h.getContext('webgl')
   this._native = h.getContext('experimental-webgl')
}

//==========================================================
// <T>创建渲染程序。</T>
//
// @method
// @return FProgram3d 顶点缓冲
//==========================================================
function FWglContext_createProgram(){
   var o = this;
   var r = RClass.create(FWglProgram);
   r.linkContext(o);
   r.setup();
   return r;
}

//==========================================================
// <T>创建顶点缓冲。</T>
//
// @method
// @return FVertexBuffer3d 顶点缓冲
//==========================================================
function FWglContext_createVertexBuffer(){
   var o = this;
   var r = RClass.create(FWglVertexBuffer);
   r.linkContext(o);
   r.setup();
   return r;
}

//==========================================================
// <T>创建索引缓冲。</T>
//
// @method
// @return FIndexBuffer3d 索引缓冲
//==========================================================
function FWglContext_createIndexBuffer(){
   var o = this;
   var r = RClass.create(FWglIndexBuffer);
   r.linkContext(o);
   r.setup();
   return r;
}

//==========================================================
// <T>创建平面渲染纹理。</T>
//
// @method
// @return FRenderFlatTexture 平面渲染纹理
//==========================================================
function FWglContext_createFlatTexture(){
   var o = this;
   var r = RClass.create(FWglFlatTexture);
   r.linkContext(o);
   r.setup();
   return r;
}

//==========================================================
// <T>创建立方渲染纹理。</T>
//
// @method
// @return FRenderCubeTexture 立方渲染纹理
//==========================================================
function FWglContext_createCubeTexture(){
   var o = this;
   var r = RClass.create(FWglCubeTexture);
   r.linkContext(o);
   r.setup();
   return r;
}

//============================================================
// <T>设置视角大小。</T>
//
// @param w:width:Integer 宽度
// @param h:height:Integer 高度
//============================================================
function FWglContext_setViewPort(w, h){
   var g = this._native;
   g.viewportWidth = w;
   g.viewportHeight = h;
   g.viewport(0, 0, w, h);
}

//============================================================
// <T>设置填充模式。</T>
//
// @param fillModeCd 填充模式
// @return 处理结果
//============================================================
function FWglContext_setFillMode(){
}

//============================================================
// <T>设置深度模式。</T>
//
// @param f:depthFlag:Boolean 深度开关
// @param v:depthCd:ERenderDepthMode 深度模式
// @return 处理结果
//============================================================
function FWglContext_setDepthMode(f, v){
   var o = this;
   var g = o._native;
   // 检查状态
   if((o._optionDepth == f) && (o._depthModeCd == v)){
      return true;
   }
   // 设置开关
   if(o._optionDepth != f){
      if(f){
         g.enable(g.DEPTH_TEST);
      }else{
         g.disable(g.DEPTH_TEST);
      }
      o._optionDepth = f;
   }
   // 设置内容
   if(f && (o._depthModeCd != v)){
      var r = RWglUtility.convertDepthMode(g, v);
      g.depthFunc(r);
      o._depthModeCd = v;
   }
   return true;
}

//============================================================
// <T>设置剪裁模式。</T>
//
// @param f:cullFlag:Boolean 剪裁开关
// @param v:cullCd:ERenderCullMode 剪裁模式
// @return 处理结果
//============================================================
function FWglContext_setCullingMode(f, v){
   var o = this;
   var g = o._native;
   // 检查状态
   if((o._optionCull == f) && (o._optionCull == v)){
      return true;
   }
   // 设置开关
   if(o._optionCull != f){
      if(f){
         g.enable(g.CULL_FACE);
      }else{
         g.disable(g.CULL_FACE);
      }
      o._optionCull = f;
   }
   // 设置内容
   if(f && (o._cullModeCd != v)){
      var r = RWglUtility.convertCullMode(g, v);
      g.cullFace(r);
      o._cullModeCd = v;
   }
   return true;
}

//============================================================
// <T>设置融合方式。</T>
//
// @param f:blendFlag:Boolean 剪裁开关
// @param vs:sourceCd:ERenderBlendMode 来源融合模式
// @param vt:tagetCd:ERenderBlendMode 目标融合模式
// @return 处理结果
//============================================================
function FWglContext_setBlendFactors(f, vs, vt){
   var o = this;
   var g = o._native;
   // 检查状态
   if((o._statusBlend == f) && (o._blendSourceCd == vs) && (o._blendTargetCd == vt)){
      return true;
   }
   // 设置开关
   if(o._statusBlend != f){
      if(f){
         g.enable(g.BLEND);
      }else{
         g.disable(g.BLEND);
      }
      o._statusBlend = f;
   }
   // 设置效果
   if(f && ((o._blendSourceCd != vs) || (o._blendTargetCd != vt))){
      var gs = RWglUtility.convertBlendFactors(g, vs);
      var gt = RWglUtility.convertBlendFactors(g, vt);
      g.blendFunc(gs, gt);
      o._blendSourceCd = vs;
      o._blendTargetCd = vt;
   }
   return true;
}

//============================================================
// <T>设置有效区域。</T>
//
// @param l:left:Integer 左位置
// @param t:top:Integer 上位置
// @param w:width:Integer 宽度
// @param h:height:Integer 高度
// @return 处理结果
//============================================================
function FWglContext_setScissorRectangle(l, t, w, h){
   this._native.scissor(l, t, w, h);
}

//============================================================
// <T>设置渲染程序。</T>
//
// @param v:program:FRenderProgram 渲染程序
//============================================================
function FWglContext_setProgram(v){
   var o = this;
   var g = o._native;
   // 设置程序
   if(v != null){
      g.useProgram(v._native);
   }else{
      g.useProgram(null);
   }
   _program = v;
   // 检查错误
   var r = o.checkError("useProgram", "Set program failure. (program={1}, program_id={2})", v, v._native);
   return r;
}

//============================================================
// <T>绑定常量数据。</T>
//
// @param shaderCd 渲染类型
// @param slot 插槽
// @param pd:data:Float32Array 数据
// @param length 长度
// @return Boolean 处理结果
//============================================================
function FWglContext_bindConst(shaderCd, slot, formatCd, pd, length){
   var o = this;
   var g = o._native;
   var r = true;
   // 检查变更
   //TBool changed = UpdateConsts(shaderCd, slot, pData, length);
   //if(!changed){
   //   return EContinue;
   //}
   // 修改数据
   switch (formatCd){
      case ERenderParameterFormat.Float1:{
         // 检查长度
         if(length % 4 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         // 修改数据
         var count = length / 4;
         g.uniform1fv(slot, count, pd);
         // 检查错误
         r = o.checkError("uniform1fv", "Bind const data failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float2:{
         // 检查长度
         if(length % 8 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         // 修改数据
         var count = length / 8;
         g.uniform2fv(slot, count, pd);
         // 检查错误
         r = o.checkError("uniform2fv", "Bind const data failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float3:{
         // 检查长度
         if(length % 12 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=d)", length);
            return false;
         }
         // 修改数据
         var count = length / 12;
         g.uniform3fv(slot, count, pd);
         // 检查错误
         r = o.checkError("uniform3fv", "Bind const data failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float4:{
         // 检查长度
         if(length % 16 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         // 修改数据
         var count = length / 16;
         g.uniform4fv(slot, count, pd);
         // 检查错误
         r = o.checkError("uniform4fv", "Bind const data failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float3x3:{
         // 检查长度
         if(length % 36 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         // 修改数据
         var count = length / 36;
         g.uniformMatrix3fv(slot, count, false, pd);
         // 检查错误
         r = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float4x3:{
         // 检查长度
         if(length % 48 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         // 修改数据
         var count = length / 48;
         g.uniform4fv(slot, count * 3, pd);
         //glUniformMatrix4x3fv(slot, count, GL_FALSE, (const GLfloat*)pData);
         // 检查错误
         r = o.checkError("uniform4fv", "Bind const matrix4x3 failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float4x4:{
         // 检查长度
         if(length % 64 != 0){
            RLogger.fatal(o, null, "Float4x4 length is invalid. (length=%d)", length);
            return false;
         }
         // 修改数据
         var count = length >> 6;
         //g.uniformMatrix4fv(slot, false, pd);
         var dt = new Float32Array(16);
         dt[ 0] = pd[ 0];
         dt[ 1] = pd[ 4];
         dt[ 2] = pd[ 8];
         dt[ 3] = pd[12];
         dt[ 4] = pd[ 1];
         dt[ 5] = pd[ 5];
         dt[ 6] = pd[ 9];
         dt[ 7] = pd[13];
         dt[ 8] = pd[ 2];
         dt[ 9] = pd[ 6];
         dt[10] = pd[10];
         dt[11] = pd[14];
         dt[12] = pd[ 3];
         dt[13] = pd[ 7];
         dt[14] = pd[11];
         dt[15] = pd[15];
         g.uniformMatrix4fv(slot, false, dt);
         // 检查错误
         r = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
   }
   return r;
}

//============================================================
// <T>绑定顶点缓冲。</T>
//
// @param s:slot:Integer 插槽
// @param b:vertexBuffer:FRenderVertexBuffer 顶点缓冲
// @param i:offset:Integer 偏移位置
// @param f:formatCd:String 格式
//============================================================
function FWglContext_bindVertexBuffer(s, b, i, f){
   var o = this;
   var g = o._native;
   var r = true;
   // 设定顶点流
   var n = null;
   if(b != null){
      n = b._native;
   }
   g.bindBuffer(g.ARRAY_BUFFER, n);
   // 检查错误
      r = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", n);
   //............................................................
   // 激活顶点流
   if(b != null){
      g.enableVertexAttribArray(s);
      r = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", s);
      if(!r){
         return r;
      }
   }else{
      g.disableVertexAttribArray(s);
      r = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", s);
      return r;
   }
   //............................................................
   // 设置顶点流
   var bs = b.stride;
   switch(f){
      case ERenderAttributeFormat.Float1:
         g.vertexAttribPointer(s, 1, g.FLOAT, false, bs, i);
         break;
      case ERenderAttributeFormat.Float2:
         g.vertexAttribPointer(s, 2, g.FLOAT, false, bs, i);
         break;
      case ERenderAttributeFormat.Float3:
         g.vertexAttribPointer(s, 3, g.FLOAT, false, bs, i);
         break;
      case ERenderAttributeFormat.Float4:
         g.vertexAttribPointer(s, 4, g.FLOAT, false, bs, i);
         break;
      case ERenderAttributeFormat.Byte4:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, false, bs, i);
         break;
      case ERenderAttributeFormat.Byte4Normal:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, true, bs, i);
         break;
      default:
         RLogger.fatal(o, null, "Unknown vertex format. (format_cd=%d)", formatCd);
         break;
   }
   // 检查错误
   r = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", s, f);
   // MO_INFO("Bind vertex buffer. (slot=%d, offset=%d, format_cd=%d, stride=%d, buffer_id=%d, count=%d, length=%d)", slot, offset, formatCd, stride, bufferId, pVertexBuffer->Count(), pVertexBuffer->DataLength());
   return r;
}

//============================================================
// <T>绑定纹理。</T>
//
// @param ps:slo:Integert 插槽
// @param pi:index:Integer 索引
// @param pt:texture:FRenderTexture 纹理
// @return 处理结果
//============================================================
function FWglContext_bindTexture(ps, pi, pt){
   var o = this;
   var g = o._native;
   var r = true;
   //............................................................
   // 空纹理处理
   if(pt == null){
      g.bindTexture(g.TEXTURE_2D, null);
      r = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", ps);
      return r;
   }
   //............................................................
   // 激活纹理
   if(o._textureActiveSlot != ps){
      g.uniform1i(ps, pi);
      g.activeTexture(g.TEXTURE0 + pi);
      r = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", ps, pi);
      if(!r){
         return r;
      }
      o._renderTextureActiveSlot = ps;
   }
   //............................................................
   // 绑定纹理
   switch(pt.textureCd){
      case ERenderTexture.Flat2d:{
         g.bindTexture(g.TEXTURE_2D, pt._native);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
         r = o.checkError("glBindTexture", "Bind texture failure. (texture_id=%d)", pt._native);
         if(!r){
            return r;
         }
         break;
      }
      case ERenderTexture.Cube:{
         g.bindTexture(g.TEXTURE_CUBE_MAP, pt._native);
         r = o.checkError("glBindTexture", "Bind texture failure. (texture_id=%d)", pt._native);
         if(!r){
            return r;
         }
         break;
      }
      default:{
         RLogger.fatal(o, null, "Unknown texture type.");
         break;
      }
   }
   return result;
}

//============================================================
// <T>清空内容。</T>
//
// @param r:red:Float 红色
// @param g:green:Float 绿色
// @param b:blue:Float 蓝色
// @param a:alpha:Float 透明
// @param d:depth:Float 深度
// @return 处理结果
//============================================================
function FWglContext_clear(r, g, b, a, d){
   var o = this;
   var g = o._native;
   g.clearColor(r, g, b, a);
   g.clearDepth(d);
   g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
   return true;
}

//============================================================
// <T>绘制三角形。</T>
//
// @param b:indexBuffer:FIndexBuffer3d 索引缓冲
// @param i:offset:Integer 开始位置
// @param c:count:Integer 索引总数
//============================================================
function FWglContext_drawTriangles(b, i, c){
   var o = this;
   var g = o._native;
   var r = true;
   // 设置参数
   if(i == null){
      i = 0;
   }
   if(c == null){
      c = b.count;
   }
   // 绘制索引流
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, b._native);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", b, i, c, b._native);
   if(!r){
       return r;
   }
   var strideCd = RWglUtility.convertIndexStride(g, b.strideCd);
   g.drawElements(g.TRIANGLES, c, strideCd, 2 * i);
   r = o.checkError("drawElements", "Draw triangles failure. (index=0x%08X, offset=%d, count=%d)", b, i, c);
   if(!r){
       return r;
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, null);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d)", b, i, c);
   if(!r){
       return r;
   }
   return r;
}

//============================================================
// <T>绘制处理。</T>
//
// @return 处理结果
//============================================================
function FWglContext_present(){
}

//============================================================
// <T>检查执行错误。</T>
//
// @param c:code:String 代码
// @param m:message:String 消息
// @param p1:parameter1:String 参数1
//============================================================
function FWglContext_checkError(c, m, p1){
   // 检查运行模式
   if(!RRuntime.isDebug()){
      return true;
   }
   // 获得错误原因
   var o = this;
   var g = o._native;
   var r = false;
   var e = null;
   var es = null;
   while(true){
      // 获得错误
      e = g.getError();
      if(e == g.NO_ERROR){
         r = true;
         break;
      }
      // 获得原因
      switch(e){
         case g.INVALID_OPERATION:
            es = "Invalid operation.";
            break;
         case g.INVALID_ENUM:
            es = "Invalid enum.";
            break;
         case g.INVALID_VALUE:
            es = "Invalid value.";
            break;
         case g.INVALID_FRAMEBUFFER_OPERATION:
            es = "Invalid paramebuffer opeartion."; 
            break;
         case g.OUT_OF_MEMORY:
            es = "Out of memory.";
            break;
         default:
            es = "Unknown"; 
            break;
      }
   }
   //............................................................
   // 输出错误信息
   if(!r){
      RLogger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', e, es);
   }
   return r;
}
