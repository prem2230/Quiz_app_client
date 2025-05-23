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
    saveLoading: boolean,
    questions: Question[] | [],
    currentQuestion: Question | {},
    noOfQuestions: null,
    pagination: {
        page: number,
        pages: number,
        total: number,
        hasMore: boolean
    }
}

const initialState: QuestionState = {
    loading: false,
    saveLoading: false,
    questions: [],
    currentQuestion: {},
    noOfQuestions: null,
    pagination: {
        page: 0,
        pages: 0,
        total: 0,
        hasMore: false
    }
}

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSaveLoading: (state, action) => {
            state.saveLoading = action.payload;
        },
        loadAllQuestions: (state, action) => {
            state.questions = action.payload.questions;
            state.pagination = action.payload.pagination;
            state.noOfQuestions = action.payload.noOfQuestions
        },
        loadCurrentQuestion: (state, action) => {
            state.currentQuestion = action.payload.question;
        },
        removeQuestion: (state, action) => {
            state.questions = state.questions.filter((question: Question) => question._id !== action.payload.id);
            state.saveLoading = false;
        },
        modifyQuestion: (state, action) => {
            state.questions = state.questions.map((question: Question) => {
                if (question._id === action.payload.question._id) {
                    return action.payload.question;
                }
                return question;
            });
            state.saveLoading = false;
            state.currentQuestion = {};
        }


    }
})

export const questionActions = {
    loadAllQuesRequest: createAction(`${questionSlice.name}/loadAllQuesRequest`, (payload) => { return { payload } }),
    loadQuesRequest: createAction(`${questionSlice.name}/loadQuesRequest`, (payload) => { return { payload } }),
    createQuesRequest: createAction(`${questionSlice.name}/createQuesRequest`, (payload) => { return { payload } }),
    deleteQuesRequest: createAction(`${questionSlice.name}/deleteQuesRequest`, (payload) => { return { payload } }),
    updateQuesRequest: createAction(`${questionSlice.name}/updateQuesRequest`, (payload) => { return { payload } }),

    setLoading: questionSlice.actions.setLoading,
    setSaveLoading: questionSlice.actions.setSaveLoading,
    loadAllQuestions: questionSlice.actions.loadAllQuestions,
    loadCurrentQuestion: questionSlice.actions.loadCurrentQuestion,
    removeQuestion: questionSlice.actions.removeQuestion,
    modifyQuestion: questionSlice.actions.modifyQuestion

}

export const selectQuestions = (state: { question: QuestionState }) => state.question.questions;
export const selectCurrentQuestion = (state: { question: QuestionState }) => state.question.currentQuestion;
export const selectQuesLoading = (state: { question: QuestionState }) => state.question.loading;
export const selectSaveLoading = (state: { question: QuestionState }) => state.question.saveLoading;
export const selectNoOfQuestions = (state: { question: QuestionState }) => state.question.noOfQuestions;
export const selectPagination = (state: { question: QuestionState }) => state.question.pagination;

export default questionSlice.reducer;