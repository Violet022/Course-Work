import {legacy_createStore as createStore, applyMiddleware, combineReducers, compose, Action} from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

import authReducer from "./authentication/AuthReducer";
import appReducer from "./app/AppReducer";
import companiesReducer from "./companies/CompaniesReducer";
import companyReducer from "./company/CompanyReducer";
import positionsReducer from "./positions/PositionsReducer";
import profileReducer from "./profile/ProfileReducer";
import positionReducer from "./position/PositionReducer";
import stackReducer from "./stack/StackReducer";
import applicationsReducer from "./applications/ApplicationsReducer";
import applicationReducer from "./application/ApplicationReducer";
import studentsReducer from "./students/StudentsReducer";
import groupsReducer from "./groups/GroupsReducer";
import administrationReducer from "./administration/AdministrationReducer";
import curatorsReducer from "./curators/CuratorsReducer";

let rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    companies: companiesReducer,
    company: companyReducer,
    positions: positionsReducer,
    profile: profileReducer,
    position: positionReducer,
    stack: stackReducer,
    applications: applicationsReducer,
    application: applicationReducer,
    students: studentsReducer,
    groups: groupsReducer,
    administration: administrationReducer,
    curators: curatorsReducer
})

type RootReducerType = typeof rootReducer; 

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export type AppStateType = ReturnType<RootReducerType>
export type GetStateType = () => AppStateType
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.__store__ = store

export default store