// Defines the full-screen image viewer component.
// It receives the selected image and a function for closing the viewer.
function ImageViewer({ image, onClose }) {

    // If no image has been selected, the viewer should not appear.
    if (!image) {
        return null;
    }

    // Returns the full-screen image viewer.
    return (
        <div
            className="image-viewer"
            onClick={onClose}
        >

            {/* 
                Close button positioned at the top-right.
                Clicking it closes the image viewer.
            */}
            <button
                type="button"
                className="image-viewer-close"
                onClick={onClose}
                aria-label="Close image viewer"
            >
                ×
            </button>


            {/* 
                Displays the original activity image.
                It is kept separate from the background overlay
                so the entire image can be viewed clearly.
            */}
            <img
                src={image}
                alt="Full activity"
                className="image-viewer-image"

                /*
                    Prevents clicking directly on the image
                    from triggering the viewer's background
                    close event.
                */
                onClick={(event) => event.stopPropagation()}
            />

        </div>
    );
}


// Makes ImageViewer available to ActivityList.
export default ImageViewer;