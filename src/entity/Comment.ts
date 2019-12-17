import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from './Movie';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  author: string;

  @Column()
  content: string;

  @ManyToOne(
    _type => Movie,
    (movie: Movie) => movie.comments,
    { onDelete: 'CASCADE' }
  )
  movie: Movie;
}
