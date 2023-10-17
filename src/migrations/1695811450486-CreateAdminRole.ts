import { MigrationInterface, QueryRunner } from "typeorm";
import { Role, Roles } from "../entities/role.entity"; // Assurez-vous d'importer la classe Role depuis le bon chemin

export class CreateAdminRole1695809293535 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const roleRepository = queryRunner.connection.getRepository(Role);

        // Ajoutez le rôle "admin"
        const adminRole = new Role();
        adminRole.name = Roles.ADMIN; // Assurez-vous que Roles.ADMIN correspond à la valeur de votre rôle "admin" dans l'enum

        await roleRepository.save(adminRole);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Pour la méthode de désinstallation (down), vous pouvez laisser le code tel quel, car il supprimera le rôle "admin" créé dans up.
        const roleRepository = queryRunner.connection.getRepository(Role);
        const adminRole = await roleRepository.findOne({ where: { name: Roles.ADMIN } });

        if (adminRole) {
            await roleRepository.remove(adminRole);
        }
    }

}