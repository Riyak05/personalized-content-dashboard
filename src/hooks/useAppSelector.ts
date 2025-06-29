import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../features/store';
 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 