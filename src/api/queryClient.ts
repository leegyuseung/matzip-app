import {QueryClient} from '@tanstack/react-query';

// 리액트쿼리에서는 실패할 경우 3번의 재요청을 하는데 그 기능을 빼주기
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60 * 1000, // 쿼리 데이터가 신선한 상태에서 오래된 상태로 변경되는 시간
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
