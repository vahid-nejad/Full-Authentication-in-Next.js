import clsx from "clsx";

interface Props {
  passStrength: number;
}
const PasswordStrength = ({ passStrength }: Props) => {
  return (
    <div
      className={clsx(
        {
          "justify-start": passStrength < 3,
          "justify-around": passStrength === 3,
        },
        "col-span-2 flex gap-2"
      )}
    >
      {Array.from({ length: passStrength + 1 }).map(
        (i, index) => (
          <div
            key={index}
            className={clsx(
              {
                "bg-red-500": passStrength === 0,
                "bg-orange-500": passStrength === 1,
                "bg-yellow-500": passStrength === 2,
                "bg-green-500": passStrength === 3,
              },
              " h-2 w-32 rounded-md"
            )}
          ></div>
        )
      )}
    </div>
  );
};

export default PasswordStrength;
