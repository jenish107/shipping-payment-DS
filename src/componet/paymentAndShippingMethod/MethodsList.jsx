import React from "react";

import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { Box, Button, Icon, InlineStack, Text } from "@shopify/polaris";
import { ArrowDownIcon, ArrowUpIcon } from "@shopify/polaris-icons";
import { PiDotsSixVerticalLight } from "react-icons/pi";

const MethodsList = ({
  currDisplayData,
  ruleData,
  ruleIndex,
  list_name,
  removeTag,
  handleInputChange,
}) => {
  const ListItem = ({ currItem, index }) => {
    return (
      <InlineStack
        blockAlign={
          currDisplayData.display?.includes("payment-method-rename") ||
          currDisplayData.display?.includes("shipping-method-rename")
            ? "end"
            : "center"
        }
        wrap={false}
        gap="300"
        align="space-between"
      >
        <InlineStack gap="300">
          <PiDotsSixVerticalLight />

          <Text>{currItem.key}</Text>
        </InlineStack>

        <InlineStack gap="300">
          <Button
            size="micro"
            onClick={() => handleMoveBottonClick(index, index - 1)}
          >
            <Icon source={ArrowDownIcon} tone="base" />
          </Button>
          <Button
            size="micro"
            onClick={() => handleMoveBottonClick(index, index + 1)}
          >
            <Icon source={ArrowUpIcon} tone="base" />
          </Button>

          <Button onClick={removeTag(index)} variant="primary" tone="critical">
            Delete
          </Button>
        </InlineStack>
      </InlineStack>
    );
  };

  const SortableItem = (props) => {
    const { index, currItem } = props;
    const { listeners, setNodeRef, transform, isDragging } = useSortable({
      id: currItem.key,
    });

    const style = {
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      opacity: isDragging ? 0.3 : 0,
    };

    return (
      <Box key={index} position="relative" padding="300">
        <Box padding="300" ref={setNodeRef} style={style} {...listeners}>
          <ListItem currItem={currItem} index={index} />
        </Box>

        <Box>
          <ListItem currItem={currItem} index={index} />
        </Box>
      </Box>
    );
  };

  const handleMoveBottonClick = (newIndex, oldIndex) => {
    let tempArray = arrayMove(
      ruleData.tiers[ruleIndex][list_name],
      oldIndex,
      newIndex
    );
    handleInputChange(list_name, tempArray, ruleIndex, "tiers");
  };
  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id == over.id) {
      return;
    }
    const items = ruleData.tiers[ruleIndex][list_name] || [];
    const oldIndex = items.findIndex((item) => item.key === active.id);
    const newIndex = items.findIndex((item) => item.key === over.id);
    const newList = arrayMove(items, oldIndex, newIndex);

    handleInputChange(list_name, newList, ruleIndex, "tiers");
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={ruleData.tiers[ruleIndex][list_name]?.map((i) => i.key) || []}
        >
          {ruleData.tiers[ruleIndex][list_name]?.map((currItem, index) => {
            return (
              <SortableItem key={index} index={index} currItem={currItem} />
            );
          })}
        </SortableContext>
      </DndContext>
    </>
  );
};

export default MethodsList;
