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

interface Label {
  name: string;
  value: string;
}

interface Actress {
  name: string;
  value: string;
  avatar: string;
}
