"use client";
import { Card } from "@/components/ui/card";
import { FC, useMemo } from "react";
import { useAppContext } from "@/components/providers/StateProvider";

import {
	Shape,
	templateStructures,
	names,
	templateElements,
} from "@/lib/templates";
import { cn } from "@/lib/utils";
import { gradients } from "@/lib/gradients";

interface PreviewProps {}
const Preview: FC<PreviewProps> = ({}) => {
	console.log("rendering preview");
	const { state } = useAppContext();
	const bg = useMemo(() => {
		switch (state.backgroundType) {
			case "gradient":
				return `linear-gradient(${state.gradientdirection}, ${
					gradients[state.background][0]
				},${gradients[state.background][1]})`;

			case "solid":
				return state.background;
			case "image":
				return `url('${
					state.background ??
					process.env.NEXT_PUBLIC_APP_URL + "/imgsrc-clone.png"
				}') no-repeat center center/cover`;
		}
	}, [state.backgroundType, state.background, state.gradientdirection]);
	const noise = useMemo(() => {
		return `url(#grainy) opacity(${state.noise[0]})`;
	}, [state.noise]);
	return (
		<Card id="content">
			<div
				className="overflow-hidden relative px-4 py-2 w-full rounded-md z-10"
				style={{
					aspectRatio: `${state.width}/${state.height}`,
					background: bg,
				}}>
				<svg className="absolute top-0 left-0 hidden">
					<filter id="grainy">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.9"
							numOctaves="3"
						/>
					</filter>
				</svg>
				<div
					className="absolute top-0 left-0 w-full h-full z-0"
					style={{
						filter: noise,
					}}></div>
				{templateStructures[state.selectedTemplateIndex].shapes.map(
					(shape, index) => {
						return (
							<TemplateShape
								key={`${
									templateStructures[
										state.selectedTemplateIndex
									].id
								}-${index}`}
								name={shape.name}
								className={cn("relative z-10", shape.className)}
								renderClass={shape.renderClass}>
								{shape.children}
							</TemplateShape>
						);
					}
				)}
			</div>
		</Card>
	);
};

const TemplateShape: FC<Shape> = ({
	className,
	name,
	children,
	renderClass,
}) => {
	const { state } = useAppContext();
	switch (name) {
		case names.Logo:
			return (
				<img
					src={
						state.logo ??
						`${process.env.NEXT_PUBLIC_APP_URL}` +
							templateElements[state.selectedTemplateIndex].find(
								(v) => v.name == name
							)?.value
					}
					className={renderClass}
				/>
			);
		case names.Title:
			return (
				<h1 className={renderClass}>
					{state.title ??
						templateElements[state.selectedTemplateIndex].find(
							(v) => v.name == name
						)?.value}
				</h1>
			);
		case names.Tag:
			return (
				<p
					className={renderClass}
					style={{
						borderColor: state.textColor,
						fontWeight: "bold",
					}}>
					{state.tag ??
						templateElements[state.selectedTemplateIndex].find(
							(v) => v.name == name
						)?.value}
				</p>
			);
		case names.Image:
			return (
				<img
					src={
						state.image ??
						`${process.env.NEXT_PUBLIC_APP_URL}` +
							templateElements[state.selectedTemplateIndex].find(
								(v) => v.name == name
							)?.value
					}
					className={renderClass}
				/>
			);
		case names.Description:
			return (
				<p className={renderClass}>
					{state.description ??
						templateElements[state.selectedTemplateIndex].find(
							(v) => v.name == name
						)?.value}
				</p>
			);
		case names["1st Logo"]:
			return (
				<img
					src={
						state.logos[0] ??
						`${process.env.NEXT_PUBLIC_APP_URL}` +
							templateElements[state.selectedTemplateIndex].find(
								(v) => v.name == name
							)?.value
					}
					className={renderClass}
				/>
			);
		case names["2nd Logo"]:
			return (
				<img
					src={
						state.logos[1] ??
						`${process.env.NEXT_PUBLIC_APP_URL}` +
							templateElements[state.selectedTemplateIndex].find(
								(v) => v.name == name
							)?.value
					}
					className={renderClass}
				/>
			);
		case names["3rd Logo"]:
			return (
				<img
					src={
						state.logos[2] ??
						`${process.env.NEXT_PUBLIC_APP_URL}` +
							templateElements[state.selectedTemplateIndex].find(
								(v) => v.name == name
							)?.value
					}
					className={renderClass}
				/>
			);
		default:
			return (
				<div
					className={className}
					style={{ color: state.textColor }}>
					{children &&
						children.map((child, index) => (
							<TemplateShape
								key={`child-${index}`}
								className={cn(
									child.renderClass != null
										? child.renderClass
										: child.className
								)}
								name={child.name}
								renderClass={child.renderClass}>
								{child.children}
							</TemplateShape>
						))}
				</div>
			);
	}
};

export default Preview;
