﻿//==========================================================
// <T>控件的基类。</T>
// <P>支持控件的样式、建立、显示、设计、模式功能。</P>
//
//  hParent<TAG>
// ┌-------------------┐
// │ hContainer<DIV>   │
// │┌---------------┐│
// ││Control        ││
// │└---------------┘│
// └-------------------┘
//
// @class
// @author maocy
// @version 141231
//==========================================================
function FControl(o){
   o = RClass.inherits(this, o, FComponent, MStyle, MSize, MPadding);
   //..........................................................
   // @property Boolean 是否禁止
   o._disable       = RClass.register(o, new APtyBoolean('_disable', null, false));
   // @property Boolean 是否回行
   o._nowrap        = RClass.register(o, new APtyBoolean('_nowrap', null, false));
   // @property String 提示信息
   o._hint          = RClass.register(o, new APtyString('_hint'));
   //..........................................................
   // @style
   o._stylePanel    = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   // @style
   //o._styleDesign = RClass.register(o, new AStyle('Design'));
   // @style
   //o._styleDesignHover = RClass.register(o, new AStyle('DesignHover'));
   // @style
   //o._styleDesignDrag  = RClass.register(o, new AStyle('DesignDrag'));
   // @style
   //o._styleDesignMove  = RClass.register(o, new AStyle('DesignMove'));
   //..........................................................
   // @attribute
   o._layoutCd      = ELayout.Display;
   o._sizeCd        = ESize.Normal;
   o._controls      = null;
   // @attribute
   o._statusVisible = true;
   o._statusEnable  = true;
   o._statusBuild   = false;
   //o._events      = null;
   //o._storage     = null;
   //..........................................................
   // @html 父容器
   o._hParent       = null;
   // @html 面板容器
   o._hPanel        = null;
   //..........................................................
   // @event
   o.onEnter        = RClass.register(o, new AEventMouseEnter('onEnter'), FControl_onEnter);
   o.onLeave        = RClass.register(o, new AEventMouseLeave('onLeave'), FControl_onLeave);
   o.onMouseOver    = RClass.register(o, new AEventMouseOver('onMouseOver'));
   o.onMouseOut     = RClass.register(o, new AEventMouseOut('onMouseOut'));
   o.onMouseDown    = RClass.register(o, new AEventMouseDown('onMouseDown'));
   o.onMouseUp      = RClass.register(o, new AEventMouseUp('onMouseUp'));
   o.onClick        = RClass.register(o, new AEventClick('onClick'));
   o.onDoubleClick  = RClass.register(o, new AEventDoubleClick('onDoubleClick'));
   o.onResize       = RClass.register(o, new AEventResize('onResize'));
   // @event
   o.onBuildPanel   = FControl_onBuildPanel;
   o.onBuild        = FControl_onBuild;
   //..........................................................
   // @process
   o.oeMode         = FControl_oeMode;
   o.oeEnable       = FControl_oeEnable;
   o.oeVisible      = FControl_oeVisible;
   o.oeResize       = FControl_oeResize;
   o.oeRefresh      = FControl_oeRefresh;
   //..........................................................
   // @method
   o.construct      = FControl_construct;
   // @method
   o.topControl     = FControl_topControl;
   o.hasControl     = FControl_hasControl;
   o.controls       = FControl_controls;
   o.panel          = FControl_panel;
   // @method
   o.isVisible      = FControl_isVisible;
   o.setVisible     = FControl_setVisible;
   o.show           = FControl_show;
   o.hide           = FControl_hide;
   // @method
   o.isEnable       = FControl_isEnable;
   o.setEnable      = FControl_setEnable;
   o.enable         = FControl_enable;
   o.disable        = FControl_disable;
   // @method
   o.attachEvent    = FControl_attachEvent;
   o.linkEvent      = FControl_linkEvent;
   o.callEvent      = FControl_callEvent;
   // @method
   o.push           = FControl_push;
   // @method
   o.psBuild        = FControl_psBuild;
   o.psMode         = FControl_psMode;
   o.psDesign       = FControl_psDesign;
   o.psEnable       = FControl_psEnable;
   o.psVisible      = FControl_psVisible;
   o.psResize       = FControl_psResize;
   o.psRefresh      = FControl_psRefresh;
   // @method
   o.setPanel       = FControl_setPanel;
   o.build          = FControl_build;
   // @method
   o.dispose        = FControl_dispose;
   return o;
}

//==========================================================
// <T>当该控件获得热点时的处理</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FControl_onEnter(e){
   var o = this;
   //RConsole.find(FFocusConsole).enter(o);
   //if(o.hint){
      //window.status = o.hint;
   //}
}

//==========================================================
// <T>当该控件失去热点时的处理</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FControl_onLeave(e){
   var o = this;
   //RConsole.find(FFocusConsole).leave(o);
   //if(o.hint){
      //window.status = '';
   //}
}

//==========================================================
// <T>创建一个控件容器。</T>
// <P>默认为DIV页面元素。</P>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FControl_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createDiv(e.hDocument, o.styleName('Panel'));
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FControl_onBuild(p){
   var o = this;
   // 建立控件容器
   o.onBuildPanel(p);
   // 设置容器样式
   var h = o._hPanel;
   RHtml.linkSet(h, 'control', o);
   // 关联容器事件
   o.attachEvent('onEnter', h);
   o.attachEvent('onLeave', h);
   o.attachEvent('onMouseOver', h);
   o.attachEvent('onMouseOut', h);
   o.attachEvent('onMouseDown', h);
   o.attachEvent('onMouseUp', h);
   o.attachEvent('onClick', h);
   o.attachEvent('onDoubleClick', h);
   //o.attachEvent('onKeyDown', h);
   //o.attachEvent('onKeyPress', h);
   //o.attachEvent('onKeyUp', h);
   o.attachEvent('onResize', h);
   // 设置容器位置/大小/空白
   o.refreshBounds();
   o.refreshPadding();
   // 如果父容器是可以容纳控件的，则将自己添加到父容器
   //if(RClass.isClass(o.parent, MContainer)){
   //   o.parent.appendChild(o);
   //}
}

//==========================================================
// <T>改变当前控件的工作模式。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FControl_oeMode(e){
   var o = this;
   o._displayCd = e.displayCd;
   return EEventStatus.Continue;
}

//==========================================================
// <T>改变当前控件的操作模式。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FControl_oeEnable(e){
   var o = this;
   if(e.isBefore()){
      o.setEnable(e.enable);
   }
   return EEventStatus.Continue;
}

//==========================================================
// <T>改变当前控件的显示模式。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FControl_oeVisible(e){
   var o = this;
   if(e.isBefore()){
      o.setVisible(e.visible);
   }
   return EEventStatus.Continue;
}

//==========================================================
// <T>改变当前控件的显示大小。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FControl_oeResize(e){
   return EEventStatus.Continue;
}

//==========================================================
// <T>刷新当前控件的显示内容。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FControl_oeRefresh(e){
   return EEventStatus.Continue;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FControl_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   o.__base.MStyle.construct.call(o);
   o.__base.MSize.construct.call(o);
   o.__base.MPadding.construct.call(o);
}

//==========================================================
// <T>获得指定类型的父控件。</T>
//
// @method
// @param c:class:Class 类
// @return FControl 父控件
//==========================================================
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

//==========================================================
// <T>判断是否含有子控件。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
function FControl_hasControl(){
   var cs = this._controls;
   return cs ? !cs.isEmpty() : false;
}

//==========================================================
// <T>获得控件集合。</T>
//
// @method
// @return TDictionary 控件集合
//==========================================================
function FControl_controls(){
   var o = this;
   var r = o._controls;
   if(r == null){
      r = new TDictionary();
      o._controls = r;
   }
   return r;
}

//==========================================================
// <T>根据底板类型得到相应的页面元素。</T>
//
// @method
// @param p:value:EPanel 底板类型
// @return HtmlTag 页面元素
//==========================================================
function FControl_panel(p){
   var o = this;
   switch(p){
      case EPanel.Parent:
         return o._hParent;
      case EPanel.Container:
      case EPanel.Size:
         return o._hPanel;
   }
   return null;
}

//==========================================================
// <T>判断当前控件是否显示。</T>
//
// @method
// @return Boolean 是否显示
//==========================================================
function FControl_isVisible(){
   return _statusVisible;
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param v:visible:Boolean 是否显示
//==========================================================
function FControl_setVisible(v){
   var o = this;
   o._visible = v;
   // 设置布局底板的可见性
   //var hp = o.hLayoutCell;
   //if(hp){
   //   RHtml.displaySet(hp, v);
   //}
   // 设置控件底板的可见性
   var h = o.panel(EPanel.Container);
   if(h){
      RHtml.displaySet(h, v);
   }
}

//==========================================================
// <T>显示状态切换。</T>
//
// @method
//==========================================================
function FControl_show(){
   var o = this;
   if(!o._statusVisible){
      o.setVisible(true);
   }
}

//==========================================================
// <T>隐藏状态切换。</T>
//
// @method
//==========================================================
function FControl_hide(){
   var o = this;
   if(o._statusVisible){
      o.setVisible(false);
   }
}

//==========================================================
// <T>判断当前控件是否可以操作。</T>
//
// @method
// @return Boolean 是否可以
//==========================================================
function FControl_isEnable(){
   return this._statusEnable;
}

//==========================================================
// <T>设置控件的可操作和禁止。</T>
//
// @method
// @param p:enable:Boolean 是否可操作
//==========================================================
function FControl_setEnable(p){
   var o = this;
   o._statusEnable = p;
   var h = o.panel(EPanel.Container);
   if(h){
      h.style.disabled = !p;
   }
}

//==========================================================
// <T>可操作状态切换。</T>
//
// @method
//==========================================================
function FControl_enable(){
   var o = this;
   if(!o._statusEnable){
      o.setEnable(true);
   }
}

//==========================================================
// <T>禁止状态切换。</T>
//
// @method
//==========================================================
function FControl_disable(){
   var o = this;
   if(o._statusEnable){
      o.setEnable(false);
   }
}

//==========================================================
// <T>将一个页面元素和已经注册过的事件相关联。</T>
// <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
//    该立即函数的this指针指向当前控件实例。</P>
// <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
//    执行时该函数的this指针指向当前控件实例。</P>
//
// @method
// @param n:name:String 注册过的事件名称
// @param h:hPanel:HTML 页面元素
// @param m:method:Function 立即函数
// @return TEvent 关联的事件对象
// @see RControl.attachEvent
//==========================================================
function FControl_attachEvent(n, h, m, u){
   return RControl.attachEvent(this, n, h, m, u);
}

//==========================================================
// <T>将一个页面元素和已经注册过的事件相关联。</T>
// <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
//    该立即函数的this指针指向到达者控件实例。
//    可以通过事件对象的发出者访问到该发出对象。</P>
// <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
//    执行时该函数的this指针指向到达者控件实例。
//    可以通过事件对象的发出者访问到该发出对象。</P>
//
// @method
// @param t:target:FControl 到达者控件
// @param n:name:String 注册过的事件名称
// @param h:hPanel:HTML 页面元素
// @param m:method:Function 立即函数
// @return TEvent 关联的事件对象
// @see RControl.linkEvent
//==========================================================
function FControl_linkEvent(t, n, h, m){
   return RControl.linkEvent(this, t, n, h, m);
}

//==========================================================
// <T>调用控件的关联事件。</T>
//
// @method
// @param n:name:String 事件名称
// @param s:source:FControl 事件源
// @param e:event:TEvent 事件对象
//==========================================================
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

//==========================================================
// <T>如果当前组件是控件类型则放入自己的控件哈希表中。</T>
// <P>同时将子组件放入组件哈希表中。</P>
// <P>如果子控件的名称为空，则给当前子控件创建一个数字的索引名称，
//    保证子控件不会不其他未命名的子控件所覆盖。</P>
//
// @method
// @param p:component:FComponent 组件对象
//==========================================================
function FControl_push(p){
   var o = this;
   // 加载事件定义
   //if(RClass.isClass(p, FEvent)){
   //   var es = o._events;
   //   var t = o.topComponent();
   //   if(!es){
   //      es = o._events = new TDictionary();
   //   }
   //   var en = p.name + '@' + t.name + o.fullPath();
   //   var e = RControl.events.get(en);
   //   if(!e){
   //      e = p;
   //      RControl.events.set(en, p);
   //   }
   //   es.set(e.name, e);
   //   return;
   //}
   // 加载组件
   o.__base.FComponent.push.call(o, p);
   // 加载控件
   if(RClass.isClass(p, FControl)){
      var cs = o.controls();
      if(!p.name){
         p.name = cs.count;
      }
      cs.set(p.name, p);
   }
}

//==========================================================
// <T>分发控件建立的事件。</T>
//
// @method
// @param p:value:Object 页面元素或事件对象
//==========================================================
function FControl_psBuild(p){
   var o = this;
   // 获得文档对象
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
   // 创建事件
   var e = new TEventProcess(null, o, 'oeBuild', FControl);
   // 处理消息
   e.hDocument = d;
   o.process(e);
   e.hDocument = null;
   e.dispose();
}

//==========================================================
// <T>分发工作模式的事件。</T>
//
// @method
// @param p:displayMode:EDisplayMode 显示模式
//==========================================================
function FControl_psMode(p){
   var o = this;
   // 创建事件
   var e = new TEventProcess(null, o, 'oeMode', FControl);
   e.displayCd = p;
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发改变控件设计状态的事件。</T>
//
// @method
// @param m:mode:EDesign 设计模式
// @param f:flag:Boolean 开始还是结束
//==========================================================
function FControl_psDesign(m, f){
   var o = this;
   RConsole.find(FDesignConsole).setFlag(m, f, o);
   // 创建事件
   var e = new TEventProcess(null, o, 'oeDesign', MDesign)
   e.mode = m;
   e.flag = f;
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发改变控件可操作和禁止的事件。</T>
//
// @method
// @param v:enable:Boolean 是否可操作
//==========================================================
function FControl_psEnable(v){
   var o = this;
   // 创建事件
   var e = new TEventProcess(null, o, 'oeEnable', FControl)
   e.enable = v;
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发改变控件隐藏和显示的事件。</T>
//
// @method
// @param v:visible:Boolean 是否可见
//==========================================================
function FControl_psVisible(v){
   var o = this;
   // 创建事件
   var e = new TEventProcess(null, o, 'oeVisible', FControl);
   e.visible = v;
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发改变控件大小的事件。</T>
//
// @method
//==========================================================
function FControl_psResize(){
   var o = this;
   // 创建事件
   var e = new TEventProcess(null, o, 'oeResize', FControl);
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>分发控件刷新的事件。</T>
//
// @method
// @param t:type:String 刷新类型
//==========================================================
function FControl_psRefresh(t){
   var o = this;
   // 创建事件
   var e = new TEventProcess(null, o, 'oeRefresh', FControl);
   // 处理消息
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>设置控件的页面父容器。</T>
//
// @method
// @param h:hPanel:HtmlTag 页面元素
//==========================================================
function FControl_setPanel(h){
   var o = this;
   o._hParent = h;
   h.appendChild(o._hPanel);
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:html:HtmlTag 页面元素
//==========================================================
function FControl_build(p){
   var o = this;
   // 检查状态
   if(o._statusBuild){
      throw new TError(o, 'Current control is already builded.');
   }
   // 获得文档对象
   var d = null;
   if(p.createElement){
      d = p;
   }else if(p.ownerDocument.createElement){
      d = p.ownerDocument;
   }else{
      throw new TError("Build document is invalid. (document={1})", p);
   }
   // 构建处理
   var a = new SArguments();
   a.owner = o;
   a.hDocument = d;
   o.onBuild(a);
   RObject.free(a);
   // 设置状态
   o._statusBuild = true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FControl_dispose(){
   var o = this;
   // 释放属性
   o._disable = null;
   o._nowrap = null;
   o._hint = null;
   // 释放属性
   o._styleContainer = null;
   // 释放属性
   o._statusVisible = null;
   o._statusEnable = null;
   o._statusBuild = null;
   // 释放控件集合
   var v = o._controls;
   if(v){
      v.dispose();
      o._controls = null;
   }
   // 释放属性
   o._hParent = null;
   var v = o._hPanel;
   if(v){
      RMemory.freel(v);
      o._hPanel = null;
   }
   // 释放处理
   o.__base.MPadding.dispose.call(o);
   o.__base.MSize.dispose.call(o);
   o.__base.MStyle.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
