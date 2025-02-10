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

interface CharacterListApiResponse {
  items: Character[];
  meta: Meta;
  links: Links;
}

export type { Character, CharacterListApiResponse };
