import { Entity, Column } from "typeorm";
import Model from "./model.entity";
import { IsEmail, validate, IsNotEmpty } from "class-validator";
import { Request } from "express";
import { compare, hash } from "bcrypt";
@Entity('users')
export class User extends Model {

    @Column({unique : true})
    @IsEmail()
    email: string;  

    @Column()
    password: string;   

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    constructor(email: string, password: string, firstName: string, lastName: string) {
        super();
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export const validateUser = async (req : Request) => {
    const { email, password, firstName, lastName } = req.body;
    const user = new User(email,password,firstName,lastName);
    const errors = await validate(user);
    return errors.length == 0 ? true : false
}