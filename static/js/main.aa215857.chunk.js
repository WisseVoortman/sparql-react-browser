(this.webpackJsonpreactpagestest=this.webpackJsonpreactpagestest||[]).push([[0],{142:function(e,t,n){e.exports=n(380)},147:function(e,t,n){},150:function(e,t,n){},380:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(20),c=n.n(o),i=(n(147),n(35)),l=n(118),s=n(14),u=n(78),p=n(16),d=Object(p.a)(),h=Object(s.a)(l.a,Object(u.a)(d)),m=(n(149),n(150),n(13)),f=n(6),E=n(7),b=n(10),g=n(9),v=n(15),y=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(e){var r;Object(f.a)(this,n),(r=t.call(this)).width=600,r.height=600;var a=v.f(e.data.nodes).force("charge",v.e().strength(-30)).force("center",v.c(r.width/2,r.height/2)).force("link",v.d().links(e.data.links).distance(200).id((function(e){return e.id}))).on("tick",(function(){(function(){var t=v.g(".nodestext").selectAll("text").data(e.data.nodes).call(o(a));t.enter().append("text").text((function(e){return e.id})).merge(t).attr("transform",(function(e){return"translate("+e.x+","+e.y+")"})),t.exit().remove()})(),function(){var t=v.g(".nodescircle").selectAll("circle").data(e.data.nodes).call(o(a));t.enter().append("circle").attr("r",20).style("fill","#FD8D3C").merge(t).attr("transform",(function(e){return"translate("+e.x+","+e.y+")"})),t.exit().remove()}(),function(){var t=v.g(".links").selectAll("path").data(e.data.links);t.enter().append("path").attr("class",(function(e){return"link"})).attr("class",(function(e){return"link "+e.property})).attr("id",(function(e,t){return"linkId_"+t})).attr("marker-end",(function(e){return"url(#"+e.property.replace(/\s/g,"")+")"})).merge(t).attr("d",(function(e){e.target.x,e.source.x,e.target.y,e.source.y;return"M"+e.source.x+","+e.source.y+"A300,300 0 0,1 "+e.target.x+","+e.target.y})),t.exit().remove()}(),function(){var t=v.g(".linkstext").selectAll("text").data(e.data.links);t.enter().append("text").attr("x","100").attr("y","-20").attr("class","linklabel").append("textPath").attr("xlink:href",(function(e,t){return"#linkId_"+t})).text((function(e){return e.property})),t.exit().remove()}(),function(){var t=v.g(".defs").selectAll("marker").data(function(){var t=[];return e.data.links.forEach((function(e){t.push(e.property.replace(/\s/g,""))})),t}());t.enter().append("marker").attr("id",String).attr("viewBox","0 -5 10 10").attr("refX",30).attr("refY",0).attr("markerWidth",6).attr("markerHeight",6).attr("orient","auto").append("svg:path").attr("d","M0,-5L10,0L0,5"),t.exit().remove()}()}));var o=function(e){return v.a().on("start",(function(t){v.b.active||e.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y})).on("drag",(function(e){e.fx=v.b.x,e.fy=v.b.y})).on("end",(function(t){v.b.active||e.alphaTarget(0),t.fx=null,t.fy=null}))};return r}return Object(E.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{id:"forcegraph"},a.a.createElement("svg",{width:this.width,height:this.height,style:{border:"1px solid black"}},a.a.createElement("g",{class:"links"}),a.a.createElement("g",{class:"nodescircle"}),a.a.createElement("g",{class:"nodestext"}),a.a.createElement("g",{class:"linkstext"}),a.a.createElement("defs",{class:"defs"})))}}]),n}(a.a.Component),j=Object(m.connect)((function(e,t){return{nodes:e.nodes,links:e.links,data:e.data}}),(function(e,t){return Object(s.b)({},e)}))(y),k=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(e){return Object(f.a)(this,n),t.call(this)}return Object(E.a)(n,[{key:"render",value:function(){var e=this;return a.a.createElement("div",null,a.a.createElement("p",null,this.props.datasource.currentDatasource.endpoint),a.a.createElement("button",{onClick:function(){return e.props.fetchTest()}},"Fetch Test"),a.a.createElement("button",{onClick:function(){return e.props.fetchSPARQL()}},"Fetch SPARQL"),a.a.createElement("button",{onClick:function(){return e.props.sparql()}},"Fetch query"),a.a.createElement("button",{onClick:function(){return fetch("http://localhost:8080/rdf4j-workbench/repositories/1/query?action=&queryLn=SPARQL&query=SELECT%20*%20%0AWHERE%20%0A%7B%0A%20%20%3Fs%20%3Fp%20%3Fo%20.%20%0A%20%20FILTER%20(regex(%3Fo%2C%20%229202LE%22))%0A%7D&limit_query=100&infer=true&")}},"Fetch qqq"))}}]),n}(a.a.Component),O=function(e){return{type:"SET_CURRENT_DATASOURCE",datasource:e}},C=n(18),S=n(128),T=n(129),w=function(e){var t=e.types,n=e.promise,r=Object(T.a)(e,["types","promise"]),a=Object(S.a)(t,3),o=a[0],c=a[1],i=a[2];return function(e){return e(Object(C.a)(Object(C.a)({},r),{},{type:o})),n.then((function(t){if(t.error||t.errors)throw new Error(t.error);return e(Object(C.a)(Object(C.a)({},r),{},{type:c,result:t})),t})).catch((function(t){e(Object(C.a)(Object(C.a)({},r),{},{type:i,error:t}))}))}},A=function(e){return w({types:["FETCH_SPARQL_REQUEST","FETCH_SPARQL_SUCCESS","FETCH_SPARQL_FAILURE"],promise:fetch({method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify("data")}).then((function(e){return e.json()}))})},F=function(){return w({types:["FETCH_TEST_REQUEST","FETCH_TEST_SUCCESS","FETCH_TEST_FAILURE"],promise:fetch("https://www.anapioficeandfire.com/api/books").then((function(e){return e.json()})).catch((function(e){console.log(e)}))})},_=function(e){return w({types:["FETCH_TEST_REQUEST","FETCH_TEST_SUCCESS","FETCH_TEST_FAILURE"],promise:fetch("http://localhost:8080/rdf4j-workbench/repositories/1/query?action=&queryLn=SPARQL&query=SELECT%20*%20%0AWHERE%20%0A%7B%0A%20%20%3Fs%20%3Fp%20%3Fo%20.%20%0A%20%20FILTER%20(regex(%3Fo%2C%20%229202LE%22))%0A%7D&limit_query=100&infer=true&").then((function(e){return console.log(e)})).catch((function(e){console.log(e)}))})},x=Object(m.connect)((function(e,t){return{nodes:e.nodes,links:e.links,datasource:e.datasource}}),(function(e,t){return Object(s.b)({fetchTest:F,fetchSPARQL:A,sparql:_},e)}))(k),L=function(e){return a.a.createElement("button",{className:"dropdown-item",onClick:e.onClick},e.name)},R=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(e){return Object(f.a)(this,n),t.call(this)}return Object(E.a)(n,[{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"setDataSourceDropdown"},a.a.createElement("div",{className:"dropdown show"},a.a.createElement("button",{className:"btn btn-secondary dropdown-toggle",id:"dropdownMenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"Specificeer bron: ",this.props.datasource.currentDatasource.name),a.a.createElement("div",{className:"","aria-labelledby":"dropdownMenuLink"},this.props.datasource.datasources.map((function(t,n){return a.a.createElement(L,{key:n,onClick:function(){return e.props.setCurrentDatasource(t)},name:t.name})})))))}}]),n}(a.a.Component),H=Object(m.connect)((function(e,t){return{datasource:e.datasource}}),(function(e,t){return Object(s.b)({setCurrentDatasource:O},e)}))(R),N=n(29),U=n(120),q=n.n(U),D=n(121),P=n.n(D),Q=Object(N.createDevTools)(a.a.createElement(P.a,{toggleVisibilityKey:"ctrl-h",changePositionKey:"ctrl-q",defaultIsVisible:!0},a.a.createElement(q.a,{theme:"tomorrow"})));function B(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[{id:"A"},{id:"B"},{id:"C"},{id:"D"},{id:"E"},{id:"F"},{id:"G"},{id:"H"}],t=arguments.length>1?arguments[1]:void 0;return t.type,e}function I(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[{source:"A",target:"B",property:"dirk"},{source:"A",target:"C",property:"ryan"},{source:"B",target:"G",property:"wisse"},{source:"D",target:"E",property:"bart"},{source:"D",target:"H",property:"henk"},{source:"E",target:"F",property:"john"},{source:"E",target:"H",property:"test"}],t=arguments.length>1?arguments[1]:void 0;return t.type,e}function J(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{currentDatasource:0,datasources:[{name:"Onderwijsregistratie",endpoint:"http://localhost:8080/rdf4j-workbench/repositories/rio/query"},{name:"Basisregistraties",endpoint:"https://data.pdok.nl/sparql"},{name:"Onderwijsinspectie",endpoint:"http://localhost:8080/rdf4j-workbench/repositories/ivho/query"},{name:"Kennisnet",endpoint:"http://localhost:8080/rdf4j-workbench/repositories/kennisnet/query"}]},t=arguments.length>1?arguments[1]:void 0,n=Object.assign({},e);switch(t.type){case"SET_CURRENT_DATASOURCE":return n.currentDatasource=t.datasource,n;default:return e}}var W=n(36);function G(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;if(t.type.endsWith("_REQUEST")){var n=t.type.replace("_REQUEST",""),r=e[n]||0;return Object(C.a)(Object(C.a)({},e),{},Object(W.a)({},n,r+1))}if(t.type.endsWith("_SUCCESS")||t.type.endsWith("_FAILURE")){var a=t.type.replace("_SUCCESS","").replace("_FAILURE",""),o=e[a]||0;return Object(C.a)(Object(C.a)({},e),{},Object(W.a)({},a,o-1))}return e}function V(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return t.type.endsWith("_FAILURE")?t.error:t.type.endsWith("_REQUEST")?{}:e}function M(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_TEST_SUCCESS":case"FETCH_SPARQL_SUCCESS":return t.result;default:return e}}function K(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{links:[{source:"John",target:"Voetbal",property:"Speelt"},{source:"Voetbal",target:"John",property:"Gespeeld door"},{source:"John",target:"Chip",property:"Heeft vriend"},{source:"Chip",target:"Voetbal",property:"Speelt"}],nodes:[{id:"John"},{id:"Chip"},{id:"Voetbal"}]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_TEST_SUCCESS":var n={links:[],nodes:[]};n.links=[{source:"John",target:"Fussbal",property:"plays"},{source:"John",target:"Chip",property:"Heeft vriend"},{source:"Eric",target:"Footbal",property:"Speelt"},{source:"John",target:"Golf",property:"Speelt"},{source:"Eric",target:"John",property:"Heeft vriend"},{source:"Eric",target:"Chip",property:"Heeft vriend"}],n.links.sort((function(e,t){return e.source>t.source?1:e.source<t.source?-1:e.target>t.target?1:e.target<t.target?-1:0})),console.log(n.links);for(var r=0;r<n.links.length;r++)0!=r&&n.links[r].source==n.links[r-1].source&&n.links[r].target==n.links[r-1].target?n.links[r].linknum=n.links[r-1].linknum+1:n.links[r].linknum=1;var a=[];return n.links.forEach((function(e){a.includes(e.source)||n.nodes.push({id:e.source}),a.includes(e.target)||n.nodes.push({id:e.target}),a.push(e.source),a.push(e.target)})),Object.assign({},n);default:return e}}var Y=function(e){return Object(s.c)({nodes:B,links:I,datasource:J,loading:G,error:V,test:M,data:K,router:Object(i.b)(e)})},z=Object(s.d)(h,Q.instrument(),Object(N.persistState)(function(){var e=window.location.href.match(/[?&]debug=([^&#])\b/);return e&&e.length>0?e[1]:null}()));var X,$=n(30),Z=n(385),ee=n(386),te=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(E.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{className:"Navigation"},a.a.createElement(Z.a,{expand:"lg",fixed:"top"},a.a.createElement(Z.a.Brand,{as:$.a,activeClassName:"notactive",to:"/"},a.a.createElement("img",{width:"100",height:"100",alt:"Logo"}),a.a.createElement("b",null,"React SPARQL Browser")),a.a.createElement(Z.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),a.a.createElement(Z.a.Collapse,{id:"responsive-navbar-nav"},a.a.createElement(ee.a.Link,{as:$.a,exact:!0,activeClassName:"active",to:"/"},"Home"),a.a.createElement(ee.a.Link,{as:$.a,activeClassName:"active",to:"/contact"},"Contact"),a.a.createElement(ee.a.Link,{as:$.a,activeClassName:"active",to:"/graph"},"Graph"))))}}]),n}(a.a.Component),ne=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(E.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{className:"Header"},a.a.createElement("header",null,a.a.createElement(te,null)))}}]),n}(a.a.Component),re=n(382),ae=n(383),oe=n(384),ce=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(E.a)(n,[{key:"render",value:function(){return a.a.createElement("footer",{className:"Footer"},a.a.createElement(re.a,null,a.a.createElement(ae.a,null,a.a.createElement(oe.a,{sm:4}),a.a.createElement(oe.a,{sm:4},a.a.createElement("p",null,"\xa9 React-SPARQL-Browser ",(new Date).getYear()+1900)),a.a.createElement(oe.a,{sm:4}))))}}]),n}(a.a.Component),ie=n(4),le=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(E.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{className:"Home"},a.a.createElement("h2",null,"home"))}}]),n}(a.a.Component),se=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(E.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{className:"Graph"},a.a.createElement("h2",null,"Graph"),a.a.createElement(x,null),a.a.createElement(H,null),a.a.createElement(j,null))}}]),n}(a.a.Component),ue=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(){var e;Object(f.a)(this,n);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).onSubmit=function(){e.props.history.push("/cocktails")},e}return Object(E.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{className:"Contact"},a.a.createElement("h2",null,"Contact form"),a.a.createElement("form",null,a.a.createElement("input",{placeholder:"name",type:"name"}),a.a.createElement("input",{placeholder:"email",type:"email"}),a.a.createElement("button",{onClick:this.onSubmit},"Submit")))}}]),n}(a.a.Component),pe=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(E.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{className:"NotFound"},a.a.createElement("h1",null,"Not Found..."))}}]),n}(a.a.Component),de=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(E.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{className:"PageContent"},a.a.createElement("div",null,a.a.createElement(ie.c,null,a.a.createElement(ie.a,{exact:!0,path:"/",component:le}),a.a.createElement(ie.a,{path:"/home",component:le}),a.a.createElement(ie.a,{path:"/sparql-react-browser/",component:le}),a.a.createElement(ie.a,{path:"/graph",component:se}),a.a.createElement(ie.a,{path:"/contact",component:ue}),a.a.createElement(ie.a,{component:pe}))))}}]),n}(a.a.Component),he=function(e){return e.isLoading&&a.a.createElement("span",null,"Loading...")},me=Object(m.connect)((function(e,t){var n=e.loading;return{isLoading:Object.keys(n).reduce((function(e,t){return!0===e||n[t]>0}),!1)}}))(he),fe=function(e){var t=e.message;return t?a.a.createElement("span",{style:{color:"red"}},"Error: ",t):null},Ee=Object(m.connect)((function(e,t){return{message:e.error&&e.error.message}}))(fe),be=Object(s.e)(Y(d),X,z);be.getState();console.log("initializing store: ",be.getState());be.subscribe((function(){}));var ge=function(){return a.a.createElement(m.Provider,{store:be},a.a.createElement("div",{className:"App"},a.a.createElement(i.a,{history:d},a.a.createElement(ne,null),a.a.createElement(de,null),a.a.createElement(me,null),a.a.createElement(Ee,null),a.a.createElement(ce,null)),!1))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(ge,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[142,1,2]]]);
//# sourceMappingURL=main.aa215857.chunk.js.map