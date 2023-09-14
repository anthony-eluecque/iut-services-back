import { Entity, Column, ManyToOne, OneToMany } from "typeorm"
import Model from "./model.entity"
import { Lesson } from "./lesson.entity";
import { Service } from "./service.entity";

@Entity('items')
export class Item extends Model {

    @Column()
    amountHours: number

    @Column()
    type: string

    @ManyToOne(() => Lesson, lesson => lesson.items, { onDelete : 'CASCADE' })
    lesson: Lesson;

    @OneToMany(() => Service, service => service.items, { onDelete : 'CASCADE' })
    services: Service;
}
