import React, { useState } from "react";
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import TableResult from "../components/TableResult";
import { Layout, Divider, Form, Input, Button, Select} from "antd";

const { Option } = Select;
const { Header, Footer, Content } = Layout;

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

const Home = () => {
    const [formName] = Form.useForm();
    const [formType] = Form.useForm();
    const [options, setOptions] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const {data, loading, error} = useQuery(GET_POKEMONS, {
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
        setName('')
    };

    const onNameChange = (value: any) => {
        formType.resetFields();
        setType('')
    }        

    const onFinishName = (value: any) => {
        setName(value.name)
    }

    const onFinishType = (value: any) => {
        setType(value.type)
    }

    let optionFields = null;
    if (loading) { optionFields = <Option value="loading">loading</Option> }
    if (error) { optionFields = <Option value="error">Error</Option> }
    if (data) {
        optionFields = options.map((item: any, index: number) => {
            return <Option key={index} value={item}>{item}</Option>;
        });
    } 

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <h1>Frontend Assignment by candidate <strong>Luca Carrozzo</strong></h1>
            </Header>

            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 25, marginBottom: 50 }}>
            
                <Form form={formName} layout="inline" name="control-hooks" onFinish={onFinishName}>
                    <Form.Item name="name" label="Name">
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
                <Form layout="inline" form={formType} name="control-hooks" onFinish={onFinishType}>
                    <Form.Item name="type" label="Type">
                        <Select
                            style={{ width: 196 }}
                            placeholder="Select a Pokemon type"
                            onChange={onTypeChange}
                            allowClear
                        >
                            {optionFields}                        
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
                
                <Divider style={{ marginTop: 30, marginBottom: 30  }} />

                <TableResult name={name} type={type} />
            </Content>

            <Footer>Web App by Luca Carrozzo</Footer>
        </Layout>  
    );
}

export default Home;
