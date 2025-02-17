import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/common/components/ui/carousel";
import { dashboardMetricItems } from "../mocks/dashboardMetricItems";

export function DashboardMetrics() {
  return (
    <div>
      <Carousel className="lg:hidden">
        <CarouselContent className="ml-3 pb-[1.125rem]">
          {dashboardMetricItems.map((item) => (
            <CarouselItem
              className="basis-32 pl-2"
              key={item.metric}
            >
              <div className='flex max-h-36 flex-col items-center justify-center gap-2 rounded-[0.625rem] bg-white-100 py-5'>
                {item.icon}
                <div className="flex flex-col items-center justify-center">
                  <strong className="font-bold text-black text-lg leading-7">
                    {item.value}
                  </strong>
                  <span className="font-normal text-primary-200 text-sm leading-5">
                    {item.metric}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
