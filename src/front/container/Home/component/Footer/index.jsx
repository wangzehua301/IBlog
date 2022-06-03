import styles from './style.module.scss';

const Footer = ({ schema }) => {
  //渲染哪个组件，就会接收到哪个组件对应的schema，footer里面schema里面attributes和children都要渲染
  
  const { attributes={} , children = [] } = schema
  const { copyright , record } = attributes

  return (
    <div className="wrapper">
      <div className={styles.footer}>
        <ul className={styles.list}>
        {
          children.map((item,index) => {
            const { attributes = {} } = item
            const { title , link } = attributes
             return (
              <li className={styles.item}>
                <a className={styles.link} href={link}>{title}</a>
              </li>
              )
          })
        }
        </ul>
        <div className={styles.copyright}>{copyright} {record}</div>
      </div>
    </div>
  );
}

export default Footer;