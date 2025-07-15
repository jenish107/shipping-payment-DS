import React, { useCallback, useEffect } from "react";

import { ChoiceList, Filters, TextField } from "@shopify/polaris";

const PopoverSelectFilter = ({
  popoverSelectData,
  handlePopoverInputChange,
  tags,
  collection,
  escapeSpecialRegExCharacters,
  currConditionData,
}) => {
  const handleCollectionSearch = (name, value, option, option_name) => {
    handlePopoverInputChange(name, value);

    if (value === "") {
      handlePopoverInputChange(option_name, option);
      return;
    }

    const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
    const resultOptions = option?.filter((currData) => {
      return currData.value.match(filterRegex);
    });
    handlePopoverInputChange(option_name, resultOptions);
  };

  const filters = [
    {
      key: "categories",
      label: "Categories",
      filter: (
        <ChoiceList
          title="gift Card title"
          titleHidden
          choices={[{ label: "Gift Card", value: "Gift Card" }]}
          selected={popoverSelectData.categories || []}
          onChange={(val) => handlePopoverInputChange("categories", val)}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "collection",
      label: "Collection",
      filter: (
        <>
          <TextField
            placeholder="Search for collections"
            value={popoverSelectData.collection_search}
            onChange={(val) =>
              handleCollectionSearch(
                "collection_search",
                val,
                collection,
                "collection_option"
              )
            }
            autoComplete="off"
          />
          <ChoiceList
            choices={popoverSelectData.collection_option}
            selected={popoverSelectData.collection || []}
            onChange={(val) => handlePopoverInputChange("collection", val)}
          />
        </>
      ),
      shortcut: true,
    },
    {
      key: "types",
      label: "Types",
      filter: (
        <ChoiceList
          title="types title"
          titleHidden
          choices={[
            { label: "Gift Card", value: "giftcard" },
            { label: "accessories", value: "accessories" },
            { label: "snowboard", value: "snowboard" },
          ]}
          selected={popoverSelectData.types || []}
          onChange={(val) => handlePopoverInputChange("types", val)}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "tag",
      label: "Tags",
      filter: (
        <>
          <TextField
            label="Store name"
            value={popoverSelectData.tags_search}
            onChange={(val) =>
              handleCollectionSearch("tags_search", val, tags, "tags_option")
            }
            autoComplete="off"
          />
          <ChoiceList
            allowMultiple
            choices={popoverSelectData.tags_option}
            selected={popoverSelectData.tags || []}
            onChange={(val) => handlePopoverInputChange("tags", val)}
          />
        </>
      ),
      shortcut: true,
    },
    {
      key: "vendors",
      label: "Vendors",
      filter: (
        <ChoiceList
          title="vendors title"
          titleHidden
          choices={[
            { value: "Hydrogen Vendor", label: "Hydrogen Vendor" },
            { value: "Jenish Dev Store", label: "Jenish Dev Store" },
            { value: "Multi-managed Vendor", label: "Multi-managed Vendor" },
            { value: "Snowboard Vendor", label: "Snowboard Vendor" },
          ]}
          selected={popoverSelectData.vendors || []}
          onChange={(val) => handlePopoverInputChange("vendors", val)}
          allowMultiple
        />
      ),
    },
  ];

  const handleFiltersClearAll = useCallback(() => {
    handlePopoverInputChange("categories", "");
    handlePopoverInputChange("collection", "");
    handlePopoverInputChange("types", "");
    handlePopoverInputChange("tags", "");
    handlePopoverInputChange("vendors", "");
  }, [handlePopoverInputChange]);

 

  const appliedFilters = [];
  if (!isEmpty(popoverSelectData.categories)) {
    const key = "categories";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, popoverSelectData.categories),
      onRemove: () => handlePopoverInputChange("categories", ""),
    });
  }

  if (!isEmpty(popoverSelectData.collection)) {
    const key = "collection";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, popoverSelectData.collection),
      onRemove: () => handlePopoverInputChange("collection", ""),
    });
  }

  if (!isEmpty(popoverSelectData.types)) {
    const key = "types";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, popoverSelectData.types),
      onRemove: () => handlePopoverInputChange("types", ""),
    });
  }

  if (!isEmpty(popoverSelectData.tags)) {
    const key = "tag";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, popoverSelectData.tags),
      onRemove: () => handlePopoverInputChange("tags", ""),
    });
  }

  if (!isEmpty(popoverSelectData.vendors)) {
    const key = "vendors";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, popoverSelectData.vendors),
      onRemove: () => handlePopoverInputChange("vendors", ""),
    });
  }

  return (
    <Filters
      hideQueryField
      filters={filters}
      appliedFilters={appliedFilters}
      onClearAll={handleFiltersClearAll}
    />
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "categories":
      case "vendors":
      case "tag":
      case "types":
      case "collection":
        return value?.map((val) => `${key}: ${val}`).join(", ");
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

export default PopoverSelectFilter;
