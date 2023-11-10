import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import Model from "./model.entity";
import { Item } from "./item.entity";
import { CustomJoinItemsLessons } from "./joinItemsLessons";

@Entity('lesson_types')
export class Lesson_type extends Model {

    @ManyToMany(() => CustomJoinItemsLessons, CustomJoin => CustomJoin.lessonType, { onDelete : 'CASCADE' })
    items: CustomJoinItemsLessons[];

    @Column()
    name: string;

}
