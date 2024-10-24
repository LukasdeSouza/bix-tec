"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SideBar from "../components/SideBar";
import Transactions from "../components/Transactions";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BiDollar, BiSearch } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { TypeTransactions } from "../types";
import RightSideBar from "../components/RightSideBar";
import toast from "react-hot-toast";

export default function DashboardLayout() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 20;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeTransactions>();

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/transactions?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (err) {
      toast.error((err as Error).message);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitFilter = (values: TypeTransactions) => {
    const filteredResults = transactions.filter(
      (transaction: TypeTransactions) => {
        const currencyMatches = values.currency
          ? transaction.currency === values.currency
          : true;
        const industryMatches = values.industry
          ? transaction.industry === values.industry
          : true;
        const stateMatches = values.state
          ? transaction.state === values.state
          : true;
        const amountMatches = values.amount
          ? parseFloat(transaction.amount) === parseFloat(values.amount)
          : true;
        localStorage.setItem(
          "filters",
          JSON.stringify({
            currencyMatches,
            industryMatches,
            stateMatches,
          })
        );
        return (
          currencyMatches && industryMatches && stateMatches && amountMatches
        );
      }
    );
    setFilteredTransactions(filteredResults);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token_bix");

    if (!authToken) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  useEffect(() => {
    setFilteredTransactions(filteredTransactions);
  },[filteredTransactions])

  if (loading)
    return (
      <Stack
        height={"100vh"}
        width={"100vw"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CircularProgress color="primary" />
        <Typography
          color="primary"
          fontWeight={600}
          variant="h4"
          style={{ fontFamily: "Poppins" }}
        >
          Bix tecnologia
        </Typography>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          style={{ fontFamily: "Poppins", fontWeight: 400 }}
        >
          buscando dados para dashboard financeiro...
        </Typography>
      </Stack>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <SideBar loading={loading}>
      <Stack direction={"row"}>
        <Stack direction={"column"} minWidth={"830px"}>
          <Stack
            component={"form"}
            direction={"row"}
            alignItems={"center"}
            onSubmit={handleSubmit(onSubmitFilter)}
            ml={4}
            gap={2}
          >
            <Stack direction={"column"}>
              <Typography color="textSecondary" variant="subtitle2">
                Moeda
              </Typography>
              <Select
                size="small"
                variant="outlined"
                label=""
                {...register("currency")}
                style={{ minWidth: 180, maxWidth: 180 }}
              >
                <MenuItem value={"brl"}>brl</MenuItem>
              </Select>
            </Stack>
            <Stack direction={"column"}>
              <Typography color="textSecondary" variant="subtitle2">
                Indústria
              </Typography>
              <Select
                size="small"
                variant="outlined"
                label=""
                {...register("industry")}
                style={{ minWidth: 180, maxWidth: 180 }}
              >
                {transactions.map((transaction: TypeTransactions, index) => (
                  <MenuItem key={index} value={transaction?.industry}>
                    {transaction?.industry}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack direction={"column"}>
              <Typography color="textSecondary" variant="subtitle2">
                Estado
              </Typography>
              <Select
                size="small"
                variant="outlined"
                label=""
                {...register("state")}
                style={{ minWidth: 80, maxWidth: 80 }}
              >
                {transactions.map((transaction: TypeTransactions, index) => (
                  <MenuItem key={index} value={transaction?.state}>
                    {transaction?.state}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <IconButton
              type="submit"
              size="small"
              color="primary"
              style={{ marginTop: 18 }}
            >
              <BiSearch />
            </IconButton>
            <Stack direction={"column"} ml={4}>
              <Typography color="textSecondary" variant="subtitle2">
                Ver mais
              </Typography>
              <Button
                variant={"contained"}
                style={{textTransform:'none', fontFamily: 'Poppins'}}
                onClick={() => {
                  setPage(page + 1);
                  limit + 10;
                }}
              >
                Buscar mais dados
              </Button>
            </Stack>
          </Stack>
          <Stack direction={"row"} flexWrap={"wrap"} padding={2} gap={2} ml={2}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <Transactions key={index} transaction={transaction} />
              ))
            ) : (
              <Stack gap={1}>
                <Typography variant="subtitle2" color="textSecondary">
                  Não encontramos resultados para seus filtros, então trouxemos
                  todos os dados.
                </Typography>
                {transactions.map((transaction, index) => (
                  <Transactions key={index} transaction={transaction} />
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
        <RightSideBar filteredTransactions={filteredTransactions} />
      </Stack>
    </SideBar>
  );
}
