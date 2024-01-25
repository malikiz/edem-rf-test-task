import { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import styles from './Home.module.css'
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { fetchOrders } from '../../../features/ordersSlice';
import OrderSnippet from '../../views/OrderSnippet/OrderSnippet';
import { plural } from '../../../libs/plural';

const STEP = 10

const Home: FC = () => {
  const [page, setPage] = useState(0)
  const orders = useAppSelector(state => state.orders)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOrders({ start: STEP * page, end: STEP * (page + 1) }))
  }, [page])

  useEffect(() => {
    const increasePage = () => {
      console.log('increasePage', increasePage);

      setPage(page + 1)
    }

    const observer = new IntersectionObserver(
      increasePage,
      {
        root: null,
        rootMargin: '8px',
      }
    )

    observer.observe(document.getElementById('edge-for-getting-more-orders')!)
  }, [])

  console.log('page', page);

  return (
    <div className={styles.home__content}>
      {!!orders.data && (
        <>
          <h1 className={styles.title}>
            Найдено: {orders.data.total} ${plural(['грузоперевозка', 'грузоперевозки', 'грузоперевозок'], orders.data.total)}
          </h1>
          <div className={styles.order}>
            {orders.data?.orders.map(order => {
              return (
                <OrderSnippet key={order.id} order={order} />
              )
            })}
          </div>
        </>
      )}
      {!orders.isLoading && <div id="edge-for-getting-more-orders" className={styles['edge-for-getting-more-orders']} />}
    </div>
  );
};

export default Home;
