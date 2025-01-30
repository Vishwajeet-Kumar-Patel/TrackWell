import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";
import dayjs from "dayjs";
import { uploadImage } from "../utils/uploadImage.js";

dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    // Check if the email is in use
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      img,
    });
    const createdUser = await user.save();

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
      expiresIn: "9999 years",
    });
    res.status(201).json({ token, user });
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.status(200).send({ message: 'User signed in successfully', data: user, token });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};

// Update Password
export const updatePassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Fetch user
    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found"));

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return next(createError(400, "Old password is incorrect"));
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    console.log("Hashed new password:", hashedPassword); // Debugging step

    user.password = hashedPassword;
    user.markModified("password"); // Ensure password is recognized as modified
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update Profile Image
export const updateProfileImage = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found"));

    if (!req.file) return next(createError(400, "No file uploaded"));

    const imageUrl = await uploadImage(req.file); // Upload function must return a valid URL
    user.img = imageUrl;
    user.markModified("img"); // Ensure image is recognized as modified
    await user.save();

    res.status(200).json({ message: "Profile image updated successfully", imageUrl });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update Personal Details
export const updatePersonalDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updates = req.body; // Only update provided fields

    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found"));

    // Check for email uniqueness only if email is being updated
    if (updates.email) {
      const emailExists = await User.findOne({ email: updates.email });
      if (emailExists && emailExists._id.toString() !== userId) {
        return next(createError(409, "Email is already in use"));
      }
    }

    // Update only the provided fields
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    await user.save();
    res.status(200).json({ message: "Personal details updated successfully" });
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDateFormatted = new Date();
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    //calculte total calories burnt
    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Calculate total no of workouts
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    //Calculate average calories burnt per workout
    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    // Fetch category of workouts
    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Format category data for pie chart

    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
      );
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts: totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks: weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData: pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    let date = req.query.date ? new Date(req.query.date) : new Date();
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );

    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};

export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { workoutString } = req.body;

    if (!workoutString) {
      return next(createError(400, "Workout string is missing"));
    }

    console.log("Received workoutString:", workoutString);

    // Split workoutString into lines
    const eachworkout = workoutString.split(";").map((line) => line.trim());

    // Check if any workouts start with "#" to indicate categories
    const categories = eachworkout.filter((line) => line.startsWith("#"));
    if (categories.length === 0) {
      return next(createError(400, "No categories found in workout string"));
    }

    const parsedWorkouts = [];
    let currentCategory = "";
    let count = 0;

    // Loop through each line to parse workout details
    for (const line of eachworkout) {
      count++;
      if (line.startsWith("#")) {
        const parts = line.split("\n").map((part) => part.trim());
        console.log("Parsed parts:", parts);
        if (parts.length < 5) {
          return next(
            createError(400, `Workout string is missing for ${count}th workout`)
          );
        }

        // Update current category
        currentCategory = parts[0].substring(1).trim();
        // Extract workout details
        const workoutDetails = parseWorkoutLine(parts);
        if (workoutDetails == null) {
          return next(createError(400, "Please enter in proper format "));
        }

        if (workoutDetails) {
          // Add category to workout details
          workoutDetails.category = currentCategory;
          parsedWorkouts.push(workoutDetails);
        }
      } else {
        return next(
          createError(400, `Workout string is missing for ${count}th workout`)
        );
      }
    }

    console.log("Parsed workouts:", parsedWorkouts);

    // Calculate calories burnt for each workout
    for (const workout of parsedWorkouts) {
      workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
      // Check for duplicate workoutName
      const existingWorkout = await Workout.findOne({ workoutName: workout.workoutName, user: userId });
      if (existingWorkout) {
        return next(createError(400, `Workout with name "${workout.workoutName}" already exists`));
      }
      await Workout.create({ ...workout, user: userId });
    }

    // Update streak
    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found"));

    const today = dayjs().startOf('day');
    const lastWorkoutDate = dayjs(user.lastWorkoutDate).startOf('day');

    if (lastWorkoutDate.isBefore(today.subtract(1, 'day'))) {
      user.streak = 1; // Reset streak if last workout was more than 1 day ago
    } else if (lastWorkoutDate.isBefore(today)) {
      user.streak += 1; // Increment streak if last workout was yesterday
    }

    user.lastWorkoutDate = today;
    await user.save();

    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: parsedWorkouts,
    });
  } catch (err) {
    console.error("Error adding workout:", err);
    next(err);
  }
};

// Function to parse workout details from a line
const parseWorkoutLine = (parts) => {
  const details = {};
  console.log("Parsing workout line:", parts);
  if (parts.length >= 5) {
    details.workoutName = parts[1].substring(1).trim();
    details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
    details.reps = parseInt(
      parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
    );
    details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
    details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
    console.log("Parsed workout details:", details);
    return details;
  }
  return null;
};

// Function to calculate calories burnt for a workout
const calculateCaloriesBurnt = (workoutDetails) => {
  const durationInMinutes = parseInt(workoutDetails.duration);
  const weightInKg = parseInt(workoutDetails.weight);
  const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};
export const deleteWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const workoutId = req.params.id;

    const workout = await Workout.findOneAndDelete({ _id: workoutId, user: userId });

    if (!workout) {
      return next(createError(404, "Workout not found or you do not have permission to delete this workout"));
    }

    return res.status(200).json({ message: "Workout deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Get dates with workouts
export const getWorkoutDates = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const workoutDates = await Workout.find({ user: userId }).select("date -_id");

    // Format dates to 'YYYY-MM-DD' for uniformity
    const formattedDates = workoutDates.map((workout) =>
      dayjs(workout.date).format("YYYY-MM-DD")
    );

    return res.status(200).json({ workoutDates: formattedDates });
  } catch (err) {
    next(err);
  }
};
