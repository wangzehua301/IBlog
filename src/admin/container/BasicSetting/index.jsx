import { useCallback } from 'react';
import axios from 'axios';
import {Button , Input } from 'antd';
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


const BasicSetting = () => {
  const { changeSchema , schema = {} , changeAttributes } = useStore()
  const { attributes = {} } = schema;
  const { title='' } = attributes
  
  const handleSaveBtnClick = () => {
    const { token } = window.localStorage
    axios.post('http://localhost:7001/api/schema/save',{
      schema: JSON.stringify(schema)
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
      }
    })
  }
  //直接写也可以得到e事件
  //使用useCallback可以优化性能，因为每次刷新页面都会重新建立这个函数，加上usecallback就可以在依赖没有改变的情况下可以实现缓存。
  const handleTitleChange = (e) => {
    changeAttributes('title' , e.target.value)
  }
  return (
          <div>
            <div className={styles.row}>
              <div className={styles.title}>页面标题:</div>
              <div className={styles.content}>
                <Input value={title} onChange={handleTitleChange}/>
              </div>
            </div>
            <div className={styles.buttons}>
              <Button type="primary" onClick={handleSaveBtnClick}>保存基础配置</Button>
              <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>重置基础配置</Button>
            </div>
          </div>
        
  );
}

export default BasicSetting;
