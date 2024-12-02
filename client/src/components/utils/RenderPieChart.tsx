/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, ResponsiveContainer } from "recharts";

// const data01 = [
//   { name: "Group A", value: 400, tag: "income" },
//   { name: "Group B", value: 300, tag: "expense" },
// ];
// const data02 = [
//   { name: "A1", value: 100 },
//   { name: "A2", value: 300 },
//   { name: "B1", value: 100 },
//   { name: "B2", value: 80 },
//   { name: "B3", value: 40 },
// ];

export default function RenderPieChart({
  expense,
  income,
  categories,
}: {
  income: number;
  expense: number;
  categories: any;
}) {
  // console.log(categories);

  const transaction = [
    { name: "Group A", value: income, tag: "income" },
    { name: "Group B", value: expense, tag: "expense" },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%" className={"debug"}>
      <PieChart width={400} height={400}>
        <Pie
          data={categories}
          dataKey="name"
          cx="50%"
          cy="50%"
          // innerRadius={70}
          // outerRadius={90}
          fill="#82ca9d"
          label
        />
        <Pie
          data={transaction}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#9333ea"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

// export default class RenderPieChart extends PureComponent {
//   render() {
//     return (
//       <ResponsiveContainer width="100%" height="100%" className={"debug"}>
//         <PieChart width={400} height={400}>
//           <Pie
//             data={data02}
//             dataKey="value"
//             cx="50%"
//             cy="50%"
//             // innerRadius={70}
//             // outerRadius={90}
//             fill="#82ca9d"
//             label
//           />
//           <Pie
//             data={data01}
//             dataKey="value"
//             cx="50%"
//             cy="50%"
//             outerRadius={60}
//             fill="#9333ea"
//             label
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     );
//   }
// }
