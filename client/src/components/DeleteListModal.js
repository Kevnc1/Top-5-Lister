import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'


export default function DeleteListModal() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    let isOpen = false;
    let name = "";

    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
        isOpen = true;
    }

    return (
        <Modal>
            open = {isOpen}
        </Modal>
    )
}


