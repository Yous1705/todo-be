-- AlterEnum
ALTER TYPE "TaskStatus" ADD VALUE 'IN_PROGRESS';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3);
