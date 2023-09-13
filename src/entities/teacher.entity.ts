import { Entity, Column } from "typeorm"
import Model from "./model.entity"

@Entity('teachers')
export class Teacher extends Model {
    @Column()
    givenId: string

    @Column()
    lastName: string

    @Column()
    firstName: string

    @Column()
    roleId: string
}
