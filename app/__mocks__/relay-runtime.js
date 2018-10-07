import fs from 'fs';
import getNetworkLayer from 'relay-mock-network-layer';

const relayRuntime = jest.genMockFromModule('relay-runtime');


function createNetwork() {
    let data = JSON.parse(fs.readFileSync('__tests__/resources/data.json'));
    let typeDefs = fs.readFileSync('schema.graphql');
    return getNetworkLayer({
        typeDefs,
        // pass custom mocks as documented in graphql-tools
        // http://dev.apollodata.com/tools/graphql-tools/mocking.html#Customizing-mocks
        mocks: {
            campaigns: (id) => {
                if (id != null) {
                    return data.filter((item) => item.id == id);
                }
                return data;
            },
        }
    });
}

relayRuntime.Network = {
    create: createNetwork
};

module.exports = relayRuntime;