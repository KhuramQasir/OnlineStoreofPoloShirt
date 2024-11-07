import React, {  useState } from 'react';
import { productsData } from './products';
import { ProductCard } from './ProductCard';
import AddProduct from './AddProduct';





export const ProductList = () => {
	const [products, setProducts] = useState(productsData);
	const [showForm, setShowForm] = useState(false);
  
	const addProduct = (newProduct) => {
	  setProducts([...products, newProduct]);
	  setShowForm(false);
	};
	
   return (
		<div className="App">
		  <button onClick={() => setShowForm(true)}>+</button>
      {showForm && <AddProduct addProduct={addProduct} />}
      <div id="product-container">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
		</div>
	);
};


