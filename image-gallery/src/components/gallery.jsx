import React, { useState, useEffect } from 'react'
import './gallery.css'

export default function ImageGallery() {
  const [images, setImages] = useState([])
  const [categories, setCategories] = useState([
    'Nature',
    'Friends',
    'Family',
    'Places',
    'Food',
    'Events',
  ])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [newCategory, setNewCategory] = useState('')


  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || []
    setImages(savedImages)
  }, [])

  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(images))
  }, [images])

  function handleFileChange(e) {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newImage = {
          id: Date.now() + Math.random(),
          src: event.target.result,
          name: file.name,
          category: '',
          uploadDate: new Date().toISOString(),
        };
        setImages((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }

  function addCategory() {
    const trimmed = newCategory.trim()
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed])
      setNewCategory('')
    }
  }

  function assignCategory(imageId, category) {
    setImages((prev) =>
      prev.map((img) => (img.id === imageId ? { ...img, category } : img))
    )
  }

  function deleteImage(imageId) {
    setImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const filteredImages =
    selectedCategory === 'All'
      ? images
      : images.filter((img) => img.category === selectedCategory)

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Image Gallery</h1>

      <div className="file-input-container">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
      </div>

      <div className="categories-section">
        <h3 className="categories-title">Categories</h3>

        <div className="add-category">
          <input
            type="text"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            className="category-input"
          />
          <button onClick={addCategory} className="add-category-btn">
            Add
          </button>
        </div>

        <div className="category-buttons">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`category-btn ${
              selectedCategory === 'All' ? 'active' : ''
            }`}
          >
            All ({images.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-btn ${
                selectedCategory === cat ? 'active' : ''
              }`}
            >
              {cat} ({images.filter((img) => img.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-grid">
        {filteredImages.map((image) => (
          <div key={image.id} className="image-card">
            <div className="image-container">
              <img
                src={image.src}
                alt={image.name || `Image ${image.id}`}
                className="gallery-image"
              />
              <button
                onClick={() => deleteImage(image.id)}
                className="delete-btn"
                title="Delete image"
              >
                ×
              </button>
            </div>
            <div className="image-info">
              <p className="image-name">{image.name || 'Unnamed'}</p>
              <select
                value={image.category || ''}
                onChange={(e) => assignCategory(image.id, e.target.value)}
                className="category-select"
              >
                <option value="">No Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {image.category && (
                <span className="category-tag">{image.category}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && images.length > 0 && (
        <div className="empty-state">
          <p className="empty-state-title">
            No images in "{selectedCategory}" category
          </p>
          <p className="empty-state-text">
            Try selecting a different category or add images to this one
          </p>
        </div>
      )}

      {images.length === 0 && (
        <div className="empty-state">
          <p className="empty-state-title">No images uploaded yet</p>
          <p className="empty-state-text">
            Select images to start building your gallery
          </p>
        </div>
      )}
    </div>
  );
}
