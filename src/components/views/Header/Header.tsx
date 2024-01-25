import MessageIcon from '../../../icons/MessageIcon';
import NotificationIcon from '../../../icons/NotificationIcon';
import styles from './Header.module.css'

const notificationsQuantity = 54
const userName = 'Оксана'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles['header__content']}>
        <a href="/" className={styles.logo}>
          <img src="/icons/logo.svg" alt="едем.рф" />
          <span className={styles.logo__text}>
            Лучший способ путешествовать дешевле
          </span>
        </a>
        <div className={styles.header__panel}>
          <button className={styles['message-button']}>
            <MessageIcon />
          </button>
          <button className={styles['notification-button']}>
            <NotificationIcon />
            <span className={styles['notification-button__tooltip']}>{notificationsQuantity}</span>
          </button>
          <button className={styles['user-avatar']}>
            <img src="/images/female.png" alt="Профиль" />
            {userName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
