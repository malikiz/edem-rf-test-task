import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles['header-content']}>
        <a href="/" className={styles.logo}>
          <img src="/icons/logo.svg" alt="едем.рф" />
          <span className={styles.logo__text}>
            Лучший способ путешествовать дешевле
          </span>
        </a>
      </div>
    </div>
  );
};

export default Header;
