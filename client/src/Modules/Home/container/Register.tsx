import { useForm, SubmitHandler } from "react-hook-form";
import { useHome } from "../hooks/useHome";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type FormValues = {
  firstName: string;
  email: string;
  password: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

export const Register = () => {
  const navigate = useNavigate();
  const { userRegister } = useHome();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const {
      email,
      password,
      firstName,
      phoneNumber,
      street,
      city,
      country,
      pincode,
      state,
    } = data;
    try {
      await userRegister.mutateAsync({
        email,
        password,
        phoneNumber,
        street,
        city,
        country,
        pincode,
        firstName,
        state: state,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex   h-screen w-full gap-7">
        <div className="w-full hidden  lg:grid  md:grid-cols-3 lg:grid-cols-4 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png')] bg-cover bg-center"></div>

        <div className="w-full flex md:grid-cols-9 lg:grid-cols-8 justify-center  items-center m-6 mr-3 lg:m-0 lg:mr-7">
          <form
            className="w-full flex flex-col items-center lg:max-w-3xl mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-4xl text-gray-900 font-medium">Register</h2>
            <p className="text-sm  sm:text-3xl text-gray-500/90 mt-3 mb-4">
              Please register in to continue
            </p>

            <div className="flex flex-col md:flex-row items-center gap-8  mb-2 w-full">
              <div className="w-full">
                <label className="text-black/70">Name</label>
                <input
                  className={`h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none ${
                    errors && errors?.firstName?.message
                      ? "border border-red-400"
                      : ""
                  }`}
                  type="text"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "UserName is required",
                    },
                    minLength: {
                      value: 3,
                      message: "Minlength should be greater than 3",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="mt-2 text-start text-red-400 pl-3">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="text-black/70">Email</label>
                <input
                  className={`h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none ${
                    errors && errors?.email?.message
                      ? "border border-red-400"
                      : ""
                  }`}
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email Id is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-2 text-start text-red-400 pl-3">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 mb-2 w-full">
              <div className="w-full">
                <label className="text-black/70">Phone</label>
                <input
                  className={`h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none`}
                  type="number"
                  {...register("phoneNumber")}
                />
              </div>
              <div className="w-full">
                <label className="text-black/70">Password</label>
                <input
                  className={`h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none ${
                    errors && errors?.email?.message
                      ? "border border-red-400"
                      : ""
                  }`}
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-2 text-start text-red-400 pl-3">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-2 w-full">
              <div className="w-full">
                <label className="text-black/70">City</label>
                <input
                  className={`h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none `}
                  type="text"
                  {...register("city")}
                />
              </div>
              <div className="w-full">
                <label className="text-black/70">State</label>
                <input
                  className={`h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none `}
                  type="text"
                  {...register("state")}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <div className="w-full">
                <label className="text-black/70">Country</label>
                <input
                  className={`h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none `}
                  type="text"
                  {...register("country", {})}
                />
              </div>
              <div className="w-full">
                <label className="text-black/70">Pincode</label>
                <input
                  className={`h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none `}
                  type="text"
                  {...register("pincode")}
                />
              </div>
            </div>

            <div className="md:flex w-full gap-8 ">
              <button
                type="submit"
                className="mt-8 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity"
              >
                Login
              </button>
              <button
                type="submit"
                className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
