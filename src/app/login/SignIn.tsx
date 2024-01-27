import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {
  AlertType,
  showNotification,
} from "@/src/components/layout/Notification";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { USER_SIGN_IN } from "@/src/config/queries";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputFormik from "@/src/components/ui/InputFormik";
import { Tooltip } from "@mui/material";

export default function SignIn() {
  const router = useRouter();
  const [userSignIn] = useMutation(USER_SIGN_IN);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not a valid email")
        .required("Email cannot be empty"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const { data } = await userSignIn({
          variables: {
            input: { email, password },
          },
        });
        showNotification({ message: "...Loging", isLoading: true });

        const { token } = data.userSignIn;
        localStorage.setItem("token", token);

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (error: any) {
        const message = error.message.replace("GraphQL error: ", "");
        showNotification({
          message,
          type: AlertType.error,
        });
      }
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 12,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className="w-full"
          >
            <InputFormik
              id={"email"}
              type={"text"}
              placeholder={"User email"}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.email}
              errors={formik.errors.email}
            />

            <InputFormik
              id={"password"}
              placeholder={"Password"}
              type={"password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.password}
              errors={formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              className="bg-blue-700"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>

          <Grid container className="flex justify-between" >
            <Grid item >
              <Link href="/home" variant="body2">
                <Tooltip
                  arrow
                  title="Access Navika featurres without an account"
                  placement="bottom"
                >
                  <div>Try Navika as a guest here</div>
                </Tooltip>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
