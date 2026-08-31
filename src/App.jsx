import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Quiz from './pages/Quiz';
import Laboratory from './pages/Laboratory';
import Exam from './pages/Exam';

function App() {
    return (
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
                path="/about"
                element={<About />}
            > </Route>
            
            <Route
                path="/quiz"
                element={<Quiz />}
            />

            <Route
                path="/laboratory"
                element={<Laboratory />}
            />

            <Route
                path="/exam"
                element={<Exam />}
            />

        </Routes>
    );
}

export default App;