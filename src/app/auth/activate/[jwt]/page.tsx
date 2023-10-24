import { Button } from "@/components/ui/button";
import { activateUser } from "@/lib/actions/auth";

interface Props {
  params: {
    jwt: string;
  };
}
const ActivateUserPage = async ({ params }: Props) => {
  const result = await activateUser(params.jwt);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {result === "userNotExist" && (
        <p className="text-red-500">
          The User Does Not Exist!
        </p>
      )}
      {result === "AlreadyActivated" && (
        <p className="text-red-500">
          The User Is Already Activated!
        </p>
      )}
      {result === "Success" && (
        <>
          <p className="text-green-500">
            Success! The User Is Now Activated.
          </p>
        </>
      )}
    </div>
  );
};

export default ActivateUserPage;
