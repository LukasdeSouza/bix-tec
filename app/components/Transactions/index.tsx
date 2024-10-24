import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import LineChart from "../Charts/Line";
import { formatCurrency } from "@/app/utils";
import styled from "styled-components";
import { format } from "date-fns";

interface TransactionProps {
  transaction: {
    amount: number;
    currency: string;
    date: string;
    transaction_type: string;
    industry: string;
    state: string;
    account: string;
  };
}

const StyledCardCharts = styled(Box)`
  display: "flex";
  flexdirection: "column";
  width: 50vw;
  gap: 12px;
  padding: 16px;
  background-color: #ffff;
  border-radius: 12px;
  border: 1px solid #ccc;
  boxShadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Transactions = ({ transaction }: TransactionProps) => {
  return (
    <StyledCardCharts>
      <Stack direction={"column"}>
        <Typography
          variant="h5"
          fontWeight={600}
          color="primary"
          style={{ fontFamily: "Poppins" }}
        >
          {formatCurrency(transaction?.amount)}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ fontFamily: "Poppins" }}
        >
          Conta: {transaction?.account}
        </Typography>
      </Stack>
      <LineChart data={[transaction.amount]} categories={[format(transaction.date, 'dd/MM/yyyy')]}/>
    </StyledCardCharts>
  );
};

export default Transactions;
