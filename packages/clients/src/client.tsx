import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const link = new HttpLink({uri: 'http://localhost:4000/'})
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                pokemons: relayStylePagination(),
                pokemonsByType: relayStylePagination()               
            },
        },
    },
});

const client = new ApolloClient({
    link,
    cache
});

export default client;
