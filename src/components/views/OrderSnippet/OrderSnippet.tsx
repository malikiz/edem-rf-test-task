import styles from './OrderSnippet.module.css'
import { IOrder } from '../../../types';
import { FC } from 'react';
import LocationMarkIcon from '../../../icons/LocationMarkIcon';
import BoxIcon from '../../../icons/BoxIcon';
import { plural } from '../../../libs/plural';

interface IOrderSnippetProps {
  order: IOrder
}

const shortDateFormat = new Intl.DateTimeFormat('ru-RU', { month: 'short', day: 'numeric', weekday: 'short' })
const CARGO_TYPES_SLICE_END = 3

const OrderSnippet: FC<IOrderSnippetProps> = (props) => {
  const { order } = props
  const cargoTypesText = order.cargo.types
    .slice(0, CARGO_TYPES_SLICE_END)
    .map(cargoType => {
      return cargoType.name
    })
    .join(', ')

  const andMoreLength = order.cargo.types.length - CARGO_TYPES_SLICE_END
  const dateParts = shortDateFormat.formatToParts(new Date(order.route.date))
  const day = dateParts.find(({ type }) => type === 'day')?.value
  const month = dateParts.find(({ type }) => type === 'month')?.value.replace('.', '')
  const weekday = dateParts.find(({ type }) => type === 'weekday')?.value

  return (
    <div className={styles['order-snippet']}>
      <img src={order.mainImage} alt={order.name} className={styles['order-snippet__image']} />
      <div>
        <div className={styles['order-snippet__name']}>
          {order.name}
        </div>
        <div className={styles['order-snippet__row']}>
          <span className={styles['order-snippet__city']}>
            <LocationMarkIcon />
            {order.route.from.city}
          </span>
          <span className={styles['order-snippet__date']}>
            {day}
            {' '}
            {month}
            {', '}
            {weekday}
          </span>
        </div>
        {!!cargoTypesText && (
          <div className={styles['cargo-type']}>
            <BoxIcon />
            Тип груза:
            <span className={styles['cargo-type__list']}>
              {cargoTypesText}
              {andMoreLength > 0 && (
                <>
                  {' '}
                  и
                </>
              )}
            </span>
            {andMoreLength > 0 && (
              <button className={styles['cargo-type__more-button']}>
                еще {andMoreLength} {plural(['тип', 'типа', 'типов'], andMoreLength)}
              </button>
            )}
          </div>
        )}
        {!!order.price.forHour && (
          <div className={styles['price-frame']}>
            <div className={styles['price-frame-for']}>
              за 1 час
            </div>
            <div className={styles['price-frame-value']}>
              от {order.price.forHour} ₽
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSnippet;
