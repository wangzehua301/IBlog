import commonStyles from '../style.module.scss';
import styles from './style.module.scss';
import { Input , Button} from 'antd';




const Footer = (props) => {
    // console.log(props,'props')
    const { 
        attributes = {} , changeTempPageChildAttributes , children = [] , changeTempPageChildChildren
    } = props
    //这样解构就是attributes里面不存在对应的属性值，也相当于是定义了两个变量；
    const { copyright , record } =attributes
    // console.log('copyright',copyright)

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

    const changeChildrenItem = ( index , key , value)  => {
        const originItem = children[index];
        //注意下面的分号，没有分号遇到位运算的时候，可能就会发生错误，先使用后定义的错误了。
        const item = {...originItem};
        //兼容之前设计的schema结构，最低层children没有attributes
        (!item.attributes) && (item.attributes  = {});
        item.attributes[key] = value
        const newChildren = [...children]
        newChildren.splice(index,1,item)
        changeTempPageChildChildren(newChildren)
    }

    return (
        <div className={commonStyles.wrapper}>
            <div className={styles.row}>
                <span className={styles.label}>版权信息</span>
                <Input 
                    value={copyright}
                    className={styles.content} 
                    placeholder="请输入版权信息"
                    onChange={(e) => changeTempPageChildAttributes({copyright: e.target.value})}
                />
            </div>
            <div className={styles.row}>
                <span  className={styles.label}>备案信息</span>
                <Input 
                    value={record}
                    className={styles.content} 
                    placeholder="请输入备案信息" 
                    onChange={(e) => changeTempPageChildAttributes({record: e.target.value})}
                />
            </div>
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
                        <div className={styles['area-row']}>
                            <span className={styles.label}>标题</span>
                            <Input 
                                value={attributes?.title}
                                className={styles.content} 
                                placeholder="请输入标题"
                                onChange={(e) => changeChildrenItem(index,'title',e.target.value)}
                            />
                        </div>
                        <div className={styles['area-row']}>
                            <span className={styles.label}>链接</span>
                            <Input 
                                value={attributes?.link}
                                className={styles.content} 
                                placeholder="请输入链接"
                                onChange={(e) => changeChildrenItem(index,'link',e.target.value)}
                            />
                        </div> 
                    </div>
                ))
            }
    </div>
    )
}
export default Footer;