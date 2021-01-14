import { productModel } from './product';

export class Category {
    id: number;
    name: string;
    products: productModel[];
    length: number;
}
