import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { completeOnBoarding } from "../lib/api";
import {
  GpuIcon,
  LoaderIcon,
  MapPinIcon,
  ShuffleIcon,
  CameraIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isLoading } = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess: () => {
      toast.success("Profile completed", {
      style: {
        fontSize: "14px",
        padding: "8px 12px",
        minWidth: "unset",
        maxWidth: "260px",
      },
    });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong", {
      style: {
        fontSize: "14px",
        padding: "8px 12px",
        minWidth: "unset",
        maxWidth: "260px",
      },
    });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Avatar updated", {
      style: {
        fontSize: "14px",
        padding: "8px 12px",
        minWidth: "unset",
        maxWidth: "260px",
      },
    });
  };

  return (
    <div
      className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-4"
      data-theme="luxury"
    >
      <div className="w-full max-w-lg">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body px-6 py-3 space-y-1">
            {/* TITLE */}
            <h1 className="text-xl font-bold text-center mb-1">
              Complete Your Profile
            </h1>

            {/* AVATAR */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="size-24 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-6 opacity-40" />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn btn-accent btn-xs"
              >
                <ShuffleIcon className="size-3 mr-1" />
                Generate Random Avatar
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {/* FULL NAME */}
              <div className="form-control">
                <label className="label py-5 pb-0.5">
                  <span className="label-text text-sm opacity-70">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full input-sm"
                  placeholder="Your full name"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState({ ...formState, fullName: e.target.value })
                  }
                />
              </div>

              {/* BIO */}
              <div className="form-control">
                <label className="label py-1 pb-0.5">
                  <span className="label-text text-sm opacity-70">Bio</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-19 text-sm"
                  placeholder="Tell others about yourself and your language learning goals"
                  value={formState.bio}
                  onChange={(e) =>
                    setFormState({ ...formState, bio: e.target.value })
                  }
                />
              </div>

              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label py-1 pb-0.5">
                  <span className="label-text text-sm opacity-70">
                    Native Language
                  </span>
                </label>
                <select
                  className="select select-bordered w-full select-sm"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label py-1 pb-0.5">
                  <span className="label-text text-sm opacity-70">
                    Learning Language
                  </span>
                </label>
                <select
                  className="select select-bordered w-full select-sm"
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LOCATION */}
              <div className="form-control ">
                <span className="text-sm opacity-70 mb-0.5">Location</span>

                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                  <input
                    type="text"
                    className="input input-bordered input-m w-full pl-10"
                    placeholder="City, Country"
                    value={formState.location}
                    onChange={(e) =>
                      setFormState({ ...formState, location: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="btn btn-primary w-full btn-sm mt-2"
              >
                {!isLoading ? (
                  <>
                    <GpuIcon className="size-4 mr-2" />
                    Complete Onboarding
                  </>
                ) : (
                  <>
                    <LoaderIcon className="size-4 mr-2 animate-spin" />
                    Onboarding...
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
