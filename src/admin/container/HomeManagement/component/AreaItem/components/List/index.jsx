import styles from './style.module.scss';
import commonStyles from '../style.module.scss';
import { Input , Button} from 'antd';




const List = (props) => {
    // console.log(props,'props')
    const { children = [] , changeTempPageChildChildren } = props

    const addItemToChildren = () => {
        //浅拷贝一份children
        const newChildren = [...children]
        newChildren.push({
            name: "Item",
            attributes: {
                title: '',
                description: '',
                imageUrl: '',
                link: ''
            },
            children: []
        })
        changeTempPageChildChildren(newChildren)
    }

    
    const deleteItemFromChildren = (index) => {
        const newChildren = [...children]
        newChildren.splice(index,1)
        changeTempPageChildChildren(newChildren)
    }

    //配置单个list表单，来更改List组件里面schema里面的children的方法
    const changeChildrenItem = ( index , key , value)  => {
        // console.log(children)
        const originItem = children[index];
        //注意下面的分号，没有分号遇到位运算的时候，可能就会发生错误，先使用后定义的错误了。
        const item = {...originItem};
        //兼容之前设计的schema结构，最低层children没有attributes
        (!item.attributes) && (item.attributes  = {});
        item.attributes[key] = value
        //之前应用了immer，可能让schema里面的children成为了不可变更的--报错read only
        const newChildren = [...children]
        newChildren.splice(index,1,item)
        changeTempPageChildChildren(newChildren)
    }

    return (
        <div className={commonStyles.wrapper}>
            <Button 
            type='primary' 
            className={styles.button}
            onClick={addItemToChildren}
            >新增列表项</Button>
            {
                //双重结构依然会有初始值的问题{attributes : {title,...}}
                children.map((
                    { attributes },
                    index) => (
                    <div className={styles.area} key={index}>
                        <div className={styles.delete} onClick={() => deleteItemFromChildren(index)}>X</div>
                        <div className={styles.row}>
                            <span className={styles.label}>标题</span>
                            <Input 
                                value={attributes?.title}
                                className={styles.content} 
                                placeholder="请输入标题"
                                onChange={(e) => changeChildrenItem(index,'title',e.target.value)}
                            />
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>描述</span>
                            <Input 
                                value={attributes?.description}
                                className={styles.content} 
                                placeholder="请输入描述"
                                onChange={(e) => changeChildrenItem(index,'description',e.target.value)}
                            />
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>图片</span>
                            <Input 
                                value={attributes?.imageUrl}
                                className={styles.content} 
                                placeholder="请输入图片地址"
                                onChange={(e) => changeChildrenItem(index,'imageUrl',e.target.value)}
                            />
                            </div>
                        <div className={styles.row}>
                            <span className={styles.label}>链接</span>
                            <Input 
                                value={attributes?.link}
                                className={styles.content} 
                                placeholder="请输入跳转链接"
                                onChange={(e) => changeChildrenItem(index,'link',e.target.value)}
                            />
                        </div>
                    </div>
                ))
            }
            
    </div>
    )
}
export default List;