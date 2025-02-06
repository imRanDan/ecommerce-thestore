import { cn } from "@/lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  //include decimal places
  const stringValue = value.toFixed(2);
  //get the int and or float
  const [intVal, floatVal] = stringValue.split(".");

  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {intVal}
      <span className="text-xs align-super">.{floatVal}</span>
    </p>
  );
};

export default ProductPrice;
