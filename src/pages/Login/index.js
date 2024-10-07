import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    InputAdornment,
    IconButton,
    Alert,

} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/common/Error-message';
import { ValidatorError } from '../../utils/ValidationError';
import EyeIcon from '../../components/SVG/Eye-icon';
import https from '../../https/https';
import Cookies from "js-cookie";

function App() {
    const navigate = useNavigate();
    const [payload, setPayload] = useState()
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
            const response = await https.post('auth/login', payload)

            if (response?.data?.token) {
                Cookies.set("user_login", JSON.stringify(response?.data))
                navigate('/job')
            }
            response?.data?.error?.message && setShowError({
                message: response?.data?.error?.message,
                showMessage: true,
            })


        } catch (error) {
            setError(ValidatorError(error?.response?.data?.error?.detail))
        }

    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: '2rem', marginTop: '4rem' }}>
                <Box >
                    <Typography variant="h4" align='center' gutterBottom>
                        Login
                    </Typography>
                    {showError?.showMessage && <Alert severity="error">{showError?.message}</Alert>}

                    <Box component="form" onSubmit={submitHandle} sx={{ mt: 1 }}>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2, height: '45px' }}
                        >
                            Login
                        </Button>
                        <Box textAlign="center" mt={2}>
                            <Typography variant="body2" color="textSecondary">
                                Don’t have an account?{' '}
                                <NavLink to="/signup" underline="hover">
                                    Sign up now!
                                </NavLink>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default App;
