(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{107:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),c=a(22),l=a.n(c),r=(a(63),a(64),a(11)),s=a(14),i=a(12),m=a(15),u=a(16),p=a(108),h=a(109),d=a(115),g=a(114),f=a(116),b=a(28),v=a(30),k=a(53),C=a.n(k),E=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={respVal:[],vidName:null,menuToggle:!1},n.DEBOUNCETIME=400,window.config=window.config||{},window.location.host.match("localhost")?(n.backendUrl=window.config.local,window.backendUrl=window.config.local):(window.backendUrl=window.config.url,n.backendUrl=window.config.url),n.redirectToPage=n.redirectToPage.bind(Object(r.a)(n)),n.debounceTimeout=0,n.handleChange=n.handleChange.bind(Object(r.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(r.a)(n)),n.updateList=n.updateList.bind(Object(r.a)(n)),n.closeMenu=n.closeMenu.bind(Object(r.a)(n)),n.fileUpload=n.fileUpload.bind(Object(r.a)(n)),n}return Object(i.a)(a,[{key:"shouldComponentUpdate",value:function(e,t){return!0}}]),Object(i.a)(a,[{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.menuToggleCallback(!1),""===this.state.searchVal||this.state.searchVal&&this.props.redirectCallback("search-result",this.state.searchVal)}},{key:"updateList",value:function(){var e=this;this.debounceTimeout=setTimeout((function(){fetch(e.backendUrl+"/search?q="+e.state.searchVal).then((function(e){return e.json()})).then((function(t){e.setState({respVal:t})}))}),this.DEBOUNCETIME)}},{key:"fileUpload",value:function(e){var t=new FormData;t.append("file",e.target.files[0]),C.a.post(this.backendUrl+"/uploadFile",t,{}).then((function(e){console.log(e),alert(e.data)})).catch((function(e){console.error(e)}))}},{key:"handleChange",value:function(e){this.setState({searchVal:e.target.value,menuToggle:!0}),this.props.menuToggleCallback(!0),this.updateList(),""===e.target.value&&this.props.menuToggleCallback(!1)}},{key:"closeMenu",value:function(){this.props.menuToggleCallback(!1)}},{key:"redirectToPage",value:function(e,t){this.props.redirectCallback(e,t),this.closeMenu()}},{key:"render",value:function(){var e,t=this;return e=this.state.respVal.map((function(e,a){return o.a.createElement(p.a,{type:"button",onClick:function(a){a.preventDefault(),t.redirectToPage("player",e.substring(0,e.length-4))},href:"/player/".concat(e.substring(0,e.length-4)),className:"row nav-button ml-0 mr-0",key:a},e.substring(0,e.length-4))})),o.a.createElement(o.a.Fragment,null,o.a.createElement(h.a,{className:"align-items-center navbar-home"},o.a.createElement(p.a,{className:"col-2 col-md-1 pl-2 pl-md-3 pr-0 pt-2 pb-2 d-flex home-button align-items-center",type:"button",onClick:function(){t.redirectToPage("home")}},o.a.createElement("div",{className:"d-none d-md-block mr-md-2"},"Home"),o.a.createElement(b.a,{icon:v.a,name:"home",className:"m-1"})),o.a.createElement("div",{className:"col-7 pl-1 pl-md-2 pr-0"},o.a.createElement("form",{className:"row",onSubmit:this.handleSubmit,autoComplete:"off"},o.a.createElement("input",{type:"search",placeholder:"Search...",id:"search",value:this.state.searchVal||"",onChange:this.handleChange,className:"col-12"})),o.a.createElement(d.a,{isOpen:this.props.menuToggle,toggle:function(){return t.props.menuToggle},className:"pr-5"},o.a.createElement(g.a,{className:"d-none"}),o.a.createElement(f.a,{className:"col-12 search-suggestions-container pt-0",style:{position:"realtive"}},e))),o.a.createElement("div",{className:"col-2 pl-0"},o.a.createElement("button",{type:"button",onClick:this.handleSubmit,className:"nav-button"},o.a.createElement(b.a,{icon:v.b,name:"search"})))),o.a.createElement(h.a,{style:{maxWidth:"100%"}},o.a.createElement("div",{className:"form-group files ml-5"},o.a.createElement("label",null,"Upload Your File "),o.a.createElement("input",{type:"file",className:"form-control",multiple:"",onChange:this.fileUpload}))))}}]),a}(o.a.Component),w=function(e){return o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12 col-md-7"},o.a.createElement("div",{className:"frame-container"},o.a.createElement("iframe",{className:"playerframe",title:e.srcName,src:"".concat(window.backendUrl,"/files/").concat(e.srcName,".mp4"),allowFullScreen:!0})))))},y=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={respVal:[]},n.getData=n.getData.bind(Object(r.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.getData()}},{key:"getSnapshotBeforeUpdate",value:function(e,t){return e.searchVal!==this.props.searchVal&&this.getData(),null}},{key:"getData",value:function(){var e=this;fetch("http://localhost:8000/searchall?q="+this.props.searchVal).then((function(e){return e.json()})).then((function(t){e.setState({respVal:t})}))}},{key:"redirectToPlayer",value:function(e,t){t.preventDefault(),this.props.redirectCallback("player",e)}},{key:"render",value:function(){var e,t=this;return e=this.state.respVal.map((function(e,a){return o.a.createElement("a",{className:"row nav-button search-result ml-2 mb-1",type:"button",href:"/player/".concat(e.substring(0,e.length-4)),key:a,onClick:function(a){t.redirectToPlayer(e.substring(0,e.length-4),a)}},e.substring(0,e.length-4))})),o.a.createElement("div",null,e)}}]),a}(o.a.PureComponent),T=a(33),N=a(56),j=a(110),O=a(111),S=a(112),x=a(113),U=[{src:"./panda.jpeg",altText:"Panda",caption:"Panda Music"},{src:"./img.png",altText:"Mudit",caption:"Mudit Music"},{src:"./img.png",altText:"Yash",caption:"Yash Music"}],D=function(e){var t=Object(n.useState)(0),a=Object(T.a)(t,2),c=a[0],l=a[1],r=Object(n.useState)(!1),s=Object(T.a)(r,2),i=s[0],m=s[1],u=function(){if(!i){var e=c===U.length-1?0:c+1;l(e)}},p=function(){if(!i){var e=0===c?U.length-1:c-1;l(e)}},h=function(t,a){a.preventDefault(),e.redirectCallback("player",t)},d=U.map((function(e){return o.a.createElement(N.a,{onExiting:function(){return m(!0)},onExited:function(){return m(!1)},key:e.caption,className:"row pr-0"},o.a.createElement("a",{className:"d-none d-md-block",type:"button",href:"/player/".concat(e.altText),onClick:function(t){h(e.altText,t)}},o.a.createElement(j.a,{className:"offset-md-3",captionHeader:e.caption,captionText:""})),o.a.createElement("a",{className:"col-12 pr-0 col-md-4 link-img",type:"button",href:"/player/".concat(e.altText),onClick:function(t){h(e.altText,t)}},o.a.createElement("img",{className:"Carousel-img",src:e.src,alt:e.altText})))}));return o.a.createElement("div",{className:"ml-0 mr-0 ml-md-4 pl-md-1 pr-0 pl-0 col-md-8 pr-md-0"},o.a.createElement(O.a,{activeIndex:c,next:u,previous:p,interval:3e3},o.a.createElement(S.a,{items:U,activeIndex:c,onClickHandler:function(e){i||l(e)}}),d,o.a.createElement(x.a,{direction:"prev",directionText:"Previous",onClickHandler:p}),o.a.createElement(x.a,{direction:"next",directionText:"Next",onClickHandler:u})))},M=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={vidName:null,menuToggle:!1,searchResponse:[],WComponent:"home"},window.location.host.match("localhost")?n.backendUrl="localhost:8000":n.backendUrl=window.config.url,n}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("script",{src:"./config.js"}),o.a.createElement("div",{className:"page-wrapper"},o.a.createElement(E,{redirectCallback:function(t,a){e.setState({WComponent:t,Parameter:a}),console.log(t,a)},menuToggleCallback:function(t){t!==e.state.menuToggle&&e.setState({menuToggle:t})},menuToggle:this.state.menuToggle}),o.a.createElement(V,{maincontentCallback:function(t){e.setState({menuToggle:t})},compToDis:this.state.WComponent,paramForComp:this.state.Parameter,redirectCallback:function(t,a){e.setState({WComponent:t,Parameter:a})}})))}}]),a}(o.a.Component),V=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={WComponent:n.props.compToDis,params:n.props.paramForComp},n.closeMenu=n.closeMenu.bind(Object(r.a)(n)),window.location.host.match("localhost")?n.backendUrl="localhost:8000":n.backendUrl=window.config.url,n}return Object(i.a)(a,[{key:"shouldComponentUpdate",value:function(e,t){return console.log(e+"\n"+t),e.compToDis!==this.props.compToDis||e.paramForComp!==this.props.paramForComp?(this.setState({WComponent:e.compToDis,params:e.paramForComp}),console.log(!0),!0):t.WComponent!==this.state.WComponent||t.params!==this.state.params?(console.log(!0),!0):(console.log(!1),!1)}}]),Object(i.a)(a,[{key:"closeMenu",value:function(){this.props.maincontentCallback(!1)}},{key:"render",value:function(){var e=this;switch(this.state.WComponent){case"home":return o.a.createElement(D,{redirectCallback:function(t,a){e.setState({WComponent:t,params:a})}});case"player":return o.a.createElement(w,{srcName:this.state.params});case"search-result":return o.a.createElement(y,{searchVal:this.state.params,redirectCallback:function(t,a){e.setState({WComponent:t,params:a})}})}}}]),a}(o.a.Component),P=M;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},58:function(e,t,a){e.exports=a(107)},64:function(e,t,a){}},[[58,1,2]]]);
//# sourceMappingURL=main.5e7ad4ba.chunk.js.map