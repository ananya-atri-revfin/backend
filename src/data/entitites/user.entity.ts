// DECLARE DATABASE AT REGISTRATION

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "Users" })
export class Users{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true})
  email: string;

  @Column({ type: 'varchar', default: "User123"})
  name: string;

  @Column({ type: 'varchar', default: "Employee"})
  occupation: string;

  @Column({ type: 'boolean', default: false })
  isLogged: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

}

