import React, { useState } from "react";
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const GET_POKEMONS = gql`
    query Pokemons {
        pokemons(limit:151) {
            edges {
                node {
                    types
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }                   
        }
    }
`

const SearchForm = (props: any) => {
    const [formName] = Form.useForm();
    const [formType] = Form.useForm();
    const [options, setOptions] = useState([]);

    const {loading, error} = useQuery(GET_POKEMONS, {
        onCompleted: data => {
            const edgesData = data.pokemons.edges.map((item: any) => item.node.types);
            let arr: any = [];
            edgesData.forEach((el: any) => {
                el.forEach((childEl: any) => {
                    arr.push(childEl)
                })
                return arr;
            })
            const optionsArr = arr.filter((item: string, index: number) => {
                return arr.indexOf(item) === index;
            })
            setOptions(optionsArr)
        }
    });  

    const onTypeChange = (value: string) => {
        formName.resetFields();
    };

    const onNameChange = (value: any) => {
        formType.resetFields();
    }

    if (loading) {
        return <p>Loading</p>
    }
    if (error) {
        return <p>Error</p>
    }  

    return (
        <div>
            <Form form={formName} layout="inline" name="control-hooks" onFinish={props.valueName}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input style={{ width: 190 }} placeholder="Insert a Pokemon name" onChange={onNameChange}/>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !formName.isFieldsTouched(true) ||
                            !!formName.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                        >
                        Search by name
                        </Button>
                    )}
                </Form.Item>                  
            </Form>

            <div style={{ margin: '20px 0' }}></div>   

            <Form layout="inline" form={formType} name="control-hooks" onFinish={props.valueType}>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Select
                        style={{ width: 196 }}
                        placeholder="Select a Pokemon type"
                        onChange={onTypeChange}
                        allowClear
                    >
                        {options.map((item: any, index: number) => (
                            <Option key={index} value={item}>
                                {item}
                            </Option>
                        ))}                        
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !formType.isFieldsTouched(true) ||
                            !!formType.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                        >
                        Filter by Type
                        </Button>
                    )}
                </Form.Item>                
            </Form>  
        </div>
    );
};

export default SearchForm;
