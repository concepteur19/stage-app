/*
  Warnings:

  - You are about to drop the column `assigned_to` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `task` table. All the data in the column will be lost.
  - Added the required column `created_by_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `List_user_id_fkey` ON `list`;

-- DropIndex
DROP INDEX `Priority_created_by_fkey` ON `priority`;

-- DropIndex
DROP INDEX `Task_assigned_to_fkey` ON `task`;

-- DropIndex
DROP INDEX `Task_created_by_fkey` ON `task`;

-- DropIndex
DROP INDEX `Task_list_id_fkey` ON `task`;

-- DropIndex
DROP INDEX `Task_parent_task_id_fkey` ON `task`;

-- DropIndex
DROP INDEX `Task_priority_id_fkey` ON `task`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `assigned_to`,
    DROP COLUMN `created_by`,
    ADD COLUMN `assigned_to_id` INTEGER NULL,
    ADD COLUMN `created_by_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_list_id_fkey` FOREIGN KEY (`list_id`) REFERENCES `List`(`list_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_assigned_to_id_fkey` FOREIGN KEY (`assigned_to_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_parent_task_id_fkey` FOREIGN KEY (`parent_task_id`) REFERENCES `Task`(`task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_priority_id_fkey` FOREIGN KEY (`priority_id`) REFERENCES `Priority`(`priority_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Priority` ADD CONSTRAINT `Priority_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
