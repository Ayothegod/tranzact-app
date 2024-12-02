import {
  DiamondPercent,
  Inbox,
  LayoutDashboard,
  Receipt,
  Target,
} from "lucide-react";

export const rootHeaderNav = [
  { title: "Home", url: "/home" },
  { title: "Features", url: "/home" },
  { title: "About", url: "/home" },
  { title: "Screenshots", url: "/home" },
];

export const footerLinks = [
  { title: "Home", url: "/home" },
  { title: "About Tranzact", url: "/home" },
  { title: "How it works", url: "/home" },
  { title: "Features", url: "/home" },
  { title: "Screenshots", url: "/home" },
];

export const footerLegal = [
  { title: "Privacy Policy", url: "/home" },
  { title: "Terms of Conditions", url: "/home" },
];

export const sidebarData = [
  { id: 1, title: "Dashboard", url: "/dashboard", iconType: "LayoutDashboard" },
  { id: 4, title: "Analytics", url: "/Analytics", iconType: "BarChartBig" },
  { id: 6, title: "Accounts", url: "/Accounts", iconType: "Users" },
];

export const userNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Transactions", url: "/transactions", icon: Receipt },
  { title: "Goals", url: "/goals", icon: Target },
  { title: "Investments", url: "/investments", icon: DiamondPercent },
  { title: "Invoice", url: "/invoice", icon: Inbox },
];

export const uoUserNav = [
  { id: 1, title: "Dashboard", url: "/dashboard" },
  { id: 2, title: "Transactions", url: "/transactions" },
];

export const accountSidebar = [
  { id: 1, title: "My Profile", url: "/account" },
  { id: 2, title: "Settings", url: "/account/settings" },
  { id: 3, title: "Notification", url: "/account/notification" },
  { id: 4, title: "Data Export", url: "/account/export-data" },
  { id: 5, title: "Delete Account", url: "/account/delete-account" },
];

export type Transaction = {
  id: string;
  transactionType: "INCOME" | "EXPENSE";
  description: string | null;
  amount: string;
  createdAt: string;
  updatedAt: string | null;
  categoryId: string;
  category: {
    id: string;
    name: string;
    createdAt: string | null;
    userId: string;
  };
  userId: string;
};

export const Transactions: Transaction[] = [
  {
    id: "clxzdkv3y00011048o67qok2f",
    transactionType: "EXPENSE",
    description: "",
    amount: "500",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T00:19:47.710Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzcdd7l0001sx32pyjorpvf",
    category: {
      id: "clxzcdd7l0001sx32pyjorpvf",
      name: "daily",
      createdAt: "2024-06-28T23:45:58.305Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzfazgw000djkd8anx8px8p",
    transactionType: "EXPENSE",
    description: "",
    amount: "1000",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T01:08:06.033Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzcdd7l0001sx32pyjorpvf",
    category: {
      id: "clxzcdd7l0001sx32pyjorpvf",
      name: "daily",
      createdAt: "2024-06-28T23:45:58.305Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzxzltu0005dfmeg0f6htrg",
    transactionType: "INCOME",
    description: "",
    amount: "2000",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T09:51:07.843Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzxz5m10003dfmelfh81hv2",
    category: {
      id: "clxzxz5m10003dfmelfh81hv2",
      name: "daily funds",
      createdAt: "2024-06-29T09:50:46.825Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzy4fjl0009dfmeifpdy7yn",
    transactionType: "EXPENSE",
    description: "Breakfast funds",
    amount: "1500",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T09:54:52.977Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzy43u60007dfmeb7ch9404",
    category: {
      id: "clxzy43u60007dfmeb7ch9404",
      name: "breakfast",
      createdAt: "2024-06-29T09:54:37.806Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzd3nqz00018al3xlgzgoae",
    transactionType: "EXPENSE",
    description: null,
    amount: "2000",
    createdAt: "2024-06-22T23:00:00.000Z",
    updatedAt: "2024-06-29T00:06:25.019Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzcykkd00015xtc26f0khm2",
    category: {
      id: "clxzcykkd00015xtc26f0khm2",
      name: "medical",
      createdAt: "2024-06-29T00:02:27.613Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzdkv3y00011048o67qok2f",
    transactionType: "EXPENSE",
    description: "",
    amount: "500",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T00:19:47.710Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzcdd7l0001sx32pyjorpvf",
    category: {
      id: "clxzcdd7l0001sx32pyjorpvf",
      name: "daily",
      createdAt: "2024-06-28T23:45:58.305Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzfazgw000djkd8anx8px8p",
    transactionType: "EXPENSE",
    description: "",
    amount: "1000",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T01:08:06.033Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzcdd7l0001sx32pyjorpvf",
    category: {
      id: "clxzcdd7l0001sx32pyjorpvf",
      name: "daily",
      createdAt: "2024-06-28T23:45:58.305Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzxzltu0005dfmeg0f6htrg",
    transactionType: "INCOME",
    description: "",
    amount: "2000",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T09:51:07.843Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzxz5m10003dfmelfh81hv2",
    category: {
      id: "clxzxz5m10003dfmelfh81hv2",
      name: "daily funds",
      createdAt: "2024-06-29T09:50:46.825Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzy4fjl0009dfmeifpdy7yn",
    transactionType: "EXPENSE",
    description: "Breakfast funds",
    amount: "1500",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T09:54:52.977Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzy43u60007dfmeb7ch9404",
    category: {
      id: "clxzy43u60007dfmeb7ch9404",
      name: "breakfast",
      createdAt: "2024-06-29T09:54:37.806Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzd3nqz00018al3xlgzgoae",
    transactionType: "EXPENSE",
    description: null,
    amount: "2000",
    createdAt: "2024-06-22T23:00:00.000Z",
    updatedAt: "2024-06-29T00:06:25.019Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzcykkd00015xtc26f0khm2",
    category: {
      id: "clxzcykkd00015xtc26f0khm2",
      name: "medical",
      createdAt: "2024-06-29T00:02:27.613Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzdkv3y00011048o67qok2f",
    transactionType: "EXPENSE",
    description: "",
    amount: "500",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T00:19:47.710Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzcdd7l0001sx32pyjorpvf",
    category: {
      id: "clxzcdd7l0001sx32pyjorpvf",
      name: "daily",
      createdAt: "2024-06-28T23:45:58.305Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzfazgw000djkd8anx8px8p",
    transactionType: "EXPENSE",
    description: "",
    amount: "1000",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T01:08:06.033Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzcdd7l0001sx32pyjorpvf",
    category: {
      id: "clxzcdd7l0001sx32pyjorpvf",
      name: "daily",
      createdAt: "2024-06-28T23:45:58.305Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzxzltu0005dfmeg0f6htrg",
    transactionType: "INCOME",
    description: "",
    amount: "2000",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T09:51:07.843Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzxz5m10003dfmelfh81hv2",
    category: {
      id: "clxzxz5m10003dfmelfh81hv2",
      name: "daily funds",
      createdAt: "2024-06-29T09:50:46.825Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzy4fjl0009dfmeifpdy7yn",
    transactionType: "EXPENSE",
    description: "Breakfast funds",
    amount: "1500",
    createdAt: "2024-06-28T23:00:00.000Z",
    updatedAt: "2024-06-29T09:54:52.977Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzy43u60007dfmeb7ch9404",
    category: {
      id: "clxzy43u60007dfmeb7ch9404",
      name: "breakfast",
      createdAt: "2024-06-29T09:54:37.806Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
  {
    id: "clxzd3nqz00018al3xlgzgoae",
    transactionType: "EXPENSE",
    description: null,
    amount: "2000",
    createdAt: "2024-06-22T23:00:00.000Z",
    updatedAt: "2024-06-29T00:06:25.019Z",
    userId: "clxzc3b130000q8jcwm9g8fza",
    categoryId: "clxzcykkd00015xtc26f0khm2",
    category: {
      id: "clxzcykkd00015xtc26f0khm2",
      name: "medical",
      createdAt: "2024-06-29T00:02:27.613Z",
      userId: "clxzc3b130000q8jcwm9g8fza",
    },
  },
];
