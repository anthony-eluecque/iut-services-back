import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import Model from "./model.entity";
import { Item } from "./item.entity";

@Entity('lesson_types')
export class Lesson_type extends Model {

    @ManyToMany(() => Item, item => item.lessonTypes)
    @JoinTable()
    items: Item[];

    @Column()
    name: string;

}
