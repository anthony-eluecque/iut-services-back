import { Entity, Column, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Item } from "./item.entity";

@Entity('lessons')
export class Lesson extends Model {

    @Column()
    givenId : string;

    @Column()
    name : string;

    @OneToMany(() => Item, item => item.lesson)
    items: Item[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       properties:
 *         givenId:
 *           type: string
 *           description: Identifiant du cours.
 *         name:
 *           type: string
 *           description: Nom du cours.
 *       required:
 *         - givenId
 *         - name
 *       example:
 *         givenId: R5.08
 *         name: Anglais
 */