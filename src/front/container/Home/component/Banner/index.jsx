import styles from './style.module.scss';

//src:https://serverless-project-static-files.oss-cn-beijing.aliyuncs.com/images/avatar.jpeg

const Banner = ({schema}) => {
  const { attributes={} } = schema
  const { title , description , showSmallPic , backgroundUrl ,
        smallPicUrl , backgroundHeight
      } = attributes

  //配置背景图片和背景图片的高度，需要覆盖已有的样式，因此选择样式覆盖
  const wrapperStyleObj = backgroundUrl ? {backgroundImage: `url('${backgroundUrl}')`} : {}
  backgroundHeight && (wrapperStyleObj.height = parseInt(backgroundHeight,10))

  // console.log(wrapperStyleObj)
  return (
    <div className="wrapper">
      <div className={styles.banner} style={wrapperStyleObj}>
        <div className={styles.person}>
        {
          (showSmallPic && smallPicUrl)
           ? 
          <img className={styles.avatar} src={smallPicUrl} alt="" />
           : 
          null
        }
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;