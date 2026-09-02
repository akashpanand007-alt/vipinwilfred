import React, { useEffect, useState } from "react";
import "./PhotographyGallery.css";

const photos = [
  {
    id: 1,
    title: "The Vow",
    category: "Weddings",
    location: "London",
    image: "/Images/gallery-01.jpg",
    size: "tall",
  },
  {
    id: 2,
    title: "Just Married",
    category: "Moments",
    location: "Cotswolds",
    image: "/Images/gallery-02.jpg",
    size: "normal",
  },
  {
    id: 3,
    title: "Quiet Details",
    category: "Details",
    location: "Surrey",
    image: "/Images/gallery-03.jpg",
    size: "normal",
  },
  {
    id: 4,
    title: "After The Ceremony",
    category: "Weddings",
    location: "Lake District",
    image: "/Images/gallery-04.jpg",
    size: "wide",
  },
  {
    id: 5,
    title: "Before The Aisle",
    category: "Portraits",
    location: "Edinburgh",
    image: "/Images/gallery-05.jpg",
    size: "normal",
  },
  {
    id: 6,
    title: "In Between",
    category: "Moments",
    location: "Kent",
    image: "/Images/gallery-06.jpg",
    size: "tall",
  },
  {
    id: 7,
    title: "The Rings",
    category: "Details",
    location: "Berkshire",
    image: "/Images/gallery-07.jpg",
    size: "normal",
  },
  {
    id: 8,
    title: "Golden Hour",
    category: "Weddings",
    location: "Cornwall",
    image: "/Images/gallery-08.jpg",
    size: "normal",
  },
  {
    id: 9,
    title: "Her Portrait",
    category: "Portraits",
    location: "London",
    image: "/Images/gallery-09.jpg",
    size: "wide",
  },
  {
    id: 10,
    title: "A Little Laugh",
    category: "Moments",
    location: "Hampshire",
    image: "/Images/gallery-10.jpg",
    size: "normal",
  },
  {
    id: 11,
    title: "The Bouquet",
    category: "Details",
    location: "Oxfordshire",
    image: "/Images/gallery-11.jpg",
    size: "tall",
  },
  {
    id: 12,
    title: "The Dance",
    category: "Weddings",
    location: "Yorkshire",
    image: "/Images/gallery-12.jpg",
    size: "normal",
  },
];

const filters = ["All", "Weddings", "Portraits", "Details", "Moments"];

export default function PhotographyGallery() {
  const [filter, setFilter] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const visiblePhotos =
    filter === "All"
      ? photos
      : photos.filter((photo) => photo.category === filter);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="photography-gallery">
      <section className="gallery-hero">
        <div className="gallery-hero-inner">
          <p className="gallery-eyebrow">
            Wedding Photography · United Kingdom
          </p>

          <h1>
            Stories told
            <br />
            <em>in photographs.</em>
          </h1>

          <p className="gallery-hero-description">
            An editorial collection of honest moments, elegant details and
            photographs made to feel timeless.
          </p>
        </div>

        <span className="gallery-hero-index">01 / 04</span>
      </section>

      <section className="gallery-work">
        <div className="gallery-section-heading">
          <div>
            <p className="gallery-eyebrow gallery-eyebrow-dark">
              Selected Work
            </p>

            <h2>
              A collection of
              <br />
              <em>real moments.</em>
            </h2>
          </div>

          <p className="gallery-intro">
            From the quiet anticipation before the ceremony to the last dance,
            every image is selected for its feeling rather than its perfection.
          </p>
        </div>

        <div className="gallery-filters">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {visiblePhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              className={`gallery-photo-card ${photo.size}`}
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`View ${photo.title}`}
            >
              <img src={photo.image} alt={photo.title} loading="lazy" />

              <span className="gallery-photo-overlay">
                <small>
                  {photo.category} · {photo.location}
                </small>

                <strong>{photo.title}</strong>

                <span className="gallery-view-link">View +</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-statement">
        <p className="gallery-eyebrow">The Approach</p>

        <blockquote>
          “The photographs that matter most are often the ones
          <em> you never planned to make.</em>”
        </blockquote>
      </section>

      {selectedPhoto && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close photograph"
          >
            ×
          </button>

          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selectedPhoto.image} alt={selectedPhoto.title} />

            <div className="gallery-lightbox-caption">
              <span>
                {selectedPhoto.category} · {selectedPhoto.location}
              </span>

              <strong>{selectedPhoto.title}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
