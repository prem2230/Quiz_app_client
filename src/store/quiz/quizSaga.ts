import { call, delay, put, takeEvery } from "redux-saga/effects";
import { createQuiz, deleteQuiz, getAllQuizzes, getQuizById, updateQuiz } from "./quizBaseApi";
import { quizActions } from "./quizSlice";
import { snackbarActions } from "../snackbar/snackbarSlice";


interface Question {
    question?: string,
    id: string,
    options?: [
        {
            _id: string
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
    createdBy?: string,
    updatedBy?: string,
    createdAt?: string,
    updatedAt?: string,
}

interface QuizResponse {
    success: string,
    message: string,
    quiz: Quiz,
}

interface QuizzesResponse {
    success: string,
    message: string,
    data: Quiz[],
    noOfQuestion: number,
    pagination: {
        page: number,
        pages: number,
        total: number,
        hasMore: boolean
    }
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


export function* loadAllQuizSaga(action: { payload: PaginationParams }): Generator<any, void, QuizzesResponse> {
    try {
        yield put(quizActions.setLoading(true));
        const response = yield call(getAllQuizzes, action.payload);
        if (response.success) {
            yield put(quizActions.loadAllQuizzes(response));
        } else {
            yield put(snackbarActions.onError(response));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        console.error('Failed to fetch', error);
        yield put(snackbarActions.onError(errMsg));
    } finally {
        yield put(quizActions.setLoading(false));
    }
}

export function* loadQuizSaga(action: { payload: QuizIdPayload }): Generator<any, void, QuizResponse> {
    try {
        yield put(quizActions.setLoading(true));
        const response = yield call(getQuizById, action.payload);
        if (response.success) {
            yield put(quizActions.loadCurrentQuiz(response));
        } else {
            yield put(snackbarActions.onError(response));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        console.error('Failed to fetch', error);
        yield put(snackbarActions.onError(errMsg));
    } finally {
        yield put(quizActions.setLoading(false));
    }
}

export function* createQuizSaga(action: { payload: CreateQuizPayload }): Generator<any, void, QuizResponse> {
    try {
        yield put(quizActions.setSaveLoading(true));
        const { data, navigate } = action.payload;
        const response = yield call(createQuiz, data);
        if (response.success) {
            yield delay(1000);
            yield put(snackbarActions.onSuccess(response));
            navigate('/dashboard');
        } else {
            yield put(snackbarActions.onError(response));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        console.error('Failed to fetch', error);
        yield put(snackbarActions.onError(errMsg));
    } finally {
        yield put(quizActions.setSaveLoading(false));
    }
}

export function* deleteQuizSaga(action: { payload: QuizIdPayload }): Generator<any, void, QuizResponse> {
    try {
        yield put(quizActions.setSaveLoading(true));
        const response = yield call(deleteQuiz, action.payload);
        if (response.success) {
            yield put(quizActions.removeQuiz(response));
            yield put(snackbarActions.onSuccess(response));
        } else {
            yield put(snackbarActions.onError(response));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        console.error('Failed to fetch', error);
        yield put(snackbarActions.onError(errMsg));
    }
}

export function* updateQuizSaga(action: { payload: UpdateQuizPayload }): Generator<any, void, QuizResponse> {
    try {
        yield put(quizActions.setSaveLoading(true));
        const { navigate } = action.payload;
        const response = yield call(updateQuiz, action.payload);
        if (response.success) {
            yield delay(1000);
            yield put(quizActions.modifyQuiz(response));
            yield put(snackbarActions.onSuccess(response));
            navigate('/dashboard/view-quizzes');
        } else {
            yield put(snackbarActions.onError(response));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        console.error('Failed to fetch', error);
        yield put(snackbarActions.onError(errMsg));
    }
}

export function* quizWatcherSaga() {
    yield takeEvery((quizActions.loadAllQuizRequest as any).type, loadAllQuizSaga);
    yield takeEvery((quizActions.loadQuizRequest as any).type, loadQuizSaga);
    yield takeEvery((quizActions.createQuizRequest as any).type, createQuizSaga);
    yield takeEvery((quizActions.deleteQuizRequest as any).type, deleteQuizSaga);
    yield takeEvery((quizActions.updateQuizRequest as any).type, updateQuizSaga);
}