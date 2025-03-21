import { useFixtureInput } from "react-cosmos/client";
import { Header } from "./Header";

export default () => {
  const [params] = useFixtureInput<Parameters<typeof Header>[0]>("params", {
    entries: [
      {
        name: "Home",
        path: "/",
      },
    ],
  });

  return <Header {...params}></Header>;
};
