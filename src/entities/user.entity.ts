import { Entity, Column } from "typeorm";
import Model from "./model.entity";
import { IsEmail, validate, IsNotEmpty } from "class-validator";
import { Request } from "express";

@Entity('users')
export class User extends Model {

    @Column({unique : true})
    @IsEmail()
    @IsNotEmpty()
    email: string;  

    @Column()
    @IsNotEmpty()
    password: string;   

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;


    @Column({ default : false })
    @IsNotEmpty()
    isAdmin : boolean;

    constructor(email: string, password: string, firstName: string, lastName: string) {
        super();
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}


/**
 * Valide les données d'un utilisateur en fonction du modèle de l'utilisateur.
 * Crée une instance de la classe User avec les données fournies dans la requête,
 * puis utilise le validateur de classe pour vérifier la validité de l'instance.
 *
 * @param {Request} req - L'objet de requête Express contenant les données de l'utilisateur.
 * @returns {Promise<boolean>} Une promesse résolue avec un booléen indiquant si les données sont valides.
 */
export const validateUser = async (req : Request): Promise<boolean> => {
    const { email, password, firstName, lastName } = req.body;
    const user = new User(email,password,firstName,lastName);
    const errors = await validate(user);
    return errors.length == 0 ? true : false;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse e-mail de l'utilisateur.
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur.
 *         firstName:
 *           type: string
 *           description: Prénom de l'utilisateur.
 *         lastName:
 *           type: string
 *           description: Nom de l'utilisateur.
 *         isAdmin:
 *           type: boolean
 *           default: false
 *           description: Indique si l'utilisateur a des privilèges d'administrateur.
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       example:
 *         email: "john.doe@example.com"
 *         password: "password123"
 *         firstName: "John"
 *         lastName: "Doe"
 *         isAdmin: false
 */