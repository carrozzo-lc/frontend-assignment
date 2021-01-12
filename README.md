# Assignment for Frontend Position

## Introduction

For this assignment what you will build is a simple page (and a server app) for querying and filtering a dataset of Pokémons.  
The Pokèmons dataset is harcoded inside the project.

The server app will be powered by Node.js, `typescript` and [`apollo-server`](https://www.apollographql.com/docs/apollo-server/) and it is partially implemented.  
The client app will be powered by `typescript`, `react`, [`apollo-client`](https://www.apollographql.com/docs/react/) and [`antd`](https://ant.design/) and you will build it from scratch.

You can add other libraries if needed; if you are not confident with some of this libraries you can pick alternatives.  
For the client side app we recommend to use `webpack`.

## App set up

This project is powered by `yarn` and workspaces.  
Once cloned this project can be installed with `yarn install`.  

For the server you can start the the app with `yarn workspace @frontend-assignment/server start`.
For the client you can start the the app with `yarn workspace @frontend-assignment/client start`.

## Tasks Done for the assignment

### Server side

The server schema follows the [relay](https://facebook.github.io/relay/graphql/connections.htm) standard for connection, simplified.

Implement `pokemonsByType` query: it accepts a `type: String` parameter and return a connection of Pokèmons.  
If you feel confident you can add pagination parameters `after: String` and `limit: Int`.

### Client side

Use components in `antd` library to create a page with this capabilities:

- possibility to search Pokémons by name
- possibility to filter Pokémons by type
- display Pokémons search result in a table with columns:
  - name
  - type
  - classification
- if `hasNextPage` is true add the possibility to load more results.