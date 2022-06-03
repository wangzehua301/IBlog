import { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Select } from 'antd';
import { cloneDeep } from 'lodash'
import Banner from './components/Banner';
import List from './components/List';
import Footer from './components/Footer'
import { SortableElement } from 'react-sortable-hoc';
import { getChangePageChildAction, getDeletePageChildAction } from '../../../../store/action.js';
import styles from './style.module.scss';

const { Option } = Select;

const map ={ Banner , List , Footer }

//自定义hook--提供一些工具函数
const useStore = (index) => {
  const dispatch = useDispatch();
  const pageChild = useSelector((state) => state.common.schema.children?.[index] || {});
  const changePageChild = (temp) => {
    dispatch(getChangePageChildAction(index, temp));
  }
  const removePageChild = () => {
    dispatch(getDeletePageChildAction(index));
    console.log('deleteIndex',index)
  }
  return { pageChild, changePageChild, removePageChild };
}

const AreaItem = (props) => {
  //可能hoc库里面将index给占用了，换个参数名接受【参数污染】
  const { value: index } = props;
  const { pageChild, changePageChild, removePageChild } = useStore(index);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  //将tempPageChild的初始值赋值为一个pageChild的深拷贝，那么三个子组件里面接受到的参数就没有immer保护了。
  const [ tempPageChild, setTempPageChild ] = useState(cloneDeep(pageChild));


  //拖动后监听pageChild是否发生变化
  useEffect(() => {
    setTempPageChild(cloneDeep(pageChild))
  },[pageChild])

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleModalOk = () => {
    setIsModalVisible(false);
    changePageChild(tempPageChild);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setTempPageChild(cloneDeep(pageChild))
  };

  const handleSelectorChange = (value) => {
    setTempPageChild({ name: value, attributes: {}, children: []});
  }
  
  //可以凭借这个函数无限增加setter的个数，丰富schema的效果
  //这也是一个通用的工具函数，直接传给子组件，那么子组件就可以统一调用这一个方法
  //而不用专门去针对不同的属性，写不同的处理函数但是逻辑类似

  //有props联动的话，可能会在一个事件里面修改多次tempPageChild的值，因此变更一下逻辑，改为对象参数
  const changeTempPageChildAttributes = (kvObject)=> {
    const newTempPageChild = {...tempPageChild}
    for(let key in kvObject){
      newTempPageChild.attributes[key] = kvObject[key]
    }
    setTempPageChild(newTempPageChild)
  }

  //更改schema里面的children--List组件
  const changeTempPageChildChildren = (children)=> {
    const newTempPageChild = {...tempPageChild}
      newTempPageChild.children = children
    setTempPageChild(newTempPageChild)
  }  

  //获取当前物料组件的setter,注意全局变量局部变量的作用预区别
  const getCurrentComponent = () => {
    const { name } = tempPageChild
    const Component = map[name]
    return Component ? 
            <Component 
            {...tempPageChild} 
            setTempPageChild={setTempPageChild}
            changeTempPageChildAttributes={changeTempPageChildAttributes}
            changeTempPageChildChildren={changeTempPageChildChildren}
            /> :
            null
  }
  return (
    <li className={styles.item}>
      <span
        className={styles.content}
        onClick={showModal}
      >{pageChild.name ? pageChild.name + ' 组件' : '当前区块内容为空'}</span>
      <span className={styles.delete}>
        <Button onClick={removePageChild} size="small" type="dashed" danger>删除</Button>
      </span>
      <Modal 
        title="选择组件" 
        visible={isModalVisible} 
        onOk={handleModalOk} 
        onCancel={handleModalCancel}
        bodyStyle={{maxHeight: 600 , overflowY:"scroll"}}
      >
        <Select value={tempPageChild.name} className={styles.selector} style={{ width: '100%' }} onChange={handleSelectorChange}>
          <Option value='Banner'>Banner 组件</Option>
          <Option value='List'>List 组件</Option>
          <Option value='Footer'>Footer 组件</Option>
        </Select>
        {getCurrentComponent()}
      </Modal>
    </li>
  )
}

export default SortableElement(AreaItem);
