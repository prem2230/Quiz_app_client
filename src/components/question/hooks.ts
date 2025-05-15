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

interface CreateQuestionPayload {
    data: QuestionData,
    navigate: Function,
}

interface UpdateQuestionPayload {
    id: string,
    data: Partial<QuestionData>,
    navigate: Function
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
        createQuestion: useCallback((payload: CreateQuestionPayload) => {
            dispatch(questionActions.createQuesRequest(payload))
        }, [dispatch]),
        deleteQuestion: useCallback((payload: QuestionIdPayload) => {
            dispatch(questionActions.deleteQuesRequest(payload))
        }, [dispatch]),
        updateQuestion: useCallback((payload: UpdateQuestionPayload) => {
            dispatch(questionActions.updateQuesRequest(payload))
        }, [dispatch]),

        loading: useAppSelector(Slice.selectQuesLoading),
        saveLoading: useAppSelector(Slice.selectSaveLoading),
        questions: useAppSelector(Slice.selectQuestions),
        currentQuestion: useAppSelector(Slice.selectCurrentQuestion),
        noOfQuestions: useAppSelector(Slice.selectNoOfQuestions),
    }
}

export default useQuestion;