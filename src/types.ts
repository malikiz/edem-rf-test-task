export interface CargoType {
  name: string
}

export interface Cargo {
  type: CargoType[]
}

export interface Destination {
  city: string
}

export interface Route {
  from: Destination
  to: Destination | undefined
  date: string
}

export interface Price {
  forHour: number
}

export interface Order {
  name: string
  route: Route
  price: Price
  mainImage: string
}
