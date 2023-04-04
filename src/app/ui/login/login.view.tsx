import { SignIn } from "@clerk/remix";

export const LoginView = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <SignIn routing={"path"} path={"/login"} signUpUrl="/register"  />
    </div>
  );
};