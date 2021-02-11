import React from 'react';
import { ChakraProvider, Box, Flex, theme, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Provider } from 'react-redux';
import store from './redux/userStore';
import { Dashboard } from './components/dashboard';
import { BrowserRouter as Router, Link, Route, Switch as RouterSwitch } from 'react-router-dom';
import { EditExistingUser } from './components/userForm/EditExistingUser';
import { AddNewUser } from './components/userForm/AddNewUser';
import { UserProvider } from './components/dashboard/UserProvider';

export const App = () => {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <UserProvider />
          <Box textAlign="left" fontSize="xl">
            <Flex p={8} direction="row" alignItems="center">
              <Text fontSize="4xl">
                <Link to="/">Dashboard</Link>
              </Text>
              <ColorModeSwitcher marginLeft="auto" />
            </Flex>
            <Box p={8} pt={0}>
              <RouterSwitch>
                <Route exact path="/form/new" component={AddNewUser} />
                <Route path="/form/:id" component={EditExistingUser} />
                <Route exact path="/">
                  <Dashboard />
                </Route>
              </RouterSwitch>
            </Box>
          </Box>
        </Provider>
      </ChakraProvider>
    </Router>
  );
};
