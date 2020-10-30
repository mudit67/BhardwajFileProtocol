(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{107:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(23),o=a.n(r),l=(a(63),a(64),a(11)),s=a(14),i=a(12),u=a(15),m=a(16),p=a(22),d=a(53),h=a.n(d);var f=function(e){var t=Object(n.useState)(""),a=Object(p.a)(t,2),r=a[0],o=a[1];return c.a.createElement("div",{className:"upload ml-2 ml-md-3 "},c.a.createElement("label",{htmlFor:"file-upload",className:"nav-button"},"Click to upload"),c.a.createElement("input",{type:"file",className:"d-none",id:"file-upload",onChange:function(e){!function(e,t){console.log(e.target.files[0].name);var a=new FormData;a.append("file",e.target.files[0]),h.a.post("".concat(window.backendUrl,"/uploadFile"),a,{}).then((function(e){console.log(e),alert(e.data)})).catch((function(e){console.error(e)}))}(e),o(e.target.files[0].name)}}),c.a.createElement("div",{className:"ml-2"},r))},b=a(108),g=a(109),v=a(115),E=a(114),k=a(116),C=a(25),T=a(26),y=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={respVal:[],vidName:null,menuToggle:!1,tip:!1},n.DEBOUNCETIME=400,n.redirectToPage=n.redirectToPage.bind(Object(l.a)(n)),n.debounceTimeout=0,n.handleChange=n.handleChange.bind(Object(l.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(l.a)(n)),n.updateList=n.updateList.bind(Object(l.a)(n)),n.closeMenu=n.closeMenu.bind(Object(l.a)(n)),n}return Object(i.a)(a,[{key:"shouldComponentUpdate",value:function(e,t){return!0}}]),Object(i.a)(a,[{key:"handleSubmit",value:function(e){e.preventDefault(),this.closeMenu(),""===this.state.searchVal||this.state.searchVal&&this.redirectToPage("search-result",this.state.searchVal)}},{key:"updateList",value:function(){var e=this;this.debounceTimeout=setTimeout((function(){fetch(window.backendUrl+"/search?q="+e.state.searchVal+"&l=8").then((function(e){return e.json()})).then((function(t){e.setState({respVal:t}),e.props.menuToggleCallback(!0)}))}),this.DEBOUNCETIME)}},{key:"handleChange",value:function(e){""!==e.target.value?(this.setState({searchVal:e.target.value}),this.updateList()):(this.setState({searchVal:""}),this.closeMenu())}},{key:"closeMenu",value:function(){this.props.menuToggleCallback(!1)}},{key:"redirectToPage",value:function(e,t){this.closeMenu(),this.props.redirectCallback(e,t)}},{key:"render",value:function(){var e,t=this;return e=this.state.respVal.map((function(e,a){return c.a.createElement(b.a,{type:"button",onClick:function(a){a.preventDefault(),t.redirectToPage("player",e.substring(0,e.length-4))},href:"/player/".concat(e.substring(0,e.length-4)),className:"row nav-button ml-0 mr-0",key:a},e.substring(0,e.length-4))})),c.a.createElement(c.a.Fragment,null,c.a.createElement(g.a,{className:"align-items-center navbar-home"},c.a.createElement(b.a,{className:"col-2 col-md-1 pl-md-3 pr-0 pt-2 pb-2 d-flex home-button align-items-center",type:"button",onClick:function(){t.redirectToPage("home","")}},c.a.createElement("div",{className:"d-none d-md-block mr-md-2"},"Home"),c.a.createElement(C.a,{icon:T.a,name:"home",className:"ml-1 mt-1 mb-1"})),c.a.createElement("div",{className:"col-7 pl-1 pl-md-2 pr-0"},c.a.createElement("form",{className:"row",onSubmit:this.handleSubmit,autoComplete:"off"},c.a.createElement("input",{type:"search",placeholder:"Search...",id:"search",value:this.state.searchVal||"",onChange:this.handleChange,className:"col-12"})),c.a.createElement(v.a,{isOpen:this.props.menuToggle,toggle:function(){return t.props.menuToggle},className:"pr-5"},c.a.createElement(E.a,{className:"d-none"}),c.a.createElement(k.a,{className:"col-12 search-suggestions-container pt-0",style:{position:"realtive"}},e))),c.a.createElement("button",{type:"button",onClick:this.handleSubmit,className:"ml-0 nav-button searchButton"},c.a.createElement(C.a,{icon:T.b,name:"search"})),c.a.createElement("div",null,c.a.createElement("button",{className:"nav-button align-items-center",type:"button",onClick:function(){return t.redirectToPage("upload","")},onMouseOver:function(){t.setState({tip:!0})},onMouseLeave:function(){t.setState({tip:!1})}},c.a.createElement(C.a,{icon:T.c,name:"upload"})),c.a.createElement("div",{className:this.state.tip?"uploadTip mr-md-2":"d-none"},"Upload Files"))))}}]),a}(c.a.Component),N=function(e){return c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-12 col-md-7"},c.a.createElement("div",{className:"frame-container"},c.a.createElement("iframe",{className:"playerframe",title:e.srcName,src:"".concat(window.backendUrl,"/files/").concat(e.srcName,".mp4"),allowFullScreen:!0})))))},w=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={respVal:[]},n.getData=n.getData.bind(Object(l.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.getData()}},{key:"getSnapshotBeforeUpdate",value:function(e,t){return e.searchVal!==this.props.searchVal&&this.getData(),null}},{key:"getData",value:function(){var e=this;fetch("http://localhost:8000/search?q="+this.props.searchVal).then((function(e){return e.json()})).then((function(t){e.setState({respVal:t})}))}},{key:"redirectToPlayer",value:function(e,t){t.preventDefault(),this.props.redirectCallback("player",e)}},{key:"render",value:function(){var e,t=this;return e=this.state.respVal.map((function(e,a){return c.a.createElement("a",{className:"row nav-button search-result ml-2 mb-1",type:"button",href:"/player/".concat(e.substring(0,e.length-4)),key:a,onClick:function(a){t.redirectToPlayer(e.substring(0,e.length-4),a)}},e.substring(0,e.length-4))})),c.a.createElement("div",null,e)}}]),a}(c.a.PureComponent),j=a(56),O=a(110),S=a(111),x=a(112),M=a(113),D=[{src:"./panda.jpeg",altText:"Panda",caption:"Panda Music"},{src:"./img.png",altText:"Mudit",caption:"Mudit Music"},{src:"./img.png",altText:"Yash",caption:"Yash Music"}],V=function(e){var t=Object(n.useState)(0),a=Object(p.a)(t,2),r=a[0],o=a[1],l=Object(n.useState)(!1),s=Object(p.a)(l,2),i=s[0],u=s[1],m=function(){if(!i){var e=r===D.length-1?0:r+1;o(e)}},d=function(){if(!i){var e=0===r?D.length-1:r-1;o(e)}},h=function(t,a){a.preventDefault(),e.redirectCallback("player",t)},f=D.map((function(e){return c.a.createElement(j.a,{onExiting:function(){return u(!0)},onExited:function(){return u(!1)},key:e.caption,className:"row pr-0"},c.a.createElement("a",{className:"d-none d-md-block",type:"button",href:"/player/".concat(e.altText),onClick:function(t){h(e.altText,t)}},c.a.createElement(O.a,{className:"offset-md-3",captionHeader:e.caption,captionText:""})),c.a.createElement("a",{className:"col-12 pr-0 col-md-4 link-img",type:"button",href:"/player/".concat(e.altText),onClick:function(t){h(e.altText,t)}},c.a.createElement("img",{className:"Carousel-img",src:e.src,alt:e.altText})))}));return c.a.createElement("div",{className:"ml-0 mr-0 ml-md-4 pl-md-1 pr-0 pl-0 col-md-8 pr-md-0"},c.a.createElement(S.a,{activeIndex:r,next:m,previous:d,interval:3e3},c.a.createElement(x.a,{items:D,activeIndex:r,onClickHandler:function(e){i||o(e)}}),f,c.a.createElement(M.a,{direction:"prev",directionText:"Previous",onClickHandler:d}),c.a.createElement(M.a,{direction:"next",directionText:"Next",onClickHandler:m})))},P=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={vidName:null,menuToggle:!1,searchResponse:[],WComponent:"home"},window.config=window.config||{},window.location.host.match("localhost")?window.backendUrl=window.config.local:window.backendUrl=window.config.url||"",n}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return c.a.createElement(c.a.Fragment,null,c.a.createElement("script",{src:"./config.js"}),c.a.createElement("div",{className:"page-wrapper"},c.a.createElement(y,{redirectCallback:function(t,a){e.setState({WComponent:t,Parameter:a})},menuToggleCallback:function(t){t!==e.state.menuToggle&&e.setState({menuToggle:t})},menuToggle:this.state.menuToggle}),c.a.createElement(W,{maincontentCallback:function(t){e.setState({menuToggle:t})},compToDis:this.state.WComponent,paramForComp:this.state.Parameter,redirectCallback:function(t,a){e.setState({WComponent:t,Parameter:a})}})))}}]),a}(c.a.Component),W=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={WComponent:n.props.compToDis,params:n.props.paramForComp},n.closeMenu=n.closeMenu.bind(Object(l.a)(n)),n}return Object(i.a)(a,[{key:"shouldComponentUpdate",value:function(e,t){return e.compToDis!==this.props.compToDis||e.paramForComp!==this.props.paramForComp?(this.setState({WComponent:e.compToDis,params:e.paramForComp}),!0):t.WComponent!==this.state.WComponent||t.params!==this.state.params}}]),Object(i.a)(a,[{key:"closeMenu",value:function(){this.props.maincontentCallback(!1)}},{key:"render",value:function(){var e=this;switch(this.state.WComponent){case"home":return c.a.createElement(V,{redirectCallback:function(t,a){e.setState({WComponent:t,params:a})}});case"player":return c.a.createElement(N,{srcName:this.state.params});case"search-result":return c.a.createElement(w,{searchVal:this.state.params,redirectCallback:function(t,a){e.setState({WComponent:t,params:a})}});case"upload":return c.a.createElement(f,{url:this.backendUrl});default:return c.a.createElement("div",null)}}}]),a}(c.a.Component),F=P;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},58:function(e,t,a){e.exports=a(107)},64:function(e,t,a){}},[[58,1,2]]]);
//# sourceMappingURL=main.6878a40e.chunk.js.map