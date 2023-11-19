import {
  Box,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import Subjects from "../Constants/Data";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AddSubject from "../Modals/AddSubject";
import toast, { Toaster } from "react-hot-toast";

export default function Landing() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  function handleSearch() {
    const material = Subjects.find((s) => s.label == value);
    nav({
      pathname: "/materials",
      search: `?major=${material.major}&subject=${material.label}`,
    });
  }

  const [open, setOpen] = useState(false);

  const nav = useNavigate();

  function handleAddNew() {
    if (JSON.parse(localStorage.getItem("token"))) {
      setOpen(true);
    } else {
      toast.error("Login first");
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      exit={{ opacity: "100%", transition: { duration: 0.5 } }}
    >
      <Toaster />
      <Box px={5} mb={10}>
        <Box width="100%">
          <Typography variant="h4" fontWeight={700}>
            Welcome to <span style={{ color: "red" }}>S</span>tuddy
            <span style={{ color: "red" }}>B</span>uddy, where you can find all
            your material attachments.
          </Typography>
          <Typography variant="h6" color=" rgba(0, 0, 0, 0.7 ) ">
            Exams, books, lectures and more.
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="h6">
            Enter the subject you're looking for:{" "}
          </Typography>
          <Stack direction="row" gap={1} justifyContent="center">
            <Autocomplete
              fullWidth
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={Subjects.map((option) => option.label)}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  size="small"
                />
              )}
            />
            <Button
              size="small"
              p={1}
              onClick={handleSearch}
              sx={{
                bgcolor: "red",
                "&:hover": {
                  bgcolor: "#000",
                },
              }}
              variant="contained"
            >
              {" "}
              <SearchIcon />
            </Button>
          </Stack>
        </Box>
        <Box mt={10}>
          <Typography variant="h6">
            Have anything you'd like to share ?
          </Typography>
          <Button
            onClick={handleAddNew}
            endIcon={<AddIcon />}
            variant="contained"
          >
            Add a new material
          </Button>
        </Box>
      </Box>
      <AddSubject open={open} setOpen={setOpen} />
    </motion.div>
  );
}
