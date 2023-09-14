import { Entity, Column, ManyToOne } from "typeorm"
import Model from "./model.entity"
import { Lesson } from "./lesson.entity";

@Entity('items')
export class Item extends Model {

    @Column()
    amountHours: number

    @Column()
    type: string

    @ManyToOne(() => Lesson, lesson => lesson.items, { onDelete : 'CASCADE' })
    lesson: Lesson;
}
