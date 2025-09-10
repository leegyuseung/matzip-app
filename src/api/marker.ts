import axiosInstance from './axios';
import {Marker} from '@/types/domain';

async function getMarkers(): Promise<Marker[]> {
  const {data} = await axiosInstance.get('/markers');

  return data;
}

export {getMarkers};
