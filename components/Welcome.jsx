import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "./Buttons";

export const Welcome = () => {
  return (
    <div
      className="py-4 bg-cover"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(/background_img.jpg)",
      }}
    >
      <section className="text-center">
        <h1 className="text-4xl text-green-900 italic">Welcome</h1>
        <h1 className="text-4xl text-green-900 italic">to</h1>
        <div className="m-3">
          <Image priority src="/logo.png" alt="" height={300} width={550} />
          <p className="p-4 text-xl">
            One stop shop to track your income and expenses
          </p>
          <p className="p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            iure nisi minus recusandae illum iste fuga aliquid maxime voluptatum
            molestiae eos incidunt autem nesciunt nobis omnis, possimus
            voluptatem quis fugit.
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
