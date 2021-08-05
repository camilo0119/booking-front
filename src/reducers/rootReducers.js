import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';
import { seasonReducer } from './seasonReducer';
import { uiReducer } from './uiReducers';

export const rootReducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
    season: seasonReducer,
})