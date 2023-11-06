import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1697955218188 implements MigrationInterface {
    name = ' $npmConfigName1697955218188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lessons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "givenId" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_e94b534abe91cc97a2234e65e44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amountHours" integer NOT NULL, "lessonId" uuid, "serviceId" uuid, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "teacherId" uuid, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "givenId" character varying NOT NULL, "lastName" character varying NOT NULL, "firstName" character varying NOT NULL, "roleId" uuid, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."roles_name_enum" AS ENUM('admin')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."roles_name_enum" NOT NULL DEFAULT 'admin', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson_types_items_items" ("lessonTypesId" uuid NOT NULL, "itemsId" uuid NOT NULL, CONSTRAINT "PK_64f22c8813cba813ade44a43dc0" PRIMARY KEY ("lessonTypesId", "itemsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2872efe3dabbd810a98ac8ba69" ON "lesson_types_items_items" ("lessonTypesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b16bcd6eeb925d7f25372421e3" ON "lesson_types_items_items" ("itemsId") `);
        await queryRunner.query(`CREATE TABLE "items_lesson_types_lesson_types" ("itemsId" uuid NOT NULL, "lessonTypesId" uuid NOT NULL, CONSTRAINT "PK_71c0fbd75086a220676d4c4984a" PRIMARY KEY ("itemsId", "lessonTypesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_497939c81c9a2d7bac35bb5d5e" ON "items_lesson_types_lesson_types" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f9f9fb562a26da82f151d1fbd8" ON "items_lesson_types_lesson_types" ("lessonTypesId") `);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_bb888b10f3752c8fdf60a2e0313" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_8f4fbd270fc97f1d51538c34a7d" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_8c4976be5c0219a16de74c93eaa" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_0938564fcd85db9aeb8c4bf5131" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_types_items_items" ADD CONSTRAINT "FK_2872efe3dabbd810a98ac8ba69e" FOREIGN KEY ("lessonTypesId") REFERENCES "lesson_types"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lesson_types_items_items" ADD CONSTRAINT "FK_b16bcd6eeb925d7f25372421e3b" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_lesson_types_lesson_types" ADD CONSTRAINT "FK_497939c81c9a2d7bac35bb5d5e6" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "items_lesson_types_lesson_types" ADD CONSTRAINT "FK_f9f9fb562a26da82f151d1fbd87" FOREIGN KEY ("lessonTypesId") REFERENCES "lesson_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_lesson_types_lesson_types" DROP CONSTRAINT "FK_f9f9fb562a26da82f151d1fbd87"`);
        await queryRunner.query(`ALTER TABLE "items_lesson_types_lesson_types" DROP CONSTRAINT "FK_497939c81c9a2d7bac35bb5d5e6"`);
        await queryRunner.query(`ALTER TABLE "lesson_types_items_items" DROP CONSTRAINT "FK_b16bcd6eeb925d7f25372421e3b"`);
        await queryRunner.query(`ALTER TABLE "lesson_types_items_items" DROP CONSTRAINT "FK_2872efe3dabbd810a98ac8ba69e"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_0938564fcd85db9aeb8c4bf5131"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_8c4976be5c0219a16de74c93eaa"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_8f4fbd270fc97f1d51538c34a7d"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_bb888b10f3752c8fdf60a2e0313"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f9f9fb562a26da82f151d1fbd8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_497939c81c9a2d7bac35bb5d5e"`);
        await queryRunner.query(`DROP TABLE "items_lesson_types_lesson_types"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b16bcd6eeb925d7f25372421e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2872efe3dabbd810a98ac8ba69"`);
        await queryRunner.query(`DROP TABLE "lesson_types_items_items"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "lesson_types"`);
        await queryRunner.query(`DROP TABLE "lessons"`);
    }

}
