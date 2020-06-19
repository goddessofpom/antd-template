import { PaginatedParams } from '@umijs/hooks/lib/useFormTable';
import request from '@/utils/request';
import moment from 'moment';

interface Result {}

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

export { getStandardTableData };
