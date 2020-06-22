import React from 'react';
import { useFormTable, useRequest } from '@umijs/hooks';
import { Table, Form, Button } from 'antd';
import { history } from 'umi';
import project from '@/assets/formjson/project.json';
import { getStandardTableData, getTableColumns } from '@/utils/tools';
import SearchForm from './components/SearchForm';
import { apiDeleteProject } from './service';

const ProjectList = () => {
  const [form] = Form.useForm();
  const getTableData = getStandardTableData('/api/v1/project');

  const { tableProps, search } = useFormTable(getTableData, {
    defaultPageSize: 15,
    form,
  });

  const { submit } = search;

  const deleteAction = useRequest(apiDeleteProject, {
    manual: true,
    onSuccess: submit,
  });

  const { run } = deleteAction;

  const columns = getTableColumns(project, '/project/edit/', run, ['relate_models']);

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

export default ProjectList;
