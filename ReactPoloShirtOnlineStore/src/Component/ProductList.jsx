import React, { useState } from 'react';
import { productsData } from './products';
import { ProductCard } from './ProductCard';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

export const ProductList = () => {
  const [products, setProducts] = useState(productsData);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct}]); 
    setShowForm(false);
  };

  const HandlestartEditingProduct = (product) => {
    setEditingProduct(product);
  };

  const HandleupdateProduct = (updatedProduct) => {
    setProducts(products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setEditingProduct(null);
  };

  const HandledeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="App">
      <button onClick={() => setShowForm(true)}>+</button>
      {showForm && <AddProduct addProduct={addProduct} />}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          updateProduct={HandleupdateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}
      <div id="product-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => HandlestartEditingProduct(product)}
            onDelete={() => HandledeleteProduct(product.id)} 
          />
        ))}
      </div>
    </div>
  );
};
