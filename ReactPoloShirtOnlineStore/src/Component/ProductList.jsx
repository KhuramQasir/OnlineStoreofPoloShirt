import React, { useState, useRef, useEffect } from 'react';
import { productsData } from './products';
import { ProductCard } from './ProductCard';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

export const ProductList = () => {
  const [products, setProducts] = useState(productsData);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const editFormRef = useRef(null);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct }]);
    setShowForm(false);
  };

  const handleStartEditingProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  useEffect(() => {
    if (editingProduct && editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [editingProduct]);

  return (
    <div className="App">
      <button onClick={() => setShowForm(true)}>+</button>
      {showForm && (
        <AddProduct
          addProduct={addProduct}
          existingProducts={products}
        />
      )}
      {editingProduct && (
        <div ref={editFormRef}>
          <EditProduct
            product={editingProduct}
            updateProduct={handleUpdateProduct}
            existingProducts={products}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      )}
      <div id="product-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => handleStartEditingProduct(product)}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
      </div>
    </div>
  );
};
