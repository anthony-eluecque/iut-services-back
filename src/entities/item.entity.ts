import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import Model from "./model.entity";
import { Lesson } from "./lesson.entity";
import { Service } from "./service.entity";
import { Lesson_type } from "./lesson_type.entity";

@Entity('items')
export class Item extends Model {

    @Column()
    amountHours: number;

    @ManyToOne(() => Lesson, lesson => lesson.items, { onDelete : 'CASCADE' })
    lesson: Lesson;

    @ManyToOne(() => Service, service => service.items, { onDelete : 'CASCADE' })
    service: Service;

    @ManyToMany(() => Lesson_type, lessonType => lessonType.items)
    @JoinTable()
    lessonTypes: Lesson_type[];

}
