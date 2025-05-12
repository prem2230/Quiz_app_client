import { useEffect } from "react";
import useQuestion from "./hooks";

const ViewQuestions = () => {

    const { loadAllQuestions, questions } = useQuestion();

    useEffect(() => {
        loadAllQuestions();
    }, [])

    useEffect(() => {
        console.info('question', questions)
    }, [questions])
    const handleEdit = (_id: string) => {
        console.log(_id)
    }
    return (
        <div>
            <h1>ViewQuestions</h1>
            {questions.map((ques, index) => {
                return (
                    <div key={index}>
                        <p>{ques.question}</p>
                        <p>{ques.explanation}</p>
                        <p>{ques.marks}</p>
                        <button onClick={() => handleEdit(ques._id)}>{ques._id}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ViewQuestions;