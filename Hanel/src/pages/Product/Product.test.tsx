import { Product } from "./Product";
import { useFixtureInput } from "react-cosmos/client";

const fakeClasses = Array.from({ length: 3 }, (_, index) => ({
  id: `${index}`,
  name: `Class ${index}`,
  description: `Description for class ${index}`,
  items: Array.from({ length: 7 }, (itemIndex) => ({
    id: `${index}-${itemIndex}`,
    name: `Item ${index}`,
    description: `Description for item ${index}-${itemIndex}`,
    code: ["EUR", "USD", "GBP", "CNY"].sort(() => Math.random() - 0.5)[0]!,
    price: Math.floor(Math.random() * 100),
    quantity: Math.floor(Math.random() * 20),
    image: `https://picsum.photos/800/600?random=${index}`,
  })),
}));

export default {
  empty: () => <Product></Product>,
  "custom name": () => {
    const [name] = useFixtureInput("name", "custom name");

    return <Product title={name}></Product>;
  },
  "with single class": () => {
    return (
      <Product
        title="with single class"
        classes={[
          {
            id: "000",
            name: "Class 000",
            description: "",
            items: [
              {
                id: "000",
                name: "Item 000",
                description: "",
                code: "EUR",
                price: 100,
                quantity: 10,
                image: "/brand.svg",
              },
            ],
          },
        ]}
      ></Product>
    );
  },
  "with multiple classes": () => {
    const [classes] = useFixtureInput("classes", fakeClasses);

    return <Product title="with multiple classes" classes={classes}></Product>;
  },
};
