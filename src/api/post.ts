import axiosInstance from './axios';
import {Post} from '@/types/domain';

async function createPost(body: Omit<Post, 'id'>): Promise<Post> {
  const {data} = await axiosInstance.post('/posts', body);
  return data;
}

async function getPost(id: number): Promise<Post> {
  const {data} = await axiosInstance.get(`posts/${id}`);

  return data;
}

async function getPosts(page = 1): Promise<Post[]> {
  const {data} = await axiosInstance.get(`/posts?page=${page}`);

  return data;
}

async function deletePost(id: number) {
  const {data} = await axiosInstance.delete(`/posts/${id}`);

  return data;
}

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'address' | 'latitude'>;
};

async function updatePost({id, body}: RequestUpdatePost): Promise<Post> {
  const {data} = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
}

async function getFavoritePosts(page = 1): Promise<Post[]> {
  const {data} = await axiosInstance.get(`/favorites?page=${page}`);

  return data;
}

async function updateFavoritePost(id: number): Promise<number> {
  const {data} = await axiosInstance.post(`/favorites/${id}`);

  return data;
}

export {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
  updateFavoritePost,
  getFavoritePosts,
};
