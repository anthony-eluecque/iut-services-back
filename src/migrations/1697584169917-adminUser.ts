import { MigrationInterface, QueryRunner } from "typeorm"
import { AppDataStore } from "../config";
import { encryptData } from "../services/aes.service";
import { hashPassword } from "../services/hash.service";
import { User } from "../entities";

export class AdminUser1697584169917 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersRepository = AppDataStore.getRepository(User);

        const newUser = usersRepository.create({
            email : "iutinfo@univ-littoral.fr",
            firstName : encryptData("iut").toString(),
            lastName : encryptData("calais").toString(),
            password : await hashPassword("admin"),
            isAdmin : true
        });

        await usersRepository.insert(newUser);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.connection.getRepository(User);

        const adminUser = await userRepository.findOne({ where: { email: "iutinfo@univ-littoral.fr" } });

        if (adminUser) {
            await userRepository.remove(adminUser);
        }
    }

}
