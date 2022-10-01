import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "./Buttons";

export const Welcome = () => {
  return (
    <div>
      <section className="text-center">
        <h1 className="text-4xl text-green-800 italic">Welcome</h1>
        <h1 className="text-4xl text-green-800 italic">to</h1>
        <div className="m-3">
          <Image priority src="/logo.png" alt="" height={300} width={550} />
          <p>Intro with some image and text details</p>
        </div>
      </section>
      <section className="text-center text-xl">
        <PrimaryButton text="Login" href="/login" />
        <SecondaryButton text="Register" href="/register" />
      </section>
    </div>
  );
};
