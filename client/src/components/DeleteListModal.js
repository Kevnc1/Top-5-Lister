import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  
export default function DeleteListModal() {
    const { store } = useContext(GlobalStoreContext);

    let isOpen = false;
    let name = "";

    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
        isOpen = true;
    }

    function handleDeleteList(event) {
        store.deleteMarkedList();
    }

    function handleCloseModal(event) {
        store.unmarkListForDeletion();
    }

    return (
        <div>
            <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                    Delete {name} ?
                </Typography>
                <Stack spacing={2} direction="row" justifyContent="center" marginTop={2}>
                    <Button
                            variant="contained"
                            onClick={handleDeleteList}
                    >
                        Confirm
                    </Button>
                    <Button
                            variant="contained"
                            onClick={handleCloseModal}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Box>
            </Modal>
        </div>
    )
}


