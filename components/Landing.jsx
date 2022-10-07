import { useDataContext } from "../context/dataContext";
import { Header } from "./Header";
export const Landing = () => {
  const {
    dataState: { selectedDate },
  } = useDataContext();

  return (
    <>
      <Header />
      <div>
        <nav className="p-4 flex justify-between">
          <button>Daily</button>
          <button>Monthly</button>
          <button>Yearly</button>
        </nav>
        <main>
          <section>{selectedDate}</section>
        </main>
      </div>
    </>
  );
};
