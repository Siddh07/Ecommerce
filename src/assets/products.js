import product1 from "./images/picture1.jpg";
import product2 from "./images/picture2.png";

const products = [
  {
    id: 1,
    image: [product1, product2],
    name: "Top Wear T-Shirt",
    price: 19.99,
    bestseller: true,
    category: "Women",
    subCategory: "TopWear",
    latest: true,


  },
  {
    id: 2,
    image: [product2],
    name: "Kurtha",
    price: 49.99,
    bestseller: false,
    category: "Women",
    subCategory: "TopWear",
    latest: false,
  },
  {
    id: 3,
    image: [product1],
    name: "Top Wear T-Shirt",
    price: 39.99,
    bestseller: true,
    category: "Women",
    subCategory: "TopWear",
    latest: false,
  },
  {
    id: 4,
    image: [product2],
    name: "Green Skirt",
    price: 29.99,
    bestseller: false,
    category: "Women",
    subCategory: "BottomWear",
    latest: true,
  },
  {
    id: 5,
    image: [product1],
    name: "White Sneakers",
    price: 59.99,
    bestseller: true,
    category: "Kids",
    subCategory: "Footwear",
    latest: true,
  },
  {
    id: 6,
    image: [product2],
    name: "Denim Jacket",
    price: 69.99,
    bestseller: false,
    category: "Men",
    subCategory: "Outerwear",
    latest: true,
  },
  {
    id: 7,
    image: [product1],
    name: "Summer Dress",
    price: 39.99,
    bestseller: true,
    category: "Women",
    subCategory: "Dresses",
    latest: false,
  },
  {
    id: 8,
    image: [product2],
    name: "Black Formal Shoes",
    price: 89.99,
    bestseller: false,
    category: "Men",
    subCategory: "Footwear",
    latest: false,
  },
];

export default products;
