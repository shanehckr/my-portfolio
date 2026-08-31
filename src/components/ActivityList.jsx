import { useState } from 'react';
import ActivityCard from './ActivityCard';
import ImageViewer from './ImageViewer';

function ActivityList({ activities }) {
    const [selectedImage, setSelectedImage] = useState(null);

    function handleImageClick(image) {
        setSelectedImage(image);
    }

    function handleCloseViewer() {
        setSelectedImage(null);
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
                image={selectedImage}
                onClose={handleCloseViewer}
            />

        </section>
    );
}

export default ActivityList;