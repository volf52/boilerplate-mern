import Dashboard from 'components/app/Dashboard';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import Landing from 'components/layout/Landing';
import NavbarMain from 'components/layout/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from 'store';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component<any, { collapsed: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <NavbarMain />
                        <Layout>
                            <Sider
                                width={200}
                                style={{ background: '#fff' }}
                                trigger={null}
                                collapsible
                                collapsed={this.state.collapsed}>
                                <Menu
                                    mode='inline'
                                    inlineCollapsed={this.state.collapsed}>
                                    <Menu.Item key='1'>
                                        <Icon type='pie-chart' />
                                        <span>Option 1</span>
                                    </Menu.Item>
                                    <Menu.Item key='2'>
                                        <Icon type='desktop' />
                                        <span>Option 2</span>
                                    </Menu.Item>
                                    <Menu.Item key='3'>
                                        <Icon type='inbox' />
                                        <span>Option 3</span>
                                    </Menu.Item>
                                    <SubMenu
                                        key='sub1'
                                        title={
                                            <span>
                                                <Icon type='mail' />
                                                <span>Navigation One</span>
                                            </span>
                                        }>
                                        <Menu.Item key='5'>Option 5</Menu.Item>
                                        <Menu.Item key='6'>Option 6</Menu.Item>
                                        <Menu.Item key='7'>Option 7</Menu.Item>
                                        <Menu.Item key='8'>Option 8</Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key='sub2'
                                        title={
                                            <span>
                                                <Icon type='appstore' />
                                                <span>Navigation Two</span>
                                            </span>
                                        }>
                                        <Menu.Item key='9'>Option 9</Menu.Item>
                                        <Menu.Item key='10'>
                                            Option 10
                                        </Menu.Item>
                                        <SubMenu key='sub3' title='Submenu'>
                                            <Menu.Item key='11'>
                                                Option 11
                                            </Menu.Item>
                                            <Menu.Item key='12'>
                                                Option 12
                                            </Menu.Item>
                                        </SubMenu>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Layout style={{ padding: '0 24px 24px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Icon
                                        className='trigger'
                                        type={
                                            this.state.collapsed
                                                ? 'menu-unfold'
                                                : 'menu-fold'
                                        }
                                        onClick={this.toggle}
                                    />
                                    <span>{'  '}</span>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>List</Breadcrumb.Item>
                                    <Breadcrumb.Item>App</Breadcrumb.Item>
                                </Breadcrumb>
                                <Content
                                    style={{
                                        background: '#fff',
                                        padding: 24,
                                        margin: 0,
                                        minHeight: 280,
                                    }}>
                                    <Route exact path='/' component={Landing} />
                                    <Route
                                        exact
                                        path='/register'
                                        component={Register}
                                    />
                                    <Route
                                        exact
                                        path='/login'
                                        component={Login}
                                    />
                                    <Switch>
                                        <PrivateRoute
                                            exact
                                            path='/dashboard'
                                            component={Dashboard}
                                        />
                                        />
                                    </Switch>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
