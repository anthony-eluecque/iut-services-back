import { Entity, Column, ManyToOne } from "typeorm"
import Model from "./model.entity"
import { Role } from "./role.entity"

@Entity('teachers')
export class Teacher extends Model {
    @Column()
    givenId: string

    @Column()
    lastName: string

    @Column()
    firstName: string

    @ManyToOne(() => Role, role => role.teacher)
    role : Role
}
