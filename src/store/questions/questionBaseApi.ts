import callApi from "../../api/api";

interface QuestionData {
    question: string,
    explanation: string,
    marks: number,
    options: [
        {
            text: string,
            isCorrect: boolean
        }
    ],
}
interface QuestionIdPayload {
    id: string;
}

interface UpdateQuestionPayload {
    id: string;
    data: Partial<QuestionData>
}

export const GET_ALL_QUESTIONS = '/question/get-questions';
export const GET_QUESTION_BY_ID = '/question/get-question/';
export const CREATE_QUESTION = '/question/create-question';
export const UPDATE_QUESTION = '/question/update-question/';
export const DELETE_QUESTION = '/question/delete-question/';

const api = callApi();

export const getAllQuestions = async () => api.get(GET_ALL_QUESTIONS);

export const getQuestionById = async (payload: QuestionIdPayload) => {
    return api.get(`${GET_QUESTION_BY_ID}${payload.id}`)
}

export const createQuestion = async (payload: QuestionData) => {
    return api.post(CREATE_QUESTION, payload)
}

export const updateQuestion = async (payload: UpdateQuestionPayload) => {
    return api.put(`${UPDATE_QUESTION}${payload.id}`, payload.data)
}

export const deleteQuestion = async (payload: QuestionIdPayload) => {
    return api.delete(`${DELETE_QUESTION}${payload.id}`)
}