//==========================================================
// <T>加载和保存属性的接口。</T>
//
// @face
// @author maocy
// @version 150806
//==========================================================
MO.MPersistence = function MPersistence(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.unserialize       = MO.MPersistence_unserialize;
   o.unserializeBuffer = MO.MPersistence_unserializeBuffer;
   o.serialize         = MO.MPersistence_serialize;
   o.serializeBuffer   = MO.MPersistence_serializeBuffer;
   return o;
}

//==========================================================
// <T>从输入流中反序列化数据内容。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.MPersistence_unserialize = function MPersistence_unserialize(input){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Persistence);
   var count = annotations.count();
   for(var n = 0; n < count; n++){
      var annotation = annotations.at(n);
      var dateCd = annotation.dataCd();
      var name = annotation.name();
      if(dateCd == MO.EDataType.Object){
         // 读取对象
         var items = o[name];
         if(!items){
            items = o[name] = annotation.newInstance();
         }
         item.unserialize(input);
      }else if(dateCd == MO.EDataType.Objects){
         // 读取对象集合
         var items = o[name];
         if(!items){
            items = o[name] = new MO.TObjects();
         }
         items.clear();
         var itemCount = input.readInt32();
         for(var i = 0; i < itemCount; i++){
            var item = annotation.newInstance();
            item.unserialize(input);
            items.push(item);
         }
      }else if(dateCd == MO.EDataType.Dictionary){
         // 读取对象字典
         var items = o[name];
         if(!items){
            items = o[name] = new MO.TDictionary();
         }
         items.clear();
         var itemCount = input.readInt32();
         for(var i = 0; i < itemCount; i++){
            var item = annotation.newInstance();
            item.unserialize(input);
            items.set(item.code(), item);
         }
      }else{
         // 读取基本数据
         o[name] = input.readData(dateCd);
      }
   }
}

//==========================================================
// <T>从数据中反序列化数据内容。</T>
//
// @method
// @param buffer:ArrayBuffer 缓冲
// @param endianCd:Boolean 编码
//==========================================================
MO.MPersistence_unserializeBuffer = function MPersistence_unserializeBuffer(buffer, endianCd){
   var o = this;
   // 反序列化数据
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   // 读取数据
   o.unserialize(view);
   // 释放数据
   view.dispose();
}

//==========================================================
// <T>将数据内容序列化到输出流中。</T>
//
// @method
// @param output:MStream 输出流
//==========================================================
MO.MPersistence_serialize = function MPersistence_serialize(output){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Persistence);
   var count = annotations.count();
   for(var i = 0; i < count; i++){
      var annotation = annotations.at(i);
      var dateCd = annotation.dataCd();
      var name = annotation.name();
      var value = o[name];
      if(dateCd == MO.EDataType.Object){
         // 写入对象
         value.unserialize(input);
      }else if(dateCd == MO.EDataType.Objects){
         // 写入对象集合
         var itemCount = value.count();
         input.writeInt32(itemCount);
         for(var i = 0; i < itemCount; i++){
            var item = value.at(i);
            item.serialize(input);
         }
      }else if(dateCd == MO.EDataType.Dictionary){
         // 写入对象字典
         var items = o[name];
         var itemCount = value.count();
         input.writeInt32(itemCount);
         for(var i = 0; i < itemCount; i++){
            var item = value.at(i);
            item.serialize(input);
         }
      }else{
         // 写入基本数据
         input.writeData(dateCd, value);
      }
   }
}

//==========================================================
// <T>将数据内容序列化到缓冲中。</T>
//
// @method
// @param buffer:ArrayBuffer 缓冲
// @param endianCd:Boolean 编码
//==========================================================
MO.MPersistence_serializeBuffer = function MPersistence_serializeBuffer(buffer, endianCd){
   var o = this;
   // 反序列化数据
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   // 读取数据
   o.serialize(view);
   // 释放数据
   view.dispose();
}