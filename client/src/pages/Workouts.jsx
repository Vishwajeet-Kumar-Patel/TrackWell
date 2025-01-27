import React, { useEffect, useState, useCallback, useContext } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import { getWorkouts, deleteWorkout, getWorkoutDates } from "../api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeContext } from "../utils/ThemeContext";
import dayjs from "dayjs";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Right = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Title = styled.h2`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  text-align: center;
  background: ${({ theme }) => theme.bg_secondary};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const SecTitle = styled.h3`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  text-align: center;
  background: ${({ theme }) => theme.bg_secondary};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Workouts = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const { theme } = useContext(ThemeContext);

  // Fetch workouts for the selected date
  const getTodaysWorkout = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getWorkouts(token, date);
      setTodaysWorkouts(res?.todaysWorkouts || []);
    } catch (error) {
      console.error("Error fetching today's workouts:", error);
      alert("Error fetching today's workouts: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [date]);

  // Fetch all workouts to determine highlighted dates
  const getHighlightedDates = useCallback(async () => {
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getWorkouts(token);
      const workoutDates = res?.workouts?.map((workout) =>
        dayjs(workout.date).format("YYYY-MM-DD")
      );
      setHighlightedDates([...new Set(workoutDates)] || []); // Ensure unique dates
    } catch (error) {
      console.error("Error fetching workouts:", error);
      alert("Error fetching workouts: " + error.message);
    }
  }, []);

  // Delete a workout
  const handleDeleteWorkout = async (workoutId) => {
    const token = localStorage.getItem("fittrack-app-token");
    try {
      await deleteWorkout(token, workoutId);
      getTodaysWorkout(); // Refresh the list after deletion
      getHighlightedDates(); // Refresh highlighted dates
    } catch (error) {
      console.error("Error deleting workout:", error);
      alert("Error deleting workout: " + error.message);
    }
  };

  useEffect(() => {
    getTodaysWorkout();
  }, [date, getTodaysWorkout]);

  useEffect(() => {
    getHighlightedDates();
  }, [getHighlightedDates]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={dayjs(date)}
              onChange={(newDate) => setDate(dayjs(newDate).format("YYYY-MM-DD"))}
              sx={{
                backgroundColor: theme.bg_secondary,
                color: theme.text_primary,
                ".MuiPickersDay-root": {
                  color: theme.text_primary,
                },
                ".MuiPickersDay-root.Mui-selected": {
                  backgroundColor: theme.primary,
                },
                ".MuiPickersDay-root:hover": {
                  backgroundColor: theme.primary + "20",
                },
                ".MuiPickersDay-root.Mui-selected:hover": {
                  backgroundColor: theme.primary,
                },
                ".MuiPickersDay-root.Mui-disabled": {
                  color: theme.text_secondary,
                },
                ".MuiPickersDay-root.Mui-disabled:hover": {
                  backgroundColor: "transparent",
                },
              }}
              renderDay={(day, _value, DayComponentProps) => {
                const formattedDay = dayjs(day).format("YYYY-MM-DD");
                const isWorkoutDay = highlightedDates.includes(formattedDay);
                return (
                  <DayComponentProps.DayComponent
                    {...DayComponentProps}
                    style={{
                      backgroundColor: isWorkoutDay
                        ? theme.primary + "20"
                        : "transparent",
                      borderRadius: isWorkoutDay ? "50%" : undefined,
                    }}
                  />
                );
              }}
            />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Today's Workout</SecTitle>
            {loading ? (
              <CircularProgress />
            ) : (
              <CardWrapper>
                {todaysWorkouts && todaysWorkouts.length > 0 ? (
                  todaysWorkouts.map((workout, index) => (
                    <WorkoutCard
                      key={index}
                      workout={workout}
                      onDelete={handleDeleteWorkout}
                    />
                  ))
                ) : (
                  <div>No workouts for today</div>
                )}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
