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
    //deltaRdfMap defines which nodes and links are added
    //compared to the previous state
    deltaRdfGrap: {
      nodes: [
      ],
      links: [
      ],
    },
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
  let deltaRdfGrap = {
    nodes: [],
    links: [],
  };
  switch (action.type) {
    case SPARQL_GET_URI_FROM_LABEL_FULFILLED:
      rdfGraph = cloneGraph(state.rdfGraph);
      action.payload.data.results.bindings.forEach(
        (result) => addTripleToGraph(rdfGraph, deltaRdfGrap, action.payload.config.url, result.subject.value, null, null)
      );
      return {
          ...state,
          rdfGraph,
          deltaRdfGrap,
          pendingRequests: state.pendingRequests - 1,
        };
    case SPARQL_GET_TRIPLES_FROM_URI_FULFILLED:
      rdfGraph = cloneGraph(state.rdfGraph);
      action.payload.data.results.bindings.forEach(
        (result) => addTripleToGraph(rdfGraph, deltaRdfGrap, action.payload.config.url, action.meta.subject, result.property.value, result.object.value)
      );
      return {
          ...state,
          rdfGraph,
          deltaRdfGrap,
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

const addTripleToGraph = (rdfGraph, deltaRdfGrap, source, subject, property, object) => {
  addNodeIfNotExists(rdfGraph.nodes, deltaRdfGrap, source, subject);
  if (property != null) {
    const triple = {
      subject,
      property,
      object,
    };
    addLinkIfNotExists(rdfGraph, deltaRdfGrap, source, triple);
  }
};

const addLinkIfNotExists = (rdfGraph, deltaRdfGrap, source, triple) => {
  let link = findLink(triple, rdfGraph.links);
  if (link == null) {
    addNodeIfNotExists(rdfGraph.nodes, deltaRdfGrap, source, triple.object);
    link = {
      source: triple.subject,
      target: triple.object,
      property: triple.property,
    };
    rdfGraph.links.push(link);
    deltaRdfGrap.links.push(link);
  }

  return link;
};

const addNodeIfNotExists = (nodes, deltaRdfGrap, source, subject) => {
  let node = findNode(subject, nodes);
  if (node != null) {
    return node;
  } else {
    node = {
      uri: subject,
      bron: source,
    };
    nodes.push(node);
    deltaRdfGrap.nodes.push(node);
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
