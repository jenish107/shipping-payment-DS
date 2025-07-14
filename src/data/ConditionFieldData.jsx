import { Link, Text } from "@shopify/polaris";
import { conuntry } from "./Country";

const cartDetailsNumberOption = [
  {
    value: "Is greater than or equal to",
    label: "Is greater than or equal to",
  },
  {
    value: "Is less than or equal to",
    label: "Is less than or equal to",
  },
  { value: "Is between", label: "Is between" },
];

const stringMatchOptions = [
  {
    value: "Contains (partial match)",
    label: "Contains (partial match)",
  },
  {
    value: "Does not contains (partial match)",
    label: "Does not contains (partial match)",
  },
  { value: "Contains (exact match)", label: "Contains (exact match)" },
  {
    value: "Does not contains (exact match)",
    label: "Does not contains (exact match)",
  },
];

const stringMatchMinOptions = [
  {
    value: "Contains (partial match)",
    label: "Contains (partial match)",
  },
  {
    value: "Does not contains (partial match)",
    label: "Does not contains (partial match)",
  },
];

export const conditionFields = [
  {
    type: "Total Amount",
    field_type: "number",
    placeholder: 0,
    options: cartDetailsNumberOption,
  },

  {
    type: "Subtotal Amount",
    field_type: "number",
    placeholder: 0,
    options: cartDetailsNumberOption,
  },

  {
    type: "Total Weight",
    field_type: "number",
    placeholder: 0,
    options: cartDetailsNumberOption,
  },

  {
    type: "Total Quantity",
    field_type: "number",
    placeholder: 0,
    options: cartDetailsNumberOption,
  },

  {
    type: "Country",
    field_type: "combo_box",
    combo_box_option: conuntry.map((currData) => {
      return { value: currData.name, label: currData.name };
    }),
    placeholder: "Select country",
    options: stringMatchOptions,
  },

  {
    type: "Province / State Code",
    placeholder: "Enter province/state code",
    field_type: "combo_box",
    helpText: (
      <Text>
        The two-letter code for the region. For example, ON. see{" "}
        <Link>ISO 3166-2</Link>
      </Text>
    ),
    options: stringMatchMinOptions,
  },
  {
    type: "Zip / Postal Code",
    field_type: "combo_box",
    placeholder: "Enter zip/postal code",
    options: [
      ...stringMatchOptions,
      { value: "Zip code match", label: "Zip code match" },
    ],
  },
  {
    type: "City / Area",
    field_type: "combo_box",
    placeholder: "Enter city or area",

    options: stringMatchOptions,
  },
  {
    type: "Address line",
    field_type: "combo_box",
    placeholder: "Enter full address",
    options: stringMatchOptions,
  },
  {
    type: "SKU",
    field_type: "combo_box",
    placeholder: "Enter SKU",
    options: stringMatchOptions,
  },
  {
    type: "Specific Collection",
    placeholder: "Select collection",
    field_type: "popover_select",
    field_item: [
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
    ],
    options: stringMatchMinOptions,
  },
  {
    type: "Specific Product",
    placeholder: "Select a product",
    field_type: "popover_select",
    field_item: [
      {
        id: 1,
        title: "Gift Card",
        img: "https://cdn.shopify.com/s/files/1/0683/5021/4300/files/gift_card_200x200.png?v=1746253056",
        product_number: 4495454435,
        type: "giftcard",
        category: "Gift Cards",
        collections: ["Home page"],
        tags: ["Premium", "Archived"],
        vendor: "Jenish Dev Store",
      },
      {
        id: 2,
        title: "Selling Plans Ski Wax",
        product_number: 432544431,
        type: "accessories",
        category: "Snowboard",
        collections: ["Home page"],
        tags: ["Accessory", "Winter"],
        vendor: "Jenish Dev Store",
      },
      {
        id: 3,
        title: "The 3p Fulfilled Snowboard",
        product_number: 4488544431,
        type: "snowboard",
        category: "Snowboard",
        collections: ["Home page"],
        tags: ["Snow", "Snowboard", "Winter"],
        vendor: "Snowboard Vendor",
      },
      {
        id: 4,
        title: "The Collection Snowboard: Hydrogen",
        product_number: 4495444987,
        type: "snowboard",
        category: "Snowboard",
        collections: ["Home page", "Hydrogen"],
        tags: ["Snow", "Snowboard", "Winter"],
        vendor: "Hydrogen Vendor",
      },
      {
        id: 5,
        title: "The Collection Snowboard: Liquid",
        product_number: 449674431,
        type: "snowboard",
        category: "Snowboard",
        collections: ["Home page"],
        tags: ["Snow", "Snowboard", "Winter"],
        vendor: "Snowboard Vendor",
      },
      {
        id: 6,
        title: "The Collection Snowboard: Oxygen",
        product_number: 4496694431,
        type: "snowboard",
        category: "Snowboard",
        collections: ["Home page"],
        tags: ["Snow", "Snowboard", "Winter"],
        vendor: "Snowboard Vendor",
      },
      {
        id: 7,
        title: "The Compare at Price Snowboard",
        product_number: 7984544431,
        type: "snowboard",
        category: "Snowboard",
        collections: ["Home page"],
        tags: ["Snow", "Snowboard", "Winter", "Premium"],
        vendor: "Multi-managed Vendor",
      },
      {
        id: 8,
        title: "The Complete Snowboard",
        product_number: 879751325,
        type: "snowboard",
        category: "Snowboard",
        collections: ["Home page", "Automated Collection"],
        tags: ["Snow", "Snowboard", "Sport", "Winter"],
        vendor: "Snowboard Vendor",
      },
    ],
    field_extra_filter: true,
    options: stringMatchMinOptions,
  },
  {
    type: "Customer Tag",
    field_type: "combo_box",
    placeholder: "Enter customer tag",
    options: stringMatchOptions,
  },
  {
    type: "Selected Shipping Rate",
    field_type: "combo_box",
    placeholder: "Enter Shipping title",
    options: stringMatchOptions,
  },
  {
    type: "Cart Attribute",
    field_type: "text",
    placeholder: "Key",
    placeholder_2: "valuel,value2",
    options: stringMatchOptions,
  },
  {
    type: "Delivery Method",
    field_type: "choice_list",
    field_option: [
      { label: "Local Delivery", value: "Local Delivery" },
      { label: "None", value: "None" },
      { label: "Shipping", value: "Shipping" },
      { label: "Local Pickup", value: "Local Pickup" },
      {
        label: "Shipping to a Pickup Point",
        value: "Shipping to a Pickup Point",
      },
      { label: "Retail", value: "Retail" },
    ],
    placeholder: "Enter delivery method",
    options: stringMatchMinOptions,
  },
];
