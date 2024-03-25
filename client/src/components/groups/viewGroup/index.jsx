import React from "react";
import { Container, styled, Typography, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ViewGroup() {
  return (
    <Container>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette["info"].lighter,
          borderRadius: 2,
          p: 2,
          color: (theme) => theme.palette["primary"].darker,
          pb: 3,
        }}
      >
        <Typography variant="h4" pb={1}>
          View Group Component is under development
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Add Expense functionality is under development
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Team-1
        </Typography>
      </Box>
    </Container>
  );
}
