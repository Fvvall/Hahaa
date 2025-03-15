import { Typography } from "@mui/joy";
import { ProductItem, ProductItemProps } from "./Item";
import { Component } from "preact";

export type ProductClassProps = {
  id: string;
  name: string;
  description: string | Component;
  items: ProductItemProps[];
};

export const ProductClass = ({
  id,
  name,
  description,
  items,
}: ProductClassProps) => {
  return (
    <section
      id={`product-class-${id}`}
      class="w-full h-auto px-4 py-2 flex flex-col gap-2"
    >
      <div class=" flex flex-col justify-center items-center w-64 h-fit py-8">
        <p>
          <Typography level="h2">
            {name}
            <span class="opacity-5"> {id}</span>
          </Typography>
          <Typography level="body-md">{description}</Typography>
        </p>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))] justify-evenly w-full gap-4 *:justify-self-center">
        {items.map((item) => {
          return <ProductItem {...item}></ProductItem>;
        })}
      </div>
    </section>
  );
};
