interface TelegramBackButton {
  isVisible: boolean;
  show(): void;
  hide(): void;
  onClick(fn: () => void): void;
  offClick(fn: () => void): void;
}

interface TelegramWebApp {
  BackButton: TelegramBackButton;
  ready(): void;
  expand(): void;
  close(): void;
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}
