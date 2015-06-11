//==========================================================
// <T>事件枚举。</T>
//
// @enum(Integer)
// @author maocy
// @version 150130
//==========================================================
MO.EEvent = new function EEvent(){
   var o = this;
   // @attribute 未知
   o.Unknown     = 'Unknown';
   // @attribute 加载
   o.Load        = 'Load';
   // @attribute 处理
   o.Process     = 'Process';
   // @attribute 进入帧
   o.EnterFrame  = 'EnterFrame';
   // @attribute 离开帧
   o.LeaveFrame  = 'LeaveFrame';
   // @attribute 获得热点
   o.Enter       = 'Enter';
   // @attribute 失去热点
   o.Leave       = 'Leave';
   // @attribute 获得焦点
   o.Focus       = 'Focus';
   // @attribute 失去焦点
   o.Blur        = 'Blur';
   // @attribute 点击
   o.Click       = 'Click';
   // @attribute 双击
   o.DoubleClick = 'DoubleClick';
   // @attribute 项目点击
   o.ItemClick   = 'ItemClick';
   // @attribute 选择
   o.Selected    = 'Selected';
   // @attribute 数据改变
   o.DataChanged = 'DataChanged';
   // @attribute 结果确认
   o.Result      = 'Result';
   // @attribute 触摸缩放
   o.TouchZoom   = 'TouchZoom';
   return o;
}
