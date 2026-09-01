import { useState } from 'react';
import ActivityCard from './ActivityCard';
import ImageViewer from './ImageViewer';

function ActivityList({ activities }) {
    const [selectedImages, setSelectedImages] = useState(null);

    function handleImageClick(images) {
        setSelectedImages(images);
    }

    function handleCloseViewer() {
        setSelectedImages(null);
    }

    if (!activities || activities.length === 0) {
        return null;
    }

    return (
        <section className="activity-archive-container">

            <div className="activity-grid">
                {activities.map((activity) => (
                    <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onImageClick={handleImageClick}
                        isFeatured={false}
                    />
                ))}
            </div>

            <ImageViewer
                images={selectedImages}
                onClose={handleCloseViewer}
            />

        </section>
    );
}

export default ActivityList;