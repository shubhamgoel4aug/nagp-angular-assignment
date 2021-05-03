export class Product {
    id: number;
    name: String;
    category: String;
    description: String;
    price: number;
    image: String;

    constructor(id: number, name: String, category: String, description: String, price: number, image: String) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}
