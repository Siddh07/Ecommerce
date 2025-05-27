import product1 from "./images/picture1.jpg";
import product2 from "./images/picture2.png";

const products = [
  {
    id: 1,
    image: product1,  // renamed from 'src' to 'image' for consistency
    name: "Red T-shirt",  // renamed from 'alt' to 'name'
    price: 19.99,
  },
  {
    id: 2,
    image: product2,
    name: "Blue Jeans",
    price: 49.99,
  },
];

export default products;
