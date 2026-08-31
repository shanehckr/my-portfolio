import { Link } from 'react-router-dom';

import ActivityList from '../components/ActivityList';

const laboratoryActivities = [
    {
        id: 1,
        title: 'LABORATORY 01',
        date: 'SOON',
        image: `${import.meta.env.BASE_URL}images/laboratory/laboratory-01.jpg`
    },
    {
        id: 2,
        title: 'LABORATORY 02',
        date: 'SOON',
        image: `${import.meta.env.BASE_URL}images/laboratory/laboratory-02.jpg`
    }
];


function Laboratory() {

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
                activities={laboratoryActivities}
            />

        </main>
    );
}


export default Laboratory;