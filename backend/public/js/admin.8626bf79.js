(function(e){function t(t){for(var r,i,u=t[0],s=t[1],l=t[2],c=0,f=[];c<u.length;c++)i=u[c],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={admin:0},o=[];function i(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-2d217858":"6a8b1fdd"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=i(e);var l=new Error;o=function(t){s.onerror=s.onload=null,clearTimeout(c);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}a[e]=void 0}};var c=setTimeout((function(){o({type:"timeout",target:s})}),12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var d=l;o.push([1,"chunk-vendors"]),n()})({1:function(e,t,n){e.exports=n("ac57")},ac57:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],i={name:"App"},u=i,s=n("2877"),l=Object(s["a"])(u,a,o,!1,null,null,null),c=l.exports,d=n("2f62"),f=n("0e44");r["default"].use(d["a"]);var p=new d["a"].Store({plugins:[Object(f["a"])({storage:window.sessionStorage})],state:{},getters:{},actions:{},mutations:{},modules:{}}),v=(n("d3b7"),n("8c4f")),b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"outerContainerLayout"},[n("sidebar",{staticClass:"sidebar-container"}),n("div",{staticClass:"main-container"},[n("navbar"),n("app-main")],1)],1)},h=[],m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"outerContainerSidebar"},[e._v("this is sidebar")])},y=[],g={},w=g,_=Object(s["a"])(w,m,y,!1,null,null,null),j=_.exports,O=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"outerContainerAppMain"},[n("transition",{attrs:{name:"fade-transform",mode:"out-in"}},[n("router-view")],1)],1)},x=[],C={},P=C,S=Object(s["a"])(P,O,x,!1,null,null,null),E=S.exports,k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"outerContainerNavbar"},[e._v("this is navbar")])},M=[],$={},T=$,A=Object(s["a"])(T,k,M,!1,null,null,null),L=A.exports,D={components:{Sidebar:j,AppMain:E,Navbar:L}},J=D,N=Object(s["a"])(J,b,h,!1,null,null,null),q=N.exports;r["default"].use(v["a"]);var z=new v["a"]({mode:"history",routes:[{path:"/admin",component:q,redirect:"/admin/dashboard",children:[{path:"dashboard",component:function(){return n.e("chunk-2d217858").then(n.bind(null,"c6a0"))},name:"Dashboard",meta:{title:"Dashboard",icon:"dashboard",affix:!0}}]}]});r["default"].config.productionTip=!1;t["default"]=new r["default"]({data:function(){return{}},router:z,store:p,render:function(e){return e(c)}}).$mount("#app")}});
//# sourceMappingURL=admin.8626bf79.js.map