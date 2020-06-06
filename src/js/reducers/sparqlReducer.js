import {
SPARQL_GET_URI_FROM_LABEL_FULFILLED,
SPARQL_GET_TRIPLES_FROM_URI_FULFILLED,
SPARQL_REJECTED_REQUESTS_LIST,
SPARQL_PENDING_REQUESTS_LIST } from '../constants/action-types';

const initialSparqlState = {
  pendingRequests: 0,
  rdfGraph: {
    nodes: [

      //{"uri": ... , "bron": ..., label:....},
    ],
    links: [

      //{"source": ... , "target": ... , "property" : ... },
    ],
  },
};

export const sparqlReducer = (state=initialSparqlState, action) => {
  let rdfGraph = {
    nodes: state.rdfGraph.nodes.slice(),
    links: state.rdfGraph.links.slice(),
  };

  if (SPARQL_PENDING_REQUESTS_LIST.includes(action.type)) {
    return {
      ...state,
      pendingRequests: state.pendingRequests + 1,
    };
  } else if (SPARQL_REJECTED_REQUESTS_LIST.includes(action.type)) {
    return {
      ...state,
      error: action.payload,
      pendingRequests: state.pendingRequests - 1,
    };
  }

  switch (action.type) {
    case SPARQL_GET_URI_FROM_LABEL_FULFILLED:
      let requestUrl = action.payload.config.url;
      action.payload.data.results.bindings.forEach(
        (result) => addTripleToGraph(rdfGraph, requestUrl, result.subject.value, null, null)
      );
      return {
          ...state,
          rdfGraph,
          pendingRequests: state.pendingRequests - 1,
        };
    case SPARQL_GET_TRIPLES_FROM_URI_FULFILLED:
      requestUrl = action.payload.config.url;
      return state;
    default:
      return state;
  }
};

const addTripleToGraph = (rdfGraph, source, subject, property, object) => {
  addNodeIfNotExists(rdfGraph.nodes, source, subject);
};

const addNodeIfNotExists = (nodes, source, subject) => {
  var node = findNode(subject, nodes);
  if (node != null) {
    return node;
  } else {
    node = {
      uri: subject,
      bron: source,
    };
    nodes.push(node);
  }

  return node;
};

const findNode = (uri, nodes) => {
  nodes.find((d)=> d.uri === uri);
};

export default sparqlReducer;
