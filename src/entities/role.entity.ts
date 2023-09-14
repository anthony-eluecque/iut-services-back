import Model from "./model.entity";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm"
import { Teacher } from "./teacher.entity";

export enum Roles {
    ADMIN = "admin"
}

@Entity('roles')
export class Role extends Model {

    @Column({
        type:'enum',
        enum : Roles,
        default : Roles.ADMIN
    })
    name : Roles

    @OneToMany(() => Teacher, teacher => teacher.role, { onDelete: 'CASCADE' })
    teachers : Teacher[]

}