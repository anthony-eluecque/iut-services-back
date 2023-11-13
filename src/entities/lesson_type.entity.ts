import { Entity, Column, ManyToMany } from "typeorm";
import Model from "./model.entity";
import { CustomJoinItemsLessons } from "./joinItemsLessons";

@Entity('lesson_types')
export class Lesson_type extends Model {

    @ManyToMany(() => CustomJoinItemsLessons, CustomJoin => CustomJoin.lessonType, { onDelete: 'CASCADE' })
    items: CustomJoinItemsLessons[];

    @Column()
    name: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson_type:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the lesson type.
 *       required:
 *         - name
 *       example:
 *         name: CM
 */