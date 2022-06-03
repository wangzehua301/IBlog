import axios from 'axios';
import { useState ,useEffect } from 'react';
import { parseJsonByString } from '../../../common/utils';
import Banner  from './component/Banner';
import Footer  from './component/Footer';
import { Helmet } from 'react-helmet'
import List  from './component/List';


//像极了lowcode里面的componentMap映射表
const map = { Banner , Footer , List}

//渲染器,按照组件名返回组件即可
//即是，如果是banner组件，那么schema就是banner的schema，是list就是list的schema
const render = (index,item) => {
  const Component = map[item.name]
  return Component ? <Component key={index} schema={item}/> : null
}

const Home = () => {
  //获取schema,进行渲染
  const [ pageSchema , setPageSchema ] = useState({})
  const { children = [] , attributes = {}} = pageSchema

  useEffect(() => {
    axios.get('http://localhost:7001/api/schema/getLatestOne',{
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then((response) => {
      const data = response?.data?.data;
      if(data){
        setPageSchema(parseJsonByString(data.schema,{}))
      }
      console.log('请求的数据',data)
    })
  },[])
  return (
    <div>
    <Helmet><title>{attributes?.title}</title></Helmet>
      {children.map((item,index) => {
        return render(index,item)
      })}
    </div>
  );
}

export default Home;
  