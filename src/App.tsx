import { Route, Switch } from 'wouter';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import Home from './pages/Home';
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
      <div>
        <Switch>
          <Route path={urlIndex} component={Home} />
          <Route path={urlCharacters} component={CharacterList} />
          <Route path={urlCharactersById} component={CharacterDetail} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </CharacterProvider>
  );
}

export default App;
