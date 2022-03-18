import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn  } from 'typeorm'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Roles } from './roles.entity'

@ObjectType()
@Entity()
export class Users {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Field(type => Roles)
  @OneToOne(() => Roles, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  role: Roles;
}
