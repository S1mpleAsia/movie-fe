import { useEffect, useState } from "react";
import { Month, Period, WeekDay } from "../../types/time.type";
import { Box, Button, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const UserChart = () => {
  const [period, setPeriod] = useState<Period>(Period.Week);
  const [xLabel, setXLabel] = useState<string[]>([]);

  const monthData = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 4200, 5600, 1860, 4100, 3780,
  ];
  const weekData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

  useEffect(() => {
    setXLabel(
      period === Period.Week ? Object.values(WeekDay) : Object.values(Month)
    );
  }, [period]);

  useEffect(() => {
    console.log(xLabel);
  }, [xLabel]);

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
                label: "pv",
              },
            ]}
            xAxis={[{ scaleType: "band", data: xLabel }]}
          />
        )}
    </Box>
  );
};

export default UserChart;
