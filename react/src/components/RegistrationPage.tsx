import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store';
import { registerUser } from "../store/registrationSlice/registrationThunks";

const RegistrationPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  const dispatch = useDispatch<AppDispatch>();
  const registrationState = useSelector((state: RootState) => state.registration);

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
