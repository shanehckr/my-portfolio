function ActivityCard({ activity, onImageClick, isFeatured = false }) {
    const imageSource = activity.imageUrl || activity.image;

    return (
        <article className={`jjk-polaroid-card ${isFeatured ? 'featured' : ''}`}>
            <div className="jjk-card-tape"></div>

            <button
                type="button"
                className="activity-image-button"
                onClick={() => onImageClick(imageSource)}
                aria-label={`View ${activity.title}`}
            >
                <img
                    src={imageSource}
                    alt={activity.title}
                    className="activity-image"
                />
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