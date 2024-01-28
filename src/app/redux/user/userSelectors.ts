import { RootState } from '../store';

export const authorized = (state: RootState) => state.user.authorized;
export const isLoading = (state: RootState) => state.user.isLoading;
export const userId = (state: RootState) => state.user.id;
export const userName = (state: RootState) => state.user.name;
