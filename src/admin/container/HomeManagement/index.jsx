import { useState } from 'react';
import {Button } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import AreaList from './component/AreaList';
import styles from './style.module.scss';
import { parseJsonByString } from '../../../common/utils';
import { getChangeSchemaAction } from '../../store/action.js'


//将对store的逻辑，修改和查询，用自定义的hook封装一下
const useStore = () => {
  //获取一个dispatch方法,修改store
  const dispatch = useDispatch()
  //取得store里面的所有数据
  const schema = useSelector((state) => {
    return state.common.schema
  })
  //定义一个修改store的方法
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema))
  }
  return {
    schema,
    changeSchema
  }
}


const HomeManagement = () => {
  const { changeSchema , schema } = useStore()
  
  const handleSaveBtnClick = () => {
      // window.localStorage.schema = JSON.stringify(schema)
      const { token } = window.localStorage
      axios.post('http://localhost:7001/api/schema/save',{
        schema: JSON.stringify(schema)
      },{
        headers:{
          token
        }
      }).then(() => {})
      console.log('点击了保存')
  }
  
  //
  const handleResetBtnClick = () => {
    //获取最新的已经保存完的schema
    // changeSchema(parseJsonByString(window.localStorage.schema,{}) )
    axios.get('http://localhost:7001/api/schema/getLatestOne',{
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      
    }).then((response) => {
      const data = response?.data?.data;
      if(data){
        changeSchema(parseJsonByString(data.schema,{}))
      }
  })}

  return (
          <div>
            <AreaList />
            <div className={styles.buttons}>
              <Button type="primary" onClick={handleSaveBtnClick}>保存区块配置</Button>
              <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>重置区块配置</Button>
            </div>
          </div>
        
  );
}

export default HomeManagement; 