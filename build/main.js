var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/data.js
var monthNames, _getDate;
var init_data = __esm({
  "src/data.js"() {
    monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    _getDate = () => {
      return `${(/* @__PURE__ */ new Date()).getDate()} ${monthNames[(/* @__PURE__ */ new Date()).getMonth()]}, ${(/* @__PURE__ */ new Date()).getFullYear()}`;
    };
  }
});

// src/main.jsx
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
function main_default() {
  widget.register(DeelStamp);
}
function DeelStamp() {
  const [status, setStatus] = useSyncedState("status", "wip");
  const [name, setName] = useSyncedState("name", "");
  const [date, setDate] = useSyncedState("date", _getDate());
  const statusOptions = [
    { option: "wip", label: "WIP" },
    { option: "outdated", label: "Outdated" },
    { option: "updated", label: "Updated" }
  ];
  usePropertyMenu(
    [
      {
        itemType: "dropdown",
        propertyName: "status",
        tooltip: "Status",
        selectedOption: status,
        options: statusOptions
      },
      {
        itemType: "separator"
      },
      {
        itemType: "action",
        propertyName: "update",
        tooltip: "Sign my name"
      }
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "status") {
        if (propertyValue) {
          setStatus(propertyValue);
          handleUpdateClick();
        }
      } else if (propertyName === "update") {
        handleUpdateClick();
      }
    }
  );
  const handleUpdateClick = () => {
    if (figma.currentUser) {
      setName(figma.currentUser.name);
      setDate(_getDate());
    }
  };
  const backgroundStyles = {
    wip: "#FFB800",
    outdated: "#CB0000",
    updated: "#00A700"
  };
  const textStyles = {
    wip: "#000000",
    outdated: "#FFFFFF",
    updated: "#FFFFFF"
  };
  const containerEffect = [
    {
      blur: 20,
      color: backgroundStyles[status] + "50",
      offset: { x: 0, y: 4 },
      spread: 0,
      type: "drop-shadow"
    },
    {
      blur: 0,
      color: textStyles[status] + "90",
      offset: { x: 0, y: -2 },
      spread: 8,
      type: "inner-shadow"
    }
  ];
  return /* @__PURE__ */ figma.widget.h(
    AutoLayout,
    {
      verticalAlignItems: "center",
      spacing: 32,
      padding: 24,
      cornerRadius: 16,
      fill: backgroundStyles[status],
      name: "Container",
      strokeWidth: 8,
      stroke: textStyles[status],
      effect: containerEffect
    },
    /* @__PURE__ */ figma.widget.h(
      Text,
      {
        fontSize: 40,
        width: 280,
        fontWeight: "bold",
        horizontalAlignText: "left",
        fill: textStyles[status]
      },
      status.toUpperCase()
    ),
    /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        name: "Details",
        direction: "vertical",
        spacing: 8
      },
      /* @__PURE__ */ figma.widget.h(
        Text,
        {
          fontSize: 20,
          horizontalAlignText: "left",
          fill: textStyles[status]
        },
        name
      ),
      /* @__PURE__ */ figma.widget.h(
        Text,
        {
          fontSize: 16,
          horizontalAlignText: "left",
          fill: textStyles[status],
          opacity: 0.75
        },
        date
      )
    )
  );
}
var widget, AutoLayout, Text, useSyncedState, usePropertyMenu;
var init_main = __esm({
  "src/main.jsx"() {
    init_data();
    ({ widget } = figma);
    ({ AutoLayout, Text, useSyncedState, usePropertyMenu } = widget);
  }
});

// <stdin>
var modules = { "src/main.jsx--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.jsx--default" : figma.command;
modules[commandId]();
