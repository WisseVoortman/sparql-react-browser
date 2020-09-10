(this["webpackJsonpsparql-react-browser"]=this["webpackJsonpsparql-react-browser"]||[]).push([[0],{226:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(37),c=n.n(o),u=(n(104),n(107),n(5)),s=n(229),i=n(27),l=["SPARQL_GET_URI_FROM_LABEL_PENDING","SPARQL_GET_TRIPLES_FROM_URI_PENDING"],d=["SPARQL_GET_URI_FROM_LABEL_REJECTED","SPARQL_GET_TRIPLES_FROM_URI_REJECTED"],p={pendingRequests:0,rdfGraph:{nodes:[],links:[],deltaRdfGrap:{nodes:[],links:[]}}},E=function(e){return{nodes:e.nodes.slice(),links:e.links.slice()}},f=function(e,t,n,r,a,o){(b(e.nodes,t,n,r),null!=a)&&R(e,t,n,{subject:r,property:a,object:o})},R=function(e,t,n,r){var a=_(r,e.links);return null==a&&(b(e.nodes,t,n,r.object),a={source:r.subject,target:r.object,property:r.property},e.links.push(a),t.links.push(a)),a},b=function(e,t,n,r){var a=m(r,e);return null!=a||(a={uri:r,bron:n},e.push(a),t.nodes.push(a)),a},m=function(e,t){return t.find((function(t){return t.uri===e}))},_=function(e,t){return t.find((function(t){return t.source===e.subject&&t.property===e.property&&t.target===e.object}))},h={currentDatasource:0,datasources:[{name:"Onderwijsregistratie",endpoint:"http://localhost:8080/rdf4j-workbench/repositories/rio/query"},{name:"Basisregistraties",endpoint:"https://data.pdok.nl/sparql"},{name:"Onderwijsinspectie",endpoint:"http://localhost:8080/rdf4j-workbench/repositories/ivho/query"},{name:"Kennisnet",endpoint:"http://localhost:8080/rdf4j-workbench/repositories/kennisnet/query"}]},L={connection:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0,n=Object.assign({},e);switch(t.type){case"SET_CURRENT_DATASOURCE":return n.currentDatasource=t.currentDatasource,n;default:return e}},sparql:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,n=arguments.length>1?arguments[1]:void 0;if(l.includes(n.type))return Object(i.a)({},t,{pendingRequests:t.pendingRequests+1});if(d.includes(n.type))return Object(i.a)({},t,{error:n.payload,pendingRequests:t.pendingRequests-1});var r={nodes:[],links:[]};switch(n.type){case"SPARQL_GET_URI_FROM_LABEL_FULFILLED":return e=E(t.rdfGraph),n.payload.data.results.bindings.forEach((function(t){return f(e,r,n.payload.config.url,t.subject.value,null,null)})),Object(i.a)({},t,{rdfGraph:e,deltaRdfGrap:r,pendingRequests:t.pendingRequests-1});case"SPARQL_GET_TRIPLES_FROM_URI_FULFILLED":return e=E(t.rdfGraph),n.payload.data.results.bindings.forEach((function(t){return f(e,r,n.payload.config.url,n.meta.subject,t.property.value,t.object.value)})),Object(i.a)({},t,{rdfGraph:e,deltaRdfGrap:r,pendingRequests:t.pendingRequests-1});default:return t}},form:s.a},y=Object(u.c)(L),j=n(93),g=n(94),w=n(95),S=Object(u.a)(w.a,g.a,Object(j.createLogger)()),O=Object(u.d)(y,S),v=n(96),T=n.n(v),A=n(97),k=n.n(A),G=function(e){return{type:"SET_CURRENT_DATASOURCE",currentDatasource:e}},I=function(e){return function(t){t({type:"SPARQL_GET_URI_FROM_LABEL_PENDING"}),q('SELECT ?subject WHERE { ?subject <http://www.w3.org/2000/01/rdf-schema#label> "'+e+'"@nl} limit 10',D()).then((function(e){t(function(e){return{type:"SPARQL_GET_URI_FROM_LABEL_FULFILLED",payload:e}}(e)),e.data.results.bindings.forEach((function(e){var n,r;t((n=e.subject.value,r=D(),{type:"SPARQL_GET_TRIPLES_FROM_URI",payload:q("SELECT * WHERE { <"+n+"> ?property ?object }limit 10",r),meta:{subject:n,endpoint:r}}))}))})).catch((function(e){t({type:"SPARQL_GET_URI_FROM_LABEL_REJECTED",payload:e})}))}},D=function(){var e=O.getState(),t=e.connection.currentDatasource;return e.connection.datasources[t].endpoint},q=function(e,t){return T()({method:"post",url:t,data:k.a.stringify({action:"exec",queryLn:"SPARQL",ref:"text",query:e}),headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded; charset=UTF-8"}})};window.store=O,window.setCurrentDatasource=G;var P=n(8),U=function(e){return a.a.createElement("button",{className:"dropdown-item",onClick:e.onClick},e.name)},F=function(){var e=Object(P.c)(),t=Object(P.d)((function(e){return e.connection.currentDatasource})),n=Object(P.d)((function(e){return e.connection.datasources}));return a.a.createElement("div",{className:"setDataSourceDropdown"},a.a.createElement("div",{className:"dropdown show"},a.a.createElement("button",{className:"btn btn-secondary dropdown-toggle",id:"dropdownMenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"Specificeer bron ",t),a.a.createElement("div",{className:"dropdown-menu","aria-labelledby":"dropdownMenuLink"},n.map((function(t,n){return a.a.createElement(U,{key:n,onClick:function(){return e(G(n))},name:t.name})})))))},N=n(228),C=n(227),M=Object(C.a)({form:"search"})((function(e){var t=e.handleSubmit;return a.a.createElement("form",{onSubmit:t},a.a.createElement(N.a,{name:"searchQuery",component:"input",type:"text"}),a.a.createElement("button",{className:"btn btn-primary",type:"submit"},"Search"))})),Q=function(){var e=Object(P.c)();return a.a.createElement(M,{onSubmit:function(t){e(I(t.searchQuery))}})},B=function(){return a.a.createElement("div",null,a.a.createElement("div",{className:"content"},a.a.createElement(F,null),a.a.createElement(Q,null)))};c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(P.a,{store:O},a.a.createElement(B,null))),document.getElementById("root"))},99:function(e,t,n){e.exports=n(226)}},[[99,1,2]]]);
//# sourceMappingURL=main.80f8c116.chunk.js.map