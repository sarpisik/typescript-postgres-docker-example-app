import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['title'])
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: '' })
  actors: string;

  @Column({ default: '' })
  awards: string;

  @Column({ default: '' })
  country: string;

  @Column({ default: '' })
  director: string;

  @Column({ default: '' })
  genre: string;

  @Column({ default: 'english' })
  language: string;

  @Column({ type: 'simple-json', default: { source: '', value: '' } })
  ratings: {
    source: string;
    value: string;
  };

  @Column({ default: '' })
  released: string;

  @Column({ default: 0 })
  year: number;

  @Column({ default: 0 })
  imdbRating: number;
}
