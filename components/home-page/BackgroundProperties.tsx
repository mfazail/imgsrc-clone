"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gradients, gradientDirections } from "@/lib/gradients";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	ArrowUp,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUpLeft,
	ArrowUpRight,
	ArrowDownLeft,
	ArrowDownRight,
} from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
	BackgroundType,
	Backgrounds,
	STATE_ACTIONS,
	useAppContext,
} from "../providers/StateProvider";
import { solidColors } from "@/lib/colors";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";

const BackgroundProperties = () => {
	const { state, dispatch } = useAppContext();
	const handleColorChange = (value: string) => {
		if (!value) return;
		dispatch({
			type: STATE_ACTIONS.BACKGROUND_CHANGE,
			payload: value as Backgrounds,
		});
	};
	const handleDirectionChange = (value: string) => {
		if (!value) return;
		dispatch({
			type: STATE_ACTIONS.GRADIENT_DIRECTION_CHANGE,
			payload: value,
		});
	};
	const handleBgImageChange = (
		e: ChangeEvent<HTMLInputElement> | undefined
	) => {
		const files = e?.target?.files;
		if (!files || files.length <= 0) return;
		const reader = new FileReader();
		reader.onloadend = () => {
			dispatch({
				type: STATE_ACTIONS.BACKGROUND_CHANGE,
				payload: reader.result as Backgrounds,
			});
		};
		reader.readAsDataURL(files[0]);
	};

	const handleTabChange = (value: string) => {
		const bg = (
			value == "gradient"
				? "color2"
				: value == "solid"
				? solidColors[1]
				: "url(/imgsrc-clone.png)"
		) as Backgrounds;
		dispatch({
			type: STATE_ACTIONS.BACKGROUND_TYPE_CHANGE,
			payload: {
				bgType: value as BackgroundType,
				value: bg,
			},
		});
	};
	return (
		<div>
			<Tabs
				defaultValue={state.backgroundType}
				onValueChange={handleTabChange}>
				<TabsList>
					<TabsTrigger value="gradient">Gradient</TabsTrigger>
					<TabsTrigger value="solid">Solid</TabsTrigger>
					<TabsTrigger value="image">Image</TabsTrigger>
				</TabsList>
				<TabsContent value="gradient">
					<Card className="p-2">
						<ToggleGroup
							type="single"
							size="sm"
							variant="outline"
							className="flex flex-wrap items-center justify-start gap-1"
							defaultValue={state.background}
							value={state.background}
							onValueChange={handleColorChange}>
							{Object.entries(gradients).map(
								([key, [c1, c2]], index) => (
									<ToggleGroupItem
										key={`${c1}-${c2}-${index}`}
										value={key}
										className="w-8 h-8 aspect-square data-[state=on]:border-active-border border-2"
										style={{
											background: `linear-gradient(${state.gradientdirection}, ${c1}, ${c2})`,
										}}
									/>
								)
							)}
						</ToggleGroup>
					</Card>
					<Card className="w-full mt-4 p-2">
						<Label>Gradient direction</Label>
						<ToggleGroup
							type="single"
							size="sm"
							variant="outline"
							className="grid grid-cols-8"
							onValueChange={handleDirectionChange}
							defaultValue={state.gradientdirection}
							value={state.gradientdirection}>
							{gradientDirections.map(([name, value]) => (
								<ToggleGroupItem
									key={name}
									value={value}
									className="data-[state=on]:border-active-border border-2">
									<DirectionToIcon name={name} />
								</ToggleGroupItem>
							))}
						</ToggleGroup>
					</Card>
				</TabsContent>
				<TabsContent value="solid">
					<ToggleGroup
						type="single"
						size="sm"
						variant="outline"
						className="flex flex-wrap items-center justify-start gap-1"
						defaultValue={state.background}
						value={state.background}
						onValueChange={handleColorChange}>
						{solidColors.map((value, index) => (
							<ToggleGroupItem
								key={`${value}-${index}`}
								value={value}
								className="w-8 h-8 aspect-square data-[state=on]:border-active-border border-2"
								style={{
									background: value,
								}}
							/>
						))}
					</ToggleGroup>
				</TabsContent>
				<TabsContent value="image">
					<Input
						type="file"
						onChange={handleBgImageChange}
					/>
				</TabsContent>
			</Tabs>

			<HoverCard>
				<HoverCardTrigger>
					<div className="mt-4 space-y-2">
						<Label>Noise</Label>
						<Slider
							value={state.noise}
							min={0}
							max={1}
							step={0.05}
							onValueChange={(value) => {
								dispatch({
									type: STATE_ACTIONS.NOISE_CHANGE,
									payload: value,
								});
							}}
						/>
					</div>
				</HoverCardTrigger>
				<HoverCardContent>
					Control the level background noise to add texture. A value
					between 0.1 to 0.25 is recommended.
				</HoverCardContent>
			</HoverCard>
		</div>
	);
};

const DirectionToIcon = ({ name }: { name: string }) => {
	switch (name) {
		case "top":
			return <ArrowUp size={18} />;
		case "top-right":
			return <ArrowUpRight size={18} />;
		case "right":
			return <ArrowRight size={18} />;
		case "bottom-right":
			return <ArrowDownRight size={18} />;
		case "bottom":
			return <ArrowDown size={18} />;
		case "bottom-left":
			return <ArrowDownLeft size={18} />;
		case "left":
			return <ArrowLeft size={18} />;
		case "top-left":
			return <ArrowUpLeft size={18} />;
	}
	return null;
};

export default BackgroundProperties;
