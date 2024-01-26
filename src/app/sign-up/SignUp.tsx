"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_USER } from "@/src/config/queries";
import InputFormik from "@/src/components/ui/InputFormik";
import InputErrorFormik from "@/src/components/ui/InputErrorFormik";
import InputButton from "@/src/components/ui/InputButton";
import Link from "next/link";
import { AlertType, showNotification } from "@/src/components/layout/Notification";
import Tooltip from "@mui/material/Tooltip";

const SignUp = () => {
  const [createNewUser] = useMutation(CREATE_NEW_USER);
  const router = useRouter();

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
          type: AlertType.warn,
        });
      }
    },
  });

  return (
    <div className="bg-gray-600 min-h-screen flex flex-col justify-center">
      <h1 className="text-center text-2xl text-white font-light">
        Navika - Sign Up
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <InputFormik
              id={"name"}
              title={"User Name"}
              type={"text"}
              placeholder="Username"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.name && formik.errors.name && (
              <InputErrorFormik error={formik.errors.name} />
            )}

            <InputFormik
              id={"email"}
              title={"Email"}
              type={"email"}
              placeholder={"User email"}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <InputErrorFormik error={formik.errors.email} />
            )}

            <InputFormik
              id={"password"}
              title={"Password"}
              type={"password"}
              placeholder={"User password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <InputErrorFormik error={formik.errors.password} />
            )}

            <InputButton value={"Create Account"} />

            <Link href="/login">
              <h2 className="flex text-gray-500 hover:text-gray-900 p-4 text-sm  justify-center">
                Already have an account? Sing in here
              </h2>
            </Link>
            <Link href="/home">
              <Tooltip
                arrow
                title="Access Navika featurres without an account"
                placement="top"
              >
                <h2 className="flex text-gray-500 hover:text-gray-900 text-sm  justify-center">
                  Going home as a guest here
                </h2>
              </Tooltip>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
