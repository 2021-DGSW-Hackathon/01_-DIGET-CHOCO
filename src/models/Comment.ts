import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Hotplace from "./Hotplace";
import User from "./User";

@Entity('comment')
export default class Comment {

  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    type: 'float',
  })
  star: number;

  @Column({
    nullable: true,
  })
  comment?: string;

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

  @JoinColumn({ name: 'hotpalce_idx' })
  @ManyToOne(type => Hotplace, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotplace!: Hotplace | null;

}