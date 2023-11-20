import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { token } from "../Constants/Vars";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";

const TypeShower = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const subject = encodeURIComponent(currentSearchParams.get("subject"));
    const type = encodeURIComponent(currentSearchParams.get("type"));
    axios
      .get(
        `${import.meta.env.VITE_API_URL}${
          import.meta.env.VITE_ALL_MATERIALS_PATH
        }?subject=${subject}&type=${type}`
      )
      .then((res) => {
        setData(res.data.materials);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}${
          import.meta.env.VITE_ALL_MATERIALS_PATH
        }/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleAddRating = (id) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}${
          import.meta.env.VITE_ALL_MATERIALS_PATH
        }/${id}/ratings`,
        {
          rating: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setOpenRating(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const formatCreatedAt = (createdAt) => {
    const dateString = createdAt.split("T")[0];
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString();
    const parts = formattedDate.split("/");
    const day = parts[1];
    const month = parts[0];
    const year = parts[2];
    const newDateString = `${day}/${month}/${year}`;
    return newDateString;
  };

  function calculateAverageRatings(ratings) {
    let sum = 0;
    ratings.forEach((element) => {
      sum += element.rating;
    });
    const average = sum / ratings.length;
    return Math.floor(average); // Convert average to integer
  }

  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleEdit = (materialId) => {
    nav(`/materials/${materialId}`);
  };

  const [ratematerialId, setRateMaterialId] = useState(null);
  const [openRating, setOpenRating] = useState(false);

  const [value, setValue] = React.useState(3);

  function Rate() {
    return (
      <Stack
        p={2}
        gap={2}
        alignItems="center"
        direction="row"
        justifyContent="center"
        my={2}
      >
        <Typography variant="h6">Rate:</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Button
          variant="contained"
          sx={{ bgcolor: "black", fontWeight: 700 }}
          size="small"
          onClick={() => handleAddRating(ratematerialId)}
        >
          <StarIcon />
        </Button>
        <Button
          variant="contained"
          sx={{ fontWeight: 700 }}
          size="small"
          color="error"
          onClick={() => setOpenRating(false)}
        >
          <CloseIcon />
        </Button>
      </Stack>
    );
  }

  function handleOpenRating(id) {
    if (!token) {
      toast.error("Ligin first");
      return;
    }
    setRateMaterialId(id);
    setOpenRating(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      exit={{ opacity: "100%", transition: { duration: 0.5 } }}
    >
      <Box my={3}>
        <Button
          onClick={() => nav(-1)}
          startIcon={<KeyboardBackspaceIcon />}
          sx={{ bgcolor: "#000" }}
          variant="contained"
        >
          Back
        </Button>
      </Box>
      {openRating ? <Rate /> : ""}
      {data.length ? (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Rating</th>
              <th>Added Date</th>
              <th>By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((material) => {
              const actions =
                user?.role === "admin" ? (
                  <Stack gap={1} alignItems="center" direction="row">
                    <IconButton
                      color="info"
                      size="small"
                      onClick={() => handleEdit(material._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(material._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "black", fontWeight: 700 }}
                      size="small"
                      endIcon={<StarIcon />}
                      onClick={() => handleOpenRating(material._id)}
                    >
                      Rate
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "black", fontWeight: 700 }}
                    size="small"
                    endIcon={<StarIcon />}
                    onClick={() => handleOpenRating(material._id)}
                  >
                    Rate
                  </Button>
                );

              return (
                <tr key={material._id}>
                  <td>{material.name}</td>
                  <td id="material-link">
                    <a href={material.link} target="_blank">
                      {material.link}
                    </a>
                  </td>
                  <td>
                    <Rating
                      name="read-only"
                      value={calculateAverageRatings(material.ratings)}
                      readOnly
                    />
                  </td>
                  <td>{formatCreatedAt(material.createdAt)}</td>
                  <td>
                    {material.anonymous ? (
                      "Anonymous"
                    ) : (
                      <Stack direction="row" gap={2} alignItems="center">
                        <Typography variant="span">
                          {material.user
                            ? material.user.username
                            : "Deleted user"}
                        </Typography>
                      </Stack>
                    )}
                  </td>
                  <td>{actions}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Typography variant="h6">No Materials Yet...</Typography>
      )}
    </motion.div>
  );
};

export default TypeShower;
