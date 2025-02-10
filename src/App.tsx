import { Route, Switch } from 'wouter';
import CharacterListPage from './pages/CharacterListPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import HomePage from './pages/HomePage';
import { CharacterProvider } from './context/CharacterContext';
import {
  urlCharacters,
  urlCharactersById,
  urlIndex,
} from './constants/appUrls';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <CharacterProvider>
      <Switch>
        <Route path={urlIndex} component={HomePage} />
        <Route path={urlCharacters} component={CharacterListPage} />
        <Route path={urlCharactersById} component={CharacterDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </CharacterProvider>
  );
}

export default App;
