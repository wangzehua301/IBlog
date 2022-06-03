import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
//引入库来做排序功能，因此有可能的冲突就是来自于库本身的实现机制
import { SortableContainer } from 'react-sortable-hoc';
import { getAddPageChildrenAction ,getChangePageChildPositionAction} from '../../../../store/action.js';
import AreaItem from '../AreaItem';

import styles from './style.module.scss';

const SortableList = SortableContainer(({ list }) => {
  return (
    <ul className={styles.list}>
      {list.map((item, index) => (
        <AreaItem key={index} index={index} value={index} />
      ))}
    </ul>
  );
});

const AreaList = () => {
  const dispatch = useDispatch();
  const children = useSelector((state) => state.common.schema?.children || []);

  const addPageChildren = () => {
    dispatch(getAddPageChildrenAction())
  }
  //拖拽事件结束是出发，修改store里面的结果,old和new指的是拖拽前后的index值
  const onSortEnd = ({oldIndex, newIndex}) => {
    dispatch(getChangePageChildPositionAction(oldIndex, newIndex))
  }

  //distance指的是判定为拖拽事件的最小位移像素，默认是0，会覆盖点击事件
  //lockAxis指的是拖拽的方向，指定y轴移动，实际上全方位都可以移动
  return (
    <div>
      <SortableList distance={5} lockAxis="y" list={children} onSortEnd={onSortEnd} />
      <Button type="primary" ghost onClick={addPageChildren}>新增页面区块</Button>
    </div>
  );
}

export default AreaList;

  //将该方法传递给子组件使用来改变schema结构
  //这个方法的核心思路是在子组件里改变父组件原有的schema，那么就是父组件里必须有定义供子组件
  //修改父组件的方法，造成功能的耦合，因为这个行为本身应该是写在子组件里面的，换一种思路
  //父组件通过ref获取子组件的schema，子组件的schema由自己定义的方法去修改，这样更加符合设计的基本原则，整体schema就是这样层层获取出来
  //所以changeChildrenItem这个方法得去掉
  // const changeChildrenItem = (index,child) => {
  //   const newChildren = [...children]
  //   newChildren.splice(index,1,child)
  //   setChildren(newChildren)
  // }


  //这个hook的作用：将父组件需要的数据绑定到ref的current属性上，供父组件获取
  // useImperativeHandle(ref,() => {
  //     return{ 
  //       getSchema: () => {
  //         //这个schema其实是个children
  //        const schema = []
  //        children.forEach((item,index) => {
  //           schema.push(refs[index].current.getSchema())
  //        })
  //        return schema
  //       }
  //     }
  // })

