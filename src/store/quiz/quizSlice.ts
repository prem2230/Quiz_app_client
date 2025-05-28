import { createAction, createSlice } from "@reduxjs/toolkit";

interface Question {
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

interface Quiz {
    _id: string;
    title: string;
    description: string;
    duration: number;
    difficulty: 'easy' | 'medium' | 'hard',
    questions: Question[];
    createdBy: string,
    updatedBy: string,
    createdAt: string,
    updatedAt: string
}

interface QuizState {
    loading: boolean,
    saveLoading: boolean,
    quizzes: Quiz[] | [],
    currentQuiz: Quiz | {},
    noOfQuizzes: null,
    pagination: {
        page: number,
        pages: number,
        total: number,
        hasMore: boolean
    }
}

const initialState: QuizState = {
    loading: false,
    saveLoading: false,
    quizzes: [],
    currentQuiz: {},
    noOfQuizzes: null,
    pagination: {
        page: 0,
        pages: 0,
        total: 0,
        hasMore: false
    }
}

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSaveLoading: (state, action) => {
            state.saveLoading = action.payload;
        },
        loadAllQuizzes: (state, action) => {
            state.quizzes = action.payload.quizzes;
            state.pagination = action.payload.pagination;
            state.noOfQuizzes = action.payload.noOfQuizzes
        },
        loadCurrentQuiz: (state, action) => {
            state.currentQuiz = action.payload.quiz;
        },
        removeQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter((quiz: Quiz) => quiz._id !== action.payload.id);
        },
        modifyQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz: Quiz) => {
                if (quiz._id === action.payload.quiz.id) {
                    return action.payload.quiz;
                }
                return quiz;
            });
            state.currentQuiz = {};
        }
    }
})

export const quizActions = {
    loadAllQuizRequest: createAction(`${quizSlice.name}/loadAllQuizRequest`, (payload) => { return { payload } }),
    loadQuizRequest: createAction(`${quizSlice.name}/loadQuizRequest`, (payload) => { return { payload } }),
    createQuizRequest: createAction(`${quizSlice.name}/createQuizRequest`, (payload) => { return { payload } }),
    updateQuizRequest: createAction(`${quizSlice.name}/updateQuizRequest`, (payload) => { return { payload } }),
    deleteQuizRequest: createAction(`${quizSlice.name}/deleteQuizRequest`, (payload) => { return { payload } }),

    setLoading: quizSlice.actions.setLoading,
    setSaveLoading: quizSlice.actions.setSaveLoading,
    loadAllQuizzes: quizSlice.actions.loadAllQuizzes,
    loadCurrentQuiz: quizSlice.actions.loadCurrentQuiz,
    removeQuiz: quizSlice.actions.removeQuiz,
    modifyQuiz: quizSlice.actions.modifyQuiz
}

export const selectQuizzes = (state: { quiz: QuizState }) => state.quiz.quizzes;
export const selectCurrentQuiz = (state: { quiz: QuizState }) => state.quiz.currentQuiz;
export const selectQuizLoading = (state: { quiz: QuizState }) => state.quiz.loading;
export const selectSaveLoading = (state: { quiz: QuizState }) => state.quiz.saveLoading;
export const selectNoOfQuizzes = (state: { quiz: QuizState }) => state.quiz.noOfQuizzes;
export const selectPagination = (state: { quiz: QuizState }) => state.quiz.pagination;

export default quizSlice.reducer;