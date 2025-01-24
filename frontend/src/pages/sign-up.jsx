import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import api from "../libs/apiCall";
import { Button, InputField } from "../componenets";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const { data: res } = await api.post("/auth/sign-up", data);

      if (res?.user) {
        toast.success(res?.message);

        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='max-w-md w-full bg-white dark:bg-black/30 shadow-md rounded px-8 pt-6 pb-8'>
        <h2 className='text-2xl mb-6 dark:text-white font-semibold'>Sign Up</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            type='email'
            name='email'
            label='Email Address'
            placeholder='example@codewave.com'
            register={register("email", {
              required: "Email Address is required!",
            })}
            error={errors.email ? errors.email.message : ""}
          />
          <InputField
            name='firstName'
            label='Name'
            placeholder='John Doe'
            register={register("firstName", {
              required: "Name is required!",
            })}
            error={errors.firstName ? errors.firstName.message : ""}
          />
          <InputField
            type='password'
            name='password'
            label='Password'
            placeholder='Password'
            register={register("password", {
              required: "Password is required!",
            })}
            error={errors.password ? errors.password.message : ""}
          />

          <div className='w-full mt-8'>
            <Button
              loading={loading}
              type='submit'
              label='Create Account'
              className='bg-violet-800 w-full text-white'
            />

            <p className='mt-4 text-gray-600 dark:gray-500 text-sm text-center'>
              Already has an account ?{" "}
              <Link to='/sign-in' className='text-violet-600 hover:underline'>
                Sing In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
