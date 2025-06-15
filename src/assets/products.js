import product1 from "./images/picture1.jpg";
import product2 from "./images/picture2.png";

const products = [
  {
    id: 1,
    image: product1,
    name: "Red T-shirt",
    price: 19.99,
    bestseller: true,
    category: "Women",
    subCategory: "TopWear",
    latest: true,
  },
  {
    id: 2,
    image: product2,
    name: "Blue Jeans",
    price: 49.99,
    bestseller: false,
    category: "Women",
  },
];

export default products;
