import React, { useState } from 'react';

export default function ImageGallery() {
  const [images, setImages] = useState([]);

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-5 p-2 border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2.5 mt-5">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Uploaded"
            className="w-full h-[150px] object-cover rounded-lg hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
          />
        ))}
      </div>
    </div>
  );
}
