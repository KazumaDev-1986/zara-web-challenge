import { useLocation } from 'wouter';
import { urlCharacters } from '../constants/appUrls';

const HomePage = () => {
  const setLocation = useLocation()[1];
  setLocation(urlCharacters);

  return <>Home page</>;
};

export default HomePage;
