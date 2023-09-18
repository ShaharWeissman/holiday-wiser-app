import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import LocalStorageService from '../Services/LocalStorageService'
import { Role } from '../types'

type UserState = {
    isLoggedIn: boolean
    role: Role
    kickUser: boolean
}

const initialState: UserState = {
    isLoggedIn: false,
    role: 'User',
    kickUser: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: UserState, action: PayloadAction<Role>) => {
            state.isLoggedIn = true
            state.kickUser = false
            state.role = action.payload
        },
        logout: (state: UserState) => {
            state.isLoggedIn = false
            state.kickUser = true
            LocalStorageService.delete('token')
            LocalStorageService.delete('role')
        },
    },
})

export type { Role }
export const { login, logout } = authSlice.actions
export default authSlice.reducer
