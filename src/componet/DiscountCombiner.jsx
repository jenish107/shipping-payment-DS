import { Card, ChoiceList } from "@shopify/polaris";
import React from "react";

const DiscountCombiner = ({ruleData,handleInputChange}) => {
  return (
    <Card>
      <ChoiceList
        allowMultiple
        title="This discount can be combined with:"
        choices={[
          {
            label: "Product discounts",
            value: "product_discount",
          },
          {
            label: "Order discounts",
            value: "order_discount",
          },
        ]}
        selected={ruleData.discount_combine || "none"}
        onChange={(val) => handleInputChange("discount_combine", val)}
      />
    </Card>
  );
};

export default DiscountCombiner;
