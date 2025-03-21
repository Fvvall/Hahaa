import { Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import {
  ProductClassProps,
  ProductClass,
} from "../../components/Product/Class";

export const Product = ({
  title,
  classes,
}: {
  title?: string;
  classes?: ProductClassProps[];
}) => {
  return (
    <div class="w-full h-full flex flex-col gap-2 *:shrink-0">
      <Typography level="h1" textTransform="capitalize" className="pb-4">
        {title ?? "Product"}
      </Typography>
      {classes?.length === 1 ? (
        <>{classes?.map((props) => <ProductClass {...props}></ProductClass>)}</>
      ) : (
        <Tabs
          variant="outlined"
          orientation="horizontal"
          size="md"
          className="rounded-xl overflow-clip shadow-2xl shadow-gray-200"
        >
          <TabList variant="plain" tabFlex="auto">
            {classes?.map((productClass) => (
              <Tab variant="plain" color="neutral" className="max-w-fit">
                {productClass.name}
              </Tab>
            ))}
          </TabList>
          {classes?.map((productClass, idx) => (
            <TabPanel value={idx}>
              <ProductClass {...productClass}></ProductClass>
            </TabPanel>
          ))}
        </Tabs>
      )}
    </div>
  );
};
