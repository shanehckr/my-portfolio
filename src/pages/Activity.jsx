import { Link } from 'react-router-dom';

import ActivityList from '../components/ActivityList';

const activityActivities = [
    {
        id: 1,
        title: 'MODULE 1',
        date: 'Sept 12, 2026',
        type: 'pdf',
        score: "N/A",
        preview: `${import.meta.env.BASE_URL}images/previews/Dela Paz_Module 1_Activity 1_Preview.jpg`,
        file: `${import.meta.env.BASE_URL}files/module-activity/Dela Paz_Module 1_Activity 1.pdf`
    },
    {
        id: 2,
        title: 'MODULE 2',
        date: 'Sept 12, 2026',
        type: 'pdf',
        score: "N/A",
        preview: `${import.meta.env.BASE_URL}images/previews/Dela Paz_Module 2_Activity_Preview.jpg`,
        file: `${import.meta.env.BASE_URL}files/module-activity/Dela Paz_Module 2_Activity.pdf`
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