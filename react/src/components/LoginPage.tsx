import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "test" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/onboarding");
    } else {
      alert("Invalid credentials");
    }
  };
  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch('http://localhost:3000/api/hr/user/test')
      const data = await res.json()
      console.log(data)
    }

    fetchData()
  }, [])

  
  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
