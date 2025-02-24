import CreateTodo from "@/components/CreateTodo";

export default function Home() {
  return (
   <div>
      <h1 className=" text-4xl font-bold flex justify-center m-10">Todo App</h1>
      <CreateTodo/>
   </div>
  );
}
