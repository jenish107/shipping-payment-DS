import { BlockStack, Box, Button, Card } from "@shopify/polaris";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RuleList = () => {
  const [ruleList, setRuleList] = useState(
    JSON.parse(localStorage.getItem("ruleList")) || []
  );
  const navigat = useNavigate();

  return (
    <Card>
      <BlockStack gap="300">
        {ruleList?.length > 0 &&
          ruleList.map((currItem, index) => {
            return (
              <Button
                onClick={() =>
                  navigat(`/rules-page/${currItem?.cardTitle}/${index}`)
                }
              >
                {currItem.cardTitle}
              </Button>
            );
          })}

        <Button
          onClick={() => navigat(`/deshbord/${ruleList?.length}`)}
          variant="primary"
        >
          Create new
        </Button>
      </BlockStack>
    </Card>
  );
};

export default RuleList;
