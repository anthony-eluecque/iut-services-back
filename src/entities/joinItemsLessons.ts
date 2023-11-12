import { Entity, ManyToOne, Column } from "typeorm";
import { Item } from "./item.entity";
import { Lesson_type } from "./lesson_type.entity";
import Model from "./model.entity";

@Entity('items_lessons')
export class CustomJoinItemsLessons extends Model {

  @ManyToOne(() => Item, item => item.lessonTypes, { onDelete : 'CASCADE' })
  item: Item;

  @ManyToOne(() => Lesson_type, lessonType => lessonType.items, { onDelete : 'CASCADE' })
  lessonType: Lesson_type;

  @Column()
  amountHours: number;
}