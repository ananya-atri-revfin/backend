import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";

export const typeOrmConfig: TypeOrmModule = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'OTP',
    entities: [join(process.cwd(), 'dist/**/*.entity.js')],
    synchronize: true,
    dropSchema: true
}