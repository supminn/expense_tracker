import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "./Buttons";

export const Welcome = () => {
  return (
    <div
      className="py-4 bg-cover min-h-body"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4)), url(/background_img.jpg)",
      }}
    >
      <section className="text-center">
        <h1 className="text-4xl text-green-900 italic">Welcome</h1>
        <h1 className="text-4xl text-green-900 italic">to</h1>
        <div className="m-3">
          <Image priority src="/logo.png" alt="" height={300} width={550} />
          <p className="p-4 text-xl text-green-900 font-bold">
            One stop shop to track your income and expenses
          </p>
        </div>
      </section>
      <section className="text-center text-xl">
        <PrimaryButton text="Login" href="/login" />
        <SecondaryButton text="Register" href="/register" />
      </section>
    </div>
  );
};
