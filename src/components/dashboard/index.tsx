import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Button, Flex, Text } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, Column } from 'react-table';
import { User } from './interfaces';
import { DeleteUserModal } from './modals/DeleteUserModal';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../../redux/userStore';

export const Dashboard: React.FC = () => {
  const history = useHistory();
  const users = useSelector<UserState>((state) => state.users) as User[];
  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: (row) => row.id,
      },
      {
        Header: 'Name',
        accessor: (row) => row.name,
      },
      {
        Header: 'Username',
        accessor: (row) => row.username,
      },
      {
        Header: 'Email',
        accessor: (row) => row.email,
      },
      {
        Header: 'City',
        accessor: (row) => row.address.city,
      },
      {
        Header: 'Edit',
        accessor: '',
      },
      {
        Header: 'Delete',
        accessor: '',
      },
    ],
    []
  ) as Column<User>[];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<User>({ columns, data: users }, useSortBy);

  return (
    <>
      <Flex direction="row" p={8} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl">User List</Text>
        <Button mr={3} onClick={() => history.push('/form/new')} _hover={{ bg: '#2F855A' }} backgroundColor={'#38A169'}>
          Add new user
        </Button>
      </Flex>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === 'Edit') {
                    return (
                      <Td {...cell.getCellProps()} max={'200px'} padding={['1px', '8px']} pt="0px" pb="0px" textAlign="center">
                        <Button
                          onClick={() => history.push(`/form/${row.original.id}`)}
                          padding="0px"
                          aria-label="Edit"
                          mt="auto"
                          mb="auto"
                          p={4}
                          _hover={{ bg: '#B7791F' }}
                          backgroundColor={'#D69E2E'}>
                          Edit
                        </Button>
                      </Td>
                    );
                  }

                  if (cell.column.Header === 'Delete') {
                    return (
                      <Td {...cell.getCellProps()} max={'200px'} padding={['1px', '8px']} pt="0px" pb="0px" textAlign="center">
                        {console.log(row)}
                        <DeleteUserModal userId={+row.id} />
                      </Td>
                    );
                  }

                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
