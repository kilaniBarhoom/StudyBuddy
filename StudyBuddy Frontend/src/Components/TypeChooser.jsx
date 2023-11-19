import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function TypeChooser() {
  const navigate = useNavigate();
  const handleButtonClick = (type) => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const currentMajor = currentSearchParams.get("major");
    const currentSubject = currentSearchParams.get("subject");

    const updatedSearchParams = new URLSearchParams();
    updatedSearchParams.set("major", currentMajor);
    updatedSearchParams.set("subject", currentSubject);
    updatedSearchParams.set("type", type);

    const updatedURL = `/materials?${updatedSearchParams.toString()}`;
    navigate(updatedURL);
  };
  return (
    <motion.div
      style={{ margin: "4vh 0" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      exit={{ opacity: "100%", transition: { duration: 0.5 } }}
    >
      <Box my={3}>
        <Button
          onClick={() => navigate("/")}
          startIcon={<KeyboardBackspaceIcon />}
          sx={{ bgcolor: "#000" }}
          variant="contained"
        >
          Back to home page
        </Button>
      </Box>
      <Stack border="solid 1px rgba(180, 180, 180)">
        <Stack
          onClick={() => handleButtonClick("book")}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              bgcolor: "rgba(230, 230, 230, 0.8)",
            },
          }}
          borderBottom="solid 1px rgba(0, 0, 0, 0.7)"
        >
          <Typography variant="span" fontWeight={600}>
            Books
          </Typography>
          <ArrowForwardIosIcon />
        </Stack>
        <Stack
          onClick={() => handleButtonClick("summary")}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              bgcolor: "rgba(230, 230, 230)",
            },
          }}
          borderBottom="solid 1px rgba(0, 0, 0, 0.7)"
        >
          <Typography variant="span" fontWeight={600}>
            Summaries
          </Typography>
          <ArrowForwardIosIcon />
        </Stack>
        <Stack
          onClick={() => handleButtonClick("midterm")}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              bgcolor: "rgba(230, 230, 230)",
            },
          }}
          borderBottom="solid 1px rgba(0, 0, 0, 0.7)"
        >
          <Typography variant="span" fontWeight={600}>
            Midterms
          </Typography>
          <ArrowForwardIosIcon />
        </Stack>
        <Stack
          onClick={() => handleButtonClick("final")}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              bgcolor: "rgba(230, 230, 230)",
            },
          }}
          borderBottom="solid 1px rgba(0, 0, 0, 0.7)"
        >
          <Typography variant="span" fontWeight={600}>
            Finals
          </Typography>
          <ArrowForwardIosIcon />
        </Stack>
        <Stack
          onClick={() => handleButtonClick("quiz")}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              bgcolor: "rgba(230, 230, 230)",
            },
          }}
          borderBottom="solid 1px rgba(0, 0, 0, 0.7)"
        >
          <Typography variant="span" fontWeight={600}>
            Quizes
          </Typography>
          <ArrowForwardIosIcon />
        </Stack>
        <Stack
          onClick={() => handleButtonClick("lecture")}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              bgcolor: "rgba(230, 230, 230)",
            },
          }}
          borderBottom="solid 1px rgba(0, 0, 0, 0.7)"
        >
          <Typography variant="span" fontWeight={600}>
            Lectures
          </Typography>
          <ArrowForwardIosIcon />
        </Stack>
      </Stack>
    </motion.div>
  );
}
