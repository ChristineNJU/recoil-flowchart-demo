export const FUNCS = [
  {
    id: "func1",
    name: "查询人口",
    inputs: [
      {
        type: "number",
        key: "age",
        label: "年龄",
      },
      {
        type: "enum",
        key: "gender",
        label: "性别",
      },
    ],
    outputs: [
      {
        type: "object",
        key: "citizen",
        label: "公民信息",
      },
    ],
  },
  {
    id: "func2",
    name: "查询航班",
    inputs: [
      {
        type: "string",
        key: "department",
        label: "出发地",
      },
      {
        type: "string",
        key: "arrival",
        label: "到达地",
      },
      {
        type: "timestamp",
        key: "departdate",
        label: "出发日期",
      },
      {
        type: "timestamp",
        key: "arrivedate",
        label: "到达日期",
      },
    ],
    outputs: [
      {
        type: "object",
        key: "flightinfo",
        label: "个人航程信息",
      },
    ],
  },
  {
    id: "func3",
    name: "查询高铁",
    inputs: [
      {
        type: "string",
        key: "department",
        label: "出发地",
      },
      {
        type: "string",
        key: "arrival",
        label: "到达地",
      },
      {
        type: "timestamp",
        key: "departdate",
        label: "出发日期",
      },
      {
        type: "timestamp",
        key: "arrivedate",
        label: "到达日期",
      },
    ],
    outputs: [
      {
        type: "object",
        key: "traininfo",
        label: "个人高铁信息",
      },
    ],
  },
];
