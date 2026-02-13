import React, { useState } from "react";

type AuthAction = "Sign Up" | "Sign In";

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  showToggle?: boolean;
  onToggleClick?: () => void;
  isToggled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  showToggle,
  onToggleClick,
  isToggled,
}) => (
  <div className="mb-[25px]">
    <label className="block mb-[10px] text-base font-medium text-white">
      {label}
    </label>
    <div className="relative flex items-center">
      <input
        type={showToggle && isToggled ? "text" : type}
        placeholder={placeholder}
        className="w-full px-4 py-[14px] bg-[#323232] border-[1.5px] border-[#39cdd7] rounded-[14px] text-white outline-none text-[15px] focus:border-[#00bcd4] hover:border-[#a066ff] hover:border-2 transition-all cursor-pointer box-border"
      />
      {showToggle && (
        <span
          className="absolute right-[15px] text-[12px] font-semibold text-[#00bcd4] cursor-pointer uppercase select-none hover:text-[#a066ff] transition-colors"
          onClick={onToggleClick}
        >
          {isToggled ? "Hide" : "Show"}
        </span>
      )}
    </div>
  </div>
);

const SignupSignIn: React.FC = () => {
  const [action, setAction] = useState<AuthAction>("Sign Up");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const isSignUp = action === "Sign Up";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-[#0f1115] text-white p-5 box-border m-0">
      <header className="flex items-center gap-3 mb-[30px]">
        <img
          src={""}
          alt="TechLab Logo"
          className="w-[50px] h-[50px] object-contain rounded-lg border-[3px] border-[#00bcd4]"
        />
        <div className="text-[32px] font-semibold tracking-wider">TechLab</div>
      </header>

      <div className="w-full max-w-[420px] p-10 border-2 border-white rounded-[28px] bg-[#1c1f26] box-border shadow-2xl">
        <h2 className="text-[32px] font-medium mb-2 mt-0">{action}</h2>
        <p className="text-[#a0a0a0] text-sm mb-[35px]">
          {isSignUp
            ? "Join TechLab and start your coding journey."
            : "Welcome back! Please login to your account."}
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
          {isSignUp && (
            <InputField
              label="Fullname"
              type="text"
              placeholder="Enter your full name"
            />
          )}

          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter password"
            showToggle
            isToggled={showPass}
            onToggleClick={() => setShowPass(!showPass)}
          />

          {isSignUp && (
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              showToggle
              isToggled={showConfirmPass}
              onToggleClick={() => setShowConfirmPass(!showConfirmPass)}
            />
          )}

          <button
            type="submit"
            className="w-full py-4 mt-[10px] border-none rounded-[14px] bg-gradient-to-r from-[#00bcd4] to-[#a066ff] text-white font-semibold text-base cursor-pointer transition-all duration-300 hover:opacity-90 hover:-translate-y-[2px] hover:ring-[3px] hover:ring-[#00bcd4]"
          >
            {action}
          </button>
        </form>

        <div className="text-center mt-[25px] text-sm text-[#ccc]">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-[#00bcd4] font-semibold underline ml-[5px] cursor-pointer hover:text-white transition-colors"
            onClick={() => setAction(isSignUp ? "Sign In" : "Sign Up")}
          >
            {isSignUp ? " Sign In" : " Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupSignIn;
