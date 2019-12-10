interface Base {
  title: string;
}

interface Rating {
  source: string;
  value: string;
}

interface Ratings {
  [id: number]: Rating;
}

interface Movie extends Base {
  actors: string;
  awards: string;
  country: string;
  director: string;
  genre: string;
  language: string;
  ratings: Ratings;
  released: string;
  year: number;
  comments: Comment[];
}

interface Comment extends Base {
  content: string;
  movie: Movie;
}

export {
  Base as BaseInterface,
  Movie as MovieInterface,
  Comment as CommentInterface
};
