export default function Dashboard() {
  return (
    <div className="px-4">
      <div className="w-[70%]">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-500 h-24">Box 1</div>
          <div className="bg-blue-500 h-24">Box 2</div>
          <div className="bg-blue-500 h-24">Box 3</div>

          <div className="bg-green-500 h-24 col-span-2">Item 1</div>
          <div className="bg-green-500 h-24">Item 2</div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
