import commonStyles from '../style.module.scss';
import styles from './style.module.scss';
import { Input , Switch } from 'antd';

const { TextArea } = Input



const Banner = (props) => {
    // console.log(props,'props')
    const { attributes = {} , changeTempPageChildAttributes} = props
    const { title , description , showSmallPic , 
        smallPicUrl , backgroundHeight ,
        backgroundUrl} =attributes

    const handleShowSmallPicChange = (checked) => {
        if(!checked){
            changeTempPageChildAttributes({
                showSmallPic: checked,
                smallPicUrl: ''
            })
        }else{
            changeTempPageChildAttributes({showSmallPic: checked})
        }

    }

    return (
        <div className={commonStyles.wrapper}>
            <div className={styles.row}>
                <span className={styles.label}>页面标题</span>
                <Input 
                    value={title}
                    className={styles.content} 
                    placeholder="请输入页面标题"
                    onChange={(e) => changeTempPageChildAttributes({title: e.target.value})}
                />
            </div>
            <div className={styles.row}>
                <span  className={styles.label}>页面描述</span>
                <TextArea 
                    value={description}
                    className={styles.content} 
                    rows={2} placeholder="请输入页面描述" 
                    onChange={(e) => changeTempPageChildAttributes({description: e.target.value})}
                />
            </div>
            <div className={styles.row}>
                <span  className={styles.label}>展示小图</span>
                <Switch checked={showSmallPic} onChange={handleShowSmallPicChange}/>
            </div>
            { 
                showSmallPic ? (
                    //props联动
                    <div className={styles.row}>
                        <span className={styles.label}>小图链接</span>
                        <Input 
                            value={smallPicUrl}
                            className={styles.content} 
                            placeholder="请输入小图链接"
                            onChange={(e) => changeTempPageChildAttributes({smallPicUrl: e.target.value})}
                        />
                    </div>
                ) : null
            }
            
            <div className={styles.row}>
                <span className={styles.label}>背景链接</span>
                <Input 
                    value={backgroundUrl}
                    className={styles.content} 
                    placeholder="请输入背景图链接"
                    onChange={(e) => changeTempPageChildAttributes({backgroundUrl: e.target.value})}
                />
            </div>
            <div className={styles.row}>
                <span className={styles.label}>背景高度</span>
                <Input 
                    //限制输入框的写入类型--number
                    type='number'
                    value={backgroundHeight}
                    className={styles.content} 
                    placeholder="请输入背景图高度像素值"
                    onChange={(e) => changeTempPageChildAttributes({backgroundHeight: e.target.value})}
                />
            </div>
    </div>
    )
}
export default Banner;