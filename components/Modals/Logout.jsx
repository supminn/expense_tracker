import { useRouter } from "next/router";
import { RotatingLines } from "react-loader-spinner";
import { useAuthContext } from "../../context/authProvider";

export const LogoutModal = ({ setShowModal }) => {
  const {
    userLogout,
    authState: { isLoading, error },
  } = useAuthContext();
  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();
    const { isSuccess } = await userLogout();
    if (isSuccess) {
      setShowModal(false);
      router.push("/");
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <form
            onSubmit={submitHandler}
            className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-xl font-bold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Are you sure you want to Logout?
                </h3>
              </div>
              <div>
                {isLoading && (
                  <div className="flex justify-center">
                    <RotatingLines
                      strokeColor="#166534"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="30"
                      visible={true}
                    />
                  </div>
                )}
                {error && <p className="text-red-600 py-3">{error}</p>}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-800 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
