// DECLARE DATABASE

import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: "OTP" })
export class OTP{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar'})
  email: string;

  @Column({ type: 'varchar'})
  otp: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}
