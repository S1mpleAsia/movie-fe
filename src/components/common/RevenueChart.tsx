import { Box, Button, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { Month, Period, WeekDay } from "../../types/time.type";
import { GeneralType } from "../../types/GeneralType";
import { paymentAPI } from "../../api/modules/payment.api";
import { toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import timeUtils from "../../utils/time.utils";
import dayjs from "dayjs";

const RevenueChart = () => {
  const [monthData, setMonthData] = useState<number[]>([]);
  const [weekData, setWeekData] = useState<number[]>([]);
  const [period, setPreiod] = useState<Period>(Period.Week);

  const [xLabel, setXLabel] = useState<string[]>([]);
  const [date, setDate] = useState<string>(timeUtils.getCurrentDate());

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
        await paymentAPI.getRevenueOverview(Period.Month, date)
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else {
        setMonthData(response.data);
      }
    };

    const getWeekData = async () => {
      const response: GeneralType<number[]> = (
        await paymentAPI.getRevenueOverview(Period.Week, date)
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
    <Box width={800}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <Typography fontSize="1.2rem" fontWeight="600">
            Revenue overview
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                "& input": {
                  display: "none",
                },
                "& fieldset": {
                  display: "none",
                },
              }}
              onChange={(value) => setDate(dayjs(value).format("YYYY-MM-DD"))}
            />
          </LocalizationProvider>
        </Box>
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
                label: "Revenue",
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
