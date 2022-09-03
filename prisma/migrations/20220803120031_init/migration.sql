-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `user_role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `create_time` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `List` (
    `list_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `starts_at` DATETIME(3) NOT NULL,
    `ends_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`list_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `task_id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_name` VARCHAR(191) NOT NULL,
    `duration` DATETIME(3) NULL,
    `status` ENUM('NEW', 'STARTED', 'ENDED') NOT NULL DEFAULT 'NEW',
    `description` VARCHAR(191) NOT NULL,
    `list_id` INTEGER NOT NULL,
    `created_by` INTEGER NOT NULL,
    `assigned_to` INTEGER NULL,
    `parent_task_id` INTEGER NULL,
    `priority_id` INTEGER NULL,

    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Priority` (
    `priority_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `degree` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `created_by` INTEGER NOT NULL,

    PRIMARY KEY (`priority_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_list_id_fkey` FOREIGN KEY (`list_id`) REFERENCES `List`(`list_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_parent_task_id_fkey` FOREIGN KEY (`parent_task_id`) REFERENCES `Task`(`task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_priority_id_fkey` FOREIGN KEY (`priority_id`) REFERENCES `Priority`(`priority_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Priority` ADD CONSTRAINT `Priority_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
