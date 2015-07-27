with(MO){
   //==========================================================
   // <T>逻辑基础类。</T>
   //
   // @class
   // @author maocy
   // @version 150606
   //==========================================================
   MO.FEaiLogic = function FEaiLogic(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._code   = null;
      //..........................................................
      // @method
      o.makeUrl = FEaiLogic_makeUrl;
      o.send    = FEaiLogic_send;
      return o;
   }

   //==========================================================
   // <T>获取组织列表处理。</T>
   //
   // @method
   // @param callback:Function 回调函数
   // @param owner:Object 拥有者
   //==========================================================
   MO.FEaiLogic_makeUrl = function FEaiLogic_makeUrl(method, parameters){
      var o = this;
      var serviceHost = MO.RConsole.find(MO.FEnvironmentConsole).findValue(MO.EEaiConstant.ServiceHost);
      var url = 'http://' + serviceHost + '/eai/' + o._code + '/' + method,
          time = new Date().getTime();

         function addKey ( start, times ){
            var arr = [start];
               for( var i = 0; i < times; i++ ){ 
                  if( i == 0 ){
                     arr.push( arr[0] );
                  }else{
                     arr.push( arr[i] + arr[i-1] );
                  }
               }
               return arr;
         }

         if(parameters){
            var arr=parameters.split("&"),
                ginsengs='',
                key="";
            for(var i=0;i<arr.length;i++){
               ginsengs += arr[i].split("=")[1];
            }
            for(var i=0; i < addKey(5,3).length; i++){
               key+=addKey(5,3)[i];
            }
            url += '?' + parameters+"&requesttime="+time+"&sign="+hex_md5(ginsengs+key);
         }
      return url;
   } 

   //==========================================================
   // <T>发送数据请求。</T>
   //
   // @method
   // @param method:String 函数
   // @param parameters:Object 拥有者
   // @param owner:Object 拥有者
   // @param callback:Function 回调函数
   //==========================================================
   MO.FEaiLogic_send = function FEaiLogic_send(method, parameters, owner, callback){
      var o = this;
      // 获得地址
      var url = o.makeUrl(method, parameters);
      // 发送请求
      var connection = RConsole.find(FJsonConsole).sendAsync(url);
      connection.addProcessListener(owner, callback);
      return connection;
   }
}
