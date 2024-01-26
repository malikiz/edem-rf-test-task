import OdnoklassnikiIcon from '../../../icons/OdnoklassnikiIcon';
import TelegramIcon from '../../../icons/TelegramIcon';
import VkIcon from '../../../icons/VkIcon';
import Link from '../../units/Link';
import styles from './Footer.module.scss'

const Footer = () => {
  console.log('render footer');

  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__navigation}>
          <div className={styles.footer__frame}>
            <Link href="#">
              О проекте
            </Link>
            <Link href="#">
              Блог
            </Link>
            <Link href="#">
              Безопасность
            </Link>
          </div>
          <div className={styles.footer__frame}>
            <Link href="#">
              Способы оплаты
            </Link>
            <Link href="#">
              Обратная связь
            </Link>
            <Link href="#">
              Вопросы и ответы
            </Link>
          </div>
          <div className={styles.footer__frame}>
            <Link href="#">
              Автовокзалы России
            </Link>
            <Link href="#">
              Автобусные направления
            </Link>
            <Link href="#">
              Расписание автобусов
            </Link>
          </div>
          <div className={styles.footer__frame}>
            <Link href="#">
              Популярные маршруты
            </Link>
            <Link href="#">
              СМИ и Рекламодателям
            </Link>
          </div>
          <div className={styles.footer__right}>
            <div className={styles.footer__frame}>
              <Link href='#'>
                <img src="/icons/appStore.svg" alt="Загрузить в App Store" />
              </Link>
              <Link href='#'>
                <img src="/icons/googlePlay.svg" alt="Загрузить в Google Play" />
              </Link>
            </div>
            <div className={styles.footer__socials}>
              <Link href='#'>
                <VkIcon />
              </Link>
              <Link href='#'>
                <OdnoklassnikiIcon />
              </Link>
              <Link href='#'>
                <TelegramIcon />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <span>
            © 2022 ООО «КОНТЕНТ»
          </span>
          <Link href='#'>
            Политика конфиденциальности
          </Link>
          <Link href='#'>
            Пользовательское соглашение
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
