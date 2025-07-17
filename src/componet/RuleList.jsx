import { BlockStack, Box, Button, Card, Page } from "@shopify/polaris";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RuleList = () => {
  const [ruleList, setRuleList] = useState(
    JSON.parse(localStorage.getItem("ruleList")) || []
  );
  const navigat = useNavigate();

  return (
    <Page>
      <Card>
        <BlockStack gap="300">
          {ruleList?.length > 0 &&
            ruleList.map((currItem, index) => {
              return (
                <Button
                  variant="plain"
                  onClick={() =>
                    navigat(`/rules-page/${currItem?.cardTitle}/${index}`)
                  }
                >
                  {currItem.cardTitle}
                </Button>
              );
            })}

          <Box>
            <Button
              onClick={() => navigat(`/deshbord/${ruleList?.length}`)}
              variant="primary"
            >
              Create new rule
            </Button>
          </Box>
        </BlockStack>
      </Card>
    </Page>
  );
};

export default RuleList;
