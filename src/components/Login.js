import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Grid, Box, Paper } from '@mui/material';
import loginImage from '../assets/login-image.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username === 'admin' && password === 'admin') {
            navigate('/pokemon-list');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                height: '100vh', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    backgroundColor: 'white',
                    width: '100%',
                    borderRadius:'10px'
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <img
                                src={loginImage}
                                alt="Login Illustration"
                                style={{ width: '100%', maxWidth: '400px' }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '0px' }}>
                                PhinCon
                            </Typography>
                            <Typography variant="body1" gutterBottom sx={{ marginBottom: '4px' }}>
                                Sign in to your account
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    error={!!error}
                                    helperText={error && "Please enter a valid username."}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!error}
                                    helperText={error && "Please enter a valid password."}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                    <a href="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
                                        Forgot Password?
                                    </a>
                                </Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                {error && (
                                    <Typography variant="body2" color="error" align="center">
                                        {error}
                                    </Typography>
                                )}
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Login;
