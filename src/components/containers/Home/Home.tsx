import { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import styles from './Home.module.css'
import { useAppSelector, useAppDispatch, useDebounce } from '../../../hooks';
import { fetchMoreOrders } from '../../../features/ordersSlice';
import OrderSnippet from '../../views/OrderSnippet/OrderSnippet';
import { plural } from '../../../libs/plural';

const STEP = 10

const Home: FC = () => {
  const [page, setPage] = useState(0)
  const orders = useAppSelector(state => state.orders)
  const dispatch = useAppDispatch()
  const maxPages = Math.ceil((orders.data?.total || 0) / STEP)
  const [debounce] = useDebounce(50)

  const hasMoreOrders = page < maxPages

  useEffect(() => {
    dispatch(fetchMoreOrders({ start: STEP * page, end: STEP * (page + 1) }))
  }, [page])

  useEffect(() => {
    if (!orders.isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          debounce(() => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                if (hasMoreOrders) {
                  setPage(page + 1)
                }
              }
            })
          }, false)
        },
        {
          root: null,
          rootMargin: '8px',
        }
      )

      observer.observe(document.getElementById('edge-for-getting-more-orders')!)
    }
  }, [orders.isLoading])

  return (
    <div className={styles.home__content}>
      {!!orders.data && (
        <>
          <h1 className={styles.title}>
            Найдено: {orders.data.total} {plural(['грузоперевозка', 'грузоперевозки', 'грузоперевозок'], orders.data.total)}
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

      {!orders.isLoading && (
        <div id="edge-for-getting-more-orders" className={styles['edge-for-getting-more-orders']}>
          {!hasMoreOrders && (<div className={styles['orders-limit-alert']}>поездок больше не найдено</div>)}
        </div>
      )}
    </div>
  );
};

export default Home;
