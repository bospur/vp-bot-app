import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import AnimalsScreen from './screens/AnimalsScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ArticlesScreen from './screens/ArticlesScreen';
import ArticleScreen from './screens/ArticleScreen';
import DoctorsScreen from './screens/DoctorsScreen';
import DoctorScreen from './screens/DoctorScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import TelegramOnlyScreen from './screens/TelegramOnlyScreen';

const isTelegram = Boolean(window.Telegram?.WebApp?.initData);

function BackButtonHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    const isRoot = location.pathname === '/';
    if (isRoot) {
      tg.BackButton.hide();
    } else {
      tg.BackButton.show();
    }

    const handleBack = () => navigate(-1);
    tg.BackButton.onClick(handleBack);
    return () => tg.BackButton.offClick(handleBack);
  }, [location.pathname, navigate]);

  return null;
}

export default function App() {
  if (!isTelegram) return <TelegramOnlyScreen />;

  return (
    <BrowserRouter>
      <BackButtonHandler />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/animals" element={<AnimalsScreen />} />
        <Route path="/animals/:animalSlug/categories" element={<CategoriesScreen />} />
        <Route path="/animals/:animalSlug/categories/:categorySlug/articles" element={<ArticlesScreen />} />
        <Route path="/articles/:articleSlug" element={<ArticleScreen />} />
        <Route path="/doctors" element={<DoctorsScreen />} />
        <Route path="/doctors/:doctorId" element={<DoctorScreen />} />
        <Route path="/schedule" element={<ScheduleScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
