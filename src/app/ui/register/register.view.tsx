import { SignUp } from "@clerk/remix";

export const RegisterView = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <SignUp
        routing={"path"}
        path={"/register"}
        signInUrl="/login"
        redirectUrl={"/login"}
      />
    </div>
  );
};
