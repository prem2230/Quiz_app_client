import { call, put, takeEvery } from "redux-saga/effects";
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionById } from "./questionBaseApi";
import { questionActions } from "./questionSlice";
import { snackbarActions } from "../snackbar/snackbarSlice";


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

interface QuestionResponse {
    success: string,
    message: string,
    question: QuestionData
}

interface QuestionsResponse {
    success: string,
    message: string,
    data: QuestionData[],
    noOfQUestion: number
}

interface QuestionIdPayload {
    id: string;
}

export function* loadAllQuestionSaga(): Generator<any, void, QuestionsResponse> {
    try {
        const response = yield call(getAllQuestions);
        if (response.success) {
            yield put(questionActions.loadAllQuestions(response));
        } else {
            yield put(snackbarActions.onError(response));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        console.error('Failed to fetch', error);
        yield put(snackbarActions.onError(errMsg));
    }
}

export function* loadQuestionSaga(action: { payload: QuestionIdPayload }): Generator<any, void, QuestionResponse> {
    try {
        const response = yield call(getQuestionById, action.payload);
        if (response.success) {
            yield put(questionActions.loadCurrentQuestion(response));
        } else {
            yield put(snackbarActions.onError(response));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        console.error('Failed to fetch', error);
        yield put(snackbarActions.onError(errMsg));
    }
}

export function* createQuestionSaga(action: { payload: QuestionData }): Generator<any, void, QuestionResponse> {
    try {
        const response = yield call(createQuestion, action.payload);
        if (response.success) {
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

export function* deleteQuestionSaga(action: { payload: QuestionIdPayload }): Generator<any, void, QuestionResponse> {
    try {
        const response = yield call(deleteQuestion, action.payload);
        if (response.success) {
            yield put(questionActions.removeQuestion(response));
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


export function* questionWatcherSaga() {
    yield takeEvery(questionActions.loadAllQuesRequest.type, loadAllQuestionSaga);
    yield takeEvery((questionActions.loadQuesRequest as any).type, loadQuestionSaga);
    yield takeEvery((questionActions.createQuesRequest as any).type, createQuestionSaga);
    yield takeEvery((questionActions.deleteQuesRequest as any).type, deleteQuestionSaga);
}