import React from 'react';
import { Form, DatePicker, Divider, Input } from 'antd';
import Select from 'antd/es/select';

interface SearchFormProps {
  submit: () => void;
  form: any;
}

const SearchForm: React.FC<SearchFormProps> = (props) => {
  const { submit, form } = props;
  const { Option } = Select;
  return (
    <div style={{ marginBottom: 16 }}>
      <Form
        form={form}
        style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' }}
        initialValues={{
          status: '',
        }}
      >
        <Form.Item name="created__gte" label="开始时间">
          <DatePicker onChange={submit} />
        </Form.Item>
        <Divider type="vertical" />
        <Form.Item name="created__lte" label="结束时间">
          <DatePicker onChange={submit} format="YYYY-MM-DD" />
        </Form.Item>
        <Divider type="vertical" />
        <Form.Item name="status">
          <Select onChange={submit}>
            <Option value="">全部</Option>
            <Option value="0">正常</Option>
            <Option value="-1">禁用</Option>
          </Select>
        </Form.Item>
        <Divider type="vertical" />
        <Form.Item name="name__icontains" label="名称">
          <Input.Search placeholder="输入项目名称" onSearch={submit} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchForm;
