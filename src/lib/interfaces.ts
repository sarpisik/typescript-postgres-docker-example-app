interface Rating {
  source: string;
  value: string;
}

interface Ratings {
  [id: number]: Rating;
}

interface Movie {
  title: string;
  actors: string;
  awards: string;
  country: string;
  director: string;
  genre: string;
  language: string;
  ratings: Ratings;
  released: string;
  year: number;
  imdbRating: number;
}

export { Movie as MovieInterface };
