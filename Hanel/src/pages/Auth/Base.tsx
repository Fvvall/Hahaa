import { Snackbar, Typography } from "@mui/joy";
import { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { pipe } from "ramda";

export const useMessage = () => {
  type T = Parameters<typeof Snackbar>[0];

  const close = (): T => ({
    open: false,
  });

  const [message, _] = useState<T>(close());

  const closeAction = pipe(close, _);

  const open = (message: string | null, color: T["color"] = "neutral"): T => ({
    children: <>{message}</>,
    open: true,
    variant: "outlined",
    color,
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 5000,
    onClose: closeAction,
  });

  const openAction = pipe(open, _);

  return [message, openAction] as const;
};

export const Base = ({
  title,
  message,
  children,
}: {
  title: string;
  message: ReturnType<typeof useMessage>[0];
  children: ComponentChildren;
}) => {
  return (
    <div class="flex flex-col gap-4 w-full max-w-96 px-8">
      <Snackbar {...message}></Snackbar>
      <Typography level="h1">{title}</Typography>
      {children}
    </div>
  );
};
