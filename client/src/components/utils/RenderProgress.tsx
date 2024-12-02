// export default function RenderProgress() {
//   return (
//     <div>RenderProgress</div>
//   )
// }

import { Progress } from "@/components/ui/progress";
import { formatPercent } from "@/lib/fetch";
import clsx from "clsx";
import React from "react";

export default function RenderProgress({
  currentProgress, className, max
}: {
  currentProgress: number;
  className: string
  max: number
}) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const value = Math.floor(formatPercent(currentProgress, max))
    const timer = setTimeout(() => setProgress(value), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return <Progress value={progress} max={100} className={clsx("border", className )}/>;
}
