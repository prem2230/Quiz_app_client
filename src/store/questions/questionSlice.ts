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
    noOfQuestions: null
}

const initialState: QuestionState = {
    loading: false,
    questions: [],
    currentQuestion: {},
    noOfQuestions: null
}

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        loadAllQuestions: (state, action) => {
            state.questions = action.payload.questions;
            state.loading = false;
            state.noOfQuestions = action.payload.noOfQuestions
        },
        loadCurrentQuestion: (state, action) => {
            state.currentQuestion = action.payload.question;
            state.loading = false;
        },
        removeQuestion: (state, action) => {
            state.questions = state.questions.filter((question: Question) => question._id !== action.payload.id);
            state.loading = false;
        }

    }
})

export const questionActions = {
    loadAllQuesRequest: createAction(`${questionSlice.name}/loadAllQuesRequest`),
    loadQuesRequest: createAction(`${questionSlice.name}/loadQuesRequest`, (payload) => { return { payload } }),
    createQuesRequest: createAction(`${questionSlice.name}/createQuesRequest`, (payload) => { return { payload } }),
    deleteQuesRequest: createAction(`${questionSlice.name}/deleteQuesRequest`, (payload) => { return { payload } }),

    setLoading: questionSlice.actions.setLoading,
    loadAllQuestions: questionSlice.actions.loadAllQuestions,
    loadCurrentQuestion: questionSlice.actions.loadCurrentQuestion,
    removeQuestion: questionSlice.actions.removeQuestion

}

export const selectQuestions = (state: { question: QuestionState }) => state.question.questions;
export const selectCurrentQuestion = (state: { question: QuestionState }) => state.question.currentQuestion;
export const selectQuesLoading = (state: { question: QuestionState }) => state.question.loading;
export const selectNoOfQuestions = (state: { question: QuestionState }) => state.question.noOfQuestions;

export default questionSlice.reducer;