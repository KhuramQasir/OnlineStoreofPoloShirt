import React, { useState } from "react";

const AddProduct = ({ addProduct, existingProducts }) => {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    description: "",
    discount: "",
    images: [],
    sizes: [],
  });

  const [sizeInput, setSizeInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "images") {
      const files = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setForm((prev) => ({ ...prev, images: files }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSize = () => {
    if (
      ["S", "M", "L", "XL", "s", "m", "l", "xl"].includes(sizeInput) &&
      priceInput
    )  
    
    {
      setForm((prev) => ({
        ...prev,
        sizes: [...prev.sizes, { size: sizeInput, price: priceInput }],
      }));
      setSizeInput("");
      setPriceInput("");
    } else{
      setErrorMessage("Invalid size or price");
    }
  };

  const handleAddProduct = () => {
    const { title, brand, description, sizes } = form;

    if (title && brand && description && sizes.length) {

        const duplicateProduct = existingProducts.some(
            (product) => product.brand === brand && product.title === title
        );

        if (duplicateProduct) {
            setErrorMessage("Product with this brand and title already exists.");
        } else {
            addProduct(form);
            resetForm();
        }
    } else {
        setErrorMessage("Please fill in all required fields.");
    }
};


  const handleDeleteSize = (index) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      brand: "",
      description: "",
      discount: "",
      images: [],
      sizes: [],
    });
    setSizeInput("");
    setPriceInput("");
    setErrorMessage("");
  };

  return (
    <div id="product-form">
      <h3>Add New Product</h3>
      <input
        name="brand"
        type="text"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
      />
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="discount"
        type="number"
        placeholder="Discount (%)"
        value={form.discount}
        onChange={handleChange}
      />

      <input name="images" type="file" multiple onChange={handleChange} />

      <div id="sizes-container">
        <h4>Sizes and Prices</h4>
        <input
          type="text"
          placeholder="Size"
          value={sizeInput}
          onChange={(e) => setSizeInput(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price (Rs)"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
        />
        <button className="addsize" onClick={handleAddSize}>
          Add Size
        </button>
        <div id="size-list">
          {form.sizes.map((sizeObj, index) => (
            <div className="a" key={index}>
              <span>
                {sizeObj.size}: {sizeObj.price} Rs
              </span>
              <button
                className="remove"
                onClick={() => handleDeleteSize(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      { <p className="error">{errorMessage}</p>}
      <button className="submit" onClick={handleAddProduct}>
        Submit Product
      </button>
    </div>
  );
};

export default AddProduct;
