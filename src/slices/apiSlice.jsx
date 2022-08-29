import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = 'http://localhost:8000/';

export const getTasks = createAsyncThunk(
    "tasks / get",
    async () => {
        const data = await fetch(API_URL + "tasks")
        return data.json()
    }
)
//formdata
export const createTask = createAsyncThunk(
    "tasks / create",
    async (data) => {
        console.log(data)
        await fetch(API_URL + "add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }
)
//No endpoint yet
export const updateTask = createAsyncThunk(
    "tasks / update",
    async (data) => {
        console.log(data)
        await fetch(API_URL + "", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }
)
export const createAccount = createAsyncThunk(
    "account / create",
    async (data) => {
        let res = await fetch(API_URL + "auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            let resdata = await res.text()
            return resdata
        }
    }

)
export const login = createAsyncThunk(
    "account / login",
    async (data) => {
        console.log(data)
        let res = await fetch(API_URL + "auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        console.log(res.status)
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            let resdata = await res.text()
            return resdata
        }
    }
)
export const getUsers = createAsyncThunk(
    "users / get",
    async (data) => {
        let res = await fetch(API_URL + "tasks/get-all-users")
        console.log(res.status)
        if (res.status !== 200) {
            throw new Error(res)
        }
        else {
            let resdata = await res.text()
            return resdata
        }
    }
)
const apiSlice = createSlice({
    name: "apiSlice",
    initialState: {
        tasks: [],
        error: "",
        loading: false,
        profile: null,
        users: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(getTasks.rejected, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.tasks = action.payload
        })
        builder.addCase(createTask.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(createTask.rejected, (state, action) => {
            // state.loading =""
            state.error = action.payload
        })
        builder.addCase(updateTask.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(updateTask.rejected, (state, action) => {
            // state.loading =""
            state.error = action.payload
        })
        builder.addCase(login.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(login.rejected, (state, action) => {
            // state.loading =""
            state.error = action.error.message
            console.log(action.error.message)
        })
        builder.addCase(login.fulfilled, (state, action) => {
            // state.profile = action.payload._id
            console.log(action.payload)
            // localStorage.setItem('ACCESS_TOKEN', action.payload.accessToken);
            // localStorage.setItem('REFRESH_TOKEN', action.payload.refreshToken);
        })
        builder.addCase(createAccount.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(createAccount.rejected, (state, action) => {
            // state.loading =""
            state.error = action.error.message
            console.log(action.error.message)
        })
        builder.addCase(createAccount.fulfilled, (state, action) => {
            // state.profile = action.payload._id
            localStorage.setItem('ACCESS_TOKEN', action.payload.accessToken);
            localStorage.setItem('REFRESH_TOKEN', action.payload.refreshToken);
        })
        builder.addCase(getUsers.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            // state.loading =""
            state.error = action.payload
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })

    }
}
);
export default apiSlice.reducer
export const { } = apiSlice.actions