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
        <h1 className="text-4xl text-green-900 italic font-bold">Welcome</h1>
        <h1 className="text-4xl text-green-900 italic font-bold">to</h1>
        <div className="m-3">
          <Image priority src="/logo.png" alt="" height={300} width={550} />
          <p className="p-4 text-xl text-green-900 font-bold">
            One stop shop to track your income and expenses!
          </p>
        </div>
      </section>
      <section className="text-center text-2xl p-2">
        <PrimaryButton text="Login" href="/login" />{" "}
        <span className="px-2 pr-3 fas text-amber-800">OR</span>
        <SecondaryButton text="Register" href="/register" />
      </section>
      <h2 className="text-3xl text-green-900 font-bold text-center mt-14 mb-2">
        🌟 Features of FinSaver 🌟
      </h2>
      <section className="md:grid md:grid-cols-3">
        <div className="bg-gradient-to-tl from-green-100 to-amber-200 hover:from-green-200 hover:to-amber-200 m-4 rounded-md hover:shadow-lg text-center text-xl p-2">
          <Image
            src="/add_task.svg"
            alt="adding task"
            height={250}
            width={300}
          />
          <p className="italic text-green-900 font-bold p-1 leading-8">
            Add items into income or expenses
          </p>
        </div>
        <div className="bg-gradient-to-tl from-green-100 to-amber-200 hover:from-green-200 hover:to-amber-200 m-4 rounded-md hover:shadow-lg text-center text-xl p-2">
          <Image
            src="/personal_notebook.svg"
            alt="notebook"
            height={250}
            width={300}
          />
          <p className="italic text-green-900 font-bold p-1 leading-8">
            Capability to include details of your income or expenses
          </p>
        </div>
        <div className="bg-gradient-to-tl from-green-100 to-amber-200 hover:from-green-200 hover:to-amber-200 m-4 rounded-md hover:shadow-lg text-center text-xl p-2">
          <Image src="/savings.svg" alt="piggy bank" height={250} width={300} />
          <p className="italic text-green-900 font-bold p-1 leading-8">
            Track your expenses and optimize on your spends and save more!
          </p>
        </div>
      </section>
    </div>
  );
};
