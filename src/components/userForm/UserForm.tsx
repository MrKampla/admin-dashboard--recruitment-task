import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react';
import React, { Dispatch, useState } from 'react';
import { UserAction, UserState } from '../../redux/userStore';
import { User } from '../dashboard/interfaces';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncActionCallbacks } from '../../redux/userActions';

interface UserFormProps {
  updateOrAdd: (user: User, callbacks: AsyncActionCallbacks) => (dispatch: Dispatch<UserAction>) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ updateOrAdd }) => {
  const { id } = useParams<{ id: string }>();
  const isNewUser = !id;
  const dispatch = useDispatch();
  const users = useSelector<UserState>((state) => state.users) as User[];
  const toast = useToast();
  const [name, setName] = useState(isNewUser ? '' : users.find((x) => x.id === +id)?.name!);
  const [email, setEmail] = useState(isNewUser ? '' : users.find((x) => x.id === +id)?.email!);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const submit = () => {
    setIsLoading(true);
    dispatch(
      updateOrAdd(
        {
          id: isNewUser ? Math.max(...users.map((x) => x.id)) + 1 : +id,
          address: users.map((x) => x.address)[Math.floor(Math.random() * users.length)],
          company: users.map((x) => x.company)[Math.floor(Math.random() * users.length)],
          email,
          username: name,
          name: name,
          phone: users.map((x) => x.phone)[Math.floor(Math.random() * users.length)],
          website: users.map((x) => x.website)[Math.floor(Math.random() * users.length)],
        },
        {
          thenCb: () => {
            toast({ description: isNewUser ? 'Successfully added new user' : 'Successfully Changed new user', status: 'success', position: 'top-right' });
            setIsLoading(false);
            history.push('/');
          },
          catchCb: () => {
            toast({ description: 'Something went wrong', status: 'error', position: 'top-right' });
            setIsLoading(false);
          },
        }
      )
    );
  };

  return (
    <>
      <Flex mt={20} width="full" align="center" justifyContent="center" direction="column">
        <Box textAlign="left" width="full">
          <Heading mb={10}>Form</Heading>
        </Box>
        <Box width="full" p={16}>
          <FormControl isRequired>
            <Flex direction="row" alignItems="center">
              <FormLabel w={16}>Name</FormLabel>
              <Input type="Name" placeholder="Name" size="lg" value={name} onChange={(event) => setName(event.currentTarget.value)} />
            </Flex>
          </FormControl>
          <FormControl isRequired>
            <Flex direction="row" alignItems="center" mt={8}>
              <FormLabel w={16}>Email</FormLabel>
              <Input type="Email" placeholder="Email" size="lg" value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
            </Flex>
          </FormControl>
          <Flex width="sm" marginLeft="auto" mt={8}>
            <Button onClick={() => history.push('/')} disabled={isLoading} variant="outline" type="submit" width="full" mt={4}>
              Canel
            </Button>
            <Button
              ml={8}
              onClick={submit}
              disabled={isLoading}
              _hover={{ bg: '#2F855A' }}
              backgroundColor={'#38A169'}
              variant="outline"
              type="submit"
              width="full"
              mt={4}>
              {id ? 'Edit' : 'Add'}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
