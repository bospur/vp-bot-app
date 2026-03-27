import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Cell, Section, List, Spinner } from '@telegram-apps/telegram-ui';
import { fetchAnimals } from '../api';
import { useNotification } from '../hooks/useNotification';

export default function AnimalsScreen() {
  const navigate = useNavigate();
  const notify = useNotification();
  const { data, isLoading, isError } = useQuery({ queryKey: ['animals'], queryFn: fetchAnimals });

  useEffect(() => {
    if (isError) notify('Не удалось загрузить данные. Попробуйте позже.', 'error');
  }, [isError, notify]);

  if (isLoading) return <Spinner size="m" />;

  return (
    <List>
      <Section header="Выберите животное">
        {data?.map((animal) => (
          <Cell
            key={animal.id}
            onClick={() => navigate(`/animals/${animal.slug}/categories`)}
            after="›"
          >
            {animal.name}
          </Cell>
        ))}
      </Section>
    </List>
  );
}
