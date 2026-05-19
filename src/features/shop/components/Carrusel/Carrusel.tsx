import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../../shared/ui/carousel";
import { Card, CardContent } from "../../../../shared/ui";


interface FullWidthCarouselProps {
    items: any[];
    renderItem?: (item: any, index: number) => React.ReactNode;
    className?: string;
    showControls?: boolean;
}
export function FullWidthCarousel({
    items = [],
    renderItem,
    className = "",
    showControls = true,
}: FullWidthCarouselProps) {
    return (
        <div className={`w-full ${className}`}>
            <Carousel className="w-full">
                <CarouselContent>
                    {items.map((item, index) => (
                        <CarouselItem key={index} className="w-full basis-full">
                            {renderItem ? (
                                renderItem(item, index)
                            ) : (
                                <Card className="w-full rounded-none">
                                    <CardContent className="flex items-center justify-center h-[300px]">
                                        <span className="text-xl font-semibold">
                                            Item {index + 1}
                                        </span>
                                    </CardContent>
                                </Card>
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {showControls && (
                    <>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                    </>
                )}
            </Carousel>
        </div>
    );
}