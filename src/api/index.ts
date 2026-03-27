import { apiClient } from './client';

export interface Animal {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ArticleListItem {
  id: number;
  title: string;
  slug: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  description: string;
  phone: string;
  photo_url: string;
  status: string;
}

export interface ScheduleSlot {
  doctor_id: number;
  doctor_name: string;
  date: string;
  start_time: string;
  end_time: string;
}

export const fetchAnimals = () =>
  apiClient.get<Animal[]>('/animals').then((r) => r.data);

export const fetchCategories = (animalSlug: string) =>
  apiClient.get<Category[]>(`/animals/${animalSlug}/categories`).then((r) => r.data);

export const fetchArticles = (animalSlug: string, categorySlug: string) =>
  apiClient
    .get<ArticleListItem[]>(`/animals/${animalSlug}/categories/${categorySlug}/articles`)
    .then((r) => r.data);

export const fetchArticle = (articleSlug: string) =>
  apiClient.get<Article>(`/articles/${articleSlug}`).then((r) => r.data);

export const fetchDoctors = () =>
  apiClient.get<Doctor[]>('/doctors').then((r) => r.data);

export const fetchSchedule = () =>
  apiClient.get<ScheduleSlot[]>('/schedule').then((r) => r.data);
