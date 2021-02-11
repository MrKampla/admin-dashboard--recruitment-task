import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUsers } from '../../redux/userActions';

export const UserProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUsers());
  }, [dispatch]);
  return <>{children}</>;
};
