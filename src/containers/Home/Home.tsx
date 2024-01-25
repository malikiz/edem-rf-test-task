import { FC, useEffect, useLayoutEffect, useState } from 'react';
import styles from './Home.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOrders } from '../../features/ordersSlice';

const STEP = 10

const Home: FC = () => {
  const [page, setPage] = useState(0)
  const orders = useAppSelector(state => state.orders)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOrders({ start: STEP * page, end: STEP * (page + 1)}))
  }, [])

  return (
    <div className={styles.home__content}>
      <h1 className={styles.title}>
        {!!orders.data && (
          <>
            Найдено: {orders.data.total} грузоперевозка
          </>
        )}
      </h1>
    </div>
  );
};

export default Home;
