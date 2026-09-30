import { Link } from 'react-router-dom';

function About() {
    return (
        <section
            className="about-section"
            id="about"
            style={{
                backgroundColor: '#080203',
                marginTop: 0,
                borderTop: 'none',
                outline: 'none',
                boxShadow: 'none'
            }}
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

            <div className="about-image-wrapper">

                <div className="about-image-frame"></div>

                <div className="about-image-card">

                    <img
                        src={`${import.meta.env.BASE_URL}images/shane.svg`}
                        alt="Shane"
                        className="about-person-image"
                    />

                </div>

            </div>

            <div className="about-content">

                <div className="about-label">

                    <span className="about-label-line"></span>

                    <span>ABOUT ME</span>

                </div>



                <h1 className="about-title">
                    <span>
                        SHANE <span className="word-space">KEARL</span>
                    </span>

                    <span className="about-title-red">
                        DELA <span className="word-space">PAZ</span>
                    </span>
                </h1>

                <div className="about-intro">

                    <div className="about-intro-content">
                        
                        <p className="about-text">
                            I'm a Computer Science student and aspiring developer
                            who loves exploring random things, especially those that
                            challenge and showcase my capabilities. I enjoy discovering
                            what I can do, even in things I'm not fully interested in.
                            I may be a little weird, but I see that curiosity as part of
                            what makes me, me.

                        </p>

                    </div>

                </div>

                <div className="about-social">

                    <span className="about-social-label">
                        CONNECT
                    </span>


                    <a
                        href="https://github.com/shanehckr"
                        target="_blank"
                        rel="noreferrer"
                        className="about-social-link"
                        aria-label="GitHub"
                    >
                        <img
                            src="https://cdn.simpleicons.org/github/ffffff"
                            alt="GitHub"
                            className="about-social-icon"
                        />
                    </a>


                    <a
                        href="https://www.linkedin.com/in/shane-dela-paz-ab6519348/"
                        target="_blank"
                        rel="noreferrer"
                        className="about-social-link"
                        aria-label="LinkedIn"
                    >
                        <img
                            src="https://api.iconify.design/mdi/linkedin.svg?color=white"
                            alt="LinkedIn"
                            className="about-social-icon"
                        />
                    </a>

                </div>

            </div>


        </section>
    );
}

export default About;