export interface ICargoType {
  name: string
}

export interface ICargo {
  type: ICargoType[]
}

export interface Destination {
  city: string
}

export interface IRoute {
  from: Destination
  to: Destination | undefined
  date: string
}

export interface IPrice {
  forHour: number
}

export interface IOrder {
  name: string
  route: IRoute
  price: IPrice
  mainImage: string
}

export interface IOrderResponse {
  orders: IOrder[]
  total: number
}
