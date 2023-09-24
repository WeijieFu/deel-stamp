/** @jsx figma.widget.h */

import { once, showUI } from "@create-figma-plugin/utilities"

const { widget } = figma
const { AutoLayout, Text, useSyncedState, usePropertyMenu } = widget

export default function () {
  widget.register(DeelStamp)
}

import { monthNames, _getDate } from "./data"

function DeelStamp() {
  const [status, setStatus] = useSyncedState("status", "wip")
  const [name, setName] = useSyncedState("name", "")
  const [date, setDate] = useSyncedState("date", _getDate())

  const statusOptions = [
    { option: "wip", label: "WIP" },
    { option: "outdated", label: "Outdated" },
    { option: "updated", label: "Updated" },
  ]

  usePropertyMenu(
    [
      {
        itemType: "dropdown",
        propertyName: "status",
        tooltip: "Status",
        selectedOption: status,
        options: statusOptions,
      },
      {
        itemType: "separator",
      },

      {
        itemType: "action",
        propertyName: "update",
        tooltip: "Sign my name",
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "status") {
        if (propertyValue) {
          setStatus(propertyValue)
          handleUpdateClick()
        }
      } else if (propertyName === "update") {
        handleUpdateClick()
      }
    }
  )

  const handleUpdateClick = () => {
    if (figma.currentUser) {
      setName(figma.currentUser.name)
      setDate(_getDate())
    }
  }

  const backgroundStyles = {
    wip: "#FFB800",
    outdated: "#CB0000",
    updated: "#00A700",
  }
  const textStyles = {
    wip: "#000000",
    outdated: "#FFFFFF",
    updated: "#FFFFFF",
  }
  const containerEffect = [
    {
      blur: 20,
      color: backgroundStyles[status] + "50",
      offset: { x: 0, y: 4 },
      spread: 0,
      type: "drop-shadow",
    },
    {
      blur: 0,
      color: textStyles[status] + "90",
      offset: { x: 0, y: -2 },
      spread: 8,
      type: "inner-shadow",
    },
  ]

  return (
    <AutoLayout
      verticalAlignItems={"center"}
      spacing={32}
      padding={24}
      cornerRadius={16}
      fill={backgroundStyles[status]}
      name='Container'
      strokeWidth={8}
      stroke={textStyles[status]}
      effect={containerEffect}
    >
      <Text
        fontSize={40}
        width={280}
        fontWeight={"bold"}
        horizontalAlignText={"left"}
        fill={textStyles[status]}
      >
        {status.toUpperCase()}
      </Text>
      <AutoLayout
        name='Details'
        direction='vertical'
        spacing={8}
      >
        <Text
          fontSize={20}
          horizontalAlignText={"left"}
          fill={textStyles[status]}
        >
          {name}
        </Text>
        <Text
          fontSize={16}
          horizontalAlignText={"left"}
          fill={textStyles[status]}
          opacity={0.75}
        >
          {date}
        </Text>
      </AutoLayout>
    </AutoLayout>
  )
}
