import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';

import Config from 'react-native-config'

function fetchQuery(
  operation,
  variables,
  cacheConfig,
  uploadables,
) {
  return fetch(`${Config.BACKEND_URL}:${Config.BACKEND_PORT}/graphql`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const source = new RecordSource();
const store = new Store(source);
const network = new Network.create(fetchQuery);
const handlerProvider = null;

const environment = new Environment({
  handlerProvider,
  network,
  store
});

exports.environment = environment;
