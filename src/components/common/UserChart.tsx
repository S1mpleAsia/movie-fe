import { useEffect, useState } from "react";
import { Month, Period, WeekDay } from "../../types/time.type";
import { Box, Button, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { number } from "yup";
import { GeneralType } from "../../types/GeneralType";
import { userAPI } from "../../api/modules/user.api";
import { toast } from "react-toastify";

const UserChart = () => {
  const [monthData, setMonthData] = useState<number[]>([]);
  const [weekData, setWeekData] = useState<number[]>([]);
  const [period, setPeriod] = useState<Period>(Period.Week);
  const [xLabel, setXLabel] = useState<string[]>([]);

  // const monthData = [
  //   4000, 3000, 2000, 2780, 1890, 2390, 3490, 4200, 5600, 1860, 4100, 3780,
  // ];
  // const weekData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

  useEffect(() => {
    setXLabel(
      period === Period.Week ? Object.values(WeekDay) : Object.values(Month)
    );
  }, [period]);

  useEffect(() => {
    const getMonthData = async () => {
      const response: GeneralType<number[]> = (
        await userAPI.getUserOverview(Period.Month)
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else {
        setMonthData(response.data);
      }
    };

    const getWeekData = async () => {
      const response: GeneralType<number[]> = (
        await userAPI.getUserOverview(Period.Week)
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else {
        setWeekData(response.data);
      }
    };

    getMonthData();
    getWeekData();
  }, []);

  return (
    <Box flex="1">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontSize="1.2rem" fontWeight="600">
          User analytics
        </Typography>
        <Box display="flex" gap={2}>
          <Button onClick={() => setPeriod(Period.Month)}>Month</Button>
          <Button onClick={() => setPeriod(Period.Week)}>Week</Button>
        </Box>
      </Box>

      {xLabel.length !== 0 &&
        ((xLabel.length === 7 && period === Period.Week) ||
          (xLabel.length === 12 && period === Period.Month)) && (
          <BarChart
            height={500}
            grid={{
              horizontal: true,
            }}
            sx={{
              width: "100%",
              backgroundColor: "#1e1e1e",
              paddingX: "10px",
              marginTop: "10px",
            }}
            series={[
              {
                data: period === Period.Week ? weekData : monthData,
                label: "User",
              },
            ]}
            xAxis={[{ scaleType: "band", data: xLabel }]}
          />
        )}
    </Box>
  );
};

export default UserChart;
