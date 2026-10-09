import { Link } from 'react-router-dom';
import ActivityList from '../components/ActivityList';

const quizActivities = [

    {
        id: 1,
        title: 'MIDTERMS',
        date: 'October 6, 2026',
        type: 'image',
        score: "66/70",
        images: [
            `${import.meta.env.BASE_URL}images/exams/midterms-exam.jpg`,
        ]

    },

    {
        id: 2,
        title: 'FINALS',
        date: 'SOON',
        type: 'image',
        score: "N/A",
        images: [
            `${import.meta.env.BASE_URL}images/quizzes/finals.jpg`
        ]
    }

];

function Quiz() {

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
                activities={quizActivities}
            />

        </main>
    );
}


export default Quiz;