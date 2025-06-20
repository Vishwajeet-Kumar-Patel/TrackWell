import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts, deleteWorkout } from "../api";

// Styled Components
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
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  padding: 0px 16px;
  font-size: 30px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 800;
  text-align: center;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
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

// Dashboard Component
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);

  const [workout, setWorkout] = useState(`#Category
 Workout Name
 sets reps
 Weight
 Duration`);

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getDashboardDetails(token);
      setData(res);
      console.log("Dashboard data:", res);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      alert("Error fetching dashboard data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getWorkouts(token, ""); // Empty string fetches today's workout
      setTodaysWorkouts(res?.todaysWorkouts || []);
      console.log("Today's workouts:", res);
    } catch (error) {
      console.error("Error fetching today's workouts:", error);
      alert("Error fetching today's workouts: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addNewWorkout = async () => {
  setButtonLoading(true);
  const token = localStorage.getItem("fittrack-app-token");
  const workoutInput = workout.trim(); // 'workout' is the state holding user input

  try {
    if (!workoutInput) {
      alert("Please enter a workout string before submitting.");
      return;
    }

    console.log("📤 Workout string to send:", workoutInput);

    // ✅ Send the workout string directly (not wrapped in an object)
    await addWorkout(token, workoutInput);

    // Refresh dashboard data
    await dashboardData();
    await getTodaysWorkout();

    alert("✅ Workout added successfully!");
    setWorkout(""); // clear input field
  } catch (error) {
    console.error("❌ Error adding new workout:", error.message);
    alert("Error adding new workout: " + error.message);
  } finally {
    setButtonLoading(false);
  }
};

  const handleDeleteWorkout = async (workoutId) => {
    const token = localStorage.getItem("fittrack-app-token");
    try {
      await deleteWorkout(token, workoutId);
      await getTodaysWorkout();
    } catch (error) {
      console.error("Error deleting workout:", error);
      alert("Error deleting workout: " + error.message);
    }
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>

        <FlexWrap>
          {counts.map((item, index) => (
            <CountsCard key={index} item={item} data={data} />
          ))}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        <Section>
          <Title>Today's Workouts</Title>
          <CardWrapper>
            {todaysWorkouts.length > 0 ? (
              todaysWorkouts.map((workout, index) => (
                <WorkoutCard key={index} workout={workout} onDelete={handleDeleteWorkout} />
              ))
            ) : (
              <div>No workouts for today</div>
            )}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
