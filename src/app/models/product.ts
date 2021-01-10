export interface productModel {
    id: number;
    item_name: string;
    title: string;
    description: string;
    price: number;
    image: string;
    shipped_from:string;
    color:string;
    previous_price:number;
    size:string;
    quantity: number;
}

export interface serverResponse{
    count: number;
    products: productModel[]
  };

