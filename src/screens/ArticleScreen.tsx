import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@telegram-apps/telegram-ui';
import { fetchArticle } from '../api';
import { useNotification } from '../hooks/useNotification';
import styles from './ArticleScreen.module.css';

export default function ArticleScreen() {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const notify = useNotification();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['article', articleSlug],
    queryFn: () => fetchArticle(articleSlug!),
    enabled: !!articleSlug,
  });

  useEffect(() => {
    if (isError) notify('Не удалось загрузить статью. Попробуйте позже.', 'error');
  }, [isError, notify]);

  if (isLoading) return <Spinner size="m" />;
  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{data.title}</h1>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}
