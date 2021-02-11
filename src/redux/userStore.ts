import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { User } from '../components/dashboard/interfaces'

export interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: []
}

export enum ActionType {
    ADD_USER = 'ADD_USER',
    ADD_USERS = 'ADD_USERS',
    REMOVE_USER = 'REMOVE_USER',
    EDIT_USER = 'EDIT_USER'
}

export type UserAction = {
    type: ActionType.ADD_USER | ActionType.REMOVE_USER | ActionType.EDIT_USER,
    payload: User;
} | {
    type: ActionType.ADD_USERS,
    payload: User[]
};

function userReducer(state = initialState, action: UserAction) {
    switch (action.type) {
        case ActionType.ADD_USERS:
            return { ...state, users: [...action.payload] }
        case ActionType.ADD_USER:
            return { ...state, users: [...state.users.concat([action.payload])] };
        case ActionType.REMOVE_USER:
            return { ...state, users: [...state.users.filter(user => user.id !== action.payload.id)] };
        case ActionType.EDIT_USER:
            return { ...state, users: [...state.users.map(user => user.id === action.payload.id ? action.payload : user)] };
        default:
            return state
    }
}

const store = createStore(userReducer, { users: [] }, applyMiddleware(thunk));

export default store;