import React from 'react';
import { addNewUser } from '../../redux/userActions';
import { UserForm } from './UserForm';

export const AddNewUser: React.FC = () => {
  return <UserForm updateOrAdd={addNewUser} />;
};
