import React from 'react';
import queryClient from '@/api/queryClient';
import RootNavigation from '@/navigations/RootNavigation';
import {QueryClientProvider} from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}

export default App;
