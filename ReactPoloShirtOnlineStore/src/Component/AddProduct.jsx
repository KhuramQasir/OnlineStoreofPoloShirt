import React, { useState } from 'react';

const AddProduct = ({ addProduct }) => {
  const [form, setForm] = useState({
    title: '',
    brand: '',
    description: '',
    discount: 0,
    images: [],
    sizes: [],
  });

  const [sizeInput, setSizeInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

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

  const handleAddProduct = () => {
    const { title, brand, description, sizes } = form;
    if (title && brand && description && sizes.length) {
      addProduct(form);
      resetForm();
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      brand: '',
      description: '',
      discount: 0,
      images: [],
      sizes: [],
    });
    setSizeInput('');
    setPriceInput('');
  };

  return (
    <div id="product-form">
      <h3>Add New Product</h3>
      <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="brand" type="text" placeholder="Brand" value={form.brand} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="discount" type="number" placeholder="Discount (%)" value={form.discount} onChange={handleChange} />

      <input name="images" type="file" multiple onChange={handleChange} />

      <div id="sizes-container">
        <h4>Sizes and Prices</h4>
        <input type="text" placeholder="Size" value={sizeInput} onChange={e => setSizeInput(e.target.value)} />
        <input type="number" placeholder="Price (Rs)" value={priceInput} onChange={e => setPriceInput(e.target.value)} />
        <button onClick={handleAddSize}>Add Size</button>
        <div id="size-list">
          {form.sizes.map((sizeObj, index) => (
            <div key={index}>{sizeObj.size}: {sizeObj.price} Rs</div>
          ))}
        </div>
      </div>
      <button onClick={handleAddProduct}>Submit Product</button>
    </div>
  );
};

export default AddProduct;
