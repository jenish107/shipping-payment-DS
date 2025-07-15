import { Box, Button, Grid, InlineStack, Page, Text } from "@shopify/polaris";
import { NoteIcon } from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";

import { dashBordData } from "../data/DashBordData.jsx";

export default function DeshBord() {
  const navigat = useNavigate();
  return (
    <Page compactTitle>
      <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
        {dashBordData.map((currData, index) => {
          return (
            <Box
              padding="300"
              background="bg-fill"
              key={index}
              borderRadius="300"
            >
              <Text variant="headingSm">{currData.title}</Text>
              <Text>{currData.paragraph}</Text>

              <Box paddingBlockStart="300">
                <InlineStack align="space-between">
                  <Button icon={NoteIcon} variant="plain" tone="critical">
                    How it's work
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => navigat(`/rules-page/${currData.title}`)}
                  >
                    Configure
                  </Button>
                </InlineStack>
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Page>
  );
}
