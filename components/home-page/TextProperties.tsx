"use client";
import { textColors } from "@/lib/colors";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { STATE_ACTIONS, useAppContext } from "../providers/StateProvider";

const TextProperties = () => {
	const { state, dispatch } = useAppContext();
	const handleColorChange = (value: string) => {
		if (!value) return;
		dispatch({
			type: STATE_ACTIONS.TEXT_COLOR_CHANGE,
			payload: value,
		});
	};
	return (
		<div>
			<Label htmlFor="text-color">Text color</Label>
			<ToggleGroup
				type="single"
				size="sm"
				variant="outline"
				className="grid grid-cols-8 gap-1"
				id="text-color"
				defaultValue={textColors[1]}
				value={state.textColor}
				onValueChange={handleColorChange}>
				{textColors.map((value) => (
					<ToggleGroupItem
						key={value}
						value={value}
						style={{
							background: value
						}}
						className={cn(
							value,
							`w-8 h-8 data-[state=on]:border-active-border border-2 hover:bg-[${value}] data-[state=on]:bg-[${value}]`
						)}></ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
};

export default TextProperties;
