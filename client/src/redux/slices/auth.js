import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from './../../axiosAPI.js'

const initialState = {
    userEmail: null,
    status: 'loading',
}

export const registration = createAsyncThunk(
    "auth-registration",
    async (params) => { 
    const { data } = await axios.post('/register', params)
    console.log(data)
    return data
  }
)

export const login = createAsyncThunk(
    "auth-login",
    async (params) => { 
        console.log(params)   
    const { data } = await axios.post('/login', params)
    console.log(data)
    return data
  }
)

export const fetchUserData = createAsyncThunk(
    "fetchUserData",
    async () => {   
    const { data } = await axios.get('/me')
    return data
  }
)

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        logout: (state) => {
            state.userEmail = null
            window.localStorage.removeItem("token")
        },
    }, 

    extraReducers: {
        [registration.pending]: (state) => {
            state.userEmail = null
            state.status = 'loading'
        },
        [registration.fulfilled]: (state, action) => {
            state.userEmail = action.payload.email
            state.status = 'loaded'
        },
        [registration.rejected]: (state) => {
            state.userEmail = null
            state.status = 'error'
        },
        [login.pending]: (state) => {
            state.userEmail = null
            state.status = 'loading'
        },
        [login.fulfilled]: (state, action) => {
            state.userEmail = action.payload.email
            state.status = 'loaded'
        },
        [login.rejected]: (state) => {
            state.userEmail = null
            state.status = 'error'
        },
        [fetchUserData.pending]: (state) => {
            state.userEmail = null
            state.status = 'loading'
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.userEmail = action.payload.email
            state.status = 'loaded'
        },
        [fetchUserData.rejected]: (state) => {
            state.userEmail = null
            state.status = 'error'
        },
    },

    // extraReducers2: (builder) => {
    //     builder
    //       .addCase(incrementBy, (state, action) => {

    //       })

    //       .addCase(decrement, (state, action) => {})
    //       // You can match a range of action types
    //       .addMatcher(
    //         isRejectedAction,

    //         (state, action) => {}
    //       )

    //       .addDefaultCase((state, action) => {})
    //   },
    // })
})

export const isAuthSelector = (state) => Boolean(state.auth.userEmail)
export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions