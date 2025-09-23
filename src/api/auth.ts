import axiosInstance from '@/api/axios';
import {Profile} from '@/types/domain';
import {getEncryptStorage} from '@/utils/encryptStorage';

type RequestUser = {
  email: string;
  password: string;
};

// 회원가입
async function postSignup({email, password}: RequestUser): Promise<void> {
  await axiosInstance.post('/auth/signup', {
    email,
    password,
  });
}

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

// 로그인
async function postLogin({
  email,
  password,
}: RequestUser): Promise<ResponseToken> {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
}

// 로그인 정보
async function getProfile(): Promise<Profile> {
  const {data} = await axiosInstance.get('/auth/me');
  return data;
}

// 토큰을 refresh
async function getAccessToken(): Promise<ResponseToken> {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
}

// 로그아웃
async function logout() {
  await axiosInstance.post('/auth/logout');
}

type RequestProfile = Pick<Profile, 'nickname' | 'imageUri'>;

async function editProfile(body: RequestProfile): Promise<Profile> {
  const {data} = await axiosInstance.patch('/auth/me', body);

  return data;
}

export {postSignup, postLogin, getProfile, getAccessToken, logout, editProfile};
