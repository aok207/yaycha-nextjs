-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LikePost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "cretedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LikePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LikePost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LikePost" ("cretedAt", "id", "postId", "updatedAt", "userId") SELECT "cretedAt", "id", "postId", "updatedAt", "userId" FROM "LikePost";
DROP TABLE "LikePost";
ALTER TABLE "new_LikePost" RENAME TO "LikePost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
