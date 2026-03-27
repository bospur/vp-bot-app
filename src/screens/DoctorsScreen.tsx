import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Cell, Section, List, Spinner, Avatar } from '@telegram-apps/telegram-ui';
import { fetchDoctors } from '../api';
import { useNotification } from '../hooks/useNotification';

const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.snzbeachvolleyball25.ru';

export default function DoctorsScreen() {
  const navigate = useNavigate();
  const notify = useNotification();
  const { data, isLoading, isError } = useQuery({ queryKey: ['doctors'], queryFn: fetchDoctors });

  useEffect(() => {
    if (isError) notify('Не удалось загрузить список врачей. Попробуйте позже.', 'error');
  }, [isError, notify]);

  if (isLoading) return <Spinner size="m" />;

  return (
    <List>
      <Section header="Наши врачи">
        {data?.map((doctor) => (
          <Cell
            key={doctor.id}
            onClick={() => navigate(`/doctors/${doctor.id}`)}
            after="›"
            before={
              doctor.photo_url ? (
                <Avatar src={`${API_URL}${doctor.photo_url}`} size={40} />
              ) : (
                <Avatar size={40}>👨‍⚕️</Avatar>
              )
            }
            subtitle={doctor.specialization}
          >
            {doctor.name}
          </Cell>
        ))}
      </Section>
    </List>
  );
}
