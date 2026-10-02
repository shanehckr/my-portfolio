function ActivityCard({ activity, onPreview, isFeatured = false }) {
    const isPDF = activity.type === 'pdf';

    const images = activity.images?.length
        ? activity.images
        : activity.imageUrl
            ? [activity.imageUrl]
            : activity.image
                ? [activity.image]
                : [];

    const coverImage = isPDF
        ? activity.preview
        : images[0];

    const additionalPhotos = images.length - 1;

    function handlePreview() {
        onPreview(activity);
    }

    return (
        <article
            className={`jjk-polaroid-card ${isFeatured ? 'featured' : ''}`}
        >
            <div className="jjk-card-tape"></div>

            <div className="activity-image-button">
                {coverImage && (
                    <img
                        src={coverImage}
                        alt={activity.title}
                        className="activity-image"
                    />
                )}

                {!isPDF && additionalPhotos > 0 && (
                    <span className="activity-photo-count">
                        +{additionalPhotos}
                    </span>
                )}
            </div>

            <div className="activity-info">

                <div className="activity-text">

                    <h2 className="activity-title">
                        {activity.title}
                    </h2>

                    <p className="activity-date">
                        {activity.date}
                    </p>

                    <p className="activity-type">
                        {isPDF ? 'PDF' : 'IMAGE'}
                    </p>

                </div>

                <button
                    type="button"
                    className="activity-view-button"
                    onClick={handlePreview}
                    aria-label={`View ${activity.title}`}
                    title={`View ${activity.title}`}
                >
                    <svg
                        className="activity-view-icon"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M5 24C10 15 17 10 24 10C31 10 38 15 43 24C38 33 31 38 24 38C17 38 10 33 5 24Z"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                        />

                        <circle
                            cx="24"
                            cy="24"
                            r="7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        />

                        <circle
                            cx="24"
                            cy="24"
                            r="2.5"
                            fill="currentColor"
                        />

                        <path
                            d="M24 4V8M24 40V44M4 24H8M40 24H44"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="square"
                        />
                    </svg>
                </button>

            </div>
        </article>
    );
}

export default ActivityCard;