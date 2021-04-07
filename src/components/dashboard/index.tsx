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
      <Flex direction="row" p={[1, 2]} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl">User List</Text>
        <Button mr={3} onClick={() => history.push('/form/new')} _hover={{ bg: '#2F855A' }} backgroundColor={'#38A169'}>
          Add new user
        </Button>
      </Flex>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr maxW={['10px', '30px', '100px']} padding={['1px', '8px']} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  padding={['1px', '8px']}
                  fontSize={['8px', '12px']}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  maxW={['10px', '30px', '100px']}
                  w={column.Header === 'Id' ? ['16px', '32px'] : undefined}>
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
              <Tr maxW={['10px', '30px', '100px']} padding={['1px', '8px']} fontSize={['8px', '10px', '12px', '16px']} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === 'Edit') {
                    return (
                      <Td maxW={['10px', '30px', '100px']} {...cell.getCellProps()} padding={['1px', '8px']} pt="0px" pb="0px" textAlign="center">
                        <Button
                          onClick={() => history.push(`/form/${row.original.id}`)}
                          aria-label="Edit"
                          mt="auto"
                          mb="auto"
                          padding={['2px', '8px', '16px']}
                          fontSize={['12px', '16px']}
                          _hover={{ bg: '#B7791F' }}
                          backgroundColor={'#D69E2E'}>
                          Edit
                        </Button>
                      </Td>
                    );
                  }

                  if (cell.column.Header === 'Delete') {
                    return (
                      <Td {...cell.getCellProps()} maxW={['10px', '30px', '100px']} padding={['1px', '8px']} pt="0px" pb="0px" textAlign="center">
                        <DeleteUserModal userId={+row.id} />
                      </Td>
                    );
                  }

                  return (
                    <Td
                      maxW={['10px', '30px', '100px']}
                      width={cell.column.Header === 'Id' ? ['16px', '32px'] : undefined}
                      padding={['1px', '8px']}
                      {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
