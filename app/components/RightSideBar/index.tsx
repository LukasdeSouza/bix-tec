"use client";
import { TypeTransactions } from "@/app/types";
import { formatCurrency } from "@/app/utils";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const RightSideBar = ({
  filteredTransactions,
}: {
  filteredTransactions: any;
}) => {
  return (
    <Stack
      borderLeft={1}
      width={"100%"}
      height={"100%"}
      padding={2}
      style={{
        background: "rgba(255, 255, 255, 0.1",
        backdropFilter: "blur(10px)",
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Avatar
          alt="Remy Sharp"
          src="https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671142.jpg"
        />
        <Stack direction={"column"}>
          <Typography
            color="primary"
            variant="body2"
            fontWeight={600}
            fontFamily={"Poppins"}
          >
            Lucas Silva
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle2"
            fontWeight={200}
            fontFamily={"Poppins"}
          >
            lucas@bixtec.com
          </Typography>
        </Stack>
      </Stack>
      <Divider style={{ marginTop: "12px", marginBottom: "12px" }} />
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography variant="body2" color="primary">
          Resultado dos filtros
        </Typography>
        <Stack direction={"column"}>
          <Typography
            color="primary"
            variant="body2"
            fontWeight={600}
            fontFamily={"Poppins"}
          >
            Quantidade de contas:
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
            fontFamily={"Poppins"}
          >
            {filteredTransactions?.length} contas
          </Typography>
        </Stack>
        <Stack direction={"column"}>
          <Typography
            color="primary"
            variant="body2"
            fontWeight={600}
            fontFamily={"Poppins"}
          >
            Valor total das contas:
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
            fontFamily={"Poppins"}
          >
            {formatCurrency(
              filteredTransactions?.reduce(
                (acc: number, transaction: TypeTransactions) => {
                  return acc + parseFloat(transaction?.amount);
                },
                0
              )
            )}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default RightSideBar;
