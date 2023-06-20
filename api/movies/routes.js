const express = require("express");
const router = express.Router();
const {
  createMovie,
  deleteMovie,
  updateRating,
  getAllMovies,
  fetchMovie,
  movieUpdate,
  addCast,
} = require("./controller");
const upload = require("../../middlewares/uploader");

router.param("movieId", async (req, res, next, movieId) => {
  try {
    const foundMovie = await fetchMovie(movieId);
    if (!foundMovie) return next({ status: 404, message: "Movie not found" });
    req.movie = foundMovie;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getAllMovies);

router.post("/", upload.single("posterImage"), createMovie);

router.delete("/:movieId", deleteMovie);

router.put("/:movieId", movieUpdate);

router.put("/rating/:movieId", updateRating);

router.put("/cast/:movieId", upload.single("actorImage"), addCast);
module.exports = router;
