import mongoose from 'mongoose';

const ExerciseRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  exercise: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const ExerciseRecord = mongoose.model('ExerciseRecord', ExerciseRecordSchema);
export default ExerciseRecord;  