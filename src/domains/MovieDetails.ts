export default interface MovieDetails {
  bango: string;
  releaseDate: string;
  length: string;
  director?: Label;
  studio?: Label;
  publisher?: Label;
  categories: Label[];
  actresses: Actress[];
}

export interface Label {
  name: string;
  value: string;
}

export interface Actress {
  name: string;
  value: string;
  avatar?: string;
}
