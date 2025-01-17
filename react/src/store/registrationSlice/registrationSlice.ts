import { createSlice } from "@reduxjs/toolkit"
import { registerUser } from "./registrationThunks";

interface RegistrationState {
    error: string | null;
    isLoading: boolean;
}

const initialState: RegistrationState = {
    error: null,
    isLoading: false
}

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = registrationSlice.actions;
export default registrationSlice.reducer;

