export interface IProduct {
    name: string
    brand: string
    model: string
    description: string
    productpicture: string
    price: number
    replacementvalue: number
    category: string
    subcategory: string
    availabiltystatus: boolean
}
export interface IGetProductResponse extends IGetAll<IProduct[]> { }
export interface IGetAll<T> {
    items: T
    count: number
}