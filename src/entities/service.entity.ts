import { Entity, Column, ManyToOne } from "typeorm"
import Model from "./model.entity"
import { Teacher } from "./teacher.entity"
import { Item } from "./item.entity"

@Entity('services')
export class Service extends Model {
    @Column()
    year: number

    @ManyToOne(() => Teacher, (teacher) => teacher.service)
    teacher: Teacher;

    @ManyToOne(() => Item, (item) => item.services)
    items: Item[];
}