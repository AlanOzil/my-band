import styles from './avatar.module.scss'
function avatar() {
  return (
    <div className={styles['avatar-wrapper']} id="mainAvatar">
      <div className={styles['msg-box']}>
        <div className={styles['msg-left']}>
          <div className={styles["title-wrap"]}>
            <div className={styles['title']}>和尘同光乐队</div>
            <span className={styles['tips']}>后摇</span>
            <span className={styles['tips']}>词曲原创</span>
          </div>
          <div className={styles['locate']}>陕西-西安</div>
          <div className={styles['desc']}>2014年成立的后摇乐队</div>
        </div>
        <div className={styles['msg-right']}>
          联系我们
        </div>
      </div>
    </div>
  )
}

export default avatar