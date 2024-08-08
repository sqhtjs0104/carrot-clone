-- CreateTable
CREATE TABLE "Uesr" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "github_id" TEXT,
    "avatar" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Uesr_username_key" ON "Uesr"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Uesr_email_key" ON "Uesr"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Uesr_phone_key" ON "Uesr"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Uesr_github_id_key" ON "Uesr"("github_id");
