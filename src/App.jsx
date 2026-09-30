import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Quiz from './pages/Quiz';
import Activity from './pages/Activity';
import Exam from './pages/Exam';
import Cursor from './components/CursedCursor';

function App() {
    return (
        <>
            <Cursor />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                        </>
                    }
                />

                <Route
                    path="/"
                    element={
                        <>
                            <Hero />

                        </>
                    }
                />

                <Route
                    path="/about"
                    element={<About />}
                > </Route>

                <Route
                    path="/quiz"
                    element={<Quiz />}
                />

                <Route
                    path="/activity"
                    element={<Activity />}
                />

                <Route
                    path="/exam"
                    element={<Exam />}
                />

            </Routes>
        </>
    );
}

export default App;