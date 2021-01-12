import React, { useState } from "react";
import { Layout, Divider} from "antd";
import SearchForm from "../components/SearchForm";
import TableResult from "../components/TableResult";

const { Header, Footer, Content } = Layout;

const Home = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const valueNameSubmitHanler = (value: any) => {
        setName(value.name)
    }

    const valueTypeSubmitHanler = (value: any) => {
        setType(value.type)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <h1>Frontend Assignment by candidate <strong>Luca Carrozzo</strong></h1>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 25, marginBottom: 50 }}>
                <SearchForm valueName={valueNameSubmitHanler} valueType={valueTypeSubmitHanler} />
                <Divider style={{ marginTop: 30, marginBottom: 30  }} />
                <TableResult name={name} type={type} />
            </Content>
            <Footer>Web App by Luca Carrozzo</Footer>
        </Layout>  
    );
}

export default Home;
