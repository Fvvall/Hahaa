import { Button, ButtonGroup } from "@mui/joy";
import { useLocation } from "preact-iso";

export function Header({
  entries,
}: {
  entries: {
    name: string;
    path: string;
  }[];
}) {
  const location = useLocation();

  return (
    <header class="py-4 px-6 w-full h-fit flex items-center justify-between">
      <div>
        <img
          onClick={() => location.route("/")}
          src="/brand.svg"
          class="object-left-top h-full w-fit"
        ></img>
      </div>
      <div>
        <ButtonGroup variant="plain">
          {entries.map((entry) => (
            <Button
              href={entry.path}
              onClick={() => location.route(entry.path)}
            >
              {entry.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </header>
  );
}
