// import {
//   useQuery,
//   useMutation,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import { AppType } from "../../../server/src/routes/test.route";
// import { hc, InferResponseType, InferRequestType } from "hono/client";

// const queryClient = new QueryClient();
// const client = hc<AppType>("/api");

// export default function Learn() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Todos />
//     </QueryClientProvider>
//   );
// }

// const Todos = () => {
//   const query = useQuery({
//     queryKey: ["todos"],
//     queryFn: async () => {
//       const res = await client.todo.$get();
//       return await res.json();
//     },
//   });

//   const $post = client.todo.$post;

//   const mutation = useMutation<
//     InferResponseType<typeof $post>,
//     Error,
//     InferRequestType<typeof $post>["form"]
//   >(
//     async (todo) => {
//       const res = await $post({
//         form: todo,
//       });
//       return await res.json();
//     },
//     {
//       onSuccess: async () => {
//         queryClient.invalidateQueries({ queryKey: ["todos"] });
//       },
//       onError: (error) => {
//         console.log(error);
//       },
//     }
//   );

//   return (
//     <div>
//       <button
//         onClick={() => {
//           mutation.mutate({
//             id: Date.now().toString(),
//             title: "Write code",
//           });
//         }}
//       >
//         Add Todo
//       </button>

//       <ul>
//         {query.data?.todos.map((todo) => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };


const Layout = ({ children }: any) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white sticky top-0 h-screen">
        <nav>
          <ul>
            <li className="p-4">Item 1</li>
            <li className="p-4">Item 2</li>
            <li className="p-4">Item 3</li>
          </ul>
        </nav>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="bg-gray-900 text-white p-4 sticky top-0 z-10">
          <h1>Header</h1>
        </header>
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};


export default function Learn() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Home Page</h2>
      <p>This is the home page content. It will scroll below the sticky header and sidebar.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      {/* Add more content to see the scrolling effect */}
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      {/* Add more content to see the scrolling effect */}
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      {/* Add more content to see the scrolling effect */}
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      {/* Add more content to see the scrolling effect */}
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      {/* Add more content to see the scrolling effect */}
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    </Layout>
  );
};


