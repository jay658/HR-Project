import { axiosInstance } from '../../interceptor/interceptor';
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
            const response = await axiosInstance.post('/user/register', registerData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || 'Registration failed'
            );
        }
    }
);



export{
    registerUser
}