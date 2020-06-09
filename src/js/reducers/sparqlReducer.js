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

  let rdfGraph;
  switch (action.type) {
    case SPARQL_GET_URI_FROM_LABEL_FULFILLED:
      rdfGraph = cloneGraph(state.rdfGraph);
      action.payload.data.results.bindings.forEach(
        (result) => addTripleToGraph(rdfGraph, action.payload.config.url, result.subject.value, null, null)
      );
      return {
          ...state,
          rdfGraph,
          pendingRequests: state.pendingRequests - 1,
        };
    case SPARQL_GET_TRIPLES_FROM_URI_FULFILLED:
      rdfGraph = cloneGraph(state.rdfGraph);
      action.payload.data.results.bindings.forEach(
        (result) => addTripleToGraph(rdfGraph, action.payload.config.url, action.meta.subject, result.property.value, result.object.value)
      );
      return {
          ...state,
          rdfGraph,
          pendingRequests: state.pendingRequests - 1,
        };
    default:
      return state;
  }
};

const cloneGraph = (rdfGraph) => ({
  nodes: rdfGraph.nodes.slice(),
  links: rdfGraph.links.slice(),
});

const addTripleToGraph = (rdfGraph, source, subject, property, object) => {
  addNodeIfNotExists(rdfGraph.nodes, source, subject);
  if (property != null) {
    const triple = {
      subject,
      property,
      object,
    };
    addLinkIfNotExists(rdfGraph, source, triple);
  }
};

const addLinkIfNotExists = (rdfGraph, source, triple) => {
  let link = findLink(triple, rdfGraph.links);
  if (link == null) {
    if (triple.property === 'http://www.w3.org/2000/01/rdf-schema#label') {
      const node = addNodeIfNotExists(rdfGraph.nodes, triple.subject);
      node.label = triple.object;
      return null;
    } else if (triple.property === 'http://www.w3.org/2000/01/rdf-schema#comment') {
      const node = addNodeIfNotExists(rdfGraph.nodes, triple.subject);
      node.comment = triple.object;
      return null;
    } else {
      addNodeIfNotExists(rdfGraph.nodes, source, triple.object);
      link = {
        source: triple.subject,
        target: triple.object,
        property: triple.property
      };
      rdfGraph.links.push(link);
    }
  }
  return link;
};

const addNodeIfNotExists = (nodes, source, subject) => {
  let node = findNode(subject, nodes);
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

const findNode = (uri, nodes) => (
  nodes.find((d)=> d.uri === uri)
);

const findLink = (triple, links) => (
  links.find((d) =>
    d.source === triple.subject &&
    d.property === triple.property &&
    d.target === triple.object
  )
);

export default sparqlReducer;
