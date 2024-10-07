import React, { useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Box, Button, Alert } from '@mui/material';
import TrashIcon from '../../assets/images/trash.svg'
import CreateJob from './Create-job';
import https from '../../https/https';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


function JobCategories() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [listData, setListData] = useState([])
    const [showError, setShowError] = useState({
        showMessage: false,
        message: ''
    })


    const loadList = async () => {
        try {
            const { data } = await https.get('job-list')
            setListData(data?.jobs)
        } catch (error) {
            console.log(error)
        }

    };
    useEffect(() => {
        loadList()
    }, [])

    const deleteHandler = async (id) => {
        try {
            const { data } = await https.destory(`jobs/${id}`)
            setShowError({
                message: data?.message,
                showMessage: true,
                type: 'success'
            })

            loadList()
            hideAlert()
        } catch (error) {
            console.log(error)
        }
    }


    const hideAlert = () => {
        setTimeout(() => {
            setShowError({
                message: '',
                type: '',
                showMessage: false,
            })
        }, 3000)
    }

    const logout = async () => {
        const resposne = await Cookies.remove('user_login')
        navigate(0)
    }

    return (
        <>
            <CreateJob
                setOpen={setOpen}
                open={open}
                callback={useCallback(() => {
                    loadList()
                }, [])}
            />
            <Button
                onClick={() => logout()}
                sx={{ my: 3, height: '40px', display: 'block', width: 'max-content', ml: 'auto' }}
            >
                Log out
            </Button>
            <Container maxWidth="md">
                <Box textAlign="center" my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        BROWSE OPEN POSITIONS JOBS
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        We are always on the lookout for talented people
                    </Typography>
                </Box>
                <Button
                    onClick={() => setOpen(true)}
                    variant="contained"
                    color="primary"
                    sx={{ my: 3, height: '40px', display: 'block', width: 'max-content', ml: 'auto' }}
                >
                    Create new job
                </Button>
                <Box my={4}>
                    {showError?.showMessage && <Alert severity={showError?.type}>{showError?.message}</Alert>}

                </Box>
                {listData.length > 0 ?
                    listData?.map((item, index) => (
                        <Accordion key={index} sx={{ my: 2 }} >
                            <AccordionSummary
                                expandIcon={'+'}
                                aria-controls={`${item?.title?.toLowerCase()}-content`}
                                id={`${item?.title?.toLowerCase()}-header`}
                            >
                                <Typography variant="h6">{item?.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontSize: '14px' }}>Job category</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '13px', color: '#edede' }}>{item?.category}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontSize: '14px' }}>Job type</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '13px', color: '#edede' }}>{item?.type}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontSize: '14px' }}>Salary</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '13px', color: '#edede' }}>{item?.salary}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <img onClick={() => deleteHandler(item?._id)} src={TrashIcon} alt='' role='button' style={{ height: '20px', cursor: 'pointer' }} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography variant="h6" sx={{ fontSize: '14px' }}>Description</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '13px', color: '#edede' }}>{item?.description}</Typography>
                                    </Box>
                                    {/* <Box>
                                        <Typography variant="h6" sx={{ fontSize: '14px' }}>Job creator</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '13px', color: '#edede' }}>{item?.creator?.name}</Typography>
                                    </Box> */}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))
                    :
                    <Typography variant="subtitle1" align='center' color="textSecondary">
                        Not record yet
                    </Typography>
                }
            </Container>

        </>
    );
}

export default JobCategories;
