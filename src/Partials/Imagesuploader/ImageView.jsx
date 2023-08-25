
import React from 'react';

export default function ImagePreview  ({ images }) {
    return (
        <ul>
            {images.map((file, index) => (
                <li key={index}>
                    <img src={URL.createObjectURL(file)} alt="preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </li>
            ))}
        </ul>
    );
};


