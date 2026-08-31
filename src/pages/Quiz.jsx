import { Link } from 'react-router-dom';

import ActivityList from '../components/ActivityList';

const quizActivities = [

    {
        id: 1,
        title: 'QUIZ 01',
        date: 'August 27, 2026',
        image: '/images/quizzes/quiz-01.jpg'
    },

    {
        id: 2,
        title: 'QUIZ 02',
        date: 'SOON',
        image: '/images/quiz/quiz-02.jpg'
    },

    {
        id: 3,
        title: 'QUIZ 03',
        date: 'SOON',
        image: '/images/quiz/quiz-03.jpg'
    },
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
                    <Link to="/laboratory" className="hero-nav-link">Laboratory</Link>
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