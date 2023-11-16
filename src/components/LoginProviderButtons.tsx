import { Button } from "@nextui-org/react";
import React from "react";

const LoginProviderButtons = () => {
  return (
    <div className="flex flex-col p-2 gap-3">
      <Button className="capitalize">
        Sign In With Google
      </Button>
      <Button className="capitalize">
        Sign In With GitHub
      </Button>
      <Button className="capitalize">
        Sign In With FaceBook
      </Button>
    </div>
  );
};

export default LoginProviderButtons;
