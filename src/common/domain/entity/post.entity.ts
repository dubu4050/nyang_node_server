import { Column, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Common } from './common.entity';

export abstract class Post {
  @PrimaryColumn({ type: 'bigint' })
  identifier: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column((type) => Common)
  common: Common;
}