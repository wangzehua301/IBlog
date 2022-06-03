import React , { useState , useEffect}from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector , Provider } from 'react-redux';
import HomeManagement from './container/HomeManagement';
import BasicSetting from './container/BasicSetting';
import SchemaSetting from './container/SchemaSetting';
import { HashRouter as Router , Routes , Route , Link } from 'react-router-dom'
import store from './store';
import { initAuthClient , getAuthClient } from "@authing/react-ui-components";
import {parseJsonByString} from '../common/utils.js'
import { getChangeSchemaAction } from './store/action.js';
import Login from './container/Login';
import { getLoginStatus } from './util/login'
import { Layout, Menu } from 'antd';
import axios from 'axios'
import 'normalize.css';
import 'antd/dist/antd.css';
import './style.scss';
import styles from './style.module.scss'

const { Header, Sider, Content } = Layout;

initAuthClient({
  appId:'62510c7b94e095bc30cf1ce1'
})

const useCollapsed = () => {
  const [ collapsed, setCollapsed ]  = useState(false);
  const toggleCollapsed = () => { setCollapsed(!collapsed) };
  return { collapsed, toggleCollapsed }
}

const useStore = () => {
  const dispatch = useDispatch()
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema))
  }
  return {
    changeSchema
  }
}

const Wrapper = () => {
  const { collapsed, toggleCollapsed } = useCollapsed()
  const handleHomePageRedirect = () => {window.location.href = "/code/index.html"}
  const { changeSchema } = useStore();
  const login = getLoginStatus()
  const photo = window.localStorage.photo

  useEffect(() => {
    axios.get('http://127.0.0.1:7001/api/schema/getLatestOne',{
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then((response) => {
      const data = response?.data?.data;
      // console.log(data)
      if(data){
        changeSchema(parseJsonByString(data.schema,{}))
      }
    })
  },[])

  const handleLogout = ()=>{
    getAuthClient().logout()
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('tokenExpiredAt')
    window.localStorage.removeItem('photo')
    window.location.reload()

  }

  return login ? (
    <Router>
      <Layout>
        <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['admin-home']}>
            <Menu.Item key="admin-home">
              <Link to='/'>
                <span className="iconfont">&#xe604;</span>首页内容管理
              </Link>
            </Menu.Item>
            <Menu.Item key="admin-setting">
              <Link to='/setting'>
                <span className="iconfont">&#xe630;</span>基础内容配置
              </Link>
            </Menu.Item>
            <Menu.Item key="schema-setting">
              <Link to='/schema'>
                <span className="iconfont" style={{fontColor:"white"}}>&#xe60f;</span>查看页面schema
              </Link>
            </Menu.Item>
            <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
              <span className="iconfont">&#xe6db;</span>返回用户页面
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            {
              collapsed
                ? <span className='iconfont' onClick={toggleCollapsed}>&#xe62c;</span>
                : <span className='iconfont' onClick={toggleCollapsed}>&#xe629;</span>
            }
            <img  className={styles.avatar} src={photo} alt="avatar" onClick={handleLogout}/>
          </Header>
          <Content className={styles.content}>
            <Routes>
              <Route exact path="/" element={<HomeManagement />} />
              <Route exact path="/setting" element={<BasicSetting />} />
              <Route exact path="/schema" element={<SchemaSetting />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  ):<Login />
}
ReactDOM.render(
  <Provider store={store}>
    <Wrapper />
  </Provider>,
  document.getElementById('root')
);