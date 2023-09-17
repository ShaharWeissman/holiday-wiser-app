import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer, { login } from './user.slice'
import vacationReducer, {  } from './vacations.slice'
import LocalStorageService from '../Services/LocalStorageService'

const store = configureStore({
    reducer: {
        auth: authReducer,
        vacations:vacationReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export default store

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const token = LocalStorageService.get('token')
const role = LocalStorageService.get('role')
console.log("🚀 ~ file: index.ts:23 ~ unsubscribe ~ token", token)
if (token) {
    store.dispatch(login(role))
}