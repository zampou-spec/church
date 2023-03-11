-- CreateTable
CREATE TABLE "Needed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "goal" DECIMAL NOT NULL,
    "reached" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
