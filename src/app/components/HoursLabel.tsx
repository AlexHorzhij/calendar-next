import { HOUR_ITEM_HEIGHT } from "@/app/data/time";

export function HoursLabel({ text }: { text: string }) {
  return (
    <div
      style={{ height: HOUR_ITEM_HEIGHT }}
      className={`flex flex-col text-base font-light items-end justify-start px-[4px] w-[80px] `}
      key={text}
    >
      <div className="text-base">{text}:00</div>
      <div className="text-secondary justify-self-center relative top-[14px]">
        {text}:30
      </div>
    </div>
  );
}
