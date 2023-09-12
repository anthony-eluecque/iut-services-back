import {
    PrimaryGeneratedColumn,
    BaseEntity,
  } from 'typeorm';
  
export default abstract class Model extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

}