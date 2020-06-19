import { useLocation, history } from 'umi';
import { useRequest } from '@umijs/hooks';
import { message } from 'antd';

const usePaginations = (fetchApi: Promise<any>) => {
  const location = useLocation();
  const count = 0;

  const { data, error, loading } = useRequest(fetchApi);

  if (error) {
    message.error('获取数据失败');
  }

  const changePage = (page: Number) => {
    history.push({
      pathname: location.pathname,
      query: {
        page,
      },
    });
  };

  const paginationProps = {
    showQuickJumper: false,
    showTotal: () => `共${count}条`,
    pageSize: 15,
    total: count,
    current: parseInt('10', 10),
    onChange: changePage,
  };

  return { paginationProps, loading, data };
};

export default usePaginations;
