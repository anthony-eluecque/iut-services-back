import { Entity, Column, OneToMany } from "typeorm"
import Model from "./model.entity"
import { Item } from "./item.entity";

@Entity('lessons')
export class Lesson extends Model {

    @Column()
    givenId : string

    @Column()
    name : string

    @OneToMany(() => Item, item => item.lesson)
    items: Item[];
}

