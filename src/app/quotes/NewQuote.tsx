import React from "react";
import { Box, CardContent, Typography, Fade } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputFormik from "@/src/components/ui/InputFormik";
import InputButton from "@/src/components/ui/InputButton";
import { CREATE_NEW_QUOTE } from "@/src/config/queries";
import { useMutation } from "@apollo/client";
import {
  AlertType,
  showNotification,
} from "@/src/components/layout/Notification";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/redux/store";
import {
  clearQuotesAndRefetch,
  closeQuoteForms,
} from "@/src/redux/features/quotes-slice";
import ClearIcon from "@mui/icons-material/Clear";

const NewQuote = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [createNewQuote] = useMutation(CREATE_NEW_QUOTE);

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
        dispatch(clearQuotesAndRefetch());
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
      <Fade in={true} timeout={500}>
        <CardContent>
          <div className="flex justify-between">
            <Typography variant="h5" component="div">
              Create new Quote
            </Typography>
            <ClearIcon onClick={() => dispatch(closeQuoteForms())} />
          </div>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className="w-full"
          >
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
      </Fade>
    </div>
  );
};

export default NewQuote;
