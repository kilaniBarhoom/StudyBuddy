import * as React from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  Autocomplete,
  TextField,
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
import { useNavigate, useParams } from "react-router-dom";
import { token } from "../Constants/Vars";
// import { BaseURL, token, userId } from "../Contexts/Vars";
// import { Avatar } from "@mui/material";

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
  left: "50%",
  transform: "translateX(-50%)",
  width: "90%",
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

const types = ["quiz", "midterm", "final", "summary", "book", "lecture", ""];

function getStyles(name, type, theme) {
  return {
    fontWeight:
      type.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function EditMaterial() {
  const nav = useNavigate();
  const [material, setMaterial] = React.useState({});
  const [type, setType] = React.useState(["quiz"]);

  const { materialId } = useParams();
  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/api/materials/${materialId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMaterial(res.data.material);
      })
      .catch((err) => {
        console.log(`err ${err}`);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.type = type[0];
    data.subject = inputValue;
    console.log(data);
    console.log(material);
    // axios
    //   .put(`http://localhost:3000/api/materials/${materialId}`, data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     toast.success(res.data.message);
    //     nav(-1);
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message);
    //   });
  };

  const theme = useTheme();

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
      <Box sx={style}>
        <Box p={2}>
          {material ? (
            <div>
              <span>{material.name} - </span> <span>{material.subject} - </span>
              <span>{material.type} - </span> <span>{material.link}</span>
            </div>
          ) : (
            ""
          )}

          <Typography variant="h4">Edit material</Typography>
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
              <Stack direction="row" gap={2}>
                <Button type="submit" variant="contained">
                  Update
                </Button>
                <Button
                  color="error"
                  onClick={() => nav(-1)}
                  variant="contained"
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Box>
    </div>
  );
}
