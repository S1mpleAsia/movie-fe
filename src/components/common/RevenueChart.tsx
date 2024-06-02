import { Box, Button, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { Month, Period, WeekDay } from "../../types/time.type";

const RevenueChart = () => {
  const [period, setPreiod] = useState<Period>(Period.Week);

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
    <Box width={800}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontSize="1.2rem" fontWeight="600">
          Revenue overview
        </Typography>
        <Box display="flex" gap={2}>
          <Button onClick={() => setPreiod(Period.Month)}>Month</Button>
          <Button onClick={() => setPreiod(Period.Week)}>Week</Button>
        </Box>
      </Box>

      {xLabel.length !== 0 &&
        ((xLabel.length === 7 && period === Period.Week) ||
          (xLabel.length === 12 && period === Period.Month)) && (
          <LineChart
            width={800}
            height={500}
            grid={{
              horizontal: true,
            }}
            sx={{
              backgroundColor: "#1e1e1e",
              paddingX: "10px",
              marginTop: "10px",
            }}
            series={[
              {
                data: period === Period.Week ? weekData : monthData,
                label: "pv",
                area: true,
                showMark: false,
              },
            ]}
            xAxis={[{ scaleType: "point", data: xLabel }]}
          />
        )}
    </Box>
  );
};

export default RevenueChart;
