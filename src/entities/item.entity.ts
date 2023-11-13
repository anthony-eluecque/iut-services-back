import { Entity, ManyToOne, JoinTable, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Lesson } from "./lesson.entity";
import { Service } from "./service.entity";
import { CustomJoinItemsLessons } from "./joinItemsLessons";

@Entity('items')
export class Item extends Model {

    @ManyToOne(() => Lesson, lesson => lesson.items, { onDelete : 'CASCADE' })
    lesson: Lesson;

    @ManyToOne(() => Service, service => service.items, { onDelete : 'CASCADE' })
    service: Service;

    @OneToMany(() => CustomJoinItemsLessons, CustomJoin => CustomJoin.item, { onDelete : 'CASCADE' })
    @JoinTable()
    lessonTypes: CustomJoinItemsLessons[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - lesson
 *         - service
 *         - lessonTypes
 *       properties:
 *         lesson:
 *           $ref: '#/components/schemas/Lesson'
 *           description: Le cours associée.
 *         service:
 *           $ref: '#/components/schemas/Service'
 *           description: Le service associé.
 *         lessonTypes:
 *           type: array
 */