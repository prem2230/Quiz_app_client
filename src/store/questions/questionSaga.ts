import { call, put, takeEvery } from "redux-saga/effects";
import { getAllQuestions, getQuestionById } from "./questionBaseApi";
import { questionActions } from "./questionSlice";


interface QuestionData {
    question: string,
    _id: string,
    options: [
        {
            _id: string
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
            yield put(questionActions.setError(response.message));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        yield put(questionActions.setError(errMsg));
    }
}

export function* loadQuestionSaga(action: { payload: QuestionIdPayload }): Generator<any, void, QuestionResponse> {
    try {
        const response = yield call(getQuestionById, action.payload);
        if (response.success) {
            yield put(questionActions.loadCurrentQuestion(response));
        } else {
            yield put(questionActions.setError(response.message));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        yield put(questionActions.setError(errMsg));
    }
}


export function* questionWatcherSaga() {
    yield takeEvery(questionActions.loadAllQuesRequest.type, loadAllQuestionSaga);
    yield takeEvery((questionActions.loadQuesRequest as any).type, loadQuestionSaga);
}