import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Question() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);  // <-- Track selected options for each question
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch 10 random general knowledge questions from Open Trivia API
    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple');
            const data = await response.json();
            const formattedQuestions = data.results.map((q) => ({
                question: q.question,
                options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
                correct_answer: q.correct_answer,
            }));
            setQuestions(formattedQuestions);
            setSelectedOptions(new Array(formattedQuestions.length).fill(null)); // Initialize selectedOptions array with null values
            setLoading(false);
        } catch (error) {
            console.error("Error fetching questions:", error);
            setLoading(false);
        }
    };

    const handleOptionClick = (option) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[currentQuestionIndex] = option; // Save selected option for the current question
        setSelectedOptions(updatedSelectedOptions);

        // Update score if the selected answer is correct
        if (option === questions[currentQuestionIndex].correct_answer && selectedOptions[currentQuestionIndex] !== option) {
            setScore(score + 1);
        }
        // Automatically move to the next question after 500ms
        setTimeout(() => {
            handleNext();
        }, 500);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCompleted(true);
            navigate("/congrat", { state: { score } }); // Redirect to congrat page with the score
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // If still loading, display the loading message
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div>
            <section className="lev">
                <div className="lv">Quizzles</div>
                <Link to="/" style={{ textDecoration: "none", color: "#36e3b9" }}>
                    <div><i className="material-icons">logout</i></div>
                </Link>
            </section>

            <section className="container">
                <div className="q">{currentQuestionIndex + 1}/10</div>
                {questions.length > 0 && (
                    <>
                        <div className="quest" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
                        <div className="option">
                            {questions[currentQuestionIndex].options.map((option, idx) => (
                                <div
                                    key={idx}
                                    className={`opt ${selectedOptions[currentQuestionIndex] === option ? 'active' : ''}`} // Keep the selected option active
                                    onClick={() => handleOptionClick(option)}
                                >
                                    <div className="op">{String.fromCharCode(65 + idx)}</div>
                                    <div className="o">{option}</div>
                                </div>
                            ))}
                        </div>
                        <div className="prevnext">
                            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                                Previous
                            </button>
                            <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                                Next
                            </button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
