export interface Product {
  name: string
  price: number
  url: string
  merchant: string
  review: {
    rating: number | string
    count: number
  }
  extras: Record<string, unknown>
}