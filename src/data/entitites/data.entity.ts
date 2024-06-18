// DECLARE DATABASE AT LOGIN

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "OTP" })
export class OTP{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar'})
  email: string;

  @Column({ type: 'varchar'})
  otp: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @Column({ type: 'integer', default: 1})
  attempts: number;
}
