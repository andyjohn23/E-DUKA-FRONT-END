import { productModel } from './product';

export class CartItem {
    id: number;
    item_name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;

    constructor(id:number, quantity=1, product:productModel) {
        this.id = id;
        this.item_name = product.item_name;
        this.description = product.description;
        this.price = product.price;
        this.image = product.image;
        this.quantity = quantity;
    }
}

