<<<<<<< HEAD
import axios from 'axios'
=======
import { axiosInstance } from '../../interceptor/interceptor'
>>>>>>> main
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
<<<<<<< HEAD
            const response = await axios.get('http://localhost:3000/api/visa/visatype', {
                params: {
                    username: userData.username
                }
            })
=======
            const response = await axiosInstance.get('/visa/visatype')
>>>>>>> main
            // console.log(response.data)
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
<<<<<<< HEAD
            const response = await axios.get('http://localhost:3000/api/visa/next-document', {
                params: {
                    username: userData.username
                }
            })
=======
            const response = await axiosInstance.get('/visa/next-document')
>>>>>>> main
            // console.log(response.data)
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
<<<<<<< HEAD
            const response = await axios.get('http://localhost:3000/api/visa/status', {
                params: {
                    username: userData.username
                }
            })
=======
            const response = await axiosInstance.get('/visa/status')
>>>>>>> main
            // console.log(response.data)
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
<<<<<<< HEAD
            const response = await axios.post('http://localhost:3000/api/visa/upload', uploadFile);
=======
            const response = await axiosInstance.post('/visa/upload', uploadFile);
>>>>>>> main
            // console.log(response.data)
            return response.data;
        }catch (error : any){
            console.log(error.response.data)
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch visa type')
        }
    }
)

const createVisa = createAsyncThunk(
    'visa/fetchVisa',
    async (userData: userData, {rejectWithValue}) => {
        try{
<<<<<<< HEAD
            const response = await axios.post('http://localhost:3000/api/visa/create', userData)
=======
            const response = await axiosInstance.post('/visa/create', userData)
>>>>>>> main
            // console.log("Visa",response.data)
            return response.data
        } catch (error : any){
            console.log(error.response.data)
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch visa type')
        }
    }
)

const fetchFileURL = createAsyncThunk(
    'visa/fetchFileURL',
    async(fileData : File, {rejectWithValue}) => {
        try{
            const formData = new FormData();
            formData.append('file', fileData);
<<<<<<< HEAD
            const response = await axios.post('http://localhost:3000/api/visa/getfileurl', formData)
=======
            const response = await axiosInstance.post('/visa/getfileurl', formData)
>>>>>>> main
            console.log("File", response.data)
            return response.data
        }catch (error : any){
            console.log(error.response.data)
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch file url')
        }
    }
)

  
export { 
    fetchVisaType,
    fetchNextDocument,
    fetchAllDocument,
    uploadFile,
    createVisa,
    fetchFileURL
  }