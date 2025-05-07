import {all, Effect, fork} from 'redux-saga/effects';
import { authWatcherSaga } from './auth/authSaga';

function* rootSaga(): Generator<Effect, void, unknown> {
    yield all([fork(authWatcherSaga)]);
}

export default rootSaga;