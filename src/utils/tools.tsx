import React from 'react';
import { Divider, Popconfirm } from 'antd';
import { Link } from 'umi';
import { PaginatedParams } from '@umijs/hooks/lib/useFormTable';
import request from '@/utils/request';
import moment from 'moment';
import { FormStateProps } from './uformtools';

interface Result {}

interface JsonDataProperties {
  title: string;
  enum?: Array<any>;
}

interface JsonData {
  type: string;
  properties: Array<JsonDataProperties>;
}

interface ResultDetail {
  data: any;
}

const getStandardTableData = (api: string) => {
  const getTableData = (
    { current, pageSize }: PaginatedParams[0],
    formData: Object,
  ): Promise<Result> => {
    let query = `page=${current}&size=${pageSize}`;
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        let searchValue: string | moment.Moment;
        if (moment.isMoment(value)) {
          searchValue = value.format('YYYY-MM-DD');
        } else {
          searchValue = value;
        }
        query += `&${key}=${searchValue}`;
      }
    });

    return request(`${api}?${query}`).then((res) => ({
      total: res.count,
      list: res.data.map((item: { id: number }) => ({ ...item, key: item.id, operation: item.id })),
    }));
  };
  return getTableData;
};

const getTableColumns = (
  jsonData: JsonData,
  editLink: string | null,
  deleteAction: any | null,
  excludeColumn: Array<string>,
) => {
  const columnsData = jsonData.properties;
  const idColumn = {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  };

  const dataColumn: Array<any> = [];

  Object.entries(columnsData).forEach(([k, v]) => {
    if (excludeColumn.includes(k)) {
      return;
    }

    const renderEnum = v.enum
      ? (val: number): string | null => {
          const valueData = v.enum?.filter((item) => item.value === val);
          return valueData && valueData[0] ? valueData[0].label : null;
        }
      : null;

    const item = {
      title: v.title,
      dataIndex: k,
      key: k,
      render: renderEnum,
    };
    dataColumn.push(item);
  });

  const operationColumn = {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (val: number) => (
      <div>
        {editLink && (
          <div style={{ display: 'inline-block' }}>
            <Link to={`${editLink}${val}`}>编辑</Link>
            <Divider type="vertical" />
          </div>
        )}
        {deleteAction && (
          <Popconfirm
            title="是否删除"
            okText="是"
            cancelText="否"
            onConfirm={() => deleteAction(val)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        )}
      </div>
    ),
  };

  const columns = [idColumn, ...dataColumn, operationColumn];

  return columns;
};

const mergeDetailToForm = (res: ResultDetail): Function => {
  const obj = res.data;
  const fn = (setFieldState: Function) => {
    Object.keys(obj).forEach((key) => {
      setFieldState(key, (state: FormStateProps) => {
        const newState = state;
        newState.value = obj[key];
      });
    });
  };
  return fn;
};

export { getStandardTableData, getTableColumns, mergeDetailToForm };
