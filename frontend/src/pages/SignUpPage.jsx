import React, { useState } from "react";
import { GpuIcon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const {
    mutate: signupMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signup,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Account created");
      navigate("/onboarding");
    },
  });
  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="luxury"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Signup form - left side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <GpuIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              LinguaLink
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-error mb-3 py-2 px-4 text-lg  rounded-lg max-w-full">
              <span className="line-clamp-2">
                {error?.response?.data?.message || "Invalid input"}
              </span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join LinguaLink and lets learn together
                  </p>
                </div>
                <div className="space-y-3">
                  {/* FULL NAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Jhon Doe"
                      className="input input-bordered w-full text-white"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="input input-bordered w-full text-white"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control w-full relative">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="*******"
                      className="input input-bordered w-full pr-10 text-white"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />

                    {/* Toggle icon */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[52px] text-gray-400 hover:text-primary"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>

                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  {/* TERMS */}
                  <div className="form-control ">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of services
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary w-full" type="submit">
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-primary/10">
          <div className="flex flex-col items-center text-center px-12">
            {/* IMAGE */}
            <img
              src="/signUp.png"
              alt="Language connection illustration"
              className="w-72 h-auto object-contain scale-110"
            />

            {/* TEXT */}
            <h2 className="text-2xl font-semibold mt-10  ">
              Language learning, made human
            </h2>

            <p className="mt-8 text-base text-white opacity-70 max-w-sm leading-relaxed">
              Connect with learners worldwide and grow your language skills
              through real conversations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
