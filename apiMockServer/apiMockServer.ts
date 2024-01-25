import http, { IncomingMessage, ServerResponse } from 'http'
import fs from 'fs'
import { Order } from '../src/types';

type Res = ServerResponse<IncomingMessage> & { req: IncomingMessage; }

const DOMAIN = 'localhost'
const PORT = 3002
const ORIGIN = `http://${DOMAIN}:${PORT}`
const ORDERS_LENGTH = 103

const createOrderMock = (index: number): Order => {
  return {
    name: `Газель фермер - ${index}`,
    mainImage: '/images/ab8921d404ca009a1b027f8b37375120.png',
    price: {
      forHour: 500,
    },
    route: {
      date: '2024-01-25T15:17:34.791Z',
      from: {
        city: 'Екатеринбург'
      },
      to: undefined
    }
  }
}

const createOrderListMock = () => {
  const orders = []

  for (let index = 0; index < ORDERS_LENGTH; index++) {
    orders.push(createOrderMock(index))
  }

  return orders
}

const orders = createOrderListMock()


const createServerHandlers = (res: Res, url: URL) => {
  const handleImageRes = () => {
    // Для тестового задания не стал усложнять и выносить изображения в отдельный сервис

    const imageBuffer = fs.readFileSync(`apiMockServer/${url.pathname}`);

    res.writeHead(200, { "Content-Type": "image/png" });
    res.write(imageBuffer);
    res.end();
  }

  const handleNotFound = () => {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write('Not found - 404');
    res.end();
  }

  const handleApiResponse = (data: object) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(data));
    res.end();
  }

  const handleApiOrders = () => {
    const startParam = url.searchParams.get('start')
    const endParam = url.searchParams.get('end')

    if (startParam || endParam) {
      const start = Number(startParam) || 0
      const end = Number(endParam) || Infinity

      handleApiResponse(orders.slice(start, end))
    } else {
      handleApiResponse(orders)
    }
  }

  return {
    handleImageRes,
    handleNotFound,
    handleApiResponse,
    handleApiOrders,
  }
}

http.createServer(function (req, res) {
  const url = new URL(`${ORIGIN}${req.url || ''}`)
  const { handleApiOrders, handleNotFound, handleImageRes } = createServerHandlers(res, url)

  if (url.pathname.split('/')[1] === 'images') {
    handleImageRes()

    return
  }

  switch (url.pathname) {
    case '/api/orders':
      handleApiOrders()
      break
    default:
      handleNotFound()
      break
  }
}).listen(PORT, DOMAIN);
