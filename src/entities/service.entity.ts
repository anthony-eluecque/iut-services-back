import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import Model from "./model.entity"
import { Teacher } from "./teacher.entity"
import { Item } from "./item.entity"

@Entity('services')
export class Service extends Model {
    @Column()
    year: number

    @OneToOne(() => Teacher, (teacher) => teacher.service)
    @JoinColumn()
    teacher: Teacher;

    @ManyToOne(() => Item, (item) => item.services)
    items: Item[];
}