import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../redux/userActions';
import { UserState } from '../../../redux/userStore';
import { User } from '../interfaces';

interface DeleteUserModalProps {
  userId: number;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userToDelete = useSelector<UserState>((state) => state.users[userId]) as User;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const onChangeClick = () => {
    setIsLoading(true);
    dispatch(
      deleteUser(userToDelete, {
        thenCb: () => {
          toast({ description: 'Successfully deleted user', status: 'success', position: 'top-right' });
          setIsLoading(false);
          onClose();
        },
        catchCb: () => {
          toast({ description: 'Something went wrong', status: 'error', position: 'top-right' });
          setIsLoading(false);
        },
      })
    );
  };
  return (
    <>
      <Button onClick={() => onOpen()} padding="0px" aria-label="Edit" mt="auto" mb="auto" p={4} _hover={{ bg: '#E53E3E' }} backgroundColor={'#C53030'}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>Are You sure You want to delete user with ID: {userToDelete.id}?</Box>
          </ModalBody>
          <ModalFooter>
            <Button disabled={isLoading} mr={3} onClick={() => onClose()}>
              Cancel
            </Button>
            <Button disabled={isLoading} mr={3} onClick={onChangeClick} _hover={{ bg: '#E53E3E' }} backgroundColor={'#C53030'}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
