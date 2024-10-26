-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('USER', 'UPLOADER', 'MOD', 'ADMIN');

-- CreateEnum
CREATE TYPE "SerieType" AS ENUM ('NOVEL', 'MANGA');

-- CreateEnum
CREATE TYPE "SerieSubtype" AS ENUM ('MANGA', 'MANHWA', 'MANHUA', 'WEBTOON', 'COMIC', 'WEBNOVEL', 'LIGHTNOVEL');

-- CreateEnum
CREATE TYPE "ChapterContentType" AS ENUM ('NOVEL', 'MANGA');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "userRole" NOT NULL DEFAULT 'USER',
    "image" TEXT,
    "background" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLibrary" (
    "id" SERIAL NOT NULL,
    "bookmark" BOOLEAN NOT NULL,
    "notification" BOOLEAN NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER,

    CONSTRAINT "UserLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReadHistory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT NOT NULL,
    "chapterID" TEXT NOT NULL,

    CONSTRAINT "UserReadHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Serie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "description" TEXT,
    "status" INTEGER NOT NULL,
    "adult" BOOLEAN NOT NULL DEFAULT false,
    "posterImage" TEXT,
    "coverImage" TEXT,
    "type" "SerieType" NOT NULL,
    "subtype" "SerieSubtype" NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "releasedAt" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Serie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "index" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "type" "ChapterContentType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "serieID" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterContent" (
    "id" TEXT NOT NULL,
    "type" "ChapterContentType" NOT NULL,
    "text" TEXT,
    "chapterID" TEXT NOT NULL,

    CONSTRAINT "ChapterContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "chapterContentId" TEXT,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Title" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "serieID" INTEGER NOT NULL,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToSerie" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToSerie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorToSerie" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ChapterContent_chapterID_key" ON "ChapterContent"("chapterID");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToSerie_AB_unique" ON "_TagToSerie"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToSerie_B_index" ON "_TagToSerie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToSerie_AB_unique" ON "_GenreToSerie"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToSerie_B_index" ON "_GenreToSerie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToSerie_AB_unique" ON "_AuthorToSerie"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToSerie_B_index" ON "_AuthorToSerie"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReadHistory" ADD CONSTRAINT "UserReadHistory_chapterID_fkey" FOREIGN KEY ("chapterID") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_serieID_fkey" FOREIGN KEY ("serieID") REFERENCES "Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterContent" ADD CONSTRAINT "ChapterContent_chapterID_fkey" FOREIGN KEY ("chapterID") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_chapterContentId_fkey" FOREIGN KEY ("chapterContentId") REFERENCES "ChapterContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_serieID_fkey" FOREIGN KEY ("serieID") REFERENCES "Serie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToSerie" ADD CONSTRAINT "_TagToSerie_A_fkey" FOREIGN KEY ("A") REFERENCES "Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToSerie" ADD CONSTRAINT "_TagToSerie_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToSerie" ADD CONSTRAINT "_GenreToSerie_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToSerie" ADD CONSTRAINT "_GenreToSerie_B_fkey" FOREIGN KEY ("B") REFERENCES "Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToSerie" ADD CONSTRAINT "_AuthorToSerie_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToSerie" ADD CONSTRAINT "_AuthorToSerie_B_fkey" FOREIGN KEY ("B") REFERENCES "Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
