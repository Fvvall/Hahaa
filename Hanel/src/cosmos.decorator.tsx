import { ComponentChildren } from "preact";

export default [
  ({ children }: { children: ComponentChildren }) => {
    return (
      <div class="w-dvw h-dvh p-8 flex justify-center items-center">
        {children}
      </div>
    );
  },
];
