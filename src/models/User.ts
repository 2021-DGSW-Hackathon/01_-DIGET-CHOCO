import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

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
    name: 'updated_at'
  })
  updatedAt: Date;
}