import { Category } from "./Category";

export class Product {

    prodid: number;
    name: String;
    description: String;
    size: any;
    price: number;
    instock: number;
    category: Category;
    picture: any;
    image: any;

    constructor(prodid: number, name: string, description: string, size: any, price: number, instock: number, category: Category,
        picture: any, image: any) {

        this.prodid = prodid;
        this.name = name;
        this.description = description;
        this.size = size;
        this.price = price;
        this.instock = instock;
        this.category = category;
        this.picture = picture;
        this.image = image;

    }

}