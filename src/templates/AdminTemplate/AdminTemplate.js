import { useState,useEffect } from "react";
import React from "react";
import { Route, Redirect } from "react-router";
import { Layout, Menu, Popconfirm, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraAddOutlined,
    ScheduleOutlined,
    FileAddOutlined,
    HomeOutlined

} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { TOKEN, USER_LOGIN } from "../../utilities/settings/config";
import { history } from "../../App";
const { Header, Sider, Content } = Layout;

export function AdMinTemplate(props) {

    const [state, setState] = useState({
        collapsed: false,
    })

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };
    const account = JSON.parse(localStorage.getItem(USER_LOGIN));

    const { Component, ...resParams } = props

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    
    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền vào trang này')
        return <Redirect to='/home'></Redirect>
    }

    if (JSON.parse(localStorage.getItem(USER_LOGIN)).maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền vào trang này')
        return <Redirect to='/home'></Redirect>
    }

   

    return <Route {...resParams} render={(propRoute) => {
        return <>
            <Layout className='h-screen'>
                <Sider className='fixed top-0 left-0' trigger={null} collapsible collapsed={state.collapsed}>
                    <div className="logo py-4">
                        <img style={{ height: '25px',width: '65%',margin: '0 auto', objectFit: 'cover' }} src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' alt='cyber-logo'></img>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key='1' icon={<UserOutlined style={{fontSize: '18px'}}/>} >
                            <NavLink className= 'text-lg' to='/admin/dashboard'>DashBoard</NavLink>
                        </Menu.Item>
                        <SubMenu className="text-lg" key="sub1" icon={<VideoCameraAddOutlined style={{fontSize: '18px'}} />} title="Films">
                            <Menu.Item key='20' icon={<FileAddOutlined />}>
                                <NavLink to='/admin/films'>Film</NavLink>
                            </Menu.Item>
                            <Menu.Item key='21' icon={<FileAddOutlined />}>
                                <NavLink to='/admin/films/addfilm'>Add Film</NavLink>
                            </Menu.Item>

                        </SubMenu>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="flex items-center justify-between" style={{ padding: '32px 0', paddingRight: '56px', background: 'white' }}>

                        {state.collapsed ? <MenuUnfoldOutlined className='trigger text-xl' onClick={toggle} /> : <MenuFoldOutlined className='text-xl trigger' onClick={toggle} />}

                        <div className="flex items-center text-lg" >
                            <div className="mr-14 flex items-center cursor-pointer" onClick={() => {
                                history.push('/home')
                            }}>
                                <HomeOutlined className="text-2xl mr-2" style={{ color: '#5F6368' }} />
                                <h1 style={{  color: '#5F6368' }} className=" mb-0">Quay Về Trang Chủ</h1>

                            </div>
                            {/* <div className="flex items-center cursor-pointer "> */}

                            <Popconfirm title='Bạn có muốn đăng xuất ?' placement="topRight" onConfirm={() => {

                                localStorage.removeItem(USER_LOGIN)
                                localStorage.removeItem(TOKEN)
                                history.push('/login')

                            }} okText="yes" cancelText="No">
                                <div className="flex items-center cursor-pointer ">
                                    <img className="rounded-full" src='https://picsum.photos/35/35' alt='hinhanh'></img>
                                    <span style={{color: '#5F6368'}}>{account.taiKhoan}</span>
                                </div>
                            </Popconfirm>

                            {/* </div> */}

                        </div>

                    </Header>
                    <Content
                        className="site-layout-background overflow-y-auto h-full"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            paddingTop: 0,
                            minHeight: 280,
                        }}
                    >

                        < div className='py-4 bg-white'><Component {...propRoute} /></div>
                    </Content>
                </Layout>
            </Layout>

        </>

    }}>
    </Route>
}