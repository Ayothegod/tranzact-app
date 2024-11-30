/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

const reviews = [
  { userName: "Ayomide", content: "This is goood and im interested!!" },
  {
    userName: "Adebisi",
    content: "This is goood and im interested!! this is not avatar though",
  },
  {
    userName: "John Doe",
    content:
      "Eum reprehenderit suscipit sint vitae eveniet. A saepe beatae perferendis veniam asperiores?!!",
  },
];

export default function Reviews() {
  const [allReviews, setAllReviews] = useState(reviews);

  return (
    <div className="body py-20 debug">
      <h2 className="text-center text-4xl font-bold text-neutral-500">
        Kind words from
        <span className="md:block sm:inline">
          our lovely 
          <span className="text-black"> customers</span>
        </span>
      </h2>

      <div className="bg-red-300 flex w-1/4 h-24 overflow-hidden">
        {allReviews.map((reiew) => {
          return <div className="w-full h-full flex-shrink-0">Hello</div>;
        })}
      </div>
    </div>
  );
}
