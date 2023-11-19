import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import TypeChooser from "../Components/TypeChooser";
import TypeShower from "../Components/TypeShower";
import { useEffect, useState } from "react";

export default function Materialmenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState("");
  useEffect(() => {
    setType(searchParams.get("type"));
  }, [searchParams]);

  const major = searchParams.get("major");
  const subject = searchParams.get("subject");
  return (
    <Box py={2} px={5}>
      <Box id="path" p={1} borderRadius={2} width="fit-content">
        <Typography variant="h4">
          {major} /{" "}
          <span style={{ color: type ? "#000" : "red" }}>{subject}</span>{" "}
          {type ? (
            <span style={{ color: type ? "red" : "#000" }}>/ {type}</span>
          ) : (
            <></>
          )}
        </Typography>
      </Box>
      <Box mt={6} id="subject-mat-types">
        {type ? <TypeShower /> : <TypeChooser />}
      </Box>
    </Box>
  );
}
