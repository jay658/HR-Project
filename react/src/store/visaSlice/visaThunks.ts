import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface userData{
    username: string
}

interface uploadFileType{
    username: string,
    type: string,
    fileKey: string,
    fileURL: string
}

const fetchVisaType = createAsyncThunk(
    'visa/fetchVisaType',
    async(userData: userData, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/visa/visatype', {
                params: {
                    username: userData.username
                }
            })
            console.log(response.data)
            return response.data

        } catch (error: any) {
            console.log(error.response.data)
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch visa type')
        }
    }
)

const fetchNextDocument = createAsyncThunk(
    'visa/fetchNextDocument',
    async (userData: userData, { rejectWithValue }) => {
        try{
            const response = await axios.get('http://localhost:3000/api/visa/next-document', {
                params: {
                    username: userData.username
                }
            })
            console.log(response.data)
            return response.data.nextRequiredDocument

        } catch (error : any){
            console.log(error.response.data)
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch visa type')
        }
    }
)

const fetchAllDocument = createAsyncThunk(
    'visa/fetchAllDocument',
    async (userData: userData, {rejectWithValue}) => {
        try{
            const response = await axios.get('http://localhost:3000/api/visa/status', {
                params: {
                    username: userData.username
                }
            })
            console.log(response.data)
            return response.data
        } catch (error : any){
            console.log(error.response.data)
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch visa type')
        }
    }
)

const uploadFile = createAsyncThunk(
    'visa/uploadFile',
    async (uploadFile : uploadFileType, {rejectWithValue} ) => {
        try {
            console.log(uploadFile)
            const response = await axios.post('http://localhost:3000/api/visa/upload', uploadFile);
            console.log(response.data)
            return response.data;
        }catch (error : any){
            console.log(error.response.data)
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch visa type')
        }
    }
)

  
export { 
    fetchVisaType,
    fetchNextDocument,
    fetchAllDocument,
    uploadFile
  }