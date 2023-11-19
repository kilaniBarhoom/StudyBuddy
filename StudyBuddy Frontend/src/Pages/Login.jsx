import { Typography, Box, Stack, Divider, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Login() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_LOGIN_PATH}`,
        data
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        nav(-1);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      exit={{ opacity: "100%", transition: { duration: 0.5 } }}
    >
      <Box
        mx="auto"
        mt={5}
        height="60%"
        borderRadius={3}
        width={400}
        border="solid 2px #000"
        p={3}
        id=""
      >
        <Stack id="login-container" gap={5}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#000">
              Log In to <span style={{ color: "red" }}>S</span>tudy
              <span style={{ color: "red" }}>B</span>uddy
            </Typography>
            <Typography
              variant="span"
              fontWeight={600}
              color=" rgba(0, 0, 0, 0.5) "
            >
              Welcome back to StuddyBuddy enter your email to get started
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={5}>
              <Stack gap={1}>
                <input
                  placeholder="Email"
                  {...register("email", {
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    Invalid Email
                  </span>
                )}

                <input
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && !errors.email && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.password.message}
                  </span>
                )}
              </Stack>
              <Stack gap={1}>
                <Button
                  sx={{ bgcolor: "#000" }}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
                <Typography color="rgba(0, 0, 0, 0.9) ">
                  Don't have an account?{" "}
                  <Link style={{ textDecoration: "none" }} to="/signup">
                    Sign up
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
      {/* </FadeIn> */}
    </motion.div>
  );
}
