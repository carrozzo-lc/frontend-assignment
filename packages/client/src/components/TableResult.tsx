import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { updateTable } from '../shared/utility';

import {Table, Tag, Button} from "antd";

const GET_POKEMONS = gql`
    query Pokemons($name: String, $after: ID, $limit: Int) {
        pokemons(q: $name, after: $after, limit: $limit) {
            edges {
                node {
                    id
                    name
                    types
                    classification
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }        
        }
    }
`
const GET_POKEMONSBYTYPE = gql`
    query PokemonsByType($type: String!, $after: ID, $limit: Int) {
        pokemonsByType(type: $type, after: $after, limit: $limit) {
            edges {
                node {
                    id
                    name
                    types
                    classification
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`
const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Classification",
        dataIndex: "classification",
        key: "classification",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (type: []) => (
            <>
                {type.map(item => (
                    <Tag color="blue" key={item}>
                        {item}
                    </Tag>
                ))}
            </>
        )       
    },    
];

const TableResult = (props: any) => {
    const[dataTable, setDataTable] = useState([]);
    const isName = props.name ? false : true;
    const isType = props.type ? false : true;

    const {
        data: pData, 
        loading: pLoading, 
        error: pError,
        fetchMore
    } = useQuery(GET_POKEMONS, { 
        variables: { 
            name: props.name,
            limit: 10 
        },
        skip: isName,
        fetchPolicy: "cache-and-network",
        onCompleted: data => {
            const pokemonsData = updateTable(data.pokemons);
            setDataTable(pokemonsData)
        }       
    });

    const {
        data: pdtData, 
        loading: pdtLoading, 
        error: pdtError,
        fetchMore: pdtFetchMore
    } = useQuery(GET_POKEMONSBYTYPE, { 
        variables: { 
            type: props.type,
            limit: 10 
        },
        skip: isType,
        fetchPolicy: "cache-and-network",
        onCompleted: data => {
            const pokemonsByTypeData = updateTable(data.pokemonsByType);
            setDataTable(pokemonsByTypeData)
        }       
    });

    if (pLoading || pdtLoading) {
        return <Table dataSource={dataTable} loading={true} columns={columns} scroll={{ y: 310 }}/>
    }
    if (pError || pdtError) {
        return <p>Error</p>
    }

    let loadMoreBtn = null;
    if(pdtData && pdtData.pokemonsByType.pageInfo.hasNextPage) {
        loadMoreBtn = 
        <Button type="default" size="middle" onClick={() => pdtFetchMore({
            variables: {
                after: pdtData.pokemonsByType.pageInfo.endCursor
            }               
        })}>Load More Results</Button>;
    } else if(pData && pData.pokemons.pageInfo.hasNextPage) {
        loadMoreBtn = 
        <Button type="default" size="middle" onClick={() => fetchMore({
            variables: {
                after: pData.pokemons.pageInfo.endCursor
            }                  
        })}>Load More Results</Button>;
    }

    return (
        <div>
            <Table dataSource={dataTable} columns={columns} scroll={{ y: 310 }}/>
            {loadMoreBtn}         
        </div>
    );
}

export default TableResult;