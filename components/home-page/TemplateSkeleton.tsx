import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Template, Shape } from "@/lib/templates";
import { cn } from "@/lib/utils";

interface TemplateSkeletonProps {
	onSelect: () => void;
	template: Template;
	isSelected?: boolean;
}

const TemplateSkeleton: FC<TemplateSkeletonProps> = ({
	onSelect,
	template,
	isSelected,
}) => {
	return (
		<Card
			onClick={() => onSelect()}
			className={cn(
				"overflow-hidden cursor-pointer hover:bg-gray-700/10 h-40",
				isSelected
					? "border-2 border-active-border"
					: "border-2 border-border"
			)}>
			<CardContent className="p-6 h-full">
				{template.shapes.map((shape, index) => {
					return (
						<TemplateShape
							key={`${template.id}-${index}`}
							className={shape.className}>
							{shape.children}
						</TemplateShape>
					);
				})}
			</CardContent>
		</Card>
	);
};

const TemplateShape: FC<Shape> = ({ className, children }) => {
	return (
		<div className={className}>
			{children &&
				children.map((child, index) => (
					<TemplateShape
						key={`child-${index}`}
						className={cn(
							child.hasColor == true &&
								"bg-gray-200 dark:bg-gray-800",
							child.className
						)}>
						{child.children}
					</TemplateShape>
				))}
		</div>
	);
};

export default TemplateSkeleton;
