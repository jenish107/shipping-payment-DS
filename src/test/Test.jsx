import {
  Box,
  Button,
  ChoiceList,
  Divider,
  Filters,
  Icon,
  InlineStack,
  RangeSlider,
  ResourceItem,
  ResourceList,
  Select,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { Text } from "@shopify/polaris";
import { ImageIcon, PlusIcon, SearchIcon, XIcon } from "@shopify/polaris-icons";

// import "../assets/css/Test.css";

// const products = [
//   {
//     id: "1",
//     name: "Gift Card",
//     image: "https://cdn.shopify.com/s/files/1/0000/0001/files/gift-card.png",
//   },
//   {
//     id: "2",
//     name: "Selling Plans Ski Wax",
//     image: "https://cdn.shopify.com/s/files/1/0000/0001/files/ski-wax.png",
//   },
//   {
//     id: "3",
//     name: "The 3p Fulfilled Snowboard",
//     image: "https://cdn.shopify.com/s/files/1/0000/0001/files/snowboard-3p.png",
//   },
//   {
//     id: "4",
//     name: "The Collection Snowboard: Hydrogen",
//     image: "https://cdn.shopify.com/s/files/1/0000/0001/files/hydrogen.png",
//   },
// ];

const Test = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const items = [
    {
      id: 1,
      title: "Automated Collection",
      product: "8 products",
      product_number: 8765456132,
    },
    {
      id: 2,
      title: "Home page",
      product: "1 product",
      product_number: 897134654,
    },
    {
      id: 3,
      title: "Hydrogen",
      product: "3 products",
      product_number: 64212346,
    },
  ];

  // ----------resource filter
  const [accountStatus, setAccountStatus] = useState(undefined);

  const handleAccountStatusChange = useCallback(
    (value) => setAccountStatus(value),
    []
  );

  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(undefined),
    []
  );

  const filters = [
    {
      key: "accountStatus",
      label: "Account status",
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            { label: "Enabled", value: "enabled" },
            { label: "Not invited", value: "not invited" },
            { label: "Invited", value: "invited" },
            { label: "Declined", value: "declined" },
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(accountStatus)) {
    const key = "accountStatus";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }

  // end filter

  return (
    <>
      <Box
        onClick={() => console.log("hello")}
        insetBlockEnd="0"
        insetInlineStart="0"
        width="100%"
        background="bg-fill-critical"
        minHeight="100vh"
      ></Box>
      <Box
        position="absolute"
        id="padding-12rem"
        insetBlockStart="1200"
        width="100%"
      >
        <Box padding="0" background="bg-surface" borderRadius="300">
          <Box
            padding="300"
            borderStartStartRadius="300"
            borderStartEndRadius="300"
            background="bg-fill-active"
          >
            <InlineStack align="space-between">
              <Text variant="headingMd">Select collections</Text>
              <Box>
                <Icon source={XIcon} tone="base" />
              </Box>
            </InlineStack>
          </Box>

          <Box minHeight="65vh" id="resource_list">
            <ResourceList
              showHeader={false}
              items={items}
              renderItem={renderItem}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              selectable
              filterControl={
                <Box id="filter_header">
                  <InlineStack gap="200" wrap={false}>
                    <Box width="100%">
                      <TextField
                        prefix={<Icon source={SearchIcon} tone="base" />}
                        autoComplete="off"
                        placeholder="Search products"
                      />
                    </Box>

                    {/* <Box minWidth="30%">
                      <Select
                        labelHidden
                        options={[
                          {
                            label: "All",
                            value: "all",
                            prefix: <Text tone="subdued"> Search by</Text>,
                          },
                          {
                            label: "Title",
                            value: "title",
                            prefix: <Text tone="subdued"> Search by</Text>,
                          },
                          {
                            label: "Product number",
                            value: "product_number",
                            prefix: <Text tone="subdued"> Search by</Text>,
                          },
                        ]}
                        value="all"
                        onChange={() => {}}
                      />
                    </Box> */}
                  </InlineStack>

                  {/* <Filters
                    hideQueryField
                    filters={filters}
                    appliedFilters={appliedFilters}
                  /> */}
                </Box>
              }
            />
          </Box>

          <Box padding="300" borderBlockStartWidth="025" borderColor="border">
            <InlineStack align="space-between">
              <Text>{selectedItems.length} collections selected</Text>
              <InlineStack gap="200">
                <Button>Cancel</Button>
                <Button variant="primary">Select</Button>
              </InlineStack>
            </InlineStack>
          </Box>
        </Box>
      </Box>
    </>
  );

  function renderItem(item) {
    const { title, product, product_number } = item;
    const media = <Thumbnail size="small" alt="Black choker necklace" />;

    return (
      <ResourceItem
        id={product_number}
        media={media}
        accessibilityLabel={`View details for ${title}`}
      >
        <Box
          onClick={() => setSelectedItems((pre) => [...pre, product_number])}
        >
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {title}
          </Text>
          <Text>{product}</Text>
        </Box>
      </ResourceItem>
    );
  }

  function disambiguateLabel(key, value) {
    switch (key) {
      case "accountStatus":
        return value?.map((val) => `Customer ${val}`).join(", ");
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
};

export default Test;
