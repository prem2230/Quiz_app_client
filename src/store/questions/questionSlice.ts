import { createAction, createSlice } from "@reduxjs/toolkit"

interface Question {
    _id: string,
    question: string,
    options: [
        {
            _id: string,
            text: string,
            isCorrect: boolean
        }
    ],
    explanation: string,
    marks: number,
    createdBy: string,
    updatedBy: string,
    createdAt: string,
    updatedAt: string,
}

interface QuestionState {
    loading: boolean,
    questions: Question[] | [],
    currentQuestion: Question | {},
    error: null,
    success: null,
    noOfQuestions: null
}

const initialState: QuestionState = {
    loading: false,
    questions: [],
    currentQuestion: {},
    error: null,
    success: null,
    noOfQuestions: null
}

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        loadAllQuestions: (state, action) => {
            state.questions = action.payload.questions;
            state.loading = false;
            state.success = action.payload.message;
            state.error = null;
            state.noOfQuestions = action.payload.noOfQuestions
        },
        loadCurrentQuestion: (state, action) => {
            state.currentQuestion = action.payload.question;
            state.loading = false;
            state.success = action.payload.message;
            state.error = null;
        }

    }
})

export const questionActions = {
    loadAllQuesRequest: createAction(`${questionSlice.name}/loadAllQuesRequest`),
    loadQuesRequest: createAction(`${questionSlice.name}/loadQuesRequest`, (payload) => { return { payload } }),

    setLoading: questionSlice.actions.setLoading,
    setError: questionSlice.actions.setError,
    loadAllQuestions: questionSlice.actions.loadAllQuestions,
    loadCurrentQuestion: questionSlice.actions.loadCurrentQuestion

}

export const selectQuestions = (state: { question: QuestionState }) => state.question.questions;
export const selectCurrentQuestion = (state: { question: QuestionState }) => state.question.currentQuestion;
export const selectQuesLoading = (state: { question: QuestionState }) => state.question.loading;
export const selectQuesError = (state: { question: QuestionState }) => state.question.error;
export const selectQuesSuccess = (state: { question: QuestionState }) => state.question.success;
export const selectNoOfQuestions = (state: { question: QuestionState }) => state.question.noOfQuestions;

export default questionSlice.reducer;