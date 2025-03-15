import { Divider, Input } from "@mui/joy";
import { useLocation } from "preact-iso";
import { register } from "../../handlers/auth/register";
import { Base, useMessage } from "./Base";

export const Register = () => {
  const location = useLocation();
  const [message, setMessage] = useMessage();

  return (
    <Base title="Register" message={message}>
      <form
        class="contents"
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          const confirm = formData.get("confirm") as string;

          if (password !== confirm) {
            setMessage(
              "Password and confirm password do not match.",
              "warning",
            );
            return;
          }

          const [err] = await register(email, password);

          if (err) {
            setMessage(err.description ?? null, "warning");
            return;
          }
        }}
      >
        <Input
          name="email"
          placeholder="email"
          sx={{
            fontFamily: "monospace",
          }}
        ></Input>
        <Input
          name="password"
          type="password"
          placeholder="password"
          sx={{
            fontFamily: "monospace",
          }}
        ></Input>
        <Input
          name="confirm"
          type="password"
          placeholder="confirm password"
          sx={{
            fontFamily: "monospace",
          }}
        ></Input>
        <Input size="lg" type="submit" value="Submit">
          Submit
        </Input>
      </form>
      <Divider>Already have an account?</Divider>
      <Input
        color="primary"
        type="submit"
        value="Login"
        onClick={() => location.route("/login")}
      ></Input>
    </Base>
  );
};
