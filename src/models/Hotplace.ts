import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
}