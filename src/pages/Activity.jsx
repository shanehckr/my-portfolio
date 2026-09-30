import { Link } from 'react-router-dom';

import ActivityList from '../components/ActivityList';

const activityActivities = [
    {
        id: 1,
        title: 'MODULE 1',
        date: 'SOON',
        image: [
            `${import.meta.env.BASE_URL}images/activity/activity-01.jpg`
        ]
    },
    {
        id: 2,
        title: 'MODULE 2',
        date: 'SOON',
        image: [
            `${import.meta.env.BASE_URL}images/activity/activity-02.jpg`
        ]
    }
];


function Activity() {

    return (
        <main
            className="activity-page"
        >
            <nav className="hero-nav">
                <Link to="/" className="hero-brand">
                    Portfolio
                </Link>

                <div className="hero-nav-links">
                    <Link to="/" className="hero-nav-link">Home</Link>
                    <Link to="/about" className="hero-nav-link">About</Link>
                    <Link to="/quiz" className="hero-nav-link">Quiz</Link>
                    <Link to="/activity" className="hero-nav-link">Activity</Link>
                    <Link to="/exam" className="hero-nav-link">Exam</Link>
                </div>
            </nav>

            <ActivityList
                activities={activityActivities}
            />

        </main>
    );
}


export default Activity;