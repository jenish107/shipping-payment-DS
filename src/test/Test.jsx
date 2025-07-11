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
import { LegacyCard, Avatar } from "@shopify/polaris";
import { DndContext, KeyboardSensor, PointerSensor } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";
import "./Test.css";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";

// import "../assets/css/Test.css";
const getItems = (len) => {
  return Array.from({ length: len }).map((_, i) => {
    return { id: i + 1, text: i + 1 + "" };
  });
};

const SortableItem = (props) => {
  const { listeners, setNodeRef, transform, isDragging } = useSortable({
    id: props.id,
  });
  console.log("truansform===========", transform);

  const style = {
    transform: CSS.Transform.toString(transform),
    position: "absolute",
    zIndex: 212,
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    opacity: isDragging ? 0.3 : 1,
  };
  return (
    <Box position="relative" padding="200">
      <Box id="test-props" ref={setNodeRef} style={style} {...listeners}>
        {props.text}
      </Box>
      {/* <div>{props.id}</div> */}
    </Box>
  );
};

const Test = () => {
  const [items, setItems] = useState(getItems(10));

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (active.id == over.id) {
      return;
    }
    console.log("items =========", items);

    setItems((items) => {
      return arrayMove(
        items,
        items.findIndex((it) => it.id == active.id),
        items.findIndex((it) => it.id == over.id)
      );
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id} text={item.text} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default Test;
