var ELogger = new function ELogger(){
   var o = this;
   o.Debug = 'D';
   o.Info  = 'I';
   o.Warn  = 'W';
   o.Error = 'E';
   o.Fatal = 'F';
   return o;
}
var EProcess = new function EProcess(){
   var o = this;
   o.Debug = 1;
   o.Release = 2;
   return o;
}
var EScope = new function EScope(){
   var o = this;
   o.Local = 1;
   o.Session = 2;
   o.Global = 4;
   return o;
}
var RRuntime = new function RRuntime(){
   var o = this;
   o._nextUid  = 1;
   o.processCd = EProcess.Release;
   o.isDebug   = RRuntime_isDebug;
   o.isRelease = RRuntime_isRelease;
   o.nvl       = RRuntime_nvl;
   o.subString = RRuntime_subString;
   o.className = RRuntime_className;
   o.uid       = RRuntime_uid;
   return o;
}
function RRuntime_isDebug(){
   return (this.processCd == EProcess.Debug);
}
function RRuntime_isRelease(){
   return (this.processCd == EProcess.Release);
}
function RRuntime_nvl(a, b){
   return (a != null) ? a : b;
}
function RRuntime_subString(v, b, e){
   if(v == null){
      return v;
   }
   var l = 0;
   if(b != null){
      var f = v.indexOf(b);
      if(f != -1){
         l = f + b.length;
      }
   }
   var r = v.length;
   if(e != null){
      var f = v.indexOf(e, l);
      if(f != -1){
         r = f;
      }
   }
   return v.substring(l, r);
}
function RRuntime_className(v){
   if(v){
      if(typeof(v) == 'function'){
         return this.subString(v.toString(), 'function ', '(');
      }
      var c = v.constructor;
      if(c){
         return this.subString(c.toString(), 'function ', '(');
      }
   }
   return null;
}
function RRuntime_uid(v){
   var r = v.uniqueNumber;
   if(r == null){
      r = v.uniqueNumber = RRuntime._nextUid;
      RRuntime._nextUid++;
   }
   return r;
}
function SLooperEntry(o){
   if(!o){o = this;}
   o.prior   = null;
   o.next    = null;
   o.value   = null;
   o.dispose = SLooperEntry_dispose;
   return o;
}
function SLooperEntry_dispose(){
   var o = this;
   o.prior = null;
   o.next = null;
   o.value = null;
}
function SLoopEntry(o){
   if(!o){o = this;}
   o.prior = null;
   o.next  = 0;
   o.value = null;
   return o;
}
function TArray(o){
   if(!o){o = this;}
   o._length  = 0;
   o._memory  = new Array();
   o.isEmpty  = TArray_isEmpty;
   o.length   = TArray_length;
   o.contains = TArray_contains;
   o.indexOf  = TArray_indexOf;
   o.get      = TArray_get;
   o.set      = TArray_set;
   o.push     = TArray_push;
   o.swap     = TArray_swap;
   o.sort     = TArray_sort;
   o.erase    = TArray_erase;
   o.remove   = TArray_remove;
   o.compress = TArray_compress;
   o.clear    = TArray_clear;
   o.dispose  = TArray_dispose;
   o.dump     = TArray_dump;
   return o;
}
function TArray_isEmpty(){
   return this._length == 0;
}
function TArray_length(){
   return this._length;
}
function TArray_contains(v){
   return this.indexOf(v) != -1;
}
function TArray_indexOf(v){
   var o = this;
   var c = o._length;
   for(var n = 0; n < c; n++){
      if(o._memory[n] == v){
         return n;
      }
   }
   return -1;
}
function TArray_get(n){
   return ((n >= 0) && (n < this._length)) ? this._memory[n] : null;
}
function TArray_set(n, v){
   if((n >= 0) && (n < this._length)){
      this._memory[n] = v;
   }
}
function TArray_push(v){
   this._memory[this._length++] = v;
}
function TArray_swap(l, r){
   if((l >= 0) && (l < this._length) && (r >= 0) && (r < this._length) && (l != r)){
      var v = this._memory[l];
      this._memory[l] = this._memory[r];
      this._memory[r] = v;
   }
}
function TArray_sort(){
   this._memory.sort();
}
function TArray_erase(i){
   var v = null;
   if((i >= 0) && (i < c)){
      var o = this;
      o._length--;
      v = o._memory[i];
      for(var n = i; n < c; n++){
         o._memory[n] = o._memory[n + 1];
      }
   }
   return v;
}
function TArray_remove(v){
   if(v != null){
      var o = this;
      var n = 0;
      var c = o._length;
      for(var i = n; i < c; i++){
         if(o._memory[i] != v){
            o._memory[n++] = o._memory[i];
         }
      }
      o._length = n;
   }
   return v;
}
function TArray_compress(){
   var o = this;
   var c = o._length;
   var l = 0;
   for(var n = 0; n < c; n++){
      var v = o._memory[n];
      if(v != null){
         o._memory[l++] = v;
      }
   }
   o._length = l;
}
function TArray_clear(){
   this._length = 0;
}
function TArray_dispose(){
   var o = this;
   o._length = 0;
   o._memory = null;
}
function TArray_dump(){
   var o = this;
   var r = new TString();
   var c = o._length;
   r.append(RRuntime.className(o), ':', c);
   if(c > 0){
      for(var n = 0; n < c; n++){
         r.append(' [', o._memory[n], ']');
      }
   }
   return r.toString();
}
function TAttributes(o){
   if(!o){o = this;}
   TMap(o);
   o.join   = TAttributes_join;
   o.split  = TAttributes_split;
   o.pack   = TAttributes_pack;
   o.unpack = TAttributes_unpack;
   return o;
}
function TAttributes_join(n, v){
   var o = this;
   var r = new TString();
   if(!n){
      n = '=';
   }
   if(!v){
      v = ',';
   }
   var c = o.count;
   for(var i = 0; i < c; i++){
      if(i > 0){
         r.append(v);
      }
      r.append(o.names[i]);
      r.append(n);
      r.append(o.values[i]);
   }
   return r.toString();
}
function TAttributes_split(s, n, v){
   var o = this;
   var ss = s.split(v);
   var c = ss.length;
   for(var i = 0; i < c; i++){
      var ln = ss[i];
      if(ln.length){
         var sb = ln.split(n);
         if(sb.length == 2){
            o.set(sb[0], sb[1]);
         }else{
            o.set(ln, '');
         }
      }
   }
}
function TAttributes_pack(){
   var o = this;
   var p = new TString();
   var c = o.count;
   for(var n = 0; n < c; n++){
      var l = o.names[n].length;
      p.append(l.toString().length, l, o.names[n]);
      if(o.values[n] != null){
         var v = o.values[n] + '';
         l = v.length;
         p.append(l.toString().length, l, v);
      }else{
         p.append('0');
      }
   }
   return p.toString();
}
function TAttributes_unpack(p){
   if(p && p.length){
      var o = this;
      var n = null;
      var v = null;
      var f = 0;
      o.count = 0;
      var pl = p.length;
      while(f < pl){
         var ll = parseInt(p.substr(f++, 1));
         var l = parseInt(p.substr(f, ll));
         n = p.substr(f + ll, l);
         f += ll + l;
         ll = parseInt(p.substr(f++, 1));
         if(ll == 0){
            v = null;
         }else{
            l = parseInt(p.substr(f, ll));
            v = p.substr(f + ll, l);
            f += ll + l;
         }
         o.set(n, v);
      }
   }
}
function TDictionary(o){
   if(!o){o = this;}
   TMap(o);
   o.dump = TDictionary_dump;
   return o;
}
function TDictionary_dump(){
   var o = this;
   var r = new TString();
   var c = o._count;
   r.append(RRuntime.className(o), ': ', c);
   if(c > 0){
      r.append(' {\n');
      for(var n = 0; n < c; n++){
         r.append('   ', o._names[n], '=[', o._values[n], ']\n');
      }
      r.append('}');
   }
   return r.toString();
}
function TList(o){
   if(!o){o = this;}
   o.count      = 0;
   o.memory     = new Array();
   o.isEmpty    = TList_isEmpty;
   o.contains   = TList_contains;
   o.indexOf    = TList_indexOf;
   o.first      = TList_first;
   o.last       = TList_last;
   o.get        = TList_get;
   o.set        = TList_set;
   o.append     = TList_append;
   o.insert     = TList_insert;
   o.push       = TList_push;
   o.pushUnique = TList_pushUnique;
   o.pop        = TList_pop;
   o.swap       = TList_swap;
   o.sort       = TList_sort;
   o.erase      = TList_erase;
   o.remove     = TList_remove;
   o.clear      = TList_clear;
   o.compress   = TList_compress;
   o.pack       = TList_pack;
   o.dispose    = TList_dispose;
   o.dump       = TList_dump;
   return o;
}
function TList_isEmpty(){
   return (this.count == 0);
}
function TList_contains(v){
   return this.indexOf(v) != -1;
}
function TList_indexOf(v){
   var o = this;
   var c = o.count;
   for(var n = 0; n < c; n++){
      if(o.memory[n] == v){
         return n;
      }
   }
   return -1;
}
function TList_first(){
   var o = this;
   return o.count ? this.memory[0] : null;
}
function TList_last(){
   var o = this;
   return o.count ? this.memory[o.count - 1] : null;
}
function TList_get(n){
   return ((n >= 0) && (n < this.count)) ? this.memory[n] : null;
}
function TList_set(n, v){
   if((n >= 0) && (n < this.count)){
      this.memory[n] = v;
   }
}
function TList_append(v){
   var o = this;
   var c = v.count;
   for(var n = 0; n < c; n++){
      o.push(v.get(n));
   }
}
function TList_insert(i, v){
   var o = this;
   var c = o.count;
   if((i >= 0) && (i <= c)){
      for(var n = c; n > i; n--){
         o.memory[n] = o.memory[n - 1];
      }
      o.memory[i] = v;
   }
}
function TList_push(v){
   var n = this.count++;
   this.memory[n] = v;
   return n;
}
function TList_pushUnique(v){
   var o = this;
   for(var n = o.count-1; n >= 0; n--){
      if(o.memory[n] == v){
         return n;
      }
   }
   var n = o.count++;
   o.memory[n] = v;
   return n;
}
function TList_pop(){
   var o = this;
   if(o.count){
      return o.memory[--o.count];
   }
}
function TList_swap(l, r){
   var o = this;
   if((l >= 0) && (l < o.count) && (r >= 0) && (r < o.count) && (l != r)){
      var v = o.memory[l];
      o.memory[l] = this.memory[r];
      o.memory[r] = v;
   }
}
function TList_sort(){
   this.memory.sort();
}
function TList_erase(n){
   var v = null;
   var o = this;
   if((n >= 0) && (n < o.count)){
      v = o.memory[n];
      var c = --o.count;
      for(var i = n; i < c; i++){
         o.memory[i] = o.memory[i+1];
      }
   }
   return v;
}
function TList_remove(v){
   if(v != null){
      var o = this;
      var c = o.count;
      if(c > 0){
         var n = 0;
         for(var i = n; i < c; i++){
            if(o.memory[i] != v){
               o.memory[n++] = o.memory[i];
            }
         }
         o.count = n;
      }
   }
   return v;
}
function TList_clear(){
   this.count = 0;
}
function TList_compress(){
   var o = this;
   var c = o.count;
   if(c > 0){
      var l = 0;
      for(var n = 0; n < c; n++){
         var v = o.memory[n];
         if(v != null){
            o.memory[l++] = v;
         }
      }
      o.count = l;
   }
}
function TList_pack(){
   var o = this;
   var ss = new TStrings();
   for(var n = 0; n < o.count; n++){
      ss.push(o.get(n).pack());
   }
   return ss.pack();
}
function TList_dispose(){
   var o = this;
   o.count = 0;
   for(var n in o.memory){
      delete o.memory[n];
   }
   o.memory = null;
}
function TList_dump(){
   var o = this;
   var c = o.count;
   var r = new TString();
   r.append(RClass.name(o), ':', c);
   if(c > 0){
      for(var n = 0; n < c; n++){
         r.append(' [', o.memory[n], ']');
      }
   }
   return r.toString();
}
function TLooper(o){
   if(!o){o = this;}
   o._count             = 0;
   o._recordCount       = 0;
   o._current           = null;
   o._unused            = null;
   o.innerCreate        = TLooper_innerCreate;
   o.innerFree          = TLooper_innerFree;
   o.innerPush          = TLooper_innerPush;
   o.innerRemove        = TLooper_innerRemove;
   o.innerRemoveCurrent = TLooper_innerRemoveCurrent;
   o.innerRemoveValue   = TLooper_innerRemoveValue;
   o.isEmpty            = TLooper_isEmpty;
   o.count              = TLooper_count;
   o.record             = TLooper_record;
   o.unrecord           = TLooper_unrecord;
   o.contains           = TLooper_contains;
   o.current            = TLooper_current;
   o.next               = TLooper_next;
   o.push               = TLooper_push;
   o.pushUnique         = TLooper_pushUnique;
   o.removeCurrent      = TLooper_removeCurrent;
   o.remove             = TLooper_remove;
   o.clear              = TLooper_clear;
   o.dispose            = TLooper_dispose;
   o.dump               = TLooper_dump;
   return o;
}
function TLooper_innerCreate(){
   var o = this;
   var e = o._unused;
   if(e == null){
      e = new SLooperEntry();
   }else{
      o._unused = e.next;
   }
   return e;
}
function TLooper_innerFree(p){
   var o = this;
   p.next = o._unused;
   o._unused = p;
}
function TLooper_innerPush(p){
   var o = this;
   var ec = o._current;
   if(ec){
      var ep = ec.prior;
      p.prior = ep;
      p.next = ec;
      ep.next = p;
      ec.prior = p;
   }else{
      p.prior = p;
      p.next = p;
      o._current = p;
   }
   o._count++;
}
function TLooper_innerRemove(p){
   var o = this;
   var ep = p.prior;
   var en = p.next;
   ep.next = en;
   en.prior = ep;
   o._count--;
   if(o._count > 0){
      o._current = en;
   }else{
      o._current = null;
   }
   o.innerFree(p);
}
function TLooper_innerRemoveCurrent(){
   var o = this;
   var r = null;
   if(o._count > 0){
      r = o._current.value;
      o.innerRemove(o._current);
   }
   return r;
}
function TLooper_innerRemoveValue(p){
   if(o._count > 0){
      if(o._current.value == p){
         o.innerRemoveCurrent();
         return;
      }
      var ec = o._current;
      var en = ec.next;
      while(en != ec){
         if(en.value == p){
            o.innerRemove(en);
            o._current = ec;
            return;
         }
         en = en.next;
      }
   }
}
function TLooper_isEmpty(v){
   return this._count == 0;
}
function TLooper_count(){
   return this._count;
}
function TLooper_record(){
   this._recordCount = this._count;
}
function TLooper_unrecord(v){
   this._recordCount = -1;
}
function TLooper_contains(p){
   var o = this;
   if(o._current){
      var c = o._count;
      var e = o._current;
      for(var i = 0; i < c; i++){
         if(e.value == p){
            return true;
         }
         e = e.next;
      }
   }
   return false;
}
function TLooper_current(){
   var e = this._current;
   return e ? e.value : null;
}
function TLooper_next(){
   var o = this;
   if(o._current){
      o._current = o._current.next;
   }
   var c = o._recordCount;
   if(c > 0){
      o._recordCount--;
   }else if(c == 0){
      return null;
   }
   return o._current ? o._current.value : null;
}
function TLooper_push(p){
   var o = this;
   var e = o.innerCreate();
   e.value = p;
   o.innerPush(e);
}
function TLooper_pushUnique(p){
   var o = this;
   if(!o.contains(p)){
      o.push(p);
   }
}
function TLooper_removeCurrent(){
   return this.innerRemoveCurrent();
}
function TLooper_remove(p){
   this.innerRemoveValue(p);
}
function TLooper_clear(){
   var o = this;
   var c = o._current;
   if(c){
      c.prior.next = null;
      c.prior = o._unused;
      o._unused = c;
      o._current = null;
   }
   o._count = 0;
}
function TLooper_dispose(){
   var o = this;
   o.clear();
   var e = o._unused;
   while(e){
      var n = e.next;
      e.dispose();
      e = n;
   }
   o._unused = null;
}
function TLooper_dump(){
   var o = this;
   var c = o._count;
   var r = new TString();
   r.append(RClass.name(this), ': ', c);
   if(c > 0){
      var e = o._current;
      for(var i = 0; i < c; i++){
         r.append(' [', e.value, ']');
         e = e.next;
      }
   }
   return r.toString();
}
function TLoopList(o){
   if(!o){o = this;}
   o.count      = 0;
   o.size       = 0;
   o.start      = new Object();
   o.ensureSize = TLoopList_ensureSize;
   o.find       = TLoopList_find;
   o.contains   = TLoopList_contains;
   o.indexOf    = TLoopList_indexOf;
   o.get        = TLoopList_get;
   o.set        = TLoopList_set;
   o.push       = TLoopList_push;
   o.sync       = TLoopList_sync;
   o.erase      = TLoopList_erase;
   o.remove     = TLoopList_remove;
   o.clear      = TLoopList_clear;
   o.dump       = TLoopList_dump;
   return o;
}
function TLoopList_ensureSize(v){
   var o = this;
   var l = v - 1;
   var e = o.start;
   for(var n = 0; n < l; n++){
      if(!e.next){
         e.next = new Object();
         e.value = null;
      }
      e = e.next;
   }
   e.next = o.start;
   o.size = v;
}
function TLoopList_find(i){
   var o = this;
   var e = o.start;
   if((i >= 0) && (i < o.count)){
      for(var n = 0; n < o.count; n++){
         if(n == i){
            return e;
         }
         e = e.next;
      }
   }
   return null;
}
function TLoopList_isEmpty(){
   return (this.count == 0);
}
function TLoopList_contains(v){
   return this.indexOf(v) != -1;
}
function TLoopList_indexOf(v){
   if(v != null){
      var o = this;
      var c = o.count;
      var e = o.start;
      for(var n = 0; n < c; n++){
         if(e.value == v){
            return n;
         }
         e = e.next;
      }
   }
   return -1;
}
function TLoopList_get(i){
   var item = this.find(idx);
   return (item != null) ? item.value : null;
}
function TLoopList_set(i, obj){
   var item = this.find(i);
   if(item != null){
      item.value = obj;
   }
}
function TLoopList_push(obj){
   if(this.count + 1 > this.size){
      this.start.value = obj;
      this.start = this.start.next;
   }else{
      this.set(this.count++, obj);
   }
}
function TLoopList_sync(obj){
   var idx = this.indexOf(obj);
   return (idx == -1) ? this.push(obj) : idx;
}
function TLoopList_erase(i){
   var o = this;
   var obj = null;
   var item = this.find(i);
   if(item != null){
      obj = item.value;
      for(var n = idx; n < this.count; n++){
         item.value = item.next.value;
      }
   }
   return obj;
}
function TLoopList_remove(v){
   var o = this;
   var i = o.indexOf(v);
   if(i != -1){
      o.remove(i);
   }
}
function TLoopList_clear(){
   this.count = 0;
}
function TLoopList_dump(){
   var o = this;
   var r = new TString();
   var c = this.count;
   r.append(RClass.name(this), ': ', c, '/', o.size);
   var item = o.start;
   for(var n = 0; n < c; n++){
      r.append(' [', item.value, ']');
      item = item.next;
   }
   return r.toString();
}
function TMap(o){
   if(!o){o = this;}
   o._count        = 0;
   o._table        = new Object();
   o._names        = new Array();
   o._values       = new Array();
   o.isEmpty       = TMap_isEmpty;
   o.count         = TMap_count;
   o.contains      = TMap_contains;
   o.containsValue = TMap_containsValue;
   o.indexOf       = TMap_indexOf;
   o.indexOfValue  = TMap_indexOfValue;
   o.first         = TMap_first;
   o.last          = TMap_last;
   o.name          = TMap_name;
   o.value         = TMap_value;
   o.setValue      = TMap_setValue;
   o.get           = TMap_get;
   o.set           = TMap_set;
   o.assign        = TMap_assign;
   o.append        = TMap_append;
   o.insert        = TMap_insert;
   o.remove        = TMap_remove;
   o.removeName    = TMap_removeName;
   o.removeValue   = TMap_removeValue;
   o.rebuild       = TMap_rebuild;
   o.clear         = TMap_clear;
   o.toString      = TMap_toString;
   o.dispose       = TMap_dispose;
   o.dump          = TMap_dump;
   return o;
}
function TMap_isEmpty(){
   return (this._count == 0);
}
function TMap_count(){
   return this._count;
}
function TMap_contains(n){
   if(n != null){
      var i = this._table[n.toString().toLowerCase()]
      if(i != null){
         return true;
      }
   }
   return false;
}
function TMap_containsValue(v){
   var i = this.indexOfValue(v);
   return (i != -1);
}
function TMap_indexOf(n){
   if(n != null){
      var i = this._table[n.toString().toLowerCase()];
      if(i != null){
         return i;
      }
   }
   return -1;
}
function TMap_indexOfValue(v){
   var o = this;
   var c = o._count;
   for(var n = 0; n < c; n++){
      if(o._values[n] == v){
         return n;
      }
   }
   return -1;
}
function TMap_first(){
   var o = this;
   if(o._count > 0){
      return o._values[0];
   }
   return null;
}
function TMap_last(){
   var o = this;
   if(o._count > 0){
      return o._values[o._count - 1];
   }
   return null;
}
function TMap_name(n){
   return ((n >= 0) && (n < this._count)) ? this._names[n] : null;
}
function TMap_value(n){
   return ((n >= 0) && (n < this._count)) ? this._values[n] : null;
}
function TMap_setValue(n, v){
   if((n >= 0) && (n < this._count)){
      this._values[n] = v;
   }
}
function TMap_get(n, v){
   if(n != null){
      var o = this;
      var i = o._table[n.toString().toLowerCase()];
      if(i != null){
         return o._values[i];
      }
   }
   return v;
}
function TMap_set(n, v){
   if(n != null){
      var o = this;
      var l = n.toString().toLowerCase();
      var i = o._table[l];
      if((i == null) || (i >= o._count)){
         i = o._count++;
         o._names[i] = n;
         o._table[l] = i;
      }
      o._values[i] = v;
   }
}
function TMap_assign(m){
   this.clear();
   this.append(m);
}
function TMap_append(m){
   if(m){
      var c = m._count;
      for(var n = 0; n < c; n++){
         this.set(m.name(n), m.value(n));
      }
   }
}
function TMap_insert(i, n, v){
   var o = this;
   var c = o._count;
   if((i >= 0) && (i <= c)){
      for(var p = c; p > i; p--){
         o._names[p] = o._names[p - 1];
         o._values[p] = o._values[p - 1];
      }
      o._names[i] = n;
      o._values[i] = v;
      o._count++;
      o.rebuild();
   }
}
function TMap_remove(i){
   var o = this;
   var r = null;
   var c = o._count;
   if((i >= 0) && (i < c)){
      r = o._values[i];
      for(var p = i; p < c; p++){
         o._names[p] = o._names[p + 1];
         o._values[p] = o._values[p + 1];
      }
      o._count--;
      o.rebuild();
   }
   return r;
}
function TMap_removeName(n){
   var o = this;
   var i = o.indexOf(n);
   if(i != -1){
      return o.remove(i);
   }
   return null;
}
function TMap_removeValue(v){
   var o = this;
   var i = 0;
   var c = o._count;
   for(var n = 0; n < c; n++){
      var s = o._values[n];
      if(v != s){
         if(i != n){
            o._names[i] = o._names[n];
            o._values[i] = s;
         }
         i++;
      }
   }
   o._count = i;
   o.rebuild();
}
function TMap_rebuild(){
   var o = this;
   var t = o._table;
   for(var n in t){
      delete t[n];
   }
   var c = o._count;
   for(var n = 0; n < c; n++){
      t[o._names[n].toLowerCase()] = n;
   }
}
function TMap_clear(){
   var o = this;
   o._count = 0;
   for(var n in o._table){
      delete o._table[n];
   }
}
function TMap_toString(){
   return this.dump().toString();
}
function TMap_dispose(){
   var o = this;
   o._count = 0;
   for(var n in o._table){
      delete o._table[n];
   }
   o._table = null;
   for(var n in o._names){
      delete o._names[n];
   }
   o._names = null;
   for(var n in o._values){
      delete o._values[n];
   }
   o._values = null;
}
function TMap_dump(){
   var o = this;
   var r = new TString();
   var c = o._count;
   r.appendLine(RRuntime.className(o), ': ', c);
   if(c > 0){
      r.append(' {');
      for(var n = 0; n < c; n++){
         r.appendLine(o._names[n], '=[', o._values[n], ']');
      }
      r.append('}');
   }
   return r.toString();
}
function TObjects(o){
   if(!o){o = this;}
   o._count     = 0;
   o._items     = new Array();
   o.isEmpty    = TObjects_isEmpty;
   o.count      = TObjects_count;
   o.contains   = TObjects_contains;
   o.indexOf    = TObjects_indexOf;
   o.first      = TObjects_first;
   o.last       = TObjects_last;
   o.get        = TObjects_get;
   o.set        = TObjects_set;
   o.append     = TObjects_append;
   o.insert     = TObjects_insert;
   o.push       = TObjects_push;
   o.pushUnique = TObjects_pushUnique;
   o.pop        = TObjects_pop;
   o.swap       = TObjects_swap;
   o.sort       = TObjects_sort;
   o.erase      = TObjects_erase;
   o.remove     = TObjects_remove;
   o.clear      = TObjects_clear;
   o.dispose    = TObjects_dispose;
   o.dump       = TObjects_dump;
   return o;
}
function TObjects_isEmpty(){
   return (this._count == 0);
}
function TObjects_count(){
   return this._count;
}
function TObjects_contains(v){
   return this.indexOf(v) != -1;
}
function TObjects_indexOf(v){
   var o = this;
   var c = o._count;
   for(var n = 0; n < c; n++){
      if(o._items[n] == v){
         return n;
      }
   }
   return -1;
}
function TObjects_first(){
   var o = this;
   return o._count ? this._items[0] : null;
}
function TObjects_last(){
   var o = this;
   return o._count ? this._items[o._count - 1] : null;
}
function TObjects_get(n){
   return ((n >= 0) && (n < this._count)) ? this._items[n] : null;
}
function TObjects_set(n, v){
   if((n >= 0) && (n < this._count)){
      this._items[n] = v;
   }
}
function TObjects_append(v){
   var o = this;
   var c = v._count;
   for(var n = 0; n < c; n++){
      o.push(v.get(n));
   }
}
function TObjects_insert(i, v){
   var o = this;
   var c = o._count;
   if((i >= 0) && (i <= c)){
      for(var n = c; n > i; n--){
         o._items[n] = o._items[n - 1];
      }
      o._items[i] = v;
   }
}
function TObjects_push(v){
   var n = this._count++;
   this._items[n] = v;
   return n;
}
function TObjects_pushUnique(v){
   var o = this;
   for(var n = o._count-1; n >= 0; n--){
      if(o._items[n] == v){
         return n;
      }
   }
   var n = o._count++;
   o._items[n] = v;
   return n;
}
function TObjects_pop(){
   var o = this;
   if(o._count){
      return o._items[--o._count];
   }
}
function TObjects_swap(l, r){
   var o = this;
   if((l >= 0) && (l < o._count) && (r >= 0) && (r < o._count) && (l != r)){
      var v = o._items[l];
      o._items[l] = this._items[r];
      o._items[r] = v;
   }
}
function TObjects_sort(){
   this._items.sort();
}
function TObjects_erase(n){
   var v = null;
   var o = this;
   if((n >= 0) && (n < o._count)){
      v = o._items[n];
      var c = --o._count;
      var s = o._items;
      for(var i = n; i < c; i++){
         s[i] = s[i+1];
      }
      s[c] = null;
   }
   return v;
}
function TObjects_remove(v){
   if(v != null){
      var o = this;
      var c = o._count;
      if(c > 0){
         var n = 0;
         var s = o._items;
         for(var i = n; i < c; i++){
            if(s[i] != v){
               s[n++] = s[i];
            }
         }
         for(var i = n; i < c; i++){
            s[i] = null;
         }
         o._count = n;
      }
   }
   return v;
}
function TObjects_clear(){
   var o = this;
   o._items.length = 0;
   o._count = 0;
}
function TObjects_dispose(){
   var o = this;
   o._count = 0;
   for(var n in o._items){
      delete o._items[n];
   }
   o._items = null;
}
function TObjects_dump(){
   var o = this;
   var c = o._count;
   var r = new TString();
   r.append(RClass.name(o), ':', c);
   if(c > 0){
      for(var n = 0; n < c; n++){
         r.append(' [', o._items[n], ']');
      }
   }
   return r.toString();
}
function TString(o){
   if(!o){o = this;}
   o.count      = 0;
   o.memory     = new Array();
   o.isEmpty    = TString_isEmpty;
   o.assign     = TString_assign;
   o.append     = TString_append;
   o.appendIf   = TString_appendIf;
   o.appendLine = TString_appendLine;
   o.appendRepeat = TString_appendRepeat;
   o.push       = TString_push;
   o.clear      = TString_clear;
   o.toString   = TString_toString;
   o.dispose    = TString_dispose;
   o.dump       = TString_dump;
   return o;
}
function TString_isEmpty(){
   return (this.count == 0);
}
function TString_assign(v){
   var o = this;
   var a = arguments;
   var c = a.length;
   o.count = 0;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         o.memory[o.count++] = a[n];
      }
   }
   return o;
}
function TString_append(v){
   var o = this;
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         o.memory[o.count++] = a[n];
      }
   }
   return o;
}
function TString_appendIf(f, v){
   var o = this;
   if(f){
      var a = arguments;
      var c = a.length;
      for(var n = 1; n < c; n++){
         if(a[n] != null){
            o.memory[o.count++] = a[n];
         }
      }
   }
   return o;
}
function TString_appendRepeat(v, c){
   var o = this;
   for(var n = 0; n < c; n++){
      o.memory[o.count++] = v;
   }
   return o;
}
function TString_appendLine(v){
   var o = this;
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         o.memory[o.count++] = a[n] + '';
      }
   }
   o.memory[o.count++] = '\r\n';
   return o;
}
function TString_push(v){
   var o = this;
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         o.memory[o.count++] = a[n];
      }
   }
   return o;
}
function TString_clear(){
   this.count = 0;
}
function TString_toString(){
   var o = this;
   var r = o.memory;
   if(o.memory.length != o.count){
      r = o.memory.slice(0, o.count);
   }
   return r.join('');
}
function TString_dispose(){
   var o = this;
   o.count = 0;
   o.memory = null;
}
function TString_dump(){
   var o = this;
   var s = o.toString();
   return RRuntime.className(o) + ':' + s.length + '[' + s + ']';
}
function TStrings(o){
   if(!o){o = this;}
   TList(o);
   o.pack   = TStrings_pack;
   o.unpack = TStrings_unpack;
   return o;
}
function TStrings_pack(){
   var o = this;
   var r = new TString();
   var c = o.count;
   for(var n = 0; n < c; n++){
      var s = o.get(n);
      var sl = s.length.toString();
      var sll = sl.length;
      sa = sll + sl + s;
      r.append(sa);
   }
   return r.toString();
}
function TStrings_unpack(p){
   var o = this;
   if(!RString.isEmpty(p)){
      var c = p.length;
      for(var n = 0; n < c;){
         var ll = parseInt(p.charAt(n++));
         var l = parseInt(p.substr(n, ll));
         n += ll;
         var s = p.substr(n, l);
         n += l;
         o.push(s);
      }
   }
}
var RGlobal = new function RGlobal(){
   var o = this;
   o.instances = new TDictionary();
   o.get       = RGlobal_get;
   o.set       = RGlobal_set;
   o.globalGet = RGlobal_globalGet;
   o.globalSet = RGlobal_globalSet;
   return o;
}
function RGlobal_get(n){
   return this.instances.get(n);
}
function RGlobal_set(n, v){
   this.instances.set(n, v);
}
function RGlobal_globalGet(n){
   if(top.RGlobal){
      return top.RGlobal.get(n);
   }
   return this.instances.get(n);
}
function RGlobal_globalSet(n, v){
   if(top.RGlobal){
      top.RGlobal.set(n, v);
   }else{
      this.instances.set(n, v);
   }
}
var RMemory = new function RMemory(){
   var o = this;
   o.objects       = new Array();
   o.instances     = new Object();
   o.isObject      = RMemory_isObject;
   o.create        = RMemory_create;
   o.register      = RMemory_register;
   o.disposeObject = RMemory_disposeObject;
   o.dispose       = RMemory_dispose;
   o.unlink        = RMemory_unlink;
   o.free          = RMemory_free;
   o.freeHtml      = RMemory_freeHtml;
   o.release       = RMemory_release;
   o.refresh       = RMemory_refresh;
   return o;
}
function RMemory_isObject(o){
   var t = typeof(o);
   return ('boolean' != t) && ('number' != t) && ('string' != t) && ('date' != t) && ('function' != t) && (o instanceof Object);
}
function RMemory_create(c){
   var o = new c();
   this.objects.push(o);
   return o;
}
function RMemory_register(n, o){
   if(this.isObject(o)){
      this.objects.push(o);
      this.instances[n] = o;
   }
}
function RMemory_disposeObject(o){
}
function RMemory_dispose(o){
   if(null != o && this.isObject(o)){
      if(!o._disposed){
         o._disposed = true;
         if(o.dispose instanceof Function){
            o.dispose();
         }
         this.disposeObject(o);
      }
   }
}
function RMemory_unlink(o){
   for(var n in o){
      var v = o[n];
      o[n] = null;
      if(null != v && this.isObject(v)){
         this.unlink(o);
      }
   }
}
function RMemory_free(o){
   this.dispose(o);
   this.unlink(o);
}
function RMemory_freeHtml(h){
   if(h){
      h.removeNode(true);
   }
}
function RMemory_release(){
   var o = this;
   o.free(o.objects);
   o.free(o.instances);
   o.refresh();
}
function RMemory_refresh(){
   if(RContext.optionGarbage){
      CollectGarbage();
   }
}
function AAnnotation(o, n){
   if(!o){o = this;}
   o._annotationCd = null;
   o._inherit      = false;
   o._name         = n;
   o.annotationCd  = AAnnotation_annotationCd;
   o.name          = AAnnotation_name;
   o.code          = AAnnotation_code;
   o.value         = AAnnotation_value;
   return o;
}
function AAnnotation_annotationCd(){
   return this._annotationCd;
}
function AAnnotation_name(){
   return this._name;
}
function AAnnotation_code(){
   return this._name;
}
function AAnnotation_value(){
   return null;
}
function AEnum(n, l){
   var o = this;
   o.inherit    = true;
   o.annotation = EAnnotation.Enum;
   o.name       = n;
   o.linker     = l;
   return o;
}
function ALinker(n, l){
   var o = this;
   o.inherit    = true;
   o.annotation = EAnnotation.Linker;
   o.name       = n;
   o.linker     = l;
   return o;
}
function AProperty(o, n, l){
   if(!o){o = this;}
   AAnnotation(o, n);
   o._inherit      = true;
   o._annotationCd = EAnnotation.Property;
   o._linker       = null;
   o._force        = false;
   o.code          = AProperty_code;
   o.build         = AProperty_build;
   o.load          = AProperty_load;
   o.save          = AProperty_save;
   o.toString      = AProperty_toString;
   var ln = null;
   if(l == null){
      if(RString.startsWith(n, '_')){
         ln = n.substring(1);
      }else{
         ln = n;
      }
      ln = RString.toUnderline(ln);
   }else{
      ln = l;
   }
   o._linker = ln;
   return o;
}
function AProperty_code(){
   return this._linker;
}
function AProperty_build(){
}
function AProperty_load(v, x){
   var o = this;
   v[o._name] = x.get(o._linker);
}
function AProperty_save(v, x){
   var o = this;
   x.set(o._linker, v[o._name]);
}
function AProperty_toString(){
   var o = this;
   return '<' + o._annotationCd + ',linker=' + o._linker + '>';
}
function APtyBoolean(n, l, v){
   var o = this;
   AProperty(o, n, l);
   o._value    = v ? v : false;
   o.build    = APtyBoolean_build;
   o.load     = APtyBoolean_load;
   o.save     = APtyBoolean_save;
   o.toString = APtyBoolean_toString;
   return o;
}
function APtyBoolean_build(v){
   var o = this;
   v[o._name] = o._value;
}
function APtyBoolean_load(v, x){
   var o = this;
   v[o._name] = RBoolean.parse(x.get(o._linker));
}
function APtyBoolean_save(o, c){
   var o = this;
   x.set(o._linker, RBoolean.toString(v[o._name]));
}
function APtyBoolean_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function APtyConfig(n, l){
   var o = this;
   AProperty(o, n, l);
   o.force = true;
   o.load  = APtyConfig_load;
   o.save  = RMethod.empty;
   return o;
}
function APtyConfig_load(v, x){
   v[this.name] = x;
}
function APtyInteger(n, l, v){
   var o = this;
   AProperty(o, n, l);
   o._value   = RInteger.nvl(v);
   o.build    = APtyInteger_build;
   o.toString = APtyInteger_toString;
   return o;
}
function APtyInteger_build(v){
   var o = this;
   v[o._name] = o._value;
}
function APtyInteger_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function APtyPadding(n, l, vl, vt, vr, vb){
   var o = this;
   AProperty(o, n, l);
   o._left    = RInteger.nvl(vl);
   o._top     = RInteger.nvl(vt);
   o._right   = RInteger.nvl(vr);
   o._bottom  = RInteger.nvl(vb);
   o.load     = APtyPadding_load;
   o.save     = APtyPadding_save;
   o.toString = APtyPadding_toString;
   return o;
}
function APtyPadding_load(v, x){
   var o = this;
   v[o._name].parse(x.get(o._linker));
}
function APtyPadding_save(v, x){
   var o = this;
   x.set(o._name, v[o._name].toString());
}
function APtyPadding_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
}
function APtyPoint2(n, l, x, y){
   var o = this;
   AProperty(o, n, l);
   o._x       = RInteger.nvl(x);
   o._y       = RInteger.nvl(y);
   o.load     = APtyPoint2_load;
   o.save     = APtyPoint2_save;
   o.toString = APtyPoint2_toString;
   return o;
}
function APtyPoint2_load(v, x){
   var o = this;
   v[o._name].parse(x.get(o._linker));
}
function APtyPoint2_save(v, x){
   var o = this;
   x.set(o._name, v[o._name].toString());
}
function APtyPoint2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
function APtySet(o, n, l, s, v){
   if(!o){o = this;}
   AProperty(o, n, l);
   o._search = s;
   o._value  = v;
   o.build    = APtySet_build;
   o.load     = APtySet_load;
   o.save     = APtySet_save;
   o.toString = APtySet_toString;
   return o;
}
function APtySet_build(v){
   var o = this;
   v[o.name] = o._value;
}
function APtySet_load(v, x){
   var o = this;
   v[o.name] = RSet.containsString(x.get(o.linker), o.search);
}
function APtySet_save(v, x){
   var o = this;
   var n = o.name;
   var vs = v[n];
   var xs = x.get(o.linker);
   var e = RSet.containsString(xs, o._search);
   if(vs && !e){
      x.set(n, vs + o._search);
   }else if(!v && e){
      x.set(n, RString.remove(vs, o._search));
   }
}
function APtySet_toString(){
   var o = this;
   return '<SetProperty:linker=' + o.linker + ',value=' + o._value + ',search=' + o._search +  '>';
}
function APtySize2(n, l, w, h){
   var o = this;
   AProperty(o, n, l);
   o._width   = RInteger.nvl(w);
   o._height  = RInteger.nvl(h);
   o.load     = APtySize2_load;
   o.save     = APtySize2_save;
   o.toString = APtySize2_toString;
   return o;
}
function APtySize2_load(v, x){
   var o = this;
   v[o._name].parse(x.get(o._linker));
}
function APtySize2_save(v, x){
   var o = this;
   x.set(o._name, v[o._name].toString());
}
function APtySize2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
}
function APtyString(n, l, v){
   var o = this;
   AProperty(o, n, l);
   o._value    = v ? v : null;
   o.build    = APtyString_build;
   o.toString = APtyString_toString;
   return o;
}
function APtyString_build(v){
   var o = this;
   v[o._name] = o._value;
}
function APtyString_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function AStyle(n, s){
   var o = this;
   AAnnotation(o, n);
   o._annotationCd = EAnnotation.Style;
   o._style        = s;
   o.code          = AStyle_code;
   o.style         = AStyle_style;
   o.build         = AStyle_build;
   o.toString      = AStyle_toString;
   return o;
}
function AStyle_code(){
   return this._style;
}
function AStyle_style(){
   return this._style;
}
function AStyle_build(v){
   var o = this;
   v[o._name] = null;
}
function AStyle_toString(){
   var o = this;
   return 'style=' + o._style;
}
var EAnnotation = new function EAnnotation(){
   var o = this;
   o.Property  = 'property';
   o.Event     = 'enum';
   o.Event     = 'event';
   o.Linker    = 'linker';
   o.Style     = 'style';
   o.StyleIcon = 'icon';
   return o;
}
var EBoolean = new function EBoolean(){
   var o = this;
   o.True   = 'Y';
   o.False  = 'N';
   return o;
}
var ECharCase = function ECharCase(){
   var o = this;
   o.Upper = 'U';
   o.Lower = 'L';
   o.Word  = 'W';
   return o;
}
var EEndian = new function EEndian(){
   var o = this;
   o.Big    = 0;
   o.Little = 1;
   return o;
}
var ENodeType = new function ENodeType(){
   var o = this;
   o.Node = 1;
   o.Text = 3;
   o.Data = 4;
   return o;
}
var ENumber = new function ENumber(){
   var o = this;
   o.Integer              = 'I';
   o.PositiveInteger      = 'PI';
   o.NegativeInteger      = 'NI';
   o.Float                = 'F';
   o.PositiveFloat        = 'PF';
   o.NegativeFloat        = 'NF';
   return o;
}
var ERegExp = new function ERegExp(){
   var o = this;
   o.I                   = /^-?[1-9]\d*|0$/;
   o.PI                  = /^[1-9]\d*$/;
   o.NI                  = /^-[1-9]\d*$/;
   o.F                   = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
   o.PF                  = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
   o.NF                  = /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/;
   o.U                   = /[1-9]{1}[0-9]/;
   o.E                   = /^\w{1,}[@]{1}[a-zA-Z]{1,}[.]{1}[a-zA-Z]{1,}$/;
   return o;
}
var EResult = new function EResult(){
   var o = this;
   o.Success  = 0;
   o.Continue = 1;
   o.Skip     = 2;
   o.Finish   = 3;
   o.Failure  =  -1;
   o.Cancel   = -2;
   return o;
}
function FConsole(o){
   o = RClass.inherits(this, o, FObject);
   o._scopeCd = EScope.Global;
   o.scopeCd  = FConsole_scopeCd;
   return o;
}
function FConsole_scopeCd(){
   return this._scopeCd;
}
function FObject(o){
   if(!o){o = this;}
   o.__class   = null;
   o.construct = FObject_construct;
   o.toString  = FObject_toString;
   o.dispose   = FObject_dispose;
   o.innerDump = FObject_innerDump;
   o.dump      = FObject_dump;
   return o;
}
function FObject_construct(){
}
function FObject_toString(){
   return RClass.dump(this);
}
function FObject_dispose(){
   this.__class = null;
}
function FObject_innerDump(s, l){
   s.append(RClass.dump(this));
}
function FObject_dump(){
   var r = new TString();
   this.innerDump(r, 0);
   return r.toString();
}
function FObjectPool(o){
   o = RClass.inherits(this, o, FObject);
   o._items    = null;
   o._frees    = null;
   o.construct = FObjectPool_construct;
   o.hasFree   = FObjectPool_hasFree;
   o.alloc     = FObjectPool_alloc;
   o.free      = FObjectPool_free;
   o.push      = FObjectPool_push;
   o.dispose   = FObjectPool_dispose;
   return o;
}
function FObjectPool_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._items = new TObjects();
   o._frees = new TObjects();
}
function FObjectPool_hasFree(){
   return !this._frees.isEmpty();
}
function FObjectPool_alloc(p){
   var o = this;
   var r = null;
   if(!o._frees.isEmpty()){
      r = o._frees.pop();
   }
   return r;
}
function FObjectPool_free(p){
   var o = this;
   o._frees.push(p);
}
function FObjectPool_push(p){
   var o = this;
   o._items.push(p);
   o._frees.push(p);
}
function FObjectPool_dispose(){
   var o = this;
   if(o._items){
      o._items.dispose();
      o._items = null;
   }
   if(o._frees){
      o._frees.dispose();
      o._frees = null;
   }
   o.__base.FObject.dispose.call(o);
}
function MClone(o){
   o = RClass.inherits(this, o);
   o.clone  = MClone_clone;
   return o;
}
function MClone_clone(){
   var o = this;
   var r = RClass.create(o.constructor);
   for(var n in o){
      v = o[n];
      if(v != null){
         if(!RClass.isBaseDataType(v.constructor)){
            r[n] = v.clone();
         }
      }
      r[n] = v;
   }
   return r;
}
function MInstance(o){
   o = RClass.inherits(this, o);
   o.__free          = false;
   o.instanceCreate  = RMethod.empty;
   o.instanceAlloc   = RMethod.empty;
   o.instanceFree    = RMethod.empty;
   o.instanceRelease = RMethod.empty;
   return o;
}
function MProperty(o){
   o = RClass.inherits(this, o);
   o.propertyAssign = MProperty_propertyAssign;
   o.propertyLoad   = MProperty_propertyLoad;
   o.propertySave   = MProperty_propertySave;
   return o;
}
function MProperty_propertyAssign(v){
   var o = this;
   var c = RClass.find(o.constructor);
   var as = c.annotations(EAnnotation.Property);
   for(var n in as){
      var a = as[n];
      if(a.constructor != Function){
         o[a._name] = c[a._name];
      }
   }
}
function MProperty_propertyLoad(v){
   var o = this;
   var c = RClass.find(o.constructor);
   var as = c.annotations(EAnnotation.Property);
   for(var n in as){
      var a = as[n];
      if(a.constructor != Function){
         if(a._force){
            a.load(o, v);
         }else{
            if(v.contains(a._linker)){
               a.load(o, v);
            }else if(o[p._name] == null){
               o[a._name] = a._value;
            }
         }
      }
   }
}
function MProperty_propertySave(v){
   var o = this;
   var c = RClass.find(o.constructor);
   var as = c.annotations(EAnnotation.Property);
   for(var n in as){
      var a = as[n];
      if(a.constructor != Function){
         a.save(o, v);
      }
   }
}
var RArray = new function RArray(){
   var o = this;
   o.equals        = RArray_equals;
   o.count         = RArray_count;
   o.contains      = RArray_contains;
   o.find          = RArray_find;
   o.search        = RArray_search;
   o.reverse       = RArray_reverse;
   o.copy          = RArray_copy;
   o.move          = RArray_move;
   o.remove        = RArray_remove;
   o.sortPartition = RArray_sortPartition;
   o.sortArray     = RArray_sortArray;
   o.sort          = RArray_sort;
   o.nameMaxLength = RArray_nameMaxLength;
   return o;
}
function RArray_equals(s, t){
   if(s && t){
      if(s.length == t.length){
         var c = s.length;
         for(var n = 0; n < c; n++){
            if(s[n] != t[n]){
               return false;
            }
         }
         return true;
      }
   }
   return false;
}
function RArray_count(a){
   var c = 0;
   for(var n in a){
      n++;
   }
   return c;
}
function RArray_contains(a, v){
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] == v){
         return true;
      }
   }
   return false;
}
function RArray_find(a, v){
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] == v){
         return n;
      }
   }
   return -1;
}
function RArray_search(a, v){
   for(var n in a){
      if(a[n] == v){
         return n;
      }
   }
   return null;
}
function RArray_reverse(a, s, e){
   var c = (e + 1 - s) >> 1;
   for(var n = 0; n < c; n++){
      var t = a[s + n];
      a[s + n] = a[e - n];
      a[e - n] = t;
   }
}
function RArray_copy(s, t){
   for(var n in s){
      t[n] = s[n];
   }
}
function RArray_move(a, f, c, t){
   if(f > t){
      for(var n = 0; n < c; n++){
         a[t - n] = a[f + n];
      }
   }else if(f < t){
      for(var n = 0; n < c; n++){
         a[t + c - n - 1] = a[f + c - n - 1];
      }
   }
}
function RArray_remove(a, n){
   return a.slice(0, n).concat(a.slice(n + 1));
}
function RArray_sortPartition(a, l, r){
   var s = l;
   var e = r + 1;
   var t = a[s];
   while(true){
      while(a[++s] < t);
      while(a[--e] > t);
      if(s > e){
         break;
      }
      var v = a[s];
      a[s] = a[e];
      a[e] = v;
   }
   a[l] = a[e];
   a[e] = t;
   return e;
}
function RArray_sortArray(a, s, e){
   if(s < e){
      var o = this;
      var p = o.sortPartition(a, s, e);
      o.sortArray(a, s, p - 1);
      o.sortArray(a, p + 1, e);
   }
}
function RArray_sort(a, t){
   var o = this;
   var c = a.length - 1;
   o.sortArray(a, 0, c);
   if(t){
      o.reverse(a, 0, c);
   }
   return a;
}
function RArray_nameMaxLength(a){
   var r = 0;
   for(var n in a){
      var l = n.length;
      if(l > n){
         n = l;
      }
   }
   return r;
}
var RBoolean = new function RBoolean(){
   var o = this;
   o.parse    = RBoolean_parse;
   o.toString = RBoolean_toString;
   return o;
}
function RBoolean_parse(v){
   return (v == EBoolean.True);
}
function RBoolean_toString(v){
   return v ? EBoolean.True : EBoolean.False;
}
var RChar = new function RChar(){
   var o = this;
   o.parse    = RChar_parse;
   o.toString = RChar_toString;
   return o;
}
function RChar_parse(n){
   return String.fromCharCode(n);
}
function RChar_toString(v){
   return v;
}
var RClass = new function RClass(){
   var o = this;
   o.codes          = new Array();
   o.classes        = new Object();
   o.isBase         = RClass_isBase;
   o.isBaseName     = RClass_isBaseName;
   o.isBaseDataName = RClass_isBaseDataName;
   o.isBaseType     = RClass_isBaseType;
   o.isBaseDataType = RClass_isBaseDataType;
   o.isName         = RClass_isName;
   o.isClass        = RClass_isClass;
   o.typeOf         = RClass_typeOf;
   o.safeTypeOf     = RClass_safeTypeOf;
   o.checkClass     = RClass_checkClass;
   o.code           = RClass_code;
   o.name           = RClass_name;
   o.inherits       = RClass_inherits;
   o.forName        = RClass_forName;
   o.find           = RClass_find;
   o.register       = RClass_register;
   o.createBase     = RClass_createBase;
   o.createClass    = RClass_createClass;
   o.create         = RClass_create;
   o.createByName   = RClass_createByName;
   o.innerCopy      = RClass_innerCopy;
   o.build          = RClass_build;
   o.dump           = RClass_dump;
   o.free           = RClass_free;
   return o;
}
function RClass_isBase(v){
   if(v != null){
      var n = typeof(v);
      return RClass.isBaseName(n);
   }
   return false;
}
function RClass_isBaseName(n){
   if(n != null){
      if(n == 'boolean'){
         return true;
      }else if(n == 'number'){
         return true;
      }else if(n == 'date'){
         return true;
      }else if(n == 'string'){
         return true;
      }else if(n == 'function'){
         return true;
      }
   }
   return false;
}
function RClass_isBaseDataName(n){
   if(n != null){
      if(n == 'boolean'){
         return true;
      }else if(n == 'number'){
         return true;
      }else if(n == 'date'){
         return true;
      }else if(n == 'string'){
         return true;
      }
   }
   return false;
}
function RClass_isBaseType(c){
   if(c != null){
      if(c == Boolean){
         return true;
      }else if(c == Number){
         return true;
      }else if(c == Date){
         return true;
      }else if(c == String){
         return true;
      }else if(c == Function){
         return true;
      }
   }
   return false;
}
function RClass_isBaseDataType(c){
   if(c != null){
      if(c == Boolean){
         return true;
      }else if(c == Number){
         return true;
      }else if(c == Date){
         return true;
      }else if(c == String){
         return true;
      }
   }
   return false;
}
function RClass_isName(v, n){
   return (this.name(v) == n);
}
function RClass_isClass(v, c){
   if(v && c){
      var o = this;
      var n = o.name(c);
      if(v.__base){
         return (v.__base[n] != null);
      }else{
         return (o.name(v) == n);
      }
   }
   return false;
}
function RClass_typeOf(o){
   if(o && o.constructor){
      return RString.mid(o.constructor.toString(), 'function ', '(');
   }
   return 'Null';
}
function RClass_safeTypeOf(v, safe){
   if(v == null){
      return 'Null';
   }
   try{
      var c = v.constructor;
      if(c == Boolean){
         return 'Boolean';
      }
      if(c == Number){
         return 'Number';
      }
      if(c == String){
         return 'String';
      }
      if(c == Function){
         return RString.mid(c.toString(), 'function ', '(');
      }
      if(c.constructor == Function){
         return RString.mid(c.toString(), 'function ', '(');
      }
      if(v.__class){
         return v.__class.name;
      }
      if(v.tagName){
         return 'Html';
      }
      for(var n in v){
         return 'Object';
      }
   }catch(e){
   }
   return 'Unknown';
}
function RClass_checkClass(v, c){
   if(!this.isClass(v, c)){
      throw new Error('Invalid class ' + o.name(o) + '<>' + o.name(c));
   }
}
function RClass_code(v){
   var c = this.codes;
   var l = c.length;
   for(var n = 0; n < l; n++){
      if(c[n] == v){
         return n;
      }
   }
   c[l] = v;
   return l;
}
function RClass_name(v){
   if(v){
      if(v.__name){
         return v.__name;
      }
      if(v.__class){
         return v.__class.name;
      }
      if(typeof(v) == 'function'){
         return RMethod.name(v);
      }
      var c = v.constructor;
      if(c){
         return RString.mid(c.toString(), 'function ', '(');
      }
   }
   return null;
}
function RClass_inherits(s, p){
   var r = RRuntime.nvl(p, s);
   r.__inherits = new Array();
   var a = arguments;
   var c = a.length;
   for(var i = 2; i < c; i++){
      r.__inherits.push(RMethod.name(a[i]));
   }
   return r;
}
function RClass_forName(n){
   var r = null;
   if(n != null){
      var o = this;
      r = o.classes[n];
      if(!r){
         r = o.createClass(n);
         o.build(r);
      }
   }
   return r;
}
function RClass_find(v){
   var o = this;
   var n = null;
   if(v != null){
      if(v.__class){
         n = v.__class.name;
      }else if(v.constructor == Function){
         n = RMethod.name(v);
      }else if(v.constructor != String){
         RLogger.fatal(o, null, 'Find class failure. (value={1})', v);
      }
   }
   return o.classes[n];
}
function RClass_register(v, a, r){
   var n = RMethod.name(v.constructor);
   this.classes[n].register(a);
   var v = a.value();
   return (v != null) ? v : r;
}
function RClass_createBase(n){
   if(n){
      var s = 'function ' + n + '(){return this;} new ' + n + '();';
      return eval(s);
   }
   return null;
}
function RClass_createClass(n){
   var o = this;
   var c = o.classes[n] = new TClass();
   c.name = n;
   c.base = o.createBase(n);
   c.clazz = new c.base.constructor();
   eval(n + '(c.clazz)');
   return c;
}
function RClass_create(n){
   var o = this;
   var t = typeof(n);
   if(t == 'function'){
      n = RMethod.name(n);
   }else if(t != 'string'){
      RLogger.fatal(o, null, 'Param is invlid (name={1})', n);
   }
   return o.createByName(n);
}
function RClass_createByName(n){
   var o = this;
   var c = o.forName(n);
   if(!c){
      RLogger.fatal(o, null, 'Cant find class. (name={1})', c);
   }
   return c.newInstance();
}
function RClass_innerCopy(s, t){
   if((s != null) && (t != null)){
      for(var n in s){
         var v = s[n];
         if(v != null){
            var p = typeof(v)
            if(p == 'function'){
               var f = t[n];
               if(f == null){
                  t[n] = v;
               }else if(RMethod.isVirtual(f)){
                  t[n] = v;
               }else if(!RMethod.isVirtual(v) && RMethod.isEmpty(f)){
                  t[n] = v;
               }else if(!RMethod.isVirtual(v) && !RMethod.isEmpty(v)){
                  t[n] = v;
               }
               continue;
            }else if(!RClass.isBaseName(p)){
               if(t[n] == null){
                  t[n] = new v.constructor();
               }
               this.innerCopy(v, t[n]);
               continue;
            }
         }
         t[n] = v;
      }
   }
}
function RClass_build(c){
   var sbs = c.clazz.__inherits;
   if(sbs && (sbs.constructor == Array)){
      var finded = false;
      var sbl = sbs.length;
      for(var i = 0; i < sbl; i++){
         var name = sbs[i];
         if(RString.startsWith(name, 'F')){
            if(finded){
               RLogger.fatal(this, null, 'Parent class is too many. (name={1})', name);
            }
            c.parent = RClass.forName(name);
            finded = true;
         }
      }
   }
   var o = c.instance = new c.base.constructor();
   if(sbs && (sbs.constructor == Array)){
      var sbl = sbs.length;
      for(var i = 0; i < sbl; i++){
         var name = sbs[i];
         if(!RString.startsWith(name, 'F')){
            var m = RClass.forName(name);
            if(m == null){
               RLogger.fatal(this, null, 'Parent class is not exists. (name={1})', name);
            }
            RClass.innerCopy(m.instance, o);
            c.assign(m);
         }
      }
   }
   if(c.parent){
      this.innerCopy(c.parent.instance, o);
      c.assign(c.parent);
   }
   if(!o.__base){
      o.__base = new TClassBase();
   }
   o.__base[c.name] = new c.base.constructor();
   var cf = c.clazz;
   for(var n in cf){
      if(n != '__base'){
         if((cf[n] == null) && (o[n] == null)){
            o[n] = null;
         }else if(cf[n] != null){
            if((o[n] == null) || ((o[n] != null) && cf[n] != o[n])){
               o[n] = cf[n];
            }
         }
      }
   }
   if(sbs && (sbs.constructor == Array)){
      var sbl = sbs.length;
      for(var i = 0; i < sbl; i++){
         var name = sbs[i];
         var bcls = RClass.forName(name);
         var base = o.__base[name] = new bcls.base.constructor();
         var cf = bcls.instance;
         for(var n in cf){
            if(n != '__base'){
               var cfn = cf[n];
               var ofn = o[n];
               if((cfn != null) && (ofn != null) && (cfn != ofn)){
                  if((cfn.constructor == Function) && (ofn.constructor == Function)){
                     base[n] = cf[n];
                  }
               }
            }
         }
      }
   }
   c.build();
   if(RRuntime.isRelease()){
      for(var n in c.instance){
         var v = c.instance[n];
         if(v == null){
            delete c.instance[n];
         }
      }
   }
}
function RClass_dump(v){
   var o = this;
   if(v == null){
      return '@null';
   }
   var t = o.safeTypeOf(v);
   switch(t){
      case 'Boolean':
         return 'Boolean:' + v;
      case 'Number':
         return 'Number:' + v;
      case 'String':
         return t + '<' + v.length + '>:' + v;
      case 'Function':
         return t + '<' + RMethod.name(v) + '>@' + o.code(v);
      case 'Html':
         return t + '<' + v.tagName + '>@' + RRuntime.uid(v);
      default:
         if(v.__name){
            return t + '<' + v.__name + '>@' + o.code(v);
         }
   }
   return t + '@' + o.code(v);
}
function RClass_free(o){
   var c = o.__class;
   if(c){
      c.free(o);
   }
}
var RConsole = new function RConsole(){
   var o = this;
   o.ConsolePreFix = 'console:';
   o._registers     = new TObjects();
   o._consoles      = new TDictionary();
   o._localConsoles = new TDictionary();
   o.initialize     = RConsole_initialize;
   o.register       = RConsole_register;
   o.create         = RConsole_create;
   o.createByName   = RConsole_createByName;
   o.get            = RConsole_get;
   o.find           = RConsole_find;
   o.release        = RConsole_release;
   return o;
}
function RConsole_initialize(){
   var o = this;
   var rs = o._registers;
   var c = rs.count;
   for(var n = 0; n < rs; n++){
      var r = rs.get(n);
      if(r.force){
         o.find(r.clazz);
      }
   }
}
function RConsole_register(p){
   this._registers.push(p);
}
function RConsole_create(n){
   var r = null;
   if(n){
      r = RClass.create(n);
      var o = this;
      for(var rn in r){
         if(RString.startsWith(rn, 'lnk')){
            var v = r[rn];
            if('string' == typeof(v) && RString.startsWith(v, '&')){
               var c = o.find(v.substr(1));
               if(!c){
                  return RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
               }
               r[rn] = c;
            }
         }
      }
   }
   return r;
}
function RConsole_createByName(n){
   var r = null;
   if(n){
      r = RClass.createByName(n);
      var o = this;
      for(var rn in r){
         if(RString.startsWith(rn, 'lnk')){
            var v = r[rn];
            if('string' == typeof(v) && RString.startsWith(v, '&')){
               var c = o.find(v.substr(1));
               if(!c){
                  return RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
               }
               r[rn] = c;
            }
         }
      }
   }
   return r;
}
function RConsole_get(v){
   var o = this;
   var n = RClass.name(v);
   var r = o._consoles.get(n);
   return r;
}
function RConsole_find(v){
   var o = this;
   var n = null;
   if(v.constructor = String){
      n = RClass.name(v);
   }else if(v.constructor == Function){
      n = v;
   }else{
      return RLogger.fatal(o, null, 'Parameter type is invalid. (console={1})', v);
   }
   var r = RGlobal.get(o.ConsolePreFix + n);
   if(r){
      return r;
   }
   r = o._consoles.get(n);
   if(r){
      return r;
   }
   var c = RClass.forName(n);
   var s = c.instance.scopeCd();
   switch(s){
      case EScope.Global:
         r = top.RConsole.createByName(n);
         RGlobal.set(o.ConsolePreFix + n, r);
         o._consoles.set(n, r);
         break;
      case EScope.Local:
         r = o.createByName(n);
         o._localConsoles.set(n, r);
         o._consoles.set(n, r);
         break;
      default:
         return RLogger.fatal(o, 'Unknown scope code. (name={1})', n);
   }
   RLogger.info(o, 'Create console. (name={1}, scope={2})', n, REnum.decode(EScope, s));
   return r;
}
function RConsole_release(){
   var o = this;
   if(o._registers){
      o._registers.dispose();
      o._registers = null;
   }
   var cs = o._localConsoles;
   if(cs){
      var c = cs.count();
      for(var n = 0; n < c; n++){
         cs.value(n).dispose();
      }
      cs.dispose();
   }
   o._localConsoles = null;
   if(o._consoles){
      o._consoles.dispose();
   }
   o._consoles = null;
}
var RContext = new function(){
   var o = this;
   o.optionGarbage = true;
   o._location     = null;
   o._contexts     = new Object();
   o.contextPath   = null;
   o.contextTag    = null;
   o.themeId       = null;
   o.languageId    = null;
   o.construct     = RContext_construct;
   o.initialize    = RContext_initialize;
   o.get           = RContext_get;
   o.find          = RContext_find;
   o.location      = RContext_location;
   o.context       = RContext_context;
   o.construct();
   return o;
}
function RContext_construct(){
   var o = this;
   if(window.ActiveXObject){
      o.optionGarbage = true;
   }else{
      o.optionGarbage = false;
   }
}
function RContext_location(s){
   var o = this;
   var r = o._location;
   if(r == null){
      var l = window.location;
      var hr = l.href;
      var pn = l.pathname;
      r = hr.substring(0, hr.indexOf(pn))
      if(o.contextPath){
         r += o.contextPath;
      }
      o._location = r;
   }
   if(s){
      r += s;
   }
   return r;
}
function RContext_context(s){
   var o = this;
   if(s != null){
      if(RString.endsWith(s, '.wv')){
         return o.contextPath + '/' + s;
      }else if(RString.startsWith(s, '#')){
         return o.contextPath + o.contextTag + s.substr(1);
      }
      return o.contextPath + s;
   }
   return o.contextPath;
}
function RContext_initialize(s){
   var o = this;
   for(var n in s){
      var ls = s[n];
      for(var nc in ls){
         var v = ls[nc];
         var fn = n + ':' + nc;
         o._contexts[fn] = new TContext(n, nc, v);
      }
   }
}
function RContext_get(p, p1, p2, p3, p4, p5){
   var o = this;
   var r = o._contexts[p];
   if(!r){
      return RLogger.fatal(o, null, 'Can not find context (path={1})', p);
   }
   return RString.format(r.text, p1, p2, p3, p4, p5)
}
function RContext_find(s, c){
   var o = this;
   var id = s + ':' + c;
   var r = o._contexts[id];
   if(!r){
      return RLogger.fatal(o, null, 'Can not find context (id={1})', id);
   }
   return r.text;
}
var RDate = new function RDate(){
   var o = this;
   o.MinYear       = 1800;
   o.MaxYear       = 2400;
   o.Pattern       = 'n-: /';
   o.Chars         = '0123456789-:/';
   o.DisplayFormat = 'yyyy-mm-dd hh24:mi:ss';
   o.DataFormat    = 'yyyymmddhh24miss';
   o.MonthDays     = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
   o.DaySeconds    = 1000// 60// 60// 24;
   o.Parts         = new Array('YYYY','MM','DD','HH24','MI','SS');
   o.PartsDefine   = {'YYYY':['Year',4],'MM':['Month',2],'DD':['Day',2],'HH24':['Hour',2],'MI':['Minute',2],'SS':['Second',2]};
   o.nvl           = RDate_nvl;
   o.make          = RDate_make;
   o.format        = RDate_format;
   o.formatDate    = RDate_formatDate;
   o.formatText    = RDate_formatText;
   o.monthDays     = RDate_monthDays;
   o.splitFormat   = RDate_splitFormat;
   o.makeDate      = RDate_makeDate;
   o.checkItems    = RDate_checkItems;
   o.check         = RDate_check;
   o.parse         = RDate_parse;
   o.splitDate     = RDate_splitDate;
   o.splitTime     = RDate_splitTime;
   o.autoParse     = RDate_autoParse;
   o.getFormat     = RDate_getFormat;
   return o;
}
function RDate_nvl(o){
   return o ? o : new TDate();
}
function RDate_make(yyyy, mm, dd, hh, mi, ss){
   return new TDate(new Date(yyyy, mm, dd));
}
function RDate_format(fmt){
   return this.formatDate(new TDate(), fmt);
}
function RDate_formatText(v, f){
   if(!v){
      return false;
   }
   f = f.toLowerCase();
   f = f.replace(/yyyy/g, v.substring(0, 4));
   v = v.substring(4);
   f = f.replace(/mm/g, v.substring(0, 2));
   v = v.substring(2);
   f = f.replace(/dd/g, v.substring(0, 2));
   v = v.substring(2);
   f = f.replace(/hh24/g, v.substring(0, 4));
   v = v.substring(4);
   f = f.replace(/mi/g, v.substring(0, 2));
   v = v.substring(2);
   f = f.replace(/ss/g, v.substring(0, 2));
   v = v.substring(2);
   return f;
}
function RDate_formatDate(date, fmt){
   if(!date){return '';}
   fmt = fmt ? fmt.toLowerCase() : this.DataFormat;
   fmt = fmt.replace(/yyyy/g, RInteger.format(date.year, 4));
   fmt = fmt.replace(/yy/g, RInteger.format(date.year%100, 2));
   fmt = fmt.replace(/mm/g, RInteger.format(date.month, 2));
   fmt = fmt.replace(/dd/g, RInteger.format(date.day, 2));
   fmt = fmt.replace(/hh24/g, RInteger.format(date.hour, 2));
   fmt = fmt.replace(/mi/g, RInteger.format(date.minute, 2));
   fmt = fmt.replace(/ss/g, RInteger.format(date.second, 2));
   fmt = fmt.replace(/ms/g, RInteger.format(date.ms, 3));
   return fmt;
}
function RDate_monthDays(year, month){
   if(!year || !month){return 0;}
   year = parseInt(year);
   month = parseInt(month);
   this.MonthDays[2] = (((year%4 == 0) || (year%400 == 0)) && (year%100 != 0)) ? 29 : 28 ;
   return this.MonthDays[month];
}
function RDate_splitFormat(v, f){
   if(!v){
      return false;
   }
   f = f.toLowerCase();
   var a = new Array();
   while(f.length > 0){
      if(f.indexOf('yyyy') == 0){
         a['year'] = v.substring(0, 4);
         f = f.substring(4);
         v = v.substring(4);
      }else if(f.indexOf('mm') == 0){
         a['month'] = v.substring(0, 2);
         f = f.substring(2);
         v = v.substring(2);
      }else if(f.indexOf('dd') == 0){
         a['day'] = v.substring(0, 2);
         f = f.substring(2);
         v = v.substring(2);
      }else if(f.indexOf('hh24') == 0){
         a['hour'] = v.substring(0, 2);
         f = f.substring(4);
         v = v.substring(2);
      }else if(f.indexOf('mi') == 0){
         a['minute'] = v.substring(0, 2);
         f = f.substring(2);
         v = v.substring(2);
      }else if(f.indexOf('ss') == 0){
         a['second'] = v.substring(0, 2);
         f = f.substring(2);
         v = v.substring(2);
      }else if(f.indexOf('ms') == 0){
         a['ms'] = v.substring(0, 2);
         f = f.substring(2);
         v = v.substring(3);
      }else{
         f = f.substring(1);
         v = v.substring(1);
      }
   }
   return a;
}
function RDate_checkItems(items){
   if(!items){
      return false;
   }
   var year = RInteger.parse(items["year"]);
   if(year < this.MinYear || year > this.MaxYear){
      return false;
   }
   var month = RInteger.parse(items["month"]);
   if(month < 1 || month > 12){
      return false;
   }
   var day = RInteger.parse(items["day"]);
   if(day < 1 || day > this.monthDays(year, month)){
      return false;
   }
   var hour = RInteger.parse(items["hour"]);
   if(hour < 0 || hour > 23){
      return false;
   }
   var second = RInteger.parse(items["second"]);
   if(second < 0 || second > 59){
      return false;
   }
   var ms = RInteger.parse(items["ms"]);
   if(ms < 0 || ms > 99){
      return false;
   }
   return true;
}
function RDate_check(value, format){
   return this.checkItems(this.splitFormat(value, format));
}
function RDate_makeDate(date, da){
   var d = new Date(RInteger.parse(da.year), RInteger.parse(da.month)-1, RInteger.parse(da.day), RInteger.parse(da.hour), RInteger.parse(da.minute), RInteger.parse(da.second), RInteger.parse(da.ms));
   if(date){
      date.setDate(d);
      return date;
   }
   return new TDate(d);
}
function RDate_parse(date, value, format){
   if(!format){
      format = this.DataFormat;
   }
   var items = this.splitFormat(value, format);
   if(this.checkItems(items)){
      return this.makeDate(date, items);
   }
   return null;
}
function RDate_splitDate(da, value){
   if(!value){ return; }
   var arDate = null;
   if(value.indexOf('-') != -1 || value.indexOf('/') != -1){
      if(value.indexOf('-') != -1){
         arDate = value.split('-');
      }else if(value.indexOf('/') != -1){
         arDate = value.split('/');
      }
      if(arDate.length >= 1){
         da.year = RInteger.parse(arDate[0]);
      }
      if(arDate.length >= 2){
         da.month = RInteger.parse(arDate[1]);
      }
      if(arDate.length >= 3){
         da.day = RInteger.parse(arDate[2]);
      }
   }else if(value.indexOf(':') != -1){
      this.splitTime(da, value);
   }else if(value.length == 14){
      da.year = RInteger.parse(value.substr(0, 4));
      da.month = RInteger.parse(value.substr(4, 2));
      da.day = RInteger.parse(value.substr(6, 2));
      da.hour = RInteger.parse(value.substr(8, 2));
      da.minute = RInteger.parse(value.substr(10, 2));
      da.second = RInteger.parse(value.substr(12, 2));
   }else if(value.length == 8){
      da.year = RInteger.parse(value.substr(0, 4));
      da.month = RInteger.parse(value.substr(4, 2));
      da.day = RInteger.parse(value.substr(6, 2));
   }else if(value.length == 6){
      da.year = RInteger.parse(value.substr(0, 4));
      da.month = RInteger.parse(value.substr(4, 2));
   }else if(value.length == 4){
      da.year = RInteger.parse(value);
   }
}
function RDate_splitTime(da, value){
   if(!value){ return; }
   if(value.indexOf(':') != -1){
      var ar = value.split(':');
      if(ar.length >= 1){
         da.hour = RInteger.parse(ar[0]);
      }
      if(ar.length >= 2){
         da.minute = RInteger.parse(ar[1]);
      }
      if(ar.length >= 3){
         da.second = RInteger.parse(ar[2]);
      }
   }else if(value.length == 6){
      da.hour = RInteger.parse(value.substr(0, 2));
      da.minute = RInteger.parse(value.substr(2, 2));
      da.second = RInteger.parse(value.substr(4, 2));
   }else if(value.length == 4){
      da.hour = RInteger.parse(value.substr(0, 2));
      da.minute = RInteger.parse(value.substr(2, 2));
   }else if(value.length == 2){
      da.hour = RInteger.parse(value.substr(0, 2));
   }
}
function RDate_autoParse(d, v){
   if(!v){
      return null;
   }
   var o = this;
   d = o.nvl(d);
   var items = new Array();
   items['year'] = 2000;
   items['month'] = 1;
   items['day'] = 1;
   items['hour'] = 0;
   items['minute'] = 0;
   items['second'] = 0;
   v = RString.trim(v);
   if(v.indexOf(' ') == -1){
      o.splitDate(items, v);
   }else{
      var ar = v.split(' ');
      if(ar.length == 2){
         o.splitDate(items, ar[0]);
         o.splitTime(items, ar[1]);
      }
   }
   return o.checkItems(items) ? o.makeDate(d, items) : null ;
}
function RDate_getFormat(value){
   var o = this;
   var da = new Object();
   var f = '';
   var v = '';
   if(!value){ return; }
   if(value.indexOf(':') != -1){
      var as = RString.split(value, ' ');
      if(as.length == 1){
         var as1 = RString.split(as[0], ':');
         if(as1.length == 1){
            f += 'HH24';
            if(as1[0].length == 1){
               v += ('0'+as1[0]);
            }else{
               v += as1[0];
            }
         }else if(as1.length == 2){
            f += 'HH24MI';
            if(as1[0].length == 1){
               v += ('0'+as1[0]);
            }else if(as1[0].length == 2){
               v += as1[0];
            }
            if(as1[1].length == 1){
               v += ('0'+as1[1]);
            }else if(as1[1].length == 2){
               v += as1[1];
            }
         }else if(as1.length == 3){
            f += 'HH24MISS';
            if(as1[0].length == 1){
               v += ('0'+as1[0]);
            }else if(as1[0].length == 2){
               v += as1[0];
            }
            if(as1[1].length == 1){
               v += ('0'+as1[1]);
            }else if(as1[1].length == 2){
               v += as1[1];
            }
            if(as1[2].length == 1){
               v += ('0'+as1[2]);
            }else if(as1[2].length == 2){
               v += as1[2];
            }
         }
      }else if(as.length == 2){
         var as0 = RString.split(as[0], '-');
         if(as0.length == 3){
            f += 'YYYYMMDD';
            if(as0[0].length == 4){
               v += as0[0];
            }
            if(as0[1].length == 1){
               v += ('0'+as0[1]);
            }else if(as0[1].length == 2){
               v += as0[1];
            }
            if(as0[2].length == 1){
               v += ('0'+as0[2]);
            }else if(as0[2].length == 2){
               v += as0[2];
            }
         }else if(as0.length == 2){
            f += 'YYYYMM';
            if(as0[0].length == 1){
               v += as0[0];
            }
            if(as0[1].length == 1){
               v += ('0'+as0[1]);
            }else if(as0[1].length == 2){
               v += as0[1];
            }
         }else if(as0.length == 1){
            f += 'YYYY';
            if(as0[0].length == 4){
               v += as0[0];
            }
         }
         var as1 = RString.split(as[1], ':');
         if(as1.length == 1){
            f += 'HH24';
            if(as1[0].length == 1){
               v += ('0'+as1[0]);
            }else{
               v += as1[0];
            }
         }else if(as1.length == 2){
            f += 'HH24MI';
            if(as1[0].length == 1){
               v += ('0'+as1[0]);
            }else if(as1[0].length == 2){
               v += as1[0];
            }
            if(as1[1].length == 1){
               v += ('0'+as1[1]);
            }else if(as1[1].length == 2){
               v += as1[1];
            }
         }else if(as1.length == 3){
            f += ' HH24MISS';
            if(as1[0].length == 1){
               v += ('0'+as1[0]);
            }else if(as1[0].length == 2){
               v += as1[0];
            }
            if(as1[1].length == 1){
               v += ('0'+as1[1]);
            }else if(as1[1].length == 2){
               v += as1[1];
            }
            if(as1[2].length == 1){
               v += ('0'+as1[2]);
            }else if(as1[2].length == 2){
               v += as1[2];
            }
         }
      }
   }else{
      var as = RString.split(value, '-');
      if(as.length == 3){
         f += 'YYYYMMDD';
         if(as[0].length == 4){
            v += as[0];
         }
         if(as[1].length == 1){
            v += ('0'+as[1]);
         }else if(as[1].length == 2){
            v += as[1];
         }
         if(as[2].length == 1){
            v += ('0'+as[2]);
         }else if(as[2].length == 2){
            v += as[2];
         }
      }else if(as.length == 2){
         f = 'YYYYMM';
         if(as[0].length == 4){
            v += as[0];
         }
         if(as[1].length == 1){
            v += ('0'+as[1]);
         }else if(as[1].length == 2){
            v += as[1];
         }
      }else if(as.length == 1){
         f += 'YYYY';
         if(as[0].length == 4){
            v += as[0];
         }
      }
   }
   var ar = new Array(2);
   ar[0] = f;
   ar[1] = v;
   return ar;
}
var REnum = new function REnum(){
   var o = this;
   o.contains  = REnum_contains;
   o.tryEncode = REnum_tryEncode;
   o.encode    = REnum_encode;
   o.tryDecode = REnum_tryDecode;
   o.decode    = REnum_decode;
   o.parse     = REnum_encode;
   o.format    = REnum_decode;
   return o;
}
function REnum_contains(){
}
function REnum_tryEncode(e, v, d){
   if(e != null){
      for(var n in e){
         if(n.toLowerCase() == v.toLowerCase()){
            return e[n];
         }
      }
   }
   return d;
}
function REnum_encode(e, v){
   var o = this;
   var r = o.tryEncode(e, v);
   if(r == null){
      throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(e), v);
   }
   return r;
}
function REnum_tryDecode(e, v, d){
   if(e != null){
      for(var n in e){
         if(e[n] == v){
            return n;
         }
      }
   }
   return d;
}
function REnum_decode(e, v){
   var o = this;
   var r = o.tryDecode(e, v);
   if(r == null){
      throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(e), v);
   }
   return r;
}
var RFile = new function(){
   var o = this;
   o.pictures  = ['jpg', 'png', 'gif', 'bmp'];
   o.knowns    = ['jpg', 'png', 'gif', 'bmp', 'doc', 'docx', 'vsd', 'xls', 'xlsx'];
   o.inPicture = RFile_inPicture;
   o.isPicture = RFile_isPicture;
   o.isKnown   = RFile_isKnown;
   o.extend    = RFile_extend;
   RMemory.register('RFile', o);
   return o;
}
function RFile_inPicture(v){
   var o = this;
   if(v){
      v = v.toLowerCase();
      for(var n in o.pictures){
         if(o.pictures[n] == v){
            return true;
         }
      }
   }
}
function RFile_isPicture(v){
   return this.inPicture(this.extend(v));
}
function RFile_isKnown(v){
   var o = this;
   v = o.extend(v).toLowerCase();
   for(var n in o.knowns){
      if(o.knowns[n] == v){
         return true;
      }
   }
   return false;
}
function RFile_extend(v){
   if(v){
      v = v.replace(/\\/g, '/');
      var p1 = v.lastIndexOf('/');
      if(-1 != p1){
         v = v.substring(p1 + 1);
      }
      var p2 = v.lastIndexOf('.');
      if(-1 != p2){
         return v.substring(p2 + 1);
      }
      return v;
   }
   return '';
}
var RFloat = new function RFloat(){
   var o = this;
   o.Chars     = '0123456789-.%';
   o.NUMBER    = '0123456789-.%';
   o.LEFT_CHAR = '0';
   o.isFloat   = RFloat_isFloat;
   o.parse     = RFloat_parse;
   o.format    = RFloat_format;
   o.nvl       = RFloat_nvl;
   o.toRange   = RFloat_toRange;
   o.sum       = RFloat_sum;
   o.alg       = RFloat_alg;
   return o;
}
function RFloat_isFloat(value){
   return RString.isPattern(value, 'n');
}
function RFloat_parse(value){
   if(value == null){
      return 0;
   }
   value = RString.trim(value.toString());
   while(true){
      if(value.charAt(0) != "0"){
         break;
      }
      value = value.substr(1);
   }
   var rs = (value.length > 0) ? parseFloat(value) : 0;
   if(-1 != RString.findChars(value, '%')){
      rs = rs / 100;
   }
   return isNaN(rs) ? 0 : rs;
}
function RFloat_format(value, len, pad){
   if(!pad){
      pad = this.LEFT_CHAR;
   }
   var value = value.toString();
   var left = parseFloat(len) - value.length;
   for(var i=0; i<left; i++){
      value = pad + value;
   }
   return value;
}
function RFloat_nvl(v, d){
   return v ? v : (d ? d : 0);
}
function RFloat_toRange(v, min, max){
   if(null == v){
      v = 0;
   }
   return Math.min(Math.max(v, min), max);
}
function RFloat_sum(){
   var sum = 0;
   for(var n=0; n<arguments.length; n++){
      if(null != arguments[n]){
         sum += parseFloat(arguments[n]);
      }
   }
   return sum;
}
function RFloat_alg(f,a,b){
     var a = RFloat.nvl(a);
     var b = RFloat.nvl(b);
     a = parseFloat(a);
     b = parseFloat(b);
     if(f){
        return (a + b).toString();
     }else{
        return (a - b).toString();
     }
}
var RHex = new function(o){
   if(!o){o=this};
   o.NUMBER  = '0x123456789ABCDEF';
   o.PAD     = '0';
   o.isValid = RHex_isValid;
   o.parse   = RHex_parse;
   o.format  = RHex_format;
   RMemory.register('RHex', o);
   return o;
}
function RHex_isValid(v){
   return RString.isPattern(v, this.NUMBER);
}
function RHex_parse(v){
   return v ? parseInt('0x'+v) : '0';
}
function RHex_format(v, l){
   v = RString.nvl(v, '0').toString(16);
   return l ? RString.lpad(v, l, this.PAD) : v;
}
var RInstance = new function RInstance(){
   var o = this;
   o._pools = new TDictionary();
   o.pool   = RInstance_pool;
   o.get    = RInstance_get;
   o.alloc  = RInstance_alloc;
   o.free   = RInstance_free;
   return o;
}
function RInstance_pool(p){
   var o = this;
   var n = RClass.name(p);
   var v = o._pools.get(n);
   if(v == null){
      v = new TInstancePool();
      o._pools.set(n, v);
   }
   return v;
}
function RInstance_get(p){
   return this.pool(p).instance(p);
}
function RInstance_alloc(n){
   return this.pool(p).alloc(p);
}
function RInstance_free(n){
   this.pool(p).free(p);
}
var RInteger = new function RInteger(){
   var o = this;
   o.Chars     = '0123456789-%';
   o.NUMBER    = '0123456789-%';
   o.LEFT_CHAR = '0';
   o.isInt     = RInteger_isInt;
   o.nvl       = RInteger_nvl;
   o.parse     = RInteger_parse;
   o.format    = RInteger_format;
   o.toRange   = RInteger_toRange;
   o.sum       = RInteger_sum;
   o.calculate = RInteger_calculate;
   return o;
}
function RInteger_isInt(v){
   return RString.isPattern(v, 'n');
}
function RInteger_nvl(v, d){
   return v ? v : (d ? d : 0);
}
function RInteger_parse(v, d){
   if(d == null){
      d = 0;
   }
   if(v == null){
      return d;
   }
   v = RString.trim(v.toString());
   while(true){
      if('0' != v.charAt(0)){
         break;
      }
      v = v.substr(1);
   }
   var r = (v.length > 0) ? parseInt(v) : d;
   return isNaN(r) ? d : r;
}
function RInteger_format(v, l, p){
   if(!p){
      p = this.LEFT_CHAR;
   }
   var v = v.toString();
   for(var i = parseInt(l) - v.length - 1; i >= 0; i--){
      v = p + v;
   }
   return v;
}
function RInteger_toRange(v, i, a){
   if(v == null){
      v = 0;
   }
   if(v < i){
      v = i;
   }
   if(v > a){
      v = a;
   }
   return v;
}
function RInteger_sum(){
   var r = 0;
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         r += parseInt(a[n]);
      }
   }
   return r;
}
function RInteger_calculate(f, a, b){
   var a = RInteger.parse(a);
   var b = RInteger.parse(b);
   var r = '';
   if(f == '+'){
      r = a + b;
   }else if(f == '-'){
      r = a - b;
   }else if(f == 'x'){
      r = a * b;
   }else if(f == '/'){
     r = a / b;
   }
   return r.toString();
}
var RLogger = new function RLogger(){
   var o = this;
   o._statusError = false;
   o.lsnsOutput   = new TListeners();
   o.output       = RLogger_output;
   o.debug        = RLogger_debug;
   o.info         = RLogger_info;
   o.warn         = RLogger_warn;
   o.error        = RLogger_error;
   o.fatal        = RLogger_fatal;
   return o;
}
function RLogger_output(p){
   this.lsnsOutput.process(p);
}
function RLogger_debug(sf, ms, pm){
   var n = RMethod.name(RLogger_debug.caller);
   n = n.replace('_', '.');
   var r = new TString();
   r.append(RDate.format('yymmdd-hh24miss.ms'));
   r.append('|D [' + RString.rpad(n, 40) + '] ');
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a){
         if(typeof(a) == 'function'){
            s = RMethod.name(a);
         }else{
            s = a.toString();
         }
      }
      ms = ms.replace('{' + (n - 1) + '}', s);
   }
   r.append(ms);
   RLogger.output(r.toString());
}
function RLogger_info(sf, ms, pm){
   var n = RMethod.name(RLogger_info.caller);
   n = n.replace('_', '.');
   var r = new TString();
   r.append(RDate.format('yymmdd-hh24miss.ms'));
   r.append('|I [' + RString.rpad(n, 40) + '] ');
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a){
         if(typeof(a) == 'function'){
            s = RMethod.name(a);
         }else{
            s = a.toString();
         }
      }
      ms = ms.replace('{' + (n - 1) + '}', s);
   }
   r.append(ms);
   RLogger.output(r.toString());
}
function RLogger_warn(sf, ms, pm){
   var n = RMethod.name(RLogger_warn.caller);
   n = n.replace('_', '.');
   var r = new TString();
   r.append(RDate.format('yymmdd-hh24miss.ms'));
   r.append('|W [' + RString.rpad(n, 40) + '] ');
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a){
         if(typeof(a) == 'function'){
            s = RMethod.name(a);
         }else{
            s = a.toString();
         }
      }
      ms = ms.replace('{' + (n - 1) + '}', s);
   }
   r.append(ms);
   RLogger.output(r.toString());
}
function RLogger_error(self, method, msg, params){
   if(this._statusError){
      return;
   }
   this._statusError = true;
   throw new Error(msg);
}
function RLogger_fatal(sf, er, ms, pm){
   var o = this;
   if(o._statusError){
      return;
   }
   o._statusError = true;
   var s = new TString();
   var t = new Array();
   var f = RLogger_fatal.caller;
   while(f){
      if(RArray.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + RMethod.name(f));
   }
   var m = new TString();
   m.appendLine(RContext.get('RMessage:fatal'));
   m.appendLine(RString.repeat('-', 60));
   m.append(RClass.dump(sf), ': ');
   if(ms){
      var ag = arguments;
      c = ag.length;
      for(var n = 3; n < c; n++){
         var p = ag[n];
         if('function' == typeof(p)){
            p = RMethod.name(p);
         }
         var pi = n - 2;
         ms = ms.replace('{' + pi + '}', p);
      }
   }
   m.appendLine(ms);
   m.appendLine(RString.repeat('-', 60));
   m.appendLine('Stack:');
   m.append(s);
   alert(m);
}
var RMethod = new function RMethod(){
   var o = this;
   o.virtuals   = new Object();
   o.events     = new Object();
   o.isFunction = RMethod_isFunction;
   o.isEmpty    = RMethod_isEmpty;
   o.isVirtual  = RMethod_isVirtual;
   o.name       = RMethod_name;
   o.fullName   = RMethod_fullName;
   o.empty      = RMethod_empty;
   o.emptyTrue  = RMethod_emptyTrue;
   o.emptyFalse = RMethod_emptyFalse;
   o.emptyCall  = RMethod_emptyCall;
   o.virtual    = RMethod_virtual;
   o.empty.__empty = true;
   o.emptyTrue.__empty = true;
   o.emptyFalse.__empty = true;
   return o;
}
function RMethod_isFunction(v){
   return typeof(v) == 'function';
}
function RMethod_isEmpty(v){
   return (v && v.__empty);
}
function RMethod_isVirtual(v){
   return (v && v.__virtual);
}
function RMethod_name(p){
   if(p){
      if(typeof(p) == 'function'){
         if(p.__name){
            return p.__name;
         }
         var s = p.toString();
         var n = p.__name = RString.mid(s, 'function ', '(');
         return n;
      }
   }
   return null;
}
function RMethod_fullName(p){
   if(p){
      if(p.constructor == Function){
         if(p.__fullname){
            return p.__fullname;
         }
         var s = p.toString();
         var n = p.__fullname = RString.mid(s, 'function ', ')') + ')';
         return n;
      }
   }
   return null;
}
function RMethod_empty(){
}
function RMethod_emptyTrue(){
   return true;
}
function RMethod_emptyFalse(){
   return false;
}
function RMethod_emptyCall(){
}
function RMethod_virtual(v, m){
   var o = this;
   var n = RClass.name(v) + '.' + m;
   if(o.virtuals[n]){
      return o.virtuals[n];
   }
   var f = function(){throw new Error('Virtual method be called.(' + n + ')');};
   f.__virtual = true;
   f.__name = n;
   o.virtuals[n] = f;
   return f;
}
var RObject = new function RObject(){
   var o = this;
   o.nvl   = RObject_nvl;
   o.clone = RObject_clone;
   o.copy  = RObject_copy;
   return o;
}
function RObject_nvl(v){
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         return a[n];
      }
   }
   return null;
}
function RObject_clone(o){
   var r = new o.constructor();
   for(var n in o){
      var v = o[n];
      if(v != null){
         if(!RClass.isBaseType(v.constructor)){
            v = RObject.clone(v);
         }
      }
      r[n] = v;
   }
   return r;
}
function RObject_copy(s, t){
   if((s != null) && (t != null)){
      for(var n in s){
         var v = s[n];
         if(v != null){
            if(!RClass.isBaseType(v.constructor)){
               if(t[n] == null){
                  t[n] = new c();
               }
               RObject.copy(v, t[n]);
            }
         }
         t[n] = v;
      }
   }
}
var RRandom = new function(o){
   if(!o){o=this};
   o.seed = (new Date()).getTime();
   o.get  = RRandom_get;
   o.rand = RRandom_rand;
   RMemory.register('RRandom', o);
   return o;
}
function RRandom_get(){
   var o = this;
   o.seed = (o.seed * 9301 + 49297) % 233280;
   return o.seed/(233280.0);
}
function RRandom_rand(n){
   return Math.ceil(this.get()*n);
}
var RRect = new function(){
   var o = this;
   o.nvl    = RRect_nvl;
   o.pack   = RRect_pack;
   o.unpack = RRect_unpack;
   RMemory.register('RRect', o);
   return o;
}
function RRect_nvl(rect){
   return rect ? rect : new TRect();
}
function RRect_pack(rect){
   var pack = null;
   if(rect){
      pack = rect.left + ',' + rect.top + ',' + rect.right + ',' + rect.bottom;
   }
   return pack;
}
function RRect_unpack(pack, rect){
   rect = this.nvl(rect);
   if(pack){
      var items = pack.split(',');
      if(items.length == 4){
         rect.left = RInt.parse(items[0]);
         rect.top = RInt.parse(items[1]);
         rect.right = RInt.parse(items[2])
         rect.bottom = RInt.parse(items[3]);
      }
   }
   return rect;
}
var RRegExp = new function RRegExp(){
   var o = this;
   o.test        = RRegExp_test;
   o.testRgexp   = RRegExp_testRgexp;
   return o;
}
function RRegExp_test(r,s){
   if(r && s != null){
      return r.test(s);
   }
   return false;
}
function RRegExp_testRgexp(eps,s){
   if(eps && s){
      var r = new R
      return eps.test(s);
   }
   return false;
}
function RRegExp_test1(t,s,c){
   return  1;
}
function RStr_testRgexp2(){
   return 2;
}
var RSet = new function RSet(){
   var o = this;
   o.contains       = RSet_contains;
   o.containsString = RSet_containsString;
   return o;
}
function RSet_contains(v, d){
   return (v & d) == d;
}
function RSet_containsString(v, d){
   if((v != null) && (s != null)){
      return v.indexOf(s) != -1;
   }
   return false;
}
var RString = new function RString(){
   var o = this;
   o.EMPTY        = '';
   o.SPACE        = '   ';
   o.PAD          = ' ';
   o.TRIM         = ' \t\r\n';
   o.LOWER        = 'abcdefghijklmnopqrstuvwxyz';
   o.UPPER        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   o.CodeLowerA   = 'a'.charCodeAt(0);
   o.CodeLowerZ   = 'z'.charCodeAt(0);
   o.CodeUpperA   = 'A'.charCodeAt(0);
   o.CodeUpperZ   = 'Z'.charCodeAt(0);
   o.isEmpty      = RString_isEmpty;
   o.isBlank      = RString_isBlank;
   o.isAnsi       = RString_isAnsi;
   o.isDbcs       = RString_isDbcs;
   o.isPattern    = RString_isPattern;
   o.inChars      = RString_inChars;
   o.contains     = RString_contains;
   o.equals       = RString_equals;
   o.startsWith   = RString_startsWith;
   o.endsWith     = RString_endsWith;
   o.findChars    = RString_findChars;
   o.inRange      = RString_inRange;
   o.nvl          = RString_nvl;
   o.firstUpper   = RString_firstUpper;
   o.firstLower   = RString_firstLower;
   o.firstLine    = RString_firstLine;
   o.format       = RString_format;
   o.repeat       = RString_repeat;
   o.pad          = RString_pad;
   o.lpad         = RString_lpad;
   o.rpad         = RString_rpad;
   o.trim         = RString_trim;
   o.ltrim        = RString_ltrim;
   o.rtrim        = RString_rtrim;
   o.mid          = RString_mid;
   o.toLine       = RString_toLine;
   o.toUnderline  = RString_toUnderline;
   o.toLower      = RString_toLower;
   o.toUpper      = RString_toUpper;
   o.split        = RString_split;
   o.splitTwo     = RString_splitTwo;
   o.splitParts   = RString_splitParts;
   o.splitPattern = RString_splitPattern;
   o.remove       = RString_remove;
   o.removeChars  = RString_removeChars;
   o.formatLines  = RString_formatLines;
   return o;
}
function RString_isEmpty(v){
   if(v != null){
      return (v.length == 0);
   }
   return true;
}
function RString_isBlank(v){
   if(v != null){
      return (v.trim().length == 0);
   }
   return true;
}
function RString_isAnsi(v){
   if(v != null){
      var c = v.length;
      for(var n = 0; n < c; n++){
         if(v.charCodeAt(n) > 255){
            return false;
         }
      }
      return true;
   }
   return false;
}
function RString_isDbcs(v){
   if(v == null){
      var c = v.length;
      for(var n = 0; n < c; n++){
         if(value.charCodeAt(n) < 256){
            return false;
         }
      }
      return true;
   }
   return false;
}
function RString_isPattern(v, p){
   if(v != null){
      var o = this;
      if(p == null){
         p = '$a$A$f';
      }
      p = p.replace(/\a/g, o.LOWER);
      p = p.replace(/\A/g, o.UPPER);
      p = p.replace(/\f/g, RFloat.NUMBER);
      p = p.replace(/\n/g, RInt.NUMBER);
      var c = v.length;
      for(var n = 0; n < c; n++){
         if(p.indexOf(v.charAt(n)) == -1){
            return false;
         }
      }
      return true;
   }
   return false;
}
function RString_inChars(v, p){
   var o = this;
   var b = o.findChars(p, v);
   if(b != -1){
      return true;
   }
   return false;
}
function RString_contains(v, s){
   if((v != null) && (s != null)){
      return (v.toString().indexOf(s) != -1);
   }
   return false;
}
function RString_equals(s, t, f){
   if((s != null) && (t != null)){
      if(s.constructor != String){
         s = s.toString();
      }
      if(t.constructor != String){
         t = t.toString();
      }
      if(f){
         return (s == t);
      }else{
         return (s.toLowerCase() == t.toLowerCase());
      }
   }
   return false;
}
function RString_startsWith(v, s){
   if(s == null){
      return true;
   }
   return (v != null) ? (v.indexOf(s) == 0) : false;
}
function RString_endsWith(v, s){
   if(s == null){
      return true;
   }
   var n = (v != null) ? v.indexOf(s) : -1;
   return (n != -1) ? (n == (v.length - s.length)) : false;
}
function RString_findChars(v, s){
   if((v != null) && (s != null)){
      var c = v.length;
      for(var n = 0; n < c; n++){
         if(s.indexOf(v.charAt(n)) != -1){
            return n;
         }
      }
   }
   return -1;
}
function RString_inRange(v, rs, f){
   if(v && rs){
      if(!f){
         v = v.toLowerCase();
      }
      var c = rs.length;
      for(var n = 0; n < c; n++){
         var r = rs[n];
         if(r != null){
            if(f){
               if(v == r){
                  return true;
               }
            }else{
               if(v == r.toLowerCase()){
                  return true;
               }
            }
         }
      }
   }
   return false;
}
function RString_nvl(v, d){
   if(typeof(v) == 'string'){
      if(v.length > 0){
         return v;
      }
   }
   return (d != null) ? d : this.EMPTY;
}
function RString_firstUpper(v){
   return (v != null) ? v.charAt(0).toUpperCase() + v.substr(1) : v;
}
function RString_firstLower(){
   return (v != null) ? v.charAt(0).toLowerCase() + v.substr(1) : v;
}
function RString_firstLine(v){
   if(v){
      var n = Math.min(v.indexOf('\r'), v.indexOf('\n'));
      if(-1 != n){
         return v.substr(0, n);
      }
      return v;
   }
   return '';
}
function RString_format(s, p){
   var a = arguments;
   var c = a.length;
   for(var n = 1; n < c; n++){
      var p = a[n];
      if(typeof(p) == 'function'){
         p = RMethod.name(p);
      }else if(p == null){
         p = '';
      }
      s = s.replace('{' + (n-1) + '}', p);
   }
   return s;
}
function RString_repeat(v, c){
   return new Array(c + 1).join(v);
}
function RString_pad(v, l, p){
   v = (v != null) ? v.toString() : this.EMPTY;
   var n = l - v.length;
   if(n > 0){
      if(p == null){
         p = this.PAD;
      }
      var r = (n % 2 == 0) ? n / 2 : (n - 1) / 2;
      return new Array(r + 1).join(p) + v + new Array(n - r + 1).join(p);
   }
   return v;
}
function RString_lpad(v, l, p){
   var o = this;
   v = (v != null) ? v.toString() : o.EMPTY;
   var n = l - v.length;
   if(n > 0){
      if(p == null){
         p = o.PAD;
      }
      var a = new Array(n);
      a[a.length] = v;
      return a.join(p);
   }
   return v;
}
function RString_rpad(v, l, p){
   var o = this;
   v = (v != null) ? v.toString() : o.EMPTY;
   var n = l - v.length;
   if(n > 0){
      if(p == null){
         p = o.PAD;
      }
      return v + new Array(n + 1).join(p);
   }
   return v;
}
function RString_trim(v, ts){
   var o = this;
   v = o.nvl(v);
   ts = o.nvl(ts, o.TRIM);
   var l = 0;
   var r = v.length - 1;
   for(; l < r; l++){
      if(-1 == ts.indexOf(v.charAt(l))){
         break;
      }
   }
   for(; r >= l; r--){
      if(-1 == ts.indexOf(v.charAt(r))){
         break;
      }
   }
   if(l == r + 1){
      return null;
   }
   if((l != 0) || (r != v.length-1)){
      return v.substring(l, r + 1);
   }
   return v;
}
function RString_ltrim(v, ts){
   var o = this;
   v = o.nvl(value);
   ts = o.nvl(trims, o.TRIM);
   var l = 0;
   var r = v.length - 1;
   for(; l < r; l++){
      if(-1 == ts.indexOf(v.charAt(l))){
         break;
      }
   }
   if(0 != l){
      return v.substring(l, r + 1);
   }
   return v;
}
function RString_rtrim(v, ts){
   var o = this;
   v = o.nvl(v);
   ts = o.nvl(ts, o.TRIM);
   var r = v.length - 1;
   for(; r >= 0; r--){
      if(-1 == ts.indexOf(v.charAt(r))){
         break;
      }
   }
   if(r != v.length-1){
      return v.substring(0, r + 1);
   }
   return v;
}
function RString_mid(v, b, e){
   if(v == null){
      return v;
   }
   var l = 0;
   if(b != null){
      var f = v.indexOf(b);
      if(f != -1){
         l = f + b.length;
      }
   }
   var r = v.length;
   if(e != null){
      var f = v.indexOf(e, l);
      if(f != -1){
         r = f;
      }
   }
   return v.substring(l, r);
}
function RString_toLine(v){
   return v.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
}
function RString_toUnderline(v){
   var r = null;
   if(v){
      var s = new TString();
      var c = v.length;
      for(var i = 0; i < c; i++){
         var h = v.charAt(i);
         if(h.toUpperCase() == h){
            if(i > 0){
               s.append('_');
            }
            s.append(h.toLowerCase());
         }else{
            s.append(h);
         }
      }
      r = s.toString();
   }
   return r;
}
function RString_toLower(v){
   return (v != null) ? v.toLowerCase() : this.EMPTY;
}
function RString_toUpper(v){
   return (v != null) ? v.toUpperCase() : this.EMPTY;
}
function RString_split(s, p){
   return (s && p) ? s.split(p) : null;
}
function RString_splitTwo(s, p){
   if(s && p){
      var r = new Array();
      var n = s.indexOf(p);
      if(n == -1){
         r.push(s);
      }else{
         r.push(s.substring(0, n));
         r.push(s.substring(n+p.length));
      }
      return r;
   }
   return null;
}
function RString_splitParts(s, p){
   var o = this;
   var b = new Array();
   var k = 0;
   var l = s.length;
   for(var i = 0; i < l; i++){
      for(var j in p){
         if(o.startsWith(p[j], s.charAt(i))){
            if(o.equals(s.substr(i, p[j].length), p[j])){
               b[k++] = p[j];
               i = i + p[j].length - 1;
               break;
            }
         }
      }
   }
   return b;
}
function RString_splitPattern(s, p){
   var r = new Array();
   if(s){
      var sl = s.length;
      var pl = p.length;
      var t = '';
      for(var n = 0; n < sl; n++){
         var v = false;
         for(var i = 0; i < pl; i++){
            var f = p[i];
            if(s.indexOf(f) == 01){
               if(t.length){
                  r[r.length] = t;
                  t = '';
               }
               r[r.length] = f;
               s = s.substring(f.length);
               v = true;
               break;
            }
         }
         if(!v){
            t += s.charAt(0);
            s = s.substring(1);
         }
      }
   }
   return r;
}
function RString_remove(s, t){
   return s.replace(t, '');
}
function RString_removeChars(v, s){
   if(v != null){
      var c = v.length;
      var r = new Array();
      for(var n = 0; n < c; n++){
         var a = v.charAt(n);
         if(s.indexOf(a) != -1){
            continue;
         }
         r[r.length] = a;
      }
      return r.join('');
   }
   return v;
}
function RString_formatLines(p){
   var o = this;
   p = p.replace(/\\r/g, '');
   var ls = p.split('\n');
   var c = ls.length;
   var r = new TString();
   for(var i = 0; i < c; i++){
      var l = ls[i]
      l = o.trim(l);
      if(o.isEmpty(l)){
         continue;
      }
      if(o.startsWith(l, '//')){
         continue;
      }
      r.appendLine(l);
   }
   return r.toString();
}
var RTimer = new function RTimer(){
   var o = this;
   o._startTime = 0;
   o._lastTime  = 0;
   o._count     = 0;
   o.setup      = RTimer_setup;
   o.current    = RTimer_current;
   o.rate       = RTimer_rate;
   o.update     = RTimer_update;
   return o;
}
function RTimer_setup(){
   var o = this;
   var n = new Date().getTime();
   o._startTime = n;
   o._lastTime = n;
}
function RTimer_current(){
   return this._lastTime;
}
function RTimer_rate(){
   var o = this;
   if(o._count == 0){
      return 0;
   }
   var t = o._lastTime - o._startTime;
   var c = o._count * 1000 / t;
   return parseInt(c);
}
function RTimer_update(){
   var o = this;
   o._count++;
   o._lastTime = new Date().getTime();
}
function SEnumItem(o){
   if(!o){o = this;}
   o.name  = null;
   o.value = 0;
   return o;
}
function TClass(o){
   if(!o){o = this;}
   o.__disposed     = true;
   o._unused        = null;
   o._annotations   = new Object();
   o._attributes    = new Object();
   o.name           = null;
   o.parent         = null;
   o.base           = null;
   o.clazz          = null;
   o.instance       = null;
   o.abstract       = false;
   o.styles         = new Array();
   o.instances      = new Array();
   o.register       = TClass_register;
   o.assign         = TClass_assign;
   o.annotations    = TClass_annotations;
   o.annotation     = TClass_annotation;
   o.annotationFind = TClass_annotationFind;
   o.attributeFind  = TClass_attributeFind;
   o.style          = TClass_style;
   o.build          = TClass_build;
   o.newInstance    = TClass_newInstance;
   o.free           = TClass_free;
   o.alloc          = TClass_alloc;
   return o;
}
function TClass_register(v){
   var o = this;
   var a = v.annotationCd();
   var n = v.name();
   var c = v.code();
   if(!a || !c){
      throw new TError(o, "Unknown annotation. (class={1},annotation={2},name={3},code={4})", RClass.dump(o), a, n, c);
   }
   var as = o._annotations[a];
   if(!as){
      as = o._annotations[a] = new Object();
   }
   if(as[c]){
      throw new TError(o, "Duplicate annotation. (class={1},annotation={2},name={3},code={4},value={5})", RClass.dump(o), a, n, c, v.toString());
   }
   as[c] = v;
   o._attributes[n] = v;
}
function TClass_assign(c){
   var o = this;
   for(var an in c._annotations){
      var ls = o._annotations[an];
      if(!ls){
         ls = o._annotations[an] = new Object();
      }
      var as = c._annotations[an];
      for(var n in as){
         if(ls[n]){
            RLogger.fatal(o, null, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})", an, o.name, n, c.name, n, a.toString());
         }
         var a = as[n];
         if(a._inherit){
            ls[n] = a;
         }
      }
   }
   for(var n in c._attributes){
      var a = c._attributes[n];
      if(a.construct != Function){
         o._attributes[n] = c._attributes[n];
      }
   }
}
function TClass_annotations(a){
   var o = this;
   var r = o._annotations[a];
   if(!r){
      RLogger.fatal(o, null, "Can't find annotations. (annotation={1}, class={2})", a, o.name);
   }
   return r;
}
function TClass_annotation(a, n){
   var o = this;
   var r = null;
   var as = o._annotations[a];
   if(as){
      r = as[n];
   }
   if(!r){
      RLogger.fatal(o, null, "Can't find annotation. (annotation={1}, name={2}, class={3})", a, n, o.name);
   }
   return r;
}
function TClass_annotationFind(p){
   var o = this;
   var r = null;
   for(var n in o._annotations){
      var as = o._annotations[n];
      if(as){
         var a = as[p];
         if(a != null){
            if(a.constructor != Function){
               return a;
            }
         }
      }
   }
   return null;
}
function TClass_attributeFind(p){
   var a = this._attributes[p];
   if(a){
      if(a.constructor != Function){
         return a;
      }
   }
   return null;
}
function TClass_style(n){
   var o = this;
   if(o.styles[n]){
      return o.styles[n];
   }
   var a = null;
   var p = o;
   while(p){
      var as = p._annotations[EAnnotation.Style];
      if(as){
         a = as[n];
         if(a){
            break;
         }
      }
      p = p.parent;
   }
   if(!a){
      RLogger.fatal(o, null, "No register style annotation. (name={1}, linker={2}, class={3})", o.name + '_' + n, o.liner, o.name);
   }
   var sn = p.name + '_' + a.style();
   o.styles[n] = sn;
   return sn;
}
function TClass_build(){
   var o = this;
   for(var n in o.instance){
      var v = o.instance[n];
      if(v != null){
         if((v.constructor == Function) && v.__virtual){
            o.abstract = true;
            break;
         }
      }
   }
   var ps = o._annotations[EAnnotation.Property];
   if(ps){
      for(var n in ps){
         var p = ps[n];
         p.build(o.instance);
      }
   }
}
function TClass_newInstance(){
   var o = this;
   var r = o.alloc();
   if(!r){
      if(o.abstract){
         var s = new TString();
         for(var n in o.instance){
            var v = o.instance[n];
            if(RMethod.isVirtual(v)){
               if(!s.isEmpty()){
                  s.append(',');
               }
               s.append(v._name);
            }
         }
         return RLogger.fatal(o, null, "Abstract Class can't be create.(name={1})\n[{2}]", o.name, s);
      }
      var ro = o.instance;
      if(!ro){
         return RLogger.fatal(o, null, "Class instance is empty. (name={1})", o.name);
      }
      r = new ro.constructor();
      for(var n in ro){
         var v = ro[n];
         if(v != null){
            if((n == '__base') || (n == '__inherits')){
               r[n] = ro[n];
               continue;
            }
            if(!RClass.isBase(v)){
               v = RObject.clone(v);
            }
         }
         r[n] = v;
      }
      r.__class = o;
      if(r.construct){
         r.construct();
      }
   }
   return r;
}
function TClass_alloc(){
   var o = this;
   var e = o._unused;
   if(e){
      o._unused = e.cnext;
      e.cnext = null;
      e._using = true;
   }
   return e;
}
function TClass_free(v){
   var o = this;
   if(v._using){
      var u = o._unused;
      v.cnext = u;
      o._unused = v;
      v._using = false;
      for(var n in v){
         var cv = v[n];
         if(cv){
            if(!RClass.isBase(cv)){
               if(cv._class){
                  o.free(cv);
               }else if(o.isClass(cv, Array)){
                  for(var i = 0; i < cv.length; i++){
                     var mv = cv[i];
                     if(mv._class){
                        o.free(mv);
                     }
                  }
               }
            }
         }
      }
   }
}
function TClassBase(o){
   if(!o){o = this;}
   o.__disposed = true;
   return o;
}
function TContext(n, c, t){
   var o = this;
   o.name = n;
   o.code = c;
   o.text = t;
   return o;
}
function TDataset(){
   if(!o){o = this;}
   o.name       = null;
   o.count      = 0;
   o.pageSize   = 20;
   o.pageIndex  = 0;
   o.pageCount  = 0;
   o.total      = 0;
   o.rows       = new TList();
   o.createRow  = TDataset_createRow;
   o.row        = TDataset_row;
   o.find       = TDataset_find;
   o.findIndex  = TDataset_findIndex;
   o.push       = TDataset_push;
   o.remove     = TDataset_remove;
   o.removeRow  = TDataset_removeRow;
   o.loadNode   = TDataset_loadNode;
   o.saveViewer = TDataset_saveViewer;
   o.clear      = TDataset_clear;
   o.pack       = TDataset_pack;
   o.dump       = TDataset_dump;
   return o;
}
function TDataset_createRow(){
   var o = this;
   var r = new TRow();
   r.dataset = o;
   o.rows.push(r);
   return r;
}
function TDataset_row(n){
   return (n >= 0 && n < this.count) ? this.rows.get(n) : null;
}
function TDataset_find(){
   var o = this;
   var a = arguments;
   var l = a.length;
   if(0 != l % 2){
      RMessage.fatal(o, null, 'Parameters must is pairs (length={0})', l);
   }
   var rs = o.rows;
   for(var n=rs.count-1; n>=0; n--){
      var r = rs.get(n);
      var f = true;
      for(var i=0; i<l; i+=2){
         if(r.get(a[n]) != a[n+1]){
            f = false;
            break;
         }
      }
      if(f){
         return r;
      }
   }
   return null;
}
function TDataset_findIndex(id){
   var o = this;
   var rs = o.rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.index = id){
         return r;
      }
   }
   return null;
}
function TDataset_push(r){
   this.rows.push(r);
}
function TDataset_remove(i){
   return this.rows.remove(i);
}
function TDataset_removeRow(r){
   var o = this;
   var i = o.indexOf(r);
   if(-1 != i){
      o.rows.remove(i);
   }
}
function TDataset_loadNode(x){
   var o = this;
   o.name = x.get('name');
   o.pageSize = RInteger.parse(x.get('page_size', 1000));
   o.pageIndex = RInteger.parse(x.get('page', 0));
   o.pageCount = RInteger.parse(x.get('page_count', 1));
   o.total = RInteger.parse(x.get('total'));
   var xrs = x.nodes;
   if(xrs){
      var rs = o.rows;
      var xrc = o.count = xrs.count;
      for(var n=0; n<xrc; n++){
         var xr = xrs.get(n);
         if(xr.isName(RDataset.ROW)){
            var r = rs.memory[n];
            if(!r){
               var r = new TRow();
               r.dataset = o;
               rs.count = n;
               rs.push(r);
            }else{
               r.release();
            }
            r.loadNode(xr);
         }
      }
      rs.count = xrc;
   }
}
function TDataset_saveViewer(v){
   var o = this;
   v.datasetName = o.name;
   v.datasetId = o.id;
   v.position = 0;
   v.start = 0;
   v.count = o.rows.count;
   v.rows = o.rows;
   v.dataset = o;
}
function TDataset_clear(){
   var o = this;
   o.rows.clear();
   o.pageSize = 20;
   o.pageIndex = 0;
   o.count = 0;
   o.pageCount = 0;
   o.total = 0;
}
function TDataset_pack(){
   var o = this;
   var rs = o.rows;
   var ss = new TStrings();
   for(var n = 0; n < rs.count; n++){
      ss.push(rs.get(n).pack());
   }
   return ss.pack();
}
function TDataset_dump(){
   var o = this;
   var r = new TString();
   r.append(RClass.name(o));
   r.append(' count=', o.count);
   r.append(' fields=', o.fieldCount);
   r.appendLine();
   if(o.rows){
      var c = o.count;
      for(var n = 0; n < c; n++){
         r.append('- ');
         o.rows.get(n).dump(s);
         if(n != o.count-1){
            r.appendLine();
         }
      }
   }
   return r.toString();
}
function TDate(date){
   var o = this;
   o.date         = date ? date : new Date();
   o.year         = null;
   o.month        = null;
   o.day          = null;
   o.hour         = null;
   o.minute       = null;
   o.second       = null;
   o.ms           = null;
   o.equals       = TDate_equals;
   o.isBefore     = TDate_isBefore;
   o.isAfter      = TDate_isAfter;
   o.monthDays    = TDate_monthDays;
   o.monthWeekDay = TDate_monthWeekDay;
   o.weekDay      = TDate_weekDay;
   o.setYear      = TDate_setYear;
   o.setMonth     = TDate_setMonth;
   o.setDay       = TDate_setDay;
   o.setHour      = TDate_setHour;
   o.setMinute    = TDate_setMinute;
   o.setSecond    = TDate_setSecond;
   o.addYear      = TDate_addYear;
   o.addMonth     = TDate_addMonth;
   o.addDay       = TDate_addDay;
   o.addMseconds  = TDate_addMseconds;
   o.refresh      = TDate_refresh;
   o.setDate      = TDate_setDate;
   o.now          = TDate_now;
   o.clone        = TDate_clone;
   o.dump         = TDate_dump;
   o.refresh();
   return o;
}
function TDate_clone(){
   var d = new Date();
   d.setTime(this.date.getTime());
   return new TDate(d);
}
function TDate_equals(d){
   return this.date.getTime() == d.date.getTime();
}
function TDate_isBefore(d){
   return this.date.getTime() < d.date.getTime();
}
function TDate_isAfter(d){
   return this.date.getTime() > d.date.getTime();
}
function TDate_monthDays(){
   return RDate.monthDays(this.year, this.month);
}
function TDate_monthWeekDay(){
   return (8-(this.day-this.weekDay())%7)%7;
}
function TDate_weekDay(){
   return this.date.getDay();
}
function TDate_setYear(n){
   this.date.setFullYear(n);
   this.refresh();
}
function TDate_setMonth(n){
   this.date.setMonth(parseInt(n, 10)-1);
   this.refresh();
}
function TDate_setDay(n){
   this.date.setDate(n);
   this.refresh();
}
function TDate_setHour(n){
   this.date.setHours(n);
   this.refresh();
}
function TDate_setMinute(n){
   this.date.setMinutes(n);
   this.refresh();
}
function TDate_setSecond(n){
   this.date.setSeconds(n);
   this.refresh();
}
function TDate_addYear(n){
   this.date.setFullYear(this.date.getFullYear()+parseInt(n));
   this.refresh();
}
function TDate_addMonth(n){
   this.date.setMonth(this.date.getMonth()+parseInt(n));
   this.refresh();
}
function TDate_addDay(n){
   this.date.setTime(this.date.getTime()+parseInt(n)*1000*60*60*24);
   this.refresh();
}
function TDate_addMseconds(n){
   this.date.setTime(this.date.getTime()+parseInt(n));
   this.refresh();
}
function TDate_refresh(){
   var o = this;
   var d = o.date;
   if(d){
      o.year = d.getFullYear();
      o.month = d.getMonth() + 1;
      o.day = d.getDate();
      o.hour = d.getHours();
      o.minute = d.getMinutes();
      o.second = d.getSeconds();
      o.ms = d.getMilliseconds();
   }
}
function TDate_setDate(d){
   var o = this;
   o.date = d;
   o.refresh();
}
function TDate_now(){
   var o = this;
   o.date = new Date();
   o.refresh();
}
function TDate_dump(){
   return RClass.dump(this) + ' ' + RDate.formatDate(this);
}
function TError(po, pm, pp){
   var o = this;
   var r = new TString();
   var f = TError.caller;
   var s = new TString();
   var t = new Array();
   while(f){
      if(RArray.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + RMethod.name(f));
   }
   var a = arguments;
   var c = a.length;
   for(var n = 2; n < c; n++){
      var v = a[n];
      var vs = null;
      if(typeof(v) == 'function'){
         vs = RMethod.name(v);
      }else{
         vs = v;
      }
      pm = pm.replace('{' + (n - 1) + '}', vs);
   }
   r.appendLine(pm);
   r.appendLine('------------------------------------------------------------');
   r.append(s);
   throw new Error(r);
}
function TFatalError(po, pe, pm, pp){
   var o = this;
   var r = new TString();
   var f = TFatalError.caller;
   var s = new TString();
   var t = new Array();
   while(f){
      if(RArray.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + RMethod.name(f));
   }
   var a = arguments;
   var c = a.length;
   for(var n = 2; n < c; n++){
      var v = a[n];
      var vs = null;
      if(typeof(v) == 'function'){
         vs = RMethod.name(v);
      }else{
         vs = v;
      }
      pm = pm.replace('{' + (n - 1) + '}', vs);
   }
   r.appendLine(pm);
   r.appendLine('------------------------------------------------------------');
   r.append(s);
   throw new Error(r);
}
function TInstancePool(o){
   if(!o){o = this;}
   TObjects(o);
   o._instance = null;
   o.instance  = TInstancePool_instance;
   o.alloc     = TInstancePool_alloc;
   o.free      = TInstancePool_free;
   return o;
}
function TInstancePool_instance(p){
   var o = this;
   var r = o._instance;
   if(r == null){
      r = o._instance = RClass.create(p);
      r.instanceCreate();
   }
   r.instanceAlloc();
   return r;
}
function TInstancePool_alloc(p){
   var o = this;
   var r = null;
   if(o._count == 0){
      r = RClass.create(p);
      r.instanceCreate();
   }else{
      r = o.pop();
   }
   r.instanceAlloc();
   return r;
}
function TInstancePool_free(p){
   p.instanceFree();
   return this.push(p);
}
function TInvoke(o, w, p){
   if(!o){o = this;}
   o.owner    = w;
   o.callback = p;
   o.invoke   = TInvoke_invoke;
   return o;
}
function TInvoke_invoke(p1, p2, p3, p4, p5, p6){
   var o = this;
   if(o.callback){
      var c = o.owner ? o.owner : o;
      try{
         o.callback.call(c, p1, p2, p3, p4, p5, p6);
      }catch(e){
         RLogger.fatal(o, e, 'Call method failure. (owner={1}, callback={2})', c, o.callback);
      }
   }
}
function TListener(o){
   if(!o){o = this;}
   o.owner    = null;
   o.callback = null;
   o.process  = TListener_process;
   o.dump     = TListener_dump;
   return o;
}
function TListener_process(s, p1, p2, p3, p4, p5){
   var o = this;
   if(o.callback){
      o.callback.call(o.owner ? o.owner : o, s, p1, p2, p3, p4, p5);
   }
}
function TListener_dump(){
   var o = this;
   return RClass.name(o) + ' owner=' + RClass.name(o.owner);
}
function TListeners(o){
   if(!o){o = this;}
   o.listeners = null;
   o.isEmpty   = TListeners_isEmpty;
   o.register  = TListeners_register;
   o.push      = TListeners_push;
   o.process   = TListeners_process;
   o.clear     = TListeners_clear;
   o.dump      = TListeners_dump;
   return o;
}
function TListeners_isEmpty(){
   var ls = this.listeners;
   return ls ? (ls.count == 0) : false;
}
function TListeners_register(w, p){
   var l = new TListener();
   l.owner = w;
   l.callback = p;
   this.push(l);
   return l;
}
function TListeners_push(l){
   var o = this;
   if(!l){
      return RLogger.fatal(o, null, 'Listener is null.');
   }
   if(!l.callback){
      return RLogger.fatal(o, null, 'Listener process is null.');
   }
   if(!o.listeners){
      o.listeners = new TList();
   }
   o.listeners.push(l);
}
function TListeners_process(s, p1, p2, p3, p4, p5){
   var ls = this.listeners;
   if(ls){
      var c = ls.count;
      for(var n = 0; n < c; n++){
         var l = ls.get(n);
         l.process(s, p1, p2, p3, p4, p5);
      }
   }
}
function TListeners_clear(){
   var o = this;
   if(o.listeners){
      o.listeners.clear();
   }
}
function TListeners_dump(){
   var o = this;
   var r = new TString();
   r.append(RClass.name(o));
   var ls = o.listeners;
   var c = ls.length;
   for(var n = 0; n < c; n++){
      r.append('\n   ' + ls[n].dump());
   }
   return r;
}
function TLoaderListener(o){
   if(!o){o = this;}
   o.invoke = null;
   o.ids    = new TArray();
   o.check  = TLoaderListener_check;
   return o;
}
function TLoaderListener_check(l){
   var s = this.ids;
   if(!s.isEmpty()){
      var c = s.length;
      for(var n = 0; n < c; n++){
         if(!l.contains(s.get(n))){
            return false;
         }
      }
   }
   return true;
}
function TLocker(o){
   if(!o){o = this;}
   o._lock = false;
   o.enter = TLocker_enter;
   o.leave = TLocker_leave;
   return o;
}
function TLocker_enter(){
   this._lock = true;
}
function TLocker_leave(){
   this._lock = false;
}
function TMessage(){
   var o = this;
   o.type        = EMessage.None;
   o.attrType    = null;
   o.message     = null;
   o.description = null;
   o.redirect    = null;
   o.loadConfig = TMessage_loadConfig;
   o.saveConfig = TMessage_saveConfig;
   o.icon       = TMessage_icon;
   return o;
}
function TMessage_loadConfig(config){
   var o = this;
   o.type        = RString.toLower(config.name);
   o.message     = config.nvl('message');
   o.attrType    = config.nvl('type');
   o.redirect    = config.nvl('redirect');
   var desc = config.nvl('description');
   o.description = desc.replace(/\\n/g, '\n');
}
function TMessage_saveConfig(config){
   var o = this;
   config.name = o.type;
   config.set('message', o.message);
   config.set('description', o.description);
}
function TMessage_icon(){
   return 'sys.msg.' + this.type;
}
function TMessages(){
   var o = this;
   o.items      = new TList();
   o.hasMessage = TMessages_hasMessage;
   o.message    = TMessages_message;
   o.messages   = TMessages_messages;
   o.type       = TMessages_type;
   o.push       = TMessages_push;
   return o;
}
function TMessages_hasMessage(type){
   for(var n=0; n<this.items.count; n++){
      var m = this.items.get(n);
      if(m && m.type == type){
         return true;
      }
   }
   return false;
}
function TMessages_message(type){
   for(var n=0; n<this.items.count; n++){
      var m = this.items.get(n);
      if(m && m.type == type){
         return m;
      }
   }
   return null;
}
function TMessages_messages(type){
   var rs = null;
   for(var n=0; n<this.items.count; n++){
      var msg = this.items.get(n);
      if(msg && msg.type == type){
         if(!rs){
            rs = new TList();
         }
         rs.push(msg);
      }
   }
   return rs;
}
function TMessages_type(){
   if(this.hasMessage(EMessage.Fatal)){
      return EMessage.Fatal;
   }
   if(this.hasMessage(EMessage.Error)){
      return EMessage.Error;
   }
   if(this.hasMessage(EMessage.Warn)){
      return EMessage.Warn;
   }
   if(this.hasMessage(EMessage.Valid)){
      return EMessage.Valid;
   }
   if(this.hasMessage(EMessage.Info)){
      return EMessage.Info;
   }
   return EMessage.None;
}
function TMessages_push(msg){
   if(msg){
      this.items.push(msg);
   }
}
function TNode(o){
   if(!o){o = this;}
   o._name        = 'Node';
   o._value       = null;
   o._attributes  = null;
   o._nodes       = null;
   o.isName       = TNode_isName;
   o.name         = TNode_name;
   o.value        = TNode_value;
   o.contains     = TNode_contains;
   o.hasAttribute = TNode_hasAttribute;
   o.attributes   = TNode_attributes;
   o.hasNode      = TNode_hasNode;
   o.node         = TNode_node;
   o.nodes        = TNode_nodes;
   o.get          = TNode_get;
   o.set          = TNode_set;
   o.find         = TNode_find;
   o.findNode     = TNode_findNode;
   o.searchNode   = TNode_searchNode;
   o.push         = TNode_push;
   o.toString     = TNode_toString;
   o.innerDump    = TNode_innerDump;
   o.dump         = TNode_dump;
   return o;
}
function TNode_isName(n){
   return RString.equals(this._name, n);
}
function TNode_name(){
   return this._name;
}
function TNode_value(){
   return this._value;
}
function TNode_contains(n){
   var r = this._attributes;
   return r ? r.contains(n) : false;
}
function TNode_hasAttribute(){
   var s = this._attributes;
   return s ? !s.isEmpty() : false;
}
function TNode_attributes(){
   var o = this;
   var r = o._attributes;
   if(!r){
      r = o._attributes = new TAttributes();
   }
   return r;
}
function TNode_hasNode(){
   var s = this._nodes;
   return s ? !s.isEmpty() : false;
}
function TNode_node(n){
   var s = this._nodes;
   return s ? s.get(n) : null;
}
function TNode_nodes(){
   var o = this;
   var r = o._nodes;
   if(!r){
      r = o._nodes = new TObjects();
   }
   return r;
}
function TNode_get(n, v){
   return this._attributes ? this._attributes.get(n, v) : null;
}
function TNode_set(n, v){
   if(v != null){
      this.attributes().set(n, v);
   }
}
function TNode_find(pn, pa){
   var o = this;
   if(o.hasNode()){
      var ns = o._nodes;
      var nc = ns.count;
      for(var ni = 0; ni < nc; ni++){
         var n = ns.get(ni);
         if(n.isName(pn)){
            return n;
         }
      }
   }
   return null;
}
function TNode_findNode(pn, pv){
   var o = this;
   if(o.hasNode()){
      var ns = o._nodes;
      var nc = ns.count();
      var as = arguments;
      var ac = as.length;
      if((ac - 1) % 2){
         throw new TError('Attributes is not pair. (length={1})', ac);
      }
      for(var ni = 0; ni < nc; ni++){
         var n = ns.get(ni);
         if(pn != null){
            if(!n.isName(pn)){
               continue;
            }
         }
         var f = true;
         for(var ai = 1; ai < ac; ai += 2){
            if(n.get(as[ai]) != as[ai + 1]){
               f = false;
               break;
            }
         }
         if(f){
            return n;
         }
      }
   }
   return null;
}
function TNode_searchNode(pn, pv){
   var o = this;
   if(o.hasAttribute()){
      if(o._attributes.get(pn) == pv){
         return o;
      }
   }
   if(o.hasNode()){
      var ns = o._nodes;
      var c = ns.count();
      for(var i = 0; i < c; ni++){
         var n = ns.get(n).searchNode(pn, pv);
         if(n != null){
            return n;
         }
      }
   }
   return null;
}
function TNode_push(p){
   var o = this;
   o.nodes().push(p);
}
function TNode_toString(){
   return this.dump();
}
function TNode_innerDump(dump, node, space){
   if(space == null){
      space = '';
   }
   dump.append(space, node._name, '(', RClass.name(node), ')');
   if(node._attributes){
      var count = node._attributes.count;
      dump.append(' [', count, ':');
      for(var n=0; n<count; n++){
         if(n > 0){
            dump.append(' ');
         }
         dump.append(node._attributes.name(n), '=', node._attributes.value(n));
         if(n < count-1){
            dump.append(',');
         }
      }
      dump.append(']');
   }
   if(node._value){
      var value = node._value.toString();
      if(!RString.isEmpty(value)){
         dump.append(' {', value.length, ':', value, '}');
      }
   }
   if(node._nodes){
      var count = node._nodes.count;
      dump.append('\n');
      for(var n = 0; n < count; n++){
         node._nodes.get(n).dump(dump, space + '   ');
         if(n < count-1){
            dump.append('\n');
         }
      }
   }
   return dump;
}
function TNode_dump(d, space){
   d = RString.nvlStr(d);
   return this.innerDump(d, this, space);
}
function TRow(o){
   if(!o){o = this;}
   TAttributes(o);
   o.dataset       = ds;
   o.index         = null;
   o.uniqueId      = null;
   o.status        = null;
   o.loadNode      = TRow_loadNode;
   o.saveNode      = TRow_saveNode;
   o.copy          = TRow_copy;
   o.toAttributes  = TRow_toAttributes;
   o.dump          = TRow_dump;
   return o;
}
function TRow_loadNode(x){
   if(x && x.attrs){
      var o = this;
      o.index = x.get('_id');
      o.status = x.get('_status');
      o.uniqueId = x.get('ouid');
      o.append(x.attrs);
   }
}
function TRow_saveNode(x){
   if(x){
      var o = this;
      x.set('_id', o.index);
      x.set('_status', o.status);
      var c = o.count;
      for(var n=0; n<c; n++){
         x.set(o.names[n], o.values[n]);
      }
   }
}
function TRow_copy(){
   var o = this;
   var r = new TRow();
   r.dataset = o.dataset;
   r.index = o.index;
   r.status = o.status;
   r.uniqueId = o.uniqueId;
   var c = o.count;
   for(var n=0; n<c; n++){
      r.set(o.names[n], o.values[n]);
   }
   return r;
}
function TRow_toAttributes(a){
   var o = this;
   if(!a){
      a = new TAttributes();
   }
   a.set(RDataset.ROW_STATUS, o.status);
   a.append(o);
   return a;
}
function TRow_dump(s){
   var o = this;
   var c = o.count;
   s = RString.nvlStr(s);
   s.append(RClass.name(o), ' [', o.status, ': ');
   for(var n=0; n<c; n++){
      if(n > 0){
         s.append(',');
      }
      s.append(o.names[n], '=', o.values[n]);
   }
   s.append(']');
   return s;
}
function TSpeed(o){
   if(!o){o = this;}
   o.arguments  = arguments;
   o.start      = new Date().getTime();
   o.callerName = RMethod.name(TSpeed.caller);
   o.record     = TSpeed_record
   return o;
}
function TSpeed_record(){
   var o = this;
   var sp = new Date().getTime() - o.start;
   RLogger.log(ELogger.Debug, o.callerName, sp, o.arguments);
   o.arguments = null;
   o.start = null;
   o.callerName = null;
   o.record = null;
}
var EFrustumPlane = new function EFrustumPlane(){
   var o = this;
   o.Near = 0;
   o.Far = 1;
   o.Left = 2;
   o.Right = 3;
   o.Top = 4;
   o.Bottom = 5;
   o.Count = 6;
   return o;
}
var RMath = new function RMath(){
   var o = this;
   o.PI           = null;
   o.PI2          = null;
   o.RADIAN_RATE  = null;
   o.DEGREE_RATE  = null;
   o.PERCENT_1000 = 1.0 / 1000.0;
   o.float1       = null;
   o.float2       = null;
   o.float3       = null;
   o.float4       = null;
   o.float9       = null;
   o.float12      = null;
   o.float16      = null;
   o.double1      = null;
   o.double2      = null;
   o.double3      = null;
   o.double4      = null;
   o.double16     = null;
   o.double16     = null;
   o.double64     = null;
   o.matrix       = null;
   o.vectorAxisX  = null;
   o.vectorAxisY  = null;
   o.vectorAxisZ  = null;
   o.construct    = RMath_construct;
   o.construct();
   return o;
}
function RMath_construct(){
   var o = this;
   o.PI = Math.PI;
   o.PI2 = Math.PI * 2;
   o.RADIAN_RATE = 180.0 / Math.PI;
   o.DEGREE_RATE = Math.PI / 180.0;
   o.float1 = new Float32Array(1);
   o.float2 = new Float32Array(2);
   o.float3 = new Float32Array(3);
   o.float4 = new Float32Array(4);
   o.float9 = new Float32Array(9);
   o.float12 = new Float32Array(12);
   o.float16 = new Float32Array(16);
   o.double1 = new Float64Array(1);
   o.double2 = new Float64Array(2);
   o.double3 = new Float64Array(3);
   o.double4 = new Float64Array(4);
   o.double9 = new Float64Array(9);
   o.double12 = new Float64Array(12);
   o.double16 = new Float64Array(16);
   o.matrix = new SMatrix3d();
   o.vectorAxisX = new SVector3();
   o.vectorAxisX.set(1.0, 0.0, 0.0);
   o.vectorAxisY = new SVector3();
   o.vectorAxisY.set(0.0, 1.0, 0.0);
   o.vectorAxisZ = new SVector3();
   o.vectorAxisZ.set(0.0, 0.0, 1.0);
}
function SColor4(o){
   if(!o){o = this;}
   o.red         = 0;
   o.green       = 0;
   o.blue        = 0;
   o.alpha       = 1;
   o.assign      = SColor4_assign;
   o.set         = SColor4_set;
   o.serialize   = SColor4_serialize
   o.unserialize = SColor4_unserialize
   o.toString    = SColor4_toString;
   return o;
}
function SColor4_assign(p){
   var o = this;
   o.red = p.red;
   o.green = p.green;
   o.blue = p.blue;
   o.alpha = p.alpha;
}
function SColor4_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}
function SColor4_serialize(p){
   var o = this;
   p.writeFloat(o.red);
   p.writeFloat(o.green);
   p.writeFloat(o.blue);
   p.writeFloat(o.alpha);
}
function SColor4_unserialize(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = p.readFloat();
}
function SColor4_toString(){
   var o = this;
   return o.red + ',' + o.green + ',' + o.blue + ',' + o.alpha;
}
function SFrustum(o){
   if(!o){o = this;}
   o.center       = new SPoint3();
   o.radius       = null;
   o.minX         = null;
   o.maxX         = null;
   o.minY         = null;
   o.maxY         = null;
   o.minZ         = null;
   o.maxZ         = null;
   o.points       = new Array(24);
   o.coners       = new Array(24);
   o.updateCenter = SFrustum_updateCenter;
   o.update       = SFrustum_update;
   o.updateFlat   = SFrustum_updateFlat;
   return o;
}
function SFrustum_updateCenter(){
   var o = this;
   var cs = o.coners;
   o.minX = o.minY = o.minZ = Number.MAX_VALUE;
   o.maxX = o.maxY = o.maxZ = -Number.MAX_VALUE;
   var i = 0;
   while(i < 24){
      var x = cs[i++];
      if(x < o.minX){
         o.minX = x;
      }
      if(x > o.maxX){
         o.maxX = x;
      }
      var y = cs[i++];
      if(y < o.minY){
         o.minY = y;
      }
      if(y > o.maxY){
         o.maxY = y;
      }
      var z = cs[i++];
      if(z < o.minZ){
         o.minZ = z;
      }
      if(z > o.maxZ){
         o.maxZ = z;
      }
   }
   o.center.x = (o.minX + o.maxX) * 0.5;
   o.center.y = (o.minY + o.maxY) * 0.5;
   o.center.z = (o.minZ + o.maxZ) * 0.5;
   o.radius = Math.sqrt((o.minX - o.minY) * (o.minX - o.minY) + (o.minZ - o.maxX) * (o.minZ - o.maxX) + (o.maxY - o.maxZ) * (o.maxY - o.maxZ)) * 0.5;
}
function SFrustum_update(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
   var o = this;
   var aspect = pvw / pvh;
   var znear = pvn;
   var zfar = pvf;
   var fov = Math.tan(RMath.DEGREE_RATE * pva * 0.5);
   var nearY = znear * fov;
   var nearX = nearY * aspect;
   var farY = zfar * fov;
   var farX = farY * aspect;
   var ps = o.points;
   ps[ 0] = -nearX;
   ps[ 1] =  nearY;
   ps[ 2] =  znear;
   ps[ 3] =  nearX;
   ps[ 4] =  nearY;
   ps[ 5] =  znear;
   ps[ 6] =  nearX;
   ps[ 7] = -nearY;
   ps[ 8] =  znear;
   ps[ 9] = -nearX;
   ps[10] = -nearY;
   ps[11] =  znear;
   ps[12] = -farX;
   ps[13] =  farY;
   ps[14] =  zfar;
   ps[15] =  farX;
   ps[16] =  farY;
   ps[17] =  zfar;
   ps[18] =  farX;
   ps[19] = -farY;
   ps[20] =  zfar;
   ps[21] = -farX;
   ps[22] = -farY;
   ps[23] =  zfar;
   var m = RMath.matrix;
   m.assign(pm);
   m.invert();
   m.transform(o.coners, ps, 8);
   o.updateCenter();
}
function SFrustum_updateFlat(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
   var o = this;
   var aspect = pvw / pvh;
   var znear = pvn * pbr;
   var zfar = pvf * pfr;
   var fov = Math.tan(RMath.DEGREE_RATE * pva * 0.5);
   var nearY = znear * fov;
   var nearX = nearY * aspect;
   var farY = zfar * fov;
   var farX = farY * aspect;
   var ps = o.points;
   ps[ 0] = -nearX;
   ps[ 1] =  nearY;
   ps[ 2] =  znear;
   ps[ 3] =  nearX;
   ps[ 4] =  nearY;
   ps[ 5] =  znear;
   ps[ 6] =  nearX;
   ps[ 7] = -nearY;
   ps[ 8] =  znear;
   ps[ 9] = -nearX;
   ps[10] = -nearY;
   ps[11] =  znear;
   ps[12] = -farX;
   ps[13] =  farY;
   ps[14] =  zfar;
   ps[15] =  farX;
   ps[16] =  farY;
   ps[17] =  zfar;
   ps[18] =  farX;
   ps[19] = -farY;
   ps[20] =  zfar;
   ps[21] = -farX;
   ps[22] = -farY;
   ps[23] =  zfar;
   var m = RMath.matrix;
   m.assign(pm);
   m.invert();
   m.transform(o.coners, ps, 8);
   o.coners[ 1] = 0.0;
   o.coners[ 4] = 0.0;
   o.coners[ 7] = 0.0;
   o.coners[10] = 0.0;
   o.coners[13] = 0.0;
   o.coners[16] = 0.0;
   o.coners[19] = 0.0;
   o.coners[22] = 0.0;
   o.updateCenter();
}
function SFrustumPlanes(o){
   if(!o){o = this;}
   o.planes            = new Array();
   o.containsPoint     = SFrustumPlanes_containsPoint;
   o.containsCube      = SFrustumPlanes_containsCube;
   o.containsRectangle = SFrustumPlanes_containsRectangle;
   o.containsCorners   = SFrustumPlanes_containsCorners;
   o.containsSphere    = SFrustumPlanes_containsSphere;
   o.updateVision      = SFrustumPlanes_updateVision;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      o.planes.push(new SPlane());
   }
   return o;
}
function SFrustumPlanes_containsPoint(x, y, z){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      if(ps[n].dot(x, y, z) < 0){
         return false;
      }
   }
   return true;
}
function SFrustumPlanes_containsCube(cx, cy, cz, size){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      var p = ps[n];
      if(p.dot(cx - l, cy - l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy - l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy + l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy + l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy - l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy - l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy + l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy + l, cz + l) >= 0){
         continue;
      }
      return false;
   }
   return true;
}
function SFrustumPlanes_containsRectangle(cx, cy, cz, sx, sy, sz){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      var p = ps[n];
      if(p.dot(cx - sx, cy - sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy - sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy + sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy + sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy - sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy - sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy + sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy + sy, cz + sz) >= 0){
         continue;
      }
      return false;
   }
   return true;
}
function SFrustumPlanes_containsCorners(p){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      var p = ps[n];
      if(p.dot(p[ 0], p[ 1], p[ 2]) >= 0){
         continue;
      }
      if(p.dot(p[ 3], p[ 4], p[ 5]) >= 0){
         continue;
      }
      if(p.dot(p[ 6], p[ 7], p[ 8]) >= 0){
         continue;
      }
      if(p.dot(p[ 9], p[10], p[11]) >= 0){
         continue;
      }
      if(p.dot(p[12], p[13], p[14]) >= 0){
         continue;
      }
      if(p.dot(p[15], p[16], p[17]) >= 0){
         continue;
      }
      if(p.dot(p[18], p[19], p[20]) >= 0){
         continue;
      }
      if(p.dot(p[21], p[22], p[23]) >= 0){
         continue;
      }
      return false;
   }
   return true;
}
function SFrustumPlanes_containsSphere(px, py, pz, pr){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      if(ps[n].dot(px, py, pz) < -pr){
         return false;
      }
   }
   return true;
}
function SFrustumPlanes_updateVision(p){
   var o = this;
   var ps = o.planes;
   var pn = ps[EFrustumPlane.Near];
   pn.a = p[4 * 0 + 2];
   pn.b = p[4 * 1 + 2];
   pn.c = p[4 * 2 + 2];
   pn.d = p[4 * 3 + 2];
   pn.normalize();
   var pf = ps[EFrustumPlane.Far];
   pf.a = p[4 * 0 + 3] - p[4 * 0 + 2];
   pf.b = p[4 * 1 + 3] - p[4 * 1 + 2];
   pf.c = p[4 * 2 + 3] - p[4 * 2 + 2];
   pf.d = p[4 * 3 + 3] - p[4 * 3 + 2];
   pf.normalize();
   var pl = ps[EFrustumPlane.Left];
   pl.a = p[4 * 0 + 3] + p[4 * 0 + 0];
   pl.b = p[4 * 1 + 3] + p[4 * 1 + 0];
   pl.c = p[4 * 2 + 3] + p[4 * 2 + 0];
   pl.d = p[4 * 3 + 3] + p[4 * 3 + 0];
   pl.normalize();
   var pr = ps[EFrustumPlane.Right];
   pr.a = p[4 * 0 + 3] - p[4 * 0 + 0];
   pr.b = p[4 * 1 + 3] - p[4 * 1 + 0];
   pr.c = p[4 * 2 + 3] - p[4 * 2 + 0];
   pr.d = p[4 * 3 + 3] - p[4 * 3 + 0];
   pr.normalize();
   var pt = ps[EFrustumPlane.Top];
   pt.a = p[4 * 0 + 3] - p[4 * 0 + 1];
   pt.b = p[4 * 1 + 3] - p[4 * 1 + 1];
   pt.c = p[4 * 2 + 3] - p[4 * 2 + 1];
   pt.d = p[4 * 3 + 3] - p[4 * 3 + 1];
   pt.normalize();
   var pb = ps[EFrustumPlane.Bottom];
   pb.a = p[4 * 0 + 3] + p[4 * 0 + 1];
   pb.b = p[4 * 1 + 3] + p[4 * 1 + 1];
   pb.c = p[4 * 2 + 3] + p[4 * 2 + 1];
   pb.d = p[4 * 3 + 3] + p[4 * 3 + 1];
   pb.normalize();
}
function SMatrix3d(o){
   if(!o){o = this;}
   SMatrix4x4(o);
   o._dirty         = false;
   o.tx             = 0.0;
   o.ty             = 0.0;
   o.tz             = 0.0;
   o.rx             = 0.0;
   o.ry             = 0.0;
   o.rz             = 0.0;
   o.sx             = 1.0;
   o.sy             = 1.0;
   o.sz             = 1.0;
   o.identity       = SMatrix3d_identity;
   o.setTranslate   = SMatrix3d_setTranslate;
   o.setRotation    = SMatrix3d_setRotation;
   o.setScale       = SMatrix3d_setScale;
   o.set            = SMatrix3d_set;
   o.setAll         = SMatrix3d_setAll;
   o.equals         = SMatrix3d_equals;
   o.assign         = SMatrix3d_assign;
   o.append         = SMatrix3d_append;
   o.build          = SMatrix3d_build;
   o.updateForce    = SMatrix3d_updateForce;
   o.update         = SMatrix3d_update;
   o.serialize      = SMatrix3d_serialize;
   o.unserialize    = SMatrix3d_unserialize;
   o.identity();
   return o;
}
function SMatrix3d_identity(){
   var o = this;
   o.tx = o.ty = o.tz = 0;
   o.rx = o.ry = o.rz = 0;
   o.sx = o.sy = o.sz = 1;
   var d = o._data;
   d[ 0] = 1; d[ 1] = 0; d[ 2] = 0; d[ 3] = 0;
   d[ 4] = 0; d[ 5] = 1; d[ 6] = 0; d[ 7] = 0;
   d[ 8] = 0; d[ 9] = 0; d[10] = 1; d[11] = 0;
   d[12] = 0; d[13] = 0; d[14] = 0; d[15] = 1;
}
function SMatrix3d_setTranslate(x, y, z){
   var o = this;
   o.tx = x;
   o.ty = y;
   o.tz = z;
   o._dirty = true;
}
function SMatrix3d_setRotation(x, y, z){
   var o = this;
   o.rx = x;
   o.ry = y;
   o.rz = z;
   o._dirty = true;
}
function SMatrix3d_setScale(x, y, z){
   var o = this;
   o.sx = x;
   o.sy = y;
   o.sz = z;
   o._dirty = true;
}
function SMatrix3d_set(pt, pr, ps){
   var o = this;
   o.tx = pt.x;
   o.ty = pt.y;
   o.tz = pt.z;
   o.rx = pr.x;
   o.ry = pr.y;
   o.rz = pr.z;
   o.sx = ps.x;
   o.sy = ps.y;
   o.sz = ps.z;
   o._dirty = true;
}
function SMatrix3d_setAll(ptx, pty, ptz, prx, pry, prz, psx, psy, psz){
   var o = this;
   o.tx = ptx;
   o.ty = pty;
   o.tz = ptz;
   o.rx = prx;
   o.ry = pry;
   o.rz = prz;
   o.sx = psx;
   o.sy = psy;
   o.sz = psz;
   o._dirty = true;
}
function SMatrix3d_equals(p){
   return this.equalsData(p._data);
}
function SMatrix3d_assign(p){
   this.assignData(p._data);
}
function SMatrix3d_append(p){
   this.appendData(p._data);
}
function SMatrix3d_build(t, r, s){
   var d = this._data;
   var x2 = r.x * r.x;
   var y2 = r.y * r.y;
   var z2 = r.z * r.z;
   var xy = r.x * r.y;
   var xz = r.x * r.z;
   var yz = r.y * r.z;
   var wx = r.w * r.x;
   var wy = r.w * r.y;
   var wz = r.w * r.z;
   d[ 0] = (1.0 - 2.0 * (y2 + z2)) * s.x;
   d[ 1] = 2.0 * (xy - wz) * s.x;
   d[ 2] = 2.0 * (xz + wy) * s.x;
   d[ 3] = 0.0;
   d[ 4] = 2.0 * (xy + wz) * s.y;
   d[ 5] = (1.0 - 2.0 * (x2 + z2)) * s.y;
   d[ 6] = 2.0 * (yz - wx) * s.x;
   d[ 7] = 0.0;
   d[ 8] = 2.0 * (xz - wy) * s.z;
   d[ 9] = 2.0 * (yz + wx) * s.z;
   d[10] = (1.0 - 2.0 * (x2 + y2)) * s.z;
   d[11] = 0.0;
   d[12] = t.x;
   d[13] = t.y;
   d[14] = t.z;
   d[15] = 1.0;
}
function SMatrix3d_updateForce(){
   var o = this;
   var d = o._data;
   var rsx = Math.sin(o.rx);
   var rcx = Math.cos(o.rx);
   var rsy = Math.sin(o.ry);
   var rcy = Math.cos(o.ry);
   var rsz = Math.sin(o.rz);
   var rcz = Math.cos(o.rz);
   d[ 0] = rcy * rcz * o.sx;
   d[ 1] = rcy * rsz * o.sx;
   d[ 2] = -rsy * o.sx;
   d[ 3] = 0.0;
   d[ 4] = (rsx * rsy * rcz - rcx * rsz) * o.sy;
   d[ 5] = (rsx * rsy * rsz + rcx * rcz) * o.sy;
   d[ 6] = rsx * rcy * o.sy;
   d[ 7] = 0.0;
   d[ 8] = (rcx * rsy * rcz + rsx * rsz) * o.sz;
   d[ 9] = (rcx * rsy * rsz - rsx * rcz) * o.sz;
   d[10] = rcx * rcy * o.sz;
   d[11] = 0.0;
   d[12] = o.tx;
   d[13] = o.ty;
   d[14] = o.tz;
   d[15] = 1.0;
}
function SMatrix3d_update(){
   var o = this;
   if(o._dirty){
      o.updateForce();
      o._dirty = false;
   }
}
function SMatrix3d_serialize(p){
   var o = this;
   p.writeFloat(o.tx);
   p.writeFloat(o.ty);
   p.writeFloat(o.tz);
   p.writeFloat(o.rx);
   p.writeFloat(o.ry);
   p.writeFloat(o.rz);
   p.writeFloat(o.sx);
   p.writeFloat(o.sy);
   p.writeFloat(o.sz);
}
function SMatrix3d_unserialize(p){
   var o = this;
   o.tx = p.readFloat();
   o.ty = p.readFloat();
   o.tz = p.readFloat();
   o.rx = p.readFloat();
   o.ry = p.readFloat();
   o.rz = p.readFloat();
   o.sx = p.readFloat();
   o.sy = p.readFloat();
   o.sz = p.readFloat();
   o.updateForce();
}
function SMatrix4x4(o){
   if(!o){o = this;}
   o._data      = new Array(16);
   o.data       = SMatrix4x4_data;
   o.equalsData = SMatrix4x4_equalsData;
   o.assignData = SMatrix4x4_assignData;
   o.appendData = SMatrix4x4_appendData;
   o.translate  = SMatrix4x4_translate;
   o.rotationX  = SMatrix4x4_rotationX;
   o.rotationY  = SMatrix4x4_rotationY;
   o.rotationZ  = SMatrix4x4_rotationZ;
   o.rotation   = SMatrix4x4_rotation;
   o.scale      = SMatrix4x4_scale;
   o.invert     = SMatrix4x4_invert;
   o.transform  = SMatrix4x4_transform;
   o.writeData  = SMatrix4x4_writeData;
   return o;
}
function SMatrix4x4_data(){
   return this._data;
}
function SMatrix4x4_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 16; i++){
      if(d[i] != p[i]){
         return false;
      }
   }
   return true;
}
function SMatrix4x4_assignData(p){
   var d = this._data;
   for(var n = 0; n < 16; n++){
      d[n] = p[n];
   }
}
function SMatrix4x4_appendData(p){
   var d = this._data;
   var v00 = (d[ 0] * p[0]) + (d[ 1] * p[4]) + (d[ 2] * p[ 8]) + (d[ 3] * p[12]);
   var v01 = (d[ 0] * p[1]) + (d[ 1] * p[5]) + (d[ 2] * p[ 9]) + (d[ 3] * p[13]);
   var v02 = (d[ 0] * p[2]) + (d[ 1] * p[6]) + (d[ 2] * p[10]) + (d[ 3] * p[14]);
   var v03 = (d[ 0] * p[3]) + (d[ 1] * p[7]) + (d[ 2] * p[11]) + (d[ 3] * p[15]);
   var v04 = (d[ 4] * p[0]) + (d[ 5] * p[4]) + (d[ 6] * p[ 8]) + (d[ 7] * p[12]);
   var v05 = (d[ 4] * p[1]) + (d[ 5] * p[5]) + (d[ 6] * p[ 9]) + (d[ 7] * p[13]);
   var v06 = (d[ 4] * p[2]) + (d[ 5] * p[6]) + (d[ 6] * p[10]) + (d[ 7] * p[14]);
   var v07 = (d[ 4] * p[3]) + (d[ 5] * p[7]) + (d[ 6] * p[11]) + (d[ 7] * p[15]);
   var v08 = (d[ 8] * p[0]) + (d[ 9] * p[4]) + (d[10] * p[ 8]) + (d[11] * p[12]);
   var v09 = (d[ 8] * p[1]) + (d[ 9] * p[5]) + (d[10] * p[ 9]) + (d[11] * p[13]);
   var v10 = (d[ 8] * p[2]) + (d[ 9] * p[6]) + (d[10] * p[10]) + (d[11] * p[14]);
   var v11 = (d[ 8] * p[3]) + (d[ 9] * p[7]) + (d[10] * p[11]) + (d[11] * p[15]);
   var v12 = (d[12] * p[0]) + (d[13] * p[4]) + (d[14] * p[ 8]) + (d[15] * p[12]);
   var v13 = (d[12] * p[1]) + (d[13] * p[5]) + (d[14] * p[ 9]) + (d[15] * p[13]);
   var v14 = (d[12] * p[2]) + (d[13] * p[6]) + (d[14] * p[10]) + (d[15] * p[14]);
   var v15 = (d[12] * p[3]) + (d[13] * p[7]) + (d[14] * p[11]) + (d[15] * p[15]);
   d[ 0] = v00;
   d[ 1] = v01;
   d[ 2] = v02;
   d[ 3] = v03;
   d[ 4] = v04;
   d[ 5] = v05;
   d[ 6] = v06;
   d[ 7] = v07;
   d[ 8] = v08;
   d[ 9] = v09;
   d[10] = v10;
   d[11] = v11;
   d[12] = v12;
   d[13] = v13;
   d[14] = v14;
   d[15] = v15;
}
function SMatrix4x4_translate(x, y, z){
   var v = RMath.float16;
   v[ 0] = 1;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = 1;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = 1;
   v[11] = 0;
   v[12] = x;
   v[13] = y;
   v[14] = z;
   v[15] = 1;
   this.appendData(v);
}
function SMatrix4x4_rotationX(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = RMath.float16;
   v[ 0] = 1;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = rc;
   v[ 6] = rs;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = -rs;
   v[10] = rc;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
function SMatrix4x4_rotationY(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = RMath.float16;
   v[ 0] = rc;
   v[ 1] = 0;
   v[ 2] = rs;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = 1;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = -rs;
   v[ 9] = 0;
   v[10] = rc;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
function SMatrix4x4_rotationZ(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = RMath.float16;
   v[ 0] = rc;
   v[ 1] = rs;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = -rs;
   v[ 5] = rc;
   v[ 6] = 1;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = 1;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
function SMatrix4x4_rotation(x, y, z){
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   var v = RMath.float16;
   v[ 0] = rcy * rcz;
   v[ 1] = rcy * rsz;
   v[ 2] = -rsy;
   v[ 3] = 0;
   v[ 4] = rsx * rsy * rcz - rcx * rsz;
   v[ 5] = rsx * rsy * rsz + rcx * rcz;
   v[ 6] = rsx * rcy;
   v[ 7] = 0;
   v[ 8] = rcx * rsy * rcz + rsx * rsz;
   v[ 9] = rcx * rsy * rsz - rsx * rcx;
   v[10] = rcx * rcy;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
function SMatrix4x4_scale(x, y, z){
   var v = RMath.float16;
   v[ 0] = x;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = y;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = z;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
function SMatrix4x4_invert(){
   var o = this;
   var d = o._data;
   var v = RMath.float16;
   v[ 0] =  (d[ 5] * d[10] * d[15]) - (d[ 5] * d[11] * d[14]) - (d[ 9] * d[ 6] * d[15]) + (d[ 9] * d[ 7] * d[14]) + (d[13] * d[ 6] * d[11]) - (d[13] * d[ 7] * d[10]);
   v[ 4] = -(d[ 4] * d[10] * d[15]) + (d[ 4] * d[11] * d[14]) + (d[ 8] * d[ 6] * d[15]) - (d[ 8] * d[ 7] * d[14]) - (d[12] * d[ 6] * d[11]) + (d[12] * d[ 7] * d[10]);
   v[ 8] =  (d[ 4] * d[ 9] * d[15]) - (d[ 4] * d[11] * d[13]) - (d[ 8] * d[ 5] * d[15]) + (d[ 8] * d[ 7] * d[13]) + (d[12] * d[ 5] * d[11]) - (d[12] * d[ 7] * d[ 9]);
   v[12] = -(d[ 4] * d[ 9] * d[14]) + (d[ 4] * d[10] * d[13]) + (d[ 8] * d[ 5] * d[14]) - (d[ 8] * d[ 6] * d[13]) - (d[12] * d[ 5] * d[10]) + (d[12] * d[ 6] * d[ 9]);
   v[ 1] = -(d[ 1] * d[10] * d[15]) + (d[ 1] * d[11] * d[14]) + (d[ 9] * d[ 2] * d[15]) - (d[ 9] * d[ 3] * d[14]) - (d[13] * d[ 2] * d[11]) + (d[13] * d[ 3] * d[10]);
   v[ 5] =  (d[ 0] * d[10] * d[15]) - (d[ 0] * d[11] * d[14]) - (d[ 8] * d[ 2] * d[15]) + (d[ 8] * d[ 3] * d[14]) + (d[12] * d[ 2] * d[11]) - (d[12] * d[ 3] * d[10]);
   v[ 9] = -(d[ 0] * d[ 9] * d[15]) + (d[ 0] * d[11] * d[13]) + (d[ 8] * d[ 1] * d[15]) - (d[ 8] * d[ 3] * d[13]) - (d[12] * d[ 1] * d[11]) + (d[12] * d[ 3] * d[ 9]);
   v[13] =  (d[ 0] * d[ 9] * d[14]) - (d[ 0] * d[10] * d[13]) - (d[ 8] * d[ 1] * d[14]) + (d[ 8] * d[ 2] * d[13]) + (d[12] * d[ 1] * d[10]) - (d[12] * d[ 2] * d[ 9]);
   v[ 2] =  (d[ 1] * d[ 6] * d[15]) - (d[ 1] * d[ 7] * d[14]) - (d[ 5] * d[ 2] * d[15]) + (d[ 5] * d[ 3] * d[14]) + (d[13] * d[ 2] * d[ 7]) - (d[13] * d[ 3] * d[ 6]);
   v[ 6] = -(d[ 0] * d[ 6] * d[15]) + (d[ 0] * d[ 7] * d[14]) + (d[ 4] * d[ 2] * d[15]) - (d[ 4] * d[ 3] * d[14]) - (d[12] * d[ 2] * d[ 7]) + (d[12] * d[ 3] * d[ 6]);
   v[10] =  (d[ 0] * d[ 5] * d[15]) - (d[ 0] * d[ 7] * d[13]) - (d[ 4] * d[ 1] * d[15]) + (d[ 4] * d[ 3] * d[13]) + (d[12] * d[ 1] * d[ 7]) - (d[12] * d[ 3] * d[ 5]);
   v[14] = -(d[ 0] * d[ 5] * d[14]) + (d[ 0] * d[ 6] * d[13]) + (d[ 4] * d[ 1] * d[14]) - (d[ 4] * d[ 2] * d[13]) - (d[12] * d[ 1] * d[ 6]) + (d[12] * d[ 2] * d[ 5]);
   v[ 3] = -(d[ 1] * d[ 6] * d[11]) + (d[ 1] * d[ 7] * d[10]) + (d[ 5] * d[ 2] * d[11]) - (d[ 5] * d[ 3] * d[10]) - (d[ 9] * d[ 2] * d[ 7]) + (d[ 9] * d[ 3] * d[ 6]);
   v[ 7] =  (d[ 0] * d[ 6] * d[11]) - (d[ 0] * d[ 7] * d[10]) - (d[ 4] * d[ 2] * d[11]) + (d[ 4] * d[ 3] * d[10]) + (d[ 8] * d[ 2] * d[ 7]) - (d[ 8] * d[ 3] * d[ 6]);
   v[11] = -(d[ 0] * d[ 5] * d[11]) + (d[ 0] * d[ 7] * d[ 9]) + (d[ 4] * d[ 1] * d[11]) - (d[ 4] * d[ 3] * d[ 9]) - (d[ 8] * d[ 1] * d[ 7]) + (d[ 8] * d[ 3] * d[ 5]);
   v[15] =  (d[ 0] * d[ 5] * d[10]) - (d[ 0] * d[ 6] * d[ 9]) - (d[ 4] * d[ 1] * d[10]) + (d[ 4] * d[ 2] * d[ 9]) + (d[ 8] * d[ 1] * d[ 6]) - (d[ 8] * d[ 2] * d[ 5]);
   var r = d[ 0] * v[ 0] + d[ 1] * v[ 4] + d[ 2] * v[ 8] + d[ 3] * v[12];
   if(r == 0.0){
     return false;
   }
   r = 1.0 / r;
   for(var i = 0; i < 16; i++){
      d[i] = v[i] * r;
   }
   return true;
}
function SMatrix4x4_transform(po, pi, pc){
   var o = this;
   var d = o._data;
   for(var i = 0; i < pc; i++){
      var n = (i << 1) + i;
      po[n    ] = (pi[n] * d[ 0]) + (pi[n + 1] * d[ 4]) +(pi[n + 2] * d[ 8]) + d[12];
      po[n + 1] = (pi[n] * d[ 1]) + (pi[n + 1] * d[ 5]) +(pi[n + 2] * d[ 9]) + d[13];
      po[n + 2] = (pi[n] * d[ 2]) + (pi[n + 1] * d[ 6]) +(pi[n + 2] * d[10]) + d[14];
   }
}
function SMatrix4x4_writeData(d, i){
   var o = this;
   var pd = o._data;
   d[i + 0] = pd[ 0];
   d[i + 1] = pd[ 4];
   d[i + 2] = pd[ 8];
   d[i + 3] = pd[12];
   d[i + 4] = pd[ 1];
   d[i + 5] = pd[ 5];
   d[i + 6] = pd[ 9];
   d[i + 7] = pd[13];
   d[i + 8] = pd[ 2];
   d[i + 9] = pd[ 6];
   d[i +10] = pd[10];
   d[i +11] = pd[14];
   d[i +12] = pd[ 3];
   d[i +13] = pd[ 7];
   d[i +14] = pd[11];
   d[i +15] = pd[15];
}
function SOrthoMatrix3d(o){
   if(!o){o = this;}
   SMatrix3d(o);
   o.perspectiveLH            = SOrthoMatrix3d_perspectiveLH;
   o.perspectiveRH            = SOrthoMatrix3d_perspectiveRH;
   o.perspectiveFieldOfViewLH = SOrthoMatrix3d_perspectiveFieldOfViewLH;
   o.perspectiveFieldOfViewRH = SOrthoMatrix3d_perspectiveFieldOfViewRH;
   return o;
}
function SOrthoMatrix3d_perspectiveLH(pw, ph, pn, pf){
   var d = this._data;
   d[ 0] = 2.0 * pn / pw;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = 2.0 * pn / ph;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pf - pn);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}
function SOrthoMatrix3d_perspectiveRH(pw, ph, pn, pf){
   var d = this._data;
   d[ 0] = 2.0 * pn / pw;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = 2.0 * pn / ph;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pn - pf);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}
function SOrthoMatrix3d_perspectiveFieldOfViewLH(pv, pr, pn, pf){
   var d = this._data;
   var sy = 1.0 / Math.tan(pv * 0.5);
   var sx = sy / pr;
   d[ 0] = sx;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = sy;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pf - pn);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}
function SOrthoMatrix3d_perspectiveFieldOfViewRH(pv, pr, pn, pf){
   var d = this._data;
   var sy = 1.0 / Math.tan(pv * 0.5);
   var sx = sy / pr;
   d[ 0] = sx;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = sy;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pn - pf);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pf - pn);
   d[15] = 0.0;
}
function SOutline3(o){
   if(!o){o = this;}
   o.min = new SPoint3();
   o.max = new SPoint3();
   o.assign      = SOutline3_assign;
   o.serialize   = SOutline3_serialize
   o.unserialize = SOutline3_unserialize
   o.toString    = SOutline3_toString;
   return o;
}
function SOutline3_assign(p){
   var o = this;
   o.min.assign(p.min);
   o.max.assign(p.max);
}
function SOutline3_serialize(p){
   var o = this;
   o.min.serialize(p);
   o.max.serialize(p);
}
function SOutline3_unserialize(p){
   var o = this;
   o.min.unserialize(p);
   o.max.unserialize(p);
}
function SOutline3_toString(){
   var o = this;
   return '(' + o.min + ')-(' + o.max + ')';
}
function SPadding(l, t, r, b){
   var o = this;
   o.left     = RInteger.nvl(l);
   o.top      = RInteger.nvl(t);
   o.right    = RInteger.nvl(r);
   o.bottom   = RInteger.nvl(b);
   o.reset    = SPadding_reset;
   o.assign   = SPadding_assign;
   o.set      = SPadding_set;
   o.parse    = SPadding_parse;
   o.toString = SPadding_toString;
   o.dump     = SPadding_dump;
   return o;
}
function SPadding_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
function SPadding_assign(p){
   var o = this;
   o.left = p.left;
   o.top = p.top;
   o.right = p.right;
   o.bottom = p.bottom;
}
function SPadding_set(l, t, r, b){
   var o = this;
   o.left = l;
   o.top = t;
   o.right = r;
   o.bottom = b;
}
function SPadding_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 4){
      o.left = parseInt(r[0]);
      o.top = parseInt(r[1]);
      o.right = parseInt(r[2]);
      o.bottom = parseInt(r[3]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", v);
   }
}
function SPadding_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}
function SPadding_dump(d){
   var o = this;
   return RClass.dump(o) + ' [' + o.left + ',' + o.top + ',' + o.right + ',' + o.bottom + ']';
}
function SPerspectiveMatrix3d(o){
   if(!o){o = this;}
   SMatrix3d(o);
   o.perspectiveLH            = SPerspectiveMatrix3d_perspectiveLH;
   o.perspectiveRH            = SPerspectiveMatrix3d_perspectiveRH;
   o.perspectiveFieldOfViewLH = SPerspectiveMatrix3d_perspectiveFieldOfViewLH;
   o.perspectiveFieldOfViewRH = SPerspectiveMatrix3d_perspectiveFieldOfViewRH;
   return o;
}
function SPerspectiveMatrix3d_perspectiveLH(pw, ph, pn, pf){
   var d = this._data;
   d[ 0] = 2.0 * pn / pw;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = 2.0 * pn / ph;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pf - pn);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}
function SPerspectiveMatrix3d_perspectiveRH(pw, ph, pn, pf){
   var d = this._data;
   d[ 0] = 2.0 * pn / pw;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = 2.0 * pn / ph;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pn - pf);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}
function SPerspectiveMatrix3d_perspectiveFieldOfViewLH(pv, pr, pn, pf){
   var d = this._data;
   var sy = 1.0 / Math.tan(pv * 0.5);
   var sx = sy / pr;
   d[ 0] = sx;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = sy;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pf - pn);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}
function SPerspectiveMatrix3d_perspectiveFieldOfViewRH(pv, pr, pn, pf){
   var d = this._data;
   var sy = 1.0 / Math.tan(pv * 0.5);
   var sx = sy / pr;
   d[ 0] = sx;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = sy;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pn - pf);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pf - pn);
   d[15] = 0.0;
}
function SPlane(o){
   if(!o){o = this;}
   o.a         = 0.0;
   o.b         = 0.0;
   o.c         = 0.0;
   o.d         = 0.0;
   o.assign    = SPlane_assign;
   o.set       = SPlane_set;
   o.normalize = SPlane_normalize;
   o.dot       = SPlane_dot;
   o.toString  = SPlane_toString;
   o.dump      = SPlane_dump;
   return o;
}
function SPlane_assign(p){
   var o = this;
   o.a = p.a;
   o.b = p.b;
   o.c = p.c;
   o.d = p.d;
}
function SPlane_set(pa, pb, pc, pd){
   var o = this;
   o.a = pa;
   o.b = pb;
   o.c = pc;
   o.d = pd;
}
function SPlane_normalize(){
   var o = this;
   var r = 1.0 / Math.sqrt((o.a * o.a) + (o.b * o.b) + (o.c * o.c));
   o.a *= r;
   o.b *= r;
   o.c *= r;
   o.d *= r;
}
function SPlane_dot(x, y, z){
   var o = this;
   return (x * o.a) + (y * o.b) + (z * o.c ) + d;
}
function SPlane_toString(){
   var o = this;
   return o.a + ',' + o.b + ',' + o.c + ',' + o.d;
}
function SPlane_dump(){
   var o = this;
   return RClass.dump(o) + ' [' + o.toString() + ']';
}
function SPoint2(x, y){
   var o = this;
   o.x           = RInteger.nvl(x);
   o.y           = RInteger.nvl(y);
   o.equals      = SPoint2_equals;
   o.assign      = SPoint2_assign;
   o.set         = SPoint2_set;
   o.serialize   = SPoint2_serialize;
   o.unserialize = SPoint2_unserialize;
   o.toString    = SPoint2_toString;
   o.dump        = SPoint2_dump;
   return o;
}
function SPoint2_equals(p){
   return p ? (this.x == p.x && this.y == p.y) : false;
}
function SPoint2_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
}
function SPoint2_set(x, y){
   var o = this;
   o.x = x;
   o.y = y;
}
function SPoint2_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
}
function SPoint2_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
}
function SPoint2_toString(){
   var o = this;
   return o.x + ',' + o.y;
}
function SPoint2_dump(){
   return RClass.dump(this) + ' [' + this.x + ',' + this.y + ']';
}
function SPoint3(x, y, z){
   var o = this;
   o.x           = x;
   o.y           = y;
   o.z           = z;
   o.assign      = SPoint3_assign;
   o.set         = SPoint3_set;
   o.resize      = SPoint3_resize;
   o.slerp       = SPoint3_slerp;
   o.serialize   = SPoint3_serialize;
   o.unserialize = SPoint3_unserialize;
   o.toString    = SPoint3_toString;
   o.dump        = SPoint3_dump;
   return o;
}
function SPoint3_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
}
function SPoint3_set(x, y, z){
   var o = this;
   if(x != null){
      o.x = x;
   }
   if(y != null){
      o.y = y;
   }
   if(z != null){
      o.z = z;
   }
}
function SPoint3_resize(x, y, z){
   var o = this;
   if(x != null){
      o.x += x;
   }
   if(y != null){
      o.y += y;
   }
   if(z != null){
      o.z += z;
   }
}
function SPoint3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}
function SPoint3_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}
function SPoint3_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}
function SPoint3_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z;
}
function SPoint3_dump(){
   return RClass.dump(this) + ' [' + this.x + ',' + this.y + ',' + this.z + ']';
}
function SPoint4(x, y, z, w){
   var o = this;
   o.x           = x;
   o.y           = y;
   o.z           = z;
   o.w           = w;
   o.assign      = SPoint4_assign;
   o.set         = SPoint4_set;
   o.serialize   = SPoint4_serialize;
   o.unserialize = SPoint4_unserialize;
   o.toString    = SPoint4_toString;
   return o;
}
function SPoint4_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
   o.w = p.w;
}
function SPoint4_set(x, y, z, w){
   var o = this;
   if(x != null){
      o.x = x;
   }
   if(y != null){
      o.y = y;
   }
   if(z != null){
      o.z = z;
   }
   if(w != null){
      o.w = w;
   }
}
function SPoint4_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
   p.writeFloat(o.w);
}
function SPoint4_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
   o.w = p.readFloat();
}
function SPoint4_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
}
function SQuaternion(o){
   if(!o){o = this;}
   o.x             = 0.0;
   o.y             = 0.0;
   o.z             = 0.0;
   o.w             = 1.0;
   o.assign        = SQuaternion_assign;
   o.set           = SQuaternion_set;
   o.absolute      = SQuaternion_absolute;
   o.normalize     = SQuaternion_normalize;
   o.mul           = SQuaternion_mul;
   o.mul2          = SQuaternion_mul2;
   o.slerp         = SQuaternion_slerp;
   o.fromAxisAngle = SQuaternion_fromAxisAngle;
   o.serialize     = SQuaternion_serialize;
   o.unserialize   = SQuaternion_unserialize;
   o.toString      = SQuaternion_toString;
   return o;
}
function SQuaternion_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
   o.w = p.w;
}
function SQuaternion_set(x, y, z, w){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
   o.w = w;
}
function SQuaternion_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z) + (o.w * o.w));
}
function SQuaternion_normalize(){
   var o = this;
   var a = o.absolute();
   var v = 1.0 / a;
   o.x *= v;
   o.y *= v;
   o.z *= v;
   o.w *= v;
}
function SQuaternion_mul(p){
   var o = this;
   var x = o.x;
   var y = o.y;
   var z = o.z;
   var w = o.w;
   o.x = (w * p.x) + (x * p.w) + (y * p.z) - (z * p.y);
   o.y = (w * p.y) + (y * p.w) + (z * p.x) - (x * p.z);
   o.z = (w * p.z) + (z * p.w) + (x * p.y) - (y * p.x);
   o.w = (w * p.w) - (x * p.x) - (y * p.y) - (z * p.z);
}
function SQuaternion_mul2(p1, p2){
   var o = this;
   o.x = (p1.w * p2.x) + (p1.x * p2.w) + (p1.y * p2.z) - (p1.z * p2.y);
   o.y = (p1.w * p2.y) + (p1.y * p2.w) + (p1.z * p2.x) - (p1.x * p2.z);
   o.z = (p1.w * p2.z) + (p1.z * p2.w) + (p1.x * p2.y) - (p1.y * p2.x);
   o.w = (p1.w * p2.w) - (p1.x * p2.x) - (p1.y * p2.y) - (p1.z * p2.z);
}
function SQuaternion_slerp(v1, v2, r){
   var o = this;
   var rv = (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z) + (v1.w * v2.w);
   var rf = false;
   if (rv < 0.0){
      rf = true;
      rv = -rv;
   }
   var r1 = 0.0;
   var r2 = 0.0;
   if(rv > 0.999999){
      r1 = 1.0 - r;
      r2 = rf ? -r : r;
   }else{
      var ra = Math.acos(rv);
      var rb = 1.0 / Math.sin(ra);
      r1 = Math.sin((1.0 - r) * ra) * rb;
      r2 = rf ? (-Math.sin(r * ra) * rb) : (Math.sin(r * ra) * rb);
   }
   o.x = (r1 * v1.x) + (r2 * v2.x);
   o.y = (r1 * v1.y) + (r2 * v2.y);
   o.z = (r1 * v1.z) + (r2 * v2.z);
   o.w = (r1 * v1.w) + (r2 * v2.w);
}
function SQuaternion_fromAxisAngle(a, g){
   var o = this;
   var r = g * 0.5;
   var s = Math.sin(r);
   o.x = a.x * s;
   o.y = a.y * s;
   o.z = a.z * s;
   o.w = Math.cos(r);
}
function SQuaternion_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
   p.writeFloat(o.w);
}
function SQuaternion_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
   o.w = p.readFloat();
}
function SQuaternion_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
}
function SRange(x, y, w, h){
   var o = this;
   o.x         = x;
   o.y         = y;
   o.width     = w;
   o.height    = h;
   o.dump      = SRange_dump;
   return o;
}
function SRange_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
function SRange_assign(rect){
   this.left = rect.left;
   this.top = rect.top;
   this.right = rect.right;
   this.bottom = rect.bottom;
}
function SRange_set(left, top, right, bottom){
   this.left = left;
   this.top = top;
   this.right = right;
   this.bottom = bottom;
}
function SRange_setBounds(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = o.left + width - 1;
   o.bottom = o.top + height - 1;
}
function SRange_width(){
   return this.right - this.left + 1;
}
function SRange_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}
function SRange_height(){
   return this.bottom - this.top + 1;
}
function SRange_setHeight(height){
   if(height){
      this.bottom = this.top + height - 1;
   }
}
function SRange_move(x, y){
   this.left += x;
   this.top += y;
   this.right += x;
   this.bottom += y;
}
function SRange_inc(border){
   var n = RInt.nvl(border, 1);
   this.left -= n;
   this.top -= n;
   this.right += n;
   this.bottom += n;
}
function SRange_dec(border){
   var n = RInt.nvl(border, 1);
   this.left += n;
   this.top += n;
   this.right -= n;
   this.bottom -= n;
}
function SRange_dump(d){
   var o = this;
   d = RString.nvlStr(d);
   d.append(RClass.name(o));
   d.append(' [', o.x, ',', o.y, '-', o.width, ',', o.height, '] ');
   return d;
}
function SRectangle(l, t, r, b){
   var o = this;
   o.left      = RInteger.nvl(left);
   o.top       = RInteger.nvl(top);
   o.right     = RInteger.nvl(right);
   o.bottom    = RInteger.nvl(bottom);
   o.reset     = SRectangle_reset;
   o.assign    = SRectangle_assign;
   o.set       = SRectangle_set;
   o.setBounds = SRectangle_setBounds;
   o.width     = SRectangle_width;
   o.setWidth  = SRectangle_setWidth;
   o.height    = SRectangle_height;
   o.setHeight = SRectangle_setHeight;
   o.move      = SRectangle_move;
   o.inc       = SRectangle_inc;
   o.dec       = SRectangle_dec;
   o.pack      = SRectangle_dump;
   o.unpack    = SRectangle_dump;
   o.dump      = SRectangle_dump;
   return o;
}
function SRectangle_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
function SRectangle_assign(rect){
   this.left = rect.left;
   this.top = rect.top;
   this.right = rect.right;
   this.bottom = rect.bottom;
}
function SRectangle_set(left, top, right, bottom){
   this.left = left;
   this.top = top;
   this.right = right;
   this.bottom = bottom;
}
function SRectangle_setBounds(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = o.left + width - 1;
   o.bottom = o.top + height - 1;
}
function SRectangle_width(){
   return this.right - this.left + 1;
}
function SRectangle_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}
function SRectangle_height(){
   return this.bottom - this.top + 1;
}
function SRectangle_setHeight(height){
   if(height){
      this.bottom = this.top + height - 1;
   }
}
function SRectangle_move(x, y){
   this.left += x;
   this.top += y;
   this.right += x;
   this.bottom += y;
}
function SRectangle_inc(border){
   var n = RInt.nvl(border, 1);
   this.left -= n;
   this.top -= n;
   this.right += n;
   this.bottom += n;
}
function SRectangle_dec(border){
   var n = RInt.nvl(border, 1);
   this.left += n;
   this.top += n;
   this.right -= n;
   this.bottom -= n;
}
function SRectangle_dump(d){
   d = RString.nvlStr(d);
   d.append(RClass.name(this));
   d.append(' [', this.left, ',', this.top, '-', this.right, ',', this.bottom, '] ');
   d.append('(', this.width(), '-', this.height(), ')');
   return d;
}
function SSize2(w, h){
   var o = this;
   o.width    = RInteger.nvl(w);
   o.height   = RInteger.nvl(h);
   o.assign   = SSize2_assign;
   o.set      = SSize2_set;
   o.parse    = SSize2_parse;
   o.toString = SSize2_toString;
   o.dump     = SSize2_dump;
   return o;
}
function SSize2_assign(v){
   var o = this;
   o.width = v.width;
   o.height = v.height;
}
function SSize2_set(w, h){
   var o = this;
   o.width = w;
   o.height = h;
}
function SSize2_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 2){
      o.width = parseInt(r[0]);
      o.height = parseInt(r[1]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", v);
   }
}
function SSize2_toString(){
   var o = this;
   return o.width + ',' + o.height;
}
function SSize2_dump(){
   var o = this;
   return RClass.dump(o) + ' [' + o.width + ',' + o.height + ']';
}
function SSize3(w, h, d){
   var o = this;
   o.width    = RInteger.nvl(w);
   o.height   = RInteger.nvl(h);
   o.deep     = RInteger.nvl(d);
   o.assign   = SSize3_assign;
   o.set      = SSize3_set;
   o.parse    = SSize3_parse;
   o.toString = SSize3_toString;
   o.dump     = SSize3_dump;
   return o;
}
function SSize3_assign(v){
   var o = this;
   o.width = v.width;
   o.height = v.height;
   o.deep = v.deep;
}
function SSize3_set(w, h, d){
   var o = this;
   o.width = w;
   o.height = h;
   o.deep = d;
}
function SSize3_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 3){
      o.width = parseInt(r[0]);
      o.height = parseInt(r[1]);
      o.deep = parseInt(r[2]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", v);
   }
}
function SSize3_toString(){
   var o = this;
   return o.width + ',' + o.height + ',' + o.deep;
}
function SSize3_dump(){
   var o = this;
   return RClass.dump(o) + ' [' + o.width + ',' + o.height + ',' + o.deep + ']';
}
function SVector3(o){
   if(!o){o = this;}
   o.x           = 0;
   o.y           = 0;
   o.z           = 0;
   o.assign      = SVector3_assign;
   o.set         = SVector3_set;
   o.absolute    = SVector3_absolute;
   o.normalize   = SVector3_normalize;
   o.dotPoint3   = SVector3_dotPoint3;
   o.cross       = SVector3_cross;
   o.cross2      = SVector3_cross2;
   o.slerp       = SVector3_slerp;
   o.serialize   = SVector3_serialize;
   o.unserialize = SVector3_unserialize;
   o.toString    = SVector3_toString;
   return o;
}
function SVector3_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
}
function SVector3_set(x, y, z){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
}
function SVector3_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z));
}
function SVector3_normalize(){
   var o = this;
   var v = o.absolute();
   if(v != 0.0){
      o.x /= v;
      o.y /= v;
      o.z /= v;
   }
}
function SVector3_dotPoint3(v){
   var o = this;
   return (o.x * v.x) + (o.y * v.y) + (o.z * v.z);
}
function SVector3_cross(v){
   var o = this;
   var vx = (o.y * v.z) - (o.z * v.y);
   var vy = (o.z * v.x) - (o.x * v.z);
   var vz = (o.x * v.y) - (o.y * v.x);
   o.x = vx;
   o.y = vy;
   o.z = vz;
}
function SVector3_cross2(po, pi){
   var o = this;
   po.x = (o.y * pi.z) - (o.z * pi.y);
   po.y = (o.z * pi.x) - (o.x * pi.z);
   po.z = (o.x * pi.y) - (o.y * pi.x);
}
function SVector3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}
function SVector3_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}
function SVector3_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}
function SVector3_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z;
}
function SVector4(o){
   if(!o){o = this;}
   o.x           = 0;
   o.y           = 0;
   o.z           = 0;
   o.w           = 0;
   o.assign      = SVector4_assign;
   o.set         = SVector4_set;
   o.absolute    = SVector4_absolute;
   o.normalize   = SVector4_normalize;
   o.serialize   = SVector4_serialize;
   o.unserialize = SVector4_unserialize;
   o.toString    = SVector4_toString;
   return o;
}
function SVector4_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
   o.w = p.w;
}
function SVector4_set(x, y, z, w){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
   o.w = w;
}
function SVector4_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z) + (o.w * o.w));
}
function SVector4_normalize(){
   var o = this;
   var v = o.absolute();
   if(v != 0.0){
      o.x /= v;
      o.y /= v;
      o.z /= v;
      o.w /= w;
   }
}
function SVector4_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
   p.writeFloat(o.w);
}
function SVector4_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
   o.w = p.readFloat();
}
function SVector4_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
}
function AEvent(o, n, l, h){
   if(!o){o = this;}
   AAnnotation(o, n);
   o._annotationCd = EAnnotation.Event;
   o._linker       = l;
   o._handle       = h;
   o._process      = null;
   o.handle        = AEvent_handle;
   o.value         = AEvent_value;
   o.attach        = RMethod.empty;
   o.toString      = AEvent_toString;
   return o;
}
function AEvent_handle(){
   return this._handle;
}
function AEvent_value(){
   return this._process;
}
function AEvent_toString(){
   var o = this;
   return 'linker=' + o._linker + ',handle=' + o._handle;
}
function AEventBlur(n, m){
   var o = this;
   AEvent(o, n, 'blur', 'onblur');
   o._hSource = null;
   o.attach   = AEventBlur_attach;
   return o;
}
function AEventBlur_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
function AEventChange(n){
   var o = this;
   AEvent(o, n, 'change', 'onchange');
   o._hSource = null;
   o.attach   = AEventChange_attach;
   return o;
}
function AEventChange_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
function AEventClick(n){
   var o = this;
   AEvent(o, n, 'click', 'onclick');
   o._hSource = null;
   o.attach   = AEventClick_attach;
   return o;
}
function AEventClick_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
function AEventDoubleClick(n){
   var o = this;
   AEvent(o, n, 'dblclick', 'ondblclick');
   o._hSource = null;
   o.attach   = AEventDoubleClick_attach;
   return o;
}
function AEventDoubleClick_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
function AEventFocus(n){
   var o = this;
   AEvent(o, n, 'focus', 'onfocus');
   o._hSource = null;
   o.attach   = AEventFocus_attach;
   return o;
}
function AEventFocus_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
function AEventKeyDown(n){
   var o = this;
   AEvent(o, n, 'keydown', 'onkeydown');
   o._hSource  = null;
   o._altKey   = false;
   o._shiftKey = false;
   o._ctrlKey  = false;
   o._keyCode  = null;
   o.attach    = AEventKeyDown_attach;
   return o;
}
function AEventKeyDown_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._shiftKey = p.shiftKey;
   o._ctrlKey = p.ctrlKey;
   o._keyCode = p.keyCode;
}
function AEventKeyPress(n){
   var o = this;
   AEvent(o, n, 'keypress', 'onkeypress');
   o._hSource  = null;
   o._altKey   = false;
   o._shiftKey = false;
   o._ctrlKey  = false;
   o._keyCode  = null;
   o.attach    = AEventKeyPress_attach;
   return o;
}
function AEventKeyPress_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._shiftKey = p.shiftKey;
   o._ctrlKey = p.ctrlKey;
   o._keyCode = p.keyCode;
}
function AEventKeyUp(n){
   var o = this;
   AEvent(o, n, 'keyup', 'onkeyup');
   o._hSource  = null;
   o._altKey   = false;
   o._shiftKey = false;
   o._ctrlKey  = false;
   o._keyCode  = null;
   o.attach    = AEventKeyUp_attach;
   return o;
}
function AEventKeyUp_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._shiftKey = p.shiftKey;
   o._ctrlKey = p.ctrlKey;
   o._keyCode = p.keyCode;
}
function AEventLoad(n){
   var o = this;
   AEvent(o, n, 'load', 'onload');
   o._hSource = null;
   o.attach   = AEventLoad_attach;
   return o;
}
function AEventLoad_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
function AEventMouseDown(n){
   var o = this;
   AEvent(o, n, 'mousedown', 'onmousedown');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o._offsetX = null;
   o._offsetY = null;
   o._clientX = null;
   o._clientY = null;
   o.attach   = AEventMouseDown_attach;
   return o;
}
function AEventMouseDown_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
      o._offsetX = p.layerX;
      o._offsetY = p.layerY;
   }else{
      o._x = p.x;
      o._y = p.y;
      o._offsetX = p.offsetX;
      o._offsetY = p.offsetY;
   }
   o._clientX = p.clientX;
   o._clientY = p.clientY;
}
function AEventMouseEnter(n){
   var o = this;
   AEvent(o, n, 'mouseenter', 'onmouseenter');
   o._hSource = null;
   o.attach   = AEventMouseEnter_attach;
   return o;
}
function AEventMouseEnter_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
function AEventMouseLeave(n){
   var o = this;
   AEvent(o, n, 'mouseleave', 'onmouseleave');
   o._hSource = null;
   o.attach   = AEventMouseLeave_attach;
   return o;
}
function AEventMouseLeave_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
function AEventMouseMove(n){
   var o = this;
   AEvent(o, n, 'mousemove', 'onmousemove');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o._offsetX = null;
   o._offsetY = null;
   o._clientX = null;
   o._clientY = null;
   o.attach   = AEventMouseMove_attach;
   return o;
}
function AEventMouseMove_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
      o._offsetX = p.layerX;
      o._offsetY = p.layerY;
   }else{
      o._x = p.x;
      o._y = p.y;
      o._offsetX = p.offsetX;
      o._offsetY = p.offsetY;
   }
   o._clientX = p.clientX;
   o._clientY = p.clientY;
}
function AEventMouseOut(n){
   var o = this;
   AEvent(o, n, 'mouseout', 'onmouseout');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = AEventMouseOut_attach;
   return o;
}
function AEventMouseOut_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
function AEventMouseOver(n){
   var o = this;
   AEvent(o, n, 'mouseover', 'onmouseover');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = AEventMouseOver_attach;
   return o;
}
function AEventMouseOver_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
function AEventMouseUp(n){
   var o = this;
   AEvent(o, n, 'mouseup', 'onmouseup');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o._offsetX = null;
   o._offsetY = null;
   o._clientX = null;
   o._clientY = null;
   o.attach   = AEventMouseUp_attach;
   return o;
}
function AEventMouseUp_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
      o._offsetX = p.layerX;
      o._offsetY = p.layerY;
   }else{
      o._x = p.x;
      o._y = p.y;
      o._offsetX = p.offsetX;
      o._offsetY = p.offsetY;
   }
   o._clientX = p.clientX;
   o._clientY = p.clientY;
}
function AEventMouseWheel(n){
   var o = this;
   AEvent(o, n, 'mousewheel', 'onmousewheel');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o._delta   = null;
   o.attach   = AEventMouseWheel_attach;
   return o;
}
function AEventMouseWheel_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   o._delta = p.wheelDelta;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
function AEventReadyStateChange(n){
   var o = this;
   AEvent(o, n, 'readystatechange', 'onreadystatechange');
   o._hSource = null;
   o.attach   = AEventReadyStateChange_attach;
   return o;
}
function AEventReadyStateChange_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
function AEventResize(n){
   var o = this;
   AEvent(o, n, 'resize', 'onresize');
   o._hSource = null;
   o._x       = null;
   o._y       = null;
   o.attach   = AEventResize_attach;
   return o;
}
function AEventResize_attach(p){
   var o = this;
   o._x = p.x;
   o._y = p.y;
}
function AEventScroll(n){
   var o = this;
   AEvent(o, n, 'scroll', 'onscroll');
   o._hSource = null;
   o.attach   = AEventScroll_attach;
   return o;
}
function AEventScroll_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
var EBrowser = new function EBrowser(){
   var o = this;
   o.Explorer = 1;
   o.FireFox  = 2;
   o.Chrome  = 3;
   return o;
}
var EDataType = new function EDataType(){
   var o = this;
   o.Unknown =  0;
   o.Boolean =  1;
   o.Int8    =  2;
   o.Int16   =  3;
   o.Int32   =  4;
   o.Int64   =  5;
   o.Uint8   =  6;
   o.Uint16  =  7;
   o.Uint32  =  8;
   o.Uint64  =  9;
   o.Float   = 10;
   o.Double  = 11;
   o.String  = 12;
   return o;
}
var EHttpContent = new function EHttpContent(){
   var o = this;
   o.Binary = 1;
   o.Text  = 2;
   return o;
}
var EHttpMethod = new function EHttpMethod(){
   var o = this;
   o.Get  = 'GET';
   o.Post = 'POST';
   return o;
}
var EHttpStatus = new function EHttpStatus(){
   var o = this;
   o.Begin   = 0;
   o.Build   = 1;
   o.Send    = 2;
   o.Receive = 3;
   o.Finish  = 4;
   return o;
}
var EKeyCode = new function EKeyCode(){
   var o = this;
   o.None      = 0;
   o.Esc       = 27;
   o.Tab       = 9;
   o.Enter     = 13;
   o.Shift     = 16;
   o.Alt       = 18;
   o.Ctrl      = 17;
   o.BackSpace = 8;
   o.Left      = 37;
   o.Up        = 38;
   o.Right     = 39;
   o.Down      = 40;
   o.Insert    = 45;
   o.Delete    = 46;
   o.Home      = 36;
   o.End       = 35;
   o.PageUp    = 33;
   o.PageDown  = 34;
   o.F1        = 112;
   o.F2        = 113;
   o.F3        = 114;
   o.F4        = 115;
   o.F5        = 116;
   o.F6        = 117;
   o.F7        = 118;
   o.F8        = 119;
   o.F9        = 120;
   o.F10       = 121;
   o.F11       = 122;
   o.F12       = 123;
   o.A         = 65;
   o.B         = 66;
   o.C         = 67;
   o.D         = 68;
   o.E         = 69;
   o.F         = 70;
   o.G         = 71;
   o.H         = 72;
   o.I         = 73;
   o.J         = 74;
   o.K         = 75;
   o.L         = 76;
   o.M         = 77;
   o.N         = 78;
   o.O         = 79;
   o.P         = 80;
   o.Q         = 81;
   o.R         = 82;
   o.S         = 83;
   o.T         = 84;
   o.U         = 85;
   o.V         = 86;
   o.W         = 87;
   o.X         = 88;
   o.Y         = 89;
   o.Z         = 90;
   o.ControlKeys = [
      o.Tab, o.Enter, o.BackSpace, o.Shift, o.Left, o.Up, o.Right, o.Down,
      o.Insert, o.Delete, o.Home, o.End, o.PageUp, o.PageDown,o.Ctrl,
      o.F1, o.F2, o.F3, o.F4, o.F5, o.F6, o.F7, o.F8, o.F9, o.F10, o.F11, o.F12];
   o.floatCodes  = new Object();
   var f = o.floatCodes;
   f[o.Tab] = true;
   f[o.Enter] = true;
   f[o.BackSpace] = true;
   f[o.Left] = true;
   f[o.Right] = true;
   f[o.Esc] = true;
   f[o.Delete] = true;
   f[o.Home] = true;
   f[o.End] = true;
   f[45] = true;
   f[190] = true;
   f[46] = true;
   f[189] = true;
   for(var n = 48; n <= 57; n++){
      f[n] = true;
   }
   return o;
}
function FBytes(o){
   o = RClass.inherits(this, o, FObject, MDataView);
   o._memory   = null;
   o.construct = FBytes_construct;
   o.dispose   = FBytes_dispose;
   return o;
}
function FBytes_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._memory = new ArrayBuffer();
   o._viewer = new DataView(o._memory);
}
function FBytes_dispose(){
   var o = this;
   o._memory = null;
   o._viewer = null;
   o.__base.FObject.dispose.call(o);
}
function FDataStream(o){
   o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
   o.construct = FDataStream_construct;
   o.dispose   = FDataStream_dispose;
   return o;
}
function FDataStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._memory = new ArrayBuffer();
   o._viewer = new DataView(o._memory);
}
function FDataStream_dispose(){
   var o = this;
   o._memory = null;
   o._viewer = null;
   o.__base.FObject.dispose.call(o);
}
function FDataView(o){
   o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
   o.link    = FDataView_link;
   o.dispose = FDataView_dispose;
   return o;
}
function FDataView_link(p){
   var o = this;
   o._memory = p;
   o._viewer = new DataView(p);
}
function FDataView_dispose(){
   var o = this;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
function FHttpConnection(o){
   o = RClass.inherits(this, o, FObject);
   o._asynchronous        = false;
   o._methodCd            = EHttpMethod.Get;
   o._contentCd           = EHttpContent.Binary;
   o._url                 = null;
   o._inputData           = null;
   o._outputData          = null;
   o._connection          = null;
   o._contentLength       = 0;
   o._statusFree          = true;
   o.lsnsLoad             = null;
   o.onConnectionSend     = FHttpConnection_onConnectionSend;
   o.onConnectionReady    = FHttpConnection_onConnectionReady;
   o.onConnectionComplete = FHttpConnection_onConnectionComplete;
   o.construct            = FHttpConnection_construct;
   o.setHeaders           = FHttpConnection_setHeaders;
   o.inputData            = FHttpConnection_inputData;
   o.setInputData         = FHttpConnection_setInputData;
   o.outputData           = FHttpConnection_outputData;
   o.setOutputData        = FHttpConnection_setOutputData;
   o.content              = FHttpConnection_content;
   o.sendSync             = FHttpConnection_sendSync;
   o.sendAsync            = FHttpConnection_sendAsync;
   o.send                 = FHttpConnection_send;
   return o;
}
function FHttpConnection_onConnectionSend(){
   var o = this;
   if(o._inputData){
      o._contentLength = o._inputData.length;
   }
}
function FHttpConnection_onConnectionReady(){
   var o = this._linker;
   if(o._asynchronous){
      var c = o._connection;
      if(c.readyState == EHttpStatus.Finish){
         if(c.status == 200){
            o.setOutputData();
            o.onConnectionComplete();
         }else{
            throw new TError(o, 'Connection failure. (url={1})', o._url);
         }
      }
   }
}
function FHttpConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
   o.lsnsLoad.process(o);
}
function FHttpConnection_construct(){
   var o = this;
   o.lsnsLoad = new TListeners();
   var c = o._connection = RXml.createConnection();
   c._linker = o;
   c.onreadystatechange = o.onConnectionReady;
}
function FHttpConnection_setHeaders(){
   var o = this;
   var c = o._connection;
   if(o._contentCd == EHttpContent.Binary){
      if(RBrowser.isBrowser(EBrowser.Chrome)){
         c.overrideMimeType('text/plain; charset=x-user-defined');
         if(o._asynchronous){
            c.responseType = 'arraybuffer';
         }
      }else{
         c.setRequestHeader('Accept-Charset', 'x-user-defined');
         c.responseType = 'arraybuffer';
      }
   }else{
      c.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   }
   if(!RBrowser.isBrowser(EBrowser.Chrome)){
      if(o._contentLength > 0){
         c.setRequestHeader('content-length', o._contentLength);
      }
   }
}
function FHttpConnection_inputData(){
   return this._inputData;
}
function FHttpConnection_setInputData(p){
   this._inputData = p;
}
function FHttpConnection_outputData(){
   return this._outputData;
}
function FHttpConnection_setOutputData(){
   var o = this;
   var c = o._connection;
   if(o._contentCd == EHttpContent.Binary){
      if(RBrowser.isBrowser(EBrowser.Chrome)){
         o._outputData = c.response;
      }else{
         o._outputData = c.response;
      }
   }else{
      o._outputData = c.responseText;
   }
}
function FHttpConnection_content(){
   return this._outputData;
}
function FHttpConnection_sendSync(){
   var o = this;
   var c = o._connection;
   c.open(o._methodCd, o._url, false);
   o.setHeaders(c, 0);
   c.send(o._inputData);
   o.setOutputData();
   o.onConnectionComplete();
   RLogger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
}
function FHttpConnection_sendAsync(){
   var o = this;
   var c = o._connection;
   c.open(o._methodCd, o._url, true);
   o.setHeaders(c, 0);
   c.send(o._inputData);
   RLogger.info(this, 'Send http asynchronous request. (method={1}, url={2})', o._methodCd, o._url);
}
function FHttpConnection_send(p){
   var o = this;
   o._url = p;
   o._statusFree = false;
   o.onConnectionSend();
   if(o._asynchronous){
      o.sendAsync();
   }else{
      o.sendSync();
   }
   return o.content();
}
function FImage(o){
   o = RClass.inherits(this, o, FObject);
   o._image    = null;
   o._width    = 0;
   o._height   = 0;
   o._ready    = false;
   o.lsnsLoad  = null;
   o.ohLoad    = FImage_ohLoad;
   o.construct = FImage_construct;
   o.testReady = FImage_testReady;
   o.image     = FImage_image;
   o.loadUrl   = FImage_loadUrl;
   o.dispose   = FImage_dispose;
   return o;
}
function FImage_construct(){
   var o = this;
   o.lsnsLoad = new TListeners();
}
function FImage_ohLoad(){
   var o = this._linker;
   o._ready = true;
   o._width = o._image.naturalWidth;
   o._height = o._image.naturalHeight;
   o.lsnsLoad.process(o);
}
function FImage_testReady(){
   return this._ready;
}
function FImage_image(){
   return this._image;
}
function FImage_loadUrl(u){
   var o = this;
   var g = o._image;
   if(g == null){
      g = o._image = new Image();
      g._linker = o;
      g.onload = o.ohLoad;
   }
   g.src = u;
}
function FImage_dispose(){
   var o = this;
   o._image = null;
   o.__base.FObject.dispose.call(o);
}
function FXmlConnection(o){
   o = RClass.inherits(this, o, FHttpConnection);
   o._contentCd           = EHttpContent.Text;
   o._inputNode           = null;
   o._outputNode          = null;
   o.onConnectionSend     = FXmlConnection_onConnectionSend;
   o.onConnectionComplete = FXmlConnection_onConnectionComplete;
   o.content              = FXmlConnection_content;
   return o;
}
function FXmlConnection_onConnectionSend(){
   var o = this;
   if(o._inputNode){
      var d = new TXmlDocument();
      d.setRoot(_inputNode);
      var s = s.xml().toString();
      o._inputData = s;
      o._contentLength = s.length;
   }
}
function FXmlConnection_onConnectionComplete(){
   var o = this;
   var c = o._connection;
   var e = null;
   if(c.responseXML){
      e = c.responseXML.documentElement;
   }else if(c.responseXml){
      e = c.responseXml.documentElement;
   }else{
      throw new TError(o, "Fetch xml data failure.");
   }
   if(!e){
      return RMessage.fatal(o, null, 'Read xml error. (url={1})\n{2}', o._url, c._outputText)
   }
   var d = new TXmlDocument();
   RXml.buildNode(d, null, e);
   o._outputNode = d.root();
   o._statusFree = true;
}
function FXmlConnection_content(){
   return this._outputNode;
}
function MDataStream(o){
   o = RClass.inherits(this, o);
   o._viewer      = null;
   o._endianCd    = false;
   o._position    = 0;
   o.readBoolean  = FByteStream_readBoolean;
   o.readInt8     = FByteStream_readInt8;
   o.readInt16    = FByteStream_readInt16;
   o.readInt32    = FByteStream_readInt32;
   o.readInt64    = FByteStream_readInt64;
   o.readUint8    = FByteStream_readUint8;
   o.readUint16   = FByteStream_readUint16;
   o.readUint32   = FByteStream_readUint32;
   o.readUint64   = FByteStream_readUint64;
   o.readFloat    = FByteStream_readFloat;
   o.readDouble   = FByteStream_readDouble;
   o.readString   = FByteStream_readString;
   o.readBytes    = FByteStream_readBytes;
   o.writeBoolean = FByteStream_writeBoolean;
   o.writeInt8    = FByteStream_writeInt8;
   o.writeInt16   = FByteStream_writeInt16;
   o.writeInt32   = FByteStream_writeInt32;
   o.writeInt64   = FByteStream_writeInt64;
   o.writeUint8   = FByteStream_writeUint8;
   o.writeUint16  = FByteStream_writeUint16;
   o.writeUint32  = FByteStream_writeUint32;
   o.writeUint64  = FByteStream_writeUint64;
   o.writeFloat   = FByteStream_writeFloat;
   o.writeDouble  = FByteStream_writeDouble;
   o.writeString  = FByteStream_writeString;
   return o;
}
function FByteStream_readBoolean(){
   var o = this;
   var r = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return r > 0;
}
function FByteStream_readInt8(){
   var o = this;
   var r = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return r;
}
function FByteStream_readInt16(){
   var o = this;
   var r = o._viewer.getInt16(o._position, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_readInt32(){
   var o = this;
   var r = o._viewer.getInt32(o._position, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_readInt64(){
   var o = this;
   var r = o._viewer.getInt64(o._position, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_readUint8(){
   var o = this;
   var r = o._viewer.getUint8(o._position, o._endianCd);
   o._position += 1;
   return r;
}
function FByteStream_readUint16(){
   var o = this;
   var r = o._viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_readUint32(){
   var o = this;
   var r = o._viewer.getUint32(o._position, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_readUint64(){
   var o = this;
   var r = o._viewer.getUint64(o._position, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_readFloat(){
   var o = this;
   var r = o._viewer.getFloat32(o._position, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_readDouble(){
   var o = this;
   var r = o._viewer.getFloat64(o._position, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_readString(){
   var o = this;
   var l = o._viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   var r = new TString();
   for(var i = 0; i < l; i++){
      var v = o._viewer.getUint16(o._position, o._endianCd);
      o._position += 2;
      r.push(String.fromCharCode(v));
   }
   return r.toString();
}
function FByteStream_readBytes(pd, po, pl){
   var o = this;
   if(pl <= 0){
      return;
   }
   if(po != 0){
      throw new TError('Unsupport.');
   }
   if(pl % 8 == 0){
      var a = new Float64Array(pd);
      var c = pl >> 3;
      for(var i = 0; i < c; i++){
         a[i] = o._viewer.getFloat64(o._position, o._endianCd);
         o._position += 8;
      }
      return;
   }
   if(pl % 4 == 0){
      var c = pl >> 2;
      var a = new Uint32Array(pd);
      for(var i = 0; i < c; i++){
         a[i] = o._viewer.getUint32(o._position, o._endianCd);
         o._position += 4;
      }
      return;
   }
   if(pl % 2 == 0){
      var c = pl >> 1;
      var a = new Uint16Array(pd);
      for(var i = 0; i < c; i++){
         a[i] = o._viewer.getUint16(o._position, o._endianCd);
         o._position += 2;
      }
      return;
   }
   var a = new Uint8Array(pd);
   for(var i = 0; i < pl; i++){
      a[i] = o._viewer.getUint8(o._position++, o._endianCd);
   }
}
function FByteStream_writeBoolean(v){
   var o = this;
   var r = o._viewer.setInt8(o._position, (v > 0) ? 1 : 0, o._endianCd);
   o._position++;
   return r;
}
function FByteStream_writeInt8(v){
   var o = this;
   var r = o._viewer.setInt8(o._position, v, o._endianCd);
   o._position++;
   return r;
}
function FByteStream_writeInt16(v){
   var o = this;
   var r = o._viewer.setInt16(o._position, v, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_writeInt32(v){
   var o = this;
   var r = o._viewer.setInt32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_writeInt64(v){
   var o = this;
   var r = o._viewer.setInt64(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_writeUint8(v){
   var o = this;
   var r = o._viewer.setUint8(o._position, v, o._endianCd);
   o._position += 1;
   return r;
}
function FByteStream_writeUint16(v){
   var o = this;
   var r = o._viewer.setUint16(o._position, v, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_writeUint32(v){
   var o = this;
   var r = o._viewer.setUint32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_writeUint64(v){
   var o = this;
   var r = o._viewer.setUint64(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_writeFloat(v){
   var o = this;
   var r = o._viewer.setFloat32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_writeDouble(v){
   var o = this;
   var r = o._viewer.setDouble(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_writeString(v){
   var o = this;
   var l = v.length;
   o._viewer.setUint16(o._position, l, o._endianCd);
   o._position += 2;
   for(var i = 0; i < l; i++){
      o._viewer.setUint16(o._position, v.charCodeAt(i), o._endianCd)
      o._position += 2;
   }
}
function MDataView(o){
   o = RClass.inherits(this, o);
   o._viewer     = null;
   o._endianCd   = 0;
   o.endianCd    = MDataView_endianCd;
   o.setEndianCd = MDataView_setEndianCd;
   o.getInt8     = MDataView_getInt8;
   o.getInt16    = MDataView_getInt16;
   o.getInt32    = MDataView_getInt32;
   o.getInt64    = MDataView_getInt64;
   o.getUint8    = MDataView_getUint8;
   o.getUint16   = MDataView_getUint16;
   o.getUint32   = MDataView_getUint32;
   o.getUint64   = MDataView_getUint64;
   o.getFloat    = MDataView_getFloat;
   o.getDouble   = MDataView_getDouble;
   o.setInt8     = MDataView_setInt8;
   o.setInt16    = MDataView_setInt16;
   o.setInt32    = MDataView_setInt32;
   o.setInt64    = MDataView_setInt64;
   o.setUint8    = MDataView_setUint8;
   o.setUint16   = MDataView_setUint16;
   o.setUint32   = MDataView_setUint32;
   o.setUint64   = MDataView_setUint64;
   o.setFloat    = MDataView_setFloat;
   o.setDouble   = MDataView_setDouble;
   return o;
}
function MDataView_endianCd(p){
   return this._endianCd;
}
function MDataView_setEndianCd(p){
   this._endianCd = p;
}
function MDataView_getInt8(p){
   var o = this;
   return o._viewer.getInt8(p, o._endianCd);
}
function MDataView_getInt16(p){
   var o = this;
   return o._viewer.getInt16(p, o._endianCd);
}
function MDataView_getInt32(p){
   var o = this;
   return o._viewer.getInt32(p, o._endianCd);
}
function MDataView_getInt64(p){
   var o = this;
   return o._viewer.getInt64(p, o._endianCd);
}
function MDataView_getUint8(p){
   var o = this;
   return o._viewer.getUint8(p, o._endianCd);
}
function MDataView_getUint16(p){
   var o = this;
   return o._viewer.getUint16(p, o._endianCd);
}
function MDataView_getUint32(p){
   var o = this;
   return o._viewer.getUint32(p, o._endianCd);
}
function MDataView_getUint64(p){
   var o = this;
   return o._viewer.getUint64(p, o._endianCd);
}
function MDataView_getFloat(p){
   var o = this;
   return o._viewer.getFloat32(p, o._endianCd);
}
function MDataView_getDouble(p){
   var o = this;
   return o._viewer.getFloat64(p, o._endianCd);
}
function MDataView_setInt8(p, v){
   var o = this;
   o._viewer.setInt8(p, v, o._endianCd);
}
function MDataView_setInt16(p, v){
   var o = this;
   o._viewer.setInt16(p, v, o._endianCd);
}
function MDataView_setInt32(p, v){
   var o = this;
   o._viewer.setInt32(p, v, o._endianCd);
}
function MDataView_setInt64(p, v){
   var o = this;
   o._viewer.setInt64(p, v, o._endianCd);
}
function MDataView_setUint8(p, v){
   var o = this;
   o._viewer.setUint8(p, v, o._endianCd);
}
function MDataView_setUint16(p, v){
   var o = this;
   o._viewer.setUint16(p, v, o._endianCd);
}
function MDataView_setUint32(p, v){
   var o = this;
   o._viewer.setUint32(p, v, o._endianCd);
}
function MDataView_setUint64(p, v){
   var o = this;
   o._viewer.setUint64(p, v, o._endianCd);
}
function MDataView_setFloat(p, v){
   var o = this;
   o._viewer.setFloat32(p, v, o._endianCd);
}
function MDataView_setDouble(p, v){
   var o = this;
   o._viewer.setDouble(p, v, o._endianCd);
}
var RBrowser = new function RBrowser(){
   var o = this;
   o._typeCd        = 0;
   o._contentPath   = null;
   o.construct      = RBrowser_construct;
   o.contentPath    = RBrowser_contentPath;
   o.setContentPath = RBrowser_setContentPath;
   o.isBrowser      = RBrowser_isBrowser;
   o.log            = RBrowser_log;
   return o;
}
function RBrowser_construct(){
   var o = this;
   var s = window.navigator.userAgent.toLowerCase();
   if(s.indexOf("chrome") != -1){
      o._typeCd = EBrowser.Chrome;
   }else if(s.indexOf("firefox") != -1){
      o._typeCd = EBrowser.FireFox;
   }else if(s.indexOf("msie") != -1){
      o._typeCd = EBrowser.Explorer;
   }else if(s.indexOf("windows") != -1){
      o._typeCd = EBrowser.Explorer;
   }else{
      alert('Unknown browser.\n' + s);
      return;
   }
   if(o._typeCd == EBrowser.Chrome){
      RLogger.lsnsOutput.register(o, o.log);
   }
   RLogger.info(o, 'Parse browser confirm. (type_cd={1})', REnum.decode(EBrowser, o._typeCd));
}
function RBrowser_contentPath(p){
   var o = this;
   if(p){
      return o._contentPath + p;
   }
   return o._contentPath;
}
function RBrowser_setContentPath(p){
   this._contentPath = p;
}
function RBrowser_isBrowser(p){
   return this._typeCd == p;
}
function RBrowser_log(p){
   console.log(p);
}
var RBuilder = new function RBuilder(){
   var o = this;
   o.create            = RBuilder_create;
   o.createIcon        = RBuilder_createIcon;
   o.createImage       = RBuilder_createImage;
   o.createText        = RBuilder_createText;
   o.createCheck       = RBuilder_createCheck;
   o.createRadio       = RBuilder_createRadio;
   o.createEdit        = RBuilder_createEdit;
   o.createSpan        = RBuilder_createSpan;
   o.createDiv         = RBuilder_createDiv;
   o.createTable       = RBuilder_createTable;
   o.createFragment    = RBuilder_createFragment;
   o.append            = RBuilder_append;
   o.appendIcon        = RBuilder_appendIcon;
   o.appendImage       = RBuilder_appendImage;
   o.appendEmpty       = RBuilder_appendEmpty;
   o.appendText        = RBuilder_appendText;
   o.appendCheck       = RBuilder_appendCheck;
   o.appendRadio       = RBuilder_appendRadio;
   o.appendEdit        = RBuilder_appendEdit;
   o.appendSpan        = RBuilder_appendSpan;
   o.appendDiv         = RBuilder_appendDiv;
   o.appendTable       = RBuilder_appendTable;
   o.appendTableRow    = RBuilder_appendTableRow;
   o.appendTableCell   = RBuilder_appendTableCell;
   return o;
}
function RBuilder_create(d, t, s){
   var o = this;
   var h = d.createElement(t);
   if(s){
      h.className = s;
   }
   return h;
}
function RBuilder_createIcon(d, s, u, w, h){
   var r = this.create(d, 'IMG', RString.nvl(s, 'Tag_Icon'));
   r.align = 'absmiddle';
   if(u){
      r.src = RResource.iconPath(u);
   }
   if(w){
      r.style.width = w;
   }
   if(h){
      r.style.height = h;
   }
   return r;
}
function RBuilder_createImage(d, s, u, w, h){
   var r = this.create(d, 'IMG', u);
   if(u){
      r.src = RResource.imagePath(u);
   }
   if(w){
      r.style.width = w;
   }
   if(h){
      r.style.height = h;
   }
   return r;
}
function RBuilder_createText(d, s, v){
   var r = this.create(d, 'SPAN', s);
   r.innerHTML = v;
   return r;
}
function RBuilder_createCheck(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'checkbox';
   return r;
}
function RBuilder_createRadio(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'radio';
   return r;
}
function RBuilder_createEdit(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'text';
   return r;
}
function RBuilder_createSpan(d, s){
   return this.create(d, 'SPAN', s);
}
function RBuilder_createDiv(d, s){
   return this.create(d, 'DIV', s);
}
function RBuilder_createTable(d, s, b, cs, cp){
   var h = this.create(d, 'TABLE', s);
   h.border = RInteger.nvl(b);
   h.cellSpacing = RInteger.nvl(cs);
   h.cellPadding = RInteger.nvl(cp);
   return h;
}
function RBuilder_createFragment(d){
   return d.createDocumentFragment();
}
function RBuilder_append(p, t, s){
   var r = RBuilder.create(p.ownerDocument, t, s);
   if(p){
      p.appendChild(r);
   }else{
      this.hDocument.body.appendChild(r);
   }
   return r;
}
function RBuilder_appendIcon(p, s, u, w, h){
   var r = this.createIcon(p.ownerDocument, s, u, w, h);
   p.appendChild(r);
   return r;
}
function RBuilder_appendImage(p, s, u, w, h){
   var r = this.createImage(p.ownerDocument, s, u, w, h);
   p.appendChild(r);
   return r;
}
function RBuilder_appendEmpty(p, w, h){
   var r = this.createIcon(p.ownerDocument, 'n', null, w, h);
   p.appendChild(r);
   return r;
}
function RBuilder_appendText(p, s, v){
   var r = this.createText(p.ownerDocument, s, v);
   p.appendChild(r);
   return r;
}
function RBuilder_appendCheck(p, s){
   var r = this.createCheck(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendRadio(p, s){
   var r = this.createRadio(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendEdit(p, s){
   var r = this.createEdit(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendSpan(p, s){
   var r = this.createSpan(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendDiv(p, s){
   var r = this.createDiv(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendTable(p, s, b, cs, cp){
   var r = this.createTable(p.ownerDocument, s, b, cs, cp);
   if(p){
      p.appendChild(r);
   }else{
      this.hDocument.body.appendChild(r);
   }
   return r;
}
function RBuilder_appendTableRow(p, s, i, h){
   var r = null;
   if(i == null){
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         r = p.insertRow();
      }else{
         r = p.insertRow(-1);
      }
   }else{
      r = p.insertRow(i);
   }
   if(s){
      r.className = s;
   }
   if(h){
      r.height = h;
   }
   return r;
}
function RBuilder_appendTableCell(p, s, i, w){
   var r = null;
   if(i == null){
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         r = p.insertCell();
      }else{
         r = p.insertCell(-1);
      }
   }else{
      r = p.insertCell(i);
   }
   if(s){
      r.className = s;
   }
   if(w){
      r.width = w;
   }
   return r;
}
var RDump = new function RDump(){
   var o = this;
   o.LINE_SINGLE = '------------------------------';
   o.LINE_DOUBLE = '==============================';
   o.LINE_DOT    = '..............................';
   o.LINE_STAR   = '******************************';
   o.onclick     = RDump_onclick;
   o.nameInfo    = RDump_nameInfo;
   o.typeInfo    = RDump_typeInfo;
   o.dumpInner   = RDump_dumpInner;
   o.dump        = RDump_dump;
   o.appendLevel = RDump_appendLevel;
   o.stack       = RDump_stack;
   return o;
}
function RDump_onclick(){
   var o = this;
   var d = o.link;
   if(o.link){
      if(d.loaded){
         d.show(!d.display);
      }else{
         RDump.dumpInner(o.link);
         d.loaded = true;
         d.show(true);
      }
   }
}
function RDump_nameInfo(v){
   var t = RClass.typeOf(v);
   switch(t){
      case 'Unknown':
         return '@unknown';
      case 'Function':
         return RMethod.name(v) + '@Function';
      case 'Array':
         return '@<Array>';
   }
   return v;
}
function RDump_typeInfo(v, t){
   if(v == null){
      return 'null';
   }
   switch(t){
      case 'Unknown':
         return 'unknown';
      case 'Undefined':
         return 'undefined';
      case 'Boolean':
      case 'Number':
         return v.toString();
      case 'String':
         return v.length + ':\'' + RString.toLine(v) + '\'';
      case 'Function':
         if(v.__virtual){
            return 'virtual';
         }
         return RMethod.name(v, true);
      case 'Array':
         return '@<Array@' + RClass.code(v) + '> length=' + v.length;
      case 'Html':
         return '@<' + v.tagName + '>';
      default:
         if(v.constructor == TClass){
            return '@<' + v.name + '@' + RClass.code(v) + '>';
         }
         if(v.constructor == Function){
            return "@" + v.toString();
         }
         try{
            for(var name in v){
               return '@<Object@' + RClass.code(v) + '>';
            }
         }catch(e){}
         return '<Object@' + RClass.code(v) + '>';
   }
   return v;
}
function RDump_dumpInner(di){
   var hTable  = di.hTable;
   var hParent = di.hParent;
   var hInsRow = di.hRow;
   var level   = di.level;
   var obj     = di.link;
   var type    = RClass.typeOf(obj, true);
   var vcls    = obj.__class;
   var names = new Array();
   for(var name in obj){
      names[names.length] = name;
   }
   if(RString.endsWith(type, 'Array')){
      RArray.reverse(names, 0, names.length - 1);
   }else{
      RArray.sort(names, true);
   }
   var items = new Array();
   var c = names.length;
   if(c > 200){
      c = 200;
   }
   for(var n = 0; n < c; n++){
      var name = names[n];
      var value = obj[name];
      var stype = RClass.safeTypeOf(value, true);
      var type = RClass.safeTypeOf(value, true);
      var info = null;
      var infoFormat = true;
      if(vcls){
         var ann = vcls.attributeFind(name);
         if(ann){
            type = 'Annotation<' + RMethod.name(ann.constructor) + '>'
            if(value && value.constructor == Function){
               info = "<FONT color='green'>" + RMethod.name(value) + "</FONT>";
            }else{
               info = value + "<FONT color='green'> - (" + RHtml.toHtml(ann.toString()) + ")</FONT>";
            }
            infoFormat = false;
         }
      }
      if(info == null){
         info = this.typeInfo(value, type);
      }
      var rdi = null;
      var index = hInsRow ? hInsRow.rowIndex + 1 : 0;
      var hRow = RBuilder.appendTableRow(hTable, null, index);
      hRow.bgColor = '#FFFFFF';
      if(RString.startsWith(info, '@')){
         hRow.style.cursor = 'pointer';
         hRow.onclick = this.onclick;
         hRow.bgColor = '#FFF0E0';
         rdi = hRow.link = di.create();
         rdi.link = value;
         rdi.level = level;
         rdi.caption = name;
         rdi.hTable = hTable;
         rdi.level = level + 1;
         rdi.hRow = hRow;
      }else{
         di.push(hRow);
      }
      if((type == 'Function') && (info == 'virtual')){
         hRow.bgColor = '#E0F0FF';
      }
      var hCell = RBuilder.appendTableCell(hRow);
      var icon = RString.startsWith(info, '@') ? ' +' : '  ';
      var label = RString.repeat('   ', level) + icon + ' ' + name
      hCell.innerHTML = RHtml.toHtml(label);
      hCell.style.borderBottom = '1px solid #F0F0F0';
      hCell.width = '240px'
      if(rdi){
         rdi.hText = hCell;
      }
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.innerHTML = RHtml.toHtml(type);
      hCell.style.borderBottom = '1px solid #F0F0F0';
      if(type == 'Function'){
         hCell.style.color = '#3333FF';
      }else{
         hCell.style.color = '#FF3333';
      }
      hCell.width = '200px'
      var hCell = RBuilder.appendTableCell(hRow);
      if(RString.startsWith(info, '@')){
         info = info.substr(1);
      }
      if(infoFormat){
         hCell.innerHTML = RHtml.toHtml(info);
      }else{
         hCell.innerHTML = info;
      }
      hCell.style.borderBottom = '1px solid #F0F0F0';
   }
   hTable.width = '100%'
}
function RDump_dump(v, h){
   if(!h){
      h = RBuilder.append(null, 'DIV')
   }
   var s = new TString();
   s.append('<', RClass.safeTypeOf(v));
   if(v && v.tagName){
      s.append(' - ', v.tagName);
   }
   s.appendLine('@' + RClass.code(v) + '>');
   var hPanel = RBuilder.append(h, 'DIV');
   hPanel.style.border = '1px solid #BBBBBB';
   hPanel.style.backgroundColor = '#E0E0EB';
   var hTitleTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
   var hRow = RBuilder.appendTableRow(hTitleTable);
   var hCell = RBuilder.appendTableCell(hRow);
   hTitleTable.width = '100%'
   hCell.style.padding = 2;
   hCell.style.borderBottom = '1px solid gray';
   hCell.style.backgroundColor = '#E0E0EB';
   RHtml.textSet(hCell, s.toString());
   var hTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
   hTable.style.width = '100%';
   var di = new TDumpItem();
   di.hTable = hTable;
   di.hRow = null;
   di.hParent = h;
   di.link = v;
   di.level = 0;
   this.dumpInner(di);
}
function RDump_appendLevel(r, l){
   for(var n = 0; n < l; n++){
      r.append('   ');
   }
}
function RDump_stack(){
   var o = RDump_stack.caller;
   var s = new TString();
   while(o){
      s.append(RMethod.name(o));
      o = o.caller;
      if(o){
         s.appendLine();
      }
   }
   RLogger.debug(this, s);
}
var REngine = new function REngine(){
   var o = this;
   o._spaces    = new Object();
   o.Global     = new Object();
   o.Top        = new Object();
   o.Local      = new Object();
   o.onRelease  = REngine_onRelease;
   o.register   = REngine_register;
   o.initialize = REngine_initialize;
   o.connect    = REngine_connect;
   o.buildSpace = REngine_buildSpace;
   o.find       = REngine_find;
   o.findGlobal = REngine_findGlobal;
   o.findTop    = REngine_findTop;
   o.findLocal  = REngine_findLocal;
   return o;
}
function REngine_onRelease(){
   RConsole.release();
   REvent.release();
   CollectGarbage();
}
function REngine_register(s){
   var o = this;
   var p = o._spaces[s.space];
   if(!p){
      p = o._spaces[s.space] = new Object();
   }
   p[s.name] = s;
}
function REngine_initialize(){
   var o = this;
   RConsole.initialize();
}
function REngine_connect(){
   var o = this;
   RConsole.initialize();
}
function REngine_buildSpace(t, p){
   var o = this;
   for(var n in p){
      if(RString.startsWith(n, 'R')){
         t[n.substring(1)] = p[n].instance;
      }
   }
}
function REngine_find(s, n){
   var r = null;
   var s = this._spaces[s];
   if(s){
      r = s[n];
      if(r){
         return r.instance;
      }
   }
   return null;
}
function REngine_findGlobal(n){
   return this.find(ESpace.Global, n);
}
function REngine_findTop(n){
   return top.REngine.find(ESpace.Top, n);
}
function REngine_findLocal(n){
   return this.find(ESpace.Local, n);
}
var RHtml = new function RHtml(){
   var o = this;
   o._links          = new Object();
   o.displayGet     = RHtml_displayGet;
   o.displaySet     = RHtml_displaySet;
   o.visibleGet     = RHtml_visibleGet;
   o.visibleSet     = RHtml_visibleSet;
   o.textGet        = RHtml_textGet;
   o.textSet        = RHtml_textSet;
   o.checkGet       = RHtml_checkGet;
   o.checkSet       = RHtml_checkSet;
   o.radioGet       = RHtml_radioGet;
   o.radioSet       = RHtml_radioSet;
   o.linkGet        = RHtml_linkGet;
   o.linkSet        = RHtml_linkSet;
   o.toText         = RHtml_toText;
   o.toHtml         = RHtml_toHtml;
   o.offsetPosition = RHtml_offsetPosition;
   o.offsetX        = RHtml_offsetX;
   o.offsetY        = RHtml_offsetY;
   o.scrollWidth    = RHtml_scrollWidth;
   o.scrollHeight   = RHtml_scrollHeight;
   o.radioSet       = RHtml_radioSet;
   o.point          = RHtml_point;
   o.toPoint        = RHtml_toPoint;
   o.rect           = RHtml_rect;
   o.toRect         = RHtml_toRect;
   o.top            = RHtml_top;
   o.clientRect     = RHtml_clientRect;
   o.offsetRect     = RHtml_offsetRect;
   o.changeWidth    = RHtml_changeWidth;
   o.clear          = RHtml_clear;
   o.setRect        = RHtml_setRect;
   o.setBounds      = RHtml_setBounds;
   o.setPixelRect   = RHtml_setPixelRect;
   o.setPixelBounds = RHtml_setPixelBounds;
   o.showNodes      = RHtml_showNodes;
   o.hideNodes      = RHtml_hideNodes;
   o.showChildren   = RHtml_showChildren;
   o.hideChildren   = RHtml_hideChildren;
   o.get            = RHtml_get;
   o.parent         = RHtml_parent;
   o.posParent      = RHtml_posParent;
   o.form           = RHtml_form;
   o.popup          = RHtml_popup;
   o.bodyWidth      = RHtml_bodyWidth;
   o.bodyHeight     = RHtml_bodyHeight;
   o.frameHeight    = RHtml_frameHeight;
   o.selectText     = RHtml_selectText;
   o.currentStyle   = RHtml_currentStyle;
   o.tableMoveRow   = RHtml_tableMoveRow;
   o.clone          = RHtml_clone;
   return o;
}
function RHtml_displayGet(h){
   var r = null;
   var s = h.style.display;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      r = (s == 'inline');
   }else{
      r = (s != 'none');
   }
   return r;
}
function RHtml_displaySet(h, v){
   var s = null;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      s = v ? 'inline' : 'none';
   }else{
      s = v ? null : 'none';
   }
   h.style.display = s;
}
function RHtml_visibleGet(h){
   var r = null;
   var s = h.style.display;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      r = (s == 'block');
   }else{
      r = (s != 'none');
   }
   return r;
}
function RHtml_visibleSet(h, v){
   var s = null;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      s = v ? 'block' : 'none';
   }else{
      s = v ? null : 'none';
   }
   h.style.display = s;
}
function RHtml_textGet(h, v){
   var r = null;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      r = h.textContent;
   }else{
      r = h.innerText;
   }
   return r;
}
function RHtml_textSet(h, v){
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      h.textContent = v;
   }else{
      h.innerText = v;
   }
}
function RHtml_checkGet(h){
   return RBool.toString(h.checked);
}
function RHtml_checkSet(h, v){
   h.checked = RBool.isTrue(v);
}
function RHtml_radioGet(hs){
   if(hs){
      var c = hs.length;
      for(var n = 0; n < c; n++){
         var h = hs[n];
         if(h.checked){
            return h.value;
         }
      }
   }
   return null;
}
function RHtml_radioSet(hs, v){
   if(hs){
      var c = hs.length;
      for(var n=0; n < c; n++){
         var h = hs[n];
         if(h.value == v){
            h.checked = true;
            break;
         }
      }
   }
}
function RHtml_linkGet(h, n){
   var u = RRuntime.uid(h);
   var i = this._links[u];
   return i ? i.get(n) : null;
}
function RHtml_linkSet(h, n, v){
   var ls = this._links;
   var u = RRuntime.uid(h);
   var i = ls[u];
   if(!i){
      i = ls[u] = new THtmlItem();
      i._link = h;
   }
   i.set(n, v);
}
function RHtml_toText(p){
   if(p != null){
      p = p.toString();
      p = p.replace(/&lt;/, '<');
      p = p.replace(/&gt;/g, '>');
      p = p.replace(/&nbsp;/g, ' ');
      p = p.replace(/<BR>/g, '\n');
   }
   return p;
}
function RHtml_toHtml(p){
   if(p != null){
      p = p.toString();
      p = p.replace(/</g, '&lt;');
      p = p.replace(/>/g, '&gt;');
      p = p.replace(/ /g, '&nbsp;');
      p = p.replace(/\n/g, '<BR>');
      p = p.replace(/\\n/g, '<BR>');
      p = p.replace(/\r/g, '');
      p = p.replace(/\\r/g, '');
   }
   return p;
}
function RHtml_clone(o, s, t){
   if(!t){
      t = s.cloneNode(true);
   }
   if(s._pname){
      o[s._pname] = t;
   }
   if(s._ptyName){
	  o[s._ptyName] = t;
   }
   var e = REvent.find(s).events;
   t._psource = s;
   for(var n in e){
      t[e[n].handle] = s[e[n].handle];
      if(t[e[n].handle]){
          RHtml.link(t, '_plink', o);
      }
   }
   var p = s.children;
   var n = p.length;
   while(--n >= 0){
      RHtml_clone(o, p[n], t.children[n]);
   }
   return t;
}
function RHtml_offsetPosition(h, t){
   var p = new TPoint();
   while(h != t){
      p.x += h.offsetLeft - h.scrollLeft;
      p.y += h.offsetTop - h.scrollTop;
      if('absolute' != RHtml.currentStyle(h).position){
      }
      p.x += h.clientLeft;
      p.y += h.clientTop;
      h = h.offsetParent;
   }
   return p;
}
function RHtml_offsetX(h){
   var x = 0;
   while(h){
      x += h.offsetLeft;
      h = h.offsetParent;
   }
   return x;
}
function RHtml_offsetY(h){
   var y = 0;
   while(h){
      y += h.offsetTop;
      h = h.offsetParent;
   }
   return y;
}
function RHtml_bodyWidth(doc){
   return doc.all ? doc.body.scrollWidth : doc.documentElement.scrollWidth;
}
function RHtml_bodyHeight(doc){
   return doc.all ? doc.body.scrollHeight : doc.documentElement.scrollHeight;
}
function RHtml_frameHeight(f){
   var hd = f.contentWindow.document;
   var oh = hd.body.scrollHeight;
   var sh = hd.documentElement.scrollHeight;
   return Math.max(oh, sh);
}
function RHtml_scrollWidth(h){
   var r = 0;
   if(h.offsetWidth){
      r += h.offsetWidth;
   }
   if(h.borderTopWidth){
      r -= parseInt(h.borderLeftWidth);
   }
   if(h.borderBottomWidth){
      r -= parseInt(h.borderRightWidth);
   }
   if(h.clientWidth){
      r -= h.clientWidth;
   }
   return r;
}
function RHtml_scrollHeight(h){
   var r = 0;
   if(h.offsetHeight){
      r += h.offsetHeight;
   }
   if(h.borderTopWidth){
      r -= parseInt(h.borderTopWidth);
   }
   if(h.borderBottomWidth){
      r -= parseInt(h.borderBottomWidth);
   }
   if(h.clientHeight){
      r -= h.clientHeight;
   }
   return r;
}
function RHtml_currentStyle(p){
   if(p.currentStyle){
      return p.currentStyle;
   }
   return window.getComputedStyle(p, null);
}
function RHtml_point(o, p){
   return this.toPoint(new TPoint(), o, p);
}
function RHtml_toPoint(r, o, p){
   if(r && o){
      p = RObject.nvl(p, window.document.body);
      var cs = RHtml.currentStyle(o);
      r.x = -RInt.parse(cs.borderLeftWidth);
      r.y = -RInt.parse(cs.borderTopWidth);
      while(o && o != p){
         r.x += o.offsetLeft - o.scrollLeft;
         r.y += o.offsetTop - o.scrollTop;
         if('absolute' != RHtml.currentStyle(o).position){
            r.x += o.clientLeft;
            r.y += o.clientTop;
         }
         o = o.offsetParent;
      }
   }
   return r;
}
function RHtml_rect(o, p){
   return this.toRect(new TRect(), o, p);
}
function RHtml_toRect(r, o, p){
   if(r && o){
      p = RObject.nvl(p, window.document.body);
      var cs = RHtml.currentStyle(o);
      r.left = -RInt.parse(cs.borderLeftWidth);
      r.top = -RInt.parse(cs.borderTopWidth);
      var w = o.offsetWidth; w = o.offsetWidth-1;
      var h = o.offsetHeight; h = o.offsetHeight-1;
      while(o && o != p){
         r.left += o.offsetLeft - o.scrollLeft;
         r.top += o.offsetTop - o.scrollTop;
         if('absolute' != RHtml.currentStyle(o).position){
            r.left += o.clientLeft;
            r.top += o.clientTop;
         }
         o = o.offsetParent;
      }
      r.right = r.left + w;
      r.bottom = r.top + h;
   }
   return r;
}
function RHtml_top(h){
   var r = 0;
   if(h){
      var cs = RHtml.currentStyle(o);
      r = -RInteger.parse(cs.borderTopWidth);
      while(h){
         r += h.offsetTop - h.scrollTop;
         if('absolute' != RHtml.currentStyle(o).position){
            r += h.clientTop;
         }
         h = h.offsetParent;
      }
   }
   return r;
}
function RHtml_clientRect(o){
   if(o){
      var x = 0;
      var y = 0;
      var w = o.offsetWidth-1;
      var h = o.offsetHeight-1;
      while(o){
         x += o.offsetLeft;
         y += o.offsetTop;
         o = o.offsetParent;
      }
      return new TRect(x, y, x+w, y+h);
   }
   return null;
}
function RHtml_offsetRect(o){
   if(o){
      var x = 0;
      var y = 0;
      var w = o.offsetWidth-1;
      var h = o.offsetHeight-1;
      while(o){
         x += o.offsetLeft + o.clientLeft;
         y += o.offsetTop + o.clientTop;
         o = o.offsetParent;
      }
      return new TRect(x, y, x+w, y+h);
   }
   return null;
}
function RHtml_clear(h){
   if(h){
      var cns = h.children;
      if(cns && cns.length){
         for(var n=cns.length-1; n>=0; n--){
            var cn = cns[n];
            if(cn.children && cn.children.length){
               this.clear(cn);
            }
            h.removeChild(cn);
         }
      }
   }
}
function RHtml_setRect(h, r){
   if(h && h.style){
      var s = h.style;
      s.left = r.left;
      s.top = r.top;
      s.width = r.width();
      s.height = r.height();
   }
}
function RHtml_setBounds(h, l, t, w, h){
   if(h && h.style){
      var s = o.style;
      if(null != l){
         s.left = l;
      }
      if(null != t){
         s.top = t;
      }
      if(null != w){
         s.width = w;
      }
      if(null != h){
         s.height = h;
      }
   }
}
function RHtml_setPixelRect(o, r){
   if(o && o.style){
      var s = o.style;
      s.pixelLeft = r.left;
      s.pixelTop = r.top;
      s.pixelWidth = r.width();
      s.pixelHeight = r.height();
   }
}
function RHtml_setPixelBounds(o, l, t, w, h){
   if(o && o.style){
      var s = o.style;
      if(null != l){
         s.pixelLeft = l;
      }
      if(null != t){
         s.pixelTop = t;
      }
      if(null != w){
         s.pixelWidth = w;
      }
      if(null != h){
         s.pixelHeight = h;
      }
   }
}
function RHtml_changeWidth(s, t){
   if(s && t){
      var ts = RHtml.currentStyle(t);
      var tw = parseInt(ts.paddingLeft) + parseInt(ts.paddingRight);
      t.style.pixelWidth = s.offsetWidth - tw;
   }
}
function RHtml_showNodes(h, o){
   if(h && h.childNodes){
      for(var n=0; n<h.childNodes.length; n++){
         var c = h.childNodes(n);
         if(c.tagName && c.style){
            c.style.display = 'block';
         }else if(c.nodeName == '#text'){
            c.nodeValue = o[n];
         }
      }
   }
}
function RHtml_hideNodes(h, o){
   if(h && h.childNodes){
      for(var n=0; n<h.childNodes.length; n++){
         var c = h.childNodes(n);
         if(c.tagName && c.style){
            c.style.display = 'none';
         }else if(c.nodeName == '#text'){
            o[n] = c.nodeValue;
            c.nodeValue = '';
         }
      }
   }
}
function RHtml_showChildren(h){
   if(h && h.children){
      for(var n=0; n<h.children.length; n++){
         var c = h.children(n);
         if(c.tagName && c.style){
            c.style.display = 'block';
         }
      }
   }
}
function RHtml_hideChildren(h){
   if(h && h.children){
      for(var n=0; n<h.children.length; n++){
         var c = h.children(n);
         if(c.tagName && c.style){
            c.style.display = 'none';
         }
      }
   }
}
function RHtml_get(name){
   return document.getElementById(name);
}
function RHtml_parent(o, t){
   if(o, t){
      t = t.toLowerCase();
      while(o){
         if(o.tagName.toLowerCase() == t){
            return o;
         }
         o = o.parentElement;
      }
   }
   return null;
}
function RHtml_posParent(h){
   while(h){
      if('visible' != h.currentStyle.overflow){
         return h;
      }
      h = h.offsetParent;
   }
   return null;
}
function RHtml_form(h){
   if(h){
      var f = this.parent(h, 'FORM');
      return f ? f : h.ownerDocument.forms[0];
   }
   return window.document.forms[0];
}
function RHtml_popup(u, w, h){
   var l = (screen.width - w)/2;
   var t = (screen.height - h)/2 - 20;
   var s = RString.format('left={0},top={1},width={2},height={3},toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,dependent=yes', l, t, w, h);
   window.open(u, '_blank', s);
}
function RHtml_selectText(){
   var ip = document.getElementById(id);
   ip.select();
   return document.selection.createRange().text;
}
function getTRNode(nowTR, sibling) {
   while(nowTR = nowTR[sibling]){
      if(nowTR.tagName == 'TR'){
         break;
      }
   }
   return nowTR;
}
function RHtml_tableMoveRow(ph, ps, pt){
   if(ph.tagName != 'TABLE'){
      return false;
   }
   if(ps == pt){
      return false;
   }
   if(ph.moveRow){
      ph.moveRow(ps, pt);
   }else{
      var hb = ph.getElementsByTagName('tbody')[0];
      var sr = hb.rows[ps];
      var tr = hb.rows[pt];
      if((sr == null) || (tr == null)){
         return false;
      }
      var nr = null;
      if(ps <= pt){
         nr = tr;
         while(nr = nr.nextSibling){
            if(nr.tagName == 'TR'){
               break;
            }
         }
      }
      if(nr == null){
         hb.insertBefore(sr, tr);
      }else{
         if(nr == null){
            hb.appendChild(sr);
         }else{
            hb.insertBefore(sr, nr);
         }
      }
   }
   return true;
}
var RLoader = new function RLoader(){
   var o = this;
   o._loading      = new TArray();
   o._loaded       = new TArray()
   o._waits        = new TArray()
   o._intervalId   = null;
   o.hWindow       = null;
   o.onInterval    = RLoader_onInterval;
   o.intervalStart = RLoader_intervalStart;
   o.intervalStop  = RLoader_intervalStop;
   o.loadJsFile    = RLoader_loadJsFile;
   o.loadJs        = RLoader_loadJs;
   o.loaded        = RLoader_loaded;
   o.wait          = RLoader_wait;
   o.waitJs        = RLoader_waitJs;
   o.dispose       = RLoader_dispose;
   return o;
}
function RLoader_dispose(){
   var o = this;
   o.intervalStop();
   o.hWindow = null;
}
function RLoader_onInterval(){
   var o = this;
   var ws = o._waits;
   var c = ws.length;
   for(var n=0; n<c; n++){
      var l = ws.get(n);
      if(l){
         if(l.check(o._loaded)){
            l.invoke.invoke();
            ws.set(n, null);
         }
      }
   }
   ws.compress();
   if(ws.isEmpty()){
      o.intervalStop();
   }
}
function RLoader_intervalStart(){
   var o = this;
   if(!o._intervalId){
      o.hWindow = window;
      o._intervalId = window.setInterval(function(){o.onInterval();}, 10);
   }
}
function RLoader_intervalStop(){
   var o = this;
   var w = o.hWindow;
   if(w && o._intervalId){
      w.clearInterval(o._intervalId);
      o.hWindow = null;
      o._intervalId = null;
   }
}
function RLoader_loadJsFile(id, src){
   var o = this;
   var d = RWindow.hDocument;
   var h = d.getElementsByTagName("head")[0];
   if(document.getElementById(id) == null){
      var url = top.RContext.location(src);
      var hs = RWindow.createElement('SCRIPT');
      hs.id = id;
      hs.type = 'text/javascript';
      hs.src = url;
      if(d.attachEvent){
         hs.onreadystatechange = function(){
            var s = hs.readyState;
            if('loaded' == s || 'complete' == s){
               hs.onreadystatechange = null;
               o._loading.extract(id);
               o._loaded.push(id);
            }
         }
      }else{
         hs.onload = function(){
            if(d.readyState == 'complete'){
               hs.onload = null;
               o._loading.extract(id);
               o._loaded.push(id);
            }
         }
      }
      h.appendChild(hs);
   }
}
function RLoader_loadJs(ps){
   var as = arguments;
   var c = as.length;
   for(var n = 0; n < c; n++){
      var p = as[n];
      this.loadJsFile('js:' + p, '/ajs/' + p.replace(/\./g, '/') + '.js');
   }
}
function RLoader_loaded(id){
   var o = this;
   o._loading.extract(id);
   o._loaded.push(id);
}
function RLoader_wait(invoke, ids){
   var o = this;
   var l = new TLoaderListener();
   l.invoke = invoke;
   var c = arguments.length;
   for(var n = 1; n < c; n++){
      l.ids.push(arguments[n]);
   }
   o._waits.push(l);
   o.intervalStart();
}
function RLoader_waitJs(invoke, ids){
   var o = this;
   var l = new TLoaderListener();
   l.invoke = invoke;
   var as = arguments;
   var c = as.length;
   for(var n = 1; n < c; n++){
      l.ids.push('js:' + as[n]);
   }
   o._waits.push(l);
   o.intervalStart();
}
var RMessage = new function(){
   var o = this;
   o.hasError      = false;
   o.messages      = null;
   o.push          = RMessage_push;
   o.fatal         = RMessage_fatal;
   o.confirmResult = false;
   o.error         = RMessage_error;
   o.warn          = RMessage_warn;
   o.onWindowClose = RMessage_onWindowClose;
   o.confirm       = RMessage_confirm;
   o.info          = RMessage_info;
   return o;
}
function RMessage_push(msg){
   if(!this.messages){
      this.messages = new FLoopList();
   }
   this.messages.push(msg);
}
function RMessage_fatal(sf, er, ms, pm){
   var o = this;
   if(o.hasError){
      return;
   }
   o.hasError = true;
   var s = new TString();
   var t = new Array();
   var f = RMessage_fatal.caller;
   while(f){
      if(RArray.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + RMethod.name(f));
   }
   var m = new TString();
   m.appendLine(RContext.get('RMessage:fatal'));
   m.appendLine(RString.repeat('-', 60));
   m.append(RClass.dump(sf), ': ');
   if(ms){
      var ag = arguments;
      c = ag.length;
      for(var n = 3; n < c; n++){
         var p = ag[n];
         if('function' == typeof(p)){
            p = RMethod.name(p);
         }
         var pi = n - 2;
         ms = ms.replace('{' + pi + '}', p);
      }
   }
   m.appendLine(ms);
   m.appendLine(RString.repeat('-', 60));
   m.appendLine('Stack:');
   m.append(s);
   alert(m);
}
function RMessage_error(self, method, msg, params){
   if(this.hasError){
      return;
   }
   this.hasError = true;
   throw new Error(msg);
}
function RMessage_warn(self, message, params){
   var s = new TString();
   var n = 0;
   var aw = top.RControl.create(FAlertWindow);
   aw.setText(message);
   aw.show();
}
function RMessage_info(self, message, params){
   var s = new TString();
   var n = 0;
   var aw = top.RControl.create(FInfoWindow);
   aw.setText(message);
   aw.show();
}
function RMessage_confirm(message,callback){
   var o = this;
   var ls = top.RControl.create(FConfirmWindow);
   ls.setText(message);
   ls.lsns.register(o, callback);
   ls.show();
}
function RMessage_onWindowClose(v){
   this.confirmResult = v;
}
var RResource = new function RResource(){
   var o = this;
   o.uriIcon     = '/ars/icon/';
   o.uriImage    = '/ars/img/';
   o.iconPath    = RResource_iconPath;
   o.iconUrlPath = RResource_iconUrlPath;
   o.imagePath   = RResource_imagePath;
   RMemory.register('RResource', o);
   return o;
}
function RResource_iconPath(path, type){
   var o = this;
   var rc = top.RContext;
   path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
   if(RString.startsWith(path, '#')){
      path = path.substr(1);
      return rc.context(rc.uriIcon + '/' + path);
   }
   return rc.context('/ars/icon/' + path);
}
function RResource_iconUrlPath(path, type){
   var o = this;
   var rc = top.RContext;
   path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
   if(RString.startsWith(path, '#')){
      path = path.substr(1);
      return 'url(' + rc.context(rc.uriIcon + '/' + path) + ')';
   }
   return 'url(' + rc.context('/ars/icon/' + path) + ')';
}
function RResource_imagePath(path, type){
   var o = this;
   var rc = top.RContext;
   path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
   if(RString.startsWith(path, '#')){
      path = path.substr(1);
      return rc.context(rc.uriImage + '/' + path);
   }
   return rc.context('/ars/img/' + path);
}
var RService = new function RService(){
   var o = this;
   o._services = new TDictionary();
   o.url       = RService_url;
   o.parse     = RService_parse;
   return o;
}
function RService_url(p){
   if(RString.startsWith(p, 'http://')){
      return p;
   }
   if(RString.startsWith(p, '#')){
      return p.substr(1);
   }
   if(!RString.startsWith(p, '/')){
      p = '/' + p;
   }
   return top.RContext.context(p + '.ws');
}
function RService_parse(p){
   var o = this;
   var s = null;
   var ss = o._services;
   if(p){
      s = ss.get(p);
      if(s == null){
         var ps = p.split('@');
         if(ps.length == 1){
            if(ps[0]){
               s = new SServiceInfo();
               s.service = ps[0];
               s.action = null;
               s.url = o.url(ps[0]);
            }
         }else if(ps.length == 2){
            if(ps[0] && ps[1]){
               s = new SServiceInfo();
               s.service = ps[1];
               s.action = ps[0];
               s.url = o.url(ps[1]);
            }
         }
      }
      if(s == null){
         throw new TError(o, 'Unknown service format. (source={1})', p);
      }
      ss.set(p, s);
   }
   return s;
}
var RStyle = new function RStyle(){
   var o = this;
   o.connected = false;
   o.rules     = new TMap();
   o.connect   = RStyle_connect;
   o.has       = RStyle_has;
   o.nvl       = RStyle_nvl;
   o.style     = RStyle_style;
   return o;
}
function RStyle_connect(){
   var o = this;
   if(o.connected){
      return;
   }
   var s = o.rules;
   var ds = document.styleSheets;
   var dc = ds.length;
   for(var n = 0; n < dc; n++){
      var rs = ds[n].cssRules;
      if(rs){
         var rc = rs.length;
         for(var i = 0; i < rc; i++){
            var r = rs[i];
            s.set(r.selectorText, r);
         }
      }
   }
   o.connected = true;
}
function RStyle_has(s){
   var o = this;
   if(!o.connected){
      o.connect();
   }
   if(s){
      return this.rules.contains('.' + s.toLowerCase());
   }
   return false;
}
function RStyle_nvl(s, n){
   var o = this;
   o.connect();
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      var s = a[n];
      if(s){
         if(o.rules.contains('.' + s.toLowerCase())){
            return s;
         }
      }
   }
   return null;
}
function RStyle_style(c, n){
   return RClass.name(c) + '_' + n;
}
var RTypeArray = new function RTypeArray(){
   var o = this;
   o._float3  = null;
   o._float4  = null;
   o._data    = new Object();
   o.float3      = RTypeArray_float3;
   o.float4      = RTypeArray_float4;
   o.createArray = RTypeArray_createArray;
   o.findTemp    = RTypeArray_findTemp;
   return o;
}
function RTypeArray_float3(){
   var o = this;
   var v = o._float3;
   if(v == null){
      v = o._float3 = new Float32Array(3);
   }
   return v;
}
function RTypeArray_float4(){
   var o = this;
   var v = o._float4;
   if(v == null){
      v = o._float4 = new Float32Array(4);
   }
   return v;
}
function RTypeArray_createArray(t, l){
   switch(t){
      case EDataType.Boolean:
      case EDataType.Int8:
         return new Int8Array(l);
      case EDataType.Int16:
         return new Int16Array(l);
      case EDataType.Int32:
         return new Int32Array(l);
      case EDataType.Int64:
         return new Int64Array(l);
      case EDataType.Uint8:
         return new Uint8Array(l);
      case EDataType.Uint16:
         return new Uint16Array(l);
      case EDataType.Uint32:
         return new Uint32Array(l);
      case EDataType.Float:
         return new Float32Array(l);
      case EDataType.Double:
         return new Float64Array(l);
   }
   throw new TError('Create unknown type array. (type={1}, length={2})', t, l);
}
function RTypeArray_findTemp(t, l){
   var o = this;
   var d = o._data;
   var s = d[t];
   if(s == null){
      s = d[t] = new Object();
   }
   var r = s[l];
   if(r == null){
      r = s[l] = o.createArray(t, l);
   }
   return r;
}
var RWindow = new function RWindow(){
   var o = this;
   o.__keyDownEvent    = new SKeyDownEvent();
   o._builder          = null;
   o._disableDeep      = 0;
   o.panels            = new TMap();
   o.inDisable         = false;
   o.inMoving          = false;
   o.inSizing          = false;
   o.hWindow           = null;
   o.hDocument         = null;
   o.hBody             = null;
   o.hContainer        = null;
   o.hDisablePanel     = null;
   o.hShadow           = null;
   o.lsnsLoad          = new TListeners();
   o.lsnsUnload        = new TListeners();
   o.lsnsMouseDown     = new TListeners();
   o.lsnsMouseUp       = new TListeners();
   o.lsnsMouseOver     = new TListeners();
   o.lsnsMouseMove     = new TListeners();
   o.lsnsMouseWheel    = new TListeners();
   o.lsnsKeyDown       = new TListeners();
   o.lsnsKeyUp         = new TListeners();
   o.lsnsKeyPress      = new TListeners();
   o.lsnsResize        = new TListeners();
   o.onUnload          = RWindow_onUnload;
   o.onResize          = RWindow_onResize;
   o.connect           = RWindow_connect;
   o.createElement     = RWindow_createElement;
   o.createHttpRequest = RWindow_createHttpRequest;
   o.event             = RWindow_event;
   o.source            = RWindow_source;
   o.getElement        = RWindow_getElement;
   o.getDisablePanel   = RWindow_getDisablePanel;
   o.findElement       = RWindow_findElement;
   o.panel             = RWindow_panel;
   o.screenPos         = RWindow_screenPos;
   o.clientPos         = RWindow_clientPos;
   o.offsetPos         = RWindow_offsetPos;
   o.windowEnable      = RWindow_windowEnable;
   o.windowDisable     = RWindow_windowDisable;
   o.enable            = RWindow_enable;
   o.disable           = RWindow_disable;
   o.setCaption        = RWindow_setCaption;
   o.setEnable         = RWindow_setEnable;
   o.showShadow        = RWindow_showShadow;
   o.moveCenter        = RWindow_moveCenter;
   o.appendControl     = RWindow_appendControl;
   o.appendElement     = RWindow_appendElement;
   o.appendContainer   = RWindow_appendContainer;
   o.containerTop      = RWindow_containerTop;
   o.dispose           = RWindow_dispose;
   return o;
}
function RWindow_onUnload(){
   RMemory.release();
}
function RWindow_onResize(){
   var o = this;
   var h = o.hDisablePanel;
   if(h){
      if('block' == h.style.display){
         var s = h.style;
         var hd = o.hDocument;
         s.pixelLeft = 0;
         s.pixelTop = 0
         s.pixelWidth = hd.all ? o.hBody.scrollWidth : hd.documentElement.scrollWidth;
         s.pixelHeight = hd.all ? o.hBody.scrollHeight : hd.documentElement.scrollHeight;
      }
   }
}
function RWindow_connect(w){
   var o = this;
   o.hWindow = w;
   var hd = o.hDocument = w.document;
   var hb = o.hBody = o.hContainer = hd.body;
   o.processUnload = hb.onunload;
   hb.onunload = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsUnload.process(e);
      o.onUnload();
   };
   hb.onmousedown = function(e){
      if(!e){
         e = w.event;
      }
      RLogger.info(o, 'Window mouse down. (location={1},{2})', e.x, e.y);
      o.lsnsMouseDown.process(e);
   };
   hb.onmouseup = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsMouseUp.process(e);
   };
   hb.onmousemove = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsMouseMove.process(e);
   };
   hb.onmouseover = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsMouseOver.process(e);
   };
   hb.onmousewheel = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsMouseWheel.process(e);
   };
   hb.onkeydown = function(e){
      if(!e){
         e = w.event;
      }
      RLogger.debug(o, 'Window key down. (key_code={1})', e.keyCode);
      var s = e.srcElement ? e.srcElement : e.target;
      var t = s.tagName;
      if(EKeyCode.BackSpace == e.keyCode){
         if('INPUT' == t){
            if(s.readOnly || 'checkbox' == s.type){
               return RKey.eventClear(e);
            }
         }else if('TEXTAREA' == t){
            if(s.readOnly){
               return RKey.eventClear(e);
            }
         }else{
            return RKey.eventClear(e);
         }
      }
      o.__keyDownEvent.attach(e);
      o.lsnsKeyDown.process(o.__keyDownEvent);
      if(EKeyCode.Enter == e.keyCode){
         if('INPUT' == t){
            if(REvent.process(s, e)){
               RKey.eventClear(e);
            }
         }
      }
   };
   hb.onkeyup = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsKeyUp.process(e);
   };
   hb.onkeypress = function(e){
      if(!e){
         e = w.event;
      }
      RLogger.debug(o, 'Window key press. (key_code={1})', e.keyCode);
      o.lsnsKeyPress.process(e);
   };
   hb.onresize = function(e){
      if(!e){
         e = w.event;
      }
      if(o.oldBodyWidth == o.hBody.offsetWidth && o.oldBodyHeight == o.hBody.offsetHeight){
         return;
      }
      o.oldBodyWidth = o.hBody.offsetWidth;
      o.oldBodyHeight = o.hBody.offsetHeight;
      o.onResize();
      o.lsnsResize.process(e);
   };
}
function RWindow_createElement(n){
   return this.hDocument.createElement(n);
}
function RWindow_createHttpRequest(){
   if(this.hWindow.XMLHttpRequest){
      return new XMLHttpRequest();
   }else if(this.hWindow.ActiveXObject){
      return new ActiveXObject("MsXml2.XmlHttp");
   }
}
function RWindow_event(){
   return this.hWindow.event;
}
function RWindow_source(h){
   return h ? h.ownerDocument.parentWindow.event.srcElement : this.hWindow.event.srcElement;
}
function RWindow_getElement(n){
   var o = this;
   var e = o.hDocument.getElementById(n);
   if(!e){
      RMessage.fatal(o, null, "Can't get html element. (name={0})", n);
   }
   return e;
}
function RWindow_getDisablePanel(f){
   var o = this;
   var h = o.hDisablePanel;
   if(!h){
      var h = o.hDisablePanel = o.builder().newDiv();
      h.style.backgroundColor = "#CCCCCC";
      h.style.position = 'absolute';
      h.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=60)";
      o.hBody.appendChild(h);
      h.style.zIndex = 8000;
      h.style.display = 'none';
   }
   var hImg = o.hImg;
   if(!hImg){
      hImg = o.hImg = o.builder().appendImage(h);
      hImg.src = top.RContext.context('/ats/00/rs/icon/ctl/RWindow_Loading.gif');
      hImg.style.margin = document.body.offsetHeight / 2;
      hImg.style.display = 'none';
   }
   if(f){
      hImg.style.display = 'none';
   }else{
      hImg.style.display = 'block';
   }
   return h;
}
function RWindow_findElement(n){
   return this.hDocument.getElementById(n);
}
function RWindow_panel(t){
   var o = this;
   if(EPanel.Disable == t){
      var h = o.hDisablePanel;
      if(!h){
         h = o.hDisablePanel = RBuilder.append(o.hBody, 'DIV', 'RWindow_Disable');
         var hi = RBuilder.append(h, 'IMG')
         hi.src = RRes.iconPath('#ctl.RWindow_Loading');
         hi.style.margin = document.body.offsetHeight / 2;
         h.style.zIndex = ELayer.Disable;
      }
      return h;
   }
}
function RWindow_screenPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.screenX;
      p.y = e.screenY;
      return p;
   }
   return new TPoint(e.screenX, e.screenY);
}
function RWindow_clientPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.clientX;
      p.y = e.clientY;
      return p;
   }
   return new TPoint(e.clientX, e.clientY);
}
function RWindow_offsetPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.offsetX;
      p.y = e.offsetY;
      return p;
   }
   return new TPoint(e.offsetX, e.offsetY);
}
function RWindow_windowDisable(){
   this.hWindow.document.body.disabled = true;
}
function RWindow_windowEnable(){
   this.hWindow.document.body.disabled = false;
}
function RWindow_enable(){
   var o = this;
   o._disableDeep--;
   if(0 == o._disableDeep){
      o.setEnable(true);
   }
}
function RWindow_disable(){
   var o = this;
   if(0 == o._disableDeep){
      o.setEnable(false);
   }
   o._disableDeep++;
}
function RWindow_setCaption(t){
   top.document.title = t;
}
function RWindow_setEnable(v, f){
   var o = this;
   var h = o.getDisablePanel(f);
   var st = h.style;
   if(!v){
      var s = o.hDisablePanel.style;
      s.pixelLeft = 0;
      s.pixelTop = 0
      s.pixelWidth = o.hDocument.all ? o.hBody.scrollWidth : o.hDocument.documentElement.scrollWidth;
      s.pixelHeight = o.hDocument.all ? o.hBody.scrollHeight : o.hDocument.documentElement.scrollHeight;
      s.display = 'block';
   }else{
      o.windowEnable();
      st.display = 'none';
   }
}
function RWindow_showShadow(v, r){
   var o = this;
   if(!o.hShadow){
      o.hShadow = RBuilder.append(o.hBody, 'DIV', 'RWindow_Shadow');
      o.hShadow.style.zIndex = ELayer.Shadow;
   }
   var st = o.hShadow.style;
   if(v == false){
      st.display = 'none';
   }else{
      st.display = 'block';
      st.pixelLeft = r.left+3;
      st.pixelTop = r.top+3;
      st.pixelWidth = r.width();
      st.pixelHeight = r.height();
   }
}
function RWindow_moveCenter(h){
   var o = this;
   if(h){
      h.style.pixelLeft = Math.max(parseInt((o.hBody.offsetWidth - h.offsetWidth)/2), 0);
      h.style.pixelTop = Math.max(parseInt((o.hBody.offsetHeight - h.offsetHeight)/2), 0) + o.hBody.scrollTop;
   }
}
function RWindow_appendControl(ctl){
   this.hBody.appendChild(ctl.hPanel);
}
function RWindow_appendElement(h){
   this.hBody.appendChild(h);
}
function RWindow_appendContainer(h){
   this.hContainer.appendChild(h);
}
function RWindow_containerTop(h){
   var o = this;
   var hc = o.hContainer;
   var r = RHtml.top(h) + h.offsetHeight;
   if('auto' == hc.currentStyle.overflow){
      r -= RHtml.top(hc);
   }
   return r - hc.scrollTop;
}
function RWindow_dispose(){
   var o = this;
   o.hBody.onload = null;
   o.hBody.onunload = null;
   o.hBody.onmousedown = null;
   o.hBody.onmouseup = null;
   o.hBody.onmousemove = null;
   o.hBody.onmouseover = null;
   o.hBody.onmousewheel = null;
   o.hBody.onkeydown = null;
   o.hBody.onkeyup = null;
   o.hBody.onkeypress = null;
   o.hBody.onresize = null;
   RMemory.freeHtml(o.hBody);
   o.panels.release();
   o.panels = null;
   o.hWindow = null;
   o.hDocument = null;
   o.hBody = null;
   o.hDisablePanel = null;
   o.hImg = null;
   o.hShadow = null;
}
var RXml = new function RXml(){
   var o = this;
   o.httpActiveX      = false;
   o.httpVendor       = null;
   o.domActiveX       = false;
   o.domVendor        = null;
   o.construct        = RXml_construct;
   o.isNode           = RXml_isNode;
   o.createConnection = RXml_createConnection;
   o.createDocument   = RXml_createDocument;
   o.formatText       = RXml_formatText;
   o.buildText        = RXml_buildText;
   o.buildNode        = RXml_buildNode;
   o.makeString       = RXml_makeString;
   o.makeNode         = RXml_makeNode;
   o.makeDocument     = RXml_makeDocument;
   o.unpack           = RXml_unpack;
   o.construct();
   return o;
}
function RXml_construct(){
   var o = this;
   var d = window.document;
   if(window.ActiveXObject && !window.XMLHttpRequest){
      var vs = ["MSXml2.XmlHTTP", "Microsoft.XmlHTTP", "MSXml.XmlHTTP", "MSXml3.XmlHTTP"];
      var c = vs.length;
      for(var n = 0; n < c; n++){
         var v = vs[n];
         try{
            r = new ActiveXObject(v);
            o.httpActiveX = true;
            o.httpVendor = v;
            break;
         }catch(e){
            m = e;
         }
      }
   }else if(window.XMLHttpRequest){
      try{
         var r = new XMLHttpRequest();
         o.httpActiveX = false;
      }catch(e){
         m = e;
      }
   }else{
      alert('Unknown http vendor.');
   }
   if(window.ActiveXObject || !window.DOMParser){
      var vs = ["MSXml2.DOMDocument", "Microsoft.XmlDOM", "MSXml.DOMDocument", "MSXml3.XmlDOM"];
      var c = vs.length;
      for(var n = 0; n < c; n++){
         var v = vs[n];
         try{
            var r = new ActiveXObject(v);
            o.domActiveX = true;
            o.domVendor = v;
            break;
         }catch(e){
            m = e;
         }
      }
   }else if(window.DOMParser && d && d.implementation && d.implementation.createDocument){
      try{
         var r = document.implementation.createDocument('', '', null);
         o.domActiveX = false;
      }catch(e){
         m = e;
      }
   }else{
      alert('Unknown dom vendor.');
   }
}
function RXml_isNode(n){
   return RClass.isName(n, 'TNode');
}
function RXml_createConnection(){
   var o = this;
   var r = null;
   if(o.httpActiveX){
      r = new ActiveXObject(o.httpVendor);
   }else{
      r = new XMLHttpRequest();
   }
   if(!r){
      alert('Create xml connection failure. (message=' + m + ')');
   }
   return r;
}
function RXml_createDocument(){
   var o = this;
   var r = null;
   if(o.domActiveX){
      r = new ActiveXObject(o.domVendor);
   }else{
      r = document.implementation.createDocument('', '', null);
   }
   if(!r){
      alert('Create xml document failure. (message=' + m + ')');
   }
   return r;
}
function RXml_formatText(s){
   if(s != null){
      s = s.replace(/\\n/g, '\n');
   }
   return s;
}
function RXml_buildText(s, v){
   if(v != null){
      v = v.toString();
      var c = v.length;
      for(var i = 0; i < c; i++){
         var ch = v.charAt(i);
         switch(ch){
            case '<':
               s.append('&lt;');
               break;
            case '>':
               s.append('&gt;');
               break;
            case '"':
               s.append('&quot;');
               break;
            case '&':
               s.append('&amp;');
               break;
            case '\r':
               continue;
            case '\n':
               s.append('\\n');
               break;
            default:
               s.append(ch);
         }
      }
   }
   return s;
}
function RXml_buildNode(pd, pn, pe){
   var xas = null;
   var eas = pe.attributes;
   if(eas){
      var eac = eas.length;
      if(eac > 0){
         xas = new TAttributes();
         for(var n = 0; n < eac; n++){
            var ea = eas[n];
            if(ea.nodeName){
               xas.set(ea.nodeName, RXml.formatText(ea.value));
            }
         }
      }
   }
   var xt = new TString();
   xt.append(pe.value);
   var ecs = pe.childNodes
   if(ecs){
      var ecc = ecs.length;
      for(var n = 0; n < ecc; n++){
         var en = ecs[n];
         var ect = en.nodeType;
         if(ect == ENodeType.Text){
            xt.append(en.nodeValue);
         }else if(ect == ENodeType.Data){
            xt.append(en.data);
         }
      }
   }
   var xc = pd.create(pe.nodeName, xas, RString.trim(xt.toString()));
   if(pn){
      pn.push(xc);
   }else{
      pd._root = xc;
   }
   if(ecs){
      var cc = ecs.length;
      for(var n = 0; n < cc; n++){
         if(ecs[n].nodeType == ENodeType.Node){
            this.buildNode(pd, xc, ecs[n]);
         }
      }
   }
}
function RXml_makeString(s){
   var o = this;
   var x = null;
   if(o.domActiveX){
      x = new ActiveXObject(o.domVendor);
      x.async = false;
      x.loadXML(s);
   }else{
      var p = new DOMParser();
      x = p.parseFromString(s, 'text/xml');
   }
   return x;
}
function RXml_makeNode(p){
   var o = this;
   if(p.documentElement){
      var d = new TXmlDocument();
      o.buildNode(d, null, p.documentElement);
      return d.root();
   }else if(p.tagName == 'SCRIPT'){
      var s = p.textContent;
      if(!s){
         s = p.text;
      }
      if(s){
         var d = new TXmlDocument();
         var xd = o.makeString(s)
         o.buildNode(d, null, xd.documentElement);
         return d.root();
      }
   }
   return null;
}
function RXml_makeDocument(p){
   var d = new TXmlDocument();
   if(p.documentElement){
      RXml.buildNode(d, null, p.documentElement);
   }
   return d;
}
function RXml_unpack(s, n){
   var o = this;
   if(RString.isEmpty(s)){
      return null;
   }
   if(!n){
      n = new TNode();
   }
   var np = new TAttributes();
   np.unpack(s);
   n.name = np.get('name');
   n.value = np.get('value');
   if(np.contains('attributes')){
      n.attributes().unpack(np.get('attributes'));
   }
   if(np.contains('nodes')){
      var ns = new TStrings();
      ns.unpack(np.get('nodes'));
      for(var i=0; i<ns.count; i++){
         o.unpack(ns.get(i), n.create());
      }
   }
   return n;
}
function SEvent(o){
   if(!o){o = this;}
   o.name    = null;
   o.hSource = null;
   return o;
}
function SKeyDownEvent(o){
   if(!o){o = this;}
   SEvent(o);
   o.shiftKey = false;
   o.ctrlKey  = false;
   o.keyCode  = 0;
   o.attach  = SKeyDownEvent_attach;
   return o;
}
function SKeyDownEvent_attach(e){
   var o = this;
   o.shiftKey = e.shiftKey;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}
function SServiceInfo(){
   var o = this;
   o.service = null;
   o.action  = null;
   o.url     = null;
   return o;
}
function TDumpItem(o){
   if(!o){o = this;}
   o.hParent      = null;
   o.hPanel       = null;
   o.hDocument    = null;
   o.hTable       = null;
   o.hText        = null;
   o.hRow         = null;
   o.link         = null;
   o.level        = 0;
   o.caption      = null;
   o.children     = new Array();
   o.items        = new Array();
   o.loaded       = false;
   o.innerDisplay = false;
   o.display      = false;
   o.create       = TDumpItem_create;
   o.push         = TDumpItem_push;
   o.innerShow    = TDumpItem_innerShow;
   o.show         = TDumpItem_show;
   return o;
}
function TDumpItem_create(){
   var o = this;
   var r = o.children[o.children.length] = new TDumpItem();
   return r;
}
function TDumpItem_push(v){
   var o = this;
   o.items[o.items.length] = v;
}
function TDumpItem_innerShow(v){
   var o = this;
   var c = o.items.length;
   for(var n = 0; n < c; n++){
      var tr = o.items[n];
      RHtml.visibleSet(tr, v);
   }
   var c = o.children.length;
   for(var n = 0; n < c; n++){
      var d = o.children[n];
      RHtml.visibleSet(d.hRow, v);
      if(v){
         d.show(d.innerDisplay);
      }else{
         d.innerDisplay = d.display;
         d.show(false);
      }
   }
}
function TDumpItem_show(v){
   var o = this;
   o.display = v;
   var label = RString.repeat('   ', o.level-1) + (v ? ' -' : ' +') + ' ' + o.caption;
   o.hText.innerHTML = RHtml.toHtml(label);;
   o.innerShow(v);
}
function THtmlItem(o){
   if(!o){o = this;}
   o._link  = null;
   o._links = new Object();
   o.get    = THtmlItem_get;
   o.set    = THtmlItem_set;
   return o;
}
function THtmlItem_get(n){
   return this._links[n];
}
function THtmlItem_set(n, v){
   this._links[n] = v;
}
function TXmlDocument(o){
   if(!o){o = this;}
   o._root   = null;
   o.create  = TXmlDocument_create;
   o.root    = TXmlDocument_root;
   o.setRoot = TXmlDocument_setRoot;
   o.xml     = TXmlDocument_xml;
   o.dump    = TXmlDocument_dump;
   return o;
}
function TXmlDocument_create(n, a, v){
   var r = new TXmlNode();
   r._name = n;
   r._attributes = a;
   r._value = v;
   return r;
}
function TXmlDocument_root(){
   var o = this;
   var r = o._root;
   if(!r){
      r = o._root = new TXmlNode('Configuration');
   }
   return r;
}
function TXmlDocument_setRoot(p){
   var o = this;
   if(!o._root){
      o._root = p;
   }else{
      throw new TError(o, 'Root node is already exists.');
   }
}
function TXmlDocument_xml(){
   var s = new TString();
   s.append("<?xml version='1.0' encoding='UTF-8'?>");
   this.root().xml(s);
   return s.toString();
}
function TXmlDocument_dump(){
   var o = this;
   var r = new TString();
   r.appendLine(RClass.name(o));
   o.root().innerDump(r);
   return r.toString();
}
function TXmlNode(){
   var o = this;
   TNode(o);
   o.create   = TXmlNode_create;
   o.innerXml = TXmlNode_innerXml;
   o.xml      = TXmlNode_xml;
   o.toString = TXmlNode_toString;
   return o;
}
function TXmlNode_create(n, a){
   var r = new TNode();
   r._name = n;
   r._attributes = a;
   if(!RClass.isClass(attrs, TAttributes)){
      var a = arguments;
      var len = a.length;
      for(var n = 1; n < len; n += 2){
         if(n + 1 < len){
            r.set(a[n], a[n+1]);
         }else{
            r._value = a[n];
         }
      }
   }
   this.push(r);
   return r;
}
function TXmlNode_innerXml(s, l){
   var o = this;
   s.appendRepeat('   ', l);
   s.append('<', o._name);
   var as = o._attributes;
   if(as){
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         s.append(' ', as.name(n), '="');
         RXml.buildText(s, as.value(n));
         s.append('"');
      }
   }
   if(!o._nodes && (o._value == null)){
      s.append('/');
   }
   s.append('>\n');
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var n = 0; n < c; n++){
         ns.get(n).innerXml(s, l + 1);
      }
   }
   RXml.buildText(s, o._value)
   if(o._nodes || o._value != null){
      s.appendRepeat('   ', l);
      s.append('</', o._name, '>');
      s.append('\n');
   }
   return s;
}
function TXmlNode_xml(s){
   var s = new TString();
   this.innerXml(s, 0);
   return s.toString();
}
function TXmlNode_toString(){
   return this.xml().toString();
}
function FTag(o){
   o = RClass.inherits(this, o, FObject);
   o._name      = 'Tag';
   o._children  = null;
   o._trimLeft  = false;
   o._trimRight = false;
   o.onBegin    = FTag_onBegin;
   o.onEnd      = FTag_onEnd;
   o.name       = FTag_name;
   o.set        = FTag_set;
   o.push       = FTag_push;
   o.parse      = FTag_parse;
   o.toString   = FTag_toString;
   o.innerDump  = FTag_innerDump;
   o.dump       = FTag_dump;
   return o;
}
function FTag_onBegin(p){
   return EResult.Continue;
}
function FTag_onEnd(p){
   return EResult.Continue;
}
function FTag_name(){
   return this._name;
}
function FTag_set(n, v){
   throw new TError(this, 'Unknown attribute name. (name={1}, value={2})', n, v);
}
function FTag_push(p){
   var o = this;
   var ts = o._children;
   if(ts == null){
      ts = o._children = new TObjects();
   }
   ts.push(p);
}
function FTag_parse(p){
   var o = this;
   var r = o.onBegin(p);
   if(r == EResult.Continue){
      var ts = o._children;
      if(ts){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.get(i);
            r = t.parse(p);
            if(r == EResult.Cancel){
               return r;
            }
            p._trimLeft = t._trimLeft;
            p._trimRight = t._trimRight;
         }
      }
      return o.onEnd(p);
   }
   return r;
}
function FTag_toString(){
   return null;
}
function FTag_innerDump(ps, pt, pl){
   var o = this;
   ps.appendRepeat('   ', pl);
   ps.append(RClass.dump(pt));
   var s = pt.toString();
   if(!RString.isEmpty(s)){
      ps.append(' [', s, ']');
   }
   var ts = pt._children;
   if(ts){
      ps.append('\n');
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.get(i);
         o.innerDump(ps, t, pl + 1);
         if(i < c - 1){
            ps.append('\n');
         }
      }
   }
}
function FTag_dump(){
   var r = new TString();
   this.innerDump(r, this, 0);
   return r.toString();
}
function FTagContext(o){
   o = RClass.inherits(this, o, FObject, MInstance);
   o._trimLeft       = false;
   o._trimRight      = false;
   o._attributes     = null;
   o._source         = null;
   o.construct       = FTagContext_construct;
   o.instanceAlloc   = FTagContext_instanceAlloc; // Implement MInstance
   o.attributes      = FTagContext_attributes;
   o.get             = FTagContext_get;
   o.set             = FTagContext_set;
   o.setBoolean      = FTagContext_setBoolean;
   o.source          = FTagContext_source;
   o.write           = FTagContext_write;
   o.resetSource     = FTagContext_resetSource;
   o.dispose         = FTagContext_dispose;
   return o;
}
function FTagContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._attributes = new TAttributes();
   o._source = new TString();
}
function FTagContext_instanceAlloc(p){
   this._attributes.clear();
}
function FTagContext_attributes(){
   return this._attributes;
}
function FTagContext_get(n, v){
   return this._attributes.get(n, v);
}
function FTagContext_set(n, v){
   this._attributes.set(n, v);
}
function FTagContext_setBoolean(n, v){
   this._attributes.set(n, RBoolean.toString(v));
}
function FTagContext_source(){
   return this._source.toString();
}
function FTagContext_write(p){
   if(!RString.isEmpty(p)){
      this._source.append(p);
   }
}
function FTagContext_resetSource(p){
   this._source.clear();
}
function FTagContext_dispose(){
   var o = this;
   o._attributes.dispose();
   o._attributes = null;
   o._source.dispose();
   o._source = null;
   o.__base.FObject.dispose.call(o);
}
function FTagDocument(o){
   o = RClass.inherits(this, o, FObject);
   o._space  = null;
   o._root   = null;
   o.space    = FTagDocument_space;
   o.setSpace = FTagDocument_setSpace;
   o.create   = FTagDocument_create;
   o.root     = FTagDocument_root;
   o.loadNode = FTagDocument_loadNode;
   o.load     = FTagDocument_load;
   o.parse    = FTagDocument_parse;
   o.dump     = FTagDocument_dump;
   return o;
}
function FTagDocument_space(){
   return this._space;
}
function FTagDocument_setSpace(p){
   this._space = p;
}
function FTagDocument_create(p){
   var o = this;
   var sn = o._space + '_';
   var n = null;
   if(RString.startsWith(p, sn)){
      n = p.substring(sn.length);
   }else{
      n = p;
   }
   var t = null;
   switch(n){
      case 'source':
         t = RClass.create(FTag);
         break;
      case 'true':
         t = RClass.create(FTagTrue);
         break;
      case 'false':
         t = RClass.create(FTagFalse);
         break;
      case 'write':
         t = RClass.create(FTagWrite);
         break;
      default:
         throw new TError(o, 'Unknown tag type. (name={1})', n);
   }
   return t;
}
function FTagDocument_root(){
   return this._root;
}
function FTagDocument_loadNode(pn, pe){
   var o = this;
   var x = o.create(pe.nodeName);
   if(pn){
      pn.push(x);
   }else{
      o._root = x;
   }
   var eas = pe.attributes;
   if(eas){
      var c = eas.length;
      for(var i = 0; i < c; i++){
         var ea = eas[i];
         if(ea.nodeName){
            x.set(ea.nodeName, RXml.fromText(ea.value));
         }
      }
   }
   var ens = pe.childNodes
   if(ens){
      var c = ens.length;
      for(var i = 0; i < c; i++){
         var en = ens[i];
         switch(en.nodeType){
            case ENodeType.Text:
               var xt = RClass.create(FTagText);
               xt.setText(en.nodeValue);
               x.push(xt);
               break;
            case ENodeType.Data:
               var xt = RClass.create(FTagText);
               xt.setText(en.data);
               x.push(xt);
               break;
            case ENodeType.Node:
               o.loadNode(x, en);
               break;
         }
      }
   }
}
function FTagDocument_load(p){
   var o = this;
   var s = '<source>' + p + '</source>'
   s = s.replace(new RegExp('<' + o._space + ':', 'g'), '<' + o._space + '_');
   s = s.replace(new RegExp('</' + o._space + ':', 'g'), '</' + o._space + '_');
   s = s.replace(new RegExp(' & ', 'g'), ' &amp; ');
   s = s.replace(new RegExp(' < ', 'g'), ' &lt; ');
   s = s.replace(new RegExp(' > ', 'g'), ' &gt; ');
   var xr = RXml.loadString(s);
   o.loadNode(null, xr.firstChild);
}
function FTagDocument_parse(p){
   var o = this;
   p.resetSource();
   o._root.parse(p);
   return p.source();
}
function FTagDocument_dump(){
   var o = this;
   var r = new TString();
   r.appendLine(RClass.dump(o));
   r.appendLine(o.root().dump(r));
   return r.toString();
}
function FTagFalse(o){
   o = RClass.inherits(this, o, FTag);
   o._trimLeft = true;
   o._source   = null;
   o.onBegin   = FTagFalse_onBegin;
   o.set       = FTagFalse_set;
   o.toString  = FTagFalse_toString;
   return o;
}
function FTagFalse_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   return RBoolean.parse(v) ? EResult.Skip : EResult.Continue;
}
function FTagFalse_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
function FTagFalse_toString(){
   var o = this;
   return 'source=' + o._source;
}
function FTagText(o){
   o = RClass.inherits(this, o, FTag);
   o._text    = null;
   o.onBegin  = FTagText_onBegin;
   o.text     = FTagText_text;
   o.setText  = FTagText_setText;
   o.toString = FTagText_toString;
   return o;
}
function FTagText_onBegin(p){
   var t = this._text;
   if(p._trimLeft){
      if(RString.startsWith(t, '\r')){
         t = t.substring(1);
      }
      if(RString.startsWith(t, '\n')){
         t = t.substring(1);
      }
   }
   if(p._trimRight){
      if(RString.endsWith(t, '\r')){
         t = t.substring(0, t.length - 1);
      }
      if(RString.endsWith(t, '\n')){
         t = t.substring(0, t.length - 1);
      }
   }
   p.write(t);
   return EResult.Skip;
}
function FTagText_text(){
   return this._text;
}
function FTagText_setText(p){
   this._text = p;
}
function FTagText_toString(){
   var o = this;
   return '{' + o._text + '}';
}
function FTagTrue(o){
   o = RClass.inherits(this, o, FTag);
   o._trimLeft = true;
   o._source   = null;
   o.onBegin   = FTagTrue_onBegin;
   o.set       = FTagTrue_set;
   o.toString  = FTagTrue_toString;
   return o;
}
function FTagTrue_onBegin(p){
   var o = this;
   var r = false;
   var ns = o._source.split('|');
   var c = ns.length;
   for(var i = 0; i < c; i++){
      var n = ns[i]
      var v = p.get(n);
      if(RBoolean.parse(v)){
         r = true;
         break;
      }
   }
   return r ? EResult.Continue : EResult.Skip;
}
function FTagTrue_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
function FTagTrue_toString(){
   var o = this;
   return 'source=' + o._source;
}
function FTagWrite(o){
   o = RClass.inherits(this, o, FTag);
   o._source  = null;
   o.onBegin  = FTagWrite_onBegin;
   o.set      = FTagWrite_set;
   o.toString = FTagWrite_toString;
   return o;
}
function FTagWrite_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   p.write(v);
   return EResult.Skip;
}
function FTagWrite_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
function FTagWrite_toString(){
   var o = this;
   return 'source=' + o._source;
}
var EThreadStatus = new function EThreadStatus(){
   var o = this;
   o.Sleep  = 0;
   o.Active = 1;
   o.Finish = 2;
   return o;
}
function FContent(o){
   o = RClass.inherits(this, o, FObject);
   o._name = null;
   o.name  = FContent_name;
   return o;
}
function FContent_name(){
   return this._name;
}
function FContentConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o.connections = null;
   o.onLoad      = FContentConsole_onLoad;
   o.construct   = FContentConsole_construct;
   o.alloc       = FContentConsole_alloc;
   o.process     = FContentConsole_process;
   o.send        = FContentConsole_send;
   return o;
}
function FContentConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}
function FContentConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
function FContentConsole_alloc(){
   var o = this;
   var a = null;
   var cs = o.connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = RClass.create(FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   return a;
}
function FContentConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}
function FContentConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
function FContentPipeline(o){
   o = RClass.inherits(this, o, FPipeline);
   o._scopeCd = EScope.Global;
   o.scopeCd  = FContentPipeline_scopeCd;
   return o;
}
function FContentPipeline_scopeCd(){
   return this._scopeCd;
}
function FHttpConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._pool     = null;
   o.onLoad    = FHttpConsole_onLoad;
   o.construct = FHttpConsole_construct;
   o.alloc     = FHttpConsole_alloc;
   o.send      = FHttpConsole_send;
   return o;
}
function FHttpConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pool = RClass.create(FObjectPool);
}
function FHttpConsole_onLoad(p){
   var o = this;
   o._pool.free(p);
}
function FHttpConsole_alloc(){
   var o = this;
   var p = o._pool;
   if(!p.hasFree()){
      var c = RClass.create(FHttpConnection);
      c._asynchronous = true;
      o._pool.push(c);
   }
   var c = p.alloc();
   c.lsnsLoad.clear();
   c.lsnsLoad.register(o, o.onLoad);
   return c;
}
function FHttpConsole_send(u){
   var o = this;
   var c = o.alloc();
   c.send(u);
   return c;
}
function FIdleConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope            = EScope.Page;
   o.register         = FIdleConsole_register;
   return o;
}
function FIdleConsole_register(c, cFun){
   var o = this;
   o.active = new TActive(c, cFun);
   o.active.interval = 100;
   RConsole.find(FActiveConsole).push(o.active);
}
function FIdleConsole_construct(){
   var o = this;
}
function FLoggerConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope      = EScope.Page;
   o.iLogger    = null;
   o.onKeyDown  = FLoggerConsole_onKeyDown;
   o.construct  = FLoggerConsole_construct;
   o.connect    = FLoggerConsole_connect;
   o.disconnect = FLoggerConsole_disconnect;
   o.output     = FLoggerConsole_output;
   return o;
}
function FLoggerConsole_onKeyDown(e){
   if(e.shiftKey && e.ctrlKey && EKey.L == e.keyCode){
      this.connect();
   }
}
function FLoggerConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
function FLoggerConsole_connect(){
   var o = this;
   if(!o.iLogger){
   }
}
function FLoggerConsole_disconnect(){
   this.iLogger = null;
}
function FLoggerConsole_output(level, obj, method, ms, msg, stack){
   var o = this;
   if(o.iLogger){
      var m = RClass.dump(obj);
      if(ms){
         m += ' (' + ms + 'ms)';
      }
      var s = level + ' [' + RString.rpad(m, 36) + '] ';
      if(stack){
         s += RString.rpad(msg, 120) + ' [' + stack + ']';
      }else{
         s += msg;
      }
      o.iLogger.Output(s);
   }
}
function FLoggerConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
function FMonitorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope      = EScope.Global;
   o.working    = false;
   o.interval   = 10;
   o.intervalId = null;
   o.monitors   = new TList();
   o.hWindow    = null;
   o.doInterval = FMonitorConsole_doInterval;
   o.push       = FMonitorConsole_push;
   o.process    = FMonitorConsole_process;
   o.processAll = FMonitorConsole_processAll;
   o.startup    = FMonitorConsole_startup;
   o.wait       = FMonitorConsole_wait;
   o.release    = FMonitorConsole_release;
   return o;
}
function FMonitorConsole_push(monitor){
   this.startup();
   monitor.id = this.monitors.sync(monitor);
   monitor.name = 'T:' + RString.lpad(monitor.id, 4, '0');
   monitor.status = EMonitor.Active;
}
function FMonitorConsole_process(monitor){
   if(monitor){
      switch(monitor.status){
         case EMonitor.Sleep:
            break;
         case EMonitor.Active:
            monitor.process(this.interval);
            break;
         case EMonitor.Cancel:
            this.monitors.removeItem(monitor);
            break;
      }
   }
}
function FMonitorConsole_processAll(){
   this.working = true;
   var monitors = this.monitors;
   for(var n=0; n<monitors.count; n++){
      this.process(monitors.get(n));
   }
   this.working = false;
}
function FMonitorConsole_doInterval(){
   var con = RGlobal.get(FMonitorConsole);
   if(con && !con.working){
      con.processAll();
   }
}
function FMonitorConsole_startup(){
   if(!this.hWindow){
      this.hWindow = window;
      this.intervalId = this.hWindow.setInterval(this.doInterval, this.interval);
   }
}
function FMonitorConsole_wait(request){
}
function FMonitorConsole_release(){
   if(this.hWindow && this.intervalId){
      this.hWindow.clearInterval(this.intervalId);
   }
}
function FPipeline(o){
   o = RClass.inherits(this, o, FObject);
   o._name = null;
   o.name  = FPipeline_name;
   return o;
}
function FPipeline_name(){
   return this._name;
}
function FProcessConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o.connections = null;
   o.onLoad      = FProcessConsole_onLoad;
   o.construct   = FProcessConsole_construct;
   o.alloc       = FProcessConsole_alloc;
   o.process     = FProcessConsole_process;
   o.send        = FProcessConsole_send;
   return o;
}
function FProcessConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}
function FProcessConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
function FProcessConsole_alloc(){
   var o = this;
   var a = null;
   var cs = o.connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = RClass.create(FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   return a;
}
function FProcessConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}
function FProcessConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
function FResource(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName  = null;
   o._groupName = null;
   o._name      = null;
   o.name  = FResource_name;
   return o;
}
function FResource_name(){
   return this._name;
}
function FResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._resources  = null;
   o.onLoad      = FResourceConsole_onLoad;
   o.construct   = FResourceConsole_construct;
   o.alloc       = FResourceConsole_alloc;
   o.process     = FResourceConsole_process;
   o.send        = FResourceConsole_send;
   return o;
}
function FResourceConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}
function FResourceConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
function FResourceConsole_alloc(){
   var o = this;
   var a = null;
   var cs = o.connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = RClass.create(FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   return a;
}
function FResourceConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}
function FResourceConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
function FResourceGroup(o){
   o = RClass.inherits(this, o, FObject);
   o._name = null;
   o.name  = FResourceGroup_name;
   return o;
}
function FResourceGroup_name(){
   return this._name;
}
function FResourceType(o){
   o = RClass.inherits(this, o, FObject);
   o._name      = null;
   o._pipeline  = null;
   o._resources = null;
   o.construct  = FResourceType_construct;
   o.name       = FResourceType_name;
   o.resource   = FResourceType_resource;
   o.resources  = FResourceType_resources;
   return o;
}
function FResourceType_construct(){
   var o = this;
   o.__base.construct.call(o);
   o._resources = new TDictionary();
}
function FResourceType_name(){
   return this._name;
}
function FResourceType_resource(p){
   return this._resources.get(p);;
}
function FResourceType_resources(){
   return this._resources;
}
function FThread(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._statusCd   = EThreadStatus.Sleep;
   o._interval   = 100;
   o._delay      = 0;
   o.lsnsProcess = null;
   o.construct   = FThread_construct;
   o.name        = FThread_name;
   o.statusCd    = FThread_statusCd;
   o.interval    = FThread_interval;
   o.setInterval = FThread_setInterval;
   o.start       = FThread_start;
   o.stop        = FThread_stop;
   o.process     = FThread_process;
   return o;
}
function FThread_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.lsnsProcess = new TListeners();
}
function FThread_name(){
   return this._name;
}
function FThread_statusCd(){
   return this._statusCd;
}
function FThread_interval(){
   return this._interval;
}
function FThread_setInterval(p){
   this._interval = p;
}
function FThread_start(){
   this._statusCd = EThreadStatus.Active;
}
function FThread_stop(){
   this._statusCd = EThreadStatus.Finish;
}
function FThread_process(p){
   var o = this;
   if(o._delay <= 0){
      o.lsnsProcess.process(o);
      o._delay = o._interval;
   }else{
      o._delay -= p;
   }
}
function FThreadConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = EScope.Local;
   o._active      = true;
   o._interval    = 10;
   o._threads     = null;
   o._hWindow     = null;
   o._hIntervalId = null;
   o.ohInterval   = FThreadConsole_ohInterval;
   o.construct    = FThreadConsole_construct;
   o.push         = FThreadConsole_push;
   o.start        = FThreadConsole_start;
   o.process      = FThreadConsole_process;
   o.processAll   = FThreadConsole_processAll;
   o.dispose      = FThreadConsole_dispose;
   return o;
}
function FThreadConsole_ohInterval(){
   var c = RConsole.get(FThreadConsole);
   c.processAll();
}
function FThreadConsole_push(p){
   this._threads.push(p);
}
function FThreadConsole_start(p){
   p.start();
   this._threads.push(p);
}
function FThreadConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._threads = new TObjects();
   o._hWindow = window;
   o._hIntervalId = o._hWindow.setInterval(o.ohInterval, o._interval);
}
function FThreadConsole_process(p){
   var o = this;
   if(p){
      switch(p.statusCd()){
         case EThreadStatus.Sleep:
            break;
         case EThreadStatus.Active:
            p.process(o._interval);
            break;
         case EThreadStatus.Finish:
            p.dispose();
            o._threads.remove(p);
            break;
      }
   }
}
function FThreadConsole_processAll(){
   var o = this;
   if(o._active){
      var ts = o._threads;
      var c = ts.count();
      for(var n = 0; n < c; n++){
         var t = ts.get(n);
         o.process(t);
      }
   }
}
function FThreadConsole_dispose(){
   var o = this;
   var hw = o._hWindow;
   if(hw){
      var hi = o._hIntervalId;
      if(hi){
         hw.clearInterval(hi);
         o._hIntervalId = null;
      }
      o._hWindow = null;
   }
}
function FXmlConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o.connections = null;
   o.onLoad      = FXmlConsole_onLoad;
   o.construct   = FXmlConsole_construct;
   o.alloc       = FXmlConsole_alloc;
   o.process     = FXmlConsole_process;
   o.send        = FXmlConsole_send;
   return o;
}
function FXmlConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}
function FXmlConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
function FXmlConsole_alloc(){
   var o = this;
   var a = null;
   var cs = o.connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = RClass.create(FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   return a;
}
function FXmlConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}
function FXmlConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
function FGraphicContext(o){
   o = RClass.inherits(this, o, FObject);
   o._hCanvas   = null;
   o.construct  = FGraphicContext_construct;
   o.linkCanvas = RMethod.virtual(o, 'linkCanvas');
   o.dispose    = FGraphicContext_dispose;
   return o;
}
function FGraphicContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FGraphicContext_dispose(){
   var o = this;
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
function FGraphicRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o.process = FGraphicRenderable_process;
   return o;
}
function FGraphicRenderable_process(){
}
function FG2dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._native       = null;
   o.construct     = FG2dContext_construct;
   o.linkCanvas    = FG2dContext_linkCanvas;
   o.drawLine      = FG2dContext_drawLine;
   o.drawRecrangle = FG2dContext_drawRecrangle;
   o.drawText      = FG2dContext_drawText;
   o.drawImage     = FG2dContext_drawImage;
   o.fillRecrangle = FG2dContext_fillRecrangle;
   o.dispose       = FG2dContext_dispose;
   return o;
}
function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
}
function FG2dContext_linkCanvas(h){
   var o = this;
   o._hCanvas = h;
   o._native = h.getContext('2d')
}
function FG2dContext_drawLine(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y2);
   c.stroke();
}
function FG2dContext_drawRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.stroke();
}
function FG2dContext_drawText(x, y, t){
   var o = this;
   o._native.fillText(t, x, y);
}
function FG2dContext_drawImage(){
}
function FG2dContext_fillRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.beginPath();
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.closePath();
   c.fill();
}
function FG2dContext_dispose(){
   var o = this;
   o._native = null;
   o.__base.FGraphicContext.dispose.call(o);
}
var EG3dRegionParameter = new function EG3dRegionParameter(){
   var o = this;
   o.Unknown                    = 0;
   o.CameraPosition             = 1;
   o.CameraDirection            = 2;
   o.CameraViewMatrix           = 3;
   o.CameraProjectionMatrix     = 4;
   o.CameraViewProjectionMatrix = 5;
   o.LightPosition              = 6;
   o.LightDirection             = 7;
   o.LightViewMatrix            = 8;
   o.LightProjectionMatrix      = 9;
   o.LightViewProjectionMatrix  = 10;
   o.LightInfo                  = 11;
   return o;
}
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
   o._matrix      = null;
   o._position    = null;
   o._direction   = null;
   o._rotation    = null;
   o._centerFront = 0.6;
   o._centerBack  = 1.0;
   o._focalNear   = 0.1;
   o._focalFar    = 200.0;
   o._planes      = null;
   o._frustum     = null;
   o._viewport    = null;
   o.__axisUp     = null;
   o.__axisX      = null;
   o.__axisY      = null;
   o.__axisZ      = null;
   o.__rotationX  = null;
   o.__rotationY  = null;
   o.__rotationZ  = null;
   o.construct    = FG3dCamera_construct;
   o.matrix       = FG3dCamera_matrix;
   o.position     = FG3dCamera_position;
   o.setPosition  = FG3dCamera_setPosition;
   o.direction    = FG3dCamera_direction;
   o.setDirection = FG3dCamera_setDirection;
   o.frustum      = FG3dCamera_frustum;
   o.doWalk       = FG3dCamera_doWalk;
   o.doStrafe     = FG3dCamera_doStrafe;
   o.doFly        = FG3dCamera_doFly;
   o.doYaw        = FG3dCamera_doYaw;
   o.doPitch      = FG3dCamera_doPitch;
   o.lookAt       = FG3dCamera_lookAt;
   o.update       = FG3dCamera_update;
   return o;
}
function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._rotation = new SQuaternion();
   o._frustum = new SFrustum();
   o._viewport = RClass.create(FG3dViewport);
   o.__axisUp = new SVector3();
   o.__axisUp.set(0, 1, 0);
   o.__axisX = new SVector3();
   o.__axisY = new SVector3();
   o.__axisZ = new SVector3();
   o.__rotationX = new SQuaternion();
   o.__rotationY = new SQuaternion();
   o.__rotationZ = new SQuaternion();
}
function FG3dCamera_position(){
   return this._position;
}
function FG3dCamera_matrix(){
   return this._matrix;
}
function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}
function FG3dCamera_direction(){
   return this._direction;
}
function FG3dCamera_setDirection(x, y, z){
   this._direction.set(x, y, z);
}
function FG3dCamera_frustum(){
   return this._frustum;
}
function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}
function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o.__axisY.x * p;
   o._position.z += o.__axisY.z * p;
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
   var d = o._direction;
   d.set(x - p.x, y - p.y, z - p.z);
   d.normalize();
}
function FG3dCamera_update(){
   var o = this;
   var ax = o.__axisX;
   var ay = o.__axisY;
   var az = o.__axisZ;
   az.assign(o._direction);
   az.normalize();
   o.__axisUp.cross2(ax, az);
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
   o._camera     = null;
   o._viewport   = null;
   o._direction  = null;
   o.construct   = FG3dDirectionalLight_construct;
   o.camera      = FG3dDirectionalLight_camera;
   o.projection  = FG3dDirectionalLight_projection;
   o.viewport    = FG3dDirectionalLight_viewport;
   o.direction   = FG3dDirectionalLight_direction;
   return o;
}
function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._direction = new SVector3();
   o._camera = RClass.create(FG3dPerspectiveCamera);
}
function FG3dDirectionalLight_camera(){
   return this._camera;
}
function FG3dDirectionalLight_projection(){
   return this._projection;
}
function FG3dDirectionalLight_viewport(){
   return this._viewport;
}
function FG3dDirectionalLight_direction(){
   return this._direction;
}
function FG3dEffect(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._code               = null;
   o._stateFillCd        = EG3dFillMode.Face;
   o._stateCullCd        = EG3dCullMode.Front;
   o._stateDepth         = true;
   o._stateDepthCd       = EG3dDepthMode.LessEqual;
   o._stateDepthWrite    = true;
   o._stateBlend         = true;
   o._stateBlendSourceCd = EG3dBlendMode.SourceAlpha;
   o._stateBlendTargetCd = EG3dBlendMode.OneMinusSourceAlpha;
   o._stateAlphaTest     = false;
   o._optionShadow       = false;
   o._optionLightMap     = false;
   o._optionFog          = false;
   o._program            = null;
   o._vertexTemplate     = null;
   o._fragmentTemplate   = null;
   o.setup               = RMethod.empty;
   o.code                = FG3dEffect_code;
   o.program             = FG3dEffect_program;
   o.setParameter        = FG3dEffect_setParameter;
   o.setSampler          = FG3dEffect_setSampler;
   o.drawRenderable      = FG3dEffect_drawRenderable;
   o.buildInfo           = FG3dEffect_buildInfo;
   o.loadConfig          = FG3dEffect_loadConfig;
   o.loadUrl             = FG3dEffect_loadUrl;
   o.load                = FG3dEffect_load;
   o.build               = FG3dEffect_build;
   return o;
}
function FG3dEffect_code(){
   return this._code;
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
function FG3dEffect_buildInfo(f, r){
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
function FG3dEffect_loadConfig(p){
   var o = this;
   var c = o._context;
   var g = o._program = c.createProgram();
   var xs = p.nodes();
   var c = xs.count();
   for(var i = 0; i < c; i++){
      var x = xs.get(i);
      if(x.isName('State')){
         var n = x.get('name');
         var v = x.get('value');
         if(n == 'fill_mode'){
            o._stateFillCd = REnum.parse(EG3dFillMode, v);
         }else if(n == 'cull_mode'){
            o._stateCullCd = REnum.parse(EG3dCullMode, v);
         }else if(n == 'depth_mode'){
            o._stateDepth = true;
            o._stateDepthCd = REnum.parse(EG3dDepthMode, v);
         }else if(n == 'depth_write'){
            o._stateDepthWrite = RBoolean.parse(v);
         }else if(n == 'blend_mode'){
            o._stateBlend = RBoolean.parse(v);
            o._stateBlendSourceCd = REnum.parse(EG3dBlendMode, x.get('source'));
            o._stateBlendTargetCd = REnum.parse(EG3dBlendMode, x.get('target'));
         }else if(n == 'alpha_test'){
            o._stateAlphaTest = RBoolean.parse(v);
         }
      }else if(x.isName('Option')){
         var n = x.get('name');
         var v = x.get('value');
         if(n == 'shadow'){
            o._optionShadow = RBoolean.parse(v);
         }else if(n == 'lightmap'){
            o._optionLightMap = RBoolean.parse(v);
         }else if(n == 'fog'){
            o._optionFog = RBoolean.parse(v);
         }
      }else if(x.isName('Parameter')){
         var pp = RClass.create(FG3dProgramParameter);
         pp.loadConfig(x);
         g.parameters().set(pp.name(), pp);
      }else if(x.isName('Attribute')){
         var pa = RClass.create(FG3dProgramAttribute);
         pa.loadConfig(x);
         g.attributes().set(pa.name(), pa);
      }else if(x.isName('Sampler')){
         var ps = RClass.create(FG3dProgramSampler);
         ps.loadConfig(x);
         g.samplers().set(ps.name(), ps);
      }else if(x.isName('Source')){
         var st = x.get('name');
         if(st == 'vertex'){
            o._vertexSource = x.value();
         }else if(st == 'fragment'){
            o._fragmentSource = x.value();
         }else{
            throw new TError(o, 'Unknown source type. (name={1})', nt);
         }
      }else{
         throw new TError(o, 'Unknown config type. (name={1})', x.name());
      }
   }
   var vt = o._vertexTemplate = RClass.create(FG3dShaderTemplate);
   vt.load(o._vertexSource);
   var ft = o._fragmentTemplate = RClass.create(FG3dShaderTemplate);
   ft.load(o._fragmentSource);
}
function FG3dEffect_loadUrl(u){
   var o = this;
   var x = RClass.create(FXmlConnection);
   var r = x.send(u);
   o.loadConfig(r);
}
function FG3dEffect_build(p){
   var o = this;
   var g = o._program;
   var c = RInstance.get(FTagContext);
   o.buildInfo(c, p);
   var vs = o._vertexTemplate.parse(c);
   var vsf = RString.formatLines(vs);
   g.upload(EG3dShader.Vertex, vsf);
   var fs = o._fragmentTemplate.parse(c);
   var fsf = RString.formatLines(fs);
   g.upload(EG3dShader.Fragment, fsf);
   g.build();
   g.link();
}
function FG3dEffect_load(){
   var o = this;
   var cp = RBrowser.contentPath();
   var ec = RConsole.find(FG3dEffectConsole);
   var u = cp + ec.path() + o._code + ".xml";
   o.loadUrl(u);
}
function FG3dEffectConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templateEffects = null;
   o._effects         = null;
   o._path            = "/assets/shader/";
   o._effectInfo      = null;
   o._tagContext      = null;
   o.construct        = FG3dEffectConsole_construct;
   o.path             = FG3dEffectConsole_path;
   o.create           = FG3dEffectConsole_create;
   o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = FG3dEffectConsole_findTemplate;
   o.find             = FG3dEffectConsole_find;
   return o;
}
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templateEffects = new TDictionary();
   o._effects = new TDictionary();
   o._effectInfo = new SG3dEffectInfo();
   o._tagContext = RClass.create(FTagContext);
}
function FG3dEffectConsole_path(){
   return this._path;
}
function FG3dEffectConsole_create(p){
   var e = null;
   switch(p){
      case 'general.color.automatic':
         e = RClass.create(FG3dGeneralColorAutomaticEffect);
         break;
      case 'general.color.skeleton':
         e = RClass.create(FG3dGeneralColorSkeletonEffect);
         break;
      case 'shadow.depth.automatic':
         e = RClass.create(FG3dShadowDepthAutomaticEffect);
         break;
      case 'shadow.depth.skeleton':
         e = RClass.create(FG3dShadowDepthSkeletonEffect);
         break;
      case 'shadow.color.automatic':
         e = RClass.create(FG3dShadowColorAutomaticEffect);
         break;
      case 'shadow.color.skeleton':
         e = RClass.create(FG3dShadowColorSkeletonEffect);
         break;
      default:
         throw new TError(this, 'Unknown effect type name. (type={1})', p);
   }
   return e;
}
function FG3dEffectConsole_buildEffectInfo(pc, pf, pr){
   var o = this;
   pf.vertexCount = pr.vertexCount();
   var vs = pr.vertexBuffers();
   var c = vs.count();
   for(var i = 0; i < c; i++){
      var v = vs.get(i);
      pf.attributes.push(v.name());
   }
   var ts = pr.textures();
   if(ts){
      var c = ts.count();
      for(var i = 0; i < c; i++){
         pf.samplers.push(ts.name(i));
      }
   }
   var bs = pr.bones();
   if(bs){
      var bc = bs.count();
      pf.vertexBoneCount = bc;
      var cb = pc.capability().calculateBoneCount(pf.vertexBoneCount, pf.vertexCount);
      if(bc > cb){
         bc = cb;
      }
      pr._boneLimit = bc;
      pf.vertexBoneLimit = bc;
   }
}
function FG3dEffectConsole_findTemplate(pc, pn){
   var o = this;
   var es = o._templateEffects;
   var e = es.get(pn);
   if(e == null){
      var e = o.create(pn);
      e.linkContext(pc);
      e.load();
      RLogger.info(o, 'Create effect template. (name={1}, instance={2})', pn, e);
      es.set(pn, e);
   }
   return e;
}
function FG3dEffectConsole_find(pc, pg, pr){
   var o = this;
   var en = pr.material().info().effectName;
   if(RString.isEmpty(en)){
      en = 'automatic'
   }
   var ef = pg.technique().name() + '.' + pg.techniquePass().name() + '.' + en;
   var et = o.findTemplate(pc, ef);
   if(et){
      o._effectInfo.reset();
      o.buildEffectInfo(pc, o._effectInfo, pr);
      et.buildInfo(o._tagContext, o._effectInfo);
      var ec = ef + o._tagContext.code;
      var es = o._effects;
      var e = es.get(ec);
      if(e == null){
         var e = o.create(ef);
         e.linkContext(pc);
         e.load();
         e.build(o._effectInfo);
         RLogger.info(o, 'Create effect. (name={1}, instance={2})', en, e);
      }
      es.set(ec, e);
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
function FG3dOrthoCamera(o){
   o = RClass.inherits(this, o, FG3dCamera);
   o._projection      = null;
   o.construct        = FG3dOrthoCamera_construct;
   o.projection       = FG3dOrthoCamera_projection;
   o.updateFrustum    = FG3dOrthoCamera_updateFrustum;
   o.updateFromCamera = FG3dOrthoCamera_updateFromCamera;
   o.updateFlatCamera = FG3dOrthoCamera_updateFlatCamera;
   return o;
}
function FG3dOrthoCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._projection = RClass.create(FG3dOrthoProjection);
}
function FG3dOrthoCamera_projection(){
   return this._projection;
}
function FG3dOrthoCamera_updateFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dOrthoCamera_updateFromCamera(p){
   var o = this;
   var pf = p.updateFrustum();
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * pf.radius;
   var vy = pf.center.y - d.y * pf.radius;
   var vz = pf.center.z - d.z * pf.radius;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   var f = o._frustum;
   o._matrix.transform(f.coners, pf.coners, 8);
   f.updateCenter();
   o._projection.updateFrustum(f);
}
function FG3dOrthoCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
   var angle = RMath.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance;
   var vy = pf.center.y - d.y * distance;
   var vz = pf.center.z - d.z * distance;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._projection._znear = 0.3;
   o._projection._zfar = distance * 1.5;
   o._projection.update();
}
function FG3dOrthoProjection(o){
   o = RClass.inherits(this, o, FG3dProjection);
   o._matrix       = null;
   o.construct     = FG3dOrthoProjection_construct;
   o.matrix        = FG3dOrthoProjection_matrix;
   o.update        = FG3dOrthoProjection_update;
   o.updateFrustum = FG3dOrthoProjection_updateFrustum;
   return o;
}
function FG3dOrthoProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new SOrthoMatrix3d();
}
function FG3dOrthoProjection_matrix(){
   return this._matrix;
}
function FG3dOrthoProjection_update(){
   var o = this;
   var s = o._size;
   o._matrix.identity();
   var d = o._matrix.data();
   d[ 0] = 2.0 / s.width * 8.0;
   d[ 4] = d[ 8] = d[12] = 0.0;
   d[ 5] = 2.0 / s.height * 8.0;
   d[ 1] = d[ 9] = d[13] = 0.0;
   d[10] = 1.0 / (o._znear - o._zfar);
   d[ 2] = d[ 6] = d[14] = 0.0;
   d[ 3] = d[ 7] = 0.0;
   d[11] = o._znear / (o._znear - o._zfar);
   d[15] = 1.0;
}
function FG3dOrthoProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
function FG3dPerspectiveCamera(o){
   o = RClass.inherits(this, o, FG3dCamera);
   o._projection       = null;
   o._centerFront      = 0.4;
   o.construct         = FG3dPerspectiveCamera_construct;
   o.projection        = FG3dPerspectiveCamera_projection;
   o.updateFrustum     = FG3dPerspectiveCamera_updateFrustum;
   o.updateFlatFrustum = FG3dPerspectiveCamera_updateFlatFrustum;
   o.updateFromCamera  = FG3dPerspectiveCamera_updateFromCamera;
   o.updateFlatCamera  = FG3dPerspectiveCamera_updateFlatCamera;
   return o;
}
function FG3dPerspectiveCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._projection = RClass.create(FG3dPerspectiveProjection);
}
function FG3dPerspectiveCamera_projection(){
   return this._projection;
}
function FG3dPerspectiveCamera_updateFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dPerspectiveCamera_updateFlatFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.updateFlat(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dPerspectiveCamera_updateFromCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFrustum();
   var angle = RMath.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance;
   var vy = pf.center.y - d.y * distance;
   var vz = pf.center.z - d.z * distance;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._matrix.transform(f.coners, pf.coners, 8);
   f.updateCenter();
   o._projection.updateFrustum(f);
}
function FG3dPerspectiveCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
   var angle = RMath.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance * o._centerFront;
   var vy = pf.center.y - d.y * distance * o._centerFront;
   var vz = pf.center.z - d.z * distance * o._centerFront;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._projection._znear = 0.1;
   o._projection._zfar = distance;
   o._projection.update();
}
function FG3dPerspectiveProjection(o){
   o = RClass.inherits(this, o, FG3dProjection);
   o._matrix       = null;
   o.construct     = FG3dPerspectiveProjection_construct;
   o.matrix        = FG3dPerspectiveProjection_matrix;
   o.update        = FG3dPerspectiveProjection_update;
   o.updateFrustum = FG3dPerspectiveProjection_updateFrustum;
   return o;
}
function FG3dPerspectiveProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new SPerspectiveMatrix3d();
}
function FG3dPerspectiveProjection_matrix(){
   return this._matrix;
}
function FG3dPerspectiveProjection_update(){
   var o = this;
   var s = o._size;
   o._fieldOfView = RMath.DEGREE_RATE * o._angle;
   o._matrix.perspectiveFieldOfViewLH(o._fieldOfView, s.width / s.height, o._znear, o._zfar);
}
function FG3dPerspectiveProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
function FG3dPointLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dProjection(o){
   o = RClass.inherits(this, o, FObject);
   o._size        = null;
   o._angle       = 60.0;
   o._fieldOfView = 0;
   o._znear       = 0.1;
   o._zfar        = 200.0;
   o._scale       = 0;
   o.construct   = FG3dProjection_construct;
   o.size        = FG3dProjection_size;
   o.angle       = FG3dProjection_angle;
   o.znear       = FG3dProjection_znear;
   o.zfar        = FG3dProjection_zfar;
   o.distance    = FG3dProjection_distance;
   return o;
}
function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();;
}
function FG3dProjection_size(){
   return this._size;
}
function FG3dProjection_angle(){
   return this._angle;
}
function FG3dProjection_znear(){
   return this._znear;
}
function FG3dProjection_zfar(){
   return this._zfar;
}
function FG3dProjection_distance(){
   return this._zfar - this._znear;
}
function FG3dRegion(o){
   o = RClass.inherits(this, o, FObject);
   o._spaceName                  = null;
   o._technique                  = null;
   o._techniquePass              = null;
   o._camera                     = null;
   o._projection                 = null;
   o._directionalLight           = null
   o._lights                     = null
   o._renderables                = null;
   o._cameraPosition             = null;
   o._cameraDirection            = null;
   o._cameraViewMatrix           = null;
   o._cameraProjectionMatrix     = null;
   o._cameraViewProjectionMatrix = null;
   o._lightPosition              = null;
   o._lightDirection             = null;
   o._lightViewMatrix            = null;
   o._lightProjectionMatrix      = null;
   o._lightViewProjectionMatrix  = null;
   o._lightInfo                  = null;
   o.construct                   = FG3dRegion_construct;
   o.spaceName                   = FG3dRegion_spaceName;
   o.technique                   = FG3dRegion_technique;
   o.setTechnique                = FG3dRegion_setTechnique;
   o.techniquePass               = FG3dRegion_techniquePass;
   o.setTechniquePass            = FG3dRegion_setTechniquePass;
   o.camera                      = FG3dRegion_camera;
   o.directionalLight            = FG3dRegion_directionalLight;
   o.lights                      = FG3dRegion_lights;
   o.renderables                 = FG3dRegion_renderables;
   o.pushRenderable              = FG3dRegion_pushRenderable;
   o.prepare                     = FG3dRegion_prepare;
   o.calculate                   = FG3dRegion_calculate;
   o.update                      = FG3dRegion_update;
   o.dispose                     = FG3dRegion_dispose;
   return o;
}
function FG3dRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._lights = new TObjects();
   o._renderables = new TObjects();
   o._cameraPosition = new SPoint3();
   o._cameraDirection = new SVector3();
   o._cameraViewMatrix = new SMatrix3d();
   o._cameraProjectionMatrix = new SMatrix3d();
   o._cameraViewProjectionMatrix = new SMatrix3d();
   o._lightPosition = new SPoint3();
   o._lightDirection = new SVector3();
   o._lightViewMatrix = new SMatrix3d();
   o._lightProjectionMatrix = new SMatrix3d();
   o._lightViewProjectionMatrix = new SMatrix3d();
   o._lightInfo = new SVector4();
}
function FG3dRegion_spaceName(){
   return this._spaceName;
}
function FG3dRegion_technique(){
   return this._technique;
}
function FG3dRegion_setTechnique(p){
   this._technique = p;
}
function FG3dRegion_techniquePass(){
   return this._techniquePass;
}
function FG3dRegion_setTechniquePass(p){
   var o = this;
   o._techniquePass = p;
   o._spaceName = o._technique.name() + '.' + p.name();
}
function FG3dRegion_camera(){
   return this._camera;
}
function FG3dRegion_directionalLight(){
   return this._directionalLight;
}
function FG3dRegion_lights(){
   return this._lights;
}
function FG3dRegion_renderables(p){
   return this._renderables;
}
function FG3dRegion_pushRenderable(p){
   this._renderables.push(p);
}
function FG3dRegion_prepare(){
   var o = this;
   var c = o._camera;
   var cp = c.projection();
   o._cameraPosition.assign(c.position());
   o._cameraDirection.assign(c.direction());
   o._cameraViewMatrix.assign(c.matrix());
   o._cameraProjectionMatrix.assign(cp.matrix());
   o._cameraViewProjectionMatrix.assign(c.matrix());
   o._cameraViewProjectionMatrix.append(cp.matrix());
   var l = o._directionalLight;
   var lc = l.camera();
   var lcp = lc.position();
   var lp = lc.projection();
   o._lightPosition.assign(lc.position());
   o._lightDirection.assign(lc.direction());
   o._lightViewMatrix.assign(lc.matrix());
   o._lightProjectionMatrix.assign(lp.matrix());
   o._lightViewProjectionMatrix.assign(lc.matrix());
   o._lightViewProjectionMatrix.append(lp.matrix());
   o._lightInfo.set(0, 0, lp._znear, 1.0 / lp.distance());
   o._renderables.clear();
}
function FG3dRegion_calculate(p){
   var o = this;
   switch(p){
      case EG3dRegionParameter.CameraPosition:
         return o._cameraPosition;
      case EG3dRegionParameter.CameraDirection:
         return o._cameraDirection;
      case EG3dRegionParameter.CameraViewMatrix:
         return o._cameraViewMatrix;
      case EG3dRegionParameter.CameraProjectionMatrix:
         return o._cameraProjectionMatrix;
      case EG3dRegionParameter.CameraViewProjectionMatrix:
         return o._cameraViewProjectionMatrix;
      case EG3dRegionParameter.LightPosition:
         return o._lightPosition;
      case EG3dRegionParameter.LightDirection:
         return o._lightDirection;
      case EG3dRegionParameter.LightViewMatrix:
         return o._lightViewMatrix;
      case EG3dRegionParameter.LightProjectionMatrix:
         return o._lightProjectionMatrix;
      case EG3dRegionParameter.LightViewProjectionMatrix:
         return o._lightViewProjectionMatrix;
      case EG3dRegionParameter.LightInfo:
         return o._lightInfo;
   }
   throw new TError(o, 'Unknown parameter type. (type_cd={1})', p);
}
function FG3dRegion_update(){
   var o = this;
   var rs = o._renderables;
   var c = rs.count();
   for(var i = 0; i < c; i++){
      rs.get(i).update(o);
   }
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
   o._activeEffect = null;
   o._effects      = null;
   o._materialName = null;
   o._material     = null;
   o.construct       = FG3dRenderable_construct;
   o.matrix          = FG3dRenderable_matrix;
   o.effectName      = FG3dRenderable_effectName;
   o.activeEffect    = FG3dRenderable_activeEffect;
   o.setActiveEffect = FG3dRenderable_setActiveEffect;
   o.effects         = FG3dRenderable_effects;
   o.material        = FG3dRenderable_material;
   o.testVisible     = RMethod.virtual(o, 'testVisible');
   o.update          = FG3dRenderable_update;
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
function FG3dRenderable_activeEffect(){
   return this._activeEffect;
}
function FG3dRenderable_setActiveEffect(p){
   this._activeEffect = p;
}
function FG3dRenderable_effects(){
   var o = this;
   var es = o._effects;
   if(es == null){
      es = o._effects = new TDictionary();
   }
   return es;
}
function FG3dRenderable_material(){
   return this._material;
}
function FG3dRenderable_update(p){
}
function FG3dShaderTemplate(o){
   o = RClass.inherits(this, o, FTagDocument);
   o._space  = 'shader';
   return o;
}
function FG3dSpotLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dTechnique(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name        = null;
   o._passes      = null;
   o.construct    = FG3dTechnique_construct;
   o.name         = FG3dTechnique_name;
   o.updateRegion = RMethod.empty;
   o.drawRegion   = FG3dTechnique_drawRegion;
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
   r.setTechnique(o);
   var ps = o._passes;
   var c = ps.count();
   for(var n = 0; n < c; n++){
      var p = ps.get(n);
      r.setTechniquePass(p);
      p._finish = (n == c - 1);
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
   o._index     = null;
   o._finish    = false;
   o.setup      = RMethod.empty;
   o.name       = FG3dTechniquePass_name;
   o.drawRegion = FG3dTechniquePass_drawRegion;
   return o;
}
function FG3dTechniquePass_name(){
   return this._name;
}
function FG3dTechniquePass_drawRegion(p){
   var o = this;
   var sn = p.spaceName();
   var rs = p.renderables();
   var c = rs.count();
   for(var i = 0; i < c; i++){
      var r = rs.get(i);
      var e = r.effects().get(sn);
      if(e == null){
         e = RConsole.find(FG3dEffectConsole).find(o._context, p, r);
         r.effects().set(sn, e);
      }
      r.setActiveEffect(e);
   }
   for(var i = 0; i < c; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      o._context.setProgram(e.program());
      e.drawRenderable(p, r);
   }
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
   o.code                  = null;
   o.fillModeCd            = null;
   o.optionCullMode        = null;
   o.cullModeCd            = null;
   o.optionDepthTest       = null;
   o.depthModeCd           = null;
   o.optionDepthWrite      = null;
   o.optionBlendMode       = null;
   o.blendSourceMode       = null;
   o.blendTargetMode       = null;
   o.optionAlphaTest       = null;
   o.supportInstance       = null;
   o.vertexCount           = 0;
   o.vertexColor           = null;
   o.vertexCoord           = null;
   o.vertexNormal          = null;
   o.vertexNormalFull      = null;
   o.vertexSkeleton        = null;
   o.vertexBoneCount       = 0;
   o.fragmentAlpha         = null;
   o.fragmentBump          = null;
   o.fragmentAmbient       = null;
   o.fragmentDiffuse       = null;
   o.fragmentDiffuseView   = null;
   o.fragmentSpecularColor = null;
   o.fragmentSpecularLevel = null;
   o.fragmentSpecularView  = null;
   o.fragmentEnvironment   = null;
   o.fragmentLight         = null;
   o.fragmentReflect       = null;
   o.fragmentRefract       = null;
   o.fragmentEmissive      = null;
   o.fragmentHeight        = null;
   o.attributes            = new TArray();
   o.samplers              = new TArray();
   o.attributeContains     = SG3dEffectInfo_attributeContains;
   o.samplerContains       = SG3dEffectInfo_samplerContains;
   o.reset                 = SG3dEffectInfo_reset;
   o.reset();
   return o;
}
function SG3dEffectInfo_attributeContains(p){
   return this.attributes.contains(p);
}
function SG3dEffectInfo_samplerContains(p){
   return this.samplers.contains(p);
}
function SG3dEffectInfo_reset(){
   var o = this;
   o.code = null;
   o.fillModeCd = EG3dFillMode.Fill;
   o.optionCullMode = true;
   o.cullModeCd = EG3dCullMode.Front;
   o.optionDepthTest = true;
   o.depthModeCd = EG3dDepthMode.Less;
   o.optionDepthWrite = true;
   o.optionBlendMode = false;
   o.blendSourceMode = EG3dBlendMode.SourceAlpha;
   o.blendTargetMode = EG3dBlendMode.OneMinusSourceAlpha;
   o.optionAlphaTest = false;
   o.supportInstance = false;
   o.vertexCount = 0;
   o.vertexColor = false;
   o.vertexCoord = false;
   o.vertexNormal = false;
   o.vertexNormalFull = false;
   o.vertexSkeleton = false;
   o.vertexBoneCount = 0;
   o.fragmentAlpha = false;
   o.fragmentBump = false;
   o.fragmentAmbient = false;
   o.fragmentDiffuse = false;
   o.fragmentDiffuseView = false;
   o.fragmentSpecularColor = false;
   o.fragmentSpecularLevel = false;
   o.fragmentSpecularView = false;
   o.fragmentEnvironment = false;
   o.fragmentLight = false;
   o.fragmentReflect = false;
   o.fragmentRefract = false;
   o.fragmentEmissive = false;
   o.fragmentHeight = false;
   o.attributes.clear();
   o.samplers.clear();
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
var EG3dAttribute = new function EG3dAttribute(){
   var o = this;
   o.Position   = 'position';
   o.Color      = 'color';
   o.Coord      = 'coord';
   o.Normal     = 'normal';
   o.Binormal   = 'binormal';
   o.Tangent    = 'tangent';
   o.BoneIndex  = 'bone_index';
   o.BoneWeight = 'bone_weight';
   return o;
}
var EG3dAttributeFormat = new function EG3dAttributeFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Byte4 = 5;
   o.Byte4Normal = 6;
   return o;
}
var EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   o.None = 0;
   o.SourceAlpha= 1;
   o.OneMinusSourceAlpha = 2;
   return o;
}
var EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
var EG3dDepthMode = new function EG3dDepthMode(){
   var o = this;
   o.None = 0;
   o.Equal = 1;
   o.NotEqual = 2;
   o.Less = 3;
   o.LessEqual = 4;
   o.Greater = 5;
   o.GreaterEqual = 6;
   o.Always = 7;
   return o;
}
var EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
var EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
var EG3dParameterFormat = new function EG3dParameterFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Float3x3 = 5;
   o.Float4x3 = 6;
   o.Float4x4 = 7;
   return o;
}
var EG3dSampler = new function EG3dSampler(){
   var o = this;
   o.Diffuse       = 'Diffuse';
   o.Alpha         = 'Alpha';
   o.Normal        = 'Normal';
   o.SpecularColor = 'SpecularColor';
   o.SpecularLevel = 'SpecularLevel';
   o.Light         = 'Light';
   o.Reflect       = 'Reflect';
   o.Refract       = 'Refract';
   o.Emissive      = 'Emissive';
   o.Height        = 'Height';
   o.Environment   = 'Environment';
   return o;
}
var EG3dSamplerFilter = new function EG3dSamplerFilter(){
   var o = this;
   o.Unknown       = 0;
   o.Nearest       = 1;
   o.Linear        = 2;
   o.Repeat        = 3;
   o.ClampToEdge   = 4;
   o.ClampToBorder = 5;
   return o;
}
var EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
var EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
function FG3dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._size               = null;
   o._capability         = null;
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o.construct           = FG3dContext_construct;
   o.linkCanvas          = FG3dContext_linkCanvas;
   o.size                = FG3dContext_size;
   o.capability          = FG3dContext_capability;
   o.createProgram       = RMethod.virtual(o, 'createProgram');
   o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
   o.createRenderTarget  = RMethod.virtual(o, 'createRenderTarget');
   o.setFillMode         = RMethod.virtual(o, 'setFillMode');
   o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
   o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
   o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
   o.setRenderTarget     = RMethod.virtual(o, 'setRenderTarget');
   o.setProgram          = RMethod.virtual(o, 'setProgram');
   o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = RMethod.virtual(o, 'bindTexture');
   o.clear               = RMethod.virtual(o, 'clear');
   o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
   o.present             = RMethod.virtual(o, 'present');
   o.dispose             = FG3dContext_dispose;
   return o;
}
function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._size = new SSize2();
}
function FG3dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}
function FG3dContext_size(){
   return this._size;
}
function FG3dContext_capability(){
   return this._capability;
}
function FG3dContext_dispose(){
   var o = this;
   o._program = null;
   o.__base.FGraphicContext.dispose.call(o);
}
function FG3dCubeTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.size = 0;
   o.construct = FG3dTexture_construct;
   return o;
}
function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Cube;
}
function FG3dFlatTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.width        = 0;
   o.height       = 0;
   o.construct    = FG3dFlatTexture_construct;
   return o;
}
function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Flat2d;
}
function FG3dFragmentShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function FG3dIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._strideCd = EG3dIndexStride.Uint16;
   o._count    = 0;
   o.strideCd  = FG3dIndexBuffer_strideCd;
   o.count     = FG3dIndexBuffer_count;
   o.upload    = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dIndexBuffer_strideCd(){
   return this._strideCd;
}
function FG3dIndexBuffer_count(){
   return this._count;
}
function FG3dProgram(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   o._vertexShader     = null;
   o._fragmentShader   = null;
   o.hasAttribute      = FG3dProgram_hasAttribute;
   o.registerAttribute = FG3dProgram_registerAttribute;
   o.findAttribute     = FG3dProgram_findAttribute;
   o.attributes        = FG3dProgram_attributes;
   o.hasParameter      = FG3dProgram_hasParameter;
   o.registerParameter = FG3dProgram_registerParameter;
   o.findParameter     = FG3dProgram_findParameter;
   o.parameters        = FG3dProgram_parameters;
   o.hasSampler        = FG3dProgram_hasSampler;
   o.registerSampler   = FG3dProgram_registerSampler;
   o.findSampler       = FG3dProgram_findSampler;
   o.samplers          = FG3dProgram_samplers;
   o.vertexShader      = RMethod.virtual(o, 'vertexShader');
   o.fragmentShader    = RMethod.virtual(o, 'fragmentShader');
   o.setAttribute      = FG3dProgram_setAttribute;
   o.setParameter      = FG3dProgram_setParameter;
   o.setParameter4     = FG3dProgram_setParameter4;
   o.setSampler        = FG3dProgram_setSampler;
   o.upload            = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = RClass.create(FG3dProgramAttribute);
   r._name = n;
   o.attributes().set(n, r);
   return r;
}
function FG3dProgram_findAttribute(n){
   return this._attributes ? this._attributes.get(n) : null;
}
function FG3dProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerParameter(pn, pf){
   var o = this;
   var r = RClass.create(FG3dProgramParameter);
   r._name = pn;
   r.formatCd = pf;
   o.parameters().set(pn, r);
   return r;
}
function FG3dProgram_findParameter(n){
   return this._parameters ? this._parameters.get(n) : null;
}
function FG3dProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerSampler(pn){
   var o = this;
   var r = RClass.create(FG3dProgramSampler);
   r._name = pn;
   o.samplers().set(pn, r);
   return r;
}
function FG3dProgram_findSampler(n){
   return this._samplers ? this._samplers.get(n) : null;
}
function FG3dProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new TDictionary();
   }
   return r;
}
function FG3dProgram_setAttribute(pn, pb, pf){
   var o = this;
   var p = o.findAttribute(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid attribute. (name={1})', pn);
   }
   o._context.bindVertexBuffer(p._slot, pb, 0, pf);
}
function FG3dProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.findParameter(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid parameter. (name={1})', pn);
   }
   var d = null;
   var t = pv.constructor;
   if((t == Float32Array) || (t == SMatrix3d) || (t == SPerspectiveMatrix3d)){
      d = pv;
   }else if(t == SColor4){
      d = RTypeArray.float4();
      d[0] = pv.red;
      d[1] = pv.green;
      d[2] = pv.blue;
      d[3] = pv.alpha;
   }else if((t == SPoint3) || (t == SVector3)){
      d = RTypeArray.float3();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
   }else if((t == SPoint4) || (t == SVector4)){
      d = RTypeArray.float4();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
      d[3] = pv.w;
   }else{
      throw new TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
   }
   o._context.bindConst(null, p._slot, p._formatCd, d, pc);
}
function FG3dProgram_setParameter4(pn, px, py, pz, pw){
   var v = RTypeArray.float4();
   v[0] = px;
   v[1] = py;
   v[2] = pz;
   v[3] = pw;
   this.setParameter(pn, v, 1);
}
function FG3dProgram_setSampler(pn, pt){
   var o = this;
   var p = o.findSampler(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid sampler. (name={1})', pn);
   }
   o._context.bindTexture(p._slot, p._index, pt);
}
function FG3dProgramAttribute(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._slot       = -1;
   o._index      = -1;
   o._formatCd   = EG3dAttributeFormat.Unknown;
   o.name        = FG3dProgramAttribute_name;
   o.linker      = FG3dProgramAttribute_linker;
   o.loadConfig  = FG3dProgramAttribute_loadConfig;
   return o;
}
function FG3dProgramAttribute_name(){
   return this._name;
}
function FG3dProgramAttribute_linker(){
   return this._linker;
}
function FG3dProgramAttribute_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dAttributeFormat, p.get('format'));
}
function FG3dProgramParameter(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._shaderCd   = -1;
   o._formatCd   = EG3dParameterFormat.Unknown;
   o._slot       = -1;
   o._size       = 0;
   o._buffer     = null;
   o.name        = FG3dProgramParameter_name;
   o.linker      = FG3dProgramParameter_linker;
   o.loadConfig  = FG3dProgramParameter_loadConfig;
   return o;
}
function FG3dProgramParameter_name(){
   return this._name;
}
function FG3dProgramParameter_linker(){
   return this._linker;
}
function FG3dProgramParameter_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dParameterFormat, p.get('format'));
}
function FG3dProgramSampler(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._formatCd   = EG3dTexture.Flat2d;
   o._bind       = true;
   o._slot       = -1;
   o._index      = 0;
   o._source     = null;
   o.name        = FG3dProgramSampler_name;
   o.linker      = FG3dProgramSampler_linker;
   o.formatCd    = FG3dProgramSampler_formatCd;
   o.loadConfig  = FG3dProgramSampler_loadConfig;
   return o;
}
function FG3dProgramSampler_name(){
   return this._name;
}
function FG3dProgramSampler_linker(){
   return this._linker;
}
function FG3dProgramSampler_formatCd(){
   return this._formatCd;
}
function FG3dProgramSampler_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._bind = RBoolean.parse(p.get('bind', 'Y'));
   o._formatCd = REnum.encode(EG3dTexture, p.get('format', 'Flat2d'));
}
function FG3dRenderTarget(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._size     = null;
   o._color    = null;
   o._textures = null;
   o.construct = FG3dRenderTarget_construct;
   o.size      = FG3dRenderTarget_size;
   o.color     = FG3dRenderTarget_color;
   o.textures  = FG3dRenderTarget_textures;
   return o;
}
function FG3dRenderTarget_construct(){
   var o = this;
   o.__base.FG3dObject.construct();
   o._size = new SSize2();
   o._color = new SColor4();
   o._color.set(0.0, 0.0, 0.0, 1.0);
}
function FG3dRenderTarget_size(){
   return this._size;
}
function FG3dRenderTarget_color(){
   return this._color;
}
function FG3dRenderTarget_textures(){
   var o = this;
   var r = o._textures;
   if(r == null){
      r = o._textures = new TObjects();
   }
   return r;
}
function FG3dShader(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._source = null;
   o.source  = FG3dShader_source;
   o.upload  = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dShader_source(){
   return this._source;
}
function FG3dTexture(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._textureCd   = EG3dTexture.Unknown;
   o._statusLoad  = false;
   o._filterMinCd = EG3dSamplerFilter.Linear;
   o._filterMagCd = EG3dSamplerFilter.Linear;
   o._wrapS       = EG3dSamplerFilter.Unknown;
   o._wrapT       = EG3dSamplerFilter.Unknown;
   o.textureCd    = FG3dTexture_textureCd;
   o.filterMinCd  = FG3dTexture_filterMinCd;
   o.filterMagCd  = FG3dTexture_filterMagCd;
   o.setFilter    = FG3dTexture_setFilter;
   o.wrapS        = FG3dTexture_wrapS;
   o.wrapT        = FG3dTexture_wrapT;
   o.setWrap      = FG3dTexture_setWrap;
   return o;
}
function FG3dTexture_textureCd(){
   return this._textureCd;
}
function FG3dTexture_filterMinCd(){
   return this._filterMinCd;
}
function FG3dTexture_filterMagCd(){
   return this._filterMagCd;
}
function FG3dTexture_setFilter(pi, pa){
   var o = this;
   o._filterMinCd = pi;
   o._filterMagCd = pa;
}
function FG3dTexture_wrapS(){
   return this._wrapS;
}
function FG3dTexture_wrapT(){
   return this._wrapT;
}
function FG3dTexture_setWrap(ps, pt){
   var o = this;
   o._wrapS = ps;
   o._wrapT = pt;
}
function FG3dVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name     = 0;
   o._formatCd = EG3dAttributeFormat.Unknown;
   o.stride    = 0;
   o.count     = 0;
   o.name   = FG3dVertexBuffer_name;
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dVertexBuffer_name(){
   return this._name;
}
function FG3dVertexShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function SG3dContextCapability(o){
   if(!o){o = this;}
   o.vendor                 = null;
   o.version                = null;
   o.shaderVersion          = null;
   o.attributeCount         = null;
   o.vertexCount            = 65536;
   o.vertexConst            = null;
   o.fragmentConst          = null;
   o.varyingCount           = null;
   o.samplerCount           = null;
   o.samplerSize            = null;
   o.calculateBoneCount     = SG3dContextCapability_calculateBoneCount;
   o.calculateInstanceCount = SG3dContextCapability_calculateInstanceCount;
   return o;
}
function SG3dContextCapability_calculateBoneCount(bc, vc){
   var o = this;
   var rb = 0;
   var bi = bc % 8;
   if(bi != 0){
      rb = bc + 8 - bi;
   }else{
      rb = bc;
   }
   var r = 0;
   var ib = (o.vertexConst - 16) / 4;
   if(rb > ib){
      r = ib;
   }else{
      r = rb;
   }
   return r;
}
function SG3dContextCapability_calculateInstanceCount(bc, vc){
   var o = this;
   var cr = (4 * bc) + 4;
   var ib = (o.vertexConst - 16) / cr;
   var r = cl;
   if(vc > 0){
      var iv = o.vertexCount / vc;
      r = Math.min(ib, iv);
   }
   if(r > 64){
      r = 64;
   }
   return r;
}
function FG3dAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dEffect);
   o._optionBlendMode = true;
   o._supportInstance         = false;
   o._supportVertexColor      = true;
   o._supportVertexCoord      = true;
   o._supportVertexNormal     = true;
   o._supportVertexNormalFull = true;
   o._supportInstance         = false;
   o._supportSkeleton         = false;
   o._supportAlpha            = true;
   o._supportAmbient          = true;
   o._supportDiffuse          = true;
   o._supportDiffuseView      = true;
   o._supportSpecularColor    = true;
   o._supportSpecularLevel    = true;
   o._supportSpecularView     = true;
   o._supportLight            = true;
   o._supportReflect          = true;
   o._supportRefract          = true;
   o._supportEmissive         = true;
   o._supportHeight           = true;
   o._supportEnvironment      = true;
   o._dynamicSkeleton         = true;
   o.buildInfo                = FG3dAutomaticEffect_buildInfo;
   o.bindAttributes           = FG3dAutomaticEffect_bindAttributes;
   o.bindSamplers             = FG3dAutomaticEffect_bindSamplers;
   o.bindMaterial             = FG3dAutomaticEffect_bindMaterial;
   return o;
}
function FG3dAutomaticEffect_buildInfo(pt, pc){
   var o = this;
   var s = new TString();
   var cb = o._context.capability();
   var ac = pc.attributeContains(EG3dAttribute.Color);
   o._dynamicVertexColor = (o._supportVertexColor && ac);
   if(o._dynamicVertexColor){
      s.append("|AC");
      pt.setBoolean("vertex.attribute.color", true);
   }
   var ad = pc.attributeContains(EG3dAttribute.Coord);
   o._dynamicVertexCoord = (o._supportVertexCoord && ad);
   if(o._dynamicVertexCoord){
      s.append("|AD");
      pt.setBoolean("vertex.attribute.coord", true);
   }
   var an = pc.attributeContains(EG3dAttribute.Normal);
   o._dynamicVertexNormal = (o._supportVertexNormal && an);
   if(o._dynamicVertexNormal){
      s.append("|AN");
      pt.setBoolean("vertex.attribute.normal", true);
   }
   var ab = pc.attributeContains(EG3dAttribute.Binormal);
   var at = pc.attributeContains(EG3dAttribute.Tangent);
   var af = (an && ab && at);
   o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
   if(o._dynamicVertexNormalFull){
      s.append("|AF");
      pt.setBoolean("vertex.attribute.normal.full", true);
   }
   o._dynamicInstance = (o._supportInstance && cb.optionInstance);
   if(o._dynamicInstance){
      s.append("|SI");
      if(pc){
         pt.setBoolean("support.instance", true);
      }
   }
   o._dynamicSkeleton = o._supportSkeleton;
   if(o._dynamicSkeleton){
      s.append("|SS");
      if(pc){
         pt.setBoolean("support.skeleton", true);
      }
   }
   var sdf  = pc.samplerContains(EG3dSampler.Diffuse);
   o._dynamicAlpha = o._supportAlpha;
   if(o._dynamicAlpha){
      s.append("|RA");
      if(pc){
         pt.setBoolean("support.alpha", true);
      }
      o._optionBlendMode = true;
   }else{
      o._optionBlendMode = false;
   }
   o._dynamicAmbient = o._supportAmbient;
   if(o._dynamicAmbient){
      s.append("|TA");
      if(pc){
         pt.setBoolean("support.ambient", true);
      }
      if(sdf){
         s.append("|TAS");
         if(pc){
            pt.setBoolean("support.ambient.sampler", true);
         }
      }
   }
   var snr = pc.samplerContains(EG3dSampler.Normal);
   o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
   if(o._supportDiffuse){
      if(pc){
         pt.setBoolean("support.diffuse", true);
      }
      if(snr){
         s.append("|TDD");
         if(pc){
            pt.setBoolean("support.dump", true);
            pt.setBoolean("support.diffuse.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         s.append("|TDN");
         if(pc){
            pt.setBoolean("support.diffuse.normal", true);
         }
      }
   }
   o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
   if(o._supportDiffuseView){
      if(pc){
         pt.setBoolean("support.diffuse.view", true);
      }
      if(snr){
         s.append("|TDVD");
         if(pc){
            pt.setBoolean("support.dump", true);
            pt.setBoolean("support.diffuse.view.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         s.append("|TDVN");
         if(pc){
            pt.setBoolean("support.diffuse.view.normal", true);
         }
      }
   }
   var spc = pc.samplerContains(EG3dSampler.SpecularColor);
   var spl = pc.samplerContains(EG3dSampler.SpecularLevel);
   o._dynamicSpecularColor = (o._supportSpecularColor && spc);
   o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
   if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
      s.append("|TS");
      if(pc){
         pt.setBoolean("support.specular", true);
      }
      if(o._dynamicSpecularColor){
         s.append("|TSC");
         if(pc){
            pt.setBoolean("support.specular.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         s.append("|TSL");
         if(pc){
            pt.setBoolean("support.specular.level", true);
         }
      }else{
         s.append("|NSL");
         if(pc){
            pt.setBoolean("support.specular.normal", true);
         }
      }
   }
   o._dynamicSpecularView = o._supportSpecularView;
   if(o._dynamicSpecularView && o._dynamicVertexNormal){
      s.append("|TSV");
      if(pc){
         pt.setBoolean("support.specular.view", true);
      }
      if(o._dynamicSpecularColor){
         s.append("|TSVC");
         if(pc){
            pt.setBoolean("support.specular.view.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         s.append("|TSVL");
         if(pc){
            pt.setBoolean("support.specular.view.level", true);
         }
      }else{
         s.append("|NSVL");
         if(pc){
            pt.setBoolean("support.specular.view.normal", true);
         }
      }
   }
   var slg = pc.samplerContains(EG3dSampler.Light);
   o._dynamicLight = (o._supportLight && slg);
   if(o._dynamicLight){
      s.append("|TL");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.light", true);
      }
   }
   var slr = pc.samplerContains(EG3dSampler.Reflect);
   o._dynamicReflect = (o._supportReflect && slr);
   if(o._dynamicReflect){
      s.append("|TRL");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.reflect", true);
      }
   }
   var slf = pc.samplerContains(EG3dSampler.Refract);
   o._dynamicRefract = (o._supportRefract && slf);
   if(o._dynamicRefract){
      s.append("|TRF");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.refract", true);
      }
   }
   var sle = pc.samplerContains(EG3dSampler.Emissive);
   o._dynamicEmissive = (o._supportEmissive && sle);
   if(o._dynamicEmissive){
      s.append("|TLE");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.emissive", true);
      }
   }
   var shg = pc.samplerContains(EG3dSampler.Height);
   o._dynamicHeight = (o._supportHeight && shg);
   if(o._dynamicHeight){
      s.append("|TH");
      if(pc){
         pt.setBoolean("support.height", true);
      }
   }
   var sen = pc.samplerContains(EG3dSampler.Environment);
   o._dynamicEnvironment = (o._supportEnvironment && sen);
   if(o._dynamicEnvironment){
      s.append("|TE");
      if(pc){
         pt.setBoolean("support.environment", true);
      }
   }
   o._dynamicInstance = o._supportInstance;
   if(o._dynamicInstance){
      var ic = cb.calculateInstanceCount(pc.vertexBoneCount, pc.vertexCount);
      pt.set("instance.count", ic);
   }
   if(o._dynamicSkeleton){
      var bc = cb.calculateBoneCount(pc.vertexBoneCount, pc.vertexCount);
      s.append("|B" + bc);
      pt.set("bone.count", bc);
      pt.setBoolean("support.bone.weight.1", true);
      pt.setBoolean("support.bone.weight.2", true);
      pt.setBoolean("support.bone.weight.3", true);
      pt.setBoolean("support.bone.weight.4", true);
   }
   pt.code = s.toString();
}
function FG3dAutomaticEffect_bindAttributes(p){
   var o = this;
   var g = o._program;
   if(g.hasAttribute()){
      var as = g.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = p.findVertexBuffer(a._linker);
            g.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
}
function FG3dAutomaticEffect_bindSamplers(p){
   var o = this;
   var g = o._program;
   if(g.hasSampler()){
      var ss = g.samplers();
      var sc = ss.count();
      for(var n = 0; n < sc; n++){
         var s = ss.value(n);
         if(s._bind && s._statusUsed){
            var ln = s.linker();
            var sp = p.findTexture(ln);
            g.setSampler(s.name(), sp.texture());
         }
      }
   }
}
function FG3dAutomaticEffect_bindMaterial(p){
   var o = this;
   var c = o._context;
   var m = p.info();
   if(m.optionAlpha){
      c.setBlendFactors(o._stateBlend, o._stateBlendSourceCd, o._stateBlendTargetCd);
   }else{
      c.setBlendFactors(false);
   }
   if(m.optionDouble){
      c.setCullingMode(false);
   }else{
      c.setCullingMode(o._stateDepth, o._stateCullCd);
   }
}
function FG3dGeneralColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'general.color.automatic';
   o.drawRenderable = FG3dGeneralColorAutomaticEffect_drawRenderable;
   return o;
}
function FG3dGeneralColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dGeneralColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._name      = 'color';
   o.drawRegion = FG3dGeneralColorPass_drawRegion;
   return o;
}
function FG3dGeneralColorPass_drawRegion(p){
   var o = this;
   var c = o._context;
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
function FG3dGeneralColorSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'shadow.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FG3dGeneralColorSkeletonEffect_drawRenderable;
   return o;
}
function FG3dGeneralColorSkeletonEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   var bs = pr.bones();
   if(bs){
      var bc = pr._boneLimit;
      var d = RTypeArray.findTemp(EDataType.Float, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dGeneralTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._name      = 'general';
   o._passColor = null;
   o.setup      = FG3dGeneralTechnique_setup;
   o.passColor  = FG3dGeneralTechnique_passColor;
   return o;
}
function FG3dGeneralTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var p = o._passColor = RClass.create(FG3dGeneralColorPass);
   p.linkContext(o._context);
   p.setup();
   o._passes.push(p);
}
function FG3dGeneralTechnique_passColor(){
   return this._passColor;
}
function FG3dShadowColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'shadow.color.automatic';
   o.drawRenderable = FG3dShadowColorAutomaticEffect_drawRenderable;
   return o;
}
function FG3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vcvpm = pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var vlvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
   var vlvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
   var vlci = pg.calculate(EG3dRegionParameter.LightInfo);
   var tp = pg.techniquePass();
   var m = pr.material();
   o.bindMaterial(m);
   p.setParameter('vc_light_depth', vlci);
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_vp_matrix', vcvpm);
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('vc_light_view_matrix', vlvm);
   p.setParameter('vc_light_vp_matrix', vlvpm);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   p.setParameter4('fc_light_depth', 1.0 / 4096.0, 0.0, -1.0 / 4096.0, vlci.w);
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   o.bindAttributes(pr);
   p.setSampler('fs_light_depth', tp.textureDepth());
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dShadowColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._name           = 'color';
   o._textureDepth   = null;
   o.textureDepth    = FG3dShadowColorPass_textureDepth;
   o.setTextureDepth = FG3dShadowColorPass_setTextureDepth;
   o.drawRegion      = FG3dShadowColorPass_drawRegion;
   return o;
}
function FG3dShadowColorPass_textureDepth(){
   return this._textureDepth;
}
function FG3dShadowColorPass_setTextureDepth(p){
   this._textureDepth = p;
}
function FG3dShadowColorPass_drawRegion(p){
   var o = this;
   var c = o._context;
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
function FG3dShadowColorSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'shadow.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FG3dShadowColorSkeletonEffect_drawRenderable;
   return o;
}
function FG3dShadowColorSkeletonEffect_drawRenderable(pr, r){
   var o = this;
   var c = o._context;
   var p = o._program;
   var prvp = pr.matrixViewProjection();
   var prcp = pr.cameraPosition();
   var prld = pr.lightDirection();
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
   if(p.hasSampler()){
      var ss = p.samplers();
      var sc = ss.count();
      for(var n = 0; n < sc; n++){
         var s = ss.value(n);
         if(s._statusUsed){
            var ln = s.linker();
            var sp = r.findTexture(ln);
            if(sp != null){
               p.setSampler(s.name(), sp.texture());
            }else{
               throw new TError("Can't find sampler. (linker={1})", ln);
            }
         }
      }
   }
   p.setParameter('vc_model_matrix', r.matrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   var m = r.material();
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   var bs = r.bones();
   if(bs){
      var bc = bs.count();
      if(bc > 32){
         bc = 32;
      }
      var d = RTypeArray.findTemp(EDataType.Float, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dShadowDepthAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'shadow.depth.automatic';
   o.drawRenderable = FG3dShadowDepthAutomaticEffect_drawRenderable;
   return o;
}
function FG3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   var lvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
   var lvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
   var lci = pg.calculate(EG3dRegionParameter.LightInfo);
   c.setBlendFactors(false);
   p.setParameter('vc_camera', lci);
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_view_matrix', lvm);
   p.setParameter('vc_vp_matrix', lvpm);
   p.setParameter('fc_camera', lci);
   p.setParameter4('fc_alpha', 0, 0, 0, 0.1);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dShadowDepthPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._name         = 'depth';
   o._renderTarget = null;
   o._textureDepth = null;
   o._renderTarget = null;
   o.setup         = FG3dShadowDepthPass_setup;
   o.textureDepth  = FG3dShadowDepthPass_textureDepth;
   o.drawRegion    = FG3dShadowDepthPass_drawRegion;
   return o;
}
function FG3dShadowDepthPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._context;
   var d = o._textureDepth = c.createFlatTexture();
   d.setFilter(EG3dSamplerFilter.Linear, EG3dSamplerFilter.Linear);
   d.setWrap(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(2048, 2048);
   t.textures().push(d);
   t.build();
}
function FG3dShadowDepthPass_textureDepth(){
   return this._textureDepth;
}
function FG3dShadowDepthPass_drawRegion(p){
   var o = this;
   var c = o._context;
   if(o._finish){
      c.setRenderTarget(null);
      var bc = p._backgroundColor;
      o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   }else{
      c.setRenderTarget(o._renderTarget);
      c.clear(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
   }
   p._textureDepth = o._textureDepth;
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
function FG3dShadowDepthSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'shadow.depth.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FG3dShadowDepthSkeletonEffect_drawRenderable;
   return o;
}
function FG3dShadowDepthSkeletonEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   p.setParameter('vc_model_matrix', r.matrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   var m = r.material();
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   var bs = pr.bones();
   if(bs){
      var bc = bs.count();
      if(bc > 32){
         bc = 32;
      }
      var d = RTypeArray.findTemp(EDataType.Float, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dShadowTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._name        = 'shadow';
   o._passDepth   = null;
   o._passColor   = null;
   o.setup        = FG3dShadowTechnique_setup;
   o.passDepth    = FG3dShadowTechnique_passDepth;
   o.passColor    = FG3dShadowTechnique_passColor;
   o.updateRegion = FG3dShadowTechnique_updateRegion;
   return o;
}
function FG3dShadowTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var ps = o._passes;
   var pd = o._passDepth = RClass.create(FG3dShadowDepthPass);
   pd.linkContext(o._context);
   pd.setup();
   ps.push(pd);
   var pc = o._passColor = RClass.create(FG3dShadowColorPass);
   pc.linkContext(o._context);
   pc.setup();
   ps.push(pc);
   pc.setTextureDepth(pd.textureDepth());
}
function FG3dShadowTechnique_passDepth(){
   return this._passDepth;
}
function FG3dShadowTechnique_passColor(){
   return this._passColor;
}
function FG3dShadowTechnique_updateRegion(p){
   var o = this;
   o.__base.FG3dTechnique.updateRegion.call(o, p);
   var c = p.camera();
   var l = p.directionalLight();
   l.camera().updateFlatCamera(c);
}
function FWglContext(o){
   o = RClass.inherits(this, o, FG3dContext);
   o._native             = null;
   o._activeRenderTarget = null;
   o._activeTextureSlot  = 0;
   o._parameters         = null;
   o._extensions         = null;
   o._data9              = null;
   o._data16             = null;
   o.construct           = FWglContext_construct;
   o.linkCanvas          = FWglContext_linkCanvas;
   o.parameters          = FWglContext_parameters;
   o.extensions          = FWglContext_extensions;
   o.createProgram       = FWglContext_createProgram;
   o.createVertexBuffer  = FWglContext_createVertexBuffer;
   o.createIndexBuffer   = FWglContext_createIndexBuffer;
   o.createFlatTexture   = FWglContext_createFlatTexture;
   o.createCubeTexture   = FWglContext_createCubeTexture;
   o.createRenderTarget  = FWglContext_createRenderTarget;
   o.setViewPort         = FWglContext_setViewPort;
   o.setFillMode         = FWglContext_setFillMode;
   o.setDepthMode        = FWglContext_setDepthMode;
   o.setCullingMode      = FWglContext_setCullingMode;
   o.setBlendFactors     = FWglContext_setBlendFactors;
   o.setScissorRectangle = FWglContext_setScissorRectangle;
   o.setRenderTarget     = FWglContext_setRenderTarget;
   o.setProgram          = FWglContext_setProgram;
   o.bindConst           = FWglContext_bindConst;
   o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
   o.bindTexture         = FWglContext_bindTexture;
   o.clear               = FWglContext_clear;
   o.drawTriangles       = FWglContext_drawTriangles;
   o.present             = FWglContext_present;
   o.checkError          = FWglContext_checkError;
   return o;
}
function FWglContext_construct(){
   var o = this;
   o.__base.FG3dContext.construct.call(o);
   o._capability = new SWglContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
}
function FWglContext_linkCanvas(h){
   var o = this;
   o.__base.FG3dContext.linkCanvas.call(o, h)
   o._hCanvas = h;
   if(h.getContext){
      var n = h.getContext('webgl');
      if(n == null){
         n = h.getContext('experimental-webgl', {antialias:true});
      }
      if(n == null){
         throw new TError("Current browser can't support WebGL technique.");
      }
      o._native = n;
   }
   var g = o._native;
   o.setViewPort(h.width, h.height);
   o.setDepthMode(true, EG3dDepthMode.LessEqual);
   o.setCullingMode(true, EG3dCullMode.Front);
   var c = o._capability;
   c.vendor = g.getParameter(g.VENDOR);
   c.version = g.getParameter(g.VERSION);
   c.shaderVersion = g.getParameter(g.SHADING_LANGUAGE_VERSION);
   c.attributeCount = g.getParameter(g.MAX_VERTEX_ATTRIBS);
   c.vertexConst = g.getParameter(g.MAX_VERTEX_UNIFORM_VECTORS);
   c.varyingCount = g.getParameter(g.MAX_VARYING_VECTORS);
   c.fragmentConst = g.getParameter(g.MAX_FRAGMENT_UNIFORM_VECTORS);
   c.samplerCount = g.getParameter(g.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
   c.samplerSize = g.getParameter(g.MAX_TEXTURE_SIZE);
}
function FWglContext_parameters(){
   var o = this;
   var r = o._parameters;
   if(r){
      return r;
   }
   var ns =['ACTIVE_TEXTURE',
      'ALIASED_LINE_WIDTH_RANGE',
      'ALIASED_POINT_SIZE_RANGE',
      'ALPHA_BITS',
      'ARRAY_BUFFER_BINDING',
      'BLEND',
      'BLEND_COLOR',
      'BLEND_DST_ALPHA',
      'BLEND_DST_RGB',
      'BLEND_EQUATION_ALPHA',
      'BLEND_EQUATION_RGB',
      'BLEND_SRC_ALPHA',
      'BLEND_SRC_RGB',
      'BLUE_BITS',
      'COLOR_CLEAR_VALUE',
      'COLOR_WRITEMASK',
      'COMPRESSED_TEXTURE_FORMATS',
      'CULL_FACE',
      'CULL_FACE_MODE',
      'CURRENT_PROGRAM',
      'DEPTH_BITS',
      'DEPTH_CLEAR_VALUE',
      'DEPTH_FUNC',
      'DEPTH_RANGE',
      'DEPTH_TEST',
      'DEPTH_WRITEMASK',
      'DITHER',
      'ELEMENT_ARRAY_BUFFER_BINDING',
      'FRAMEBUFFER_BINDING',
      'FRONT_FACE',
      'GENERATE_MIPMAP_HINT',
      'GREEN_BITS',
      'IMPLEMENTATION_COLOR_READ_FORMAT',
      'IMPLEMENTATION_COLOR_READ_TYPE',
      'LINE_WIDTH',
      'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      'MAX_CUBE_MAP_TEXTURE_SIZE',
      'MAX_FRAGMENT_UNIFORM_VECTORS',
      'MAX_RENDERBUFFER_SIZE',
      'MAX_TEXTURE_IMAGE_UNITS',
      'MAX_TEXTURE_SIZE',
      'MAX_VARYING_VECTORS',
      'MAX_VERTEX_ATTRIBS',
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      'MAX_VERTEX_UNIFORM_VECTORS',
      'MAX_VIEWPORT_DIMS',
      'PACK_ALIGNMENT',
      'POLYGON_OFFSET_FACTOR',
      'POLYGON_OFFSET_FILL',
      'POLYGON_OFFSET_UNITS',
      'RED_BITS',
      'RENDERBUFFER_BINDING',
      'RENDERER',
      'SAMPLE_BUFFERS',
      'SAMPLE_COVERAGE_INVERT',
      'SAMPLE_COVERAGE_VALUE',
      'SAMPLES',
      'SCISSOR_BOX',
      'SCISSOR_TEST',
      'SHADING_LANGUAGE_VERSION',
      'STENCIL_BACK_FAIL',
      'STENCIL_BACK_FUNC',
      'STENCIL_BACK_PASS_DEPTH_FAIL',
      'STENCIL_BACK_PASS_DEPTH_PASS',
      'STENCIL_BACK_REF',
      'STENCIL_BACK_VALUE_MASK',
      'STENCIL_BACK_WRITEMASK',
      'STENCIL_BITS',
      'STENCIL_CLEAR_VALUE',
      'STENCIL_FAIL',
      'STENCIL_FUNC',
      'STENCIL_PASS_DEPTH_FAIL',
      'STENCIL_PASS_DEPTH_PASS',
      'STENCIL_REF',
      'STENCIL_TEST',
      'STENCIL_VALUE_MASK',
      'STENCIL_WRITEMASK',
      'SUBPIXEL_BITS',
      'TEXTURE_BINDING_2D',
      'TEXTURE_BINDING_CUBE_MAP',
      'UNPACK_ALIGNMENT',
      'UNPACK_COLORSPACE_CONVERSION_WEBGL',
      'UNPACK_FLIP_Y_WEBGL',
      'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
      'VENDOR',
      'VERSION',
      'VIEWPORT'];
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getParameter(g[n]);
   }
   o._parameters = r;
   return r;
}
function FWglContext_extensions(){
   var o = this;
   var r = o._extensions;
   if(r){
      return r;
   }
   var ns =[
      'ANGLE_instanced_arrays',
      'EXT_blend_minmax',
      'EXT_color_buffer_float',
      'EXT_color_buffer_half_float',
      'EXT_disjoint_timer_query',
      'EXT_frag_depth',
      'EXT_sRGB',
      'EXT_shader_texture_lod',
      'EXT_texture_filter_anisotropic',
      'OES_element_index_uint',
      'OES_standard_derivatives',
      'OES_texture_float',
      'OES_texture_float_linear',
      'OES_texture_half_float',
      'OES_texture_half_float_linear',
      'OES_vertex_array_object',
      'WEBGL_color_buffer_float',
      'WEBGL_compressed_texture_atc',
      'WEBGL_compressed_texture_es3',
      'WEBGL_compressed_texture_etc1',
      'WEBGL_compressed_texture_pvrtc',
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_debug_renderer_info',
      'WEBGL_debug_shader_precision',
      'WEBGL_debug_shaders',
      'WEBGL_depth_texture',
      'WEBGL_draw_buffers',
      'WEBGL_draw_elements_no_range_check',
      'WEBGL_dynamic_texture',
      'WEBGL_lose_context',
      'WEBGL_security_sensitive_resources',
      'WEBGL_shared_resources',
      'WEBGL_subscribe_uniform',
      'WEBGL_texture_from_depth_video'];
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getExtension(n);
   }
   o._extensions = r;
   return r;
}
function FWglContext_createProgram(){
   var o = this;
   var r = RClass.create(FWglProgram);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createVertexBuffer(){
   var o = this;
   var r = RClass.create(FWglVertexBuffer);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createIndexBuffer(){
   var o = this;
   var r = RClass.create(FWglIndexBuffer);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createFlatTexture(){
   var o = this;
   var r = RClass.create(FWglFlatTexture);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createCubeTexture(){
   var o = this;
   var r = RClass.create(FWglCubeTexture);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createRenderTarget(){
   var o = this;
   var r = RClass.create(FWglRenderTarget);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_setViewPort(w, h){
   var g = this._native;
   g.viewportWidth = w;
   g.viewportHeight = h;
   g.viewport(0, 0, w, h);
}
function FWglContext_setFillMode(){
}
function FWglContext_setDepthMode(f, v){
   var o = this;
   var g = o._native;
   if((o._optionDepth == f) && (o._depthModeCd == v)){
      return true;
   }
   if(o._optionDepth != f){
      if(f){
         g.enable(g.DEPTH_TEST);
      }else{
         g.disable(g.DEPTH_TEST);
      }
      o._optionDepth = f;
   }
   if(f && (o._depthModeCd != v)){
      var r = RWglUtility.convertDepthMode(g, v);
      g.depthFunc(r);
      o._depthModeCd = v;
   }
   return true;
}
function FWglContext_setCullingMode(f, v){
   var o = this;
   var g = o._native;
   if((o._optionCull == f) && (o._optionCull == v)){
      return true;
   }
   if(o._optionCull != f){
      if(f){
         g.enable(g.CULL_FACE);
      }else{
         g.disable(g.CULL_FACE);
      }
      o._optionCull = f;
   }
   if(f && (o._cullModeCd != v)){
      var r = RWglUtility.convertCullMode(g, v);
      g.cullFace(r);
      o._cullModeCd = v;
   }
   return true;
}
function FWglContext_setBlendFactors(f, vs, vt){
   var o = this;
   var g = o._native;
   if((o._statusBlend == f) && (o._blendSourceCd == vs) && (o._blendTargetCd == vt)){
      return true;
   }
   if(o._statusBlend != f){
      if(f){
         g.enable(g.BLEND);
      }else{
         g.disable(g.BLEND);
      }
      o._statusBlend = f;
   }
   if(f && ((o._blendSourceCd != vs) || (o._blendTargetCd != vt))){
      var gs = RWglUtility.convertBlendFactors(g, vs);
      var gt = RWglUtility.convertBlendFactors(g, vt);
      g.blendFunc(gs, gt);
      o._blendSourceCd = vs;
      o._blendTargetCd = vt;
   }
   return true;
}
function FWglContext_setScissorRectangle(l, t, w, h){
   this._native.scissor(l, t, w, h);
}
function FWglContext_setRenderTarget(p){
   var o = this;
   var g = o._native;
   var r = true;
   if(p == null){
      g.bindFramebuffer(g.FRAMEBUFFER, null);
      r = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
      if(!r){
         return r;
      }
      g.viewport(0, 0, o._size.width, o._size.height);
   }else{
      g.bindFramebuffer(g.FRAMEBUFFER, p._native);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", p._native);
      if(!r){
         return r;
      }
      var s = p.size();
      g.viewport(0, 0, s.width, s.height);
   }
   o._activeRenderTarget = p;
}
function FWglContext_setProgram(v){
   var o = this;
   var g = o._native;
   if(v != null){
      g.useProgram(v._native);
   }else{
      g.useProgram(null);
   }
   _program = v;
   var r = o.checkError("useProgram", "Set program failure. (program={1}, program_id={2})", v, v._native);
   return r;
}
function FWglContext_bindConst(psc, psl, pdf, pdt, pdc){
   var o = this;
   var g = o._native;
   var r = true;
   switch(pdf){
      case EG3dParameterFormat.Float1:{
         g.uniform1fv(psl, pdt);
         r = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float2:{
         g.uniform2fv(psl, pdt);
         r = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3:{
         g.uniform3fv(psl, pdt);
         r = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4:{
         g.uniform4fv(psl, pdt);
         r = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3x3:{
         var dt = o._data9;
         dt[ 0] = pdt[ 0];
         dt[ 1] = pdt[ 4];
         dt[ 2] = pdt[ 8];
         dt[ 3] = pdt[ 1];
         dt[ 4] = pdt[ 5];
         dt[ 5] = pdt[ 9];
         dt[ 6] = pdt[ 2];
         dt[ 7] = pdt[ 6];
         dt[ 8] = pdt[10];
         g.uniformMatrix3fv(psl, g.FALSE, dt);
         r = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x3:{
         if(length % 48 != 0){
            RLogger.fatal(o, null, "Count is invalid. (count=%d)", pdc);
            return false;
         }
         var count = length / 48;
         g.uniform4fv(psl, g.FALSE, pd);
         r = o.checkError("uniform4fv", "Bind const matrix4x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x4:{
         if(pdt.constructor == Float32Array){
            g.uniformMatrix4fv(psl, g.FALSE, pdt);
         }else if(pdt.writeData){
            var d = o._data16;
            pdt.writeData(d, 0);
            g.uniformMatrix4fv(psl, g.FALSE, d);
         }else{
            throw new TError('Unknown data type.');
         }
         r = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd=%d, slot=%d, pData=0x%08X, count=%d)", psc, psl, pdt, pdc);
         break;
      }
   }
   return r;
}
function FWglContext_bindVertexBuffer(s, b, i, f){
   var o = this;
   var g = o._native;
   var r = true;
   var n = null;
   if(b != null){
      n = b._native;
   }
   g.bindBuffer(g.ARRAY_BUFFER, n);
   r = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", n);
   if(!r){
      return r;
   }
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
   var bs = b.stride;
   switch(f){
      case EG3dAttributeFormat.Float1:
         g.vertexAttribPointer(s, 1, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float2:
         g.vertexAttribPointer(s, 2, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float3:
         g.vertexAttribPointer(s, 3, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float4:
         g.vertexAttribPointer(s, 4, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4Normal:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, true, bs, i);
         break;
      default:
         RLogger.fatal(o, null, "Unknown vertex format. (format_cd=%d)", formatCd);
         break;
   }
   r = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", s, f);
   return r;
}
function FWglContext_bindTexture(ps, pi, pt){
   var o = this;
   var g = o._native;
   var r = true;
   if(pt == null){
      g.bindTexture(g.TEXTURE_2D, null);
      r = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", ps);
      return r;
   }
   if(o._activeTextureSlot != ps){
      g.uniform1i(ps, pi);
      g.activeTexture(g.TEXTURE0 + pi);
      r = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", ps, pi);
      if(!r){
         return r;
      }
      o._renderTextureActiveSlot = ps;
   }
   var gt = null;
   switch(pt.textureCd()){
      case EG3dTexture.Flat2d:{
         gt = g.TEXTURE_2D;
         g.bindTexture(g.TEXTURE_2D, pt._native);
         r = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", pt._native);
         if(!r){
            return r;
         }
         break;
      }
      case EG3dTexture.Cube:{
         gt = g.TEXTURE_CUBE_MAP;
         g.bindTexture(g.TEXTURE_CUBE_MAP, pt._native);
         r = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", pt._native);
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
   var fc = RWglUtility.convertSamplerFilter(g, pt.filterMinCd());
   if(fc){
      g.texParameteri(gt, g.TEXTURE_MIN_FILTER, fc);
   }
   var fc = RWglUtility.convertSamplerFilter(g, pt.filterMagCd());
   if(fc){
      g.texParameteri(gt, g.TEXTURE_MAG_FILTER, fc);
   }
   var ws = RWglUtility.convertSamplerFilter(g, pt.wrapS());
   if(ws){
   }
   var wt = RWglUtility.convertSamplerFilter(g, pt.wrapT());
   if(wt){
   }
   return r;
}
function FWglContext_clear(r, g, b, a, d){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clearDepth(d);
   c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
}
function FWglContext_drawTriangles(b, i, c){
   var o = this;
   var g = o._native;
   var r = true;
   if(i == null){
      i = 0;
   }
   if(c == null){
      c = b.count();
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, b._native);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", b, i, c, b._native);
   if(!r){
       return r;
   }
   var strideCd = RWglUtility.convertIndexStride(g, b.strideCd());
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
function FWglContext_present(){
}
function FWglContext_checkError(c, m, p1){
   if(!RRuntime.isDebug()){
      return true;
   }
   var o = this;
   var g = o._native;
   var r = false;
   var e = null;
   var es = null;
   while(true){
      e = g.getError();
      if(e == g.NO_ERROR){
         r = true;
         break;
      }
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
   if(!r){
      RLogger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', e, es);
   }
   return r;
}
function FWglCubeTexture(o){
   o = RClass.inherits(this, o, FG3dCubeTexture);
   o._native = null;
   o.setup   = FWglCubeTexture_setup;
   o.link    = FWglCubeTexture_link;
   o.upload  = FWglCubeTexture_upload;
   return o;
}
function FWglCubeTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FG3dCubeTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglCubeTexture_link(v){
   this._texture = v;
}
function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
   var r = c.checkError("texImage2D", "Upload cube image failure.");
   o._statusLoad = r;
}
function FWglFlatTexture(o){
   o = RClass.inherits(this, o, FG3dFlatTexture);
   o._native     = null;
   o.onImageLoad = FWglFlatTexture_onImageLoad;
   o.setup       = FWglFlatTexture_setup;
   o.loadUrl     = FWglFlatTexture_loadUrl;
   o.upload      = FWglFlatTexture_upload;
   return o;
}
function FWglFlatTexture_onImageLoad(v){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, v);
   var r = c.checkError("texImage2D", "");
   o._statusLoad = r;
}
function FWglFlatTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FG3dFlatTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglFlatTexture_loadUrl(p){
   var o = this;
   var r = new Image();
   r.src = p;
   r.onload = function(){o.onImageLoad(o);}
}
function FWglFlatTexture_upload(p){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, p);
   var r = c.checkError("texImage2D", "Upload image failure.");
   o._statusLoad = r;
}
function FWglFragmentShader(o){
   o = RClass.inherits(this, o, FG3dFragmentShader);
   o._native = null;
   o.setup   = FWglFragmentShader_setup;
   o.upload  = FWglFragmentShader_upload;
   o.dispose = FWglFragmentShader_dispose;
   return o;
}
function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FG3dFragmentShader.setup.call(o);
   var g = o._context._native;
   o._native = g.createShader(g.FRAGMENT_SHADER);
}
function FWglFragmentShader_upload(v){
   var o = this;
   var g = o._context._native;
   var n = o._native;
   g.shaderSource(n, v);
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      RLogger.fatal(o, null, 'Upload fragment shader source failure. (error={1})\n{2}', i, v);
      g.deleteShader(n);
      o._native = null;
      return false;
   }
   o._source = v;
   return true;
}
function FWglFragmentShader_dispose(){
   var o = this;
   var g = o._context._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FG3dFragmentShader.dispose.call(o);
}
function FWglIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dIndexBuffer);
   o.setup  = FWglIndexBuffer_setup;
   o.upload = FWglIndexBuffer_upload;
   return o;
}
function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FG3dIndexBuffer.setup.call(o);
   o._native = o._context._native.createBuffer();
}
function FWglIndexBuffer_upload(pd, pc){
   var o = this;
   var c = o._context;
   var g = c._native;
   o._count = pc;
   var d = null;
   if(pd.constructor == Array){
      d = new Uint16Array(pd);
   }else if(pd.constructor == Uint16Array){
      d = pd;
   }else{
      RLogger.fatal(o, null, 'Upload index data type is invalid. (value={1})', pd);
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bind buffer failure.');
   g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'Upload buffer data. (count={1})', pc);
}
function FWglProgram(o){
   o = RClass.inherits(this, o, FG3dProgram);
   o._native        = null;
   o.setup          = FWglProgram_setup;
   o.vertexShader   = FWglProgram_vertexShader;
   o.fragmentShader = FWglProgram_fragmentShader;
   o.upload         = FWglProgram_upload;
   o.build          = FWglProgram_build;
   o.link           = FWglProgram_link;
   o.dispose        = FWglProgram_dispose;
   return o;
}
function FWglProgram_setup(){
   var o = this;
   var g = o._context._native;
   o._native = g.createProgram();
}
function FWglProgram_vertexShader(){
   var o = this;
   var s = o._vertexShader;
   if(s == null){
      s = RClass.create(FWglVertexShader);
      s.linkContext(o._context);
      s.setup();
      o._vertexShader = s;
   }
   return s;
}
function FWglProgram_fragmentShader(){
   var o = this;
   var s = o._fragmentShader;
   if(s == null){
      s = RClass.create(FWglFragmentShader);
      s.linkContext(o._context);
      s.setup();
      o._fragmentShader = s;
   }
   return s;
}
function FWglProgram_upload(t, s){
   var o = this;
   if(t == EG3dShader.Vertex){
      o.vertexShader().upload(s);
   }else if(t == EG3dShader.Fragment){
      o.fragmentShader().upload(s);
   }else{
      throw new Error('Unknown type');
   }
}
function FWglProgram_build(){
   var o = this;
   var c = o._context;
   var g = c._native;
   var pn = o._native;
   var vs = o.vertexShader();
   g.attachShader(pn, vs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vs._native);
   if(!r){
      return r;
   }
   var fs = o.fragmentShader();
   g.attachShader(pn, fs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fs._native);
   if(!r){
      return r;
   }
   if(o.hasAttribute()){
      var as = o.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         var an = a.name();
         g.bindAttribLocation(pn, n, an);
         r = c.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, an);
         if(!r){
            return r;
         }
      }
   }
}
function FWglProgram_link(){
   var o = this;
   var c = o._context;
   var g = c._native;
   var r = false;
   var pn = o._native;
   g.linkProgram(pn);
   var pr = g.getProgramParameter(pn, g.LINK_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      RLogger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
      g.deleteProgram(o._native);
      o._native = null;;
      return false;
   }
   g.validateProgram(pn);
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
   }
   g.finish();
   r = c.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
   if(!r){
      return r;
   }
   if(o.hasParameter()){
      var pc = o._parameters.count();
      for(var n = 0; n < pc; n++){
         var p = o._parameters.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;
         }
      }
   }
   if(o.hasAttribute()){
      var pc = o._attributes.count();
      for(var n = 0; n < pc; n++){
         var p = o._attributes.value(n);
         var i = g.getAttribLocation(pn, p.name());
         r = c.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != -1){
            p._statusUsed = true;
         }
      }
   }
   if(o.hasSampler()){
      var pc = o._samplers.count();
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;;
         }
      }
      var si = 0;
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         if(p._statusUsed){
            p._index = si++;
         }
      }
   }
   return r;
}
function FWglProgram_dispose(){
   var o = this;
   if(o._program){
      o._context._context.deleteProgram(o._program);
   }
   o._program = null;
   o.base.FProgram3d.dispose.call(o);
}
function FWglRenderTarget(o){
   o = RClass.inherits(this, o, FG3dRenderTarget);
   o._optionDepth = true;
   o._native      = null;
   o._nativeDepth = null;
   o.setup        = FWglRenderTarget_setup;
   o.build        = FWglRenderTarget_build;
   return o;
}
function FWglRenderTarget_setup(){
   var o = this;
   o.__base.FG3dRenderTarget.setup.call(o);
   var c = o._context;
   var g = c._native;
   o._native = g.createFramebuffer();
   return c.checkError('createFramebuffer', 'Create frame buffer failure.');
}
function FWglRenderTarget_build(){
   var o = this;
   var c = o._context;
   var g = c._native;
   g.bindFramebuffer(g.FRAMEBUFFER, o._native);
   var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
   if(!r){
      return r;
   }
   if(o._optionDepth){
      var nd = o._nativeDepth = g.createRenderbuffer();
      var r = c.checkError('createRenderbuffer', 'Create render buffer failure.');
      if(!r){
         return r;
      }
      g.bindRenderbuffer(g.RENDERBUFFER, nd);
      var r = c.checkError('bindRenderbuffer', 'Bind render buffer failure.');
      if(!r){
         return r;
      }
      g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, o._size.width, o._size.height);
      var r = c.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
      if(!r){
         return r;
      }
      g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, nd);
      var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._native, nd);
      if(!r){
         return r;
      }
   }
   var ts = o._textures;
   var tc = ts.count();
   for(var i = 0; i < tc; i++){
      var t = ts.get(i);
      g.bindTexture(g.TEXTURE_2D, t._native);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, o._size.width, o._size.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._native, o._size.width, o._size.height);
      if(!r){
         return r;
      }
      g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, t._native, 0);
      var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._native, t._native);
      if(!r){
         return r;
      }
   }
}
function FWglVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dVertexBuffer);
   o.setup  = FWglVertexBuffer_setup;
   o.upload = FWglVertexBuffer_upload;
   return o;
}
function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var g = o._context._native;
   o._native = g.createBuffer();
}
function FWglVertexBuffer_upload(v, s, c){
   var o = this;
   var c = o._context;
   var g = c._native;
   o.stride = s;
   o.count  = c;
   var d = null;
   if(v.constructor == Array){
      d = new Float32Array(v);
   }else if(v.constructor == Float32Array){
      d = v;
   }else{
      RLogger.fatal(o, null, 'Upload vertex data type is invalid. (value={1})', v);
   }
   g.bindBuffer(g.ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bindbuffer');
   g.bufferData(g.ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'bufferData');
}
function FWglVertexShader(o){
   o = RClass.inherits(this, o, FG3dVertexShader);
   o._native = null;
   o.setup   = FWglVertexShader_setup;
   o.upload  = FWglVertexShader_upload;
   o.dispose = FWglVertexShader_dispose;
   return o;
}
function FWglVertexShader_setup(){
   var o = this;
   o.__base.FG3dVertexShader.setup.call(o);
   var g = o._context._native;
   o._native = g.createShader(g.VERTEX_SHADER);
}
function FWglVertexShader_upload(v){
   var o = this;
   var g = o._context._native;
   var n = o._native;
   g.shaderSource(n, v);
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      RLogger.fatal(o, null, 'Upload vertex shader source failure. (error={1})\n{2}', i, v);
      g.deleteShader(n);
      o._native = null;
      return false;
   }
   o._source = v;
   return true;
}
function FWglVertexShader_dispose(){
   var o = this;
   var g = o._context._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FG3dVertexShader.dispose.call(o);
}
var RWglUtility = new function RWglUtility(){
   var o = this;
   o.convertFillMode      = RWglUtility_convertFillMode;
   o.convertCullMode      = RWglUtility_convertCullMode;
   o.convertDepthMode     = RWglUtility_convertDepthMode;
   o.convertBlendFactors  = RWglUtility_convertBlendFactors;
   o.convertIndexStride   = RWglUtility_convertIndexStride;
   o.convertSamplerFilter = RWglUtility_convertSamplerFilter;
   return o;
}
function RWglUtility_convertFillMode(g, v){
   switch(v){
      case EG3dFillMode.Point:
         return g.POINT;
      case EG3dFillMode.Line:
         return g.LINE;
      case EG3dFillMode.Face:
         return g.FILL;
   }
   throw new TError(this, "Convert fill mode failure. (fill_cd={1})", v);
}
function RWglUtility_convertCullMode(g, v){
   switch(v){
      case EG3dCullMode.Front:
         return g.FRONT;
      case EG3dCullMode.Back:
         return g.BACK;
      case EG3dCullMode.Both:
         return g.FRONT_AND_BACK;
   }
   throw new TError(this, "Convert cull mode failure. (cull_cd={1})", v);
}
function RWglUtility_convertDepthMode(g, v){
   switch(v){
      case EG3dDepthMode.Equal:
         return g.EQUAL;
      case EG3dDepthMode.NotEqual:
         return g.NOTEQUAL;
      case EG3dDepthMode.Less:
         return g.LESS;
      case EG3dDepthMode.LessEqual:
         return g.LEQUAL;
      case EG3dDepthMode.Greater:
         return g.GREATER;
      case EG3dDepthMode.GreaterEqual:
         return g.GEQUAL;
      case EG3dDepthMode.Always:
         return g.ALWAYS;
   }
   throw new TError(this, "Convert depth mode failure. (depth_cd={1})", v);
}
function RWglUtility_convertBlendFactors(g, v){
   switch(v){
      case EG3dBlendMode.SourceAlpha:
         return g.SRC_ALPHA;
      case EG3dBlendMode.OneMinusSourceAlpha:
         return g.ONE_MINUS_SRC_ALPHA;
      default:
         break;
   }
   throw new TError(this, "Convert blend factors failure. (blend_cd={1})", v);
}
function RWglUtility_convertIndexStride(g, v){
   switch(v){
      case EG3dIndexStride.Uint16:
         return g.UNSIGNED_SHORT;
      case EG3dIndexStride.Uint32:
         return g.UNSIGNED_INT;
   }
   throw new TError(this, "Convert index stride failure. (stride_cd={1})", v);
}
function RWglUtility_convertSamplerFilter(g, v){
   switch(v){
      case EG3dSamplerFilter.Unknown:
         return 0;
      case EG3dSamplerFilter.Nearest:
         return g.NEAREST;
      case EG3dSamplerFilter.Linear:
         return g.LINEAR;
      case EG3dSamplerFilter.Repeat:
         return g.REPEAT;
      case EG3dSamplerFilter.ClampToEdge:
         return g.CLAMP_TO_EDGE;
      case EG3dSamplerFilter.ClampToBorder:
         return g.CLAMP_TO_BORDER;
   }
   throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", v);
}
function SWglContextCapability(o){
   if(!o){o = this;}
   SG3dContextCapability(o);
   return o;
}
function FDisplay(o){
   o = RClass.inherits(this, o, FObject);
   o._name             = null;
   o._matrix           = null;
   o._location         = null;
   o._rotation         = null;
   o._scale            = null;
   o._visible          = true;
   o._renderables      = null;
   o.construct         = FDisplay_construct;
   o.isName            = FDisplay_isName;
   o.name              = FDisplay_name;
   o.matrix            = FDisplay_matrix;
   o.location          = FDisplay_location;
   o.rotation          = FDisplay_rotation;
   o.scale             = FDisplay_scale;
   o.hasRenderable     = FDisplay_hasRenderable;
   o.filterRenderables = FDisplay_filterRenderables;
   o.renderables       = FDisplay_renderables;
   o.pushRenderable    = FDisplay_pushRenderable;
   o.process           = FDisplay_process;
   o.update            = FDisplay_update;
   o.dispose           = FDisplay_dispose;
   return o;
}
function FDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._location = new SPoint3();
   o._rotation = new SVector3();
   o._scale = new SVector3();
   o._scale.set(1, 1, 1);
}
function FDisplay_isName(p){
   return this._name == p;
}
function FDisplay_name(){
   return this._name;
}
function FDisplay_matrix(){
   return this._matrix;
}
function FDisplay_location(){
   return this._location;
}
function FDisplay_rotation(){
   return this._rotation;
}
function FDisplay_scale(){
   return this._scale;
}
function FDisplay_hasRenderable(){
   var r = this._renderables;
   if(r != null){
      return !r.isEmpty();
   }
   return false;
}
function FDisplay_filterRenderables(p){
   var o = this;
   if(!o._visible){
      return false;
   }
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var n = 0; n < c; n++){
         var r = rs.get(n);
         if(r.testVisible()){
            p.pushRenderable(r);
         }
      }
   }
   return true;
}
function FDisplay_renderables(){
   var o = this;
   var r = o._renderables;
   if(r == null){
      r = o._renderables = new TObjects();
   }
   return r;
}
function FDisplay_pushRenderable(p){
   this.renderables().push(p);
}
function FDisplay_update(){
   var o = this;
   var m = o._matrix;
   m.set(o._location, o._rotation, o._scale);
   m.update();
}
function FDisplay_process(){
   var o = this;
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var i = 0; i < c; i++){
         rs.get(i).process();
      }
   }
}
function FDisplay_dispose(){
   var o = this;
   o._matrix = null;
   o._position = null;
   o._direction = null;
   o._scale = null;
   var rs = o._renderables;
   if(rs != null){
      rs.dispose();
      o._renderables = null
   }
   o.__base.FObject.dispose.call(o);
}
function FDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplay);
   o._displays         = null;
   o.construct         = FDisplayContainer_construct;
   o.hasDisplay        = FDisplayContainer_hasDisplay;
   o.findDisplay       = FDisplayContainer_findDisplay;
   o.searchDisplay     = FDisplayContainer_searchDisplay;
   o.filterRenderables = FDisplayContainer_filterRenderables;
   o.displays          = FDisplayContainer_displays;
   o.pushDisplay       = FDisplayContainer_pushDisplay;
   o.process           = FDisplayContainer_process;
   o.dispose           = FDisplayContainer_dispose;
   return o;
}
function FDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
}
function FDisplayContainer_hasDisplay(){
   var r = this._displays;
   if(r != null){
      return !r.isEmpty();
   }
   return false;
}
function FDisplayContainer_findDisplay(p){
   var o = this;
   if(o._displays == null){
      var cs = o._displays;
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.get(n);
         if(c.isName(p)){
            return c;
         }
      }
   }
   return null
}
function FDisplayContainer_searchDisplay(p){
   var o = this;
   if(o._displays == null){
      var cs = o._displays;
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.get(n);
         if(c.isName(p)){
            return c;
         }
         var r = c.searchDisplay(p);
         if(r != null){
            return r;
         }
      }
   }
   return null
}
function FDisplayContainer_filterRenderables(p){
   var o = this;
   o.__base.FDisplay.filterRenderables.call(o, p);
   if(!o._visible){
      return false;
   }
   var ds = o._displays;
   if(ds != null){
      var c = ds.count();
      for(var n = 0; n < c; n++){
         var d = ds.get(n);
         d.filterRenderables(p);
      }
   }
   return true;
}
function FDisplayContainer_process(p){
   var o = this;
   o.__base.FDisplay.process.call(o, p);
   var ds = o._displays;
   if(ds != null){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         ds.get(i).process(p);
      }
   }
}
function FDisplayContainer_displays(){
   var o = this;
   var r = o._displays;
   if(r == null){
      r = o._displays = new TObjects();
   }
   return r;
}
function FDisplayContainer_pushDisplay(p){
   this.displays().push(p);
}
function FDisplayContainer_dispose(){
   var o = this;
   var cs = o._displays;
   if(cs != null){
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.get(n);
         c.dispose();
      }
      cs.dispose();
      o._displays = null;
   }
   o.__base.FDisplay.dispose.call(o);
}
function FDisplayLayer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   o._statusActive = false;
   o.construct     = FDisplayLayer_construct;
   o.active        = FDisplayLayer_active;
   o.deactive      = FDisplayLayer_deactive;
   return o;
}
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
}
function FDisplayLayer_active(){
   this._statusActive = true;
}
function FDisplayLayer_deactive(){
   this._statusActive = false;
}
function FDrawable(o){
   o = RClass.inherits(this, o, FObject);
   o.left   = 0;
   o.top    = 0;
   o.set    = FDrawable_set;
   return o;
}
function FDrawable_set(l, t, w, h){
   var o = this;
   o.left = l;
   o.top = t;
}
function FStage(o){
   o = RClass.inherits(this, o, FObject);
   o._statusActive  = false;
   o._layers        = null;
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   o.construct     = FStage_construct;
   o.registerLayer = RStage_registerLayer;
   o.layers        = FStage_layers;
   o.active        = FStage_active;
   o.deactive      = FStage_deactive;
   o.process       = FStage_process;
   o.dispose       = FStage_dispose;
   return o;
}
function FStage_construct(){
   var o = this;
   o.__base.FObject.construct(o);
   o._layers = new TDictionary();
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}
function RStage_registerLayer(n, l){
   var o = this;
   var ls = o._layers;
   if(ls == null){
      ls = o._layers = new TDictionary();
   }
   ls.set(n , l);
}
function FStage_layers(){
   return this._layers;
}
function FStage_active(){
   var o = this;
   o._statusActive = true;
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).active();
      }
   }
}
function FStage_deactive(){
   var o = this;
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).deactive();
      }
   }
   o._statusActive = false;
}
function FStage_process(){
   var o = this;
   o.lsnsEnterFrame.process(o);
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).process();
      }
   }
   o.lsnsLeaveFrame.process(o);
}
function FStage_dispose(){
   var o = this;
   if(o._layers){
      o._layers.dispose();
      o._layers = null;
   }
   o.__base.FObject.dispose(o);
}
function FRenderCube(o){
   o = RClass.inherits(this, o, FObject);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup  = FRenderCube_setup;
   return o;
}
function FRenderCube_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0, -1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0 ];
   o.vertexPositionBuffer = p.createVertexBuffer();
   o.vertexPositionBuffer.upload(vp, 4 * 3, 8);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0 ];
   o.vertexColorBuffer = p.createVertexBuffer();
   o.vertexColorBuffer.upload(vc, 4 * 4, 8);
   var id = [
      0, 1, 2, 0, 2, 3,
      1, 5, 6, 1, 6, 2,
      5, 4, 7, 5, 7, 6,
      4, 0, 3, 4, 3, 7,
      0, 4, 5, 0, 5, 1,
      3, 2, 6, 3, 6, 7  ];
   o.indexBuffer = context.createIndexBuffer();
   o.indexBuffer.upload(id, 36);
}
function FRenderRectangle(o){
   o = RClass.inherits(this, o, FObject);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup  = FRenderRectangle_setup;
   return o;
}
function FRenderRectangle_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0 ];
   o.vertexPositionBuffer = p.createVertexBuffer();
   o.vertexPositionBuffer.upload(vp, 4 * 3, 4);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0 ];
   o.vertexColorBuffer = p.createVertexBuffer();
   o.vertexColorBuffer.upload(vc, 4 * 4, 4);
   var id = [0, 1, 2, 0, 2, 3];
   o.indexBuffer = context.createIndexBuffer();
   o.indexBuffer.upload(id, 6);
}
function FDisplay3d(o){
   o = RClass.inherits(this, o, FDisplay);
   o._materials = null;
   o.construct  = FDisplay3d_construct;
   o.materials  = FDisplay3d_materials;
   o.dispose    = FDisplay3d_dispose;
   return o;
}
function FDisplay3d_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._materials = new TDictionary();
}
function FDisplay3d_materials(){
   return this._materials;
}
function FDisplay3d_dispose(){
   var o = this;
   o._materials = null;
   o.__base.FDisplay.dispose.call(o);
}
function FModel3d(o){
   o = RClass.inherits(this, o, FDisplay3d);
   o._dataReady     = false;
   o._renderables   = null;
   o._animation     = null;
   o._geometrys     = null;
   o._renderable    = null;
   o.testReady      = FModel3d_testReady;
   o.loadRenderable = FModel3d_loadRenderable;
   o.processLoad    = FModel3d_processLoad;
   o.process        = FModel3d_process;
   return o;
}
function FModel3d_testReady(){
   return this._dataReady;
}
function FModel3d_loadRenderable(p){
   var o = this;
   var c = o._context;
   var r = p.resource();
   var rgs = p.geometrys();
   if(rgs){
      var c = rgs.count();
      if(c > 0){
         var gs = o._geometrys = new TObjects();
         var rs = o.renderables();
         for(var i = 0; i < c; i++){
            var rg = rgs.get(i);
            var g = RClass.create(FModelRenderable3d);
            g._display = o;
            g.load(rg);
            gs.push(g);
            rs.push(g);
         }
      }
   }
   var a = null;
   var ra = r.animation();
   if(ra){
      a = o._animation = RClass.create(FRd3Animation);
      var rk = r.skeleton();
      var rbs = rk.bones();
      var c = rbs.count();
      for(var i = 0; i < c; i++){
         var rb = rbs.value(i);
         var b = RClass.create(FRd3Bone);
         b.loadResource(rb);
         a.bones().set(b.id(), b);
      }
      a.loadResource(ra);
   }
   var gs = o._geometrys;
   if(gs){
      var c = gs.count();
      for(var i = 0; i < c; i++){
         gs.get(i).build(a);
      }
   }
   o._dataReady = true;
}
function FModel3d_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._renderable.testReady()){
      return false;
   }
   o.loadRenderable(o._renderable);
   return true;
}
function FModel3d_process(){
   var o = this;
   o.__base.FDisplay3d.process.call(o);
   if(o._animation){
      o._animation.process();
   }
   return true;
}
function FModel3dConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadModels = null;
   o._models     = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FModel3dConsole_onProcess;
   o.construct   = FModel3dConsole_construct;
   o.models      = FModel3dConsole_models;
   o.alloc       = FModel3dConsole_alloc;
   return o;
}
function FModel3dConsole_onProcess(){
   var o = this;
   var ms = o._loadModels;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}
function FModel3dConsole_construct(){
   var o = this;
   o._loadModels = new TLooper();
   o._models = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FModel3dConsole_models(){
   return this._models;
}
function FModel3dConsole_alloc(pc, pn){
   var o = this;
   var rmc = RConsole.find(FRd3ModelConsole);
   var rm = rmc.load(pc, pn);
   var m = RClass.create(FModel3d);
   m._context = pc;
   m._name = pn;
   m._renderable = rm;
   if(rm.testReady()){
      m.load(rm);
   }else{
      o._loadModels.push(m);
   }
   return m;
}
function FModelRenderable3d(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   o._ready            = false;
   o._renderable       = null;
   o._bones            = null;
   o._materialResource = null;
   o.construct         = FModelRenderable3d_construct;
   o.testVisible       = FModelRenderable3d_testVisible;
   o.vertexCount       = FModelRenderable3d_vertexCount;
   o.findVertexBuffer  = FModelRenderable3d_findVertexBuffer;
   o.vertexBuffers     = FModelRenderable3d_vertexBuffers;
   o.indexBuffer       = FModelRenderable3d_indexBuffer;
   o.findTexture       = FModelRenderable3d_findTexture;
   o.textures          = FModelRenderable3d_textures;
   o.bones             = FModelRenderable3d_bones;
   o.load              = FModelRenderable3d_load;
   o.build             = FModelRenderable3d_build;
   o.update            = FModelRenderable3d_update;
   return o;
}
function FModelRenderable3d_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
}
function FModelRenderable3d_testVisible(p){
   var o = this;
   var r = o._ready;
   if(!r){
      var d = o._renderable;
      if(d){
         r = o._ready = d.testReady();
      }
   }
   return r;
}
function FModelRenderable3d_vertexCount(){
   return this._renderable.vertexCount();
}
function FModelRenderable3d_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
function FModelRenderable3d_vertexBuffers(){
   return this._renderable.vertexBuffers();
}
function FModelRenderable3d_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FModelRenderable3d_findTexture(p){
   return this._renderable.findTexture(p);
}
function FModelRenderable3d_textures(){
   return this._renderable.textures();
}
function FModelRenderable3d_bones(p){
   return this._bones;
}
function FModelRenderable3d_load(p){
   var o = this;
   var m = o._material;
   var mr = o._materialResource = p.material();
   m.assignInfo(mr.info());
   o._effectName = m.info().effectName;
   o._renderable = p;
}
function FModelRenderable3d_build(p){
   var o = this;
   var r = o._renderable;
   var rbs = r.boneIds();
   if(rbs){
      var bs = o._bones = new TObjects();
      var c = rbs.length();
      for(var i = 0; i < c; i++){
         var bi = rbs.get(i);
         var b = p.findBone(bi);
         if(b == null){
            throw new TError("Bone is not exists. (bone_id={1})", bi);
         }
         bs.push(b);
      }
   }
}
function FModelRenderable3d_update(p){
   var o = this;
   var m = o._display.matrix();
   o._matrix.assign(m);
}
function FScene3d(o){
   o = RClass.inherits(this, o, FStage3d);
   o._dataReady            = false;
   o._resource             = null;
   o._skyLayer             = null;
   o._mapLayer             = null;
   o._spaceLayer           = null;
   o._lsnsLoad             = null;
   o.onKeyDown             = FScene3d_onKeyDown;
   o.construct             = FScene3d_construct;
   o.loadListener          = FScene3d_loadListener;
   o.loadTechniqueResource = FScene3d_loadTechniqueResource;
   o.loadRegionResource    = FScene3d_loadRegionResource
   o.loadDisplayResource   = FScene3d_loadDisplayResource
   o.loadSkyResource       = FScene3d_loadSkyResource
   o.loadMapResource       = FScene3d_loadMapResource
   o.loadSpaceResource     = FScene3d_loadSpaceResource
   o.loadResource          = FScene3d_loadResource
   o.processLoad           = FScene3d_processLoad;
   o.active                = FScene3d_active;
   o.deactive              = FScene3d_deactive;
   return o;
}
function FScene3d_onKeyDown(e){
   var o = this;
   var c = o._camera;
   var k = e.keyCode;
   var r = 0.3;
   switch(k){
      case EKeyCode.W:
         c.doWalk(r);
         break;
      case EKeyCode.S:
         c.doWalk(-r);
         break;
      case EKeyCode.A:
         c.doStrafe(r);
         break;
      case EKeyCode.D:
         c.doStrafe(-r);
         break;
      case EKeyCode.Q:
         c.doFly(r);
         break;
      case EKeyCode.E:
         c.doFly(-r);
         break;
   }
   c.update();
}
function FScene3d_construct(){
   var o = this;
   o.__base.FStage3d.construct.call(o);
   var l = o._skyLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sky', l);
   var l = o._mapLayer = RClass.create(FDisplayLayer);
   o.registerLayer('map', l);
   var l = o._spaceLayer = RClass.create(FDisplayLayer);
   o.registerLayer('space', l);
}
function FScene3d_loadListener(){
   var o = this;
   var ls = o._lsnsLoad;
   if(ls == null){
      ls = o._lsnsLoad = new TListeners();
   }
   return ls;
}
function FScene3d_loadTechniqueResource(p){
}
function FScene3d_loadRegionResource(p){
   var o = this;
   o._backgroundColor.assign(p.color());
   var rc = p.camera();
   var rcv = rc.viewport();
   var c = o._camera;
   var cp = c._projection;
   c.position().assign(rc.position());
   c.direction().assign(rc.direction());
   c.update();
   cp.size().assign(o._context.size());
   cp._angle = rcv.angle();
   cp._znear = rcv.znear();
   cp._zfar = rcv.zfar();
   cp.update();
   var l = o._directionalLight
   var lc = l._camera;
   var lp = lc._projection;
   var rl = p.light();
   var rlc = rl.camera();
   var rlv = rlc.viewport();
   lc.position().set(1, 1, -1);
   lc.lookAt(0, 0, 0);
   lc.position().assign(rlc.position());
   lc.update();
   lp.size().set(1024, 1024);
   lp._angle = 60;
   lp._znear = rlv.znear();
   lp._zfar = rlv.zfar();
   lp.update();
}
function FScene3d_loadDisplayResource(pl, pd){
   var o = this;
   var d3 = RClass.create(FSceneDisplay3d);
   d3._context = o._context;
   d3.loadSceneResource(pd);
   RConsole.find(FTemplate3dConsole).load(d3, pd.code());
   pl.pushDisplay(d3);
}
function FScene3d_loadSkyResource(p){
   var o = this;
   var ds = p.displays();
   if(ds){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         o.loadDisplayResource(o._spaceLayer, d);
      }
   }
}
function FScene3d_loadMapResource(p){
   var o = this;
   var ds = p.displays();
   if(ds){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         o.loadDisplayResource(o._mapLayer, d);
      }
   }
}
function FScene3d_loadSpaceResource(p){
   var o = this;
   var ds = p.displays();
   if(ds){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         o.loadDisplayResource(o._spaceLayer, d);
      }
   }
}
function FScene3d_loadResource(p){
   var o = this;
   o.loadTechniqueResource(p.technique());
   o.loadRegionResource(p.region());
   o.loadSkyResource(p.sky());
   o.loadMapResource(p.map());
   o.loadSpaceResource(p.space());
   if(o._lsnsLoad){
      o._lsnsLoad.process();
   }
}
function FScene3d_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   return true;
}
function FScene3d_active(){
   var o = this;
   o.__base.FStage3d.active.call(o);
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
function FScene3d_deactive(){
   var o = this;
   o.__base.FStage3d.deactive.call(o);
   RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
}
function FScene3dConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadScenes = null;
   o._scenes     = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FScene3dConsole_onProcess;
   o.construct   = FScene3dConsole_construct;
   o.scenes      = FScene3dConsole_scenes;
   o.alloc       = FScene3dConsole_alloc;
   return o;
}
function FScene3dConsole_onProcess(){
   var o = this;
   var ms = o._loadScenes;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}
function FScene3dConsole_construct(){
   var o = this;
   o._loadScenes = new TLooper();
   o._scenes = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FScene3dConsole_scenes(){
   return this._scenes;
}
function FScene3dConsole_alloc(pc, pn){
   var o = this;
   var rsc = RConsole.find(FRs3SceneConsole);
   var rs = rsc.load(pn);
   var s = RClass.create(FScene3d);
   s._context = pc;
   s._name = pn;
   s._resource = rs;
   if(rs.testReady()){
      s.load(rs);
   }else{
      o._loadScenes.push(s);
   }
   return s;
}
function FSceneDisplay3d(o){
   o = RClass.inherits(this, o, FTemplate3d);
   o._dataReady        = false;
   o._movieMatrix      = null;
   o._modelMatrix      = null;
   o._resource         = null;
   o._materials        = null;
   o._movies           = null;
   o.construct         = FSceneDisplay3d_construct;
   o.loadSceneResource = FSceneDisplay3d_loadSceneResource;
   o.loadResource      = FSceneDisplay3d_loadResource;
   o.process           = FSceneDisplay3d_process;
   return o;
}
function FSceneDisplay3d_construct(){
   var o = this;
   o.__base.FTemplate3d.construct.call(o);
   o._movieMatrix = new SMatrix3d();
   o._modelMatrix = new SMatrix3d();
}
function FSceneDisplay3d_loadSceneResource(p){
   var o = this;
   o._resource = p;
   o._modelMatrix.assign(p.matrix());
   var rms = p.materials();
   if(rms){
      var c = rms.count();
      var ms = o._materials = new TDictionary();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FSceneMaterial3d);
         m.loadSceneResource(rm);
         ms.set(rm.code(), m);
      }
   }
   var rms = p.movies();
   if(rms){
      var c = rms.count();
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FSceneDisplayMovie3d);
         m.loadResource(rm);
         ms.push(m);
      }
   }
}
function FSceneDisplay3d_loadResource(p){
   var o = this;
   var ms = o._materials;
   var rds = p.renderables();
   var c = rds.count();
   if(c > 0){
      var rs = o._templateRenderables = new TObjects();
      for(var i = 0; i < c; i++){
         var rd = rds.get(i);
         var mc = rd.materialCode();
         var r = RClass.create(FSceneDisplayRenderable3d);
         r._display = o;
         r._context = o._context;
         r.loadResource(rd);
         rs.push(r);
         var m = ms.get(mc);
         if(m){
            r.loadMaterial(m);
         }
      }
   }
}
function FSceneDisplay3d_process(p){
   var o = this;
   o.__base.FTemplate3d.process.call(o, p);
   o._matrix.identity();
   var ms = o._movies;
   if(ms){
      var c = ms.count();
      for(var i = 0; i < c; i++){
         ms.get(i).process(o._movieMatrix);
      }
      o._matrix.append(o._movieMatrix);
   }
   o._matrix.append(o._modelMatrix);
}
function FSceneDisplayMovie3d(o){
   o = RClass.inherits(this, o, FObject);
   o._resource    = null;
   o._interval    = null;
   o._firstTick   = 0;
   o._lastTick    = 0;
   o._matrix      = new SMatrix3d();
   o.loadResource = FSceneDisplayMovie3d_loadResource;
   o.process      = FSceneDisplayMovie3d_process;
   return o;
}
function FSceneDisplayMovie3d_loadResource(p){
   var o = this;
   o._resource = p;
   o._interval = p._interval;
   o._matrix.setRotation(p._rotation.x, p._rotation.y * Math.PI / 180, p._rotation.z);
   o._matrix.update();
}
function FSceneDisplayMovie3d_process(p){
   var o = this;
   if(o._firstTick == 0){
      o._firstTick = RTimer.current();
   }
   if(o._lastTick == 0){
      o._lastTick = RTimer.current();
   }
   var ct = RTimer.current();
   var sp = ct - o._lastTick;
   if(sp > o._interval){
      if(o._resource._typeName == 'rotation'){
         p.append(o._matrix);
      }
      o._lastTick = ct;
   }
}
function FSceneDisplayRenderable3d(o){
   o = RClass.inherits(this, o, FTemplateRenderable3d);
   o.loadMaterial = FSceneDisplayRenderable3d_loadMaterial;
   return o;
}
function FSceneDisplayRenderable3d_loadMaterial(p){
   var o = this;
   var pi = p.info();
   o._material.info().assign(pi);
}
function FSceneMaterial3d(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   o._resource         = null;
   o.loadSceneResource = FSceneMaterial3d_loadSceneResourcee
   return o;
}
function FSceneMaterial3d_loadSceneResourcee(p){
   var o = this;
   o._resource = p;
   o._name = p.code();
   o._info.assign(p.info());
}
function FSimpleStage3d(o){
   o = RClass.inherits(this, o, FStage3d);
   o,_skyLayer    = null;
   o,_mapLayer    = null;
   o,_spriteLayer = null;
   o,_faceLayer   = null;
   o.onKeyDown    = FSimpleStage3d_onKeyDown;
   o.construct    = FSimpleStage3d_construct;
   o.skyLayer     = FSimpleStage3d_skyLayer;
   o.mapLayer     = FSimpleStage3d_mapLayer;
   o.spriteLayer  = FSimpleStage3d_spriteLayer;
   o.faceLayer    = FSimpleStage3d_faceLayer;
   o.active       = FSimpleStage3d_active;
   o.deactive     = FSimpleStage3d_deactive;
   return o;
}
function FSimpleStage3d_onKeyDown(e){
   var o = this;
   var c = o._camera;
   var k = e.keyCode;
   var r = 0.3;
   switch(k){
      case EKeyCode.W:
         c.doWalk(r);
         break;
      case EKeyCode.S:
         c.doWalk(-r);
         break;
      case EKeyCode.A:
         c.doStrafe(r);
         break;
      case EKeyCode.D:
         c.doStrafe(-r);
         break;
      case EKeyCode.Q:
         c.doFly(r);
         break;
      case EKeyCode.E:
         c.doFly(-r);
         break;
   }
   c.update();
}
function FSimpleStage3d_construct(){
   var o = this;
   o.__base.FStage3d.construct.call(o);
   var l = o._skyLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sky', l);
   var l = o._mapLayer = RClass.create(FDisplayLayer);
   o.registerLayer('map', l);
   var l = o._spriteLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sprite', l);
   var l = o._faceLayer = RClass.create(FDisplayLayer);
   o.registerLayer('face', l);
}
function FSimpleStage3d_skyLayer(){
   return this._skyLayer;
}
function FSimpleStage3d_mapLayer(){
   return this._mapLayer;
}
function FSimpleStage3d_spriteLayer(){
   return this._spriteLayer;
}
function FSimpleStage3d_faceLayer(){
   return this._faceLayer;
}
function FSimpleStage3d_active(){
   var o = this;
   o.__base.FStage3d.active.call(o);
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
function FSimpleStage3d_deactive(){
   var o = this;
   o.__base.FStage3d.deactive.call(o);
   RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
}
function FSprite3d(o){
   o = RClass.inherits(this, o, FObject);
   o._context    = null;
   o._visible    = true;
   o.linkContext = FSprite3d_linkContext;
   o.testVisible = FSprite3d_testVisible;
   return o;
}
function FSprite3d_linkContext(p){
   this._context = p;
}
function FSprite3d_testVisible(p){
   return this._visible;
}
function FStage3d(o){
   o = RClass.inherits(this, o, FStage);
   o._backgroundColor  = null;
   o._camera           = null;
   o._directionalLight = null
   o._technique        = null;
   o._region           = null;
   o.construct         = FStage3d_construct;
   o.backgroundColor   = FStage3d_backgroundColor;
   o.camera            = FStage3d_camera;
   o.projection        = FStage3d_projection;
   o.directionalLight  = FStage3d_directionalLight;
   o.technique         = FStage3d_technique;
   o.selectTechnique   = FStage3d_selectTechnique;
   o.process           = FStage3d_process;
   return o;
}
function FStage3d_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   o._backgroundColor = new SColor4();
   o._backgroundColor.set(0, 0, 0, 1);
   var c = o._camera = RClass.create(FG3dPerspectiveCamera);
   c.position().set(0, 0, -100);
   c.lookAt(0, 0, 0);
   c.update();
   c._projection.update();
   var l = o._directionalLight = RClass.create(FG3dDirectionalLight);
   l.direction().set(0, -1, 0);
   var r = o._region = RClass.create(FG3dRegion);
   r._camera = c;
   r._directionalLight = l;
}
function FStage3d_backgroundColor(){
   return this._backgroundColor;
}
function FStage3d_camera(){
   return this._camera;
}
function FStage3d_projection(){
   return this._projection;
}
function FStage3d_directionalLight(){
   return this._directionalLight;
}
function FStage3d_technique(){
   return this._technique;
}
function FStage3d_selectTechnique(c, p){
   var o = this;
   var tc = RConsole.find(FG3dTechniqueConsole);
   o._technique = tc.find(c, p);
}
function FStage3d_process(){
   var o = this;
   var r = o._region;
   o.__base.FStage.process.call(o);
   r._backgroundColor = o._backgroundColor;
   o._technique.updateRegion(r);
   r.prepare();
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).filterRenderables(r);
      }
   }
   r.update();
   o._technique.drawRegion(r);
}
function FTemplate3d(o){
   o = RClass.inherits(this, o, FDisplay3d);
   o._dataReady           = false;
   o._ready               = false;
   o._resource            = null;
   o._animation           = null;
   o._resource            = null;
   o._templateRenderables = null;
   o.testReady            = FTemplate3d_testReady;
   o.setResource          = FTemplate3d_setResource;
   o.loadResource         = FTemplate3d_loadResource;
   o.processLoad          = FTemplate3d_processLoad;
   o.process              = FTemplate3d_process;
   return o;
}
function FTemplate3d_testReady(){
   return this._dataReady;
}
function FTemplate3d_setResource(p){
   this._resource = p;
}
function FTemplate3d_loadResource(p){
   var o = this;
   var rs = p.renderables();
   var c = rs.count();
   if(c > 0){
      var r3s = o._templateRenderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         var r3 = RClass.create(FTemplateRenderable3d);
         r3._display = o;
         r3._context = o._context;
         r3.loadResource(r);
         r3s.push(r3);
      }
   }
}
function FTemplate3d_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   if(!o._dataReady){
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o._dataReady = true;
   }
   var r3s = o._templateRenderables;
   var c = r3s.count();
   for(var i = 0; i < c; i++){
      var r3 = r3s.get(i);
      if(!r3.testReady()){
         return false;
      }
   }
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r3 = r3s.get(i);
         r3.load();
         o._renderables.push(r3);
      }
   }
   o._ready = true;
   return o._ready;
}
function FTemplate3d_process(){
   var o = this;
   o.__base.FDisplay3d.process.call(o);
   if(o._animation){
      o._animation.process();
   }
   return true;
}
function FTemplate3dConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._loadTemplates = null;
   o._templates     = null;
   o._thread        = null;
   o._interval      = 100;
   o.onProcess      = FTemplate3dConsole_onProcess;
   o.construct      = FTemplate3dConsole_construct;
   o.templates      = FTemplate3dConsole_templates;
   o.alloc          = FTemplate3dConsole_alloc;
   o.load           = FTemplate3dConsole_load;
   return o;
}
function FTemplate3dConsole_onProcess(){
   var o = this;
   var ms = o._loadTemplates;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}
function FTemplate3dConsole_construct(){
   var o = this;
   o._loadTemplates = new TLooper();
   o._templates = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FTemplate3dConsole_templates(){
   return this._templates;
}
function FTemplate3dConsole_alloc(pc, pn){
   var o = this;
   var rtc = RConsole.find(FRs3TemplateConsole);
   var rt = rtc.load(pn);
   var t = RClass.create(FTemplate3d);
   t._context = pc;
   t._name = pn;
   t.setResource(rt);
   o._loadTemplates.push(t);
   return t;
}
function FTemplate3dConsole_load(pt, pn){
   var o = this;
   var rtc = RConsole.find(FRs3TemplateConsole);
   var rt = rtc.load(pn);
   pt._name = pn;
   pt.setResource(rt);
   o._loadTemplates.push(pt);
}
function FTemplateRenderable3d(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   o._ready            = false;
   o._display          = null;
   o._modelMatrix      = null;
   o._resource         = null;
   o._model            = null;
   o._renderable       = null;
   o._bones            = null;
   o._materialCode     = null;
   o._materialResource = null;
   o.construct         = FTemplateRenderable3d_construct;
   o.testReady         = FTemplateRenderable3d_testReady;
   o.testVisible       = FTemplateRenderable3d_testVisible;
   o.findVertexBuffer  = FTemplateRenderable3d_findVertexBuffer;
   o.vertexCount       = FTemplateRenderable3d_vertexCount;
   o.vertexBuffers     = FTemplateRenderable3d_vertexBuffers;
   o.indexBuffer       = FTemplateRenderable3d_indexBuffer;
   o.findTexture       = FTemplateRenderable3d_findTexture;
   o.textures          = FTemplateRenderable3d_textures;
   o.bones             = FTemplateRenderable3d_bones;
   o.loadResource      = FTemplateRenderable3d_loadResource;
   o.load              = FTemplateRenderable3d_load;
   o.build             = FTemplateRenderable3d_build;
   o.update            = FTemplateRenderable3d_update;
   return o;
}
function FTemplateRenderable3d_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
   o._modelMatrix = new SMatrix3d();
}
function FTemplateRenderable3d_testReady(){
   var o = this;
   if(!o._model.testReady()){
      return false;
   }
   return true;
}
function FTemplateRenderable3d_testVisible(p){
   return this._ready;
}
function FTemplateRenderable3d_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
function FTemplateRenderable3d_vertexCount(){
   return this._renderable.vertexCount();
}
function FTemplateRenderable3d_vertexBuffers(){
   return this._renderable.vertexBuffers();
}
function FTemplateRenderable3d_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FTemplateRenderable3d_findTexture(p){
   return this._renderable.findTexture(p);
}
function FTemplateRenderable3d_textures(){
   return this._renderable.textures();
}
function FTemplateRenderable3d_bones(p){
   return this._bones;
}
function FTemplateRenderable3d_loadResource(p){
   var o = this;
   o._resource = p;
   var mc = p.modelCode();
   o._model = RConsole.find(FRd3ModelConsole).load(o._context, mc);
   var mc = p.materialCode();
   var mt = o._materialResource = RConsole.find(FRs3ThemeConsole).find(mc);
   o._effectName = mt.info().effectName;
   o._modelMatrix.assign(p.matrix());
}
function FTemplateRenderable3d_load(){
   var o = this;
   var r = o._resource;
   var gi = r.geometryIndex()
   o._renderable = o._model.geometrys().get(gi);
   o._ready = true;
}
function FTemplateRenderable3d_build(p){
   var o = this;
   var r = o._renderable;
   var rbs = r.boneIds();
   if(rbs){
      var bs = o._bones = new TObjects();
      var c = rbs.length();
      for(var i = 0; i < c; i++){
         var bi = rbs.get(i);
         var b = p.findBone(bi);
         if(b == null){
            throw new TError("Bone is not exists. (bone_id={1})", bi);
         }
         bs.push(b);
      }
   }
}
function FTemplateRenderable3d_update(p){
   var o = this;
   var m = o._display.matrix();
   o._matrix.assign(m);
}
function FRs3Animation(o){
   o = RClass.inherits(this, o, FObject);
   o._frameCount = 0;
   o._frameTick  = 0;
   o._frameSpan  = 0;
   o._tracks     = null;
   o.construct   = FRs3Animation_construct;
   o.tracks      = FRs3Animation_tracks;
   o.unserialize = FRs3Animation_unserialize;
   return o;
}
function FRs3Animation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FRs3Animation_tracks(){
   return this._tracks;
}
function FRs3Animation_unserialize(p){
   var o = this;
   o._frameCount = p.readUint16();
   o._frameTick = p.readUint16();
   o._frameSpan = p.readUint32();
   var c = p.readUint16();
   if(c > 0){
      var ts = o._tracks = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FRs3Track);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
function FRs3Bone(o){
   o = RClass.inherits(this, o, FObject);
   o._id         = 0;
   o._bones      = null;
   o._track      = null;
   o.id          = FRs3Bone_id;
   o.bones       = FRs3Bone_bones;
   o.track       = FRs3Bone_track;
   o.setTrack    = FRs3Bone_setTrack;
   o.unserialize = FRs3Bone_unserialize;
   return o;
}
function FRs3Bone_id(){
   return this._id;
}
function FRs3Bone_bones(){
   return this._bones;
}
function FRs3Bone_track(){
   return this._track;
}
function FRs3Bone_setTrack(p){
   this._track = p;
}
function FRs3Bone_unserialize(p){
   var o = this;
   o._id = p.readUint8();
   var c = p.readUint8();
   if(c > 0){
      var bs = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         bs.push(b);
      }
   }
}
function FRs3Frame(o){
   o = RClass.inherits(this, o, FObject);
   o._tick        = 0;
   o._translation = null;
   o._quaternion  = null;
   o._scale       = null;
   o.construct    = FRs3Frame_construct;
   o.tick         = FRs3Frame_tick;
   o.translation  = FRs3Frame_translation;
   o.quaternion   = FRs3Frame_quaternion;
   o.scale        = FRs3Frame_scale;
   o.unserialize  = FRs3Frame_unserialize;
   return o;
}
function FRs3Frame_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._translation = new SPoint3();
   o._quaternion = new SQuaternion();
   o._scale = new SVector3();
}
function FRs3Frame_tick(){
   return this._tick;
}
function FRs3Frame_translation(){
   return this._translation;
}
function FRs3Frame_quaternion(){
   return this._quaternion;
}
function FRs3Frame_scale(){
   return this._scale;
}
function FRs3Frame_unserialize(p){
   var o = this;
   o._tick = p.readUint16();
   o._translation.unserialize(p);
   o._quaternion.unserialize(p);
   o._scale.unserialize(p);
}
function FRs3Geometry(o){
   o = RClass.inherits(this, o, FObject);
   o._optionInstanced = false;
   o._instanceCount   = 0;
   o._matrix          = null;
   o._outline         = null;
   o._materialCode    = null;
   o._vertexCount     = 0;
   o._indexCount      = 0;
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._boneIds         = null;
   o._track           = null;
   o.construct        = FRs3Geometry_construct;
   o.materialCode     = FRs3Geometry_materialCode;
   o.vertexCount      = FRs3Geometry_vertexCount;
   o.findVertexBuffer = FRs3Geometry_findVertexBuffer;
   o.vertexBuffers    = FRs3Geometry_vertexBuffers;
   o.indexCount       = FRs3Geometry_indexCount;
   o.indexBuffer      = FRs3Geometry_indexBuffer;
   o.boneIds          = FRs3Geometry_boneIds;
   o.track            = FRs3Geometry_track;
   o.unserialize      = FRs3Geometry_unserialize;
   return o;
}
function FRs3Geometry_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._outline = new SOutline3();
   o._vertexBuffers = new TObjects();
}
function FRs3Geometry_materialCode(){
   return this._materialCode;
}
function FRs3Geometry_vertexCount(){
   return this._vertexCount;
}
function FRs3Geometry_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   if(vs){
      var c = vs.count();
      for(var n = 0; n < c; n++){
         var v = vs.get(n);
         if(v.name() == p){
            return v;
         }
      }
   }
   return null;
}
function FRs3Geometry_vertexBuffers(){
   return this._vertexBuffers;
}
function FRs3Geometry_indexCount(){
   return this._indexCount;
}
function FRs3Geometry_indexBuffer(){
   return this._indexBuffer;
}
function FRs3Geometry_boneIds(){
   return this._boneIds;
}
function FRs3Geometry_track(){
   return this._track;
}
function FRs3Geometry_unserialize(p){
   var o = this;
   o._optionInstanced = p.readBoolean();
   o._instanceCount = p.readInt8();
   o._matrix.unserialize(p);
   o._outline.unserialize(p);
   o._materialCode = p.readString();
   o._vertexCount = p.readInt32();
   var vc = p.readInt8();
   if(vc > 0){
      var vs = o._vertexBuffers = new TObjects();
      for(var i = 0; i < vc; i++){
         var vb = RClass.create(FRs3VertexBuffer);
         vb._vertexCount = o._vertexCount;
         vb.unserialize(p)
         vs.push(vb);
      }
   }
   var ib = o._indexBuffer = RClass.create(FRs3IndexBuffer);
   ib.unserialize(p);
   var bc = p.readInt8();
   if(bc > 0){
      var bs = o._boneIds = new TArray();
      for(var i = 0; i < bc; i++){
         bs.push(p.readUint8());
      }
   }
   if(p.readBoolean()){
      var k = o._track = RClass.create(FRs3Track);
      k.unserialize(p);
   }
}
function FRs3IndexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   o._geometry    = null;
   o._count       = null;
   o._strideCd    = EG3dIndexStride.Unknown;
   o._memory      = null;
   o._data        = null;
   o.count        = FRs3IndexBuffer_count;
   o.strideCd     = FRs3IndexBuffer_strideCd;
   o.memory       = FRs3IndexBuffer_memory;
   o.data         = FRs3IndexBuffer_data;
   o.unserialize  = FRs3IndexBuffer_unserialize;
   return o;
}
function FRs3IndexBuffer_count(){
   return this._count;
}
function FRs3IndexBuffer_strideCd(){
   return this._strideCd;
}
function FRs3IndexBuffer_memory(){
   return this._memory;
}
function FRs3IndexBuffer_data(){
   return this._data;
}
function FRs3IndexBuffer_unserialize(p){
   var o = this;
   var c = o._count = p.readInt32();
   var sc = o._strideCd = p.readInt8();
   if(sc == EG3dIndexStride.Uint16){
      o._memory = new ArrayBuffer(2 * c);
      var d = o._data = new Uint16Array(o._memory);
      for(var i = 0; i < c; i++){
         d[i] = p.readUint16();
      }
   }else if(sc == EG3dIndexStride.Uint16){
      o._memory = new ArrayBuffer(4 * c);
      var d = o._data = new Uint16Array(o._memory);
      for(var i = 0; i < c; i++){
         d[i] = p.readUint32();
      }
   }else{
      throw new TError('Unknown stride type. (stride_cd={1})', sc);
   }
}
function FRs3Material(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._code       = null;
   o._info       = null;
   o._textures   = null;
   o.construct   = FRs3Material_construct;
   o.code        = FRs3Material_code;
   o.effectName  = FRs3Material_effectName;
   o.info        = FRs3Material_info;
   o.textures    = FRs3Material_textures;
   o.unserialize = FRs3Material_unserialize;
   return o;
}
function FRs3Material_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._info = new SRs3MaterialInfo();
}
function FRs3Material_code(){
   return this._code;
}
function FRs3Material_effectName(){
   return this._info.effectName;
}
function FRs3Material_info(){
   return this._info;
}
function FRs3Material_textures(){
   return this._textures;
}
function FRs3Material_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._info.unserialize(p);
   var c = p.readInt8();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FRs3MaterialTexture);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
function FRs3MaterialTexture(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._code        = null;
   o._textureCode = null;
   o._bitmapCode  = null;
   o.code         = FRs3MaterialTexture_code;
   o.textureCode  = FRs3MaterialTexture_textureCode;
   o.bitmapCode   = FRs3MaterialTexture_bitmapCode;
   o.unserialize  = FRs3MaterialTexture_unserialize;
   return o;
}
function FRs3MaterialTexture_code(){
   return this._code;
}
function FRs3MaterialTexture_textureCode(){
   return this._textureCode;
}
function FRs3MaterialTexture_bitmapCode(){
   return this._bitmapCode;
}
function FRs3MaterialTexture_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._textureCode = p.readString();
   o._bitmapCode = p.readString();
}
function FRs3Model(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   o.geometrys   = FRs3Model_geometrys;
   o.skeleton    = FRs3Model_skeleton;
   o.animation   = FRs3Model_animation;
   o.unserialize = FRs3Model_unserialize;
   return o;
}
function FRs3Model_geometrys(){
   return this._geometrys;
}
function FRs3Model_skeleton(){
   return this._skeleton;
}
function FRs3Model_animation(){
   return this._animation;
}
function FRs3Model_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   if(gc > 0){
      var gs = o._geometrys = new TObjects();
      for(var i = 0; i < gc; i++){
         var g = RClass.create(FRs3Geometry);
         g.unserialize(p);
         gs.push(g);
      }
   }
   var sk = null;
   if(p.readBoolean()){
      sk = o._skeleton = RClass.create(FRs3Skeleton);
      sk.unserialize(p);
   }
   var tc = 0;
   if(p.readBoolean()){
      var am = o._animation = RClass.create(FRs3Animation);
      am.unserialize(p);
      var ts = am.tracks();
      tc = ts.count();
      for(var i = 0; i < tc; i++){
         var t = ts.get(i);
         var b = sk.find(t.boneId());
         b.setTrack(t);
      }
   }
   RLogger.info(o, "Unserialize model success. (code={1}, geometry_count={2}, track_count={3})", o._name, gc, tc);
}
function FRs3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models   = null;
   o._path     = '/assets/model/'
   o.construct = FRs3ModelConsole_construct;
   o.load      = FRs3ModelConsole_load;
   return o;
}
function FRs3ModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
}
function FRs3ModelConsole_load(p){
   var o = this;
   var r = o._models.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Model);
      r.load(u);
      o._models.set(p, r);
   }
   return r;
}
function FRs3Resource(o){
   o = RClass.inherits(this, o, FResource);
   o._dataReady   = false;
   o._dataSize    = 0;
   o._lsnsLoad    = null;
   o.onLoad       = FRs3Resource_onLoad;
   o.loadListener = FRs3Resource_loadListener;
   o.testReady    = FRs3Resource_testReady;
   o.unserialize  = FRs3Resource_unserialize;
   o.load         = FRs3Resource_load;
   return o;
}
function FRs3Resource_onLoad(p){
   var o = this;
   var v = RClass.create(FDataView);
   v.setEndianCd(true);
   v.link(p.outputData());
   o.unserialize(v);
   v.dispose();
   o._dataReady = true;
   if(o._lsnsLoad){
      o._lsnsLoad.process();
   }
}
function FRs3Resource_loadListener(){
   var o = this;
   var ls = o._lsnsLoad;
   if(ls == null){
      ls = o._lsnsLoad = new TListeners();
   }
   return ls;
}
function FRs3Resource_testReady(){
   return this._dataReady;
}
function FRs3Resource_unserialize(p){
   this._name = p.readString();
}
function FRs3Resource_load(u){
   var o = this;
   var hc = RConsole.find(FHttpConsole);
   var c = hc.send(u);
   c.lsnsLoad.register(o, o.onLoad);
}
function FRs3Scene(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._themeCode  = null;
   o._technique  = null;
   o._region     = null;
   o._sky        = null;
   o._map        = null;
   o._space      = null;
   o.construct   = FRs3Scene_construct;
   o.technique   = FRs3Scene_technique;
   o.region      = FRs3Scene_region;
   o.sky         = FRs3Scene_sky;
   o.map         = FRs3Scene_map;
   o.space       = FRs3Scene_space;
   o.unserialize = FRs3Scene_unserialize;
   return o;
}
function FRs3Scene_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._technique = RClass.create(FRs3SceneTechnique);
   o._region = RClass.create(FRs3SceneRegion);
   o._sky = RClass.create(FRs3SceneSky);
   o._map = RClass.create(FRs3SceneMap);
   o._space = RClass.create(FRs3SceneSpace);
}
function FRs3Scene_technique(){
   return this._technique;
}
function FRs3Scene_region(){
   return this._region;
}
function FRs3Scene_sky(){
   return this._sky;
}
function FRs3Scene_map(){
   return this._map;
}
function FRs3Scene_space(){
   return this._space;
}
function FRs3Scene_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   o._themeCode = p.readString();
   o._technique.unserialize(p);
   o._region.unserialize(p);
   o._sky.unserialize(p);
   o._map.unserialize(p);
   o._space.unserialize(p);
}
function FRs3SceneCamera(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName    = null;
   o._centerFront = null;
   o._centerBack  = null;
   o._position    = null;
   o._direction   = null;
   o._focalNear   = null;
   o._focalFar    = null;
   o._viewport    = null;
   o.construct    = FRs3SceneCamera_construct;
   o.typeName     = FRs3SceneCamera_typeName;
   o.position     = FRs3SceneCamera_position;
   o.direction    = FRs3SceneCamera_direction;
   o.viewport     = FRs3SceneCamera_viewport;
   o.unserialize  = FRs3SceneCamera_unserialize;
   return o;
}
function FRs3SceneCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._viewport = RClass.create(FRs3SceneViewport);
}
function FRs3SceneCamera_typeName(){
   return this._typeName;
}
function FRs3SceneCamera_position(){
   return this._position;
}
function FRs3SceneCamera_direction(){
   return this._direction;
}
function FRs3SceneCamera_viewport(){
   return this._viewport;
}
function FRs3SceneCamera_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._centerFront = p.readFloat();
   o._centerBack = p.readFloat();
   o._position.unserialize(p);
   o._direction.unserialize(p);
   o._focalNear = p.readFloat();
   o._focalFar = p.readFloat();
   o._viewport.unserialize(p);
}
function FRs3SceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scenes   = null;
   o._path     = '/assets/scene/'
   o.construct = FRs3SceneConsole_construct;
   o.load      = FRs3SceneConsole_load;
   return o;
}
function FRs3SceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}
function FRs3SceneConsole_load(p){
   var o = this;
   var r = o._scenes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Scene);
      r.load(u);
      o._scenes.set(p, r);
   }
   return r;
}
function FRs3SceneDisplay(o){
   o = RClass.inherits(this, o, FObject);
   o._code                = null;
   o._optionMergeVertex   = null;
   o._optionMergeMaterial = null;
   o._matrix              = null;
   o._movies              = null;
   o._materials           = null;
   o._renderables         = null;
   o.construct            = FRs3SceneDisplay_construct;
   o.code                 = FRs3SceneDisplay_code;
   o.matrix               = FRs3SceneDisplay_matrix;
   o.movies               = FRs3SceneDisplay_movies;
   o.materials            = FRs3SceneDisplay_materials;
   o.renderables          = FRs3SceneDisplay_renderables;
   o.unserialize          = FRs3SceneDisplay_unserialize;
   return o;
}
function FRs3SceneDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRs3SceneDisplay_code(){
   return this._code;
}
function FRs3SceneDisplay_matrix(){
   return this._matrix;
}
function FRs3SceneDisplay_movies(){
   return this._movies;
}
function FRs3SceneDisplay_materials(){
   return this._materials;
}
function FRs3SceneDisplay_renderables(){
   return this._renderables;
}
function FRs3SceneDisplay_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._optionMergeVertex = p.readBoolean();
   o._optionMergeMaterial = p.readBoolean();
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3SceneMovie);
         m.unserialize(p);
         ms.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var ms = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3SceneMaterial);
         m.unserialize(p);
         ms.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = RClass.create(FRs3TemplateRenderable);
         r.unserialize(p);
         rs.push(r);
      }
   }
}
function FRs3SceneLight(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName           = null;
   o._optionTrack        = null;
   o._shadow1            = null;
   o._shadow2            = null;
   o._shadow3            = null;
   o._shadowAmbientMin   = null;
   o._shadowAmbientMax   = null;
   o._shadowAmbientThick = null;
   o._shadowAmbientRange = null;
   o._shadowMerge1Base   = null;
   o._shadowMerge1Rate   = null;
   o._shadowMerge2Base   = null;
   o._shadowMerge2Rate   = null;
   o._material           = null;
   o._camera             = null;
   o.construct           = FRs3SceneLight_construct;
   o.typeName            = FRs3SceneLight_typeName;
   o.material            = FRs3SceneLight_material;
   o.camera              = FRs3SceneLight_camera;
   o.unserialize         = FRs3SceneLight_unserialize;
   return o;
}
function FRs3SceneLight_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._shadow1 = new SRs3SceneShadow();
   o._shadow2 = new SRs3SceneShadow();
   o._shadow3 = new SRs3SceneShadow();
   o._material = RClass.create(FRs3SceneMaterial);
   o._camera = RClass.create(FRs3SceneCamera);
}
function FRs3SceneLight_typeName(){
   return this._typeName;
}
function FRs3SceneLight_material(){
   return this._material;
}
function FRs3SceneLight_camera(){
   return this._camera;
}
function FRs3SceneLight_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._optionTrack = p.readInt32();
   o._shadow1.unserialize(p);
   o._shadow2.unserialize(p);
   o._shadow3.unserialize(p);
   o._shadowAmbientMin = p.readFloat();
   o._shadowAmbientMax = p.readFloat();
   o._shadowAmbientThick = p.readFloat();
   o._shadowAmbientRange = p.readFloat();
   o._shadowMerge1Base = p.readFloat();
   o._shadowMerge1Rate = p.readFloat();
   o._shadowMerge2Base = p.readFloat();
   o._shadowMerge2Rate = p.readFloat();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
function FRs3SceneMap(o){
   o = RClass.inherits(this, o, FRs3SceneSpace);
   return o;
}
function FRs3SceneMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._code               = null;
   o._label              = null;
   o._info               = null;
   o._heightDepth        = null;
   o._surfaceRate        = null;
   o._surfaceReflect     = null;
   o._surfaceBright      = null;
   o._surfaceBrightLevel = null;
   o._surfaceCoarse      = null;
   o._surfaceCoarseLevel = null;
   o._surfaceMerge       = null;
   o._surfacePower       = null;
   o.construct           = FRs3SceneMaterial_construct;
   o.code                = FRs3SceneMaterial_code;
   o.info                = FRs3SceneMaterial_info;
   o.unserialize         = FRs3SceneMaterial_unserialize;
   return o;
}
function FRs3SceneMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new SRs3MaterialInfo();
}
function FRs3SceneMaterial_code(){
   return this._code;
}
function FRs3SceneMaterial_info(){
   return this._info;
}
function FRs3SceneMaterial_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._label = p.readString();
   o._info.unserialize(p);
   o._heightDepth = p.readFloat();
   o._surfaceRate = p.readFloat();
   o._surfaceReflect = p.readFloat();
   o._surfaceBright = p.readFloat();
   o._surfaceBrightLevel = p.readFloat();
   o._surfaceCoarse = p.readFloat();
   o._surfaceCoarseLevel = p.readFloat();
   o._surfaceMerge = p.readFloat();
   o._surfacePower = p.readFloat();
}
function FRs3SceneMovie(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName   = null;
   o._interval   = null;
   o._rotation   = null;
   o.construct   = FRs3SceneMovie_construct;
   o.typeName    = FRs3SceneMovie_typeName;
   o.unserialize = FRs3SceneMovie_unserialize;
   return o;
}
function FRs3SceneMovie_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._rotation = new SVector3();
}
function FRs3SceneMovie_typeName(){
   return this._typeName;
}
function FRs3SceneMovie_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._interval = p.readInt32();
   o._rotation.unserialize(p);
}
function FRs3SceneRegion(o){
   o = RClass.inherits(this, o, FObject);
   o._color          = null;
   o._colorLevel     = null;
   o._fogNear        = null;
   o._fogFar         = null;
   o._fogRate        = null;
   o._fogAttenuation = null;
   o._fogColor       = null;
   o._edgeRate       = null;
   o._edgeLevel      = null;
   o._edgeWidth      = null;
   o._edgeColor      = null;
   o._faceRange      = null;
   o._faceLimit      = null;
   o._faceRate       = null;
   o._camera         = null;
   o._light          = null;
   o.construct       = FRs3SceneRegion_construct;
   o.color           = FRs3SceneRegion_color;
   o.camera          = FRs3SceneRegion_camera;
   o.light           = FRs3SceneRegion_light;
   o.unserialize     = FRs3SceneRegion_unserialize;
   return o;
}
function FRs3SceneRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._color = new SColor4();
   o._colorLevel = new SColor4();
   o._fogColor = new SColor4();
   o._edgeColor = new SColor4();
   o._camera = RClass.create(FRs3SceneCamera);
   o._light = RClass.create(FRs3SceneLight);
}
function FRs3SceneRegion_color(){
   return this._color;
}
function FRs3SceneRegion_camera(){
   return this._camera;
}
function FRs3SceneRegion_light(){
   return this._light;
}
function FRs3SceneRegion_unserialize(p){
   var o = this;
   o._color.unserialize(p);
   o._colorLevel.unserialize(p);
   o._fogNear = p.readFloat();
   o._fogFar = p.readFloat();
   o._fogRate = p.readFloat();
   o._fogAttenuation = p.readFloat();
   o._fogColor.unserialize(p);
   o._edgeRate = p.readFloat();
   o._edgeLevel = p.readFloat();
   o._edgeWidth = p.readFloat();
   o._edgeColor.unserialize(p);
   o._faceRange = p.readFloat();
   o._faceLimit = p.readFloat();
   o._faceRate = p.readFloat();
   o._camera.unserialize(p);
   o._light.unserialize(p);
}
function FRs3SceneRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o._code       = null;
   o.code        = FRs3SceneRenderable_code;
   o.unserialize = FRs3SceneRenderable_unserialize;
   return o;
}
function FRs3SceneRenderable_code(){
   return this._code;
}
function FRs3SceneRenderable_unserialize(p){
   var o = this;
   o._code = p.readString();
}
function FRs3SceneSky(o){
   o = RClass.inherits(this, o, FRs3SceneSpace);
   return o;
}
function FRs3SceneSpace(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._type       = null;
   o._displays   = null;
   o.displays    = FRs3SceneSpace_displays;
   o.unserialize = FRs3SceneSpace_unserialize;
   return o;
}
function FRs3SceneSpace_displays(){
   return this._displays;
}
function FRs3SceneSpace_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._type = p.readString();
   var c = p.readUint16();
   if(c > 0){
      var ds = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FRs3SceneDisplay);
         d.unserialize(p);
         ds.push(d);
      }
   }
}
function FRs3SceneTechnique(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._passes     = null;
   o.name        = FRs3SceneTechnique_name;
   o.passes      = FRs3SceneTechnique_passes;
   o.unserialize = FRs3SceneTechnique_unserialize;
   return o;
}
function FRs3SceneTechnique_name(){
   return this._name;
}
function FRs3SceneTechnique_passes(){
   return this._passes;
}
function FRs3SceneTechnique_unserialize(p){
   var o = this;
   o._name = p.readString();
   var c = p.readUint8();
   if(c > 0){
      var ss = o._passes = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FRs3SceneTechniquePass);
         s.unserialize(p);
         ss.push(s);
      }
   }
}
function FRs3SceneTechniquePass(o){
   o = RClass.inherits(this, o, FObject);
   o._name         = null;
   o._targetWidth  = null;
   o._targetHeight = null;
   o.name          = FRs3SceneTechniquePass_name;
   o.targetWidth   = FRs3SceneTechniquePass_targetWidth;
   o.targetHeight  = FRs3SceneTechniquePass_targetHeight;
   o.unserialize   = FRs3SceneTechniquePass_unserialize;
   return o;
}
function FRs3SceneTechniquePass_name(){
   return this._name;
}
function FRs3SceneTechniquePass_targetWidth(){
   return this._targetWidth;
}
function FRs3SceneTechniquePass_targetHeight(){
   return this._targetHeight;
}
function FRs3SceneTechniquePass_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._targetWidth = p.readUint16();
   o._targetHeight = p.readUint16();
}
function FRs3SceneViewport(o){
   o = RClass.inherits(this, o, FObject);
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   o.angle       = FRs3SceneViewport_angle;
   o.znear       = FRs3SceneViewport_znear;
   o.zfar        = FRs3SceneViewport_zfar;
   o.unserialize = FRs3SceneViewport_unserialize;
   return o;
}
function FRs3SceneViewport_angle(){
   return this._angle;
}
function FRs3SceneViewport_znear(){
   return this._znear;
}
function FRs3SceneViewport_zfar(){
   return this._zfar;
}
function FRs3SceneViewport_unserialize(p){
   var o = this;
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
}
function FRs3Skeleton(o){
   o = RClass.inherits(this, o, FObject);
   o._bones      = null
   o._roots      = null
   o.find        = FRs3Skeleton_find;
   o.bones       = FRs3Skeleton_bones;
   o.roots       = FRs3Skeleton_roots;
   o.innerFilter = FRs3Skeleton_innerFilter;
   o.unserialize = FRs3Skeleton_unserialize;
   return o;
}
function FRs3Skeleton_find(p){
   return this._bones.get(p);
}
function FRs3Skeleton_bones(){
   return this._bones;
}
function FRs3Skeleton_roots(){
   return this._roots;
}
function FRs3Skeleton_innerFilter(p){
   var o = this;
   o._bones.set(p.id(), p);
   var bs = p.bones();
   if(bs){
      var c = bs.count();
      for(var i = 0; i < c; i++){
         var b = bs.get(i);
         o.innerFilter(b)
      }
   }
}
function FRs3Skeleton_unserialize(p){
   var o = this;
   var c = p.readUint8();
   if(c > 0){
      o._bones = new TDictionary();
      var bs = o._roots = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         o.innerFilter(b);
         bs.push(b);
      }
   }
}
function FRs3Template(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._renderables = null;
   o.renderables  = FRs3Template_renderables;
   o.unserialize  = FRs3Template_unserialize;
   return o;
}
function FRs3Template_renderables(){
   return this._renderables;
}
function FRs3Template_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var n = 0; n < c; n++){
         var r = RClass.create(FRs3TemplateRenderable);
         r.unserialize(p);
         rs.push(r);
      }
   }
}
function FRs3TemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templates = null;
   o._path      = '/assets/template/'
   o.construct = FRs3TemplateConsole_construct;
   o.load      = FRs3TemplateConsole_load;
   return o;
}
function FRs3TemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}
function FRs3TemplateConsole_load(p){
   var o = this;
   var r = o._templates.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Template);
      r.load(u);
      o._templates.set(p, r);
   }
   return r;
}
function FRs3TemplateRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o._modelCode       = null;
   o._geometryIndex   = null;
   o._materialCode    = null;
   o._optionInstnaced = false;
   o._instanceCount   = 1;
   o._optionDynamic   = false;
   o._optionMerge     = false;
   o._optionBoneScale = false;
   o._optionSelect    = false;
   o._optionVisible   = false;
   o._optionGround    = false;
   o._matrix          = null;
   o.construct        = FRs3TemplateRenderable_construct;
   o.modelCode        = FRs3TemplateRenderable_modelCode;
   o.geometryIndex    = FRs3TemplateRenderable_geometryIndex;
   o.materialCode     = FRs3TemplateRenderable_materialCode;
   o.matrix           = FRs3TemplateRenderable_matrix;
   o.unserialize      = FRs3TemplateRenderable_unserialize;
   return o;
}
function FRs3TemplateRenderable_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRs3TemplateRenderable_modelCode(){
   return this._modelCode;
}
function FRs3TemplateRenderable_geometryIndex(p){
   return this._geometryIndex;
}
function FRs3TemplateRenderable_materialCode(){
   return this._materialCode;
}
function FRs3TemplateRenderable_matrix(){
   return this._matrix;
}
function FRs3TemplateRenderable_unserialize(p){
   var o = this;
   o._modelCode = p.readString();
   o._geometryIndex = p.readUint16();
   o._materialCode = p.readString();
   o._optionInstnaced = p.readBoolean();
   o._instanceCount = p.readUint8();
   o._optionDynamic = p.readBoolean();
   o._optionMerge = p.readBoolean();
   o._optionBoneScale = p.readBoolean();
   o._optionSelect = p.readBoolean();
   o._optionVisible = p.readBoolean();
   o._optionGround = p.readBoolean();
   o._matrix.unserialize(p);
}
function FRs3Texture(o){
   o = RClass.inherits(this, o, FConsole);
   o._themes   = null;
   o._path     = '/assets/theme/'
   o.construct = FRs3Texture_construct;
   o.load      = FRs3Texture_load;
   return o;
}
function FRs3Texture_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FRs3Texture_load(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Theme);
      r.load(u);
      o._themes.set(p, r);
   }
   return r;
}
function FRs3TextureBitmap(o){
   o = RClass.inherits(this, o, FConsole);
   o._themes   = null;
   o._path     = '/assets/theme/'
   o.construct = FRs3TextureBitmap_construct;
   o.load      = FRs3TextureBitmap_load;
   return o;
}
function FRs3TextureBitmap_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FRs3TextureBitmap_load(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Theme);
      r.load(u);
      o._themes.set(p, r);
   }
   return r;
}
function FRs3TextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._themes   = null;
   o._path     = '/assets/theme/'
   o.construct = FRs3TextureConsole_construct;
   o.load      = FRs3TextureConsole_load;
   return o;
}
function FRs3TextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FRs3TextureConsole_load(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Theme);
      r.load(u);
      o._themes.set(p, r);
   }
   return r;
}
function FRs3Theme(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._materials  = null;
   o.materials   = FRs3Theme_materials;
   o.find        = FRs3Theme_find;
   o.unserialize = FRs3Theme_unserialize;
   return o;
}
function FRs3Theme_materials(){
   return this._materials;
}
function FRs3Theme_find(p){
   var ms = this._materials;
   return ms ? ms.get(p) : null;
}
function FRs3Theme_unserialize(p){
   var o = this;
   var c = p.readInt32();
   if(c > 0){
      var ms = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = RClass.create(FRs3Material);
         m.unserialize(p);
         ms.set(m.code(), m);
      }
   }
}
function FRs3ThemeConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._path        = '/assets/theme/'
   o._activeTheme = null;
   o._themes      = null;
   o.construct    = FRs3ThemeConsole_construct;
   o.activeTheme  = FRs3ThemeConsole_activeTheme;
   o.find         = FRs3ThemeConsole_find;
   o.select       = FRs3ThemeConsole_select;
   return o;
}
function FRs3ThemeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FRs3ThemeConsole_activeTheme(){
   return this._activeTheme;
}
function FRs3ThemeConsole_find(p){
   var t = this._activeTheme;
   if(t == null){
      throw new TError('Active theme is empty.');
   }
   return t.find(p);
}
function FRs3ThemeConsole_select(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Theme);
      r.load(u);
      o._themes.set(p, r);
   }
   o._activeTheme = r;
   return r;
}
function FRs3Track(o){
   o = RClass.inherits(this, o, FObject);
   o._optionBoneScale = false;
   o._boneId          = 0;
   o._frameTick       = 0;
   o._matrix          = null;
   o._matrixInvert    = null;
   o._frames          = null;
   o.construct        = FRs3Track_construct;
   o.boneId           = FRs3Track_boneId;
   o.frameTick        = FRs3Track_frameTick;
   o.matrix           = FRs3Track_matrix;
   o.matrixInvert     = FRs3Track_matrixInvert;
   o.frames           = FRs3Track_frames;
   o.unserialize      = FRs3Track_unserialize;
   return o;
}
function FRs3Track_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._matrixInvert = new SMatrix3d();
}
function FRs3Track_boneId(){
   return this._boneId;
}
function FRs3Track_frameTick(){
   return this._frameTick;
}
function FRs3Track_matrix(){
   return this._matrix;
}
function FRs3Track_matrixInvert(){
   return this._matrixInvert;
}
function FRs3Track_frames(){
   return this._frames;
}
function FRs3Track_unserialize(p){
   var o = this;
   o._optionBoneScale = p.readBoolean();
   o._boneId = p.readUint8();
   o._frameTick = p.readUint16();
   o._matrix.unserialize(p);
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   var c = p.readInt16();
   if(c > 0){
      var fs = o._frames = new TObjects();
      for(var i = 0; i < c; i++){
         var f = RClass.create(FRs3Frame);
         f.unserialize(p)
         fs.push(f);
      }
   }
}
function FRs3VertexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   o._geometry    = null;
   o._name        = null;
   o._formatCd    = EG3dAttributeFormat.Unknown;
   o._vertexCount = 0;
   o._stride      = 0;
   o._data        = null;
   o.name         = FRs3VertexBuffer_name;
   o.formatCd     = FRs3VertexBuffer_formatCd;
   o.unserialize  = FRs3VertexBuffer_unserialize;
   o.dispose      = FRs3VertexBuffer_dispose;
   return o;
}
function FRs3VertexBuffer_name(){
   return this._name;
}
function FRs3VertexBuffer_formatCd(){
   return this._formatCd;
}
function FRs3VertexBuffer_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._formatCd = p.readInt8();
   o._stride = p.readInt8();
   var c = o._vertexCount;
   var t = o._stride * c;
   o._data = new ArrayBuffer(t);
   p.readBytes(o._data, 0, t);
}
function FRs3VertexBuffer_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
   o._geometry = null;
   o._name = null;
   o._formatCd = null;
   o._vertexCount = null;
   o._stride = null;
   o._data = null;
}
function SRs3MaterialInfo(o){
   if(!o){o = this;}
   SG3dMaterialInfo(o);
   o.unserialize = SRs3MaterialInfo_unserialize;
   return o;
}
function SRs3MaterialInfo_unserialize(p){
   var o = this;
   o.effectName = p.readString();
   o.transformName = p.readString();
   o.optionLight = p.readBoolean();
   o.optionMerge = p.readBoolean();
   o.optionSort = p.readBoolean();
   o.sortLevel = p.readInt32();
   o.optionAlpha = p.readBoolean();
   o.optionDepth = p.readBoolean();
   o.optionCompare = p.readString();
   o.optionDouble = p.readBoolean();
   o.optionShadow = p.readBoolean();
   o.optionShadowSelf = p.readBoolean();
   o.optionDynamic = p.readBoolean();
   o.optionTransmittance = p.readBoolean();
   o.optionOpacity = p.readBoolean();
   o.coordRateWidth = p.readFloat();
   o.coordRateHeight = p.readFloat();
   o.colorMin = p.readFloat();
   o.colorMax = p.readFloat();
   o.colorRate = p.readFloat();
   o.colorMerge = p.readFloat();
   o.alphaBase = p.readFloat();
   o.alphaRate = p.readFloat();
   o.alphaLevel = p.readFloat();
   o.alphaMerge = p.readFloat();
   o.ambientColor.unserialize(p);
   o.ambientShadow = p.readFloat();
   o.diffuseColor.unserialize(p);
   o.diffuseShadow = p.readFloat();
   o.diffuseViewColor.unserialize(p);
   o.diffuseViewShadow = p.readFloat();
   o.specularColor.unserialize(p);
   o.specularBase = p.readFloat();
   o.specularRate = p.readFloat();
   o.specularAverage = p.readFloat();
   o.specularShadow = p.readFloat();
   o.specularViewColor.unserialize(p);
   o.specularViewBase = p.readFloat();
   o.specularViewRate = p.readFloat();
   o.specularViewAverage = p.readFloat();
   o.specularViewShadow = p.readFloat();
   o.reflectColor.unserialize(p);
   o.reflectMerge = p.readFloat();
   o.reflectShadow = p.readFloat();
   o.refractFrontColor.unserialize(p);
   o.refractBackColor.unserialize(p);
   o.opacityColor.unserialize(p);
   o.opacityRate = p.readFloat();
   o.opacityAlpha = p.readFloat();
   o.opacityDepth = p.readFloat();
   o.opacityTransmittance = p.readFloat();
   o.emissiveColor.unserialize(p);
}
function SRs3SceneShadow(o){
   if(!o){o = this;}
   o.base        = null;
   o.rate        = null;
   o.level       = null;
   o.range       = null;
   o.unserialize = SRs3SceneShadow_unserialize;
   return o;
}
function SRs3SceneShadow_unserialize(p){
   var o = this;
   o.base = p.readFloat();
   o.rate = p.readFloat();
   o.level = p.readFloat();
   o.range = p.readFloat();
}
function FRd3Animation(o){
   o = RClass.inherits(this, o, FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0;
   o._playRate    = 1.0;
   o._bones       = null;
   o._tracks      = null;
   o._resource    = null;
   o._playInfo    = null;
   o.construct    = FRd3Animation_construct;
   o.findBone     = FRd3Animation_findBone;
   o.bones        = FRd3Animation_bones;
   o.findTrack    = FRd3Animation_findTrack;
   o.tracks       = FRd3Animation_tracks;
   o.loadResource = FRd3Animation_loadResource;
   o.process      = FRd3Animation_process;
   o.dispose      = FRd3Animation_dispose;
   return o;
}
function FRd3Animation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new TDictionary();
   o._tracks = new TObjects();
   o._playInfo = new SRd3PlayInfo();
}
function FRd3Animation_findBone(p){
   return this._bones.get(p);
}
function FRd3Animation_bones(){
   return this._bones;
}
function FRd3Animation_findTrack(p){
   var o = this;
   var ts = o._tracks;
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.get(i);
      if(t.boneId() == p){
         return t;
      }
   }
   return null;
}
function FRd3Animation_tracks(){
   return this._tracks;
}
function FRd3Animation_loadResource(p){
   var o = this;
   o._resource = p;
   var rts = p.tracks();
   var c = rts.count();
   for(var i = 0; i < c; i++){
      var rt = rts.get(i);
      var t = RClass.create(FRd3Track);
      t.loadResource(rt);
      o._tracks.push(t);
   }
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.value(i);
      var bi = b.id();
      var t = o.findTrack(bi);
      if(t == null){
         throw new TError('Track is not exists. (bone_id={1})', bi);
      }
      b.setTrackResource(t);
   }
}
function FRd3Animation_process(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   var ct = o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate * 3.0;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      bs.value(i).update(o._playInfo, ct);
   }
}
function FRd3Animation_dispose(){
   var o = this;
   o._bones = null;
   o._tracks = null;
   o._resource = null;
   o.__base.FObject.dispose.call(o);
}
function FRd3Bone(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix          = null
   o._boneResource    = null
   o._trackResource   = null;
   o.construct        = FRd3Bone_construct;
   o.id               = FRd3Bone_id;
   o.matrix           = FRd3Bone_matrix;
   o.trackResource    = FRd3Bone_trackResource;
   o.setTrackResource = FRd3Bone_setTrackResource;
   o.loadResource     = FRd3Bone_loadResource;
   o.update           = FRd3Bone_update;
   o.dispose          = FRd3Bone_dispose;
   return o;
}
function FRd3Bone_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRd3Bone_id(){
   return this._boneResource.id();
}
function FRd3Bone_matrix(){
   return this._matrix;
}
function FRd3Bone_trackResource(){
   return this._trackResource;
}
function FRd3Bone_setTrackResource(p){
   this._trackResource = p;
}
function FRd3Bone_loadResource(p){
   this._boneResource = p;
}
function FRd3Bone_update(pi, pt){
   var o = this;
   var t = o._trackResource;
   t.calculate(pi, pt);
   pi.update();
   o._matrix.assign(t.matrixInvert());
   o._matrix.append(pi.matrix);
}
function FRd3Bone_dispose(){
   var o = this;
   o._boneResource = null;
   o._trackResource = null;
   o.__base.FG3dBone.dispose.call(o);
}
function FRd3Cube(o){
   o = RClass.inherits(this, o, FObject);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup  = FRd3Cube_setup;
   return o;
}
function FRd3Cube_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0, -1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0 ];
   o.vertexPositionBuffer = p.createVertexBuffer();
   o.vertexPositionBuffer.upload(vp, 4 * 3, 8);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0 ];
   o.vertexColorBuffer = p.createVertexBuffer();
   o.vertexColorBuffer.upload(vc, 4 * 4, 8);
   var id = [
      0, 1, 2, 0, 2, 3,
      1, 5, 6, 1, 6, 2,
      5, 4, 7, 5, 7, 6,
      4, 0, 3, 4, 3, 7,
      0, 4, 5, 0, 5, 1,
      3, 2, 6, 3, 6, 7  ];
   o.indexBuffer = context.createIndexBuffer();
   o.indexBuffer.upload(id, 36);
}
function FRd3Geometry(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._ready            = false;
   o._resource         = null;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._boneIds          = null;
   o._textures         = null;
   o.construct         = FRd3Geometry_construct;
   o.testReady         = FRd3Geometry_testReady;
   o.vertexCount       = FRd3Geometry_vertexCount;
   o.findVertexBuffer  = FRd3Geometry_findVertexBuffer;
   o.vertexBuffers     = FRd3Geometry_vertexBuffers;
   o.indexBuffer       = FRd3Geometry_indexBuffer;
   o.material          = FRd3Geometry_material;
   o.findTexture       = FRd3Geometry_findTexture;
   o.textures          = FRd3Geometry_textures;
   o.boneIds           = FRd3Geometry_boneIds;
   o.loadResource      = FRd3Geometry_loadResource;
   return o;
}
function FRd3Geometry_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRd3Geometry_testReady(){
   var o = this;
   if(!o._ready){
      var ts = o._textures;
      if(ts != null){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.value(i);
            if(!t.testReady()){
               return false;
            }
         }
      }
      o._ready = true;
   }
   return o._ready;
}
function FRd3Geometry_vertexCount(){
   return this._resource.vertexCount();
}
function FRd3Geometry_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}
function FRd3Geometry_vertexBuffers(){
   return this._vertexBuffers;
}
function FRd3Geometry_indexBuffer(){
   return this._indexBuffer;
}
function FRd3Geometry_material(){
   return this._material;
}
function FRd3Geometry_findTexture(p){
   return this._textures.get(p);
}
function FRd3Geometry_textures(){
   return this._textures;
}
function FRd3Geometry_boneIds(p){
   return this._boneIds;
}
function FRd3Geometry_loadResource(p){
   var o = this;
   var c = o._context;
   o._resource = p;
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb._formatCd = rv.formatCd();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
   o._boneIds = p.boneIds();
   var mc = p.materialCode();
   var mtl = o._material = RConsole.find(FRs3ThemeConsole).find(mc);
   var mts = mtl.textures();
   if(mts){
      var mtc = mts.count();
      if(mtc > 0){
         var rts = o._textures = new TDictionary();
         var txc = RConsole.find(FRd3TextureConsole)
         for(var n = 0; n < mtc; n++){
            var mt = mts.get(n);
            var rt = txc.load(o._context, mt.bitmapCode(), mt.code());
            rts.set(mt.code(), rt);
         }
      }
   }
}
function FRd3Material(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._material        = null;
   o.construct        = FRd3Material_construct;
   o.findVertexBuffer = FRd3Material_findVertexBuffer;
   o.indexBuffer      = FRd3Material_indexBuffer;
   o.loadResource     = FRd3Material_loadResource;
   return o;
}
function FRd3Material_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRd3Material_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}
function FRd3Material_indexBuffer(){
   return this._indexBuffer;
}
function FRd3Material_loadResource(p){
   var o = this;
   var c = o._context;
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb._formatCd = rv.formatCd();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
   var materialCode = p.materialCode();
   var themeConsole = RConsole.find(FRs3ThemeConsole);
   var material = o._material = themeConsole.find(materialCode);
   var textures = material.textures();
   var textureCount = textures.count();
   for(var n = 0; n < textureCount; n++){
      var texture = textures.get(n);
   }
}
function FRd3Model(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name        = null;
   o._geometrys   = null;
   o._resource    = null;
   o._dataReady       = false;
   o.name         = FRd3Model_name;
   o.setName      = FRd3Model_setName;
   o.geometrys    = FRd3Model_geometrys;
   o.resource     = FRd3Model_resource;
   o.resource     = FRd3Model_resource;
   o.setResource  = FRd3Model_setResource;
   o.testReady    = FRd3Model_testReady;
   o.loadResource = FRd3Model_loadResource;
   o.processLoad  = FRd3Model_processLoad;
   return o;
}
function FRd3Model_name(){
   return this._name;
}
function FRd3Model_setName(p){
   this._name = p;
}
function FRd3Model_geometrys(){
   return this._geometrys;
}
function FRd3Model_resource(){
   return this._resource;
}
function FRd3Model_setResource(p){
   this._resource = p;
}
function FRd3Model_testReady(){
   return this._dataReady;
}
function FRd3Model_loadResource(p){
   var o = this;
   var rgs = p.geometrys();
   if(rgs){
      var gs = o._geometrys = new TObjects();
      var c = rgs.count();
      for(var i = 0; i < c; i++){
         var rg = rgs.get(i);
         var g = RClass.create(FRd3Geometry);
         g.linkContext(o._context);
         g.loadResource(rg);
         gs.push(g);
      }
   }
   o._dataReady = true;
}
function FRd3Model_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   return true;
}
function FRd3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadModels = null;
   o._models     = null;
   o._thread     = null;
   o._interval   = 200;
   o.onProcess   = FRd3ModelConsole_onProcess;
   o.construct   = FRd3ModelConsole_construct;
   o.models      = FRd3ModelConsole_models;
   o.load        = FRd3ModelConsole_load;
   return o;
}
function FRd3ModelConsole_onProcess(){
   var o = this;
   var ms = o._loadModels;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}
function FRd3ModelConsole_construct(){
   var o = this;
   o._loadModels = new TLooper();
   o._models = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FRd3ModelConsole_models(){
   return this._models;
}
function FRd3ModelConsole_load(pc, pn){
   var o = this;
   if(pc == null){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pn)){
      throw new TError('Model name is empty');
   }
   var m = o._models.get(pn);
   if(m){
      return m;
   }
   var rmc = RConsole.find(FRs3ModelConsole);
   var rm = rmc.load(pn);
   m = RClass.create(FRd3Model);
   m.linkContext(pc);
   m.setName(pn);
   m.setResource(rm);
   o._models.set(pn, m);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadModels.push(m);
   }
   return m;
}
function FRd3Pipeline(o){
   o = RClass.inherits(this, o, FObject);
   o._vertexBuffers = null;
   o._indexBuffer   = null;
   o.construct        = FRd3Pipeline_construct;
   o.findVertexBuffer = FRd3Pipeline_findVertexBuffer;
   o.loadResource     = FRd3Pipeline_loadResource;
   return o;
}
function FRd3Pipeline_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRd3Pipeline_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}
function FRd3Pipeline_loadResource(p){
   var o = this;
   var c = o._context;
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
}
function FRd3Rectangle(o){
   o = RClass.inherits(this, o, FObject);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup  = FRd3Rectangle_setup;
   return o;
}
function FRd3Rectangle_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0 ];
   o.vertexPositionBuffer = p.createVertexBuffer();
   o.vertexPositionBuffer.upload(vp, 4 * 3, 4);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0 ];
   o.vertexColorBuffer = p.createVertexBuffer();
   o.vertexColorBuffer.upload(vc, 4 * 4, 4);
   var id = [0, 1, 2, 0, 2, 3];
   o.indexBuffer = context.createIndexBuffer();
   o.indexBuffer.upload(id, 6);
}
function FRd3Texture(o){
   o = RClass.inherits(this, o, FObject);
   o._context    = null;
   o._ready      = false;
   o._image      = null;
   o._texture    = null;
   o.onLoad      = FRd3Texture_onLoad;
   o.construct   = FRd3Texture_construct;
   o.linkContext = FRd3Texture_linkContext;
   o.image       = FRd3Texture_image;
   o.texture     = FRd3Texture_texture;
   o.testReady   = FRd3Texture_testReady;
   o.load        = FRd3Texture_load;
   o.dispose     = FRd3Texture_dispose;
   return o;
}
function FRd3Texture_onLoad(p){
   var o = this;
   var t = o._texture = o._context.createFlatTexture();
   t.upload(p.image());
   o._ready  = true;
}
function FRd3Texture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FRd3Texture_linkContext(p){
   this._context = p;
}
function FRd3Texture_image(){
   return this._image;
}
function FRd3Texture_texture(){
   return this._texture;
}
function FRd3Texture_testReady(){
   return this._ready;
}
function FRd3Texture_load(u){
   var o = this;
   var g = o._image = RClass.create(FImage);
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u);
}
function FRd3Texture_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._image = null;
   o._texture = null;
}
function FRd3TextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._images   = null;
   o._textures = null;
   o._path     = '/assets/texture/';
   o.construct = FRd3TextureConsole_construct;
   o.textures  = FRd3TextureConsole_textures;
   o.load      = FRd3TextureConsole_load;
   return o;
}
function FRd3TextureConsole_construct(){
   var o = this;
   o._images = new TDictionary();
   o._textures = new TDictionary();
}
function FRd3TextureConsole_textures(){
   return this._textures;
}
function FRd3TextureConsole_load(pc, pt, pb){
   var o = this;
   var c = RString.toLower(pt + '/' + pb);
   var t = o._textures.get(c);
   if(t != null){
      return t;
   }
   var u = RBrowser.contentPath(o._path + c + '.jpg');
   RLogger.info(o, 'Load texture from bitmap. (url={1})', u);
   if(RString.toLower(pb) == 'environment'){
      t = RClass.create(FRd3TextureCube);
      t.linkContext(pc);
      t._name = c;
      t.load(RBrowser.contentPath(o._path + c));
   }else{
      t = RClass.create(FRd3Texture);
      t.linkContext(pc);
      t._name = c;
      t.load(u);
   }
   o._textures.set(c, t);
   return t;
}
function FRd3TextureCube(o){
   o = RClass.inherits(this, o, FRd3Texture);
   o.imageX1 = null;
   o.imageX2 = null;
   o.imageY1 = null;
   o.imageY2 = null;
   o.imageZ1 = null;
   o.imageZ2 = null;
   o.onLoad      = FRd3TextureCube_onLoad;
   o.load        = FRd3TextureCube_load;
   return o;
}
function FRd3TextureCube_onLoad(p){
   var o = this;
   if(!o.imageX1.testReady()){
      return;
   }
   if(!o.imageX2.testReady()){
      return;
   }
   if(!o.imageY1.testReady()){
      return;
   }
   if(!o.imageY2.testReady()){
      return;
   }
   if(!o.imageZ1.testReady()){
      return;
   }
   if(!o.imageZ2.testReady()){
      return;
   }
   var t = o._texture = o._context.createCubeTexture();
   t.upload(o.imageX1, o.imageX2, o.imageY1, o.imageY2, o.imageZ1, o.imageZ2);
   o._ready  = true;
}
function FRd3TextureCube_load(u){
   var o = this;
   var g = o.imageX1 = RClass.create(FImage);
   g._name = 'x1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-x1.jpg");
   var g = o.imageX2 = RClass.create(FImage);
   g._name = 'x2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-x2.jpg");
   var g = o.imageY1 = RClass.create(FImage);
   g._name = 'y1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-y1.jpg");
   var g = o.imageY2 = RClass.create(FImage);
   g._name = 'y2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-y2.jpg");
   var g = o.imageZ1 = RClass.create(FImage);
   g._name = 'z1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-z1.jpg");
   var g = o.imageZ2 = RClass.create(FImage);
   g._name = 'z2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-z2.jpg");
}
function FRd3Track(o){
   o = RClass.inherits(this, o, FObject);
   o._frameCount  = 0;
   o._frameTick   = 0;
   o._resource    = null;
   o.boneId       = FRd3Track_boneId;
   o.matrix       = FRd3Track_matrix;
   o.matrixInvert = FRd3Track_matrixInvert;
   o.loadResource = FRd3Track_loadResource;
   o.calculate    = FRd3Track_calculate;
   o.dispose      = FRd3Track_dispose;
   return o;
}
function FRd3Track_boneId(){
   return this._resource.boneId();
}
function FRd3Track_matrix(){
   return this._resource.matrix();
}
function FRd3Track_matrixInvert(){
   return this._resource.matrixInvert();
}
function FRd3Track_loadResource(p){
   var o = this;
   o._resource = p;
   var fs = p.frames();
   if(fs != null){
      o._frameCount = fs.count();
   }
   o._frameTick = p.frameTick();
}
function FRd3Track_calculate(pi, pt){
   var o = this;
   var fc = o._frameCount;
   if(fc == 0){
      return false;
   }
   if(pt < 0){
      pt = -pt;
   }
   var ft = o._frameTick;
   var i = parseInt(pt / ft) % fc;
   var r = o._resource;
   var fs = r.frames();
   var cf = fs.get(i);
   var nf = null;
   if(i < fc -1){
      nf = fs.get(i + 1);
   }else{
      nf = fs.get(0);
   }
   pi.tick = pt;
   pi.rate = (pt % ft) / ft;
   pi.currentFrame = cf;
   pi.nextFrame = nf;
   return true;
}
function FRd3Track_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FG3dTrack.dispose.call(o);
}
function SRd3PlayInfo(o){
   if(!o){o = this;}
   o.tick         = 0;
   o.playRate     = 1.0;
   o.currentFrame = null;
   o.nextFrame    = null;
   o.rate         = 1.0;
   o.alpha        = 1.0;
   o.translation  = new SPoint3();
   o.quaternion   = new SQuaternion();
   o.scale        = new SVector3();
   o.matrix       = new SMatrix3d();
   o.update       = SRd3PlayInfo_update;
   return o;
}
function SRd3PlayInfo_update(){
   var o = this;
   var cf = o.currentFrame;
   if(cf == null){
      return false;
   }
   var nf = o.nextFrame;
   if(nf == null){
      return false;
   }
   var m = o.matrix;
   var ct = cf.translation();
   var cr = cf.quaternion();
   var cs = cf.scale();
   var r = o.rate;
   if((r > 0) && (r < 1)){
      o.translation.slerp(ct, nf.translation(), r);
      o.quaternion.slerp(cr, nf.quaternion(), r);
      o.scale.slerp(cs, nf.scale(), r);
      m.build(o.translation, o.quaternion, o.scale);
   }else{
      m.build(ct, cr, cs);
   }
   return true;
}
function FGraphicContext(o){
   o = RClass.inherits(this, o, FObject);
   o._hCanvas   = null;
   o.construct  = FGraphicContext_construct;
   o.linkCanvas = RMethod.virtual(o, 'linkCanvas');
   o.dispose    = FGraphicContext_dispose;
   return o;
}
function FGraphicContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FGraphicContext_dispose(){
   var o = this;
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
function FGraphicRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o.process = FGraphicRenderable_process;
   return o;
}
function FGraphicRenderable_process(){
}
function FG2dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._native       = null;
   o.construct     = FG2dContext_construct;
   o.linkCanvas    = FG2dContext_linkCanvas;
   o.drawLine      = FG2dContext_drawLine;
   o.drawRecrangle = FG2dContext_drawRecrangle;
   o.drawText      = FG2dContext_drawText;
   o.drawImage     = FG2dContext_drawImage;
   o.fillRecrangle = FG2dContext_fillRecrangle;
   o.dispose       = FG2dContext_dispose;
   return o;
}
function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
}
function FG2dContext_linkCanvas(h){
   var o = this;
   o._hCanvas = h;
   o._native = h.getContext('2d')
}
function FG2dContext_drawLine(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y2);
   c.stroke();
}
function FG2dContext_drawRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.stroke();
}
function FG2dContext_drawText(x, y, t){
   var o = this;
   o._native.fillText(t, x, y);
}
function FG2dContext_drawImage(){
}
function FG2dContext_fillRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.beginPath();
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.closePath();
   c.fill();
}
function FG2dContext_dispose(){
   var o = this;
   o._native = null;
   o.__base.FGraphicContext.dispose.call(o);
}
var EG3dRegionParameter = new function EG3dRegionParameter(){
   var o = this;
   o.Unknown                    = 0;
   o.CameraPosition             = 1;
   o.CameraDirection            = 2;
   o.CameraViewMatrix           = 3;
   o.CameraProjectionMatrix     = 4;
   o.CameraViewProjectionMatrix = 5;
   o.LightPosition              = 6;
   o.LightDirection             = 7;
   o.LightViewMatrix            = 8;
   o.LightProjectionMatrix      = 9;
   o.LightViewProjectionMatrix  = 10;
   o.LightInfo                  = 11;
   return o;
}
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
   o._matrix      = null;
   o._position    = null;
   o._direction   = null;
   o._rotation    = null;
   o._centerFront = 0.6;
   o._centerBack  = 1.0;
   o._focalNear   = 0.1;
   o._focalFar    = 200.0;
   o._planes      = null;
   o._frustum     = null;
   o._viewport    = null;
   o.__axisUp     = null;
   o.__axisX      = null;
   o.__axisY      = null;
   o.__axisZ      = null;
   o.__rotationX  = null;
   o.__rotationY  = null;
   o.__rotationZ  = null;
   o.construct    = FG3dCamera_construct;
   o.matrix       = FG3dCamera_matrix;
   o.position     = FG3dCamera_position;
   o.setPosition  = FG3dCamera_setPosition;
   o.direction    = FG3dCamera_direction;
   o.setDirection = FG3dCamera_setDirection;
   o.frustum      = FG3dCamera_frustum;
   o.doWalk       = FG3dCamera_doWalk;
   o.doStrafe     = FG3dCamera_doStrafe;
   o.doFly        = FG3dCamera_doFly;
   o.doYaw        = FG3dCamera_doYaw;
   o.doPitch      = FG3dCamera_doPitch;
   o.lookAt       = FG3dCamera_lookAt;
   o.update       = FG3dCamera_update;
   return o;
}
function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._rotation = new SQuaternion();
   o._frustum = new SFrustum();
   o._viewport = RClass.create(FG3dViewport);
   o.__axisUp = new SVector3();
   o.__axisUp.set(0, 1, 0);
   o.__axisX = new SVector3();
   o.__axisY = new SVector3();
   o.__axisZ = new SVector3();
   o.__rotationX = new SQuaternion();
   o.__rotationY = new SQuaternion();
   o.__rotationZ = new SQuaternion();
}
function FG3dCamera_position(){
   return this._position;
}
function FG3dCamera_matrix(){
   return this._matrix;
}
function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}
function FG3dCamera_direction(){
   return this._direction;
}
function FG3dCamera_setDirection(x, y, z){
   this._direction.set(x, y, z);
}
function FG3dCamera_frustum(){
   return this._frustum;
}
function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}
function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o.__axisY.x * p;
   o._position.z += o.__axisY.z * p;
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
   var d = o._direction;
   d.set(x - p.x, y - p.y, z - p.z);
   d.normalize();
}
function FG3dCamera_update(){
   var o = this;
   var ax = o.__axisX;
   var ay = o.__axisY;
   var az = o.__axisZ;
   az.assign(o._direction);
   az.normalize();
   o.__axisUp.cross2(ax, az);
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
   o._camera     = null;
   o._viewport   = null;
   o._direction  = null;
   o.construct   = FG3dDirectionalLight_construct;
   o.camera      = FG3dDirectionalLight_camera;
   o.projection  = FG3dDirectionalLight_projection;
   o.viewport    = FG3dDirectionalLight_viewport;
   o.direction   = FG3dDirectionalLight_direction;
   return o;
}
function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._direction = new SVector3();
   o._camera = RClass.create(FG3dPerspectiveCamera);
}
function FG3dDirectionalLight_camera(){
   return this._camera;
}
function FG3dDirectionalLight_projection(){
   return this._projection;
}
function FG3dDirectionalLight_viewport(){
   return this._viewport;
}
function FG3dDirectionalLight_direction(){
   return this._direction;
}
function FG3dEffect(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._code               = null;
   o._stateFillCd        = EG3dFillMode.Face;
   o._stateCullCd        = EG3dCullMode.Front;
   o._stateDepth         = true;
   o._stateDepthCd       = EG3dDepthMode.LessEqual;
   o._stateDepthWrite    = true;
   o._stateBlend         = true;
   o._stateBlendSourceCd = EG3dBlendMode.SourceAlpha;
   o._stateBlendTargetCd = EG3dBlendMode.OneMinusSourceAlpha;
   o._stateAlphaTest     = false;
   o._optionShadow       = false;
   o._optionLightMap     = false;
   o._optionFog          = false;
   o._program            = null;
   o._vertexTemplate     = null;
   o._fragmentTemplate   = null;
   o.setup               = RMethod.empty;
   o.code                = FG3dEffect_code;
   o.program             = FG3dEffect_program;
   o.setParameter        = FG3dEffect_setParameter;
   o.setSampler          = FG3dEffect_setSampler;
   o.drawRenderable      = FG3dEffect_drawRenderable;
   o.buildInfo           = FG3dEffect_buildInfo;
   o.loadConfig          = FG3dEffect_loadConfig;
   o.loadUrl             = FG3dEffect_loadUrl;
   o.load                = FG3dEffect_load;
   o.build               = FG3dEffect_build;
   return o;
}
function FG3dEffect_code(){
   return this._code;
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
function FG3dEffect_buildInfo(f, r){
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
function FG3dEffect_loadConfig(p){
   var o = this;
   var c = o._context;
   var g = o._program = c.createProgram();
   var xs = p.nodes();
   var c = xs.count();
   for(var i = 0; i < c; i++){
      var x = xs.get(i);
      if(x.isName('State')){
         var n = x.get('name');
         var v = x.get('value');
         if(n == 'fill_mode'){
            o._stateFillCd = REnum.parse(EG3dFillMode, v);
         }else if(n == 'cull_mode'){
            o._stateCullCd = REnum.parse(EG3dCullMode, v);
         }else if(n == 'depth_mode'){
            o._stateDepth = true;
            o._stateDepthCd = REnum.parse(EG3dDepthMode, v);
         }else if(n == 'depth_write'){
            o._stateDepthWrite = RBoolean.parse(v);
         }else if(n == 'blend_mode'){
            o._stateBlend = RBoolean.parse(v);
            o._stateBlendSourceCd = REnum.parse(EG3dBlendMode, x.get('source'));
            o._stateBlendTargetCd = REnum.parse(EG3dBlendMode, x.get('target'));
         }else if(n == 'alpha_test'){
            o._stateAlphaTest = RBoolean.parse(v);
         }
      }else if(x.isName('Option')){
         var n = x.get('name');
         var v = x.get('value');
         if(n == 'shadow'){
            o._optionShadow = RBoolean.parse(v);
         }else if(n == 'lightmap'){
            o._optionLightMap = RBoolean.parse(v);
         }else if(n == 'fog'){
            o._optionFog = RBoolean.parse(v);
         }
      }else if(x.isName('Parameter')){
         var pp = RClass.create(FG3dProgramParameter);
         pp.loadConfig(x);
         g.parameters().set(pp.name(), pp);
      }else if(x.isName('Attribute')){
         var pa = RClass.create(FG3dProgramAttribute);
         pa.loadConfig(x);
         g.attributes().set(pa.name(), pa);
      }else if(x.isName('Sampler')){
         var ps = RClass.create(FG3dProgramSampler);
         ps.loadConfig(x);
         g.samplers().set(ps.name(), ps);
      }else if(x.isName('Source')){
         var st = x.get('name');
         if(st == 'vertex'){
            o._vertexSource = x.value();
         }else if(st == 'fragment'){
            o._fragmentSource = x.value();
         }else{
            throw new TError(o, 'Unknown source type. (name={1})', nt);
         }
      }else{
         throw new TError(o, 'Unknown config type. (name={1})', x.name());
      }
   }
   var vt = o._vertexTemplate = RClass.create(FG3dShaderTemplate);
   vt.load(o._vertexSource);
   var ft = o._fragmentTemplate = RClass.create(FG3dShaderTemplate);
   ft.load(o._fragmentSource);
}
function FG3dEffect_loadUrl(u){
   var o = this;
   var x = RClass.create(FXmlConnection);
   var r = x.send(u);
   o.loadConfig(r);
}
function FG3dEffect_build(p){
   var o = this;
   var g = o._program;
   var c = RInstance.get(FTagContext);
   o.buildInfo(c, p);
   var vs = o._vertexTemplate.parse(c);
   var vsf = RString.formatLines(vs);
   g.upload(EG3dShader.Vertex, vsf);
   var fs = o._fragmentTemplate.parse(c);
   var fsf = RString.formatLines(fs);
   g.upload(EG3dShader.Fragment, fsf);
   g.build();
   g.link();
}
function FG3dEffect_load(){
   var o = this;
   var cp = RBrowser.contentPath();
   var ec = RConsole.find(FG3dEffectConsole);
   var u = cp + ec.path() + o._code + ".xml";
   o.loadUrl(u);
}
function FG3dEffectConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templateEffects = null;
   o._effects         = null;
   o._path            = "/assets/shader/";
   o._effectInfo      = null;
   o._tagContext      = null;
   o.construct        = FG3dEffectConsole_construct;
   o.path             = FG3dEffectConsole_path;
   o.create           = FG3dEffectConsole_create;
   o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = FG3dEffectConsole_findTemplate;
   o.find             = FG3dEffectConsole_find;
   return o;
}
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templateEffects = new TDictionary();
   o._effects = new TDictionary();
   o._effectInfo = new SG3dEffectInfo();
   o._tagContext = RClass.create(FTagContext);
}
function FG3dEffectConsole_path(){
   return this._path;
}
function FG3dEffectConsole_create(p){
   var e = null;
   switch(p){
      case 'general.color.automatic':
         e = RClass.create(FG3dGeneralColorAutomaticEffect);
         break;
      case 'general.color.skeleton':
         e = RClass.create(FG3dGeneralColorSkeletonEffect);
         break;
      case 'shadow.depth.automatic':
         e = RClass.create(FG3dShadowDepthAutomaticEffect);
         break;
      case 'shadow.depth.skeleton':
         e = RClass.create(FG3dShadowDepthSkeletonEffect);
         break;
      case 'shadow.color.automatic':
         e = RClass.create(FG3dShadowColorAutomaticEffect);
         break;
      case 'shadow.color.skeleton':
         e = RClass.create(FG3dShadowColorSkeletonEffect);
         break;
      default:
         throw new TError(this, 'Unknown effect type name. (type={1})', p);
   }
   return e;
}
function FG3dEffectConsole_buildEffectInfo(pc, pf, pr){
   var o = this;
   pf.vertexCount = pr.vertexCount();
   var vs = pr.vertexBuffers();
   var c = vs.count();
   for(var i = 0; i < c; i++){
      var v = vs.get(i);
      pf.attributes.push(v.name());
   }
   var ts = pr.textures();
   if(ts){
      var c = ts.count();
      for(var i = 0; i < c; i++){
         pf.samplers.push(ts.name(i));
      }
   }
   var bs = pr.bones();
   if(bs){
      var bc = bs.count();
      pf.vertexBoneCount = bc;
      var cb = pc.capability().calculateBoneCount(pf.vertexBoneCount, pf.vertexCount);
      if(bc > cb){
         bc = cb;
      }
      pr._boneLimit = bc;
      pf.vertexBoneLimit = bc;
   }
}
function FG3dEffectConsole_findTemplate(pc, pn){
   var o = this;
   var es = o._templateEffects;
   var e = es.get(pn);
   if(e == null){
      var e = o.create(pn);
      e.linkContext(pc);
      e.load();
      RLogger.info(o, 'Create effect template. (name={1}, instance={2})', pn, e);
      es.set(pn, e);
   }
   return e;
}
function FG3dEffectConsole_find(pc, pg, pr){
   var o = this;
   var en = pr.material().info().effectName;
   if(RString.isEmpty(en)){
      en = 'automatic'
   }
   var ef = pg.technique().name() + '.' + pg.techniquePass().name() + '.' + en;
   var et = o.findTemplate(pc, ef);
   if(et){
      o._effectInfo.reset();
      o.buildEffectInfo(pc, o._effectInfo, pr);
      et.buildInfo(o._tagContext, o._effectInfo);
      var ec = ef + o._tagContext.code;
      var es = o._effects;
      var e = es.get(ec);
      if(e == null){
         var e = o.create(ef);
         e.linkContext(pc);
         e.load();
         e.build(o._effectInfo);
         RLogger.info(o, 'Create effect. (name={1}, instance={2})', en, e);
      }
      es.set(ec, e);
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
function FG3dOrthoCamera(o){
   o = RClass.inherits(this, o, FG3dCamera);
   o._projection      = null;
   o.construct        = FG3dOrthoCamera_construct;
   o.projection       = FG3dOrthoCamera_projection;
   o.updateFrustum    = FG3dOrthoCamera_updateFrustum;
   o.updateFromCamera = FG3dOrthoCamera_updateFromCamera;
   o.updateFlatCamera = FG3dOrthoCamera_updateFlatCamera;
   return o;
}
function FG3dOrthoCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._projection = RClass.create(FG3dOrthoProjection);
}
function FG3dOrthoCamera_projection(){
   return this._projection;
}
function FG3dOrthoCamera_updateFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dOrthoCamera_updateFromCamera(p){
   var o = this;
   var pf = p.updateFrustum();
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * pf.radius;
   var vy = pf.center.y - d.y * pf.radius;
   var vz = pf.center.z - d.z * pf.radius;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   var f = o._frustum;
   o._matrix.transform(f.coners, pf.coners, 8);
   f.updateCenter();
   o._projection.updateFrustum(f);
}
function FG3dOrthoCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
   var angle = RMath.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance;
   var vy = pf.center.y - d.y * distance;
   var vz = pf.center.z - d.z * distance;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._projection._znear = 0.3;
   o._projection._zfar = distance * 1.5;
   o._projection.update();
}
function FG3dOrthoProjection(o){
   o = RClass.inherits(this, o, FG3dProjection);
   o._matrix       = null;
   o.construct     = FG3dOrthoProjection_construct;
   o.matrix        = FG3dOrthoProjection_matrix;
   o.update        = FG3dOrthoProjection_update;
   o.updateFrustum = FG3dOrthoProjection_updateFrustum;
   return o;
}
function FG3dOrthoProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new SOrthoMatrix3d();
}
function FG3dOrthoProjection_matrix(){
   return this._matrix;
}
function FG3dOrthoProjection_update(){
   var o = this;
   var s = o._size;
   o._matrix.identity();
   var d = o._matrix.data();
   d[ 0] = 2.0 / s.width * 8.0;
   d[ 4] = d[ 8] = d[12] = 0.0;
   d[ 5] = 2.0 / s.height * 8.0;
   d[ 1] = d[ 9] = d[13] = 0.0;
   d[10] = 1.0 / (o._znear - o._zfar);
   d[ 2] = d[ 6] = d[14] = 0.0;
   d[ 3] = d[ 7] = 0.0;
   d[11] = o._znear / (o._znear - o._zfar);
   d[15] = 1.0;
}
function FG3dOrthoProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
function FG3dPerspectiveCamera(o){
   o = RClass.inherits(this, o, FG3dCamera);
   o._projection       = null;
   o._centerFront      = 0.4;
   o.construct         = FG3dPerspectiveCamera_construct;
   o.projection        = FG3dPerspectiveCamera_projection;
   o.updateFrustum     = FG3dPerspectiveCamera_updateFrustum;
   o.updateFlatFrustum = FG3dPerspectiveCamera_updateFlatFrustum;
   o.updateFromCamera  = FG3dPerspectiveCamera_updateFromCamera;
   o.updateFlatCamera  = FG3dPerspectiveCamera_updateFlatCamera;
   return o;
}
function FG3dPerspectiveCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._projection = RClass.create(FG3dPerspectiveProjection);
}
function FG3dPerspectiveCamera_projection(){
   return this._projection;
}
function FG3dPerspectiveCamera_updateFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dPerspectiveCamera_updateFlatFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.updateFlat(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dPerspectiveCamera_updateFromCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFrustum();
   var angle = RMath.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance;
   var vy = pf.center.y - d.y * distance;
   var vz = pf.center.z - d.z * distance;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._matrix.transform(f.coners, pf.coners, 8);
   f.updateCenter();
   o._projection.updateFrustum(f);
}
function FG3dPerspectiveCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
   var angle = RMath.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance * o._centerFront;
   var vy = pf.center.y - d.y * distance * o._centerFront;
   var vz = pf.center.z - d.z * distance * o._centerFront;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._projection._znear = 0.1;
   o._projection._zfar = distance;
   o._projection.update();
}
function FG3dPerspectiveProjection(o){
   o = RClass.inherits(this, o, FG3dProjection);
   o._matrix       = null;
   o.construct     = FG3dPerspectiveProjection_construct;
   o.matrix        = FG3dPerspectiveProjection_matrix;
   o.update        = FG3dPerspectiveProjection_update;
   o.updateFrustum = FG3dPerspectiveProjection_updateFrustum;
   return o;
}
function FG3dPerspectiveProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new SPerspectiveMatrix3d();
}
function FG3dPerspectiveProjection_matrix(){
   return this._matrix;
}
function FG3dPerspectiveProjection_update(){
   var o = this;
   var s = o._size;
   o._fieldOfView = RMath.DEGREE_RATE * o._angle;
   o._matrix.perspectiveFieldOfViewLH(o._fieldOfView, s.width / s.height, o._znear, o._zfar);
}
function FG3dPerspectiveProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
function FG3dPointLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dProjection(o){
   o = RClass.inherits(this, o, FObject);
   o._size        = null;
   o._angle       = 60.0;
   o._fieldOfView = 0;
   o._znear       = 0.1;
   o._zfar        = 200.0;
   o._scale       = 0;
   o.construct   = FG3dProjection_construct;
   o.size        = FG3dProjection_size;
   o.angle       = FG3dProjection_angle;
   o.znear       = FG3dProjection_znear;
   o.zfar        = FG3dProjection_zfar;
   o.distance    = FG3dProjection_distance;
   return o;
}
function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();;
}
function FG3dProjection_size(){
   return this._size;
}
function FG3dProjection_angle(){
   return this._angle;
}
function FG3dProjection_znear(){
   return this._znear;
}
function FG3dProjection_zfar(){
   return this._zfar;
}
function FG3dProjection_distance(){
   return this._zfar - this._znear;
}
function FG3dRegion(o){
   o = RClass.inherits(this, o, FObject);
   o._spaceName                  = null;
   o._technique                  = null;
   o._techniquePass              = null;
   o._camera                     = null;
   o._projection                 = null;
   o._directionalLight           = null
   o._lights                     = null
   o._renderables                = null;
   o._cameraPosition             = null;
   o._cameraDirection            = null;
   o._cameraViewMatrix           = null;
   o._cameraProjectionMatrix     = null;
   o._cameraViewProjectionMatrix = null;
   o._lightPosition              = null;
   o._lightDirection             = null;
   o._lightViewMatrix            = null;
   o._lightProjectionMatrix      = null;
   o._lightViewProjectionMatrix  = null;
   o._lightInfo                  = null;
   o.construct                   = FG3dRegion_construct;
   o.spaceName                   = FG3dRegion_spaceName;
   o.technique                   = FG3dRegion_technique;
   o.setTechnique                = FG3dRegion_setTechnique;
   o.techniquePass               = FG3dRegion_techniquePass;
   o.setTechniquePass            = FG3dRegion_setTechniquePass;
   o.camera                      = FG3dRegion_camera;
   o.directionalLight            = FG3dRegion_directionalLight;
   o.lights                      = FG3dRegion_lights;
   o.renderables                 = FG3dRegion_renderables;
   o.pushRenderable              = FG3dRegion_pushRenderable;
   o.prepare                     = FG3dRegion_prepare;
   o.calculate                   = FG3dRegion_calculate;
   o.update                      = FG3dRegion_update;
   o.dispose                     = FG3dRegion_dispose;
   return o;
}
function FG3dRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._lights = new TObjects();
   o._renderables = new TObjects();
   o._cameraPosition = new SPoint3();
   o._cameraDirection = new SVector3();
   o._cameraViewMatrix = new SMatrix3d();
   o._cameraProjectionMatrix = new SMatrix3d();
   o._cameraViewProjectionMatrix = new SMatrix3d();
   o._lightPosition = new SPoint3();
   o._lightDirection = new SVector3();
   o._lightViewMatrix = new SMatrix3d();
   o._lightProjectionMatrix = new SMatrix3d();
   o._lightViewProjectionMatrix = new SMatrix3d();
   o._lightInfo = new SVector4();
}
function FG3dRegion_spaceName(){
   return this._spaceName;
}
function FG3dRegion_technique(){
   return this._technique;
}
function FG3dRegion_setTechnique(p){
   this._technique = p;
}
function FG3dRegion_techniquePass(){
   return this._techniquePass;
}
function FG3dRegion_setTechniquePass(p){
   var o = this;
   o._techniquePass = p;
   o._spaceName = o._technique.name() + '.' + p.name();
}
function FG3dRegion_camera(){
   return this._camera;
}
function FG3dRegion_directionalLight(){
   return this._directionalLight;
}
function FG3dRegion_lights(){
   return this._lights;
}
function FG3dRegion_renderables(p){
   return this._renderables;
}
function FG3dRegion_pushRenderable(p){
   this._renderables.push(p);
}
function FG3dRegion_prepare(){
   var o = this;
   var c = o._camera;
   var cp = c.projection();
   o._cameraPosition.assign(c.position());
   o._cameraDirection.assign(c.direction());
   o._cameraViewMatrix.assign(c.matrix());
   o._cameraProjectionMatrix.assign(cp.matrix());
   o._cameraViewProjectionMatrix.assign(c.matrix());
   o._cameraViewProjectionMatrix.append(cp.matrix());
   var l = o._directionalLight;
   var lc = l.camera();
   var lcp = lc.position();
   var lp = lc.projection();
   o._lightPosition.assign(lc.position());
   o._lightDirection.assign(lc.direction());
   o._lightViewMatrix.assign(lc.matrix());
   o._lightProjectionMatrix.assign(lp.matrix());
   o._lightViewProjectionMatrix.assign(lc.matrix());
   o._lightViewProjectionMatrix.append(lp.matrix());
   o._lightInfo.set(0, 0, lp._znear, 1.0 / lp.distance());
   o._renderables.clear();
}
function FG3dRegion_calculate(p){
   var o = this;
   switch(p){
      case EG3dRegionParameter.CameraPosition:
         return o._cameraPosition;
      case EG3dRegionParameter.CameraDirection:
         return o._cameraDirection;
      case EG3dRegionParameter.CameraViewMatrix:
         return o._cameraViewMatrix;
      case EG3dRegionParameter.CameraProjectionMatrix:
         return o._cameraProjectionMatrix;
      case EG3dRegionParameter.CameraViewProjectionMatrix:
         return o._cameraViewProjectionMatrix;
      case EG3dRegionParameter.LightPosition:
         return o._lightPosition;
      case EG3dRegionParameter.LightDirection:
         return o._lightDirection;
      case EG3dRegionParameter.LightViewMatrix:
         return o._lightViewMatrix;
      case EG3dRegionParameter.LightProjectionMatrix:
         return o._lightProjectionMatrix;
      case EG3dRegionParameter.LightViewProjectionMatrix:
         return o._lightViewProjectionMatrix;
      case EG3dRegionParameter.LightInfo:
         return o._lightInfo;
   }
   throw new TError(o, 'Unknown parameter type. (type_cd={1})', p);
}
function FG3dRegion_update(){
   var o = this;
   var rs = o._renderables;
   var c = rs.count();
   for(var i = 0; i < c; i++){
      rs.get(i).update(o);
   }
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
   o._activeEffect = null;
   o._effects      = null;
   o._materialName = null;
   o._material     = null;
   o.construct       = FG3dRenderable_construct;
   o.matrix          = FG3dRenderable_matrix;
   o.effectName      = FG3dRenderable_effectName;
   o.activeEffect    = FG3dRenderable_activeEffect;
   o.setActiveEffect = FG3dRenderable_setActiveEffect;
   o.effects         = FG3dRenderable_effects;
   o.material        = FG3dRenderable_material;
   o.testVisible     = RMethod.virtual(o, 'testVisible');
   o.update          = FG3dRenderable_update;
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
function FG3dRenderable_activeEffect(){
   return this._activeEffect;
}
function FG3dRenderable_setActiveEffect(p){
   this._activeEffect = p;
}
function FG3dRenderable_effects(){
   var o = this;
   var es = o._effects;
   if(es == null){
      es = o._effects = new TDictionary();
   }
   return es;
}
function FG3dRenderable_material(){
   return this._material;
}
function FG3dRenderable_update(p){
}
function FG3dShaderTemplate(o){
   o = RClass.inherits(this, o, FTagDocument);
   o._space  = 'shader';
   return o;
}
function FG3dSpotLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dTechnique(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name        = null;
   o._passes      = null;
   o.construct    = FG3dTechnique_construct;
   o.name         = FG3dTechnique_name;
   o.updateRegion = RMethod.empty;
   o.drawRegion   = FG3dTechnique_drawRegion;
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
   r.setTechnique(o);
   var ps = o._passes;
   var c = ps.count();
   for(var n = 0; n < c; n++){
      var p = ps.get(n);
      r.setTechniquePass(p);
      p._finish = (n == c - 1);
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
   o._index     = null;
   o._finish    = false;
   o.setup      = RMethod.empty;
   o.name       = FG3dTechniquePass_name;
   o.drawRegion = FG3dTechniquePass_drawRegion;
   return o;
}
function FG3dTechniquePass_name(){
   return this._name;
}
function FG3dTechniquePass_drawRegion(p){
   var o = this;
   var sn = p.spaceName();
   var rs = p.renderables();
   var c = rs.count();
   for(var i = 0; i < c; i++){
      var r = rs.get(i);
      var e = r.effects().get(sn);
      if(e == null){
         e = RConsole.find(FG3dEffectConsole).find(o._context, p, r);
         r.effects().set(sn, e);
      }
      r.setActiveEffect(e);
   }
   for(var i = 0; i < c; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      o._context.setProgram(e.program());
      e.drawRenderable(p, r);
   }
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
   o.code                  = null;
   o.fillModeCd            = null;
   o.optionCullMode        = null;
   o.cullModeCd            = null;
   o.optionDepthTest       = null;
   o.depthModeCd           = null;
   o.optionDepthWrite      = null;
   o.optionBlendMode       = null;
   o.blendSourceMode       = null;
   o.blendTargetMode       = null;
   o.optionAlphaTest       = null;
   o.supportInstance       = null;
   o.vertexCount           = 0;
   o.vertexColor           = null;
   o.vertexCoord           = null;
   o.vertexNormal          = null;
   o.vertexNormalFull      = null;
   o.vertexSkeleton        = null;
   o.vertexBoneCount       = 0;
   o.fragmentAlpha         = null;
   o.fragmentBump          = null;
   o.fragmentAmbient       = null;
   o.fragmentDiffuse       = null;
   o.fragmentDiffuseView   = null;
   o.fragmentSpecularColor = null;
   o.fragmentSpecularLevel = null;
   o.fragmentSpecularView  = null;
   o.fragmentEnvironment   = null;
   o.fragmentLight         = null;
   o.fragmentReflect       = null;
   o.fragmentRefract       = null;
   o.fragmentEmissive      = null;
   o.fragmentHeight        = null;
   o.attributes            = new TArray();
   o.samplers              = new TArray();
   o.attributeContains     = SG3dEffectInfo_attributeContains;
   o.samplerContains       = SG3dEffectInfo_samplerContains;
   o.reset                 = SG3dEffectInfo_reset;
   o.reset();
   return o;
}
function SG3dEffectInfo_attributeContains(p){
   return this.attributes.contains(p);
}
function SG3dEffectInfo_samplerContains(p){
   return this.samplers.contains(p);
}
function SG3dEffectInfo_reset(){
   var o = this;
   o.code = null;
   o.fillModeCd = EG3dFillMode.Fill;
   o.optionCullMode = true;
   o.cullModeCd = EG3dCullMode.Front;
   o.optionDepthTest = true;
   o.depthModeCd = EG3dDepthMode.Less;
   o.optionDepthWrite = true;
   o.optionBlendMode = false;
   o.blendSourceMode = EG3dBlendMode.SourceAlpha;
   o.blendTargetMode = EG3dBlendMode.OneMinusSourceAlpha;
   o.optionAlphaTest = false;
   o.supportInstance = false;
   o.vertexCount = 0;
   o.vertexColor = false;
   o.vertexCoord = false;
   o.vertexNormal = false;
   o.vertexNormalFull = false;
   o.vertexSkeleton = false;
   o.vertexBoneCount = 0;
   o.fragmentAlpha = false;
   o.fragmentBump = false;
   o.fragmentAmbient = false;
   o.fragmentDiffuse = false;
   o.fragmentDiffuseView = false;
   o.fragmentSpecularColor = false;
   o.fragmentSpecularLevel = false;
   o.fragmentSpecularView = false;
   o.fragmentEnvironment = false;
   o.fragmentLight = false;
   o.fragmentReflect = false;
   o.fragmentRefract = false;
   o.fragmentEmissive = false;
   o.fragmentHeight = false;
   o.attributes.clear();
   o.samplers.clear();
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
var EG3dAttribute = new function EG3dAttribute(){
   var o = this;
   o.Position   = 'position';
   o.Color      = 'color';
   o.Coord      = 'coord';
   o.Normal     = 'normal';
   o.Binormal   = 'binormal';
   o.Tangent    = 'tangent';
   o.BoneIndex  = 'bone_index';
   o.BoneWeight = 'bone_weight';
   return o;
}
var EG3dAttributeFormat = new function EG3dAttributeFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Byte4 = 5;
   o.Byte4Normal = 6;
   return o;
}
var EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   o.None = 0;
   o.SourceAlpha= 1;
   o.OneMinusSourceAlpha = 2;
   return o;
}
var EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
var EG3dDepthMode = new function EG3dDepthMode(){
   var o = this;
   o.None = 0;
   o.Equal = 1;
   o.NotEqual = 2;
   o.Less = 3;
   o.LessEqual = 4;
   o.Greater = 5;
   o.GreaterEqual = 6;
   o.Always = 7;
   return o;
}
var EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
var EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
var EG3dParameterFormat = new function EG3dParameterFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Float3x3 = 5;
   o.Float4x3 = 6;
   o.Float4x4 = 7;
   return o;
}
var EG3dSampler = new function EG3dSampler(){
   var o = this;
   o.Diffuse       = 'Diffuse';
   o.Alpha         = 'Alpha';
   o.Normal        = 'Normal';
   o.SpecularColor = 'SpecularColor';
   o.SpecularLevel = 'SpecularLevel';
   o.Light         = 'Light';
   o.Reflect       = 'Reflect';
   o.Refract       = 'Refract';
   o.Emissive      = 'Emissive';
   o.Height        = 'Height';
   o.Environment   = 'Environment';
   return o;
}
var EG3dSamplerFilter = new function EG3dSamplerFilter(){
   var o = this;
   o.Unknown       = 0;
   o.Nearest       = 1;
   o.Linear        = 2;
   o.Repeat        = 3;
   o.ClampToEdge   = 4;
   o.ClampToBorder = 5;
   return o;
}
var EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
var EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
function FG3dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._size               = null;
   o._capability         = null;
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o.construct           = FG3dContext_construct;
   o.linkCanvas          = FG3dContext_linkCanvas;
   o.size                = FG3dContext_size;
   o.capability          = FG3dContext_capability;
   o.createProgram       = RMethod.virtual(o, 'createProgram');
   o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
   o.createRenderTarget  = RMethod.virtual(o, 'createRenderTarget');
   o.setFillMode         = RMethod.virtual(o, 'setFillMode');
   o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
   o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
   o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
   o.setRenderTarget     = RMethod.virtual(o, 'setRenderTarget');
   o.setProgram          = RMethod.virtual(o, 'setProgram');
   o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = RMethod.virtual(o, 'bindTexture');
   o.clear               = RMethod.virtual(o, 'clear');
   o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
   o.present             = RMethod.virtual(o, 'present');
   o.dispose             = FG3dContext_dispose;
   return o;
}
function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._size = new SSize2();
}
function FG3dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}
function FG3dContext_size(){
   return this._size;
}
function FG3dContext_capability(){
   return this._capability;
}
function FG3dContext_dispose(){
   var o = this;
   o._program = null;
   o.__base.FGraphicContext.dispose.call(o);
}
function FG3dCubeTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.size = 0;
   o.construct = FG3dTexture_construct;
   return o;
}
function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Cube;
}
function FG3dFlatTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.width        = 0;
   o.height       = 0;
   o.construct    = FG3dFlatTexture_construct;
   return o;
}
function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Flat2d;
}
function FG3dFragmentShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function FG3dIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._strideCd = EG3dIndexStride.Uint16;
   o._count    = 0;
   o.strideCd  = FG3dIndexBuffer_strideCd;
   o.count     = FG3dIndexBuffer_count;
   o.upload    = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dIndexBuffer_strideCd(){
   return this._strideCd;
}
function FG3dIndexBuffer_count(){
   return this._count;
}
function FG3dProgram(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   o._vertexShader     = null;
   o._fragmentShader   = null;
   o.hasAttribute      = FG3dProgram_hasAttribute;
   o.registerAttribute = FG3dProgram_registerAttribute;
   o.findAttribute     = FG3dProgram_findAttribute;
   o.attributes        = FG3dProgram_attributes;
   o.hasParameter      = FG3dProgram_hasParameter;
   o.registerParameter = FG3dProgram_registerParameter;
   o.findParameter     = FG3dProgram_findParameter;
   o.parameters        = FG3dProgram_parameters;
   o.hasSampler        = FG3dProgram_hasSampler;
   o.registerSampler   = FG3dProgram_registerSampler;
   o.findSampler       = FG3dProgram_findSampler;
   o.samplers          = FG3dProgram_samplers;
   o.vertexShader      = RMethod.virtual(o, 'vertexShader');
   o.fragmentShader    = RMethod.virtual(o, 'fragmentShader');
   o.setAttribute      = FG3dProgram_setAttribute;
   o.setParameter      = FG3dProgram_setParameter;
   o.setParameter4     = FG3dProgram_setParameter4;
   o.setSampler        = FG3dProgram_setSampler;
   o.upload            = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = RClass.create(FG3dProgramAttribute);
   r._name = n;
   o.attributes().set(n, r);
   return r;
}
function FG3dProgram_findAttribute(n){
   return this._attributes ? this._attributes.get(n) : null;
}
function FG3dProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerParameter(pn, pf){
   var o = this;
   var r = RClass.create(FG3dProgramParameter);
   r._name = pn;
   r.formatCd = pf;
   o.parameters().set(pn, r);
   return r;
}
function FG3dProgram_findParameter(n){
   return this._parameters ? this._parameters.get(n) : null;
}
function FG3dProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerSampler(pn){
   var o = this;
   var r = RClass.create(FG3dProgramSampler);
   r._name = pn;
   o.samplers().set(pn, r);
   return r;
}
function FG3dProgram_findSampler(n){
   return this._samplers ? this._samplers.get(n) : null;
}
function FG3dProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new TDictionary();
   }
   return r;
}
function FG3dProgram_setAttribute(pn, pb, pf){
   var o = this;
   var p = o.findAttribute(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid attribute. (name={1})', pn);
   }
   o._context.bindVertexBuffer(p._slot, pb, 0, pf);
}
function FG3dProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.findParameter(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid parameter. (name={1})', pn);
   }
   var d = null;
   var t = pv.constructor;
   if((t == Float32Array) || (t == SMatrix3d) || (t == SPerspectiveMatrix3d)){
      d = pv;
   }else if(t == SColor4){
      d = RTypeArray.float4();
      d[0] = pv.red;
      d[1] = pv.green;
      d[2] = pv.blue;
      d[3] = pv.alpha;
   }else if((t == SPoint3) || (t == SVector3)){
      d = RTypeArray.float3();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
   }else if((t == SPoint4) || (t == SVector4)){
      d = RTypeArray.float4();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
      d[3] = pv.w;
   }else{
      throw new TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
   }
   o._context.bindConst(null, p._slot, p._formatCd, d, pc);
}
function FG3dProgram_setParameter4(pn, px, py, pz, pw){
   var v = RTypeArray.float4();
   v[0] = px;
   v[1] = py;
   v[2] = pz;
   v[3] = pw;
   this.setParameter(pn, v, 1);
}
function FG3dProgram_setSampler(pn, pt){
   var o = this;
   var p = o.findSampler(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid sampler. (name={1})', pn);
   }
   o._context.bindTexture(p._slot, p._index, pt);
}
function FG3dProgramAttribute(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._slot       = -1;
   o._index      = -1;
   o._formatCd   = EG3dAttributeFormat.Unknown;
   o.name        = FG3dProgramAttribute_name;
   o.linker      = FG3dProgramAttribute_linker;
   o.loadConfig  = FG3dProgramAttribute_loadConfig;
   return o;
}
function FG3dProgramAttribute_name(){
   return this._name;
}
function FG3dProgramAttribute_linker(){
   return this._linker;
}
function FG3dProgramAttribute_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dAttributeFormat, p.get('format'));
}
function FG3dProgramParameter(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._shaderCd   = -1;
   o._formatCd   = EG3dParameterFormat.Unknown;
   o._slot       = -1;
   o._size       = 0;
   o._buffer     = null;
   o.name        = FG3dProgramParameter_name;
   o.linker      = FG3dProgramParameter_linker;
   o.loadConfig  = FG3dProgramParameter_loadConfig;
   return o;
}
function FG3dProgramParameter_name(){
   return this._name;
}
function FG3dProgramParameter_linker(){
   return this._linker;
}
function FG3dProgramParameter_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dParameterFormat, p.get('format'));
}
function FG3dProgramSampler(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._formatCd   = EG3dTexture.Flat2d;
   o._bind       = true;
   o._slot       = -1;
   o._index      = 0;
   o._source     = null;
   o.name        = FG3dProgramSampler_name;
   o.linker      = FG3dProgramSampler_linker;
   o.formatCd    = FG3dProgramSampler_formatCd;
   o.loadConfig  = FG3dProgramSampler_loadConfig;
   return o;
}
function FG3dProgramSampler_name(){
   return this._name;
}
function FG3dProgramSampler_linker(){
   return this._linker;
}
function FG3dProgramSampler_formatCd(){
   return this._formatCd;
}
function FG3dProgramSampler_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._bind = RBoolean.parse(p.get('bind', 'Y'));
   o._formatCd = REnum.encode(EG3dTexture, p.get('format', 'Flat2d'));
}
function FG3dRenderTarget(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._size     = null;
   o._color    = null;
   o._textures = null;
   o.construct = FG3dRenderTarget_construct;
   o.size      = FG3dRenderTarget_size;
   o.color     = FG3dRenderTarget_color;
   o.textures  = FG3dRenderTarget_textures;
   return o;
}
function FG3dRenderTarget_construct(){
   var o = this;
   o.__base.FG3dObject.construct();
   o._size = new SSize2();
   o._color = new SColor4();
   o._color.set(0.0, 0.0, 0.0, 1.0);
}
function FG3dRenderTarget_size(){
   return this._size;
}
function FG3dRenderTarget_color(){
   return this._color;
}
function FG3dRenderTarget_textures(){
   var o = this;
   var r = o._textures;
   if(r == null){
      r = o._textures = new TObjects();
   }
   return r;
}
function FG3dShader(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._source = null;
   o.source  = FG3dShader_source;
   o.upload  = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dShader_source(){
   return this._source;
}
function FG3dTexture(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._textureCd   = EG3dTexture.Unknown;
   o._statusLoad  = false;
   o._filterMinCd = EG3dSamplerFilter.Linear;
   o._filterMagCd = EG3dSamplerFilter.Linear;
   o._wrapS       = EG3dSamplerFilter.Unknown;
   o._wrapT       = EG3dSamplerFilter.Unknown;
   o.textureCd    = FG3dTexture_textureCd;
   o.filterMinCd  = FG3dTexture_filterMinCd;
   o.filterMagCd  = FG3dTexture_filterMagCd;
   o.setFilter    = FG3dTexture_setFilter;
   o.wrapS        = FG3dTexture_wrapS;
   o.wrapT        = FG3dTexture_wrapT;
   o.setWrap      = FG3dTexture_setWrap;
   return o;
}
function FG3dTexture_textureCd(){
   return this._textureCd;
}
function FG3dTexture_filterMinCd(){
   return this._filterMinCd;
}
function FG3dTexture_filterMagCd(){
   return this._filterMagCd;
}
function FG3dTexture_setFilter(pi, pa){
   var o = this;
   o._filterMinCd = pi;
   o._filterMagCd = pa;
}
function FG3dTexture_wrapS(){
   return this._wrapS;
}
function FG3dTexture_wrapT(){
   return this._wrapT;
}
function FG3dTexture_setWrap(ps, pt){
   var o = this;
   o._wrapS = ps;
   o._wrapT = pt;
}
function FG3dVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name     = 0;
   o._formatCd = EG3dAttributeFormat.Unknown;
   o.stride    = 0;
   o.count     = 0;
   o.name   = FG3dVertexBuffer_name;
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dVertexBuffer_name(){
   return this._name;
}
function FG3dVertexShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function SG3dContextCapability(o){
   if(!o){o = this;}
   o.vendor                 = null;
   o.version                = null;
   o.shaderVersion          = null;
   o.attributeCount         = null;
   o.vertexCount            = 65536;
   o.vertexConst            = null;
   o.fragmentConst          = null;
   o.varyingCount           = null;
   o.samplerCount           = null;
   o.samplerSize            = null;
   o.calculateBoneCount     = SG3dContextCapability_calculateBoneCount;
   o.calculateInstanceCount = SG3dContextCapability_calculateInstanceCount;
   return o;
}
function SG3dContextCapability_calculateBoneCount(bc, vc){
   var o = this;
   var rb = 0;
   var bi = bc % 8;
   if(bi != 0){
      rb = bc + 8 - bi;
   }else{
      rb = bc;
   }
   var r = 0;
   var ib = (o.vertexConst - 16) / 4;
   if(rb > ib){
      r = ib;
   }else{
      r = rb;
   }
   return r;
}
function SG3dContextCapability_calculateInstanceCount(bc, vc){
   var o = this;
   var cr = (4 * bc) + 4;
   var ib = (o.vertexConst - 16) / cr;
   var r = cl;
   if(vc > 0){
      var iv = o.vertexCount / vc;
      r = Math.min(ib, iv);
   }
   if(r > 64){
      r = 64;
   }
   return r;
}
function FG3dAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dEffect);
   o._optionBlendMode = true;
   o._supportInstance         = false;
   o._supportVertexColor      = true;
   o._supportVertexCoord      = true;
   o._supportVertexNormal     = true;
   o._supportVertexNormalFull = true;
   o._supportInstance         = false;
   o._supportSkeleton         = false;
   o._supportAlpha            = true;
   o._supportAmbient          = true;
   o._supportDiffuse          = true;
   o._supportDiffuseView      = true;
   o._supportSpecularColor    = true;
   o._supportSpecularLevel    = true;
   o._supportSpecularView     = true;
   o._supportLight            = true;
   o._supportReflect          = true;
   o._supportRefract          = true;
   o._supportEmissive         = true;
   o._supportHeight           = true;
   o._supportEnvironment      = true;
   o._dynamicSkeleton         = true;
   o.buildInfo                = FG3dAutomaticEffect_buildInfo;
   o.bindAttributes           = FG3dAutomaticEffect_bindAttributes;
   o.bindSamplers             = FG3dAutomaticEffect_bindSamplers;
   o.bindMaterial             = FG3dAutomaticEffect_bindMaterial;
   return o;
}
function FG3dAutomaticEffect_buildInfo(pt, pc){
   var o = this;
   var s = new TString();
   var cb = o._context.capability();
   var ac = pc.attributeContains(EG3dAttribute.Color);
   o._dynamicVertexColor = (o._supportVertexColor && ac);
   if(o._dynamicVertexColor){
      s.append("|AC");
      pt.setBoolean("vertex.attribute.color", true);
   }
   var ad = pc.attributeContains(EG3dAttribute.Coord);
   o._dynamicVertexCoord = (o._supportVertexCoord && ad);
   if(o._dynamicVertexCoord){
      s.append("|AD");
      pt.setBoolean("vertex.attribute.coord", true);
   }
   var an = pc.attributeContains(EG3dAttribute.Normal);
   o._dynamicVertexNormal = (o._supportVertexNormal && an);
   if(o._dynamicVertexNormal){
      s.append("|AN");
      pt.setBoolean("vertex.attribute.normal", true);
   }
   var ab = pc.attributeContains(EG3dAttribute.Binormal);
   var at = pc.attributeContains(EG3dAttribute.Tangent);
   var af = (an && ab && at);
   o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
   if(o._dynamicVertexNormalFull){
      s.append("|AF");
      pt.setBoolean("vertex.attribute.normal.full", true);
   }
   o._dynamicInstance = (o._supportInstance && cb.optionInstance);
   if(o._dynamicInstance){
      s.append("|SI");
      if(pc){
         pt.setBoolean("support.instance", true);
      }
   }
   o._dynamicSkeleton = o._supportSkeleton;
   if(o._dynamicSkeleton){
      s.append("|SS");
      if(pc){
         pt.setBoolean("support.skeleton", true);
      }
   }
   var sdf  = pc.samplerContains(EG3dSampler.Diffuse);
   o._dynamicAlpha = o._supportAlpha;
   if(o._dynamicAlpha){
      s.append("|RA");
      if(pc){
         pt.setBoolean("support.alpha", true);
      }
      o._optionBlendMode = true;
   }else{
      o._optionBlendMode = false;
   }
   o._dynamicAmbient = o._supportAmbient;
   if(o._dynamicAmbient){
      s.append("|TA");
      if(pc){
         pt.setBoolean("support.ambient", true);
      }
      if(sdf){
         s.append("|TAS");
         if(pc){
            pt.setBoolean("support.ambient.sampler", true);
         }
      }
   }
   var snr = pc.samplerContains(EG3dSampler.Normal);
   o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
   if(o._supportDiffuse){
      if(pc){
         pt.setBoolean("support.diffuse", true);
      }
      if(snr){
         s.append("|TDD");
         if(pc){
            pt.setBoolean("support.dump", true);
            pt.setBoolean("support.diffuse.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         s.append("|TDN");
         if(pc){
            pt.setBoolean("support.diffuse.normal", true);
         }
      }
   }
   o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
   if(o._supportDiffuseView){
      if(pc){
         pt.setBoolean("support.diffuse.view", true);
      }
      if(snr){
         s.append("|TDVD");
         if(pc){
            pt.setBoolean("support.dump", true);
            pt.setBoolean("support.diffuse.view.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         s.append("|TDVN");
         if(pc){
            pt.setBoolean("support.diffuse.view.normal", true);
         }
      }
   }
   var spc = pc.samplerContains(EG3dSampler.SpecularColor);
   var spl = pc.samplerContains(EG3dSampler.SpecularLevel);
   o._dynamicSpecularColor = (o._supportSpecularColor && spc);
   o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
   if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
      s.append("|TS");
      if(pc){
         pt.setBoolean("support.specular", true);
      }
      if(o._dynamicSpecularColor){
         s.append("|TSC");
         if(pc){
            pt.setBoolean("support.specular.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         s.append("|TSL");
         if(pc){
            pt.setBoolean("support.specular.level", true);
         }
      }else{
         s.append("|NSL");
         if(pc){
            pt.setBoolean("support.specular.normal", true);
         }
      }
   }
   o._dynamicSpecularView = o._supportSpecularView;
   if(o._dynamicSpecularView && o._dynamicVertexNormal){
      s.append("|TSV");
      if(pc){
         pt.setBoolean("support.specular.view", true);
      }
      if(o._dynamicSpecularColor){
         s.append("|TSVC");
         if(pc){
            pt.setBoolean("support.specular.view.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         s.append("|TSVL");
         if(pc){
            pt.setBoolean("support.specular.view.level", true);
         }
      }else{
         s.append("|NSVL");
         if(pc){
            pt.setBoolean("support.specular.view.normal", true);
         }
      }
   }
   var slg = pc.samplerContains(EG3dSampler.Light);
   o._dynamicLight = (o._supportLight && slg);
   if(o._dynamicLight){
      s.append("|TL");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.light", true);
      }
   }
   var slr = pc.samplerContains(EG3dSampler.Reflect);
   o._dynamicReflect = (o._supportReflect && slr);
   if(o._dynamicReflect){
      s.append("|TRL");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.reflect", true);
      }
   }
   var slf = pc.samplerContains(EG3dSampler.Refract);
   o._dynamicRefract = (o._supportRefract && slf);
   if(o._dynamicRefract){
      s.append("|TRF");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.refract", true);
      }
   }
   var sle = pc.samplerContains(EG3dSampler.Emissive);
   o._dynamicEmissive = (o._supportEmissive && sle);
   if(o._dynamicEmissive){
      s.append("|TLE");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.emissive", true);
      }
   }
   var shg = pc.samplerContains(EG3dSampler.Height);
   o._dynamicHeight = (o._supportHeight && shg);
   if(o._dynamicHeight){
      s.append("|TH");
      if(pc){
         pt.setBoolean("support.height", true);
      }
   }
   var sen = pc.samplerContains(EG3dSampler.Environment);
   o._dynamicEnvironment = (o._supportEnvironment && sen);
   if(o._dynamicEnvironment){
      s.append("|TE");
      if(pc){
         pt.setBoolean("support.environment", true);
      }
   }
   o._dynamicInstance = o._supportInstance;
   if(o._dynamicInstance){
      var ic = cb.calculateInstanceCount(pc.vertexBoneCount, pc.vertexCount);
      pt.set("instance.count", ic);
   }
   if(o._dynamicSkeleton){
      var bc = cb.calculateBoneCount(pc.vertexBoneCount, pc.vertexCount);
      s.append("|B" + bc);
      pt.set("bone.count", bc);
      pt.setBoolean("support.bone.weight.1", true);
      pt.setBoolean("support.bone.weight.2", true);
      pt.setBoolean("support.bone.weight.3", true);
      pt.setBoolean("support.bone.weight.4", true);
   }
   pt.code = s.toString();
}
function FG3dAutomaticEffect_bindAttributes(p){
   var o = this;
   var g = o._program;
   if(g.hasAttribute()){
      var as = g.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = p.findVertexBuffer(a._linker);
            g.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
}
function FG3dAutomaticEffect_bindSamplers(p){
   var o = this;
   var g = o._program;
   if(g.hasSampler()){
      var ss = g.samplers();
      var sc = ss.count();
      for(var n = 0; n < sc; n++){
         var s = ss.value(n);
         if(s._bind && s._statusUsed){
            var ln = s.linker();
            var sp = p.findTexture(ln);
            g.setSampler(s.name(), sp.texture());
         }
      }
   }
}
function FG3dAutomaticEffect_bindMaterial(p){
   var o = this;
   var c = o._context;
   var m = p.info();
   if(m.optionAlpha){
      c.setBlendFactors(o._stateBlend, o._stateBlendSourceCd, o._stateBlendTargetCd);
   }else{
      c.setBlendFactors(false);
   }
   if(m.optionDouble){
      c.setCullingMode(false);
   }else{
      c.setCullingMode(o._stateDepth, o._stateCullCd);
   }
}
function FG3dGeneralColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'general.color.automatic';
   o.drawRenderable = FG3dGeneralColorAutomaticEffect_drawRenderable;
   return o;
}
function FG3dGeneralColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dGeneralColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._name      = 'color';
   o.drawRegion = FG3dGeneralColorPass_drawRegion;
   return o;
}
function FG3dGeneralColorPass_drawRegion(p){
   var o = this;
   var c = o._context;
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
function FG3dGeneralColorSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'shadow.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FG3dGeneralColorSkeletonEffect_drawRenderable;
   return o;
}
function FG3dGeneralColorSkeletonEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   var bs = pr.bones();
   if(bs){
      var bc = pr._boneLimit;
      var d = RTypeArray.findTemp(EDataType.Float, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dGeneralTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._name      = 'general';
   o._passColor = null;
   o.setup      = FG3dGeneralTechnique_setup;
   o.passColor  = FG3dGeneralTechnique_passColor;
   return o;
}
function FG3dGeneralTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var p = o._passColor = RClass.create(FG3dGeneralColorPass);
   p.linkContext(o._context);
   p.setup();
   o._passes.push(p);
}
function FG3dGeneralTechnique_passColor(){
   return this._passColor;
}
function FG3dShadowColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'shadow.color.automatic';
   o.drawRenderable = FG3dShadowColorAutomaticEffect_drawRenderable;
   return o;
}
function FG3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vcvpm = pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var vlvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
   var vlvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
   var vlci = pg.calculate(EG3dRegionParameter.LightInfo);
   var tp = pg.techniquePass();
   var m = pr.material();
   o.bindMaterial(m);
   p.setParameter('vc_light_depth', vlci);
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_vp_matrix', vcvpm);
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('vc_light_view_matrix', vlvm);
   p.setParameter('vc_light_vp_matrix', vlvpm);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   p.setParameter4('fc_light_depth', 1.0 / 4096.0, 0.0, -1.0 / 4096.0, vlci.w);
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   o.bindAttributes(pr);
   p.setSampler('fs_light_depth', tp.textureDepth());
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dShadowColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._name           = 'color';
   o._textureDepth   = null;
   o.textureDepth    = FG3dShadowColorPass_textureDepth;
   o.setTextureDepth = FG3dShadowColorPass_setTextureDepth;
   o.drawRegion      = FG3dShadowColorPass_drawRegion;
   return o;
}
function FG3dShadowColorPass_textureDepth(){
   return this._textureDepth;
}
function FG3dShadowColorPass_setTextureDepth(p){
   this._textureDepth = p;
}
function FG3dShadowColorPass_drawRegion(p){
   var o = this;
   var c = o._context;
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
function FG3dShadowColorSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'shadow.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FG3dShadowColorSkeletonEffect_drawRenderable;
   return o;
}
function FG3dShadowColorSkeletonEffect_drawRenderable(pr, r){
   var o = this;
   var c = o._context;
   var p = o._program;
   var prvp = pr.matrixViewProjection();
   var prcp = pr.cameraPosition();
   var prld = pr.lightDirection();
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
   if(p.hasSampler()){
      var ss = p.samplers();
      var sc = ss.count();
      for(var n = 0; n < sc; n++){
         var s = ss.value(n);
         if(s._statusUsed){
            var ln = s.linker();
            var sp = r.findTexture(ln);
            if(sp != null){
               p.setSampler(s.name(), sp.texture());
            }else{
               throw new TError("Can't find sampler. (linker={1})", ln);
            }
         }
      }
   }
   p.setParameter('vc_model_matrix', r.matrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   var m = r.material();
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   var bs = r.bones();
   if(bs){
      var bc = bs.count();
      if(bc > 32){
         bc = 32;
      }
      var d = RTypeArray.findTemp(EDataType.Float, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dShadowDepthAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'shadow.depth.automatic';
   o.drawRenderable = FG3dShadowDepthAutomaticEffect_drawRenderable;
   return o;
}
function FG3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   var lvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
   var lvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
   var lci = pg.calculate(EG3dRegionParameter.LightInfo);
   c.setBlendFactors(false);
   p.setParameter('vc_camera', lci);
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_view_matrix', lvm);
   p.setParameter('vc_vp_matrix', lvpm);
   p.setParameter('fc_camera', lci);
   p.setParameter4('fc_alpha', 0, 0, 0, 0.1);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dShadowDepthPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._name         = 'depth';
   o._renderTarget = null;
   o._textureDepth = null;
   o._renderTarget = null;
   o.setup         = FG3dShadowDepthPass_setup;
   o.textureDepth  = FG3dShadowDepthPass_textureDepth;
   o.drawRegion    = FG3dShadowDepthPass_drawRegion;
   return o;
}
function FG3dShadowDepthPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._context;
   var d = o._textureDepth = c.createFlatTexture();
   d.setFilter(EG3dSamplerFilter.Linear, EG3dSamplerFilter.Linear);
   d.setWrap(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(2048, 2048);
   t.textures().push(d);
   t.build();
}
function FG3dShadowDepthPass_textureDepth(){
   return this._textureDepth;
}
function FG3dShadowDepthPass_drawRegion(p){
   var o = this;
   var c = o._context;
   if(o._finish){
      c.setRenderTarget(null);
      var bc = p._backgroundColor;
      o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   }else{
      c.setRenderTarget(o._renderTarget);
      c.clear(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
   }
   p._textureDepth = o._textureDepth;
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
function FG3dShadowDepthSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'shadow.depth.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FG3dShadowDepthSkeletonEffect_drawRenderable;
   return o;
}
function FG3dShadowDepthSkeletonEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   p.setParameter('vc_model_matrix', r.matrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   var m = r.material();
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   var bs = pr.bones();
   if(bs){
      var bc = bs.count();
      if(bc > 32){
         bc = 32;
      }
      var d = RTypeArray.findTemp(EDataType.Float, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dShadowTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._name        = 'shadow';
   o._passDepth   = null;
   o._passColor   = null;
   o.setup        = FG3dShadowTechnique_setup;
   o.passDepth    = FG3dShadowTechnique_passDepth;
   o.passColor    = FG3dShadowTechnique_passColor;
   o.updateRegion = FG3dShadowTechnique_updateRegion;
   return o;
}
function FG3dShadowTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var ps = o._passes;
   var pd = o._passDepth = RClass.create(FG3dShadowDepthPass);
   pd.linkContext(o._context);
   pd.setup();
   ps.push(pd);
   var pc = o._passColor = RClass.create(FG3dShadowColorPass);
   pc.linkContext(o._context);
   pc.setup();
   ps.push(pc);
   pc.setTextureDepth(pd.textureDepth());
}
function FG3dShadowTechnique_passDepth(){
   return this._passDepth;
}
function FG3dShadowTechnique_passColor(){
   return this._passColor;
}
function FG3dShadowTechnique_updateRegion(p){
   var o = this;
   o.__base.FG3dTechnique.updateRegion.call(o, p);
   var c = p.camera();
   var l = p.directionalLight();
   l.camera().updateFlatCamera(c);
}
function FWglContext(o){
   o = RClass.inherits(this, o, FG3dContext);
   o._native             = null;
   o._activeRenderTarget = null;
   o._activeTextureSlot  = 0;
   o._parameters         = null;
   o._extensions         = null;
   o._data9              = null;
   o._data16             = null;
   o.construct           = FWglContext_construct;
   o.linkCanvas          = FWglContext_linkCanvas;
   o.parameters          = FWglContext_parameters;
   o.extensions          = FWglContext_extensions;
   o.createProgram       = FWglContext_createProgram;
   o.createVertexBuffer  = FWglContext_createVertexBuffer;
   o.createIndexBuffer   = FWglContext_createIndexBuffer;
   o.createFlatTexture   = FWglContext_createFlatTexture;
   o.createCubeTexture   = FWglContext_createCubeTexture;
   o.createRenderTarget  = FWglContext_createRenderTarget;
   o.setViewPort         = FWglContext_setViewPort;
   o.setFillMode         = FWglContext_setFillMode;
   o.setDepthMode        = FWglContext_setDepthMode;
   o.setCullingMode      = FWglContext_setCullingMode;
   o.setBlendFactors     = FWglContext_setBlendFactors;
   o.setScissorRectangle = FWglContext_setScissorRectangle;
   o.setRenderTarget     = FWglContext_setRenderTarget;
   o.setProgram          = FWglContext_setProgram;
   o.bindConst           = FWglContext_bindConst;
   o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
   o.bindTexture         = FWglContext_bindTexture;
   o.clear               = FWglContext_clear;
   o.drawTriangles       = FWglContext_drawTriangles;
   o.present             = FWglContext_present;
   o.checkError          = FWglContext_checkError;
   return o;
}
function FWglContext_construct(){
   var o = this;
   o.__base.FG3dContext.construct.call(o);
   o._capability = new SWglContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
}
function FWglContext_linkCanvas(h){
   var o = this;
   o.__base.FG3dContext.linkCanvas.call(o, h)
   o._hCanvas = h;
   if(h.getContext){
      var n = h.getContext('webgl');
      if(n == null){
         n = h.getContext('experimental-webgl', {antialias:true});
      }
      if(n == null){
         throw new TError("Current browser can't support WebGL technique.");
      }
      o._native = n;
   }
   var g = o._native;
   o.setViewPort(h.width, h.height);
   o.setDepthMode(true, EG3dDepthMode.LessEqual);
   o.setCullingMode(true, EG3dCullMode.Front);
   var c = o._capability;
   c.vendor = g.getParameter(g.VENDOR);
   c.version = g.getParameter(g.VERSION);
   c.shaderVersion = g.getParameter(g.SHADING_LANGUAGE_VERSION);
   c.attributeCount = g.getParameter(g.MAX_VERTEX_ATTRIBS);
   c.vertexConst = g.getParameter(g.MAX_VERTEX_UNIFORM_VECTORS);
   c.varyingCount = g.getParameter(g.MAX_VARYING_VECTORS);
   c.fragmentConst = g.getParameter(g.MAX_FRAGMENT_UNIFORM_VECTORS);
   c.samplerCount = g.getParameter(g.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
   c.samplerSize = g.getParameter(g.MAX_TEXTURE_SIZE);
}
function FWglContext_parameters(){
   var o = this;
   var r = o._parameters;
   if(r){
      return r;
   }
   var ns =['ACTIVE_TEXTURE',
      'ALIASED_LINE_WIDTH_RANGE',
      'ALIASED_POINT_SIZE_RANGE',
      'ALPHA_BITS',
      'ARRAY_BUFFER_BINDING',
      'BLEND',
      'BLEND_COLOR',
      'BLEND_DST_ALPHA',
      'BLEND_DST_RGB',
      'BLEND_EQUATION_ALPHA',
      'BLEND_EQUATION_RGB',
      'BLEND_SRC_ALPHA',
      'BLEND_SRC_RGB',
      'BLUE_BITS',
      'COLOR_CLEAR_VALUE',
      'COLOR_WRITEMASK',
      'COMPRESSED_TEXTURE_FORMATS',
      'CULL_FACE',
      'CULL_FACE_MODE',
      'CURRENT_PROGRAM',
      'DEPTH_BITS',
      'DEPTH_CLEAR_VALUE',
      'DEPTH_FUNC',
      'DEPTH_RANGE',
      'DEPTH_TEST',
      'DEPTH_WRITEMASK',
      'DITHER',
      'ELEMENT_ARRAY_BUFFER_BINDING',
      'FRAMEBUFFER_BINDING',
      'FRONT_FACE',
      'GENERATE_MIPMAP_HINT',
      'GREEN_BITS',
      'IMPLEMENTATION_COLOR_READ_FORMAT',
      'IMPLEMENTATION_COLOR_READ_TYPE',
      'LINE_WIDTH',
      'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      'MAX_CUBE_MAP_TEXTURE_SIZE',
      'MAX_FRAGMENT_UNIFORM_VECTORS',
      'MAX_RENDERBUFFER_SIZE',
      'MAX_TEXTURE_IMAGE_UNITS',
      'MAX_TEXTURE_SIZE',
      'MAX_VARYING_VECTORS',
      'MAX_VERTEX_ATTRIBS',
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      'MAX_VERTEX_UNIFORM_VECTORS',
      'MAX_VIEWPORT_DIMS',
      'PACK_ALIGNMENT',
      'POLYGON_OFFSET_FACTOR',
      'POLYGON_OFFSET_FILL',
      'POLYGON_OFFSET_UNITS',
      'RED_BITS',
      'RENDERBUFFER_BINDING',
      'RENDERER',
      'SAMPLE_BUFFERS',
      'SAMPLE_COVERAGE_INVERT',
      'SAMPLE_COVERAGE_VALUE',
      'SAMPLES',
      'SCISSOR_BOX',
      'SCISSOR_TEST',
      'SHADING_LANGUAGE_VERSION',
      'STENCIL_BACK_FAIL',
      'STENCIL_BACK_FUNC',
      'STENCIL_BACK_PASS_DEPTH_FAIL',
      'STENCIL_BACK_PASS_DEPTH_PASS',
      'STENCIL_BACK_REF',
      'STENCIL_BACK_VALUE_MASK',
      'STENCIL_BACK_WRITEMASK',
      'STENCIL_BITS',
      'STENCIL_CLEAR_VALUE',
      'STENCIL_FAIL',
      'STENCIL_FUNC',
      'STENCIL_PASS_DEPTH_FAIL',
      'STENCIL_PASS_DEPTH_PASS',
      'STENCIL_REF',
      'STENCIL_TEST',
      'STENCIL_VALUE_MASK',
      'STENCIL_WRITEMASK',
      'SUBPIXEL_BITS',
      'TEXTURE_BINDING_2D',
      'TEXTURE_BINDING_CUBE_MAP',
      'UNPACK_ALIGNMENT',
      'UNPACK_COLORSPACE_CONVERSION_WEBGL',
      'UNPACK_FLIP_Y_WEBGL',
      'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
      'VENDOR',
      'VERSION',
      'VIEWPORT'];
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getParameter(g[n]);
   }
   o._parameters = r;
   return r;
}
function FWglContext_extensions(){
   var o = this;
   var r = o._extensions;
   if(r){
      return r;
   }
   var ns =[
      'ANGLE_instanced_arrays',
      'EXT_blend_minmax',
      'EXT_color_buffer_float',
      'EXT_color_buffer_half_float',
      'EXT_disjoint_timer_query',
      'EXT_frag_depth',
      'EXT_sRGB',
      'EXT_shader_texture_lod',
      'EXT_texture_filter_anisotropic',
      'OES_element_index_uint',
      'OES_standard_derivatives',
      'OES_texture_float',
      'OES_texture_float_linear',
      'OES_texture_half_float',
      'OES_texture_half_float_linear',
      'OES_vertex_array_object',
      'WEBGL_color_buffer_float',
      'WEBGL_compressed_texture_atc',
      'WEBGL_compressed_texture_es3',
      'WEBGL_compressed_texture_etc1',
      'WEBGL_compressed_texture_pvrtc',
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_debug_renderer_info',
      'WEBGL_debug_shader_precision',
      'WEBGL_debug_shaders',
      'WEBGL_depth_texture',
      'WEBGL_draw_buffers',
      'WEBGL_draw_elements_no_range_check',
      'WEBGL_dynamic_texture',
      'WEBGL_lose_context',
      'WEBGL_security_sensitive_resources',
      'WEBGL_shared_resources',
      'WEBGL_subscribe_uniform',
      'WEBGL_texture_from_depth_video'];
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getExtension(n);
   }
   o._extensions = r;
   return r;
}
function FWglContext_createProgram(){
   var o = this;
   var r = RClass.create(FWglProgram);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createVertexBuffer(){
   var o = this;
   var r = RClass.create(FWglVertexBuffer);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createIndexBuffer(){
   var o = this;
   var r = RClass.create(FWglIndexBuffer);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createFlatTexture(){
   var o = this;
   var r = RClass.create(FWglFlatTexture);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createCubeTexture(){
   var o = this;
   var r = RClass.create(FWglCubeTexture);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createRenderTarget(){
   var o = this;
   var r = RClass.create(FWglRenderTarget);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_setViewPort(w, h){
   var g = this._native;
   g.viewportWidth = w;
   g.viewportHeight = h;
   g.viewport(0, 0, w, h);
}
function FWglContext_setFillMode(){
}
function FWglContext_setDepthMode(f, v){
   var o = this;
   var g = o._native;
   if((o._optionDepth == f) && (o._depthModeCd == v)){
      return true;
   }
   if(o._optionDepth != f){
      if(f){
         g.enable(g.DEPTH_TEST);
      }else{
         g.disable(g.DEPTH_TEST);
      }
      o._optionDepth = f;
   }
   if(f && (o._depthModeCd != v)){
      var r = RWglUtility.convertDepthMode(g, v);
      g.depthFunc(r);
      o._depthModeCd = v;
   }
   return true;
}
function FWglContext_setCullingMode(f, v){
   var o = this;
   var g = o._native;
   if((o._optionCull == f) && (o._optionCull == v)){
      return true;
   }
   if(o._optionCull != f){
      if(f){
         g.enable(g.CULL_FACE);
      }else{
         g.disable(g.CULL_FACE);
      }
      o._optionCull = f;
   }
   if(f && (o._cullModeCd != v)){
      var r = RWglUtility.convertCullMode(g, v);
      g.cullFace(r);
      o._cullModeCd = v;
   }
   return true;
}
function FWglContext_setBlendFactors(f, vs, vt){
   var o = this;
   var g = o._native;
   if((o._statusBlend == f) && (o._blendSourceCd == vs) && (o._blendTargetCd == vt)){
      return true;
   }
   if(o._statusBlend != f){
      if(f){
         g.enable(g.BLEND);
      }else{
         g.disable(g.BLEND);
      }
      o._statusBlend = f;
   }
   if(f && ((o._blendSourceCd != vs) || (o._blendTargetCd != vt))){
      var gs = RWglUtility.convertBlendFactors(g, vs);
      var gt = RWglUtility.convertBlendFactors(g, vt);
      g.blendFunc(gs, gt);
      o._blendSourceCd = vs;
      o._blendTargetCd = vt;
   }
   return true;
}
function FWglContext_setScissorRectangle(l, t, w, h){
   this._native.scissor(l, t, w, h);
}
function FWglContext_setRenderTarget(p){
   var o = this;
   var g = o._native;
   var r = true;
   if(p == null){
      g.bindFramebuffer(g.FRAMEBUFFER, null);
      r = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
      if(!r){
         return r;
      }
      g.viewport(0, 0, o._size.width, o._size.height);
   }else{
      g.bindFramebuffer(g.FRAMEBUFFER, p._native);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", p._native);
      if(!r){
         return r;
      }
      var s = p.size();
      g.viewport(0, 0, s.width, s.height);
   }
   o._activeRenderTarget = p;
}
function FWglContext_setProgram(v){
   var o = this;
   var g = o._native;
   if(v != null){
      g.useProgram(v._native);
   }else{
      g.useProgram(null);
   }
   _program = v;
   var r = o.checkError("useProgram", "Set program failure. (program={1}, program_id={2})", v, v._native);
   return r;
}
function FWglContext_bindConst(psc, psl, pdf, pdt, pdc){
   var o = this;
   var g = o._native;
   var r = true;
   switch(pdf){
      case EG3dParameterFormat.Float1:{
         g.uniform1fv(psl, pdt);
         r = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float2:{
         g.uniform2fv(psl, pdt);
         r = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3:{
         g.uniform3fv(psl, pdt);
         r = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4:{
         g.uniform4fv(psl, pdt);
         r = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3x3:{
         var dt = o._data9;
         dt[ 0] = pdt[ 0];
         dt[ 1] = pdt[ 4];
         dt[ 2] = pdt[ 8];
         dt[ 3] = pdt[ 1];
         dt[ 4] = pdt[ 5];
         dt[ 5] = pdt[ 9];
         dt[ 6] = pdt[ 2];
         dt[ 7] = pdt[ 6];
         dt[ 8] = pdt[10];
         g.uniformMatrix3fv(psl, g.FALSE, dt);
         r = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x3:{
         if(length % 48 != 0){
            RLogger.fatal(o, null, "Count is invalid. (count=%d)", pdc);
            return false;
         }
         var count = length / 48;
         g.uniform4fv(psl, g.FALSE, pd);
         r = o.checkError("uniform4fv", "Bind const matrix4x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x4:{
         if(pdt.constructor == Float32Array){
            g.uniformMatrix4fv(psl, g.FALSE, pdt);
         }else if(pdt.writeData){
            var d = o._data16;
            pdt.writeData(d, 0);
            g.uniformMatrix4fv(psl, g.FALSE, d);
         }else{
            throw new TError('Unknown data type.');
         }
         r = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd=%d, slot=%d, pData=0x%08X, count=%d)", psc, psl, pdt, pdc);
         break;
      }
   }
   return r;
}
function FWglContext_bindVertexBuffer(s, b, i, f){
   var o = this;
   var g = o._native;
   var r = true;
   var n = null;
   if(b != null){
      n = b._native;
   }
   g.bindBuffer(g.ARRAY_BUFFER, n);
   r = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", n);
   if(!r){
      return r;
   }
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
   var bs = b.stride;
   switch(f){
      case EG3dAttributeFormat.Float1:
         g.vertexAttribPointer(s, 1, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float2:
         g.vertexAttribPointer(s, 2, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float3:
         g.vertexAttribPointer(s, 3, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float4:
         g.vertexAttribPointer(s, 4, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4Normal:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, true, bs, i);
         break;
      default:
         RLogger.fatal(o, null, "Unknown vertex format. (format_cd=%d)", formatCd);
         break;
   }
   r = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", s, f);
   return r;
}
function FWglContext_bindTexture(ps, pi, pt){
   var o = this;
   var g = o._native;
   var r = true;
   if(pt == null){
      g.bindTexture(g.TEXTURE_2D, null);
      r = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", ps);
      return r;
   }
   if(o._activeTextureSlot != ps){
      g.uniform1i(ps, pi);
      g.activeTexture(g.TEXTURE0 + pi);
      r = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", ps, pi);
      if(!r){
         return r;
      }
      o._renderTextureActiveSlot = ps;
   }
   var gt = null;
   switch(pt.textureCd()){
      case EG3dTexture.Flat2d:{
         gt = g.TEXTURE_2D;
         g.bindTexture(g.TEXTURE_2D, pt._native);
         r = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", pt._native);
         if(!r){
            return r;
         }
         break;
      }
      case EG3dTexture.Cube:{
         gt = g.TEXTURE_CUBE_MAP;
         g.bindTexture(g.TEXTURE_CUBE_MAP, pt._native);
         r = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", pt._native);
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
   var fc = RWglUtility.convertSamplerFilter(g, pt.filterMinCd());
   if(fc){
      g.texParameteri(gt, g.TEXTURE_MIN_FILTER, fc);
   }
   var fc = RWglUtility.convertSamplerFilter(g, pt.filterMagCd());
   if(fc){
      g.texParameteri(gt, g.TEXTURE_MAG_FILTER, fc);
   }
   var ws = RWglUtility.convertSamplerFilter(g, pt.wrapS());
   if(ws){
   }
   var wt = RWglUtility.convertSamplerFilter(g, pt.wrapT());
   if(wt){
   }
   return r;
}
function FWglContext_clear(r, g, b, a, d){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clearDepth(d);
   c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
}
function FWglContext_drawTriangles(b, i, c){
   var o = this;
   var g = o._native;
   var r = true;
   if(i == null){
      i = 0;
   }
   if(c == null){
      c = b.count();
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, b._native);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", b, i, c, b._native);
   if(!r){
       return r;
   }
   var strideCd = RWglUtility.convertIndexStride(g, b.strideCd());
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
function FWglContext_present(){
}
function FWglContext_checkError(c, m, p1){
   if(!RRuntime.isDebug()){
      return true;
   }
   var o = this;
   var g = o._native;
   var r = false;
   var e = null;
   var es = null;
   while(true){
      e = g.getError();
      if(e == g.NO_ERROR){
         r = true;
         break;
      }
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
   if(!r){
      RLogger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', e, es);
   }
   return r;
}
function FWglCubeTexture(o){
   o = RClass.inherits(this, o, FG3dCubeTexture);
   o._native = null;
   o.setup   = FWglCubeTexture_setup;
   o.link    = FWglCubeTexture_link;
   o.upload  = FWglCubeTexture_upload;
   return o;
}
function FWglCubeTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FG3dCubeTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglCubeTexture_link(v){
   this._texture = v;
}
function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
   var r = c.checkError("texImage2D", "Upload cube image failure.");
   o._statusLoad = r;
}
function FWglFlatTexture(o){
   o = RClass.inherits(this, o, FG3dFlatTexture);
   o._native     = null;
   o.onImageLoad = FWglFlatTexture_onImageLoad;
   o.setup       = FWglFlatTexture_setup;
   o.loadUrl     = FWglFlatTexture_loadUrl;
   o.upload      = FWglFlatTexture_upload;
   return o;
}
function FWglFlatTexture_onImageLoad(v){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, v);
   var r = c.checkError("texImage2D", "");
   o._statusLoad = r;
}
function FWglFlatTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FG3dFlatTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglFlatTexture_loadUrl(p){
   var o = this;
   var r = new Image();
   r.src = p;
   r.onload = function(){o.onImageLoad(o);}
}
function FWglFlatTexture_upload(p){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, p);
   var r = c.checkError("texImage2D", "Upload image failure.");
   o._statusLoad = r;
}
function FWglFragmentShader(o){
   o = RClass.inherits(this, o, FG3dFragmentShader);
   o._native = null;
   o.setup   = FWglFragmentShader_setup;
   o.upload  = FWglFragmentShader_upload;
   o.dispose = FWglFragmentShader_dispose;
   return o;
}
function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FG3dFragmentShader.setup.call(o);
   var g = o._context._native;
   o._native = g.createShader(g.FRAGMENT_SHADER);
}
function FWglFragmentShader_upload(v){
   var o = this;
   var g = o._context._native;
   var n = o._native;
   g.shaderSource(n, v);
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      RLogger.fatal(o, null, 'Upload fragment shader source failure. (error={1})\n{2}', i, v);
      g.deleteShader(n);
      o._native = null;
      return false;
   }
   o._source = v;
   return true;
}
function FWglFragmentShader_dispose(){
   var o = this;
   var g = o._context._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FG3dFragmentShader.dispose.call(o);
}
function FWglIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dIndexBuffer);
   o.setup  = FWglIndexBuffer_setup;
   o.upload = FWglIndexBuffer_upload;
   return o;
}
function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FG3dIndexBuffer.setup.call(o);
   o._native = o._context._native.createBuffer();
}
function FWglIndexBuffer_upload(pd, pc){
   var o = this;
   var c = o._context;
   var g = c._native;
   o._count = pc;
   var d = null;
   if(pd.constructor == Array){
      d = new Uint16Array(pd);
   }else if(pd.constructor == Uint16Array){
      d = pd;
   }else{
      RLogger.fatal(o, null, 'Upload index data type is invalid. (value={1})', pd);
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bind buffer failure.');
   g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'Upload buffer data. (count={1})', pc);
}
function FWglProgram(o){
   o = RClass.inherits(this, o, FG3dProgram);
   o._native        = null;
   o.setup          = FWglProgram_setup;
   o.vertexShader   = FWglProgram_vertexShader;
   o.fragmentShader = FWglProgram_fragmentShader;
   o.upload         = FWglProgram_upload;
   o.build          = FWglProgram_build;
   o.link           = FWglProgram_link;
   o.dispose        = FWglProgram_dispose;
   return o;
}
function FWglProgram_setup(){
   var o = this;
   var g = o._context._native;
   o._native = g.createProgram();
}
function FWglProgram_vertexShader(){
   var o = this;
   var s = o._vertexShader;
   if(s == null){
      s = RClass.create(FWglVertexShader);
      s.linkContext(o._context);
      s.setup();
      o._vertexShader = s;
   }
   return s;
}
function FWglProgram_fragmentShader(){
   var o = this;
   var s = o._fragmentShader;
   if(s == null){
      s = RClass.create(FWglFragmentShader);
      s.linkContext(o._context);
      s.setup();
      o._fragmentShader = s;
   }
   return s;
}
function FWglProgram_upload(t, s){
   var o = this;
   if(t == EG3dShader.Vertex){
      o.vertexShader().upload(s);
   }else if(t == EG3dShader.Fragment){
      o.fragmentShader().upload(s);
   }else{
      throw new Error('Unknown type');
   }
}
function FWglProgram_build(){
   var o = this;
   var c = o._context;
   var g = c._native;
   var pn = o._native;
   var vs = o.vertexShader();
   g.attachShader(pn, vs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vs._native);
   if(!r){
      return r;
   }
   var fs = o.fragmentShader();
   g.attachShader(pn, fs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fs._native);
   if(!r){
      return r;
   }
   if(o.hasAttribute()){
      var as = o.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         var an = a.name();
         g.bindAttribLocation(pn, n, an);
         r = c.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, an);
         if(!r){
            return r;
         }
      }
   }
}
function FWglProgram_link(){
   var o = this;
   var c = o._context;
   var g = c._native;
   var r = false;
   var pn = o._native;
   g.linkProgram(pn);
   var pr = g.getProgramParameter(pn, g.LINK_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      RLogger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
      g.deleteProgram(o._native);
      o._native = null;;
      return false;
   }
   g.validateProgram(pn);
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
   }
   g.finish();
   r = c.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
   if(!r){
      return r;
   }
   if(o.hasParameter()){
      var pc = o._parameters.count();
      for(var n = 0; n < pc; n++){
         var p = o._parameters.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;
         }
      }
   }
   if(o.hasAttribute()){
      var pc = o._attributes.count();
      for(var n = 0; n < pc; n++){
         var p = o._attributes.value(n);
         var i = g.getAttribLocation(pn, p.name());
         r = c.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != -1){
            p._statusUsed = true;
         }
      }
   }
   if(o.hasSampler()){
      var pc = o._samplers.count();
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;;
         }
      }
      var si = 0;
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         if(p._statusUsed){
            p._index = si++;
         }
      }
   }
   return r;
}
function FWglProgram_dispose(){
   var o = this;
   if(o._program){
      o._context._context.deleteProgram(o._program);
   }
   o._program = null;
   o.base.FProgram3d.dispose.call(o);
}
function FWglRenderTarget(o){
   o = RClass.inherits(this, o, FG3dRenderTarget);
   o._optionDepth = true;
   o._native      = null;
   o._nativeDepth = null;
   o.setup        = FWglRenderTarget_setup;
   o.build        = FWglRenderTarget_build;
   return o;
}
function FWglRenderTarget_setup(){
   var o = this;
   o.__base.FG3dRenderTarget.setup.call(o);
   var c = o._context;
   var g = c._native;
   o._native = g.createFramebuffer();
   return c.checkError('createFramebuffer', 'Create frame buffer failure.');
}
function FWglRenderTarget_build(){
   var o = this;
   var c = o._context;
   var g = c._native;
   g.bindFramebuffer(g.FRAMEBUFFER, o._native);
   var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
   if(!r){
      return r;
   }
   if(o._optionDepth){
      var nd = o._nativeDepth = g.createRenderbuffer();
      var r = c.checkError('createRenderbuffer', 'Create render buffer failure.');
      if(!r){
         return r;
      }
      g.bindRenderbuffer(g.RENDERBUFFER, nd);
      var r = c.checkError('bindRenderbuffer', 'Bind render buffer failure.');
      if(!r){
         return r;
      }
      g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, o._size.width, o._size.height);
      var r = c.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
      if(!r){
         return r;
      }
      g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, nd);
      var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._native, nd);
      if(!r){
         return r;
      }
   }
   var ts = o._textures;
   var tc = ts.count();
   for(var i = 0; i < tc; i++){
      var t = ts.get(i);
      g.bindTexture(g.TEXTURE_2D, t._native);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, o._size.width, o._size.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._native, o._size.width, o._size.height);
      if(!r){
         return r;
      }
      g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, t._native, 0);
      var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._native, t._native);
      if(!r){
         return r;
      }
   }
}
function FWglVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dVertexBuffer);
   o.setup  = FWglVertexBuffer_setup;
   o.upload = FWglVertexBuffer_upload;
   return o;
}
function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var g = o._context._native;
   o._native = g.createBuffer();
}
function FWglVertexBuffer_upload(v, s, c){
   var o = this;
   var c = o._context;
   var g = c._native;
   o.stride = s;
   o.count  = c;
   var d = null;
   if(v.constructor == Array){
      d = new Float32Array(v);
   }else if(v.constructor == Float32Array){
      d = v;
   }else{
      RLogger.fatal(o, null, 'Upload vertex data type is invalid. (value={1})', v);
   }
   g.bindBuffer(g.ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bindbuffer');
   g.bufferData(g.ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'bufferData');
}
function FWglVertexShader(o){
   o = RClass.inherits(this, o, FG3dVertexShader);
   o._native = null;
   o.setup   = FWglVertexShader_setup;
   o.upload  = FWglVertexShader_upload;
   o.dispose = FWglVertexShader_dispose;
   return o;
}
function FWglVertexShader_setup(){
   var o = this;
   o.__base.FG3dVertexShader.setup.call(o);
   var g = o._context._native;
   o._native = g.createShader(g.VERTEX_SHADER);
}
function FWglVertexShader_upload(v){
   var o = this;
   var g = o._context._native;
   var n = o._native;
   g.shaderSource(n, v);
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      RLogger.fatal(o, null, 'Upload vertex shader source failure. (error={1})\n{2}', i, v);
      g.deleteShader(n);
      o._native = null;
      return false;
   }
   o._source = v;
   return true;
}
function FWglVertexShader_dispose(){
   var o = this;
   var g = o._context._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FG3dVertexShader.dispose.call(o);
}
var RWglUtility = new function RWglUtility(){
   var o = this;
   o.convertFillMode      = RWglUtility_convertFillMode;
   o.convertCullMode      = RWglUtility_convertCullMode;
   o.convertDepthMode     = RWglUtility_convertDepthMode;
   o.convertBlendFactors  = RWglUtility_convertBlendFactors;
   o.convertIndexStride   = RWglUtility_convertIndexStride;
   o.convertSamplerFilter = RWglUtility_convertSamplerFilter;
   return o;
}
function RWglUtility_convertFillMode(g, v){
   switch(v){
      case EG3dFillMode.Point:
         return g.POINT;
      case EG3dFillMode.Line:
         return g.LINE;
      case EG3dFillMode.Face:
         return g.FILL;
   }
   throw new TError(this, "Convert fill mode failure. (fill_cd={1})", v);
}
function RWglUtility_convertCullMode(g, v){
   switch(v){
      case EG3dCullMode.Front:
         return g.FRONT;
      case EG3dCullMode.Back:
         return g.BACK;
      case EG3dCullMode.Both:
         return g.FRONT_AND_BACK;
   }
   throw new TError(this, "Convert cull mode failure. (cull_cd={1})", v);
}
function RWglUtility_convertDepthMode(g, v){
   switch(v){
      case EG3dDepthMode.Equal:
         return g.EQUAL;
      case EG3dDepthMode.NotEqual:
         return g.NOTEQUAL;
      case EG3dDepthMode.Less:
         return g.LESS;
      case EG3dDepthMode.LessEqual:
         return g.LEQUAL;
      case EG3dDepthMode.Greater:
         return g.GREATER;
      case EG3dDepthMode.GreaterEqual:
         return g.GEQUAL;
      case EG3dDepthMode.Always:
         return g.ALWAYS;
   }
   throw new TError(this, "Convert depth mode failure. (depth_cd={1})", v);
}
function RWglUtility_convertBlendFactors(g, v){
   switch(v){
      case EG3dBlendMode.SourceAlpha:
         return g.SRC_ALPHA;
      case EG3dBlendMode.OneMinusSourceAlpha:
         return g.ONE_MINUS_SRC_ALPHA;
      default:
         break;
   }
   throw new TError(this, "Convert blend factors failure. (blend_cd={1})", v);
}
function RWglUtility_convertIndexStride(g, v){
   switch(v){
      case EG3dIndexStride.Uint16:
         return g.UNSIGNED_SHORT;
      case EG3dIndexStride.Uint32:
         return g.UNSIGNED_INT;
   }
   throw new TError(this, "Convert index stride failure. (stride_cd={1})", v);
}
function RWglUtility_convertSamplerFilter(g, v){
   switch(v){
      case EG3dSamplerFilter.Unknown:
         return 0;
      case EG3dSamplerFilter.Nearest:
         return g.NEAREST;
      case EG3dSamplerFilter.Linear:
         return g.LINEAR;
      case EG3dSamplerFilter.Repeat:
         return g.REPEAT;
      case EG3dSamplerFilter.ClampToEdge:
         return g.CLAMP_TO_EDGE;
      case EG3dSamplerFilter.ClampToBorder:
         return g.CLAMP_TO_BORDER;
   }
   throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", v);
}
function SWglContextCapability(o){
   if(!o){o = this;}
   SG3dContextCapability(o);
   return o;
}
var EAlign = new function EAlign(){
   var o = this;
   o.Left        = 'left';
   o.Center      = 'center';
   o.Right       = 'right';
   o.Top         = 'up';
   o.Middle      = 'middle';
   o.Bottom      = 'down';
   o.BottomLeft  = 'bl';
   o.BottomRight = 'br';
   return o;
}
var EBorder = new function EBorder(){
   var o = this;
   o.None          = 0;
   o.Square        = 1;
   o.Round         = 2;
   o.RoundIcon     = 3;
   o.RoundDrop     = 4;
   o.RoundTitle    = 5;
   o.RoundIconDrop = 6;
   return o;
}
var EBorderStyle = new function EBorderStyle(){
   var o = this;
   o.Readonly = 1;
   o.Edit     = 2;
   o.Hover    = 3;
   return o;
}
var EDataAction = new function EDataAction(){
   var o = this;
   o.Fetch     = 'fetch';
   o.Search    = 'search';
   o.Lov       = 'lov';
   o.Zoom      = 'zoom';
   o.Prepare   = 'prepare';
   o.Insert    = 'insert';
   o.Update    = 'update';
   o.Delete    = 'delete';
   o.First     = 'first';
   o.Prior     = 'prior';
   o.Next      = 'next';
   o.Last      = 'last';
   o.Action    = 'action';
   o.FetchLov  = 'fetchLov';
   o.EndFetch  = 'endfetch';
   o.EndUpdate = 'endupdate';
   o.DsChanged = 'dschanged';
   o.Scalar    = 'scalar';
   o.Complete  = 'complete';
   o.Process   = 'process';
   return o;
}
var EDataService = new function EDataService(){
   var o = this;
   o.Dataset    = 'database.dataset';
   o.List       = 'design.list';
   o.WebForm    = 'design.webform';
   o.Translate  = 'design.translate';
   o.WebDataset = 'logic.dataset';
   return o;
}
var EDisplayMode = new function EDisplayMode(){
   var o = this;
   o.Display = 'P';
   o.Search = 'S';
   o.Design = 'G';
   o.Insert  = 'I';
   o.Update = 'U';
   o.Delete = 'D';
   o.Zoom = 'Z';
   return o;
}
var EEditConfig = new function(){
   var o = this;
   o.Search = 'S';
   o.Copy   = 'C';
   return o;
}
function EEditStatusFace(o){
   if(!o){o=this;}
   o.Blur   = 0;
   o.Cancel = 1;
   o.Ok     = 2;
   return o;
}
var EEditStatus = new EEditStatusFace();
var EEventInvoke = new function EEventInvoke(){
   var o = this;
   o.Unknown = 0;
   o.Before  = 1;
   o.After   = 2;
   return o;
}
var EEventStatus = new function EEventStatus(){
   var o = this;
   o.Unknown  = 0;
   o.Continue = 1;
   o.Stop     = 2;
   o.Cancel   = 3;
   o.Failure  = 4;
   return o;
}
var EEventType = new function EEventType(){
   var o = this;
   o.Unknown    = 0;
   o.Construct  = 1;
   o.Initialize = 2;
   o.Build      = 3;
   o.Refresh    = 4;
   o.Resize     = 5;
   o.Visible    = 6;
   o.Show       = 7;
   o.Hidden     = 8;
   o.Enable     = 9;
   o.Disable    = 10;
   o.Release    = 11;
   o.Design     = 12;
   o.Action     = 13;
   o.Valid      = 14;
   o.Mode       = 15;
   return o;
}
var ELabelMode = new function ELabelMode(){
   var o = this;
   o.All    = 'A';
   o.Label  = 'L';
   o.Hidden = 'H';
   return o;
}
var ELabelPosition = new function ELabelPosition(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   return o;
}
var EPanel = new function EPanel(){
   var o = this;
   o.Container = 0;
   o.Parent    = 1;
   o.Size      = 8;
   o.Border    = 2;
   o.Edit      = 3;
   o.Focus     = 4;
   o.Design    = 5;
   o.Scroll    = 6;
   o.Shadow    = 7;
   o.Move      = 9;
   o.Disable   = 10;
   o.Drop      = 11;
   return o;
}
function EPositionFace(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   o.Before     = 1;
   o.After      = 2;
   o.LineBefore = 3;
   o.LineAfter  = 4;
   return o;
}
EPosition = new EPositionFace();
function FComponent(o){
   o = RClass.inherits(this, o, FObject, MProperty, MClone);
   o._parent       = null;
   o._components   = null;
   o._name         = RClass.register(o, new APtyString('_name'));
   o._label        = RClass.register(o, new APtyString('_label'));
   o.oeInitialize  = FComponent_oeInitialize;
   o.oeRelease     = FComponent_oeRelease;
   o.isParent      = FComponent_isParent;
   o.topComponent  = FComponent_topComponent;
   o.hasComponent  = FComponent_hasComponent;
   o.components    = FComponent_components;
   o.push          = FComponent_push;
   o.process       = FComponent_process;
   o.psInitialize  = FComponent_psInitialize;
   o.psRelease     = FComponent_psRelease;
   o.toString      = FComponent_toString;
   o.dispose       = FComponent_dispose;
   o.innerDumpInfo = FComponent_innerDumpInfo;
   o.innerDump     = FComponent_innerDump;
   return o;
}
function FComponent_oeInitialize(e){
   return EEventStatus.Continue;
}
function FComponent_oeRelease(e){
   return EEventStatus.Continue;
}
function FComponent_isParent(p){
   while(p){
      if(p == this){
         return true;
      }
      p = p._parent;
   }
}
function FComponent_topComponent(c){
   var p = this;
   if(c){
      while(RClass.isClass(p._parent, c)){
         p = p._parent;
      }
   }else{
      while(p._parent){
         p = p._parent;
      }
   }
   return p;
}
function FComponent_hasComponent(){
   var ps = this._components;
   return ps ? !ps.isEmpty() : false;
}
function FComponent_components(){
   var o = this;
   var r = o._components;
   if(r == null){
      r = new TDictionary();
      o._components = r;
   }
   return r;
}
function FComponent_push(p){
   var o = this;
   if(RClass.isClass(p, FComponent)){
      var ps = o.components();
      p.parent = o;
      if(p._name == null){
         p._name = ps.count();
      }
      ps.set(p._name, p);
   }
}
function FComponent_process(e){
   var o = this;
   var v = o.__base[e.clazz];
   if(v){
      e.invokeCd = EEventInvoke.Before;
      var m = o[e.invoke];
      if(!m){
         return RLogger.fatal(o, null, 'Process invoke before is null. (sender={1}, invoke={2})', RClass.dump(o), e.invoke);
      }
      var r = m.call(o, e);
      if((r == EEventStatus.Stop) || (r == EEventStatus.Cancel)){
         return r;
      }
   }
   if(RClass.isClass(o, MContainer)){
      var ps = o._components;
      if(ps){
         var pc = ps.count();
         if(pc){
            for(var i = 0; i < pc; i++){
               var p = ps.value(i);
               if(p){
                  var r = p.process(e);
                  if(r == EEventStatus.Cancel){
                     return r;
                  }
               }
            }
         }
      }
   }
   if(v){
      e.invokeCd = EEventInvoke.After;
      var m = o[e.invoke];
      if(!m){
         return RLogger.fatal(o, null, 'Process invoke after is null. (sender={1}, invoke={2})', RClass.dump(o), e.invoke);
      }
      var r = m.call(o, e);
      if((r == EEventStatus.Stop) || (r == EEventStatus.Cancel)){
         return r;
      }
   }
   return EEventStatus.Continue;
}
function FComponent_psInitialize(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeInitialize', FComponent);
   o.process(e);
   e.dispose();
}
function FComponent_psRelease(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeRelease', FComponent);
   o.process(e);
   e.dispose();
}
function FComponent_toString(){
   var o = this;
   return RClass.dump(o) + ':label=' + o._label;
}
function FComponent_dispose(){
   var o = this;
   o._parent = null;
   o._components = null;
   o.__base.FObject.dispose.call(o);
}
function FComponent_innerDumpInfo(s){
   var o = this;
   s.append(RClass.dump(o));
   s.append(',name=', o._name);
   s.append(',label=', o._label);
}
function FComponent_innerDump(s, l){
   var o = this;
   o.innerdumpInfo(s);
   var ps = o.components;
   if(ps){
      s.appendLine();
      var c = ps.count;
      for(var n = 0; n < c; n++){
         var p = ps.value(n);
         if(p){
            p.innerDump(s, l + 1);
         }
      }
   }
   return s;
}
function FContainer(o){
   o = RClass.inherits(this, o, FControl, MContainer);
   o.oeDesign            = RMethod.empty;
   o.panel               = FContainer_panel;
   o.focusControl        = FContainer_focusControl;
   o.storeConfig         = FContainer_storeConfig;
   o.psBuildChildren     = FContainer_psBuildChildren;
   o.setChildrenProperty = FContainer_setChildrenProperty;
   return o;
}
function FContainer_panel(t){
   var o = this;
   if(EPanel.Container == t){
      return o.hPanel;
   }
   return o.base.FControl.panel.call(o, t);
}
function FContainer_focusControl(){
   return null;
   var o = this;
   var cs = o.controls;
   if(cs){
      var cc = cs.count;
      for(var n=0; n<cc; n++){
         var c = cs.value(n);
         if(RClass.isClass(c, MFocus) && c.testFocus()){
        	if(!RClass.isClass(c, FCalendar) && !RClass.isClass(c, FSelect)  && !RClass.isClass(c, FNumber)){
                return c.focus();
            }
         }
      }
      RConsole.find(FFocusConsole).focus(o);
   }
}
function FContainer_storeConfig(x){
   var o = this;
   x.name = RClass.name(o);
   o.saveConfig(x);
   var ps = o.components;
   if(ps){
      for(var n=0; n<ps.count; n++){
         var p = ps.value(n);
         var xp = x.create(RClass.name(p));
         if(RClass.isClass(p, FContainer)){
            p.storeConfig(xp);
         }else{
            p.saveConfig(xp);
         }
      }
   }
}
function FContainer_psBuildChildren(){
   var o = this;
   var e = REvent.alloc(o, EEvent.Build);
   o.ps(e, null, true);
   REvent.free(e);
}
function FContainer_setChildrenProperty(p, vs){
   var o = this;
   for(var n in vs){
      o.component(n)[p] = vs[n];
   }
}
function FControl(o){
   o = RClass.inherits(this, o, FComponent, MStyle, MSize, MPadding);
   o._disable          = RClass.register(o, new APtyBoolean('_disable', null, false));
   o._nowrap           = RClass.register(o, new APtyBoolean('_nowrap', null, false));
   o._hint             = RClass.register(o, new APtyString('_hint'));
   o._styleContainer   = RClass.register(o, new AStyle('_styleContainer', 'Container'));
   o._statusVisible    = true;
   o._statusEnable     = true;
   o._statusBuild      = false;
   o._controls         = null;
   o._hParent          = null;
   o._hContainer       = null;
   o.onBuildContainer  = FControl_onBuildContainer;
   o.oeBuild           = FControl_oeBuild;
   o.oeMode            = FControl_oeMode;
   o.oeEnable          = FControl_oeEnable;
   o.oeVisible         = FControl_oeVisible;
   o.oeResize          = FControl_oeResize;
   o.oeRefresh         = FControl_oeRefresh;
   o.construct         = FControl_construct;
   o.topControl        = FControl_topControl;
   o.hasControl        = FControl_hasControl;
   o.controls          = FControl_controls;
   o.panel             = FControl_panel;
   o.isVisible         = FControl_isVisible;
   o.setVisible        = FControl_setVisible;
   o.show              = FControl_show;
   o.hide              = FControl_hide;
   o.isEnable          = FControl_isEnable;
   o.setEnable         = FControl_setEnable;
   o.enable            = FControl_enable;
   o.disable           = FControl_disable;
   o.psBuild           = FControl_psBuild;
   o.psMode            = FControl_psMode;
   o.psDesign          = FControl_psDesign;
   o.psEnable          = FControl_psEnable;
   o.psVisible         = FControl_psVisible;
   o.psResize          = FControl_psResize;
   o.psRefresh         = FControl_psRefresh;
   o.push              = FControl_push;
   o.attachEvent       = FControl_attachEvent;
   o.linkEvent         = FControl_linkEvent;
   o.callEvent         = FControl_callEvent;
   o.dispose           = FControl_dispose;
   return o;
}
function FControl_onEnter(e){
   var o = this;
   RConsole.find(FFocusConsole).enter(o);
   if(o.hint){
      window.status = o.hint;
   }
}
function FControl_onLeave(e){
   var o = this;
   RConsole.find(FFocusConsole).leave(o);
   if(o.hint){
      window.status = '';
   }
}
function FControl_onBuildContainer(e){
   var o = this;
   o._hContainer = RBuilder.createDiv(e.hDocument, o.style('Container'));
}
function FControl_oeBuild(e){
   var o = this;
   if(e.isBefore()){
      o.onBuildContainer(e);
      var h = o._hContainer;
      RHtml.linkSet(h, 'control', o);
      o.setSize(o.width, o.height);
      o.setPadding(o._padding.left, o._padding.top, o._padding.right, o._padding.bottom, true);
      o._statusBuild = true;
   }
   return EEventStatus.Continue;
}
function FControl_oeMode(e){
   var o = this;
   o._displayCd = e.displayCd;
   return EEventStatus.Continue;
}
function FControl_oeEnable(e){
   var o = this;
   if(e.isBefore()){
      o.setEnable(e.enable);
   }
   return EEventStatus.Continue;
}
function FControl_oeVisible(e){
   var o = this;
   if(e.isBefore()){
      o.setVisible(e.visible);
   }
   return EEventStatus.Continue;
}
function FControl_oeResize(e){
   return EEventStatus.Continue;
}
function FControl_oeRefresh(e){
   return EEventStatus.Continue;
}
function FControl_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   o.__base.MSize.construct.call(o);
   o.__base.MPadding.construct.call(o);
}
function FControl_topControl(c){
   var r = this;
   if(c){
      while(r._parent){
         if(RClass.isClass(r._parent, c)){
            return r._parent;
         }
         r = r._parent;
      }
      if(!RClass.isClass(r, c)){
         return null;
      }
   }else{
      while(r._parent){
         if(!RClass.isClass(r._parent, FControl)){
            break;
         }
         r = r._parent;
      }
   }
   return r;
}
function FControl_hasControl(){
   var cs = this._controls;
   return cs ? !cs.isEmpty() : false;
}
function FControl_controls(){
   var o = this;
   var r = o._controls;
   if(r == null){
      r = new TDictionary();
      o._controls = r;
   }
   return r;
}
function FControl_panel(p){
   var o = this;
   switch(p){
      case EPanel.Parent:
         return o._hParent;
      case EPanel.Container:
      case EPanel.Size:
         return o._hContainer;
   }
   return null;
}
function FControl_isVisible(){
   return _statusVisible;
}
function FControl_setVisible(v){
   var o = this;
   o._visible = v;
   var h = o.panel(EPanel.Container);
   if(h){
      RHtml.displaySet(h, v);
   }
}
function FControl_show(){
   var o = this;
   if(!o._statusVisible){
      o.setVisible(true);
   }
}
function FControl_hide(){
   var o = this;
   if(o._statusVisible){
      o.setVisible(false);
   }
}
function FControl_isEnable(){
   return this._statusEnable;
}
function FControl_setEnable(p){
   var o = this;
   o._statusEnable = p;
   var h = o.panel(EPanel.Container);
   if(h){
      h.style.disabled = !p;
   }
}
function FControl_enable(){
   var o = this;
   if(!o._statusEnable){
      o.setEnable(true);
   }
}
function FControl_disable(){
   var o = this;
   if(o._statusEnable){
      o.setEnable(false);
   }
}
function FControl_psBuild(p){
   var o = this;
   var h = null;
   var d = null;
   if(p.createElement){
      d = p;
      h = p.body;
   }else if(p.ownerDocument.createElement){
      d = p.ownerDocument;
      h = p;
   }else{
      throw new TError("Build parent is invalid. (parent={1})", p);
   }
   var e = new TEventProcess(null, o, 'oeBuild', FControl);
   e.hDocument = d;
   o.process(e);
   e.hDocument = null;
   e.dispose();
}
function FControl_psMode(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeMode', FControl);
   e.displayCd = p;
   o.process(e);
   e.dispose();
}
function FControl_psDesign(m, f){
   var o = this;
   RConsole.find(FDesignConsole).setFlag(m, f, o);
   var e = new TEventProcess(null, o, 'oeDesign', MDesign)
   e.mode = m;
   e.flag = f;
   o.process(e);
   e.dispose();
}
function FControl_psEnable(v){
   var o = this;
   var e = new TEventProcess(null, o, 'oeEnable', FControl)
   e.enable = v;
   o.process(e);
   e.dispose();
}
function FControl_psVisible(v){
   var o = this;
   var e = new TEventProcess(null, o, 'oeVisible', FControl);
   e.visible = v;
   o.process(e);
   e.dispose();
}
function FControl_psResize(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeResize', FControl);
   o.process(e);
   e.dispose();
}
function FControl_psRefresh(t){
   var o = this;
   var e = new TEventProcess(null, o, 'oeRefresh', FControl);
   o.process(e);
   e.dispose();
}
function FControl_setPanel(h){
   var o = this;
   o.hParent = h;
   if(h && o.hPanel){
      h.appendChild(o.hPanel);
   }
}
function FControl_push(p){
   var o = this;
   o.__base.FComponent.push.call(o, p);
   if(RClass.isClass(p, FControl)){
      var cs = o.controls();
      if(!p.name){
         p.name = cs.count;
      }
      cs.set(p.name, p);
   }
}
function FControl_attachEvent(n, h, m){
   return RControl.attachEvent(this, n, h, m);
}
function FControl_linkEvent(t, n, h, m){
   return RControl.linkEvent(this, t, n, h, m);
}
function FControl_callEvent(n, s, e){
   var o = this;
   var es = o._events;
   if(es){
      var ec = es.get(n);
      if(ec){
         ec.invoke(s, s, e);
      }
   }
}
function FControl_dispose(){
   var o = this;
   o.__base.FComponent.dispose.call(o)
   RMemory.freeHtml(o._hContainer);
   o._hParent = null;
   o._hContainer = null;
}
function MContainer(o){
   o = RClass.inherits(this, o);
   o.appendChild = RMethod.empty;
   return o;
}
function MDataValue(o){
   o = RClass.inherits(this, o);
   o.loadValue = RMethod.virtual(o, 'loadValue');
   o.saveValue = RMethod.virtual(o, 'saveValue');
   return o;
}
function MDesign(o){
   o = RClass.inherits(this, o);
   o.inDesign      = false;
   o.storage       = null;
   o.oeDesign      = MDesign_oeDesign;
   o.onDesignEnter = RClass.register(o, new HMouseEnter('onDesignEnter'), MDesign_onDesignEnter);
   o.onDesignLeave = RClass.register(o, new HMouseEnter('onDesignLeave'), MDesign_onDesignLeave);
   o.onDesignBegin = RClass.register(o, new HMouseEnter('onDesignBegin'), MDesign_onDesignBegin);
   o.onDesignEnd   = RClass.register(o, new HMouseEnter('onDesignEnd'), MDesign_onDesignEnd);
   return o;
}
function MDesign_oeDesign(e){
   if(e.isBefore()){
      switch(e.mode){
         case EDesign.Move:
            var o = this;
            var h = o.hPanel;
            if(e.flag){
               o.isDesign = true;
               RHtml.link(h, 'className', h.className);
               RHtml.link(h, 'onmousedown', h.onmousedown);
               h.onmousedown = null;
               o.onDesignEnter();
            }else{
               o.isDesign = false;
               h.className = RHtml.findLink(h, 'className');
               var omd = RHtml.findLink(h, 'onmousedown');
               if(omd){
                  h.onmousedown = omd;
               }
            }
            break;
         case EDesign.Border:
            var o = this;
            var h = o.hPanel;
            if(e.flag){
               RHtml.link(h, 'styleBorder', h.style.border);
               h.style.border = '1 solid red';
            }else{
               h.style.border = RHtml.findLink(h, 'styleBorder');
            }
            break;
      }
   }
}
function MDesign_onDesignEnter(){
   var o = this;
   o.hPanel.className = o.style('Design');
}
function MDesign_onDesignLeave(){
}
function MDesign_onDesignBegin(){
   var o = this;
   var g = o.storage = RObject.nvlObj(o.storage);
   g.designStyle = o.hPanel.className;
   g.designLayer = o.hPanel.zIndex;
   o.hPanel.className = o.style('DesignDrag');
   o.inDesign = true;
}
function MDesign_onDesignEnd(){
   var o = this;
   var g = o.storage = RObject.nvlObj(o.storage);
   o.hPanel.className = g.designStyle;
   o.hPanel.zIndex = g.designLayer;
   o.inDesign = false;
}
function MDisplay(o){
   o = RClass.inherits(this, o);
   o._dispDisplay = RClass.register(o, new APtySet(null, '_dispDisplay', 'disp_mode', EDisplayMode.Display, false));
   o._dispSearch  = RClass.register(o, new APtySet(null, '_dispSearch', 'disp_mode', EDisplayMode.Search, false));
   o._dispInsert  = RClass.register(o, new APtySet(null, '_dispInsert', 'disp_mode', EDisplayMode.Insert, false));
   o._dispUpdate  = RClass.register(o, new APtySet(null, '_dispUpdate', 'disp_mode', EDisplayMode.Update, false));
   o._dispDelete  = RClass.register(o, new APtySet(null, '_dispDelete', 'disp_mode', EDisplayMode.Delete, false));
   o._dispZoom    = RClass.register(o, new APtySet(null, '_dispZoom', 'disp_mode', EDisplayMode.Zoom, false));
   o._dispAlign   = RClass.register(o, new APtyString(null, '_dispAlign', null, EAlign.Left));
   o._visible    = true;
   o.oeMode      = MDisplay_oeMode;
   o.canVisible  = MDisplay_canVisible;
   return o;
}
function MDisplay_oeMode(e){
   var o = this;
   if(e.isBefore()){
      var v = true;
      if(!o.base.MDisplayAble){
         v = o.canVisible(e.mode);
      }
      o.setVisible(v);
   }
}
function MDisplay_canVisible(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case EMode.Display:
         return o.dispList;
      case EMode.Search:
         return o.dispSearch;
      case EMode.Insert:
         return o.dispInsert;
      case EMode.Update:
         return o.dispUpdate;
      case EMode.Delete:
         return o.dispDelete;
      case EMode.Zoom:
         return o.dispZoom;
   }
}
function MDropable(o){
   o = RClass.inherits(this, o);
   o._styleDrop         = RClass.register(o, new AStyle('Drop'));
   o._styleIconDrop     = RClass.register(o, new AStyleIcon('Drop'));
   o._hDropPanel        = null;
   o._hDrop             = null;
   o.onDropEnter       = RClass.register(o, new HMouseEnter('onDropEnter'));
   o.onDropLeave       = RClass.register(o, new HMouseLeave('onDropLeave'));
   o.onDropClick       = RClass.register(o, new HMouseDown('onDropClick'), MDropable_onDropClick);
   o.onDropDoubleClick = RClass.register(o, new HDoubleClick('onDropDoubleClick'), MDropable_onDropDoubleClick);
   o.onBuildDrop       = MDropable_onBuildDrop;
   o.canDrop           = MDropable_canDrop;
   o.drop              = RMethod.virtual(o, 'drop');
   return o;
}
function MDropable_onDropDoubleClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}
function MDropable_onDropClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}
function MDropable_onBuildDrop(){
   var o = this;
   var h = o.hDrop = RBuilder.newIcon(null, o.styleIcon('Drop'));
   h.style.width =16;
   h.style.borderLeft = '1 solid #CCCCCC';
   h.className = o.style('Drop');
   h.style.cursor = 'hand';
   o.attachEvent('onDropEnter', h);
   o.attachEvent('onDropLeave', h);
   o.attachEvent('onDropClick', h);
}
function MDropable_canDrop(){
   var o = this;
   if(RClass.isClass(o, MDesign)){
      return !RConsole.find(FDesignConsole).canDesignMove;
   }
   return true;
}
function MEditable(o){
   o = RClass.inherits(this, o);
   o._editInsert = RClass.register(o, new APtySet(null, '_editInsert', 'edit_mode', EDisplayMode.Insert, false));
   o._editUpdate = RClass.register(o, new APtySet(null, '_editUpdate', 'edit_mode', EDisplayMode.Update, false));
   o._editDelete = RClass.register(o, new APtySet(null, '_editDelete', 'edit_mode', EDisplayMode.Delete, false));
   o._editZoom   = RClass.register(o, new APtySet(null, '_editZoom', 'edit_mode', EDisplayMode.Zoom, false));
   o._absEdit   = true;
   o._editable  = false;
   o.canEdit    = MEditable_canEdit;
   return o;
}
function MEditable_canEdit(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case EMode.Insert:
         return o.editInsert;
      case EMode.Update:
         return o.editUpdate;
      case EMode.Delete:
         return o.editDelete;
      case EMode.Zoom:
         return o.editZoom;
   }
}
function MEditDescriptor(o){
   o = RClass.inherits(this, o, MEditable);
   o._dataName          = RClass.register(o, new APtyString(null, '_dataName'));
   o._dataCode          = RClass.register(o, new APtyString(null, '_dataCode'));
   o._dataDefault       = RClass.register(o, new APtyString(null, '_dataDefault'));
   o._labelIcon         = RClass.register(o, new APtyString(null, '_labelIcon'));
   o._labelIconDisable  = RClass.register(o, new APtyString(null, '_labelIconDisable'));
   o._labelColor        = RClass.register(o, new APtyString(null, '_labelColor'));
   o._labelAlign        = RClass.register(o, new APtyString(null, '_labelAlign', null, EAlign.Left));
   o._labelValign       = RClass.register(o, new APtyString(null, '_labelValign', null, EAlign.Middle));
   o._editSearch        = RClass.register(o, new APtySet(null, '_editSearch', 'editAccess', EEditConfig.Search, false));
   o._editCopy          = RClass.register(o, new APtySet(null, '_editCopy', 'editAccess', EEditConfig.Copy, false));
   o._editAlign         = RClass.register(o, new APtyString(null, '_editAlign', null, EAlign.Left));
   o._editValign        = RClass.register(o, new APtyString(null, '_editValign', null, EAlign.Middle));
   o._editFormat        = RClass.register(o, new APtyString(null, '_editFormat'));
   o._editUnit          = RClass.register(o, new APtyString(null, '_editUnit'));
   o._editTip           = RClass.register(o, new APtyString(null, '_editTip'));
   o._validInsert       = RClass.register(o, new APtySet(null, '_validInsert', 'validAccess', EDisplayMode.Insert, false));
   o._validUpdate       = RClass.register(o, new APtySet(null, '_validUpdate', 'validAccess', EDisplayMode.Update, false));
   o._validDelete       = RClass.register(o, new APtySet(null, '_validDelete', 'validAccess', EDisplayMode.Delete, false));
   o._validRequire      = RClass.register(o, new APtyBoolean(null, '_validRequire', null, false));
   o.__tip             = null;
   o._validable        = false;
   o.oeSaveCode        = MEditDescriptor_oeSaveCode;
   o.canValid          = MEditDescriptor_canValid;
   o.__changedEvent    = new TEvent();
   o.formatValue       = MEditDescriptor_formatValue;
   o.formatText        = MEditDescriptor_formatText;
   o.setInfo           = RMethod.empty;
   o.validText         = MEditDescriptor_validText;
   return o;
}
function MEditDescriptor_onDataEnter(s, e){
   var o = this;
   if(s.__progress){
      return;
   }
   if(s._editable){
      s._hover = true;
      s.refreshStyle();
   }
   if(o.editTip){
      o.__tip = window.status;
   }
}
function MEditDescriptor_onDataLeave(s, e){
   var o = this;
   if(s.__progress){
      return;
   }
   if(s._editable){
      o._hover = false;
      o.refreshStyle();
   }
   if(o.editTip){
      window.status = o.__tip;
   }
}
function MEditDescriptor_onDataKeyDown(s, e){
   var o = this;
   if(s._editable && !s._disabled){
      s._invalidText = o.validText(s.text());
      s.refreshStyle();
   }
}
function MEditDescriptor_onDataChange(s, e){
   var o = this;
   if(s._editable && !s._disabled){
      if(s.isTextChanged()){
         var t = s.text();
         var vt = s._invalidText = o.validText(t);
         if(vt){
            s.refreshStyle();
         }else{
         }
         o.callEvent('onDataChange', o, o.__changedEvent);
      }
   }
}
function MEditDescriptor_onDataEditEnd(s, e){
   var o = this;
   var vt = s._invalidText = o.validText(s.text());
   if(vt){
      RLogger.debug(this, 'Edit valid failed ({0})', vt);
   }else{
      s.commitValue();
   }
   if(s.isTextChanged()){
	   o.callEvent('onDataChange', o, o.__changedEvent);
   }
   s.refreshStyle();
}
function MEditDescriptor_oeSaveCode(e){
   var o = this;
   if(!RString.isEmpty(o.dataName) && !RString.isEmpty(o.dataCode)){
      e.values.set(o.dataName, o.dataCode);
   }
   return EEventStatus.Stop;
}
function MEditDescriptor_canValid(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case EMode.Insert:
         return o.validInsert;
      case EMode.Update:
         return o.validUpdate;
      case EMode.Delete:
         return o.validDelete;
   }
}
function MEditDescriptor_formatValue(v){
   return RString.nvl(v);
}
function MEditDescriptor_formatText(t){
   return RString.nvl(t);
}
function MEditDescriptor_validText(t){
   var o = this;
}
function MEditReference(o){
   o = RClass.inherits(this, o);
   o._lovService    = RClass.register(o, new APtyString('_lovService', null, EDataService.WebForm));
   o._lovRefer      = RClass.register(o, new APtyString('_lovRefer'));
   o._lovFields     = RClass.register(o, new APtyString('_lovFields'));
   o._lovWhere      = RClass.register(o, new APtyString('_lovWhere'));
   o._lovOrder      = RClass.register(o, new APtyString('_lovOrder'));
   o.__listView     = null;
   o.onListSelected = RMethod.empty;
   o.canListView    = MEditReference_canListView;
   o.setLabelStyle  = MEditReference_setLabelStyle;
   o.doListView     = MEditReference_doListView;
   return o;
}
function MEditReference_onListClick(e){
   var o = this;
   if(o.canListView()){
      o.doListView();
   }
}
function MEditReference_canListView(){
   return !RString.isEmpty(this.lovRefer) && this._editable;
}
function MEditReference_setLabelStyle(){
   var o = this;
   if(!RString.isEmpty(o.lovRefer)){
      o.hLabel.style.cursor = 'hand';
      o.attachEvent('onListClick', o.hLabel);
      o.hLabel.className = 'RLine_Underline';
   }
}
function MEditReference_doListView(cvs){
   var o = this;
   var v = o.__listView;
   if(!v){
      v = o.__listView = top.RControl.create(top.FListWindow);
   }
   v.linkConsole = RConsole;
   v.linkLovControl(o);
   v.show();
   v.fetch(cvs);
}
function MEditValidator(o){
   o = RClass.inherits(this, o);
   o._validable = false;
   o._valid     = true;
   o._validText = null;
   o.oeValid    = RMethod.empty;
   return o;
}
function MEditValue(o){
   o = RClass.inherits(this, o, MDataValue);
   o._dataValue     = RClass.register(o, new APtyString(null, '_dataValue'));
   o.__recordValue = null;
   o.__recordText  = null;
   o._info         = null;
   o._hover        = false;
   o._editable     = true;
   o._editing      = false;
   o._disbaled     = false;
   o._invalid      = false;
   o._invalidText  = null;
   o.oeClearValue  = MEditValue_oeClearValue;
   o.oeResetValue  = MEditValue_oeResetValue;
   o.oeLoadValue   = MEditValue_oeLoadValue;
   o.oeSaveValue   = MEditValue_oeSaveValue;
   o.oeRecordValue = MEditValue_oeRecordValue;
   o.oeValidValue  = RMethod.empty;
   o.descriptor    = MEditValue_descriptor;
   o.isTextChanged = MEditValue_isTextChanged;
   o.isDataChanged = MEditValue_isDataChanged;
   o.clearValue    = MEditValue_clearValue;
   o.resetValue    = MEditValue_resetValue;
   o.loadValue     = MEditValue_loadValue;
   o.saveValue     = MEditValue_saveValue;
   o.recordValue   = MEditValue_recordValue;
   o.commitValue   = MEditValue_commitValue;
   o.validValue    = RMethod.empty;
   o.get           = MEditValue_get;
   o.reget         = MEditValue_reget;
   o.set           = MEditValue_set;
   o.setInfoPack   = MEditValue_setInfoPack;
   o.setInfo       = MEditValue_setInfo;
   o.setEditable   = MEditValue_setEditable;
   o.doFocus       = MEditValue_doFocus;
   o.doBlur        = MEditValue_doBlur;
   return o;
}
function MEditValue_oeClearValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.clearValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}
function MEditValue_oeResetValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.resetValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}
function MEditValue_oeLoadValue(e){
   var o = this;
   var d = o.descriptor();
   var vs = e.values;
   var dn = d.dataName;
   if(!RString.isEmpty(dn)){
      if(vs.contains(dn)){
         var v = vs.nvl(dn);
         if(RControl.isInfo(v)){
            o.setInfoPack(v);
         }else{
        	 if(RControl.isGroup(v)){
        		 o.setGroupPack(v);
        	 }else{
                 o.loadValue(vs);
        	 }
         }
         o.recordValue();
         o.dataValue = o.reget();
      }
   }
   return EEventStatus.Stop;
}
function MEditValue_oeSaveValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.saveValue(e.values);
   }
   return EEventStatus.Stop;
}
function MEditValue_oeRecordValue(){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.recordValue();
   }
   return EEventStatus.Stop;
}
function MEditValue_descriptor(){
   return this;
}
function MEditValue_isTextChanged(){
   return RString.nvl(this.text()) != this.__recordText;
}
function MEditValue_isDataChanged(){
   return RString.nvl(this.reget()) != this.__recordValue;
}
function MEditValue_clearValue(){
   var o = this;
   o.set(RString.EMPTY);
   o.dataValue = RString.EMPTY;
}
function MEditValue_resetValue(){
   var o = this;
   var v = RString.nvl(o.descriptor().dataDefault);
   o.set(v);
   o.dataValue = v;
}
function MEditValue_loadValue(c, t){
   var o = this;
   var d = o.descriptor();
   if(EStore.Name == t){
      o.set(c.get(d.name));
   }else if(EStore.DataNvl == t){
      if(c.contains(d.dataName)){
         o.set(c.get(d.dataName));
      }
   }else if(EStore.Reset == t){
      o.set(RString.EMPTY);
   }else{
      o.set(c.get(d.dataName));
   }
}
function MEditValue_saveValue(c, t){
   var o = this;
   var d = o.descriptor();
   if(EStore.Name == t){
      c.set(d.name, o.reget());
   }else{
      c.set(d.dataName, o.reget());
   }
}
function MEditValue_recordValue(){
   var o = this;
   o.__recordText = RString.nvl(o.text());
   o.__recordValue = RString.nvl(o.reget());
}
function MEditValue_commitValue(){
   this.__commitValue = RString.nvl(this.reget());
}
function MEditValue_get(){
   return this.dataValue;
}
function MEditValue_reget(){
   return this.descriptor().formatValue(this.text());
}
function MEditValue_set(v){
   var o = this;
   o.dataValue = RString.nvl(v);
   o.setText(o.descriptor().formatText(v));
}
function MEditValue_setInfoPack(v){
   var o = this;
   var f = o._info;
   if(!f){
      f = o._info = new TControlInfo();
   }
   f.unpack(v);
   var d = o.descriptor();
   d.setInfo(f);
   if(d != o){
      o.setInfo(f);
   }
}
function MEditValue_setInfo(f){
   this.set(f.value);
}
function MEditValue_setEditable(v){
   var o = this;
   o._editable = v;
   o.refreshStyle();
}
function MEditValue_doFocus(){
   var o = this;
   if(o._editable){
      o._editing = true;
      o.descriptor().onDataEditBegin(o);
   }
}
function MEditValue_doBlur(){
   var o = this;
   if(o._editable && o._editing){
      o.descriptor().onDataEditEnd(o);
      o._editing = false;
   }
}
function MEditZoom(o){
   o = RClass.inherits(this, o);
   o._zoomRefer = RClass.register(o, new APtyString('_zoomRefer'));
   o._zoomField = RClass.register(o, new APtyString('_zoomField'));
   o.testZoom   = MEditZoom_testZoom;
   o.doZoom     = MEditZoom_doZoom;
   return o;
}
function MEditZoom_testZoom(){
   return !RString.isEmpty(this.zoomRefer);
}
function MEditZoom_doZoom(v){
   RFormSpace.doZoom(this, v);
}
function MFocus(o){
   o = RClass.inherits(this, o);
   o.onFocus   = RClass.register(o, new HFocus('onFocus'), MFocus_onFocus);
   o.onBlur    = RClass.register(o, new HBlur('onBlur'));
   o.testFocus = RMethod.emptyTrue;
   o.testBlur  = RMethod.emptyTrue;
   o.doFocus   = RMethod.empty;
   o.doBlur    = RMethod.empty;
   o.focus     = MFocus_focus;
   o.blur      = MFocus_blur;
   return o;
}
function MFocus_onFocus(e){
   RConsole.find(FFocusConsole).focus(this, e);
}
function MFocus_focus(){
   RConsole.find(FFocusConsole).focus(this);
}
function MFocus_blur(){
   RConsole.find(FFocusConsole).blur(this);
}
function MPadding(o){
   o = RClass.inherits(this, o);
   o._padding     = RClass.register(o, new APtyPadding('_padding'));
   o.construct    = MPadding_construct;
   o.padding      = MPadding_padding;
   o.setPadding   = MPadding_setPadding;
   o.refreshStyle = MPadding_refreshStyle;
   return o;
}
function MPadding_construct(){
   var o = this;
   o._padding = new SPadding();
}
function MPadding_padding(){
   return this._padding;
}
function MPadding_setPadding(l, t, r, b){
   return this._padding.set(l, t, r, b);
}
function MPadding_refreshStyle(){
   var o = this;
   var p = o._padding;
   var h = o.panel(EPanel.Container);
   if(p.left){
      h.style.paddingLeft = p.left;
   }
   if(p.top){
      h.style.paddingTop = p.top;
   }
   if(p.right){
      h.style.paddingRight = p.right;
   }
   if(p.bottom){
      h.style.paddingBottom = p.bottom;
   }
}
function MProgress(o){
   o = RClass.inherits(this, o);
   o.oeProgress = RMethod.virtual(o, 'oeProgress');
   return o;
}
function MPropertyEdit(o){
   o = RClass.inherits(this, o, MEditValidator, MEditReference, MEditZoom);
   o._editCase       = RClass.register(o, new APtyString('_editCase'));
   o._editPattern    = RClass.register(o, new APtyString('_editPattern'));
   o._editLength     = RClass.register(o, new APtyInteger('_editLength'));
   o._editComplete   = RClass.register(o, new APtyBoolean('_editComplete'));
   o._validLengthMin = RClass.register(o, new APtyInteger('_validLengthMin'));
   o._validLengthMax = RClass.register(o, new APtyInteger('_validLengthMax'));
   o.oeValid         = MPropertyEdit_oeValid;
   return o;
}
function MPropertyEdit_oeValid(e){
   var o = this;
   var r = EEventStatus.Stop;
   if(o._visible && o._validable){
      var t = o.text();
      if(o.validRequire && !RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      if(o.editLength && !RValidator.validTextLength(o, t, o.editLength)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}
function MSize(o){
   o = RClass.inherits(this, o);
   o._location = RClass.register(o, new APtyPoint2('_location'));
   o._size     = RClass.register(o, new APtySize2('_size'));
   o.onSize    = null;
   o.construct = MSize_construct;
   o.calcRect  = MSize_calcRect;
   o.resize    = MSize_resize;
   o.setSize   = MSize_setSize;
   o.setBounds = MSize_setBounds;
   o.resetSize = MSize_resetSize;
   o.innerDump = MSize_innerDump;
   return o;
}
function MSize_construct(){
   var o = this;
   o._location = new SPoint2();
   o._size = new SSize2();
}
function MSize_resize(width, height){
   var sizeable = false;
   var hStyle = this.htmlPanel(EPanel.Border).style;
   if(null != width){
      width = Math.max(parseInt(width), EMoveSize.MinWidth);
      if(this.width != width){
         this.width = width;
         hStyle.pixelWidth = width;
         sizeable = true;
      }
   }
   if(height != null){
      height = Math.max(parseInt(height), EMoveSize.MinHeight);
      if(this.height != height){
         this.height = height;
         hStyle.pixelHeight = height;
         sizeable = true;
      }
   }
   if(sizeable && this.onSize){
      this.onSize();
   }
}
function MSize_setSize(w, h){
   var h = this.panel(EPanel.Size);
   if(w){
      h.style.width = w;
   }
   if(h){
      h.style.height = h;
   }
}
function MSize_setBounds(l, t, r, b, force){
   var o = this;
   var h = o.panel(EPanel.Size);
   if(!h){
      return;
   }
   var s = h.style;
   var c = false;
   if(l && l >= 0){
      if(force || o.left != l){
         o.left = l;
         s.pixelLeft = l;
         c = true;
      }
   }
   if(t && t >= 0){
      if(force || o.top != t){
         o.top = t;
         s.pixelTop = t;
         c = true;
      }
   }
   if(r && r >= 0){
      var width = r-o.left+1;
      if(force || o.width != width){
         o.width = width;
         s.pixelWidth = o.width;
         c = true;
      }
   }
   if(b && b >= 0){
      var height = b-o.top+1;
      if(force || o.height != height){
         o.height = height;
         s.pixelHeight = o.height;
         c = true;
      }
   }
   if(c && o.onSize){
      o.onSize();
   }
}
function MSize_resetSize(){
   var o = this;
   o.setBounds(o.left, o.top, o.left+o.width-1, o.top+o.height-1, true)
}
function MSize_calcRect(){
   this.rect = RRect.nvl(this.rect);
   RHtml.toRect(this.rect, this.hPanel);
   return this.rect;
}
function MSize_innerDump(s, l){
   var o = this;
   s.append('Size [', RBoolean.toString(o.isSizeable), ':');
   s.append(o.left, ',', o.top, '-', o.width, ',', o.height, ']');
}
function MSizeable(o){
   o = RClass.inherits(this, o);
   o.isSizeable  = true;
   o.onSize      = null;
   o.inSizeRange = RMethod.virtual(o, 'inSizeRange');
   o.cursor      = MSizeable_cursor;
   o.setCursor   = MSizeable_setCursor;
   o.resize      = MSizeable_resize;
   o.setBounds   = MSizeable_setBounds;
   o.startDrag   = MSizeable_startDrag;
   o.stopDrag    = MSizeable_stopDrag;
   return o;
}
function MSizeable_cursor(){
   var o = this;
   var src = RWindow.source();
   if(!o.inSizeRange(src)){
      return ECursor.Default;
   }
   var hObj = this.panel(EPanel.Border);
   var r = RHtml.rect(hObj);
   var pos = RWindow.offsetPos();
   var p = new TPoint(pos.x-r.left, pos.y-r.top);
   while(src){
      p.x += src.offsetLeft + src.clientLeft;
      p.y += src.offsetTop + src.clientTop;
      if(src == hObj){
         break;
      }
      src = src.offsetParent;
   }
   var border = EMoveSize.Border;
   var range = EMoveSize.Range;
   x = p.x;
   y = p.y;
   var right = r.width();
   var bottom = r.height();
   if(x>=0 && x<=range && y>=0 && y<=range){
      return ECursor.NorthWest;
   }else if(x>=0 && x<=range && y>=bottom-range && y<=bottom){
      return ECursor.SouthWest;
   }else if(x>=right-range && x<=right && y>=bottom-range && y<=bottom){
      return ECursor.SouthEast;
   }else if(x>=right-range && x<=right && y>=0 && y<=range){
      return ECursor.NorthEast;
   }else if(x>=0 && x<border && y>range && y<bottom-range){
      return ECursor.West;
   }else if(x>range && x<right-range && y>=bottom-border && y<=bottom){
      return ECursor.South;
   }else if(x>=right-border && x<=right && y>range && y<bottom-range){
      return ECursor.East;
   }else if(x>range && x<right-range && y>=0 && y<border){
      return ECursor.North;
   }
   return ECursor.Default;
}
function MSizeable_setCursor(cursor){
   if(!cursor){
      cursor = this.cursor();
   }
   var h = this.panel(EPanel.Size);
   if(h){
      h.style.cursor = (cursor == null || cursor == 'default') ? 'default' : cursor + '-resize';
   }
}
function MSizeable_resize(width, height){
   var sizeable = false;
   var hStyle = this.htmlPanel(EPanel.Border).style;
   if(width != null){
      width = Math.max(parseInt(width), EMoveSize.MinWidth);
      if(this.width != width){
         this.width = width;
         hStyle.pixelWidth = width;
         sizeable = true;
      }
   }
   if(height != null){
      height = Math.max(parseInt(height), EMoveSize.MinHeight);
      if(this.height != height){
         this.height = height;
         hStyle.pixelHeight = height;
         sizeable = true;
      }
   }
   if(sizeable && this.onSize){
      this.onSize();
   }
}
function MSizeable_setBounds(left, top, right, bottom, force){
   var sizeable = false;
   var st = this.htmlPanel(EPanel.Border).style;
   if(left != null){
      if(right == null || (right != null && right-left > EMoveSize.MinWidth)){
         left = Math.max(left, 0);
      }else{
         left = this.left;
      }
      if(force || this.left != left){
         this.left = left;
         st.pixelLeft = left;
         sizeable = true;
      }
   }
   if(top != null){
      if(bottom == null || (bottom != null && bottom-top > EMoveSize.MinHeight)){
         top = Math.max(top, 0);
      }else{
         top = this.top;
      }
      if(force || this.top != top){
         this.top = top;
         st.pixelTop = top;
         sizeable = true;
      }
   }
   if(right != null){
      var width = Math.max(right-this.left+1, EMoveSize.MinWidth);
      if(force || this.width != width){
         this.width = width;
         st.pixelWidth = this.width;
         sizeable = true;
      }
   }
   if(bottom != null){
      var height = Math.max(bottom-this.top+1, EMoveSize.MinHeight);
      if(force || this.height != height){
         this.height = height;
         st.pixelHeight = this.height;
         sizeable = true;
      }
   }
   if(sizeable && this.onSize){
      this.onSize();
   }
}
function MSizeable_startDrag(){
}
function MSizeable_stopDrag(){
}
function MStyle(o){
   o = RClass.inherits(this, o);
   o.style         = MStyle_style;
   o.styleIcon     = MStyle_styleIcon;
   o.styleIconPath = MStyle_styleIconPath;
   return o;
}
function MStyle_style(n, c){
   var r = RClass.find(c ? c : this, true);
   return r.style(n);
}
function MStyle_styleIcon(n, c){
   return 'ctl.' + RClass.name(c ? c : this, true) + '_' + n;
}
function MStyle_styleIconPath(n, c){
   return RResource.iconPath('ctl.' + RClass.name(c ? c : this, true) + '_' + n);
}
var RControl = new function RControl(){
   var o = this;
   o.inMoving           = false;
   o.inSizing           = false;
   o.inDesign           = false;
   o.instances          = new TList();
   o.events             = new TMap();
   o.controls           = new TMap();
   o.innerbuild         = RControl_innerbuild;
   o.build              = RControl_build;
   o.innerCreate        = RControl_innerCreate;
   o.create             = RControl_create;
   o.linkEvent          = RControl_linkEvent;
   o.attachEvent        = RControl_attachEvent;
   o.find               = RControl_find;
   o.fromNode           = RControl_fromNode;
   o.fromXml            = RControl_fromXml;
   o.toNode             = RControl_toNode;
   o.toXml              = RControl_toXml;
   o.store              = RControl_store;
   o.htmlControl        = RControl_htmlControl;
   o.psDesign           = RControl_psDesign;
   o.psMode             = RControl_psMode;
   o.isInfo             = RControl_isInfo;
   o.isGroup            = RControl_isGroup;
   o.newInstance        = RControl_newInstance;
   o.newInstanceByName  = RControl_newInstance;
   return o;
}
function RControl_innerbuild(ctl, cfg){
   if(ctl){
      var rs = ctl.loadConfig(cfg);
      ctl.construct();
      if(cfg.nodes){
         var child = true;
         if(rs && EStatus.Stop == rs){
            child = false;
         }
         if(child){
            var nodes = cfg.nodes;
            for(var n=0; n<nodes.count; n++){
               var node = nodes.get(n);
               var obj = ctl.createChild(node);
               if(obj){
                  this.innerbuild(obj, node);
                  ctl.push(obj);
               }
            }
         }
      }
   }
}
function RControl_build(ctl, cfg){
   this.innerbuild(ctl, cfg);
   ctl.initialize();
   ctl.build();
}
function RControl_innerCreate(p, x, m){
   p._emode = m;
   if(RClass.isClass(p, MConfig)){
      if(EStatus.Stop == p.loadConfig(x)){
         return;
      }
   }
   var ns = x.nodes;
   if(ns){
      for(var i=0; i<ns.count; i++){
         var n = ns.get(i);
         var c = p.createChild(n);
         if(c){
            c.parent = p;
            this.innerCreate(c, n, m);
            p.push(c);
         }
      }
   }
}
function RControl_create(x, hPanel, m){
   var o = null;
   if(RClass.isClass(x, TNode)){
      if(x){
         if(x.name == 'CellEdit'){
            RControl.newInstance(FCellEdit);
         }else{
             o = RClass.createByName('F' + x.name);
             this.innerCreate(o, x, m);
         }
         o._emode = m;
         this.instances.push(o);
      }
   }else{
      o = RClass.create(x);
      o._emode = m;
   }
   if(o){
      if(x.name != 'CellEdit'){
         o.psInitialize();
         o.psBuild();
         o.setPanel(hPanel);
      }
   }
   return o;
}
function RControl_linkEvent(tc, sc, n, h, m){
   var o = this;
   var p = tc[n];
   if(!RMethod.isEmpty(p) || m){
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      var e = new a.constructor();
      e.name = a.name;
      e.source = tc;
      e.sender = sc;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = REvent.onProcess;
      REvent.find(h).push(e.type, e);
      h[e.handle] = REvent.ohEvent;
      RHtml.linkSet(h, '_plink', tc);
      return e;
   }
}
function RControl_attachEvent(c, n, h, m){
   var o = this;
   var p = c[n];
   if(!RMethod.isEmpty(p) || m){
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      var e = new a.constructor();
      e.name = a.name;
      e.source = c;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = REvent.onProcess;
      REvent.find(h).push(e.type, e);
      h[e.handle] = REvent.ohEvent;
      RHtml.linkSet(h, '_plink', c);
      return e;
   }
}
function RControl_find(c){
   var o = this;
   var r = null;
   if(c){
      if(c.constructor == Function){
         c = RMethod.name(c);
      }else if(c.constructor != String){
         RMsg.fatal(o, null, 'Param invlid (class={0})', c);
      }
      var cs = o.controls;
      var r = cs.get(c);
      if(!r){
         r = new TControl(c);
         cs.set(c, r);
      }
   }
   return r;
}
function RControl_fromNode(x, h){
   if(x){
      return this.create(x, h);
   }
}
function RControl_fromXml(xml, hPanel, mode){
   var c = null;
   var x = RXml.makeNode(xml);
   if(x){
      c = this.create(x, hPanel, mode);
   }
   return c;
}
function RControl_toNode(){
}
function RControl_toXml(){
}
function RControl_store(o, type){
   var x = new TNode();
   x.name = RClass.name(o).substr(1);
   if(RClass.isClass(o, FContainer)){
      o.storeConfig(x);
   }else{
      o.saveConfig(x);
   }
   return x;
}
function RControl_htmlControl(e, c){
   if(c){
      while(e){
         var o = RHtml.linkGet(e, 'control');
         if(o && RClass.isClass(o, c)){
            return o;
         }
         e = e.parentElement;
      }
   }else{
      while(e){
         var o = RHtml.linkGet(e, 'control');
         if(o){
            return o;
         }
         e = e.parentElement;
      }
   }
   return null;
}
function RControl_psDesign(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psDesign(action, mode, flag, params);
      }
   }
}
function RControl_psMode(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psMode(action, mode, flag, params);
      }
   }
}
function RControl_isInfo(v){
   return v ? (0 == v.indexOf('C#')) : false;
}
function RControl_isGroup(v){
   return v ? (0 == v.indexOf('G#')) : false;
}
function RControl_newInstance(f){
   var o = this;
   if(o.controls){
     var n = RMethod.name(f);
      var c = o.controls.get(n);
      if(!c){
         var c = new TControl(n);
         o.controls.set(n, c);
      }
   }
   return c.newInstance(n);
}
function RControl_newInstanceByName(n){
   return;
}
var REvent = new function(){
   var o = this;
   o.current   = 0;
   o.events    = new Array();
   o.objects   = new Array();
   o.ohEvent   = REvent_ohEvent;
   o.onProcess = REvent_onProcess;
   o.nvl       = REvent_nvl;
   o.alloc     = REvent_alloc;
   o.free      = REvent_free;
   o.find      = REvent_find;
   o.process   = REvent_process;
   o.release   = REvent_release;
   RMemory.register('REvent', o);
   return o;
}
function REvent_ohEvent(e){
   if(!e){
      e = window.event;
   }
   REvent.process(this, e);
}
function REvent_onProcess(){
   var e = this;
   RLogger.debug(e, 'Process {1}. (source={2}, html={3}, process={4})', e.type, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.onProcess));
   if(e.sender){
      e.onProcess.call(e.source, e.sender, e);
   }else{
      e.onProcess.call(e.source, e);
   }
   RConsole.find(FFormConsole).processEvent(e);
}
function REvent_nvl(event, sender, code){
   if(!event){
      event = new TEvent();
   }
   event.sender = sender;
   event.code = code;
   return event;
}
function REvent_alloc(s, c){
   var e = null;
   var es = this.events;
   for(var n=0; n<es.length; n++){
      if(!es[n].inUsing){
         e = es[n];
         break;
      }
   }
   if(!e){
      e = es[es.length] = new TEvent();
   }
   e.inUsing = true;
   e.sender = s;
   e.code = c;
   return e;
}
function REvent_free(e){
   e.inUsing = false;
}
function REvent_find(h){
   var u = RRuntime.uid(h);
   var os = this.objects;
   var e = os[u];
   if(!e){
      e = os[u] = new THtmlEvent();
      e.link = h;
   }
   return e;
}
function REvent_process(hs, he){
   if(!(hs && he)){
      return;
   }
   var o = this;
   var un = hs._psource ? RRRuntimeHtml.uid(hs._psource) : RRuntime.uid(hs);
   var eo = o.objects[un];
   if(eo){
      var es = eo.events[he.type];
      if(es){
         var l = es.length;
         for(var n=0; n<l; n++){
            var e = es[n];
            e.source = RHtml.linkGet(hs, '_plink');
            e.hSender = he.srcElement ? he.srcElement : he.target;
            e.hSource = hs;
            if(e.attach){
               e.attach(he)
            }
            var er = e.sender ? e.sender : e.source;
            if(er && er._events){
               var ec = er._events.get(e.name);
               if(ec){
                  e.result = false;
                  ec.invoke(e.source, er, e);
                  if(e.result){
                     return;
                  }
               }
            }
            if(e.ohProcess){
               RLogger.debug(e, 'Execute {1}. (source={2}, html={3}, process={4})', e.type, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
               try{
                  if(e.sender){
                     e.ohProcess.call(e.source, e.sender, e, he);
                  }else{
                     e.ohProcess.call(e.source, e, he);
                  }
               }catch(ex){
                  RMessage.fatal(o, ex, 'Execute {1} failure. (source={2}, html={3}, process={4})', e.type, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
               }
            }else if(e.onProcess){
               RConsole.find(FEventConsole).push(e);
            }
         }
         return true;
      }
   }
   return false;
}
function REvent_release(){
   var o = this;
   RMemory.free(o.events);
   RMemory.free(o.objects);
   o.events = null;
   o.objects = null;
}
function TEvent(owner, code, proc){
   var o = this;
   o.owner     = owner;
   o.code      = code;
   o.type      = null;
   o.onProcess = proc;
   o.isBefore  = TEvent_isBefore;
   o.isAfter   = TEvent_isAfter;
   o.process   = TEvent_process;
   o.dump      = TEvent_dump;
   return o;
}
function TEvent_isBefore(){
   return (EEventType.Before == this.type);
}
function TEvent_isAfter(){
   return (EEventType.After == this.type);
}
function TEvent_process(){
   var o = this;
   if(!o.onProcess){
      return RMessage.fatal(o, null, 'Process event is null. (owner={0})', RClass.dump(o.owner));
   }
   var sp = new TSpeed(o, 'Process event (owner={0}, process={1})', o.owner, RMethod.name(o.onProcess));
   if(o.owner){
      o.onProcess.call(o.owner, o);
   }else{
      o.onProcess();
   }
   sp.record();
}
function TEvent_dump(){
   return RClass.typeOf(this) + ' [' + this.owner + ',' + this.type + '-' + this.code + ']';
}
function TEventProcess(o, po, pm, pc){
   if(!o){o = this;}
   o.owner    = po;
   o.invoke   = pm;
   o.clazz    = RClass.name(pc);
   o.invokeCd = EEventInvoke.Unknown;
   o.isBefore = TEventProcess_isBefore;
   o.isAfter  = TEventProcess_isAfter;
   o.dispose  = TEventProcess_dispose;
   o.dump     = TEventProcess_dump;
   return o;
}
function TEventProcess_isBefore(){
   return this.invokeCd == EEventInvoke.Before;
}
function TEventProcess_isAfter(){
   return this.invokeCd == EEventInvoke.After;
}
function TEventProcess_dispose(){
   var o = this;
   o.owner = null;
   o.invoke = null;
   o.clazz = null;
   o.invokeCd = null;
}
function TEventProcess_dump(){
   var o = this;
   return RClass.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + RMethod.name(o.invoke);
}
function THtmlEvent(){
   var o = this;
   o.link    = null;
   o.events  = new Object();
   o.load    = THtmlEvent_load;
   o.push    = THtmlEvent_push;
   o.dispose = THtmlEvent_dispose;
   o.dump    = THtmlEvent_dump;
   return o;
}
function THtmlEvent_load(e){
   var o = this;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}
function THtmlEvent_push(pn, pe){
   var o = this;
   var ess = o.events;
   var es = ess[pn];
   if(!es){
      es = new Array();
      es.handle = pe.handle;
      ess[pn] = es;
   }
   var f = pe.name;
   var c = es.length;
   for(var i = 0; i < c; i++){
      var e = es[i];
      if(e.name == f){
         RMessage.fatal(this, 'push', 'Duplicate event for same control. (name={1}, source={2}, event={3})\n{4}\n{5}', pn, RClass.dump(pe.source), RClass.dump(pe), RString.repeat('-', 60), o.dump());
      }
   }
   es[es.length] = pe;
}
function THtmlEvent_dispose(){
   var o = this;
   for(var n in o.events){
      var e = o.events[n];
      if(e.length){
         o.link[e.handle] = null;
      }
   }
   if(o.link.link){
      o.link.removeAttribute('link');
   }
}
function THtmlEvent_dump(){
   var o = this;
   var ess = o.events;
   var r = new TString();
   for(var en in ess){
      var es = ess[en];
      var ec = es.length;
      r.append('event=' + en + ' (count=' + ec + ')\n');
      for(var n = 0; n < ec; n++){
         var e = es[n];
         r.append('   ' + n + ' source=' + RClass.dump(e.source) + ', event=' + RClass.dump(e) + '\n');
      }
   }
   return r.toString();
}
function FEdit(o){
   o = RClass.inherits(this, o, FEditControl, MPropertyEdit);
   o._styleEdit       = RClass.register(o, new AStyle('_styleEdit', 'Edit'));
   o.onBuildEditorValue   = FEdit_onBuildEditorValue;
   return o;
}
function FEdit_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FEdit_onBuildEditorValue(e){
   var o = this;
   var he = o._hValue = RBuilder.appendEdit(o._hValuePanel, o.style('Edit'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FEdit_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FEdit_set(v){
   var o = this;
   o.__base.FEditControl.set.call(o, v);
   o.finded = v;
   if(o.hChangeIcon){
      o.hChangeIcon.style.display = 'none';
   }
}
function FEdit_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FEdit_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FEdit_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FEditConsole).focus(o, FEditEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FEdit_drop(){
   var o = this;
   var de = o.findEditor();
   if(de){
      var t = o.reget();
      if(t.length > 0){
         if(o.finded != t){
            if(de.source != o){
               de.linkControl(o);
            }
            de.search(t);
         }
         o.finded = t;
      }
   }
}
function FEdit_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FEdit_link(){
   var o = this;
}
function FEditControl(o){
   o = RClass.inherits(this, o, FControl);
   o._labelModeCd          = RClass.register(o, new APtyString('_labelModeCd', null, ELabelMode.All));
   o._labelPositionCd      = RClass.register(o, new APtyString('_labelPositionCd', null, ELabelPosition.Left));
   o._labelSize            = RClass.register(o, new APtySize2('_labelSize'));
   o._labelAlignCd         = RClass.register(o, new APtyString('_labelAlignCd', null, EAlign.Left));
   o._editSize             = RClass.register(o, new APtySize2('_editSize'));
   o._styleLabelContainer  = RClass.register(o, new AStyle('_styleLabelContainer', 'LabelContainer'));
   o._styleEditorContainer = RClass.register(o, new AStyle('_styleEditorContainer', 'EditorContainer'));
   o._hLabelPanel        = null;
   o,_hLabelContainer    = null;
   o,_hIconPanel         = null;
   o,_hIcon              = null;
   o,_hTextPanel         = null;
   o,_hText              = null;
   o._hEditorPanel         = null;
   o._hEditorContainer     = null;
   o.onBuildLabelIcon  = FEditControl_onBuildLabelIcon;
   o.onBuildLabelText  = FEditControl_onBuildLabelText;
   o.onBuildLabel      = FEditControl_onBuildLabel;
   o.onBuildEditorValue = FEditControl_onBuildEditorValue;
   o.onBuildEditorDrop  = FEditControl_onBuildEditorDrop;
   o.onBuildEditor      = FEditControl_onBuildEditor;
   o.onBuildContainer   = FEditControl_onBuildContainer;
   o.oeBuild           = FEditControl_oeBuild;
   o.construct         = FEditControl_construct;
   o.panel             = FEditControl_panel;
   o.label             = FEditControl_label;
   o.setLabel          = FEditControl_setLabel;
   o.dispose           = FEditControl_dispose;
   return o;
}
function FEditControl_onChangeEnter(e){
   var o = this;
   var t = null;
   if(RString.isEmpty(o.dataValue)){
      t = RContext.get('FEditControl:change.empty');
   }else{
      t = RContext.get('FEditControl:change.restore', o.dataValue);
   }
   o.hChangeIcon.title = t;
}
function FEditControl_onChangeClick(e){
   this.set(this.dataValue);
}
function FEditControl_onScalar(g){
   var o = this;
   o.set(g.result);
}
function FEditControl_scalar(a){
   var o = this;
   var g = new TDatasetScalarArg(o, null, a);
   g.callback = new TInvoke(o, o.onScalar);
   RConsole.find(FDatasetConsole).scalar(g);
}
function FEditControl_onDataDoubleClick(){
   var o = this;
   if(RClass.isClass(o, MDropable)){
      o.onDropDoubleClick();
   }
   if(RClass.isClass(o, MListView)){
      o.onListClick();
   }
}
function FEditControl_onDataKeyDown(s, e){
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = o.isDataChanged() ? 'block' : 'none';
   }
   if(RClass.isClass(o, MDropable) && EKey.Down==e.keyCode){
      o.drop();
   }else if(e.ctrlKey && (EKey.Enter==e.keyCode) && o.editSearch){
      var dc = o.dsControl;
      if(dc){
         if(!o.isValid){
            var sn = new TNode('Search');
            var n = sn.create('Item');
            n.set('name', o.name);
            n.set('data_name', o.dataName);
            n.set('data_value', o.dataValue);
            n.set('search_type', ESearch.Equals);
            n.set('search_order', EOrder.None);
            RConsole.find(FDatasetConsole).fetch(dc, sn);
         }
      }
   }
}
function FEditControl_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
   o._disbaled = true;
   o.hEdit.disbaled = true;
}
function FEditControl_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
   o._disbaled = false;
   o.hEdit.disbaled = false;
}
function FEditControl_onBuildChange(hc){
   var o = this;
   hc.vAlign = 'top';
   hc.width = 5;
   var hi = o.hChangeIcon = RBuilder.appendIcon(hc, 'ctl.chgflag');
   hi._pname = 'hChangeIcon';
   hi.style.display = 'none';
   hi.style.cursor = 'hand';
   o.attachEvent('onChangeEnter', hi, o.onChangeEnter);
   o.attachEvent('onChangeClick', hi, o.onChangeClick);
}
function FEditControl_onBuildLabelIcon(e){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o._labelIcon);
   }
}
function FEditControl_onBuildLabelText(e){
   var o = this;
   o._hText = RBuilder.appendSpan(o._hTextPanel);
}
function FEditControl_onBuildLabel(e){
   var o = this;
   var h = o._hLabelContainer = RBuilder.createTable(e.hDocument, o.style('LabelContainer'));
   var hr = RBuilder.appendTableRow(h);
   var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
   hip.width = 20;
   o.onBuildLabelIcon(e);
   var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
   htp.noWrap = true;
   o.onBuildLabelText(e);
   var ls = o._labelSize;
   if(ls.width){
      h.style.width = ls.width;
   }
   if(ls.height){
      h.style.height = ls.height;
   }
   if(o._labelAlignCd){
      htp.align = o._labelAlignCd;
   }
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}
function FEditControl_onBuildEditorValue(e){
}
function FEditControl_onBuildEditorDrop(e){
}
function FEditControl_onBuildEditor(e){
   var o = this;
   var h = o._hEditorContainer = RBuilder.createTable(e.hDocument, o.style('EditorContainer'));
   var hr = RBuilder.appendTableRow(h);
   var hvp = o._hValuePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditorValue(e);
   if(RClass.isClass(o, MDropable)){
      var hdp = o._hDropPanel = RBuilder.appendTableCell(hr);
      o.onBuildEditorDrop(e);
   }
}
function FEditControl_onBuildContainer(e){
   var o = this;
   o._hContainer = RBuilder.createTable(e.hDocument, o.style('Container'));
}
function FEditControl_oeBuild(e){
   var o = this;
   o.__base.FControl.oeBuild.call(o, e);
   var hc = o._hContainer;
   var hlp = null;
   var hep = null;
   var lmc = o._labelModeCd;
   if(lmc == ELabelMode.Label){
      hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else if(lmc == ELabelMode.Hidden){
      hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else{
      var lpc = o._labelPositionCd;
      if(lpc == ELabelPosition.Top){
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else if(lpc == ELabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == ELabelPosition.Bottom){
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else{
         var hr = RBuilder.appendTableRow(hc);
         hlp = RBuilder.appendTableCell(hr);
         hep = RBuilder.appendTableCell(hr);
      }
   }
   o._hLabelPanel = hlp;
   o._hEditPanel = hep;
   if(hlp){
      o.onBuildLabel(e);
      hlp.appendChild(o._hLabelContainer);
      o.setLabel(o._label);
   }
   if(hep){
      o.onBuildEditor(e);
      hep.appendChild(o._hEditorContainer);
   }
   return EEventStatus.Stop;
}
function FEditControl_oeDesign(e){
   var o = this;
   o.__base.MDesign.oeDesign.call(o, e);
   var hlf = o.hLabelForm;
   var hef = o.hEditForm;
   switch(e.mode){
      case EDesign.Move:
         if(e.flag){
            o.hForm.border = 1;
            if(hlf){
               hlf.cellPadding = 1;
            }
            if(hef){
            }
            if(o.hEdit){
               o.hEdit.disabled = true;
            }
         }else{
            o.hForm.border = 0;
            if(hlf){
               hlf.border = 0;
               hlf.cellPadding = 0;
            }
            if(hef){
            }
            if(o.hEdit){
               o.hEdit.disabled = false;
            }
         }
         break;
      case EDesign.Border:
         if(e.flag){
            o.hForm.border = 1;
            if(hef){
               hef.border = 1;
            }
         }else{
            o.hForm.border = 0;
            if(hef){
               hef.border = 0;
            }
         }
         break;
   }
   return EEventStatus.Stop;
}
function FEditControl_oeMode(e){
   var o = this;
   o.__base.FControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   o._validable = o.canValid(e.mode);
   if(!o._progress){
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FEditControl_oeProgress(e){
   var o = this;
   if(o._progress && e.enable){
      return EEventStatus.Stop;
   }
   o._progress = e.enable;
   if(e.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FEditControl_oeLoadValue(e){
   var o = this;
   var r = o.__base.MEditValue.oeLoadValue.call(o, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = 'none';
   }
   return r;
}
function FEditControl_doFocus(e){
   var o = this;
   o.__base.MFocus.doFocus.call(o, e);
   o.__base.MEditValue.doFocus.call(o, e);
}
function FEditControl_doBlur(e){
   var o = this;
   o.__base.MFocus.doBlur.call(o, e);
   o.__base.MEditValue.doBlur.call(o, e);
}
function FEditControl_construct(){
   var o = this;
   o.__base.FControl.construct.call(o);
   o._labelSize = new SSize2(100, 20);
   o._editSize = new SSize2(200, 20);
}
function FEditControl_testFocus(){
   return this._visible && this._editable && !this._disbaled;
}
function FEditControl_getEditRange(){
   var o = this;
   var hc = o.hEditCell;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FEditControl_text(){
   return this.hEdit ? this.hEdit.value : '';
}
function FEditControl_setText(t){
   this.hEdit.value = t;
}
function FEditControl_panel(t){
   var o = this;
   if(EPanel.Edit == t){
      return o.hEdit;
   }else if(EPanel.Focus == t){
      return o.hEdit;
   }
   return o.__base.FControl.panel.call(o, t);
}
function FEditControl_label(p){
   return this._label;
}
function FEditControl_setLabel(p){
   var o = this;
   o._hText.innerHTML = RString.nvl(p);
   o._label = p;
}
function FEditControl_setEditable(v){
   var o = this;
   o.__base.MEditValue.setEditable.call(o, v);
   if(o.hEdit){
      o.hEdit.readOnly = !v;
   }
   var hl = o.hLabel;
   if(hl){
      if(o.validRequire){
         o.hLabel.style.color = v ? EColor.Require : EColor.Text;
      }
      if(RClass.isClass(o, MListView) && o.canListView()){
         hl.style.cursor = v ? 'hand' : 'normal';
         hl.className = v ? 'RLine_Underline' : '';
      }
   }
}
function FEditControl_setVisible(v){
   var o = this;
   o.__base.FControl.setVisible.call(o, v);
   o.refreshStyle();
}
function FEditControl_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
   if(o.hEdit){
      try{
         o.hEdit.focus();
      }catch(e){
      }
   }
}
function FEditControl_refreshStyle(){
   var o = this;
   if(!o._visible){
      return;
   }
   var tc = EColor.TextReadonly;
   var bc = EColor.Readonly;
   var cr = 'normal';
   if(o._editable){
      tc = EColor.TextEdit;
      bc = EColor.Edit;
      cr = 'hand';
      if(!RString.isEmpty(o.editTip) && o.hEdit.innerText == o.editTip){
         tc = '#CCCCCC';
      }
   }
   if(o._invalidText){
      if(!RString.isEmpty(o.text())){
         tc = EColor.TextInvalid;
         bc = EColor.Invalid;
      }
   }
   o._textColor = tc;
   o._backColor = bc;
   var he = o.hEdit;
   var hd = o.hDrop;
   if(he){
      he.style.color = tc;
      he.style.backgroundColor = bc;
   }
   if(hd){
	   if(he){
	      he.style.cursor = cr;
	   }
	   hd.style.cursor = cr;
	}
   if(o.editBorder){
      var bs = EBorderStyle.Readonly;
      if(o._editable){
         bs = EBorderStyle.Edit;
      }
      if(o._hover){
         bs = EBorderStyle.Hover;
      }
      o.setEditBorderStyle(bs, bc);
   }
}
function FEditControl_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   o._labelSize = null;
   o._editSize = null;
   o.hForm = null;
   o.hFormRow = null;
   o.hLabelForm = null;
   o.hChangeIcon = null;
   o.hIcon = null;
   o.hLabel = null;
   o.hControlForm = null;
   o.hControlRow = null;
   o.hControl = null;
   o.hEdit = null;
   o.hHintPanel = null;
   o.hHintIcon = null;
}
function FCell(o){
   o = RClass.inherits(this, o, FControl, MEditValue);
   o.stEdit       = RClass.register(o, new TStyle('Edit'));
   o.table        = null;
   o.column       = null;
   o.row          = null;
   o.hPanel       = null;
   o.hForm        = null;
   o.hFormLine    = null;
   o.hIconPanel   = null;
   o.hIcon        = null;
   o.hEditPanel   = null;
   o.hEdit        = null;
   o.hDropPanel   = null;
   o.hDrop        = null;
   o.buildIcon    = FCell_buildIcon;
   o.buildEdit    = FCell_buildEdit;
   o.buildDrop    = RMethod.empty;
   o.buildForm    = FCell_buildForm;
   o.build        = FCell_build;
   o.doFocus      = FCell_doFocus;
   o.doBlur       = FCell_doBlur;
   o.descriptor   = FCell_descriptor;
   o.text         = FCell_text;
   o.setText      = FCell_setText;
   o.focus        = FCell_focus;
   o.setVisible   = FCell_setVisible;
   o.setEditStyle = RMethod.empty;
   o.refreshStyle = FCell_refreshStyle;
   o.dispose      = FCell_dispose;
   o.dump         = FCell_dump;
   return o;
}
function FCell_buildIcon(){
   var o = this;
   o.hIcon = RBuilder.append(o.hIconPanel, 'IMG');
}
function FCell_buildEdit(){
   var o = this;
   var c = o.column;
   var he = o.hEdit = RBuilder.append(o.hEditPanel, 'INPUT', o.style('Edit'));
   he.style.width = '100%';
   c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
   c.linkEvent(o, 'onCellKeyDown', he, c.onCellKeyDown);
   c.linkEvent(o, 'onCellClick', he, c.onCellClick);
   c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
   if(o.table.isLov){
      o.hEdit.style.cursor = 'hand';
   }
   if(!RString.isEmpty(c.editAlign)){
      he.style.textAlign = c.editAlign;
   }
}
function FCell_buildForm(){
   var o = this;
   var c = o.column;
   if(c.hasIconArea || c.hasDropArea){
      var hf = o.hForm = RBuilder.appendTable(o.hPanel);
      hf.width = '100%';
      var hr = o.hFormLine = hf.insertRow();
      if(c.hasIconArea){
         o.hIconPanel = hr.insertCell();
         o.hIconPanel.width = 18;
         o.buildIcon();
      }
      o.hEditPanel = hr.insertCell();
      o.buildEdit();
      if(c.hasDropArea){
         o.hDropPanel = hr.insertCell();
         o.hDropPanel.width = 8;
         o.buildDrop();
      }
   }else{
      var hep = o.hEditPanel = o.hPanel;
      hep.align = c.editAlign;
      o.buildEdit();
   }
}
function FCell_build(){
   var o = this;
   var c = o.column;
   var h = o.hPanel = RBuilder.create(null, 'TD', o.style('Panel'));
   h.style.borderRight = '1px solid #F0F0F0';
   h.style.borderBottom = '1px dotted #CCCCCC';
   RHtml.link(h, 'control', o);
   c.linkEvent(o, 'onCellMouseEnter', h, c.onCellMouseEnter);
   c.linkEvent(o, 'onCellMouseLeave', h, c.onCellMouseLeave);
   if(c.editColor){
      h.style.color = c.editColor;
   }
   if(c.editBgcolor){
      h.style.backgroundColor = c.editBgcolor;
   }
   if(EEditFormat.Html != c.editFormat){
      o.buildForm();
   }
}
function FCell_doFocus(){
   var o = this;
   o.table.__focusCell = o;
   if(o.column.isEditAble(o)){
      var hs = o.hPanel.style;
      hs.borderLeft = '1px solid #666666';
      hs.borderTop = '1px solid #666666';
      hs.borderRight = '1px solid #CCCCCC';
      hs.borderBottom = '1px solid #CCCCCC';
      o.__focus = true;
      o.refreshStyle();
   }
}
function FCell_doBlur(){
   var o = this;
   if(o.column.isEditAble(o)){
      var hs = o.hPanel.style;
      hs.borderLeft = '0px solid #666666';
      hs.borderTop = '0px solid #666666';
      hs.borderRight = '1px solid #F0F0F0';
      hs.borderBottom = '1px dotted #CCCCCC';
      o.__focus = false;
      o.refreshStyle();
   }
}
function FCell_descriptor(){
   return this.column;
}
function FCell_text(){
   var o = this;
   var c = o.column;
   if(EEditFormat.Html == c.editFormat){
      return o.hPanel.innerHTML;
   }else if(c._absEdit && o.hEdit){
      return o.hEdit.value;
   }else if(o.hEditPanel){
      return o.hEditPanel.innerText;
   }
   return '';
}
function FCell_setText(t){
   var o = this;
   var c = o.column;
   if(EEditFormat.Html == c.editFormat){
      o.hPanel.innerHTML = t;
   }else if(c._absEdit && o.hEdit){
      o.hEdit.value = t;
   }else if(o.hEditPanel){
      o.hEditPanel.innerText = t;
   }
}
function FCell_focus(s){
   var o = this;
   var h = o.hEdit;
   if(h){
      o.column.table.selectRow(o.row, true, true);
      h.focus();
      if(s){
         h.select();
      }
   }
}
function FCell_setVisible(v){
   this.hPanel.style.display = v ? 'block' : 'none';
}
function FCell_refreshStyle(){
   var o = this;
   var t = o.table;
   var r = o.row;
   var s = r.isSelect;
   var he = o.hEdit;
   if(he){
      he.readOnly = true;
      he.style.color = EColor.TextReadonly;
      he.style.backgroundColor = bc;
   }
   var bc = null;
   if(s){
      bc = EColor.RowSelect;
   }else{
      var ih = (t.__hoverRow == r);
      if(ih){
         bc = EColor.RowHover;
      }else{
         bc = EColor.Rows[r.index % EColor.Rows.length];
      }
   }
   if(o.__focus){
      bc = EColor.RowEditHover;
   }
   o.hPanel.style.backgroundColor = bc;
}
function FCell_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
   o.hForm = null;
   o.hFormLine = null;
   o.hIconPanel = null;
   o.hIcon = null;
   o.hEditPanel = null;
   o.hEdit = null;
   o.hDropPanel = null;
   o.hDrop = null;
}
function FCell_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.value);
   s.append(']');
   return s;
}
function FColumn(o) {
   o = RClass.inherits(this, o, FControl, MEditDescriptor, MDisplay);
   o.dispList          = RClass.register(o, new TPtyBoolSet('dispList', 'dispConfig', EDisplayConfig.List));
   o.dispFixed         = RClass.register(o, new TPtyBoolSet('dispFixed', 'dispConfig', EDisplayConfig.Fixed));
   o.dispAuto          = RClass.register(o, new TPtyBoolSet('dispAuto', 'dispConfig', EDisplayConfig.Auto));
   o.dispSize          = RClass.register(o, new TPtyBoolSet('dispSize', 'dispConfig', EDisplayConfig.Size));
   o.dispDrag          = RClass.register(o, new TPtyBoolSet('dispDrag', 'dispConfig', EDisplayConfig.Drag));
   o.dataType          = RClass.register(o, new TPtyStr('dataType'));
   o.editColor         = RClass.register(o, new TPtyStr('editColor'));
   o.editBgcolor       = RClass.register(o, new TPtyStr('editBgcolor'));
   o.orderAble         = RClass.register(o, new TPtyBool('orderAble'));
   o.editAlign         = EAlign.Left;
   o.viewIcons         = RClass.register(o, new TPtyStr('viewIcons'));
   o.stHead            = RClass.register(o, new TStyle('Head'));
   o.stHeadLabel       = RClass.register(o, new TStyle('HeadLabel'));
   o.stSearchPanel     = RClass.register(o, new TStyle('SearchPanel'));
   o.stSearchEdit      = RClass.register(o, new TStyle('SearchEdit'));
   o.stIconSortUp      = RClass.register(o, new TStyleIcon('SortUp'));
   o.stIconSortDown    = RClass.register(o, new TStyleIcon('SortDown'));
   o.__cellClass       = FCell;
   o.hasIconArea       = false;
   o.hasDropArea       = false;
   o.table             = null;
   o.index             = null;
   o.iconMap           = null;
   o.sortType          = true;
   o.isDisplay         = true;
   o.searchHint        = "搜索...";
   o.hForm             = null;
   o.hFormLine         = null;
   o.hIconPanel        = null;
   o.hIcon             = null;
   o.hHeadPanel        = null;
   o.hLabel            = null;
   o.hSortPanel        = null;
   o.hSortUp           = null;
   o.hSortDown         = null;
   o.hSearchPanel      = null;
   o.hSearchForm       = null;
   o.hSearchFormLine   = null;
   o.hSearchIconPanel  = null;
   o.hSearchIcon       = null;
   o.hSearchEditPanel  = null;
   o.hSearchEdit       = null;
   o.hSearchDropPanel  = null;
   o.hSearchDrop       = null;
   o.hFixPanel         = null;
   o.onSearchEnter     = RClass.register(o, new HMouseEnter('onSearchEnter'));
   o.onSearchClick     = RClass.register(o, new HClick('onSearchClick'));
   o.onSearchLeave     = RClass.register(o, new HMouseLeave('onSearchLeave'));
   o.onSearchKeyDown   = RClass.register(o, new HKeyDown('onSearchKeyDown'));
   o.onCellMouseEnter  = RClass.register(o, new HMouseEnter('onCellMouseEnter'), FColumn_onCellMouseEnter);
   o.onCellMouseLeave  = RClass.register(o, new HMouseLeave('onCellMouseLeave'), FColumn_onCellMouseLeave);
   o.onCellMouseDown   = RClass.register(o, new HMouseDown('onCellMouseDown'), FColumn_onCellMouseDown);
   o.onCellClick       = RClass.register(o, new HClick('onCellClick'), FColumn_onCellClick);
   o.onCellDoubleClick = RClass.register(o, new HDoubleClick('onCellDoubleClick'), FColumn_onCellDoubleClick);
   o.onCellKeyDown     = RClass.register(o, new HKeyDown('onCellKeyDown'), FColumn_onCellKeyDown);
   o.onDataKeyDown     = FColumn_onDataKeyDown;
   o.onDataChanged     = FColumn_onDataChanged;
   o.onEditBegin       = FColumn_onEditBegin;
   o.onEditEnd         = FColumn_onEditEnd;
   o.onEditChanged     = FColumn_onEditChanged;
   o.onHeadMouseDown   = RClass.register(o, new HMouseDown('onHeadMouseDown'), FColumn_onHeadMouseDown);
   o.onBuildLabel      = FColumn_onBuildLabel;
   o.onBuildSearchIcon = RMethod.empty;
   o.onBuildSearchEdit = FColumn_onBuildSearchEdit;
   o.onBuildSearchDrop = RMethod.empty;
   o.onBuildSearchForm = FColumn_onBuildSearchForm;
   o.onBuildSearch     = FColumn_onBuildSearch;
   o.onBuildTotal      = FColumn_onBuildTotal;
   o.onBuildPanel      = FColumn_onBuildPanel;
   o.oeBuild           = FColumn_oeBuild;
   o.oeMode            = FColumn_oeMode;
   o.oeRefresh         = FColumn_oeRefresh;
   o.createCell        = FColumn_createCell;
   o.createMoveable    = FColumn_createMoveable;
   o.searchValue       = FColumn_searchValue;
   o.setStyleStatus    = FColumn_setStyleStatus;
   o.cell              = FColumn_cell;
   o.equalsValue       = FColumn_equalsValue;
   o.setWidth          = FColumn_setWidth;
   o.setVisible        = FColumn_setVisible;
   o.moveCellFocus     = FColumn_moveCellFocus;
   o.getEditRange      = FColumn_getEditRange;
   o.dispose           = FColumn_dispose;
   o.dump              = FColumn_dump;
   return o;
}
function FColumn_onCellMouseEnter(s, e){
   this.table.hoverRow(s.row, true);
}
function FColumn_onCellMouseLeave(s, e){
   this.table.hoverRow(s.row, false);
}
function FColumn_onCellMouseDown(s, e){
   var o = this;
   var t = s.table;
   var r = s.row;
   t.__focusCell = s;
   t.selectRow(r, !e.ctrlKey, true);
   var fc = RConsole.find(FFocusConsole);
   var c = fc.focusControl;
   if(RClass.isClass(c, FDropEditor)){
      if(c.source == s){
         return;
      }
   }
   RConsole.find(FFocusConsole).focus(s);
}
function FColumn_onCellClick(s, e){
   this.table.clickRow(s.row);
}
function FColumn_onCellDoubleClick(s, e){
   var o = this;
   var r = s.row;
   if(!o.isEditAble(r)){
      o.table.doubleClickRow(r);
   }
}
function FColumn_onCellKeyDown(s, e, he){
   var o = this;
   if(he){
      o.table.onCellKeyDown(s, e, he);
   }
}
function FColumn_oeBuild(e) {
   var o = this;
   var t = o.table;
   o._absEdit = o.editInsert || o.editUpdate || o.editDelete;
   if(!o._absEdit){
	   if(!RString.isEmpty(o.lovRefer)){
		   o.hasDropArea = true;
	   }else{
         o.hasDropArea = false;
	   }
   }
   if (!RString.isEmpty(o.viewIcons)) {
      var im = o.iconMap = new TAttributes();
      im.split(o.viewIcons.replace(/\n/g, ';'), '=', ';');
      o.hasIconArea = im.count > 0;
   }
   o.base.FControl.oeBuild.call(o, e);
   var hp = o.hPanel;
   hp.style.backgroundImage = 'url(' + RResource.iconPath('ctl.FColumn_Head') + ')';
   hp.style.padding = 4;
   var hf = o.hForm = RBuilder.appendTable(hp);
   if (!o.orderAble) {
     hf.style.cursor = 'hand';
     o.attachEvent('onHeadMouseDown', hf);
   }
   var hr = o.hFormLine = o.hForm.insertRow();
   o.onBuildLabel();
   o.onBuildSearch();
   o.onBuildTotal();
   var h = o.hFixPanel = RBuilder.create(null, 'TD');
   h.height = 1;
   h.bgColor = '#FFFFFF'
   if(!o.width){
      o.width = 60;
   }
   o.hPanel.style.pixelWidth = o.width;
   o.hFixPanel.style.pixelWidth = o.width;
   return EEventStatus.Stop;
}
function FColumn_oeMode(e){
   var o = this;
   if(e.isAfter()){
      var d = false;
      if(EAction.Design == e.mode){
         d = o.dispDesign;
      }else{
         d = o.dispList;
      }
      o.inModeDisplay = d;
      o.setVisible(d);
   }
   return EEventStatus.Continue;
}
function FColumn_oeRefresh(e) {
   var o = this;
   if(e.isBefore()){
      o.setVisible(o.dispList);
   }
}
function FColumn_onBuildLabel(){
   var o = this;
   var hr = o.hFormLine;
   if (o.icon) {
      var hip = o.hIconPanel = hr.insertCell();
      o.hIcon = RBuilder.appendIcon(hip, o.icon);
   }
   if (o.label) {
      var hl = o.hLabel = hr.insertCell();
      hl.noWrap = true;
      hl.style.fontSize = '12';
      hl.style.fontWeight = 'bolder';
      hl.style.color = o.editUpdate ? EColor.TextEdit : EColor.TextReadonly;
      if(o.editUpdate && o.validRequire){
         hl.style.color = EColor.Require;
      }
      hl.align = o.labelAlign;
      hl.innerText = o.label;
   }
   var hsp = o.hSortPanel = hr.insertCell();
   var hsu = o.hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FColumn));
   hsu.style.display = 'none';
   var hsu = o.hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FColumn));
   hsu.style.display = 'none';
}
function FColumn_onBuildSearchEdit(){
   var o = this;
   var hc = o.hSearchEditPanel = o.hSearchFormLine.insertCell();
   var he = o.hSearchEdit = RBuilder.append(hc, 'INPUT', o.style('SearchEdit'));
   o.table.linkEvent(o, 'onColumnSearchKeyDown', he);
   o.attachEvent('onSearchClick', he);
   he.style.backgroundColor = "#FFFFFF";
   hc.style.backgroundColor = "#FFFFFF";
   if(!RString.isEmpty(o.editAlign)){
      he.style.textAlign = o.editAlign;
   }
}
function FColumn_onBuildSearchForm(){
   var o = this;
   var hf = o.hSearchForm = RBuilder.appendTable(o.hSearchPanel);
   hf.width = '100%';
   hf.style.backgroundColor = '#FFFFFF';
   var hfl = o.hSearchFormLine = hf.insertRow();
   if(RClass.isClass(o, FColumnButton)){
	   o.hSearchPanel.style.backgroundColor='#EEEFF1';
	   o.hSearchPanel.style.borderLeft='1 solid #808080';
	   o.hSearchPanel.style.borderTop='1 solid #808080';
	   o.hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
	   return;
   }
   o.onBuildSearchIcon();
   o.onBuildSearchEdit();
   o.onBuildSearchDrop();
}
function FColumn_onBuildSearch(){
   var o = this;
   var h = o.hSearchPanel = RBuilder.create(null, 'TD', o.style('SearchPanel'));
   h.style.backgroundColor = "#FFFFFF";
   h.style.borderBottom = '1 solid #9EC4EB';
   RHtml.link(h, 'control', o);
  o.attachEvent('onSearchEnter', h);
  o.attachEvent('onSearchLeave', h);
  o.onBuildSearchForm();
}
function FColumn_onBuildTotal(){
   var o = this;
   var h = o.hTotalPanel = RBuilder.create(null, 'TD');
   RHtml.link(h, 'control', o);
   h.align = 'right';
   h.style.color = '#686860';
   h.style.backgroundColor = '#F8F8F0';
   h.style.borderBottom = '1 solid #B8B8B0';
   h.innerText = ' ';
}
function FColumn_onBuildPanel() {
   this.hPanel = RBuilder.create(null, 'TD');
}
function FColumn_onDataKeyDown(s, e) {
   var o = this;
   o.base.MEditDescriptor.onDataKeyDown.call(o, s, e);
}
function FColumn_onDataChanged(s, e) {
   var o = this;
   o.table.setDataStatus(s.row, EDataStatus.Update);
}
function FColumn_onEditBegin(editor) {
   var o = this;
   var row = editor.row;
   o.editor = editor;
   o.table.editRow = row;
   o.table.editColumn = o;
   o.table.select(row, true);
   RLogger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
}
function FColumn_onEditEnd(e) {
   var o = this;
   var row = editor.row;
   var text = editor.text();
   o.setValue(row, o.formatValue(text));
   o.setText(row, text);
   o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
   o.editor = null;
   RLogger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
}
function FColumn_onEditChanged(cell) {
   cell.row.refresh();
}
function FColumn_onHeadMouseDown(e) {
   var o = this;
   var tbl = o.table;
   var ct = tbl.dsViewer.count;
   var x = e.x;
   if(!RClass.isClass(o, FColumnButton)){
	   var l = o.hPanel.offsetWidth;
	   var r = l - 6;
	   if (x > 0 && x < r) {
	      if (ct > 0 && !RClass.isClass(e.source, FColumnStatus)) {
	         var cs = tbl.columns;
	         var len = cs.count;
	         for ( var n = 0; n < len; n++) {
	            var c = cs.value(n);
	            c.hSortUp.style.display = 'none';
	            c.hSortDown.style.display = 'none';
	         }
	         tbl.dsOrders.clear();
	         var oi = new TOrderItem();
	         var n = o.dataName;
	         if (o.sortType) {
	            oi.set(n, EOrder.Desc);
	            o.hSortUp.style.display = 'none';
	            o.hSortDown.style.display = 'block';
	         } else {
	            o.hSortUp.style.display = 'block';
	            o.hSortDown.style.display = 'none';
	            oi.set(n, EOrder.Asc);
	         }
	         o.sortType = !o.sortType;
	         tbl.dsOrders.push(oi);
	         tbl.dsSearch();
	      }
   }
   }
}
function FColumn_onRowClick(s, e){
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}
function FColumn_createCell() {
   var o = this;
   var c = RClass.create(o.__cellClass);
   c.name = o.name;
   c.table = o.table;
   c.column = o;
   c.build();
   c.setVisible(o.dispList);
   return c;
}
function FColumn_createMoveable(p) {
   var o = this;
   var r = o.cloneMove;
   if (!r) {
      r = RClass.create(o.constructor);
      r.buildMode = EColumnMode.Drag;
      r.assign(o, EAssign.Property);
      r.build();
      o.cloneMove = r;
   }
   var hc = o.panel(EPanel.Move);
   var hr = r.panel(EPanel.Move);
   RHtml.setPixelRect(hr, RHtml.rect(hc));
   hr.className = r.style('DesignMove');
   hr.style.pixelLeft = hc.offsetLeft;
   r.show();
   return r;
}
function FColumn_searchValue() {
   var o = this;
   if(o.hSearchEdit){
      return o.hSearchEdit.value;
   }
}
function FColumn_setStyleStatus(row, status) {
   var o = this;
   var h = o.cell(row);
   if (h) {
      var s = h.style;
      switch (status) {
      case EStyle.Normal:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Delete;
         } else {
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.Edit;
            } else {
               s.backgroundColor = EColor.Readonly;
            }
         }
         break;
      case EStyle.Select:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Select;
         } else {
            s.textDecoration = 'none';
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.RowEditSelect;
            } else {
               s.backgroundColor = EColor.Select;
            }
         }
         break;
      case EStyle.Delete:
         s.textDecoration = 'line-through';
         s.backgroundColor = EColor.Select;
         break;
      }
   }
}
function FColumn_cell(r){
   return r.cell(this.index);
}
function FColumn_equalsValue(s, t) {
   return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
function FColumn_setWidth(w){
   var o = this;
   o.hPanel.style.pixelWidth = w;
   o.hFixPanel.style.pixelWidth = w;
}
function FColumn_setVisible(v){
   var o = this;
   o.isDisplay = v;
   var s = v ? 'block' : 'none';
   o.hPanel.style.display = s;
   o.hSearchPanel.style.display = s;
   o.hTotalPanel.style.display = s;
   o.hFixPanel.style.display = s;
}
function FColumn_moveCellFocus(row, p) {
   var o = this;
   var t = o.table;
   var mt = null;
   var mr = null;
   var mc = null;
   if(EPosition.Top == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) - 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if(EPosition.Bottom == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) + 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if (EPosition.Before == p){
      var fi = o.index - 1;
      var ri = t.rows.indexOf(row);
      for(var n = ri; n >= 0; n--){
         var fr = t.rows.get(n);
         for( var i = fi; i >= 0; i--){
            var ft = t.columns.value(i);
            if(RClass.isClass(ft, FColumn) && ft.dispList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = t.columns.count - 1;
      }
   }else if(EPosition.After == p){
      var fi = o.index + 1;
      var ri = t.rows.indexOf(row);
      var cc = t.columns.count;
      var rc = t.rows.count;
      for(var n = ri; n < rc; n++){
         var fr = t.rows.get(n);
         for(var i = fi; i < cc; i++){
            var ft = t.columns.value(i);
            if(RClass.isClass(ft, FColumn) && ft.dispList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = 0;
      }
   }
   if(mt && mr && mc){
      mc.focus(true);
      RConsole.find(FFocusConsole).focus(mc);
   }
}
function FColumn_getEditRange(){
   var o = this;
   var hc = o.hSearchPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FColumn_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hSearchPanel);
   RMemory.freeHtml(o.hFixPanel);
   o.hForm = null;
   o.hFormLine = null;
   o.hIconPanel = null;
   o.hIcon = null;
   o.hHeadPanel = null;
   o.hLabel = null;
   o.hSortPanel = null;
   o.hSortUp = null;
   o.hSortDown = null;
   o.hSearchPanel = null;
   o.hSearchForm = null;
   o.hSearchFormLine = null;
   o.hSearchIconPanel = null;
   o.hSearchIcon = null;
   o.hSearchEditPanel = null;
   o.hSearchEdit = null;
   o.hSearchDropPanel = null;
   o.hSearchDrop = null;
   o.hFixPanel = null;
}
function FColumn_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append('name=', o.name);
   s.appendIf(o.icon, ',icon=', o.icon);
   s.appendIf(o.label, ',label=', o.label);
   s.appendIf(o.align, ',align=', o.align);
   s.appendIf(o.valign, ',valign=', o.valign);
   s.appendIf(o.dataName, ',dataName=', o.dataName);
   s.appendIf(o.dataDefault, ',dataDefault=', o.dataDefault);
   s.appendIf(o.index, ',index=', o.index);
   s.append(']');
   s.append(' [editAccess=');
   s.append(o.editInsert ? 'I' : '_');
   s.append(o.editUpdate ? 'U' : '_');
   s.append(']');
   return s;
}
function FTable(o) {
   o = RClass.inherits(this, o, FGridControl);
   o.onResizeAfter = FTable_onResizeAfter;
   o.onBuildData   = FTable_onBuildData;
   o.oeResize      = FTable_oeResize;
   o.oeRefresh     = FTable_oeRefresh;
   o.pushColumn    = FTable_pushColumn;
   return o;
}
function FTable_onResizeAfter(){
   var o = this;
   var hdp = o.hDataPanel;
   var hfp = o.hFixPanel;
   var sw = RHtml.scrollWidth(hdp);
   var sh = RHtml.scrollHeight(hdp);
   o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
   o.hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
}
function FTable_onBuildData(){
   var o = this;
   var hbp = o.hBorderPanel;
   var hfp = o.hFixPanel = RBuilder.appendDiv(hbp);
   hfp.style.zIndex = 2;
   hfp.style.position = 'absolute';
   var hff = o.hFixForm = RBuilder.appendTable(hfp, null, 1);
   var hffb = RBuilder.append(hff, 'TBODY');
   hff.style.tableLayout = 'fixed';
   hff.frame = 'rhs';
   hff.borderColorLight = '#D0D0D0';
   hff.borderColorDark = '#EEEEEE';
   o.hFixHead =  RBuilder.append(hffb, 'TR');
   o.hFixSearch = RBuilder.append(hffb, 'TR');
   o.hFixTotal = RBuilder.append(hffb, 'TR');
   o.hFixTotal.style.display = 'none';
   var hhp = o.hHeadPanel = RBuilder.appendDiv(hbp);
   hhp.style.zIndex = 1;
   hhp.style.position = 'absolute';
   hhp.style.overflowX = 'hidden';
   hhp.style.width = 1;
   var hhf = o.hHeadForm = RBuilder.appendTable(hhp, null, 1);
   hhf.frame = 'rhs';
   hhf.style.tableLayout = 'fixed';
   hhf.borderColorLight = '#D0D0D0';
   hhf.borderColorDark = '#EEEEEE';
   o.hHead = hhf.insertRow();
   o.hSearch = hhf.insertRow();
   o.hTotal = hhf.insertRow();
   o.hTotal.style.display = 'none';
   var hcp = o.hColumnPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   hcp.style.zIndex = 1;
   hcp.style.position = 'absolute';
   hcp.style.overflowY = 'hidden';
   var hcf = o.hColumnForm = RBuilder.appendTable(hcp, o.style('DataForm'), 0, 0, 1);
   o.hFixRows = RBuilder.append(hcf, 'TBODY');
   o.hFixRowLine = RBuilder.append(o.hFixRows, 'TR');
   var hdp = o.hDataPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   hdp.width = '100%';
   hdp.height = '100%';
   var hdf = o.hDataForm = RBuilder.appendTable(hdp, o.style('DataForm'), 0, 0, 1);
   o.hRows = RBuilder.append(hdf, 'TBODY');
   o.hRowLine = RBuilder.append(o.hRows, 'TR');
   o.attachEvent('onHeadMouseDown', o.hHeadForm, o.onHeadMouseDown);
   o.attachEvent('onHeadMouseMove', o.hHeadForm, o.onHeadMouseMove);
   o.attachEvent('onHeadMouseUp', o.hHeadForm, o.onHeadMouseUp);
   o.attachEvent('onDataScroll', o.hDataPanel, o.onDataScroll);
   o.panelNavigator = true;
}
function FTable_oeResize(e){
   var o = this;
   var h = o.hPanel;
   if(!h.offsetWidth || !h.offsetHeight){
      return;
   }
   var hp = o.border.hPanel;
   var hcf = o.hTitleForm;
   var hfp = o.hFixPanel;
   var hhp = o.hHeadPanel;
   var hcp = o.hColumnPanel;
   var hdp = o.hDataPanel;
   hhp.style.display = hcp.style.display = hdp.style.display = 'none';
   var ow = o.hBorderPanel.offsetWidth;
   var oh = o.hBorderPanel.offsetHeight;
   hhp.style.display = hcp.style.display = hdp.style.display = 'block';
   hhp.style.pixelWidth = ow - hfp.offsetWidth;
   hcp.style.pixelHeight = oh - hfp.offsetHeight - 1 - hcf.offsetHeight;
   hdp.style.pixelWidth = ow;
   hdp.style.pixelHeight = oh - hcf.offsetHeight;
   var c = o.rows.count;
   for(var n=0; n<c; n++){
      o.rows.get(n).refreshSize();
   }
   if(o.dpScrollLeft){
      hdp.scrollLeft = o.dpScrollLeft;
      o.dpScrollLeft = null;
   }
   RConsole.find(FEventConsole).push(o.eventResizeAfter);
   return EEventStatus.Stop;
}
function FTable_oeRefresh(e){
   var o = this;
   o.base.FGridControl.oeRefresh.call(o, e);
   if(e.isAfter()){
      var hcf = o.hTitleForm;
      var hfp = o.hFixPanel;
      var hhp = o.hHeadPanel;
      var hcp = o.hColumnPanel;
      var hdp = o.hDataPanel;
      var hcfh = hcf.offsetHeight;
      var hfpw = hfp.offsetWidth;
      var hfph = hfp.offsetHeight;
      hcp.style.display = hdp.style.display = 'none';
      var ow = o.hBorderPanel.offsetWidth;
      var oh = o.hBorderPanel.offsetHeight;
      hcp.style.display = hdp.style.display = 'block';
      hfp.style.pixelTop = hcfh;
      hhp.style.pixelTop = hcfh;
      hhp.style.pixelLeft = hfpw;
      hhp.style.pixelWidth = ow - hfpw;
      hhp.style.pixelHeight = hfph;
      o.hHead.style.pixelHeight = o.hFixHead.offsetHeight;
      o.hSearch.style.pixelHeight = o.hFixSearch.offsetHeight;
      hcp.style.pixelTop = hcfh + hfph;
      hcp.style.pixelHeight = oh - hcfh - hfph;
      hdp.style.paddingLeft = hfpw;
      hdp.style.paddingTop = hfph;
      hdp.style.pixelWidth = ow;
      hdp.style.pixelHeight = oh - hcfh;
      var ca = null;
      var aw = ow;
      var cs = o.columns;
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c.isDisplay){
            if(c.dispAuto){
               if(ca){
                  return RMessage.fatal(o, null, 'Too many auto column! (name1={0},name2={1})', ca.name, c.name);
               }
               ca = c;
            }else{
               aw -= c.hPanel.offsetWidth;
            }
         }
      }
      if(ca){
         ca.setWidth(Math.max(aw - 1, ca.width ? ca.width : 120));
      }
   }
}
function FTable_pushColumn(c){
   var o = this;
   if(c.dispFixed){
      o.hFixHead.appendChild(c.hPanel);
      o.hFixSearch.appendChild(c.hSearchPanel);
      o.hFixTotal.appendChild(c.hTotalPanel);
      o.hFixRowLine.appendChild(c.hFixPanel);
   }else{
      o.hHead.appendChild(c.hPanel);
      o.hSearch.appendChild(c.hSearchPanel);
      o.hTotal.appendChild(c.hTotalPanel);
      o.hRowLine.appendChild(c.hFixPanel);
   }
   o.push(c);
}
function FTreeColumn(o){
   o = RClass.inherits(this, o, FControl);
   o._icon        = RClass.register(o, new APtyString('_icon'));
   o._dataName    = RClass.register(o, new APtyString('_dataName'));
   o._display     = RClass.register(o, new APtyBoolean('_display'), EBoolean.False);
   o._config      = RClass.register(o, new APtyConfig('_config'));
   o.oeBuild      = FTreeColumn_oeBuild;
   o.onBuildPanel = FTreeColumn_onBuildPanel;
   return o;
}
function FTreeColumn_oeBuild(event){
   var o = this;
   var r = o.base.FControl.oeBuild.call(o, event);
   var h = o.hPanel;
   h.innerText = RString.nvl(o.label);
   h.noWrap = true;
   if(!o.display){
      h.style.display = 'block';
   }
   if(o.width){
      h.width = o.width;
   }
   return EEventStatus.Stop;
}
function FTreeColumn_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
function FTreeLevel(o){
   o = RClass.inherits(this, o, FControl);
   o._id        = RClass.register(o, new APtyString('_id'));
   o._color     = RClass.register(o, new APtyString('_color'));
   o._backColor = RClass.register(o, new APtyString('_backColor'));
   return o;
}
function FTreeNode(o){
   o = RClass.inherits(this, o, FContainer);
   o._type             = RClass.register(o, new APtyString('type'));
   o._uuid             = RClass.register(o, new APtyString('uuid'));
   o._isValid          = RClass.register(o, new APtyBoolean('isValid'), true);
   o._icon             = RClass.register(o, new APtyString('icon'));
   o._tag              = RClass.register(o, new APtyString('tag'));
   o._note             = RClass.register(o, new APtyString('note'));
   o._child            = RClass.register(o, new APtyBoolean('child'));
   o._checked          = RClass.register(o, new APtyBoolean('checked'), false);
   o._extended         = RClass.register(o, new APtyBoolean('extended'), false);
   o.stHover          = RClass.register(o, new AStyle('Hover'));
   o.stSelect         = RClass.register(o, new AStyle('Select'));
   o.stNodePanel      = RClass.register(o, new AStyle('NodePanel'));
   o.stNodeHover      = RClass.register(o, new AStyle('NodeHover'));
   o.stNodeSelect     = RClass.register(o, new AStyle('NodeSelect'));
   o.stImage          = RClass.register(o, new AStyle('Image'));
   o.stIcon           = RClass.register(o, new AStyle('Icon'));
   o.stIconDisable    = RClass.register(o, new AStyle('IconDisable'));
   o.stCell           = RClass.register(o, new AStyle('Cell'));
   o.__linked         = false;
   o.__display        = true;
   o.__delete         = false;
   o._hover           = false;
   o._extended        = false;
   o._selected        = false;
   o.tree             = null;
   o.parentNode       = null;
   o.loaded           = false;
   o.level            = 0;
   o.attributes       = null;
   o.nodes            = null;
   o.hNodePanel       = null;
   o.hImage           = null;
   o.hIcon            = null;
   o.hLabel           = null;
   o.onNodeEnter      = RClass.register(o, new AEventMouseEnter('onNodeEnter'), FTreeNode_onNodeEnter);
   o.onNodeLeave      = RClass.register(o, new AEventMouseLeave('onNodeLeave'), FTreeNode_onNodeLeave);
   o.onNodeClick      = RClass.register(o, new AEventClick('onNodeClick'), FTreeNode_onNodeClick);
   o.onBuildPanel     = RBuilder.onBuildTrPanel;
   o.oeBuild          = FTreeNode_oeBuild;
   o.construct        = FTreeNode_construct;
   o.hasChild         = FTreeNode_hasChild;
   o.topNode          = FTreeNode_topNode;
   o.topNodeByType    = FTreeNode_topNodeByType;
   o.get              = FTreeNode_get;
   o.set              = FTreeNode_set;
   o.check            = FTreeNode_check;
   o.setCheck         = FTreeNode_setCheck;
   o.createChild      = FTreeNode_createChild;
   o.loadConfig       = FTreeNode_loadConfig;
   o.saveConfig       = FTreeNode_saveConfig;
   o.loadNode         = FTreeNode_loadNode;
   o.show             = FTreeNode_show;
   o.hide             = FTreeNode_hide;
   o.extend           = FTreeNode_extend;
   o.select           = FTreeNode_select;
   o.setLevel         = FTreeNode_setLevel;
   o.push             = FTreeNode_push;
   o.refreshStyle     = FTreeNode_refreshStyle;
   o.reload           = FTreeNode_reload;
   o.reloadParent     = FTreeNode_reloadParent;
   o.loadQuery        = FTreeNode_loadQuery;
   o.remove           = FTreeNode_remove;
   o.removeChildren   = FTreeNode_removeChildren;
   o.click            = FTreeNode_click;
   o.isFolder         = FTreeNode_isFolder;
   o.dispose          = FTreeNode_dispose;
   o.innerDump        = FTreeNode_innerDump;
   o.extendAll        = FTreeNode_extendAll;
   o.findByName       = FTreeNode_findByName;
   o.findByUuid       = FTreeNode_findByUuid;
   o.checkChanged     = FTreeNode_checkChanged;
   o.pushChanged      = FTreeNode_pushChanged;
   o.getFullPath      = FTreeNode_getFullPath;
   return o;
}
function FTreeNode_onNodeEnter(e){
   var o = this;
   var t = o.tree;
   if(!t.focusNode || (t.focusNode && (t.focusNode != o))){
      if(!o.isFolder()){
         o._hover = true;
         o.refreshStyle();
      }
      t.lsnsEnter.process(t, o);
   }
}
function FTreeNode_onNodeLeave(e){
   var o = this;
   var t = o.tree;
   if(!t.focusNode || (t.focusNode && (t.focusNode != o))){
      o._hover = false;
      o.refreshStyle();
      t.lsnsLeave.process(t, o);
   }
}
function FTreeNode_onNodeClick(e){
   var o = this;
   var t = o.tree;
   var esn = e.hSender._tagName;
   if('INPUT' == esn){
      return;
   }
   var isImg = false;
   if('IMG' == esn){
      isImg = ('image' == e.hSender._linkType);
   }
   var isParent = false;
   var find = t.focusNode;
   while(find){
      if(find == o){
         isParent = true;
         break;
      }
      find = find.parent;
   }
   if(!isImg || (isImg && (isParent || !o._child))){
      t.selectNode(o, true);
   }
   if(!o.loaded && o._child){
      o.extend(true);
      if(!isImg){
         t.lsnsClick.process(t, o);
      }
   }else{
      if(o._child){
        if(o.isFolder()){
           o.extend(!o._extended);
        }else{
            if(isImg){
               o.extend(!o._extended);
            }else{
               o.extend(true);
            }
        }
      }
      if((isImg && isParent) || (isImg && !o._child) || !isImg){
         t.lsnsClick.process(t, o);
      }
   }
}
function FTreeNode_oeBuild(e){
   var o = this;
   var t = o.tree;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hp = o.hPanel;
      hp.style.border = '1 solid red';
      o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
      o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
      o.attachEvent('onNodeClick', hp);
      var hnp = o.hNodePanel = RBuilder.appendCell(hp, o.style('NodePanel'));
      hnp.noWrap = true;
      var ni = o._child ? t._iconPlus : t._iconNode;
      var hi = o.hImage = RBuilder.appendIcon(hnp, ni, o.style('Image'), 16, 16);
      hi._linkType = 'image';
      var ni = RString.nvl(o._icon, o._type ? o._type._icon : null);
      if(ni){
         var hi = o.hIcon = RBuilder.appendIcon(hnp, ni, o._isValid ? o.style('Icon') : o.style('IconDisable'), 16, 16);
      }else{
        var hi = o.hIcon = RBuilder.appendIcon(hnp, t._iconEmpty, o._isValid ? o.style('Icon') : o.style('IconDisable'), 1, 1);
      }
      hi._linkType = 'icon';
      if(t.dispChecked){
         var hc = o.hCheck = RBuilder.appendCheck(hnp);
         hc.width = 13;
         hc.height = 13;
         hc.style.borderWidth = 0;
         o.setCheck(o._checked);
         t.linkEvent(o, 'onNodeCheckClick', hc);
      }
      var text = '&nbsp;' + o.label;
      if(o._tag){
         text += '&nbsp;<FONT color=blue>(' + o._tag + ')</FONT>';
      }
      if(o._note){
         text += '&nbsp;<FONT color=green>[ ' + o._note + ' ]</FONT>';
      }
      var hl = o.hLabel = RBuilder.appendText(hnp, text);
      hl.style.font = 'icon';
      var cs = t.columns;
      if(cs){
         for(var n=1; n<cs.count; n++){
            var c = cs.value(n);
            var hc = RBuilder.appendCell(hp, o.style('Cell'));
            hc.align='center';
            hc.noWrap = true;
            hc.innerText = RString.nvl(o.get(c.dataName));
            hc.style.display = c.display ? 'block' : 'none';
         }
      }
   }
   return r;
}
function FTreeNode_construct(){
   var o = this;
   o.base.FContainer.construct.call(o);
   o.attributes = new TAttributes();
}
function FTreeNode_hasChild(){
   var o = this;
   if(o._child){
      return o.nodes && o.nodes.count > 0;
   }
}
function FTreeNode_topNode(){
   var f = this;
   while(f.parentNode){
      f = f.parentNode;
   }
   return f;
}
function FTreeNode_topNodeByType(t){
   var f = this;
   while(f){
      if(f._type._type == t){
         return f;
      }
      f = f.parentNode;
   }
}
function FTreeNode_get(n){
   return this.attributes.get(n);
}
function FTreeNode_set(n, v){
   this.attributes.set(n, v);
}
function FTreeNode_check(){
   return this.hCheck._checked;
}
function FTreeNode_setCheck(v){
   this.hCheck._checked = v;
   this._checked = v;
}
function FTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FTreeNode);
      r.tree = this.tree;
   }
   return r;
}
function FTreeNode_loadConfig(x){
   var o = this;
   o.base.FContainer.loadConfig.call(o, x);
   o._type = RObject.nvl(this.tree._types.get(x.get('type')), this.tree._type);
   o.attributes.append(x.attrs);
   var attrs = x.get('attributes')
   if(attrs){
      o.attributes.unpack(attrs);
   }
}
function FTreeNode_saveConfig(x){
   var o = this;
   o.base.FContainer.saveConfig.call(o, x);
   var t = o._type;
   x.set('type', t.name);
   x.set('type_type', t._type);
   x.set('attributes', o.attributes.pack());
}
function FTreeNode_loadNode(x){
   var o = this;
   var t = o.tree;
   o._type = null;
   o._uuid = null;
   o._isValid = true;
   o._icon = null;
   o._tag = null;
   o._note = null;
   o._child = false;
   o._checked = false;
   o._extended = true;
   o.loadConfig(x);
   o.__linked = false;
   o.__display = true;
   o.__delete = false;
   o._hover = false;
   o._extended = false;
   o._selected = false;
   o.loaded = false;
   o.level = 0;
   var ni = o._child ? t._iconPlus : t._iconNode;
   o.hImage.src = RResource._iconPath(ni);
   var ni = RString.nvl(o._icon, o._type ? o._type._icon : null);
   o.hIcon.className = o._isValid ? o.style('Icon') : o.style('IconDisable');
   if(ni){
     o.hIcon.style.width = 16;
     o.hIcon.style.height = 16;
      o.hIcon.src = RResource._iconPath(ni);
   }else{
      o.hIcon.style.width = 1;
      o.hIcon.style.height = 1
   }
   if(!RString.isEmpty(o.attributes.get('checked'))){
     o._checked = RBoolean.isTrue(o.attributes.get('checked'));
     if(o.hCheck){
         o.hCheck._checked = o._checked;
     }
   }
   var text = '&nbsp;' + o.label;
   if(o._tag){
      text += '&nbsp;<FONT color=blue>(' + o._tag + ')</FONT>';
   }
   if(o._note){
      text += '&nbsp;<FONT color=green>[ ' + o._note + ' ]</FONT>';
   }
   o.hLabel.innerHTML = text;
}
function FTreeNode_show(){
   var o = this;
   var t = o.tree;
   o.hPanel.style.display = 'block';
   var ns = o.nodes;
   if(ns && ns.count){
      var nc = ns.count;
      for(var i=0; i<nc; i++){
         var n = ns.get(i);
         if(!n.__linked){
            t.appendNode(n, o);
         }
         if(n.__display){
            n.hPanel.style.display = 'block';
            if(n._extended){
               n.show();
            }
         }
      }
   }
}
function FTreeNode_hide(){
   var o = this;
   var t = o.tree;
   if(o.hPanel){
      o.hPanel.style.display = 'none';
   }
   if(o.components){
      var count = o.components.count;
      for(var n=0; n<count; n++){
         var child = o.components.value(n);
         if(child){
            child.hide();
         }
      }
   }
}
function FTreeNode_extend(flag){
   var o = this;
   var t = o.tree;
   if(!o.loaded && o._child){
      if(t.__loading){
         return;
      }
      t.loadNode(o);
   }else{
      if(o.hImage && !o.hasChild()){
         o.hImage.src = RResource._iconPath(t._iconNode);
         return false;
      }
      o._extended = flag;
      if(o._child && o.hImage){
         o.hImage.src = RResource._iconPath(flag ? t._iconMinus : t._iconPlus);
      }
      if(flag){
         o.show();
      }else if(o.nodes){
         for(var n=o.nodes.count-1; n>=0; n--){
            o.nodes.get(n).hide();
         }
      }
   }
   t.resetTreeHeight()
}
function FTreeNode_select(v){
   var o = this;
   o._selected = v;
   if(v){
      o._hover = false;
   }
   o.refreshStyle();
}
function FTreeNode_setLevel(l){
   var o = this;
   var t = o.tree;
   o.level = l;
   o.hImage.style.marginLeft = t.indent * l;
}
function FTreeNode_push(c){
   var o = this;
   var t = o.tree;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FTreeNode)){
      o._child = true;
      o.loaded = true;
      var ns = o.nodes;
      if(!ns){
         ns = o.nodes = new TList();
      }
      c.tree = t;
      c.parentNode = o;
      ns.push(c);
      t.allNodes.pushUnique(c);
   }
}
function FTreeNode_refreshStyle(){
   var o = this;
   var cs = o.hPanel.cells;
   if(o._selected){
      for(var n=0; n<cs.length; n++){
         cs[n].className = o.style('NodeSelect');
      }
   }else{
      if(o._hover){
         for(var n=0; n<cs.length; n++){
            cs[n].className = o.style('NodeHover');
         }
      }else{
         for(var n=0; n<cs.length; n++){
            cs[n].className = o.style('NodePanel');
         }
      }
   }
}
function FTreeNode_reload(t){
   var o = this;
   if(t){
      o.tree.reload();
   }else{
      o.tree.reloadNode(o);
   }
}
function FTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o.tree.reloadNode(o.parentNode);
   }else{
      o.tree.reload();
   }
}
function FTreeNode_loadQuery(x){
   var o = this;
   var sl = RString.nvl(x.get('label'), o.label);
   var sn = RString.nvl(x.get('note'), o._note);
   var text = '&nbsp;' + sl;
   if(!RString.isEmpty(sn)){
      text += '&nbsp;<FONT color=green>[ ' + sn + ' ]</FONT>';
   }
   o.hLabel.innerHTML = text;
   if(x.contains('visible')){
      o.__display = RBool.isTrue(x.get('visible'));
      o.setVisible(o.__display);
   }
}
function FTreeNode_remove(){
   var o = this;
   if(o.__linked){
      if(o.nodes){
         o.removeChildren();
      }
      o.tree.freeNode(o);
   }
}
function FTreeNode_removeChildren(){
   var ns = this.nodes;
   if(ns){
      for(var i=ns.count-1; i>=0; i--){
         var n = ns.get(i);
         if(n){
            n.remove();
         }
      }
      ns.release();
   }
}
function FTreeNode_click(){
   var o = this;
   var t = o.tree;
   t.selectNode(o, true);
   t.lsnsClick.process(t, o);
}
function FTreeNode_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hNodePanel = null;
   o.hImage = null;
   o.hIcon = null;
   o.hCheck = null;
   o.hLabel = null;
}
function FTreeNode_innerDump(s){
   var o = this;
   s.append(RClass._typeOf(o));
   s.append('[level=',  o.level);
   if(o._type){
      s.append(' type=',  o._type.name);
   }
   s.append(', icon=',  o._icon);
   s.append(', caption=', o.label);
   s.append(', child=', o._child);
   s.append(']');
}
function FTreeNode_extendAll(){
   var o = this;
   o.extend(true);
   var cs = o.components;
   if(cs){
      var c = cs.count;
      for(var n=0; n<c; n++){
         cs.values[n].extendAll();
      }
   }
}
function FTreeNode_findByName(n){
   var o = this;
   if(o.name == n){
      return o;
   }
   var cs = o.components;
   if(cs){
      var cc = cs.count;
      for(var i=0; i<cc; i++){
         var c = cs.value(i);
         if(c){
            if(c.name == n){
               return c;
            }
            if(c.components){
               var f = c.findByName(n);
               if(f){
                  return f;
               }
            }
         }
      }
   }
   return null;
}
function FTreeNode_findByUuid(u){
   var o = this;
   if(o._uuid == u){
      return o;
   }
   var cs = o.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c){
            if(c._uuid == u){
               return c;
            }
            if(c.components){
               var f = c.findByUuid(u);
               if(f){
                  return f;
               }
            }
         }
      }
   }
   return null;
}
function FTreeNode_pushChanged(trd){
   var o = this;
    var d = new TNode();
    d.attrs = o.attributes;
    if(d.attrs){
         d.attrs.set('checked', RBoolean.toString(o.check()));
    }
    trd.push(d);
   if(o.components && o.components.count > 0){
      var cc = o.components.count;
      for(var n = 0; n < cc; n++){
         var c = o.components.value(n);
         if(RClass.isClass(c, FTreeNode)){
            c.pushChanged(trd);
         }
      }
   }
}
function FTreeNode_checkChanged(){
   var o = this;
   if(o._checked != o.check()){
      return true;
   }
   return false;
}
function FTreeNode_getFullPath(){
   var o = this;
   var path = '';
   if(o.label){
       path = o.label;
   }
    if(o.parent){
       var s = o.parent.getFullPath();
       if(!RString.isEmpty(s)){
           path = s + "/" + path;
       }
    }
    return path;
}
function FTreeNode_isFolder(){
   if(this._type){
       return (this._type._typeName == 'collections') ? true : false;
   }
}
function FTreeNodeType(o){
   o = RClass.inherits(this, o, FComponent);
   o._type       = RClass.register(o, new APtyString('type'));
   o._typeName   = RClass.register(o, new APtyString('typeName'));
   o._icon       = RClass.register(o, new APtyString('icon'));
   o._service    = RClass.register(o, new APtyString('service'));
   o._action     = RClass.register(o, new APtyString('action'));
   o._config     = RClass.register(o, new APtyConfig('config'));
   o.get        = FTreeNodeType_get;
   o.set        = FTreeNodeType_set;
   o.innerDump  = FTreeNodeType_innerDump;
   return o;
}
function FTreeNodeType_get(n){
   var o = this;
   return o._config ? o._config.get(n) : null;
}
function FTreeNodeType_set(n, v){
   var o = this;
   if(o._config){
      o._config.set(n, v)
   }
}
function FTreeNodeType_innerDump(s){
   var o = this;
   s.append(RClass._typeOf(o));
   s.append('[icon=',  o._icon);
   s.append(', service=', o._service);
   s.append(', action=', o._action);
   s.append(']');
}
function FTreeView(o){
   o = RClass.inherits(this, o, FContainer);
   o._optionCheck     = RClass.register(o, new APtyBoolean('_optionCheck'), false);
   o._service         = RClass.register(o, new APtyString('_service'));
   o._queryService    = RClass.register(o, new APtyString('_queryService'));
   o._indent          = RClass.register(o, new APtyInteger('_indent'), 16);
   o._styleNodePanel  = RClass.register(o, new AStyle('_styleNodePanel', 'NodePanel'));
   o._styleNodeForm   = RClass.register(o, new AStyle('_styleNodeForm', 'NodeForm'));
   o._iconPlus        = 'ctl.tv-plus';
   o._iconMinus       = 'ctl.tv-minus';
   o._iconNode        = 'ctl.tv-node';
   o._nodeTypes       = null;
   o._nodeColumns     = null;
   o._nodeLevels      = null;
   o._attributes      = null;
   o._nodes           = null;
   o._allNodes        = null;
   o._statusLoading   = false;
   o._loadingNode     = null;
   o._focusNode       = null;
   o._freeNodes       = null;
   o._dispNodeCount   = null;
   o.type             = null;
   o._hNodePanel      = null;
   o._hNodeForm       = null;
   o._hHeadLine       = null;
   o.lsnsEnter        = new TListeners();
   o.lsnsLeave        = new TListeners();
   o.lsnsLoad         = new TListeners();
   o.lsnsLoaded       = new TListeners();
   o.lsnsClick        = new TListeners();
   o.onNodeCheckClick = RClass.register(o, new AEventClick('onNodeCheckClick'), FTreeView_onNodeCheckClick);
   o.onLoaded         = FTreeView_onLoaded;
   o.onQueryLoaded    = FTreeView_onQueryLoaded;
   o.onBuildPanel     = RBuilder.onBuildTablePanel;
   o.oeBuild          = FTreeView_oeBuild;
   o.construct        = FTreeView_construct;
   o.loadUrl          = FTreeView_loadUrl;
   o.findByName       = FTreeView_findByName;
   o.findByUuid       = FTreeView_findByUuid;
   o.selectNode       = FTreeView_selectNode;
   o.extendAuto       = FTreeView_extendAuto;
   o.extendAll        = FTreeView_extendAll;
   o.createChild      = FTreeView_createChild;
   o.createNode       = FTreeView_createNode;
   o.appendNode       = FTreeView_appendNode;
   o.loadNode         = FTreeView_loadNode;
   o.freeNode         = FTreeView_freeNode;
   o.push             = FTreeView_push;
   o.reload           = FTreeView_reload;
   o.reloadNode       = FTreeView_reloadNode;
   o.doQuery          = FTreeView_doQuery;
   o.clear            = FTreeView_clear;
   o.dispose          = FTreeView_dispose;
   o.getTreeHeight    = FTreeView_getTreeHeight;
   o.resetTreeHeight  = FTreeView_resetTreeHeight;
   o.filterNode       = FTreeView_filterNode;
   o.removeNode       = FTreeView_removeNode;
   o.clearNodes       = FTreeView_clearNodes;
   o.haveNodes        = FTreeView_haveNodes;
   o.release          = FTreeView_release;
   o.getChangedChecks = FTreeView_getChangedChecks;
   o.fetchExtendsAll  = FTreeView_fetchExtendsAll;
   o.tempAppendNodes  = FTreeView_tempAppendNodes;
   o.removeNodes      = FTreeView_removeNodes;
   o.tempAppendChild  = FTreeView_tempAppendChild;
   return o;
}
function FTreeView_onNodeCheckClick(s, e){
   var o = this;
   if(s && RClass.isClass(s, FTreeNode)){
      var f = s.check();
      var cs = s.controls;
      if(cs){
         for(var n = 0; n < cs.count; n++){
            var nd = cs.value(n);
            if(nd && RClass.isClass(nd, FTreeNode)){
               nd.setCheck(f);
            }
         }
      }
      var p = s.parentNode;
      while(p){
         if(f){
            p.setCheck(f);
            p = p.parentNode;
         }else{
            var pcs = p.controls;
            var pcc = pcs.count;
            for(var n=0; n<pcc; n++){
              var pnd = pcs.value(n);
               if(pnd && RClass.isClass(pnd, FTreeNode)){
                  if(pnd.check()){
                     return;
                  }
               }
            }
            p.setCheck(false);
            p = p.parentNode;
         }
      }
   }
}
function FTreeView_onLoaded(e){
   var o = this;
   var xd = e.document;
   if(xd){
      var ne = e.node;
      o._loadingNode.hide();
      o._statusLoading = false;
      var xr = xd.root();
      var xns = xr._nodes;
      if(xns){
         var xnc = xns.count;
         for(var i=0; i<xnc; i++){
            var xn = xns.get(i);
            if(xn.isName('TreeNode')){
               var n = o.createNode();
               n.loadNode(xn);
               if(ne){
                  ne.push(n);
               }else{
                  o.push(n);
               }
               o.appendNode(n, ne);
            }
         }
      }
      o.lsnsLoaded.process(o, e.node);
      if(o.extendsAll){
          o.extendAll();
      }
   }
}
function FTreeView_onQueryLoaded(e){
   var o = this;
   var doc = e.document;
   if(doc){
      var tvn = doc.root().find('TreeView');
      if(tvn && tvn._nodes){
         var nc = tvn._nodes.count;
         for(var n=0; n<nc; n++){
            var nd = tvn._nodes.get(n);
            if(nd.isName('TreeNode')){
               var nm = nd.get('name');
               var fd = o.findByName(nm);
               if(fd){
                  fd.loadQuery(nd);
               }
            }
         }
      }
   }
}
function FTreeView_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hc = o.hPanel.insertRow().insertCell();
      var hnp = o._hNodePanel = RBuilder.appendDiv(hc, o.style('NodePanel'));
      var hnf = o._hNodeForm = RBuilder.appendTable(hnp, o.style('NodeForm'));
      o._hHeadLine = hnf.insertRow();
      o.hNodeRows = hnf.children[0];
      var ln = o._loadingNode = RClass.create(FTreeNode);
      ln.tree = o;
      ln.label = RContext.get('FTreeView:loading');
      ln.icon = 'ctl.tv-load';
      ln.psBuild();
      o.appendNode(ln);
      ln.hide();
   }else if(e.isAfter()){
      var ns = o._nodes;
      if(!ns.isEmpty()){
         var nc = ns.count;
         for(var i=0; i<nc; i++){
            o.appendNode(ns.get(i));
         }
      }
      o.extendAuto();
   }
   return r;
}
function FTreeView_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._nodes = new TObjects();
   o._allNodes = new TObjects();
   o._freeNodes = new TObjects();
   o._attributes = new TAttributes();
   o._nodeTypes = new TDictionary();
   o._nodeColumns = new TDictionary();
   o._nodeLevels = new TDictionary();
   o.type = RClass.create(FTreeNodeType);
}
function FTreeView_loadUrl(service, attrs){
   var o = this;
   var svc = RService.parse(RString.nvl(service, this._service));
   if(!svc){
      return alert('Unknown service');
   }
   attrs = RObject.nvl(attrs, o._attributes);
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', svc.action);
   RConsole.find(FEnvConsole).build(xr);
   if(!attrs.isEmpty()){
      if(RClass.isClass(attrs, TNode)){
         xr.push(attrs);
      }if(RClass.isClass(attrs, TAttributes)){
         xr.create('Tree').attrs = attrs;
         xr.create('Attributes').attrs = attrs;
      }else{
         xr.create('Tree').value = attrs;
         xr.create('Attributes').value = attrs;
      }
   }
   var ln = o._loadingNode;
   RHtml.tableMoveRow(o._hNodeForm, ln.hPanel.rowIndex, 0);
   ln.setLevel(0);
   ln.show();
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = svc.url;
   e.document = xd;
   RConsole.find(FXmlConsole).process(e);
}
function FTreeView_findByName(n){
   var o = this;
   var ns = o._allNodes;
   var nc = ns.count;
   if(nc){
      for(var i=0; i<nc; i++){
         var fn = ns.get(i);
         if(fn.name == n){
            return fn;
         }
      }
   }
}
function FTreeView_findByUuid(u){
   var o = this;
   var ns = o._allNodes;
   var nc = ns.count;
   if(nc){
      for(var i=0; i<nc; i++){
         var fn = ns.get(i);
         if(fn.uuid == u){
            return fn;
         }
      }
   }
}
function FTreeView_selectNode(n, s){
   var o = this;
   var fn = o._focusNode;
   if(s){
      if(n){
         if(fn){
            if(fn == n){
               return;
            }
            if(n.isFolder()){
               fn.select(true);
            }else{
               fn.select(false);
            }
         }
         if(!n.isFolder()){
            n.select(true);
            o._focusNode = n;
         }
      }
   }else{
      if(n){
         n.select(false);
      }
      if(fn){
         fn.select(false);
      }
   }
}
function FTreeView_extendAuto(n){
   var o = this;
   var ns = n ? n._nodes : o._nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i=0; i<nc; i++){
            var fn = ns.get(i);
            fn.extend(fn.extended);
            if(fn.extended){
               o.extendAuto(fn);
            }
         }
      }
   }
}
function FTreeView_extendAll(n){
   var o = this;
   var ns = n ? n._nodes : o._nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i=0; i<nc; i++){
            var fn = ns.get(i);
            fn.extend(true);
            o.extendAll(fn);
         }
      }
   }
}
function FTreeView_createChild(x){
   var o = this;
   var r = null;
   if(x.isName('Column') || x.isName('TreeColumn')){
      r = RClass.create(FTreeColumn);
   }else if(x.isName('Level') || x.isName('TreeLevel')){
      r = RClass.create(FTreeLevel);
   }else if(x.isName('Type') || x.isName('TreeNodeType')){
      r = RClass.create(FTreeNodeType);
   }else if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FTreeNode);
   }else{
      RMessage.fatal(o, null, 'Unknown child type (config={0})', x.xml());
   }
   r.tree = o;
   return r;
}
function FTreeView_createNode(){
   var o = this;
   var n = o._freeNodes.pop();
   if(!n){
      var n = RClass.create(FTreeNode);
      n.tree = o;
      n.psBuild();
   }
   n.hPanel.style.display = 'block';
   o._allNodes.pushUnique(n);
   return n;
}
function FTreeView_appendNode(n, p){
   var o = this;
   if(!n.__linked){
      if(p){
         var nr = p.hPanel.rowIndex;
         var ns = p._nodes;
         for(var i=ns.count-1; i>=0; i--){
            var pn = ns.get(i)
            if(pn.__linked){
               nr = pn.hPanel.rowIndex;
               break;
            }
         }
         if(n.hPanel.parentElement){
            if(n.hPanel.rowIndex > nr){
               nr++;
            }
            RHtml.tableMoveRow(o._hNodeForm, n.hPanel.rowIndex, nr);
         }else{
            o.hNodeRows.appendChild(n.hPanel);
            RHtml.tableMoveRow(o._hNodeForm, n.hPanel.rowIndex, nr+1);
         }
         n.setLevel(p.level + 1);
      }else{
         o.hNodeRows.appendChild(n.hPanel);
         n.setLevel(0);
      }
      n.__linked = true;
   }
}
function FTreeView_loadNode(node, refresh){
   var o = this;
   o._statusLoading = true;
   var type = null;
   var fn = node;
   while(fn){
      type = fn.type;
      if(type && type._service){
         break;
      }
      fn = fn.parentNode;
   }
   var svc = RService.parse(RString.nvl(type._service, o._service));
   if(!svc){
      return alert('Unknown service');
   }
   var fn = node;
   while(fn){
      type = fn.type;
      if(type && type.action){
         break;
      }
      fn = fn.parentNode;
   }
   var act = RString.nvl(type.action, svc.action);
   if(!act){
      return alert('Unknown action');
   }
   o.lsnsLoad.process(o, node);
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type.name);
   root.set('action', act);
   root.create('Tree', o._attributes);
   root.create('Attributes', o._attributes);
   var fn = node;
   var xnode = root;
   while(fn){
      var xnode = xnode.create('Node');
      fn.saveConfig(xnode);
      fn = fn.parentNode;
   }
   node._extended = true;
   if(node.child && node.hImage){
      node.hImage.src = RResource.iconPath(o._iconMinus);
   }
   var ln = o._loadingNode;
   var nr = node.hPanel.rowIndex;
   if(ln.hPanel.rowIndex > nr){
      nr++;
   }
   RHtml.tableMoveRow(o._hNodeForm, ln.hPanel.rowIndex, nr);
   ln.setLevel(node.level + 1);
   ln.show();
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.node = node;
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FTreeView_freeNode(n){
   var o = this;
   if(n.__linked){
      n.__linked = false;
      n.hPanel.style.display = 'none';
      o._allNodes.extract(n);
      o._freeNodes.push(n);
   }
}
function FTreeView_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   c.tree = o;
   if(RClass.isClass(c, FTreeColumn)){
      o._nodeColumns.set(c.name, c);
   }else if(RClass.isClass(c, FTreeLevel)){
      o._nodeLevels.set(c.id.toString(), c);
   }else if(RClass.isClass(c, FTreeNodeType)){
      o._nodeTypes.set(c.typeName, c);
   }else if(RClass.isClass(c, FTreeNode)){
      o._nodes.push(c);
      o._allNodes.pushUnique(c);
   }
}
function FTreeView_reload(){
   var o = this;
   o.clear();
   o.loadUrl();
}
function FTreeView_reloadNode(n){
   var o = this;
   n = RObject.nvl(n, o._focusNode);
   if(!n){
      return o.reload();
   }
   n.removeChildren();
   o.loadNode(n);
}
function FTreeView_doQuery(){
   var o = this;
   var svc = RService.parse(o._queryService);
   if(!svc){
      return alert('Unknown query service');
   }
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', svc.action);
   root.create('Attributes').attrs = o._attributes;
   var e = new TEvent(o, EXmlEvent.Send, o.onQueryLoaded);
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FTreeView_clear(){
   var o = this;
   var ns = o._nodes;
   for(var i=ns.count-1; i>=0; i--){
      ns.get(i).remove();
   }
   ns.release();
   o._allNodes.release();
}
function FTreeView_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o._hNodePanel = null;
   o._hNodeForm = null;
   o._hHeadLine = null;
}
function FTreeView_getTreeHeight(){
   var o = this;
   var ns = o._allNodes;
   var c = 0;
   for(var n = 0; n<ns.count; n++){
      var cn = ns.get(n);
      if(cn.hPanel.style.display == 'block'||cn.hPanel.style.display == ''){
         c++;
      }
   }
   return c * 29;
}
function FTreeView_resetTreeHeight(){
   var o = this;
   if(o.parentObj){
      var h = o.getTreeHeight();
      o.parentObj.style.height = h;
   }
}
function FTreeView_filterNode(sCaption, sAttr){
   var oNode = null;
   var nCount = this._allNodes.length;
   var sNodeCaption = null;
   var sNodeAttr = null;
   if(!sCaption){
      for(var n=0; n<nCount; n++){
         oNode = this._allNodes[n];
         if(!oNode.isDelete){
            oNode.show(true);
         }
      }
   }else{
      sCaption = sCaption.toLowerCase();
      var arAttr = null;
      var nAttrCount = 0;
      if(sAttr){
         sAttr = sAttr.toLowerCase();
         arAttr = sAttr.split("|");
         nAttrCount = arAttr.length;
      }
      for(var n=0; n<nCount; n++){
         oNode = this._allNodes[n];
         if(!oNode.isDelete){
            sNodeCaption = oNode.label.toLowerCase();
            if(arAttr){
               sNodeAttr = oNode.linkAttr.toLowerCase();
               for(var s=0; s<nAttrCount; s++){
                  if(sNodeAttr.indexOf(arAttr[s]) != -1){
                     oNode.show((sNodeCaption.indexOf(sCaption) != -1));
                     break;
                  }
               }
            }else{
               oNode.show((sNodeCaption.indexOf(sCaption) != -1));
            }
         }
      }
   }
   return true;
}
function FTreeView_removeNode(oNode){
   if(oNode){
      var nodes = new Array();
      var oLoopNode = null;
      var nCount = this._allNodes.length;
      for(var n=0; n<nCount; n++){
         oLoopNode = this._allNodes[n];
         if(oLoopNode != oNode){
            nodes[nodes.length] = oLoopNode;
         }
      }
      this._allNodes = nodes;
      var oParent = oNode.parent;
      if(oParent){
         nodes = new Array();
         nCount = oParent._nodes.length;
         for(var n=0; n<nCount; n++){
            oLoopNode = oParent._nodes[n];
            if(oLoopNode != oNode){
               nodes[nodes.length] = oLoopNode;
            }
         }
         oParent._nodes = nodes;
         oNode.parent.childrenHTML.removeChild(oNode.ownerHTML);
      }
      if(oParent._nodes.length == 0){
         oParent.imageHTML.src = this.imgEmpty;
      }
      return true;
   }
   return false;
}
function FTreeView_haveNodes(){
   return this.rootNode.hasChild();
}
function FTreeView_clearNodes(node){
   if(node){
      node.removeChildren();
   }
   return true;
   var nodes = new Array();
   var oLoopNode = null;
   var nCount = this._allNodes.length;
   for(var n=0; n<nCount; n++){
      oLoopNode = this._allNodes[n];
      if(oLoopNode.parent != oNode){
         nodes[nodes.length] = oLoopNode;
      }else{
      oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
      }
   }
   oNode.imageHTML.src = this.imgEmpty ;
   this._allNodes = nodes;
   return true;
}
function FTreeView_release(){
   var nodes = this._allNodes;
   for(var n=0; n<nodes.length; n++){
      var node = nodes[n];
      node.release();
   }
   this._allNodes = null;
   this._allNodesUuid = null;
   this._allNodesProperty = null;
   this._allNodesPropertyExtend = null;
   this._nodes = null;
   return true;
}
function FTreeView_fetchExtendsAll(s){
   var o = this;
   if(s && RClass.isClass(s, FTreeNode)){
      fmMain.target = 'frmMain';
      fmMain.form_search.value = '';
      fmMain.form_order.value = '';
      fmMain.form_values.value = '';
      var type = node.type.typeName;
      if('table' == type || 'form' == type){
         fmMain.form_name.value = node.get('form');
         fmMain.action = top.RContext.context('/ent/apl/logic/form/InnerForm.wa?do=update');
         fmMain.submit();
      }else if('frameTree' == type){
         fmMain.action = top.RContext.context(node.get('redirect'));
         fmMain.submit();
      }
   }else{
   }
}
function FTreeView_getChangedChecks(){
   var o = this;
   var treeView = new TNode('TreeView');
   treeView.set('name', o.name);
   var rnd = RObject.nvl(o.rootNode, o);
   var cs = rnd.controls;
   for(var n = 0; n < cs.count; n++){
      var c = cs.value(n);
      c.pushChanged(treeView);
   }
   return treeView;
}
function FTreeView_tempAppendNodes(parent, config){
   parent = RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config._nodes){
      var count = config._nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n=0; n<count; n++){
            var nc = config._nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = RClass.create(FTreeNode);
               tn.parent = parent;
               tn.tree = this;
               tn.loadConfig(nc);
               if(nc._nodes){
                  tn.icon = 'ctl.FBrowser_Folder';
               }else{
                  tn.icon = 'ctl.FBrowser_Txt';
               }
               tn.build(0);
               tn.hide();
               if(nc._nodes){
                  this.tempAppendNodes(tn, nc);
               }
               parent.push(tn);
               this._allNodes.push(tn);
            }
         }
      }
   }
   this.rootNode.extend(true);
}
function FTreeView_removeNodes(node){
   node = RObject.nvl(node, this.workNode, this.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}
function FTreeView_tempAppendChild(child){
   var o = this;
   var hc = o._hHeadLine.insertCell();
   hc.height = '100%';
   if(RClass.isClass(child, FTreeColumn)){
      hc.appendChild(child.hPanel);
   }
}
