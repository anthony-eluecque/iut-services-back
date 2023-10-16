import { Entity, Column } from "typeorm";
import Model from "./model.entity";

@Entity('users')
export class User extends Model {

    @Column()
    email: string;  

    @Column()
    password: string;   

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}
