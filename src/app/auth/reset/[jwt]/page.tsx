import ResetPasswordForm from "@/components/ResetPasswordForm";

interface Props {
  params: { jwt: string };
}
const ResetPasswordPage = async (props: Props) => {
  return <ResetPasswordForm jwtUserId={props.params.jwt} />;
};

export default ResetPasswordPage;
