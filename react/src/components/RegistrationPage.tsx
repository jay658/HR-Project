import { AppDispatch, RootState } from '../store/store';
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom";

import axios from 'axios';
import { registerUser } from "../store/registrationSlice/registrationThunks";

const RegistrationPage: React.FC = () => {
  const location = useLocation()
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  const dispatch = useDispatch<AppDispatch>();
  const registrationState = useSelector((state: RootState) => state.registration);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async() => {
      try{
        const token = location.pathname.split('/register/')[1]

        if(!token) throw new Error('Token is missing')

        const res = await axios.post('http://localhost:3000/api/employee/user/register/validate', {token}) 
        setEmail(res.data)
      }catch(err){
        navigate('/')
      }
    }
    
    validateToken()
  }, [location.pathname])
  
  const handleRegister = async () => {
    const registerData = {
      username: username,
      email: email,
      password: password
    }

    const result = await dispatch(registerUser(registerData));

    if(!result.hasOwnProperty('error')){
      setUsername("");
      setPassword("");
      setEmail('')
      navigate('/login');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: "auto", mt: 5 }}>
      {registrationState.error && (
        <Typography color="error" sx={{ mb: 2 }}>
            {registrationState.error}
        </Typography>
      )}
      <Typography variant="h4" gutterBottom>
        Registration
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={true}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegistrationPage;