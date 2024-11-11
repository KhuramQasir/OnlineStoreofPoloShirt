import React, { useState, useRef, useEffect } from 'react';
import { productsData } from './products';
import { ProductCard } from './ProductCard';
import ProductForm from './ProductForm';

export const ProductList = () => {
  const [products, setProducts] = useState(productsData);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const formRef = useRef(null);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct }]);
    setShowForm(false); 
  };

  const handleStartEditingProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true); 
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setEditingProduct(null);
    setShowForm(false); 
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleFormCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  useEffect(() => {
    if ((showForm || editingProduct) && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showForm, editingProduct]);

  return (
    <div className="App">
      <button onClick={() => setShowForm(true)}>+</button>
      {(showForm || editingProduct) && (
        <div ref={formRef}>
          <ProductForm
            existingProducts={products}
            onAdd={addProduct}
            onSave={ handleUpdateProduct }
            product={editingProduct}
            onCancel={handleFormCancel}
            isEditMode={!!editingProduct}
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
