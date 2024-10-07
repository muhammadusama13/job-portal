import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Alert, IconButton, InputAdornment } from '@mui/material';
import { NavLink } from 'react-router-dom';
import https from '../../https/https';
import EyeIcon from '../../components/SVG/Eye-icon';
import { ValidatorError } from '../../utils/ValidationError';
import ErrorMessage from '../../components/common/Error-message';


function SignUpPage() {


    const [payload, setPayload] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [password, setpassword] = useState(false)
    const [showError, setShowError] = useState({
        showMessage: false,
        message: ''
    })
    const [error, setError] = useState({})

    const handleChange = (e) => {
        setPayload((prve) => {
            return { ...prve, [e.target.name]: e.target.value }
        })
    };

    const submitHandle = async (e) => {
        setShowError({
            message: '',
            showMessage: false,
        })
        e.preventDefault();
        try {
            const response = await https.post('auth/register', payload)
            console.log('response', response?.data?.message)
            setShowError({
                message: response?.data?.message,
                showMessage: true,
            })
            hideAlert()
        } catch (error) {
            setError(ValidatorError(error?.response?.data?.error?.detail))
        }

    };

    const hideAlert = () => {
        setTimeout(() => {
            setShowError({
                message: '',
                type: '',
                showMessage: false,
            })
            setPayload({
                name: '',
                password: '',
                email: '',
                conform_password: ''
            })


        }, 3000)
    }

    return (
        <>

            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ padding: '2rem', marginTop: '4rem' }}>
                    <Box >
                        <Typography variant="h4" align='center' gutterBottom>
                            Sign Up
                        </Typography>
                        <Box component="form" onSubmit={submitHandle} sx={{ mt: 1 }}>
                            {showError?.showMessage && <Alert severity="success">{showError?.message}</Alert>}
                            <Box component='div' fullWidth>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={payload?.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{ height: '45px' }}
                                />
                                {error?.Name && <ErrorMessage message={error?.Name} />}

                            </Box>
                            <Box component='div' fullWidth>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={payload?.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{ height: '45px' }}
                                />
                                {error?.Email && <ErrorMessage message={error?.Email} />}

                            </Box>
                            <Box component='div' fullWidth>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={password ? "text" : "password"}
                                    value={payload?.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{ height: '45px' }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setpassword(!password)}
                                                    edge="end"
                                                >
                                                    <EyeIcon color={password ? '#4da1ac' : ''} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {error?.Password && <ErrorMessage message={error?.Password} />}

                            </Box>
                            <Box component='div' fullWidth>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="conform_password"
                                    label="Conform password"
                                    type={showPassword ? "text" : "password"}
                                    value={payload?.conform_password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{ height: '45px' }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    <EyeIcon color={showPassword ? '#4da1ac' : ''} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {error?.Conform && <ErrorMessage message={error?.Conform} />}

                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2, height: '45px' }}
                            >
                                Sign Up
                            </Button>
                            <Box textAlign="center" mt={2}>
                                <Typography variant="body2" color="textSecondary">
                                    Already have an account?{' '}
                                    <NavLink to="/" underline="hover">
                                        Sign in
                                    </NavLink>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>


        </>
    );
}

export default SignUpPage;
