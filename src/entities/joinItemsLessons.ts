import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Item } from "./item.entity";
import { Lesson_type } from "./lesson_type.entity";
import Model from "./model.entity";

@Entity('items_lessons')
export class CustomJoinItemsLessons extends Model {

  @ManyToOne(() => Item, item => item.lessonTypes)
  item: Item;

  @ManyToOne(() => Lesson_type, lessonType => lessonType.items)
  lessonType: Lesson_type;

  @Column()
  amountHours: number
}