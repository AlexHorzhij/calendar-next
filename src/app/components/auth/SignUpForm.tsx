"use client";

import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import Link from "next/link";

import { userValidation } from "@/app/db/schemas/users/usersValidation";
import { registerUser } from "@/app/redux/user/userOperations";
import { isLoading } from "@/app/redux/user/userSelectors";
import { Loader } from "@/app/components";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<IUser, any, any>>();
  const loading = useSelector(isLoading);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: userValidation,

    onSubmit: async (values) => {
      const { payload } = await dispatch(registerUser(values));

      if (!payload.ok) {
        return toast.error(`Registration error. ${payload.message}`);
      }

      formik.resetForm();
      toast.error("Перевірте правильнісь введення логіна та пароля");
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
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
          Sign up
        </Button>
        <Link href="/login" className="text-lg text-blue-700 hover:underline">
          Sign in
        </Link>
      </form>
    </>
  );
}
