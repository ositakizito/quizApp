import { Link } from "react-router-dom";
import myImg from "../images/bulb.svg";
import style from "../components/style.css"

export default function Home() {
    return (
        <>
            <section className="quiz">
                <div className="bulb-container">
                    <img src={myImg} alt="Bulb" className="bulb" width={100} />
                </div>
                <div className="quizname">
                    <p>Quizzles</p>
                </div>
                <div className="quizgame1">
                    <p>Let's Play!</p>
                </div>
                <div className="quizgame">
                    <p>Play now and level up</p>
                </div>
            </section>
            <section className="btn-play">
                <Link to="/question" style={{ display: 'block', width: '100%' }}>
                    <button className="btn1 shake" style={{ width: '100%' }}>Play Now</button>
                </Link>
            </section>
            <section className="btn-play">
                <Link to="#" style={{ display: 'block', width: '100%' }}>
                    <button className="btn2" style={{ width: '100%' }}>About</button>
                </Link>
            </section>
        </>
    );
}
