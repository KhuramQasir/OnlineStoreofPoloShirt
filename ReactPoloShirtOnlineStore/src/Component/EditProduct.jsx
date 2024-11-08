import React, { useState, useEffect } from 'react';

const EditProduct = ({ product, existingProducts, updateProduct, onCancel }) => {
  const [form, setForm] = useState({
    id: '',
    title: '',
    brand: '',
    description: '',
    discount: '',
    images: [],
    sizes: [],
  });

  const [sizeInput, setSizeInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'images') {
      const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setForm(prev => ({ ...prev, images: files }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSize = () => {
    if (['S', 'M', 'L', 'XL', 's', 'm', 'l', 'xl'].includes(sizeInput) && priceInput) {
      setForm(prev => ({
        ...prev,
        sizes: [...prev.sizes, { size: sizeInput, price: priceInput }],
      }));
      setSizeInput('');
      setPriceInput('');
    }
  };

  const handleDeleteSize = (index) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const handleSaveChanges = () => {
    const { title, brand, description, sizes } = form;

    if (title && brand && description && sizes.length) {
      const duplicateProduct = existingProducts.some(
        (existingProduct) =>
          existingProduct.id !== form.id && 
          existingProduct.brand === brand &&
          existingProduct.title === title
      );

      if (duplicateProduct) {
        setErrorMessage("Product with this brand and title already exists.");
      } else {
        updateProduct(form);
       
      }
    } else {
      setErrorMessage("Please fill in all required fields.");
    }
  };

  return (
    <div id="product-form">
      <h3>Edit Product</h3>
      
      <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="brand" type="text" placeholder="Brand" value={form.brand} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="discount" type="number" placeholder="Discount (%)" value={form.discount} onChange={handleChange} />

      <input name="images" type="file" multiple onChange={handleChange} />

      <div id="sizes-container">
        <h4>Sizes and Prices</h4>
        <input type="text" placeholder="Size" value={sizeInput} onChange={e => setSizeInput(e.target.value)} />
        <input type="number" placeholder="Price (Rs)" value={priceInput} onChange={e => setPriceInput(e.target.value)} />
        <button className='addsize' onClick={handleAddSize}>Add Size</button>
        
        <div id="size-list">
          {form.sizes.map((sizeObj, index) => (
            <div className='a' key={index} >
              <span>{sizeObj.size}: {sizeObj.price} Rs</span>
              <button className='remove' onClick={() => handleDeleteSize(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      {<p className='error' >{errorMessage}</p>}         
      <button className='save' onClick={handleSaveChanges}>Save Changes</button>{' '}
      <button className='cancel' onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditProduct;
