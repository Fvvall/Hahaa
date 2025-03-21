import { Card, Typography, Divider, Input, Link, Skeleton } from "@mui/joy";
import styles from "./Item.module.css";
import getSymbolFromCurrency from "currency-symbol-map";
import { useState } from "preact/hooks";

export type ProductItemProps = {
  id: string;
  name: string;
  description: string;
  code: string;
  price: number;
  quantity: number;
  image: string;
};

export const ProductItem = ({
  id,
  name,
  description,
  code,
  price,
  quantity,
  image,
}: ProductItemProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div
      id={`product-item-${id}`}
      class={`w-full max-w-96 h-fit transform-gpu card ${styles["card"]}`}
    >
      <Card className="w-full h-full flex flex-col gap-2!" variant="outlined">
        <Skeleton variant="rectangular" animation="wave" loading={!imageLoaded}>
          {image && (
            <img
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              src={image}
              alt={name}
              class={`w-full h-32 object-cover rounded-sm transition-all ${styles["image"]}`}
            ></img>
          )}
        </Skeleton>
        <div class="flex flex-row justify-between gap-2 w-full h-fit">
          <div class="w-0 grow">
            <Link href={`/product/${id}`}>
              <Typography level="h3">{name}</Typography>
            </Link>
            <Typography level="title-sm">
              {quantity > 0 ? `${quantity} left in stock` : "Out of stock"}
            </Typography>
          </div>
          <div class="flex items-center w-fit h-full text-4xl font-bold text-right">
            {getSymbolFromCurrency(code)}
            {price}
          </div>
        </div>
        <Typography
          level="body-xs"
          className={`h-32 w-full overflow-ellipsis transition-all ${styles["description"]}`}
        >
          {description}
        </Typography>
        <Divider></Divider>
        <div class="flex flex-row gap-2 w-full *:w-full">
          <Input
            type="button"
            variant="plain"
            disabled={quantity === 0}
            value="Add to cart"
          ></Input>
          <Input
            type="button"
            variant="outlined"
            disabled={quantity === 0}
            value="Buy now"
          ></Input>
        </div>
      </Card>
    </div>
  );
};
