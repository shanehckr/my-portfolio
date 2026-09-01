import { useEffect, useState } from 'react';

function ImageViewer({ images, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images) {
            setCurrentIndex(0);
        }
    }, [images]);

    useEffect(() => {
        if (!images) return;

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose();
            }

            if (event.key === 'ArrowRight') {
                setCurrentIndex((current) =>
                    (current + 1) % images.length
                );
            }

            if (event.key === 'ArrowLeft') {
                setCurrentIndex((current) =>
                    (current - 1 + images.length) % images.length
                );
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [images, onClose]);

    if (!images || images.length === 0) {
        return null;
    }

    const currentImage = images[currentIndex];

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    function showPrevious() {
        setCurrentIndex((current) =>
            (current - 1 + images.length) % images.length
        );
    }

    function showNext() {
        setCurrentIndex((current) =>
            (current + 1) % images.length
        );
    }

    return (
        <div
            className="image-viewer"
            onMouseDown={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label="Activity photo gallery"
        >
            <button
                type="button"
                className="image-viewer-close"
                onClick={onClose}
                aria-label="Close image viewer"
            >
                ×
            </button>

            {images.length > 1 && (
                <button
                    type="button"
                    className="image-viewer-arrow image-viewer-prev"
                    onClick={showPrevious}
                    aria-label="Previous photo"
                >
                    ←
                </button>
            )}

            <div className="image-viewer-content">
                <img
                    src={currentImage}
                    alt={`Activity photo ${currentIndex + 1}`}
                    className="image-viewer-image"
                />

                {images.length > 1 && (
                    <div className="image-viewer-pagination">
                        <span className="image-viewer-counter">
                            {String(currentIndex + 1).padStart(2, '0')}
                            {' / '}
                            {String(images.length).padStart(2, '0')}
                        </span>

                        <div className="image-viewer-dots">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`image-viewer-dot ${
                                        index === currentIndex
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`View photo ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {images.length > 1 && (
                <button
                    type="button"
                    className="image-viewer-arrow image-viewer-next"
                    onClick={showNext}
                    aria-label="Next photo"
                >
                    →
                </button>
            )}
        </div>
    );
}

export default ImageViewer;