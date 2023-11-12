import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Teacher } from "./teacher.entity";
import { Item } from "./item.entity";

@Entity('services')
export class Service extends Model {
    @Column()
    year: number;

    @ManyToOne(() => Teacher, (teacher) => teacher.services, { onDelete: 'CASCADE' })
    teacher: Teacher;

    @OneToMany(() => Item, (item) => item.service)
    items: Item[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         year:
 *           type: integer
 *           description: Année du service.
 *         teacher:
 *           type: object
 *           description: Enseignant du service.
 *         items:
 *           type: array
 *           description: Liste des items du service.
 *       required:
 *         - year
 *         - teacher
 *         - items
 *       example:
 *         year: 2023
 *         items: [{ "lesson": { "givenId": "R5.08", "name": "Anglais" } }]
 *         teacher: { "givenId": "123456", "lastName": "Dupont", "firstName": "Jean" }
 */