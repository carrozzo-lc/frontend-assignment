# Assignment for Frontend Position

This project is powered by `yarn` and workspaces.
Once cloned this project can be installed with `yarn install`.  
You can run scripts on client with `yarn workspace @frontend-assignment/client <command>`, and on server with `yarn workspace @frontend-assignment/server <command>`.  
For the server you can start the the app with `yarn workspace @frontend-assignment/server start`.

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