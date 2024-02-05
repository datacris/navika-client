import React from "react";
import { Box, CardContent, Typography } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import InputFormik from "@/src/components/ui/InputFormik";
import InputButton from "@/src/components/ui/InputButton";
import { GET_QUOTE, UPDATE_QUOTE } from "@/src/config/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  AlertType,
  showNotification,
} from "@/src/components/layout/Notification";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { clearQuotesAndRefetch } from "@/src/redux/features/quotes-slice";

const EditQuote = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editQuoteId } = useSelector((state: RootState) => state.Quotes);

  const { data, loading, error } = useQuery(GET_QUOTE, {
    variables: {
      id: editQuoteId,
    },
  });

  const [updateQuote] = useMutation(UPDATE_QUOTE);

  if (loading) return "Cargando...";
  const { getQuote } = data;

  const validationSchema = Yup.object({
    quote: Yup.string().required("Quote cannot be empty"),
  });

  const handleUpdateQuote = async (values: any) => {
    const { id, quote, reference, author, book } = values;
    try {
      const { data } = await updateQuote({
        variables: {
          id,
          input: {
            quote,
            reference,
            author,
            book,
          },
        },
      });
      showNotification({
        message: `Quote updated successfully!`,
        type: AlertType.success,
      });
      dispatch(clearQuotesAndRefetch());
    } catch (error) {
      console.log("Error==> ", error);
    }
  };

  return (
    <div>
      <CardContent>
        <Typography variant="h5" component="div">
          Edit Quote
        </Typography>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={getQuote}
          onSubmit={(values) => {
            console.log(values);
            handleUpdateQuote(values);
          }}
        >
          {(props) => {
            return (
              <Box
                component="form"
                onSubmit={props.handleSubmit}
                className="w-full"
              >
                <InputFormik
                  id={"quote"}
                  type={"text"}
                  placeholder={"Quote"}
                  value={props.values.quote}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touched={props.touched.quote}
                  errors={props.errors.quote}
                  small={true}
                />
                <InputFormik
                  id={"reference"}
                  type={"text"}
                  placeholder={"Reference"}
                  value={props.values.reference}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  errors={props.errors.reference}
                  small={true}
                />
                <InputFormik
                  id={"author"}
                  type={"text"}
                  placeholder={"Author"}
                  value={props.values.author}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  errors={props.errors.author}
                  small={true}
                />
                <InputFormik
                  id={"book"}
                  type={"text"}
                  placeholder={"Book"}
                  value={props.values.book}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  errors={props.errors.book}
                  small={true}
                />

                <InputButton value={"Save quote"} />
              </Box>
            );
          }}
        </Formik>
      </CardContent>
    </div>
  );
};

export default EditQuote;
