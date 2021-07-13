import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Comment from "./Comment";
import User from "./User";

@Entity('hotplace')
export default class Hotplace {

  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({
    type: 'tinyint',
    default: false,
  })
  anonymous: boolean;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User | null;

  @OneToMany(type => Comment, comment => comment.hotplace)
  comment: Comment[];

}