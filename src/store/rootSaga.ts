import { all, Effect, fork } from 'redux-saga/effects';
import { authWatcherSaga } from './auth/authSaga';
import { questionWatcherSaga } from './questions/questionSaga';
import { quizWatcherSaga } from './quiz/quizSaga';

function* rootSaga(): Generator<Effect, void, unknown> {
    yield all([fork(authWatcherSaga)]);
    yield all([fork(questionWatcherSaga)]);
    yield all([fork(quizWatcherSaga)])
}

export default rootSaga;