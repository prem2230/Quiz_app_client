import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configStore"
import { quizActions } from "../../store/quiz/quizSlice";

interface Question {
    question?: string,
    _id: string,
    options?: [
        {
            _id?: string
            text: string,
            isCorrect: boolean
        }
    ],
    explanation?: string,
    marks?: number,
    createdBy?: string,
    updatedBy?: string,
    createdAt?: string,
    updatedAt?: string,
}

interface Quiz {
    _id?: string,
    title: string,
    description: string,
    duration: number,
    difficulty: 'easy' | 'medium' | 'hard',
    questions: Question[],
}
interface PaginationParams {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
    search?: string,
}

interface QuizIdPayload {
    id: string
}

interface CreateQuizPayload {
    data: Quiz,
    navigate: Function
}

interface UpdateQuizPayload {
    id: string,
    data: Quiz,
    navigate: Function
}

export const useQuiz = () => {

    const dispatch = useAppDispatch();
    return {
        loadAllQuizzes: useCallback((params?: PaginationParams) => {
            dispatch(quizActions.loadAllQuizRequest(params || {}))
        }, [dispatch]),
        loadCurrentQuiz: useCallback((payload: QuizIdPayload) => {
            dispatch(quizActions.loadQuizRequest(payload))
        }, [dispatch]),
        createQuiz: useCallback((payload: CreateQuizPayload) => {
            dispatch(quizActions.createQuizRequest(payload))
        }, [dispatch]),
        deleteQuiz: useCallback((payload: QuizIdPayload) => {
            dispatch(quizActions.deleteQuizRequest(payload))
        }, [dispatch]),
        updateQuiz: useCallback((payload: UpdateQuizPayload) => {
            dispatch(quizActions.updateQuizRequest(payload))
        }, [dispatch]),

        loading: useAppSelector(state => state.quiz.loading),
        saveLoading: useAppSelector(state => state.quiz.saveLoading),
        quizzes: useAppSelector(state => state.quiz.quizzes),
        currentQuiz: useAppSelector(state => state.quiz.currentQuiz),
        noOfQuizzes: useAppSelector(state => state.quiz.noOfQuizzes),
        pagination: useAppSelector(state => state.quiz.pagination),
    }
}