-- CreateTable
CREATE TABLE "PlaylistSettings" (
    "id" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "genres" TEXT[],
    "artists" TEXT[],
    "minAcoustic" INTEGER,
    "maxAcoustic" INTEGER,
    "minDanceability" INTEGER,
    "maxDanceability" INTEGER,
    "minDuration" INTEGER,
    "maxDuration" INTEGER,
    "minEnergy" INTEGER,
    "maxEnergy" INTEGER,
    "minInstrumentalness" INTEGER,
    "maxInstrumentalness" INTEGER,
    "minKey" INTEGER,
    "maxKey" INTEGER,
    "minLiveness" INTEGER,
    "maxLiveness" INTEGER,
    "minLoudness" INTEGER,
    "maxLoudness" INTEGER,
    "minPopularity" INTEGER,
    "maxPopularity" INTEGER,
    "minTempo" INTEGER,
    "maxTempo" INTEGER,
    "minValence" INTEGER,
    "maxValence" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistSettings_playlistId_unique" ON "PlaylistSettings"("playlistId");

-- AddForeignKey
ALTER TABLE "PlaylistSettings" ADD FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
