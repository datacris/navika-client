import React from "react";
import { Box, CardContent, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputFormik from "@/src/components/ui/InputFormik";
import InputButton from "@/src/components/ui/InputButton";
import { CREATE_NEW_QUOTE } from "@/src/config/queries";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import {
  AlertType,
  showNotification,
} from "@/src/components/layout/Notification";

const NewQuote = ({ toogleShowCreateNewQuote }: any) => {
  const [createNewQuote] = useMutation(CREATE_NEW_QUOTE);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      quote: "",
      reference: "",
      author: "",
      book: "",
    },
    validationSchema: Yup.object({
      quote: Yup.string().required("Quote required"),
    }),
    onSubmit: async (values) => {
      const { quote, reference, author, book } = values;
      try {
        const { data } = await createNewQuote({
          variables: {
            input: {
              quote,
              reference,
              author,
              book,
            },
          },
        });
        showNotification({
          message: `Quote created successfully!`,
          type: AlertType.success,
        });
        toogleShowCreateNewQuote();
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
    <div>
      <CardContent>
        <Typography variant="h5" component="div">
          Create new Quote
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} className="w-full">
          <InputFormik
            id={"quote"}
            type={"text"}
            placeholder={"Quote"}
            value={formik.values.quote}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.quote}
            errors={formik.errors.quote}
            small={true}
          />
          <InputFormik
            id={"reference"}
            type={"text"}
            placeholder={"Reference"}
            value={formik.values.reference}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.reference}
            small={true}
          />
          <InputFormik
            id={"author"}
            type={"text"}
            placeholder={"Author"}
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.author}
            small={true}
          />
          <InputFormik
            id={"book"}
            type={"text"}
            placeholder={"Book"}
            value={formik.values.book}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.book}
            small={true}
          />

          <InputButton value={"Create Quote"} />
        </Box>
      </CardContent>
    </div>
  );
};

export default NewQuote;
