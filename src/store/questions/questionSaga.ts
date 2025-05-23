import { call, delay, put, takeEvery } from "redux-saga/effects";
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionById, updateQuestion } from "./questionBaseApi";
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

interface PaginationParams {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
    search?: string,
}
interface CreateQuestionPayload {
    data: QuestionData,
    navigate: Function
}
interface UpdateQuestionPayload {
    id: string;
    data: Partial<QuestionData>,
    navigate: Function
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

export function* loadAllQuestionSaga(action: { payload: PaginationParams }): Generator<any, void, QuestionsResponse> {
    try {
        yield put(questionActions.setLoading(true));
        const response = yield call(getAllQuestions, action.payload);
        if (response.success) {
            yield put(questionActions.loadAllQuestions(response));
        } else {
            yield put(snackbarActions.onError(response));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        console.error('Failed to fetch', error);
        yield put(snackbarActions.onError(errMsg));
    } finally {
        yield put(questionActions.setLoading(false));
    }
}

export function* loadQuestionSaga(action: { payload: QuestionIdPayload }): Generator<any, void, QuestionResponse> {
    try {
        yield put(questionActions.setLoading(true));
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
    } finally {
        yield put(questionActions.setLoading(false));
    }
}

export function* createQuestionSaga(action: { payload: CreateQuestionPayload }): Generator<any, void, QuestionResponse> {
    try {
        yield put(questionActions.setSaveLoading(true));
        const { data, navigate } = action.payload;
        yield put(questionActions.setSaveLoading(true));
        const response = yield call(createQuestion, data);
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
        yield put(questionActions.setSaveLoading(false));
    }
}

export function* deleteQuestionSaga(action: { payload: QuestionIdPayload }): Generator<any, void, QuestionResponse> {
    try {
        yield put(questionActions.setSaveLoading(true));
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

export function* updateQuestionSaga(action: { payload: UpdateQuestionPayload }): Generator<any, void, QuestionResponse> {
    try {
        yield put(questionActions.setSaveLoading(true));
        const { navigate } = action.payload;
        const response = yield call(updateQuestion, action.payload);
        if (response.success) {
            yield delay(1000);
            yield put(questionActions.modifyQuestion(response));
            yield put(snackbarActions.onSuccess(response));
            navigate('/dashboard/view-questions');
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
    yield takeEvery((questionActions.loadAllQuesRequest as any).type, loadAllQuestionSaga);
    yield takeEvery((questionActions.loadQuesRequest as any).type, loadQuestionSaga);
    yield takeEvery((questionActions.createQuesRequest as any).type, createQuestionSaga);
    yield takeEvery((questionActions.deleteQuesRequest as any).type, deleteQuestionSaga);
    yield takeEvery((questionActions.updateQuesRequest as any).type, updateQuestionSaga);
}