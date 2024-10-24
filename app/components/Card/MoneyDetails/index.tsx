import { formatCurrency } from "@/app/utils";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import LineChart from "../../Charts/Line";

interface CardMoneyDetailsProps {
    date: string;
    amount: number;
    currency: string;
}

export const CardMoneyDetails = ({ date, amount, currency }: CardMoneyDetailsProps) => {
  return (
    <Box bgcolor={"#1a1a1a"} maxWidth={'400px'}  padding={2}>
      <Typography variant={"h6"} style={{color: "#fff"}}>
        {formatCurrency(amount, currency)}
      </Typography>
      <LineChart/>
    </Box>
  );
};
