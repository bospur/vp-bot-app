import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Cell, Section, List, Spinner } from '@telegram-apps/telegram-ui';
import { fetchArticles } from '../api';
import { useNotification } from '../hooks/useNotification';

export default function ArticlesScreen() {
  const navigate = useNavigate();
  const notify = useNotification();
  const { animalSlug, categorySlug } = useParams<{
    animalSlug: string;
    categorySlug: string;
  }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['articles', animalSlug, categorySlug],
    queryFn: () => fetchArticles(animalSlug!, categorySlug!),
    enabled: !!animalSlug && !!categorySlug,
  });

  useEffect(() => {
    if (isError) notify('Не удалось загрузить данные. Попробуйте позже.', 'error');
  }, [isError, notify]);

  if (isLoading) return <Spinner size="m" />;

  return (
    <List>
      <Section header="Статьи">
        {data?.map((article) => (
          <Cell
            key={article.id}
            onClick={() => navigate(`/articles/${article.slug}`)}
            after="›"
          >
            {article.title}
          </Cell>
        ))}
      </Section>
    </List>
  );
}
