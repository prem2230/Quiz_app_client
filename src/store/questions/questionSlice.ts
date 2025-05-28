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
    cachedQuestions: Question[] | [],
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
    cachedQuestions: [],
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
        setCachedQuestions: (state, action) => {
            state.cachedQuestions = action.payload;
        },
        loadAllQuestions: (state, action) => {
            const { questions, pagination, noOfQuestion, isFirstPage } = action.payload;
            if (isFirstPage) {
                state.questions = questions || [];
            } else {
                state.questions = [...state.questions, ...(questions || [])];
            }
            if (questions && questions.length > 0) {
                const existingQuestionsMap = new Map(
                    state.cachedQuestions.map(question => [question._id, question])
                );
                questions.forEach((ques: any) => {
                    existingQuestionsMap.set(ques._id, ques);
                });
                state.cachedQuestions = Array.from(existingQuestionsMap.values());
            }
            state.pagination = pagination;
            state.noOfQuestions = noOfQuestion;
        },
        loadCurrentQuestion: (state, action) => {
            state.currentQuestion = action.payload.question;
        },
        removeQuestion: (state, action) => {
            state.questions = state.questions.filter((question: Question) => question._id !== action.payload.id);
        },
        modifyQuestion: (state, action) => {
            state.questions = state.questions.map((question: Question) => {
                if (question._id === action.payload.question._id) {
                    return action.payload.question;
                }
                return question;
            });
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
    setCachedQuestions: questionSlice.actions.setCachedQuestions,
    loadAllQuestions: questionSlice.actions.loadAllQuestions,
    loadCurrentQuestion: questionSlice.actions.loadCurrentQuestion,
    removeQuestion: questionSlice.actions.removeQuestion,
    modifyQuestion: questionSlice.actions.modifyQuestion

}

export const selectQuestions = (state: { question: QuestionState }) => state.question.questions;
export const selectCachedQuestions = (state: { question: QuestionState }) => state.question.cachedQuestions;
export const selectCurrentQuestion = (state: { question: QuestionState }) => state.question.currentQuestion;
export const selectQuesLoading = (state: { question: QuestionState }) => state.question.loading;
export const selectSaveLoading = (state: { question: QuestionState }) => state.question.saveLoading;
export const selectNoOfQuestions = (state: { question: QuestionState }) => state.question.noOfQuestions;
export const selectPagination = (state: { question: QuestionState }) => state.question.pagination;

export default questionSlice.reducer;