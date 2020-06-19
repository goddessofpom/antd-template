import React from 'react';
import { useFormTable } from '@umijs/hooks';
import { Table, Form, Divider, Button } from 'antd';
import { Link, history } from 'umi';
import { getStandardTableData } from '@/utils/tools';
import SearchForm from './components/SearchForm';

const ProjectList = () => {
  const [form] = Form.useForm();
  const getTableData = getStandardTableData('/api/v1/project');

  const { tableProps, search } = useFormTable(getTableData, {
    defaultPageSize: 15,
    form,
  });

  const { submit } = search;

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (val: number): string => (val === 0 ? '正常' : '禁用'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (val: number) => (
        <div>
          <Link to={`/project/edit/${val}`}>编辑</Link>
          <Divider type="vertical" />
          <a onClick={() => {}}>删除</a>
        </div>
      ),
    },
  ];

  return (
    <div>
      <SearchForm form={form} submit={submit} />
      <Button type="primary" onClick={() => history.push('/project/create')}>
        新增项目
      </Button>
      <Table columns={columns} {...tableProps} />
    </div>
  );
};

// export default connect(({ project }: { project: ProjectModelState }) => ({
//   project,
// }))(ProjectList);
export default ProjectList;
