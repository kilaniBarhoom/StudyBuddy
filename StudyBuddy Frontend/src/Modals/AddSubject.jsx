import * as React from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  Modal,
  Autocomplete,
  TextField,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import Subjects from "../Constants/Data";
import Add from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import axios from "axios";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  // height: "70%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 0,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const types = ["quiz", "midterm", "final", "summary", "book", "lecture"];

function getStyles(name, type, theme) {
  return {
    fontWeight:
      type.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddSubject({ open, setOpen }) {
  const [anonymousPost, setAnonymousPost] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setDisabled(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.type = type[0];
    data.subject = inputValue;
    data.anonymous = anonymousPost;
    const token = JSON.parse(localStorage.getItem("token"));
    setDisabled(true);
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_API_URL}${
          import.meta.env.VITE_ALL_MATERIALS_PATH
        }`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        handleClose();
        setLoading(false);
        setDisabled(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
        setDisabled(false);
      });
  };

  const theme = useTheme();
  const [type, setType] = React.useState(["quiz"]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box p={2}>
            <Box align="left">
              <Button
                variant="text"
                onClick={handleClose}
                sx={{ p: "0", minWidth: "0px" }}
              >
                <span
                  style={{
                    color: "#000",
                    display: "flex",
                    padding: " 5px",
                    width: "30px",
                  }}
                >
                  <CloseIcon
                    style={{
                      padding: "0",
                      marging: "0",
                    }}
                  />
                </span>
              </Button>
            </Box>
            <Typography variant="h4">Add a new material</Typography>
            {loading ? (
              <Stack my={2} direction="row" gap={2} alignItems="center">
                <CircularProgress />{" "}
                <Typography variant="h6">Progressing</Typography>
              </Stack>
            ) : (
              <></>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack mt={3} gap={2}>
                <Box>
                  <InputLabel id="demo-multiple-name-label">
                    Material name:
                  </InputLabel>
                  <TextField
                    {...register("name", {
                      required: "Material name is required",
                    })}
                    fullWidth
                    size="small"
                  />
                  {errors.name && (
                    <span style={{ color: "red", fontSize: "0.8rem" }}>
                      {errors.name.message}
                    </span>
                  )}
                </Box>
                <Box>
                  <InputLabel id="demo-multiple-subject-label">
                    Subject name:
                  </InputLabel>
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
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                        required
                      />
                    )}
                  />
                  {errors.subject && (
                    <span style={{ color: "red", fontSize: "0.8rem" }}>
                      {errors.subject.message}
                    </span>
                  )}
                </Box>
                <Box>
                  <InputLabel id="demo-multiple-name-label">Type</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-multiple-type-label"
                    value={type}
                    onChange={handleChange}
                    input={<OutlinedInput label="Type" />}
                    MenuProps={MenuProps}
                    required
                  >
                    {types.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, type, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.type && (
                    <span style={{ color: "red", fontSize: "0.8rem" }}>
                      {errors.type.message}
                    </span>
                  )}
                </Box>
                <Box>
                  <InputLabel id="demo-multiple-subject-label">
                    Material link:
                  </InputLabel>
                  <TextField
                    {...register("link", {
                      required: "Material link is required",
                    })}
                    fullWidth
                    size="small"
                  />
                  {errors.link && (
                    <span style={{ color: "red", fontSize: "0.8rem" }}>
                      {errors.link.message}
                    </span>
                  )}
                </Box>
                <Box>
                  <Checkbox
                    id="anonymous"
                    value={anonymousPost}
                    onChange={() => setAnonymousPost((p) => !p)}
                  />{" "}
                  <label htmlFor="anonymous" style={{ cursor: "pointer" }}>
                    Post anonymously
                  </label>
                </Box>
                <Box>
                  <Button
                    size="small"
                    type="submit"
                    endIcon={<Add />}
                    disabled={disabled}
                    variant="contained"
                  >
                    <span>Add</span>
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
