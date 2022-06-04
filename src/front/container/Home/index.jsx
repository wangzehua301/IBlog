import { useState ,useEffect } from 'react';
import { parseJsonByString } from '../../../common/utils';
import Banner  from './component/Banner';
import Footer  from './component/Footer';
import List  from './component/List';
import schema from '../../../common/schema';



//componentMap映射表
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
  const [isLogin , setlogin] = useState(false)
  const { children = [] , attributes = {}} = pageSchema

  useEffect(() => {
      setPageSchema(schema)
  },[])

  const handleLogin = () => {
    setlogin(true)
    document.body.style.backgroundColor = "white"
  }

  console.log('执行一次')

  return (
      isLogin ? 
        <div>
        {children.map((item,index) => {
          return render(index,item)
        })}
      </div>
      :
      <>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"200px"}}>
        <img 
        src="http://serverless-project-static-file123.oss-cn-beijing.aliyuncs.com/images/IBlog.png" alt="logo"
        style={{width:"200px",borderRadius:"10px",
        }}
        />
      </div><br/>
      <h2 style={{textAlign:"center"}}>Welcome, IBloger</h2>
      <a href='javascript:;' style={{textDecoration:"none",textAlign:"center",display:"block"}} onClick={handleLogin} >Click Here To Continue </a>
      </>
  );
}

export default Home;
  