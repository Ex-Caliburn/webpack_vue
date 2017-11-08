(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = (clientWidth / 3.2) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// // 实现1px border
// (function (w) {
//   //拿到对应设备的像素比  如果不存在则指定为1
//   var dpr = window.devicePixelRatio || 1;
//   var scale = 1 / dpr;
//   var rem = document.documentElement.clientWidth * dpr / 3.2;
//
//   //实现了页面所有元素的缩放
//   var metaNode = document.querySelector("meta[name='viewport']");
//   metaNode.setAttribute("content", "initial-scale=" + scale + ",minimum-scale=" + scale + ", maximum-scale=" + scale + ", user-scalable=no");
//
//   //将布局元素放大回来
//   var styleNode = document.createElement("style");
//   styleNode.innerHTML = "html{font-size:" + rem + "px!important}";
//   document.head.appendChild(styleNode);
//
//   w.dpr = dpr;
//   w.scale = scale;
//   w.rem = rem;
// })(window)
