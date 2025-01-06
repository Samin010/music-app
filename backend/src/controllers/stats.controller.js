import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
  try {
    // const totalSongs=await Song.countDocuments()
    // const totalUsers=await User.countDocuments()
    // const totalAlbums=await Album.countDocuments()

    // Better way
    const [totalSongs, totalUsers, totalAlbums] = await Promise.all([
      Song.countDocuments(),
      Album.countDocuments(),
      User.countDocuments(),
    ]);

    const uniqueArtists = await Song.aggregate([
      {
        $unionWith: {
          coll: "albums",
          pipeline: [],
        },
      },
      {
        $group: {
          _id: "$artist",
        },
      },
      {
        $count: "count",
      },
    ]);
    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};
