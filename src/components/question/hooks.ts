import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configStore";
import * as Slice from "../../store/questions/questionSlice";
import { questionActions } from "../../store/questions/questionSlice";


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

        loading: useAppSelector(Slice.selectQuesLoading),
        questions: useAppSelector(Slice.selectQuestions),
        currentQuestion: useAppSelector(Slice.selectCurrentQuestion),
        error: useAppSelector(Slice.selectQuesError),
        success: useAppSelector(Slice.selectQuesSuccess),
        noOfQuestions: useAppSelector(Slice.selectNoOfQuestions),
    }
}

export default useQuestion;