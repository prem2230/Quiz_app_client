import createSagaMiddleware from 'redux-saga';
import { configureStore, EnhancedStore, Middleware } from '@reduxjs/toolkit';

import rootSaga from './rootSaga';
import rootReducer from './rootStore';
import { RootState } from './rootStore';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const makeStore = (): EnhancedStore<RootState> => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: false,
                serializableCheck: false,
            }).concat(sagaMiddleware as Middleware),
    });

    sagaMiddleware.run(rootSaga);
    return store;
};

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;

export type { RootState };

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
