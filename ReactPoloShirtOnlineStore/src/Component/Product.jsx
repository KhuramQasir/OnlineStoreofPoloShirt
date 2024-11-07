import React, { useState,useRef } from "react";

export default function Product() {
       
const product = [
	{
		title: 'Custom Fit Polo Bear Oxford Shirt',
		brand: 'POLO RALPH',
		description: 'This is a custom fit polo bear',
		discount: 50,
		images: ['src/assets/Images/1st Shirt.jpg', 'src/assets/Images/2nd shirt.jpg', 'src/assets/Images/3 image.jpg'],
		sizes: [
			{ size: 'S', price: 1600 },
			{ size: 'M', price: 2000 },
			{ size: 'L', price: 2200 },
			{ size: 'XL', price: 2700 },
		],
	},
	{
		title: 'Classic Fit Polo T-Shirt',
		brand: 'LACOSTE',
		description: 'A classic fit with a subtle logo',
		discount: 20,
		images: ['src/assets/Images/6 shirt.jpg', 'src/assets/Images/5 shirt.jpg', 'src/assets/Images/4 shirt.jpg'],
		sizes: [
			{ size: 'S', price: 1800 },
			{ size: 'M', price: 2100 },
			{ size: 'L', price: 2400 },
			{ size: 'XL', price: 2800 },
		],
	},
	{
		title: 'Casual Fit Hoodie',
		brand: 'NIKE',
		description: 'Comfortable hoodie for everyday wear',
		discount: 15,
		images: ['src/assets/Images/7 shirt.jpg', 'src/assets/Images/8 shirt.jpg', 'src/assets/Images/3 image.jpg'],
		sizes: [
			{ size: 'S', price: 3000 },
			{ size: 'M', price: 3500 },
			{ size: 'L', price: 4000 },
			{ size: 'XL', price: 4500 },
		],
	},
];

 




    return (
        <>
            <div className="maindiv">
            <div className="mainimgdiv">
				{product.images.map((image, index) => (
					<div className="imagei" key={index}>
						<img
							src={image}
							alt={`img${index + 1}`}
							className={`imgchange ${index === activeIndex ? 'active' : ''}`}
							onClick={() => handleImageClick(index)}
						/>
					</div>
				))}
			</div>

            <div className="firstimgdiv">
				<img ref={firstImgRef} id="firstimg" src={product.images[0]} alt="firstimg" />
			</div>
                <div className="innerdiv">
                    <h1 id="brand">{product.brand}</h1>
                    <h2 id="title">{product.title}</h2>
                    <p id="description">{product.description}</p>
                    <div className="price">
                        <span id="dis">{calculateDiscountedPrice(selectedSize.price, product.discount)} Rs ({product.discount}%)</span>
                        <br />
                        <span id="org">{selectedSize.price} Rs</span>
                    </div>
                    <div className="sizes">
                        <label >Choose Size</label>
                        <div id="option">
                            {product.sizes.map((sizeObj, index) => (
                                <button
                                    key={index}
                                    className={selectedSize.size === sizeObj.size ? 'active' : ''}
                                    onClick={() => handleSizeChange(sizeObj)}
                                >
                                    {sizeObj.size}
                                </button>
                            ))}
                        </div>
                   
                        <button id="bag">Add Bag</button>
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </>
    );
}
