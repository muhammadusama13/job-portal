import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import CrossIcon from '../../assets/images/cross.svg';

import { Container, TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, Alert } from '@mui/material';
import https from '../../https/https';
import { ValidatorError } from '../../utils/ValidationError';
import getUserData from '../../utils/getUserDate';
import ErrorMessage from '../../components/common/Error-message';

const CreateJob = ({ open, setOpen, callback }) => {
    const userData = getUserData()
    const [payload, setPayload] = useState()


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
        setError({})
        e.preventDefault();
        try {
            const response = await https.post('jobs',
                { ...payload, userId: userData?.user?._id }
            )
            setShowError({
                message: response?.data?.message,
                showMessage: true,
                type: 'success'
            })
            hideAlert()
            callback()

        } catch (error) {
            setError(ValidatorError(error?.response?.data?.detail))
        }

    };
    const hideAlert = () => {
        setTimeout(() => {
            setShowError({
                message: '',
                type: '',
                showMessage: false,
            })
            setPayload({})
            setOpen(false)

        }, 3000)
    }

    const jobCategories = [
        'Sales & Marketing',
        'Creative',
        'Human Resource',
        'Administration',
        'Digital Marketing',
        'Development',
        'Engineering',
    ];
    return (
        <>
            <Dialog
                open={open}
                onClose={setOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Container sx={{ width: '550px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} my={4}>
                        <Typography variant="h6" component="h1" gutterBottom>
                            Create a New Job Posting
                        </Typography>
                        <img src={CrossIcon} onClick={() => setOpen(false)} alt='' role='button' />
                    </Box>
                    <Box my={4}>
                        {showError?.showMessage && <Alert severity={showError?.type}>{showError?.message}</Alert>}

                    </Box>

                    <form onSubmit={submitHandle}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                id="title"
                                label="Job Title"
                                name="title"
                                value={payload?.title}
                                onChange={handleChange}
                            />
                            {error?.title && <ErrorMessage message={error?.title} />}

                        </Box>
                        <Box mb={2}>
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Job Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    name="category"
                                    value={payload?.category}
                                    label="Job Category"
                                    onChange={handleChange}
                                >
                                    {jobCategories.map((category, index) => (
                                        <MenuItem key={index} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {error?.category && <ErrorMessage message={error?.category} />}
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                id="salary"
                                label="Salary"
                                name="salary"
                                value={payload?.salary}
                                onChange={handleChange}
                            />
                            {error?.salary && <ErrorMessage message={error?.salary} />}

                        </Box>
                        <Box mb={2}>
                            <FormControl fullWidth>
                                <InputLabel id="type-label">Job Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    name="type"
                                    value={payload?.type}
                                    label="Job Type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Full-time">Full-time</MenuItem>
                                    <MenuItem value="Part-time">Part-time</MenuItem>
                                    <MenuItem value="Contract">Contract</MenuItem>
                                    <MenuItem value="Internship">Internship</MenuItem>
                                </Select>
                            </FormControl>
                            {error?.type && <ErrorMessage message={error?.type} />}

                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                id="description"
                                label="Job Description"
                                name="description"
                                multiline
                                rows={4}
                                value={payload?.description}
                                onChange={handleChange}
                            />
                            {error?.description && <ErrorMessage message={error?.description} />}

                        </Box>
                        <Button fullWidth sx={{ height: "45px", mb: 3 }} variant="contained" color="primary" type="submit">
                            Create Job
                        </Button>
                    </form>
                </Container>
            </Dialog>
        </>
    )
}

export default CreateJob
