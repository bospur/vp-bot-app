import { useNavigate } from 'react-router-dom';
import { Cell, Section, List } from '@telegram-apps/telegram-ui';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <List>
      <Section header="Ветеринарная клиника">
        <Cell onClick={() => navigate('/animals')} after="›">
          🐾 Первая помощь животным
        </Cell>
        <Cell onClick={() => navigate('/doctors')} after="›">
          👨‍⚕️ Наши врачи
        </Cell>
        <Cell onClick={() => navigate('/schedule')} after="›">
          📅 Расписание приёма
        </Cell>
      </Section>
    </List>
  );
}
