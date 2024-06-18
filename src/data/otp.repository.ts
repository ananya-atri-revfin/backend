// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { Users } from './entitites/user.entity';

// @Injectable()
// export class CustomerRepository extends Repository<Users> {
//   async updateCustomer(id: number, updates: Partial<Users>): Promise<Users> {
//     const queryRunner = this.createQueryBuilder();
//     queryRunner.update(Users, id).set(updates).execute();
//     return queryRunner.getMany();
//   }
// }