"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import {
  AlertType,
  showNotification,
} from "@/src/components/layout/Notification";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_USER } from "@/src/config/queries";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputFormik from "@/src/components/ui/InputFormik";
import InputButton from "@/src/components/ui/InputButton";
import { Tooltip } from "@mui/material";

export default function SignUp() {
  const [createNewUser] = useMutation(CREATE_NEW_USER);
  const router = useRouter();

  const BACKGROUND_IMAGE =
    "https://images.unsplash.com/photo-1660721858662-9ad9f37447f7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("User name is required"),
      email: Yup.string()
        .required("User email is required")
        .email("Email is not valid"),
      password: Yup.string()
        .required("Password required")
        .min(6, "6 characters minimun required"),
    }),
    onSubmit: async (values) => {
      const { name, email, password } = values;
      try {
        const { data } = await createNewUser({
          variables: {
            input: {
              name,
              email,
              password,
            },
          },
        });
        showNotification({
          message: `User ${data.createNewUser.name} created successfully!`,
          type: AlertType.success,
        });
        setTimeout(() => {
          router.push("/login");
        }, 3000);
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
          backgroundImage:`url(${BACKGROUND_IMAGE})`,
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
            <AccountCircleIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign Up Navika
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className="w-full"
          >
            <InputFormik
              id={"name"}
              type={"text"}
              placeholder={"User Name"}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.name}
              errors={formik.errors.name}
            />
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
            <InputButton value={"Create new account"} />
          </Box>

          <Grid container className="flex justify-between">
            <Grid item>
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
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
