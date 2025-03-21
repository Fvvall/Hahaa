import { Divider, Input, Link } from "@mui/joy";
import { useLocation } from "preact-iso";
import { login } from "../../handlers/auth/login";
import { Base, useMessage } from "./Base";

export const Login = () => {
  const location = useLocation();
  const [message, setMessage] = useMessage();

  return (
    <Base title="Login" message={message}>
      <form
        class="contents"
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;

          const [err] = await login(email, password);

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
        <Input size="lg" type="submit" value="Submit">
          Submit
        </Input>
      </form>
      <Divider>Doesn't have an account?</Divider>
      <Input
        color="primary"
        type="submit"
        value="Register"
        onClick={() => location.route("/register")}
      ></Input>
      <Link
        href="/login-help"
        underline="always"
        sx={{
          width: "100%",
          display: "block",
          textAlign: "right",
        }}
      >
        Need Help?
      </Link>
    </Base>
  );
};
