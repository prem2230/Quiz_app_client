import callApi from "../../api/api";

interface Question {
    id: string,
    question?: string,
    explanation?: string,
    marks?: number,
    options?: [
        {
            text?: string,
            isCorrect?: boolean
        }
    ],
    createdBy?: string,
    updatedBy?: string,
    createdAt?: string,
    updatedAt?: string,
}

interface Quiz {
    title: string,
    description: string,
    duration: number,
    difficulty: 'easy' | 'medium' | 'hard',
    questions: Question[],
}

interface QuizIdPayload {
    id: string
}

interface UpdateQuizPayload {
    id: string,
    data: Quiz
}

interface PaginationParams {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
    search?: string,
}

export const GET_ALL_QUIZZES = '/quiz/get-quizzes';
export const GET_QUIZ_BY_ID = '/quiz/get-quiz/';
export const CREATE_QUIZ = '/quiz/create-quiz';
export const UPDATE_QUIZ = '/quiz/update-quiz/';
export const DELETE_QUIZ = '/quiz/delete-quiz/';

const api = callApi();

export const getAllQuizzes = async (payload: PaginationParams) => {
    return api.get(GET_ALL_QUIZZES, { params: payload } as any);
}

export const getQuizById = async (payload: QuizIdPayload) => {
    return api.get(`${GET_QUIZ_BY_ID}${payload.id}`)
}

export const createQuiz = async (payload: Quiz) => {
    return api.post(CREATE_QUIZ, payload)
}

export const updateQuiz = async (payload: UpdateQuizPayload) => {
    return api.put(`${UPDATE_QUIZ}${payload.id}`, payload.data)
}

export const deleteQuiz = async (payload: QuizIdPayload) => {
    return api.delete(`${DELETE_QUIZ}${payload.id}`)
}