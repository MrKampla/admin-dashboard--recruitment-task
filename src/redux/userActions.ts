import axios from 'axios';
import { Dispatch } from 'react';
import { User } from '../components/dashboard/interfaces';
import { ActionType, UserAction } from './userStore';

export interface AsyncActionCallbacks {
    thenCb?: () => void;
    catchCb?: () => void;
}

export function updateUsers() {
    return (dispatch: Dispatch<UserAction>, { thenCb, catchCb }: AsyncActionCallbacks) =>
        axios.get<User[]>('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data').then(res => {
            dispatch({ type: ActionType.ADD_USERS, payload: res.data })
            thenCb?.();
        }
        ).catch(err => {
            dispatch({ type: ActionType.ADD_USERS, payload: [] })
            catchCb?.()
        });
}

export function deleteUser(user: User, { thenCb, catchCb }: AsyncActionCallbacks) {
    return (dispatch: Dispatch<UserAction>) =>
        axios
            .post('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
            .then((res) => {
                dispatch({ type: ActionType.REMOVE_USER, payload: user })
                thenCb?.();
            }).catch(err => catchCb?.());
}

export function addNewUser(user: User, { thenCb, catchCb }: AsyncActionCallbacks) {
    return (dispatch: Dispatch<UserAction>) =>
        axios
            .post('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
            .then((res) => {
                dispatch({ type: ActionType.ADD_USER, payload: user })
                thenCb?.();
            }).catch(err => catchCb?.());
}

export function editUser(user: User, { thenCb, catchCb }: AsyncActionCallbacks) {
    return (dispatch: Dispatch<UserAction>) =>
        axios
            .post('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data').then((res) => {
                dispatch({ type: ActionType.EDIT_USER, payload: user })
                thenCb?.();
            }).catch(err => catchCb?.());
}