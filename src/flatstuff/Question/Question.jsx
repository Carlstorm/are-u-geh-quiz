import { useEffect, useState } from "react";
import Button from "../inputs/Button";
import styles from './Question.module.css'

export default function Question({Answer, Question, state}) {
    const [questionText, setQuestionText] = useState("")
    const [AnswerReady, SetAnswerReady] = useState(false)
    const [Position, setPosition] = useState({left: "50%", top: "50%"})

    useEffect(() => {
        let index = 0;
        setQuestionText(""); // Reset text
        SetAnswerReady(false)

        const interval = setInterval(() => {
            if (index < Question.length) {
                setQuestionText(prev => prev + Question[index]);
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    SetAnswerReady(true)
                }, 100)
            }
        }, 75); // Adjust speed as needed (100ms per letter)

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [Question])

    return (
        <div className={styles.question} style={{left: Position.left, top: Position.top}}>
            <p className={styles.question_text}>{questionText}</p>
            <div className={styles.answers} style={{visibility: AnswerReady ? "visible" : "hidden"}}>
                <Button OnClick={() => Answer(false)}>NO</Button>
                <Button OnClick={() => Answer(true)}>YES</Button>
            </div>
        </div>
    )
}