function ActivityCard({ activity, onImageClick, isFeatured = false }) {
    const images = activity.images?.length
        ? activity.images
        : [activity.imageUrl || activity.image];

    const coverImage = images[0];
    const additionalPhotos = images.length - 1;

    return (
        <article
            className={`jjk-polaroid-card ${isFeatured ? 'featured' : ''}`}
        >
            <div className="jjk-card-tape"></div>

            <button
                type="button"
                className="activity-image-button"
                onClick={() => onImageClick(images)}
                aria-label={`View photos for ${activity.title}`}
            >
                <img
                    src={coverImage}
                    alt={activity.title}
                    className="activity-image"
                />

                {additionalPhotos > 0 && (
                    <span className="activity-photo-count">
                        +{additionalPhotos}
                    </span>
                )}

                <span className="activity-view-indicator">
                    VIEW
                </span>
            </button>

            <div className="activity-info">
                <div className="activity-text">
                    <h2 className="activity-title">
                        {activity.title}
                    </h2>

                    <p className="activity-date">
                        {activity.date}
                    </p>

                    {activity.caption && (
                        <p className="activity-caption">
                            {activity.caption}
                        </p>
                    )}
                </div>

                <div className="jjk-card-stamp">
                    <span>詛</span>
                </div>
            </div>
        </article>
    );
}

export default ActivityCard;