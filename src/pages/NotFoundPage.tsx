import { useLocation } from 'wouter';
import { urlCharacters } from '../constants/appUrls';

export const NotFoundPage = () => {
  const setLocation = useLocation()[1];
  setLocation(urlCharacters);

  return <div>404 - Page not found</div>;
};
