import { useCallback , useState } from 'react';
import axios from 'axios';
import {Button , Input , textArea } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.scss';
import { parseJsonByString } from '../../../common/utils';
import { getChangeSchemaAction , getChangePageAttributesAction} from '../../store/action.js';



const useStore = () => {
  const dispatch = useDispatch()
  const schema = useSelector((state) => {
    return state.common.schema
  })
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema))
  }
  const changeAttributes = (key , value) => {
    dispatch(getChangePageAttributesAction(key,value))
  }
  return {
    schema,
    changeSchema,
    changeAttributes
  }
}


const SchemaSetting = () => {
  const { changeSchema , schema = {} , changeAttributes } = useStore()
  const [text , setText] = useState(JSON.stringify(schema,null,"\t"))
  const { attributes = {} } = schema;
  // const { title='' } = attributes
  
  const handleSaveBtnClick = () => {
    const { token } = window.localStorage
    const textArea = document.getElementById('schemaArea')
    console.log("textarea", JSON.stringify(JSON.parse(textArea.value))  )
    axios.post('http://localhost:7001/api/schema/save',{
      schema: textArea.value
    },{
      headers:{
        token
      }
    }
    ).then(() => {})
  }
  
  const handleResetBtnClick = () => {
    axios.get('http://localhost:7001/api/schema/getLatestOne',{
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
     
    }).then((response) => {
      const data = response.data.data;
      if(data){
        changeSchema(parseJsonByString(data.schema,{}))
        setText(JSON.stringify(parseJsonByString(data.schema,{}),null,"\t"))
      }
    })
  }
  //直接写也可以得到e事件
  //使用useCallback可以优化性能，因为每次刷新页面都会重新建立这个函数，加上usecallback就可以在依赖没有改变的情况下可以实现缓存。
  const handleSchemaChange = (e) => {
    // changeAttributes('title' , e.target.value)
    changeSchema(parseJsonByString(JSON.stringify(e.target.value,null,"\t"),{}))
    // console.log('textarea',textArea)
    const newText =JSON.parse(e.target.value) 
    setText(JSON.stringify(newText,null,"\t"))
  }
  return (
          <div>
            <div className={styles.row}>
              <div className={styles.title}>schema结构:</div>
              <div className={styles.content}>
                <Input.TextArea id='schemaArea' rows={70} value={text} onChange={handleSchemaChange}/>
              </div>
            </div>
            <div className={styles.buttons}>
              <Button type="primary" onClick={handleSaveBtnClick}>保存schema配置</Button>
              <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>重置schema配置</Button>
            </div>
          </div>
        
  );
}

export default SchemaSetting;
