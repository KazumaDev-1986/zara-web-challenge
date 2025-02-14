interface OriginPlanet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deletedAt: string | null;
}

interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: string | null;
}

interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: string | null;
  originPlanet: OriginPlanet | null;
  transformations: Transformation[] | null;
}

interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

interface CharacterApiResponse {
  items: Character[];
  meta: Meta;
  links: Links;
}

export type { Character, CharacterApiResponse, Transformation };
