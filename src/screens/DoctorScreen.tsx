import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@telegram-apps/telegram-ui';
import { fetchDoctors } from '../api';
import styles from './DoctorScreen.module.css';

const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.snzbeachvolleyball25.ru';

export default function DoctorScreen() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();

  const { data: doctors, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: fetchDoctors,
  });

  const doctor = doctors?.find((d) => String(d.id) === doctorId);

  if (isLoading) return <Spinner size="m" />;
  if (!doctor) return null;

  return (
    <div className={styles.wrapper}>
      <button className={styles.back} onClick={() => navigate(-1)}>‹ Назад</button>
      {doctor.photo_url && (
        <img
          src={`${API_URL}${doctor.photo_url}`}
          alt={doctor.name}
          className={styles.photo}
        />
      )}
      <h1 className={styles.name}>{doctor.name}</h1>
      {doctor.specialization && (
        <p className={styles.specialization}>{doctor.specialization}</p>
      )}
      {doctor.description && (
        <p className={styles.description}>{doctor.description}</p>
      )}
      {doctor.phone && (
        <a href={`tel:${doctor.phone}`} className={styles.phone}>
          📞 {doctor.phone}
        </a>
      )}
    </div>
  );
}
