import { useEffect, useRef, useState } from 'react';

function ImageViewer({ images, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoom, setZoom] = useState(100);

    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });

    const [isDragging, setIsDragging] = useState(false);

    const dragStart = useRef({
        x: 0,
        y: 0
    });

    const touchStartX = useRef(null);


    useEffect(() => {
        if (images) {
            setCurrentIndex(0);
            setZoom(100);
            setPosition({
                x: 0,
                y: 0
            });
        }
    }, [images]);


    useEffect(() => {
        if (!images) return;

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose();
            }

            if (images.length > 1 && event.key === 'ArrowRight') {
                showNext();
            }

            if (images.length > 1 && event.key === 'ArrowLeft') {
                showPrevious();
            }

            if (event.key === '+' || event.key === '=') {
                zoomIn();
            }

            if (event.key === '-') {
                zoomOut();
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


    function zoomIn() {
        setZoom((current) =>
            Math.min(current + 25, 300)
        );
    }


    function zoomOut() {
        setZoom((current) => {
            const nextZoom = Math.max(current - 25, 50);

            if (nextZoom <= 100) {
                setPosition({
                    x: 0,
                    y: 0
                });
            }

            return nextZoom;
        });
    }


    function showPrevious() {
        setCurrentIndex((current) =>
            (current - 1 + images.length) % images.length
        );

        setZoom(100);

        setPosition({
            x: 0,
            y: 0
        });
    }


    function showNext() {
        setCurrentIndex((current) =>
            (current + 1) % images.length
        );

        setZoom(100);

        setPosition({
            x: 0,
            y: 0
        });
    }


    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }


    function handleMouseDown(event) {
        if (zoom <= 100) return;

        event.preventDefault();

        setIsDragging(true);

        dragStart.current = {
            x: event.clientX - position.x,
            y: event.clientY - position.y
        };
    }


    function handleMouseMove(event) {
        if (!isDragging) return;

        setPosition({
            x: event.clientX - dragStart.current.x,
            y: event.clientY - dragStart.current.y
        });
    }


    function handleMouseUp() {
        setIsDragging(false);
    }


    function handleTouchStart(event) {
        if (zoom > 100) return;

        touchStartX.current = event.touches[0].clientX;
    }


    function handleTouchEnd(event) {
        if (
            zoom > 100 ||
            touchStartX.current === null ||
            images.length <= 1
        ) {
            return;
        }

        const touchEndX = event.changedTouches[0].clientX;
        const difference = touchStartX.current - touchEndX;

        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                showNext();
            } else {
                showPrevious();
            }
        }

        touchStartX.current = null;
    }


    function handleDownload() {
        const link = document.createElement('a');

        link.href = currentImage;
        link.download = currentImage.split('/').pop() || 'image';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    return (
        <div
            className="image-viewer"
            onMouseDown={handleBackdropClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            role="dialog"
            aria-modal="true"
            aria-label="Activity image viewer"
        >

            <div className="image-viewer-panel">

                <div className="image-viewer-toolbar">

                    <div className="image-viewer-zoom-controls">

                        <button
                            type="button"
                            className="image-viewer-control"
                            onClick={zoomOut}
                            disabled={zoom <= 50}
                            aria-label="Zoom out"
                        >
                            −
                        </button>

                        <button
                            type="button"
                            className="image-viewer-control"
                            onClick={zoomIn}
                            disabled={zoom >= 300}
                            aria-label="Zoom in"
                        >
                            +
                        </button>

                    </div>


                    <div className="image-viewer-toolbar-actions">

                        <button
                            type="button"
                            className="image-viewer-download"
                            onClick={handleDownload}
                            aria-label="Download image"
                            title="Download image"
                        >
                            <span
                                className="image-download-icon"
                                aria-hidden="true"
                            >
                                ↓
                            </span>
                        </button>

                        <button
                            type="button"
                            className="image-viewer-close"
                            onClick={onClose}
                            aria-label="Close image viewer"
                        >
                            ×
                        </button>

                    </div>

                </div>


                <div
                    className={`image-viewer-content ${zoom > 100 ? 'zoomed' : ''
                        }`}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >

                    {images.length > 1 && (
                        <button
                            type="button"
                            className="image-viewer-arrow image-viewer-prev"
                            onClick={showPrevious}
                            aria-label="Previous image"
                        >
                            ←
                        </button>
                    )}


                    <div className="image-viewer-stage">

                        <img
                            src={currentImage}
                            alt={`Activity image ${currentIndex + 1}`}
                            className={`image-viewer-image ${isDragging ? 'dragging' : ''
                                }`}
                            draggable="false"
                            onMouseDown={handleMouseDown}
                            style={{
                                transform: `
                                    translate(
                                        ${position.x}px,
                                        ${position.y}px
                                    )
                                    scale(${zoom / 100})
                                `
                            }}
                        />

                    </div>


                    {images.length > 1 && (
                        <button
                            type="button"
                            className="image-viewer-arrow image-viewer-next"
                            onClick={showNext}
                            aria-label="Next image"
                        >
                            →
                        </button>
                    )}

                </div>


                {images.length > 1 && (
                    <div className="image-viewer-pagination">
                        <span className="image-viewer-counter">
                            {String(currentIndex + 1).padStart(2, '0')}
                            {' / '}
                            {String(images.length).padStart(2, '0')}
                        </span>
                    </div>
                )}

            </div>

        </div>
    );
}

export default ImageViewer;