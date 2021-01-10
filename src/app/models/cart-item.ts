import { productModel } from './product';

export interface CartItem {
    total: number;
    data: [{
        product: productModel;
        numInCart: number;
    }]
}

export interface CartItemPublic {
    total: number;
    proddata: [{
        id: number,
        inCart: number
    }]
}
