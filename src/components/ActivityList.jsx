import { useState } from 'react';
import ActivityCard from './ActivityCard';
import ImageViewer from './ImageViewer';
import PDFViewer from './PDFViewer';

function ActivityList({ activities }) {
    const [selectedActivity, setSelectedActivity] =
        useState(null);

    function handlePreview(activity) {
        setSelectedActivity(activity);
    }

    function handleCloseViewer() {
        setSelectedActivity(null);
    }

    if (!activities || activities.length === 0) {
        return null;
    }

    const selectedImages =
        selectedActivity?.images?.length
            ? selectedActivity.images
            : selectedActivity?.imageUrl
                ? [selectedActivity.imageUrl]
                : selectedActivity?.image
                    ? [selectedActivity.image]
                    : [];

    return (
        <section className="activity-archive-container">

            <div className="activity-grid">

                {activities.map((activity) => (
                    <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onPreview={handlePreview}
                        isFeatured={false}
                    />
                ))}

            </div>


            {selectedActivity?.type === 'image' && (
                <ImageViewer
                    images={selectedImages}
                    onClose={handleCloseViewer}
                />
            )}


            {selectedActivity?.type === 'pdf' && (
                <PDFViewer
                    file={selectedActivity.file}
                    title={selectedActivity.title}
                    onClose={handleCloseViewer}
                />
            )}

        </section>
    );
}

export default ActivityList;