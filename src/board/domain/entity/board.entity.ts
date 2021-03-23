import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Post } from '../../../common/domain/entity/post.entity';
import { Member } from '../../../member/domain/entity/member.entity';
import { File } from '../../../file/domain/entity/file.entity';
@Entity()
export class Board extends Post {
  @Column({ type: 'varchar', length: 20 })
  category: string;

  @ManyToOne(() => Member, { lazy: true, cascade: false })
  member_identifier: Member;

  @OneToMany(() => File, (file) => file.board_identifier)
  files: File[];
}