import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Teacher } from "./teacher.entity";
import { Item } from "./item.entity";

@Entity('services')
export class Service extends Model {
    @Column()
    year: number;

    @ManyToOne(() => Teacher, (teacher) => teacher.services, { onDelete: 'CASCADE' })
    teacher: Teacher;

    @OneToMany(() => Item, (item) => item.service)
    items: Item[];
}