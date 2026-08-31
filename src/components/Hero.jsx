import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section
            className="hero"
            id="home"
            style={{
                backgroundColor: '#080203',
                marginBottom: 0,
                borderBottom: 'none',
                outline: 'none'
            }}
        >

            <div className="background"></div>
            <div className="background-overlay"></div>

            <div className="hero-greeting hero-greeting-left">
                <span>HEY,</span>
            </div>

            <div className="hero-greeting hero-greeting-right">
                <span>THERE!</span>
            </div>

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

            <div className="person-container">
                <img
                    src={`${import.meta.env.BASE_URL}images/person.svg`}
                    alt="Shane"
                    className="person-image"
                />
            </div>

        </section>
    );
}

export default Hero;