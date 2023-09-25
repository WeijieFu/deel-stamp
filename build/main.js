var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// node_modules/@create-figma-plugin/utilities/lib/ui.js
function showUI(options, data) {
  if (typeof __html__ === "undefined") {
    throw new Error("No UI defined");
  }
  const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}</script>`;
  figma.showUI(html, __spreadProps(__spreadValues({}, options), {
    themeColors: typeof options.themeColors === "undefined" ? true : options.themeColors
  }));
}
var init_ui = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/index.js
var init_lib = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
    init_ui();
  }
});

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
  const [status, setStatus] = useSyncedState("status", "In progress");
  const [name, setName] = useSyncedState("name", "");
  const [date, setDate] = useSyncedState("date", _getDate());
  const [log, setLog] = useSyncedState("log", []);
  const widget2 = useWidgetId();
  const [id, setId] = useSyncedState("id", widget2);
  const statusOptions = [
    { option: "In progress", label: "In progress" },
    { option: "Outdated", label: "Outdated" },
    { option: "Updated", label: "Updated" }
  ];
  const onChange = async ({ propertyName, propertyValue }) => {
    await new Promise(function(resolve) {
      if (propertyName === "status") {
        if (propertyValue) {
          setStatus(propertyValue);
          handleUpdateClick(propertyValue, date);
          resolve();
        }
      } else if (propertyName === "update") {
        handleUpdateClick("Updated", date);
        resolve();
      } else if (propertyName === "changelog") {
        if (widget2 !== id) {
          setLog([]);
          setId(widget2);
          showUI({ height: 400, width: 320 }, { log: [] });
        } else {
          showUI({ height: 400, width: 320 }, { log });
        }
      }
    });
  };
  usePropertyMenu(
    [
      {
        itemType: "action",
        propertyName: "changelog",
        tooltip: "Change Log",
        icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 13.7667L13.8 13.3L12.55 12.05V10.1833H11.8833V12.3167L13.3333 13.7667ZM3 14C2.725 14 2.48958 13.9021 2.29375 13.7062C2.09792 13.5104 2 13.275 2 13V3C2 2.725 2.09792 2.48958 2.29375 2.29375C2.48958 2.09792 2.725 2 3 2H13C13.275 2 13.5104 2.09792 13.7062 2.29375C13.9021 2.48958 14 2.725 14 3V8.48333C13.8444 8.39444 13.6806 8.32222 13.5083 8.26667C13.3361 8.21111 13.1667 8.16667 13 8.13333V3H3V13H8.15C8.19444 13.1778 8.24457 13.351 8.30038 13.5195C8.35618 13.6881 8.42272 13.8483 8.5 14H3ZM3 13V3V8.13333V8.06667V13ZM4.66667 11.3333H8.18333C8.22778 11.1556 8.27778 10.9833 8.33333 10.8167C8.38889 10.65 8.46111 10.4889 8.55 10.3333H4.66667V11.3333ZM4.66667 8.5H10.4C10.5556 8.42222 10.7056 8.35833 10.85 8.30833C10.9944 8.25833 11.1556 8.21111 11.3333 8.16667V7.5H4.66667V8.5ZM4.66667 5.66667H11.3333V4.66667H4.66667V5.66667ZM12.2083 15.3167C11.3472 15.3167 10.6111 15.0083 10 14.3917C9.38889 13.775 9.08333 13.0444 9.08333 12.2C9.08333 11.3285 9.38883 10.5856 9.99983 9.97138C10.6108 9.35713 11.3498 9.05 12.2167 9.05C13.0722 9.05 13.8083 9.35713 14.425 9.97138C15.0417 10.5856 15.35 11.3285 15.35 12.2C15.35 13.0444 15.0417 13.775 14.425 14.3917C13.8083 15.0083 13.0694 15.3167 12.2083 15.3167Z" fill="#dddddd"/>
        </svg>
        `
      },
      {
        itemType: "separator"
      },
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
    onChange
  );
  const handleUpdateClick = (value, date2) => {
    if (figma.currentUser) {
      setName(figma.currentUser.name);
      setDate(_getDate());
      if (id == widget2) {
        setLog([
          ...log,
          {
            value,
            name: figma.currentUser.name,
            date: date2
          }
        ]);
      } else {
        setLog([
          {
            value,
            name: figma.currentUser.name,
            date: date2
          }
        ]);
        setId(widget2);
      }
    }
  };
  const backgroundStyles = {
    "In progress": "#FFB800",
    Outdated: "#CB0000",
    Updated: "#00A700"
  };
  const textStyles = {
    "In progress": "#000000",
    Outdated: "#FFFFFF",
    Updated: "#FFFFFF"
  };
  const textGradientStyles = {
    Outdated: {
      type: "gradient-linear",
      gradientHandlePositions: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 }
      ],
      gradientStops: [
        { position: 0, color: { r: 1, g: 1, b: 1, a: 1 } },
        { position: 1, color: { r: 1, g: 1, b: 1, a: 0.800000011920929 } }
      ]
    },
    "In progress": {
      type: "gradient-linear",
      gradientHandlePositions: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 }
      ],
      gradientStops: [
        {
          position: 0,
          color: {
            r: 0.0833333358168602,
            g: 0.0833333358168602,
            b: 0.0833333358168602,
            a: 1
          }
        },
        {
          position: 1,
          color: {
            r: 0.0833333358168602,
            g: 0.0833333358168602,
            b: 0.0833333358168602,
            a: 0.800000011920929
          }
        }
      ]
    },
    Updated: {
      type: "gradient-linear",
      gradientHandlePositions: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 }
      ],
      gradientStops: [
        { position: 0, color: { r: 1, g: 1, b: 1, a: 1 } },
        { position: 1, color: { r: 1, g: 1, b: 1, a: 0.800000011920929 } }
      ]
    }
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
    },
    {
      blur: 0,
      color: "#DDDDDD",
      offset: { x: 0, y: -2 },
      spread: 0,
      type: "drop-shadow"
    }
  ];
  return /* @__PURE__ */ figma.widget.h(
    AutoLayout,
    {
      verticalAlignItems: "center",
      spacing: 16,
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
        fontWeight: "bold",
        horizontalAlignText: "left",
        fill: textGradientStyles[status],
        letterSpacing: "-2%"
      },
      status === "Updated" ? date : status
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
          fontSize: 10,
          horizontalAlignText: "left"
        },
        ""
      ),
      /* @__PURE__ */ figma.widget.h(
        Text,
        {
          fontSize: 20,
          horizontalAlignText: "left",
          fill: textStyles[status],
          opacity: 0.6
        },
        name
      )
    )
  );
}
var widget, AutoLayout, Text, useSyncedState, usePropertyMenu, useWidgetId;
var init_main = __esm({
  "src/main.jsx"() {
    init_lib();
    init_data();
    ({ widget } = figma);
    ({ AutoLayout, Text, useSyncedState, usePropertyMenu, useWidgetId } = widget);
  }
});

// <stdin>
var modules = { "src/main.jsx--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.jsx--default" : figma.command;
modules[commandId]();
