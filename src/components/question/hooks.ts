import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configStore";
import * as Slice from "../../store/questions/questionSlice";
import { questionActions } from "../../store/questions/questionSlice";

interface QuestionData {
    question: string,
    _id?: string,
    options: [
        {
            _id?: string
            text: string,
            isCorrect: boolean
        }
    ],
    explanation: string,
    marks: number,
    createdBy?: string,
    updatedBy?: string,
    createdAt?: string,
    updatedAt?: string,
}

interface QuestionIdPayload {
    id: string
}
export const useQuestion = () => {
    const dispatch = useAppDispatch();

    return {
        loadAllQuestions: useCallback(() => {
            dispatch(questionActions.loadAllQuesRequest())
        }, [dispatch]),
        loadCurrentQuestion: useCallback((payload: QuestionIdPayload) => {
            dispatch(questionActions.loadQuesRequest(payload))
        }, [dispatch]),
        createQuestion: useCallback((payload: QuestionData) => {
            dispatch(questionActions.createQuesRequest(payload))
        }, [dispatch]),

        loading: useAppSelector(Slice.selectQuesLoading),
        questions: useAppSelector(Slice.selectQuestions),
        currentQuestion: useAppSelector(Slice.selectCurrentQuestion),
        noOfQuestions: useAppSelector(Slice.selectNoOfQuestions),
    }
}

export default useQuestion;