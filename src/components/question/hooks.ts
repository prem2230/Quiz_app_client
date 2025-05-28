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

interface PaginationParams {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
    search?: string,
}

export const useQuestion = () => {
    const dispatch = useAppDispatch();

    return {
        loadAllQuestions: useCallback((params?: PaginationParams) => {
            dispatch(questionActions.loadAllQuesRequest(params || {}))
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
        setCachedQuestions: useCallback((payload: QuestionData[]) => {
            dispatch(questionActions.setCachedQuestions(payload))
        }, [dispatch]),

        loading: useAppSelector(Slice.selectQuesLoading),
        saveLoading: useAppSelector(Slice.selectSaveLoading),
        questions: useAppSelector(Slice.selectQuestions),
        cachedQuestions: useAppSelector(Slice.selectCachedQuestions),
        currentQuestion: useAppSelector(Slice.selectCurrentQuestion),
        noOfQuestions: useAppSelector(Slice.selectNoOfQuestions),
        pagination: useAppSelector(Slice.selectPagination),
    }
}

export default useQuestion;