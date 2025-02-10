import { useLocation } from 'wouter';
import { urlCharacters } from '../constants/appUrls';

const Home = () => {
  const setLocation = useLocation()[1];
  setLocation(urlCharacters);

  return <>Home page</>;
};

export default Home;
