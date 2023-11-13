import { Entity, Column, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Service } from "./service.entity";

@Entity('teachers')
export class Teacher extends Model {
    @Column()
    givenId: string;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @OneToMany(() => Service, (service) => service.teacher)
    services : Service[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         givenId:
 *           type: string
 *           description: Matricule de l'enseignant.
 *         lastName:
 *           type: string
 *           description: Nom de l'enseignant.
 *         firstName:
 *           type: string
 *           description: Prénom de l'enseignant.
 *       required:
 *         - givenId
 *         - lastName
 *         - firstName
 *       example:
 *         givenId: 123456
 *         lastName: Dupont
 *         firstName: Jean
 */