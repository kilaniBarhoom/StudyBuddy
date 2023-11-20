import { Typography, Box, Stack, Divider, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SIGNUP_PATH}`,
        data
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        nav("/");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <Box
        id="form-content"
        mx="auto"
        mt={2}
        height="60%"
        borderRadius={3}
        width={400}
        border="solid 2px #000"
        p={3}
      >
        <Toaster />
        <Stack id="login-container" gap={5}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#000">
              Sign up to <span style={{ color: "red" }}>S</span>tudy
              <span style={{ color: "red" }}>B</span>uddy
            </Typography>
            <Typography
              variant="span"
              fontWeight={600}
              color=" rgba(0, 0, 0, 0.5) "
            >
              Welcome to StuddyBuddy enter your email to get started
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={5}>
              <Stack gap={1}>
                <input
                  placeholder="Username"
                  {...register("username", {
                    pattern: /^[a-zA-Z0-9_]{2,}$/,
                  })}
                />
                {errors.username && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    Invalid username
                  </span>
                )}
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
                    required: "Password should be atleast 8 characters long",
                    minLength: 8,
                  })}
                />
                {errors.password && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    Password should be atleast 8 characters
                  </span>
                )}
              </Stack>
              <Stack gap={1}>
                <Button
                  fullWidth
                  type="submit"
                  sx={{ bgcolor: "#000" }}
                  variant="contained"
                >
                  Register
                </Button>
                <Typography color="rgba(0, 0, 0, 0.9) ">
                  Already have an account?{" "}
                  <Link style={{ textDecoration: "none" }} to="/login">
                    Login
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
    </div>
  );
}
