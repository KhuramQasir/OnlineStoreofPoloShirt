import React, {  useState } from 'react';

const DisPrice = (price, discount) => {
	return price - price * (discount / 100);
};

export const ProductCard = ({ product }) => {
	const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
	const [activeImage, setActiveImage] = useState(product.images[0]);

	return (
		<div className="maindiv">
      <div className="mainimgdiv">
        {product.images.map((img, index) => (
          <img
            key={index}
            className={`imgchange ${activeImage === img ? 'active' : ''}`}
            src={img}
            alt={`img${index + 1}`}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div>
      <div className="firstimgdiv">
        <img id="firstimg" src={activeImage} alt="firstimg" />
      </div>
      <div className="innerdiv">
        <h1 id="brand">{product.brand}</h1>
        <h2 id="title">{product.title}</h2>
        <p id="description">{product.description}</p>
        <div className="price">
          <span id="dis" className="dis">
            Rs {DisPrice(selectedSize.price, product.discount).toFixed(0)} ({product.discount}%)
          </span>
          <br />
          <span id="org" className="org">Rs {selectedSize.price}</span>
        </div>
        <div className="sizes">
          <label>Choose Size</label>
          <div id="option">
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={selectedSize.size === size.size ? 'active' : ''}
                onClick={() => setSelectedSize(size)}
              >
                {size.size}
              </button>
            ))}
          </div>
        </div>
        <button id="bag">Add to Bag</button>
      </div>
    </div>
	);
};