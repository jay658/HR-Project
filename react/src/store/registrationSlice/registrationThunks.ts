import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

const registerUser = createAsyncThunk(
    'registration/registerUser',
    async (registerData: RegisterData, { rejectWithValue }) => {
        try {
            console.log(registerData)
            const response = await axios.post('http://localhost:3000/api/user/register', registerData);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            console.log(error.response.data)
            return rejectWithValue(
                error.response?.data?.error || 'Registration failed'
            );
        }
    }
);

export{
    registerUser
}