import { MigrationInterface, QueryRunner } from "typeorm";
import { Lesson_type } from "../entities/lesson_type.entity";
import { AppDataStore } from "../config";

export class CreateLessonTypeData1695809293534 implements MigrationInterface {

    public async up(): Promise<void> {
        const lessonTypeRepository = AppDataStore.getRepository(Lesson_type);

        // Ajoutez les enregistrements "TP", "TD", "CM"
        const lessonTypesData = [
            { name: 'TP' },
            { name: 'TD' },
            { name: 'CM' },
        ];

        await lessonTypeRepository.save(lessonTypesData);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
