import { Link } from 'react-router-dom';

import ActivityList from '../components/ActivityList';

const quizActivities = [
    {
        id: 1,
        title: 'QUIZ 01',
        date: 'August 25, 2026',
        images: [
            `${import.meta.env.BASE_URL}images/quizzes/quiz-01.jpg`,
            `${import.meta.env.BASE_URL}images/quizzes/quiz-01.1.jpg`
        ]
    },

    {
        id: 2,
        title: 'QUIZ 02',
        date: 'SOON',
        images: [
            `${import.meta.env.BASE_URL}images/quizzes/quiz-02.jpg`
        ]
    },

    {
        id: 3,
        title: 'QUIZ 03',
        date: 'SOON',
        images: [
            `${import.meta.env.BASE_URL}images/quizzes/quiz-03.jpg`
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