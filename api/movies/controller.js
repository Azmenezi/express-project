const Movie = require("../../models/Movie");

exports.fetchMovie = async (movieId, next) => {
  try {
    const foundMovie = await Movie.findById(movieId);
    return foundMovie;
  } catch (error) {
    return next(error);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.posterImage = `${req.file.path.replace("\\", "/")}`;
    }
    const createdMovie = await Movie.create(req.body);
    res.status(201).json(createdMovie);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    await req.movie.deleteOne();
    return res.status(204).end();
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};
exports.movieUpdate = async (req, res) => {
  try {
    const updatedMovie = await Movie.updateOne(req.movie, req.body, {
      new: true,
    });

    res.status(201).json(updatedMovie);
  } catch (err) {
    return res.status(500).json({ message: "something wrong" });
  }
};
exports.updateRating = async (req, res, next) => {
  try {
    if (req.body.ratings >= 0 && req.body.ratings <= 10) {
      const updatedMovie = await Movie.updateOne(
        req.movie,
        { $push: { ratings: [...req.movie.ratings, req.body.ratings] } },
        {
          new: true,
        }
      );
      return res
        .status(201)
        .json({ message: `${req.body.ratings} has been added to the ratings` });
    } else {
      return next({
        status: 400,
        message: "make sure the number is from 0 to 10",
      });
    }
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

exports.getAllMovies = async (req, res, next) => {
  try {
    let moviesList = await Movie.find();
    const mappedMovies = moviesList.map((movie) => {
      const rating =
        movie.ratings.reduce((a, b) => a + b, 0) / movie.ratings.length;
      return { ...movie._doc, rating };
    });
    return res.status(200).json(mappedMovies);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

exports.addCast = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.actorImage = `${req.file.path.replace("\\", "/")}`;
    }
    const addedCast = await Movie.updateOne(
      req.movie,
      {
        $push: {
          cast: [
            ...req.movie.cast,
            { actorName: req.body.actorName, actorImage: req.body.actorImage },
          ],
        },
      },
      {
        new: true,
      }
    );
    return res.status(201).json(addedCast);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};
