import Model from "./model.entity";
import { Entity, Column, ManyToOne } from "typeorm"
import { Teacher } from "./teacher.entity";

export enum Roles {
    ADMIN
}

@Entity('roles')
export class Role extends Model {

    @Column({
        type:'enum',
        enum : Roles,
        default : Roles.ADMIN
    })
    name : Roles

    @ManyToOne(() => Teacher, teacher => teacher.role)
    teacher : Teacher[]

}