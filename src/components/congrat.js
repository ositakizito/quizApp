import { Link, useLocation } from "react-router-dom";

export default function Congrat() {
    const location = useLocation();
    const { score } = location.state || { score: 0 }; // Destructure score or default to 0

    return (
        <>
            <section className="result">
                <div>Results</div>
            </section>
            <section className="contain">
                <div className="con">
                    <p>Total correct answers</p>
                    <p className="out">{score} out of 10 questions</p>
                </div>
                <div className="box">
                    <div className="info">
                        <div className="final">Your final score is</div>
                        <div className="no">{score < 10 ? `${score}` : score}</div>
                    </div>
                </div>
                <Link to="/"> <button>Try Again</button></Link>
            </section>
        </>
    );
}
