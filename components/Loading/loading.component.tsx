import { useLoading } from './useLoading.hook';

export const Loading = () => {
  const { loadingText } = useLoading();

  return <h2>{loadingText}</h2>;
};
