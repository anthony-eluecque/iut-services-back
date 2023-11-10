import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Lesson } from "./lesson.entity";
import { Service } from "./service.entity";
import { Lesson_type } from "./lesson_type.entity";
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
