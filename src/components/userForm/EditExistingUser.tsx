import React from 'react';
import { editUser } from '../../redux/userActions';
import { UserForm } from './UserForm';

export const EditExistingUser: React.FC = () => {
  return <UserForm updateOrAdd={editUser} />;
};
