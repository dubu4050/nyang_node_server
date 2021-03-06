import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Post } from 'src/modules/post/domain/entity/post.entity';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { File } from 'src/modules/file/domain/entity/file.entity';
import { QuestionState } from './question-state.enum';

@Entity()
export class Question extends Post {
  /*relations*/
  @ManyToOne(() => Member, { lazy: true, cascade: false })
  member_identifier: Member;
  @OneToMany(() => File, (file) => file.question, {
    lazy: true,
    cascade: true,
  })
  files: File[];

  /*properties*/
  @Column({ type: 'varchar', length: 40 })
  genus: string;
  @Column({ type: 'varchar', length: 40 })
  species: string;
  @Column({ type: 'int', width: 4 })
  age: number;
  @Column({ type: 'enum', enum: QuestionState, default: QuestionState.NONE })
  state: QuestionState;
}
