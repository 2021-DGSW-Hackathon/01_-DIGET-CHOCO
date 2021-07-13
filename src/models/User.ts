import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import Comment from "./Comment";
import Hotplace from "./Hotplace";

@Entity('user')
export default class User {

  @PrimaryColumn({
    name: 'user_id',
    type: "varchar"
  })
  userId: string;

  @Column()
  name: string;

  @Column()
  grade: number;

  @Column()
  room: number;

  @Column()
  number: number;

  @Column({
    nullable: true,
    name: 'profile_image',
  })
  profileImage?: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date;

  @OneToMany(type => Hotplace, hotplace => hotplace.user)
  hotplace!: Hotplace[];

  @OneToMany(type => Comment, comment => comment.user)
  comment!: Comment[];
}