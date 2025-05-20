import products from '../assets/products';

function ProductGallery() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id}>
          <img src={product.src} alt={product.alt} />
          <p>{product.alt}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
export default ProductGallery