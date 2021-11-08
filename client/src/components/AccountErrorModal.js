import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AuthContext from '../auth'
import { useContext } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AccountErrorModal() {
    const { auth } = useContext(AuthContext);

    let open = false;
    let errorMessage = "";
    if (auth.auth_error) {
        open = true;
        errorMessage = auth.auth_error;
    }

    const handleClose = (event) => {
        event.stopPropagation();
        auth.unflagError();
    }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Alert severity="error">
                {errorMessage}
            </Alert>
          </Typography>
          <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClose}
            >
                Close Modal
            </Button>
        </Box>
      </Modal>
    </div>
  );
}