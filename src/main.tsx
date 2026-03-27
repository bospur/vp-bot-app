import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoot } from '@telegram-apps/telegram-ui';
import './index.css';
import App from './App';
import { NotificationProvider } from './hooks/useNotification';

window.Telegram?.WebApp?.ready();
window.Telegram?.WebApp?.expand();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoot>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AppRoot>
    </QueryClientProvider>
  </StrictMode>,
);
