import { FC } from 'react';
import { Transformation } from '../../types/characters';
import './Transformations.css';
import { Title } from '../Title';

interface TransformationsProps {
  data: Transformation[];
}

export const Transformations: FC<TransformationsProps> = ({ data }) => {
  return (
    <div className="transformations global-container">
      <Title text="Transformaciones" />
      <div className="transformation-card-container">
        {data.length > 0 ? (
          data.map((transformation) => (
            <div className="transformation-card" key={transformation.id}>
              <img className="transform-image" src={transformation.image} />
              <span className="transform-text">{transformation.name}</span>
              <span className="transform-ki-text">{transformation.ki}</span>
            </div>
          ))
        ) : (
          <p>No tiene transformaciones</p>
        )}
      </div>
    </div>
  );
};
