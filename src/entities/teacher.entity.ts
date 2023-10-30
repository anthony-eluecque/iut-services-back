import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";
// import { Role } from "./role.entity";
import { Service } from "./service.entity";

@Entity('teachers')
export class Teacher extends Model {
    @Column()
    givenId: string;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    // @ManyToOne(() => Role, (role) => role.teachers)
    // role : Role;

    @OneToMany(() => Service, (service) => service.teacher)
    services : Service[];
}
