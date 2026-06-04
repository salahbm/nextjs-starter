import { NextPage } from 'next';

import { TasksTable } from './_components/example-table';

interface ITableProps {}

const Table: NextPage<ITableProps> = () => <TasksTable />;

export default Table;
