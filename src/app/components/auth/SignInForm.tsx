"use client";

import { Button, TextField } from "@mui/material";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { loginUserValidation } from "@/app/db/schemas/users/usersValidation";
import { loginUser } from "@/app/redux/user/userOperations";
import { Loader } from "../Loader";
import { isLoading } from "@/app/redux/user/userSelectors";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<IUser, any, any>>();
  const loading = useSelector(isLoading);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginUserValidation,

    onSubmit: async (values) => {
      const credentials = {
        email: values.email.trim(),
        password: values.password.trim(),
      };

      const { payload } = await dispatch(loginUser(credentials));
      console.log("payload: ", payload);

      if (!payload.ok) {
        return toast.error(`Uncorrected login or password.`);
      }

      formik.resetForm();
      toast.success(`Welcome ${payload.body.name}`);
      router.push("/");
    },
  });

  return (
    <>
      {loading && <Loader />}
      <form
        className="flex flex-col gap-[20px] w-[350px]"
        onSubmit={formik.handleSubmit}
      >
        <Toaster />

        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          type="submit"
          variant="contained"
          className="bg-blue-500 hover:bg-blue-400 h-[50px]"
        >
          Sign in
        </Button>
        <Link
          href="/register"
          className="text-lg text-blue-700 hover:underline"
        >
          Sign up
        </Link>
      </form>
    </>
  );
}
