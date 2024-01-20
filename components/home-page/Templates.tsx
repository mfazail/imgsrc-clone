"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import TemplateSkeleton from "@/components/home-page/TemplateSkeleton";
import { templateStructures } from "@/lib/templates";
import {
	STATE_ACTIONS,
	useAppContext,
} from "@/components/providers/StateProvider";

const Templates = () => {
	const { state, dispatch } = useAppContext();
	const handleTemplateSelect = (index: number) => {
		dispatch({
			type: STATE_ACTIONS.SELECT_TEMPLATE,
			payload: index,
		});
	};
	return (
		<Carousel className="mt-6">
			<CarouselContent>
				{templateStructures.map((template, index) => {
					return (
						<CarouselItem
							key={template.id}
							className="basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5">
							<TemplateSkeleton
								template={template}
								onSelect={() => handleTemplateSelect(index)}
								isSelected={
									index == state.selectedTemplateIndex
								}
							/>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};

export default Templates;
