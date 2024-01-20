import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { SlidersHorizontalIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChangeEvent, ChangeEventHandler, FC } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { fonts, fontWeights } from "@/lib/fonts";

interface RowProps {
	label: string;
	value: string | null;
	isFile?: boolean;
	onChange: (value: string | File) => void;
	onChangeFont?: (value: string) => void;
	onChangeFontSize?: (value: string) => void;
	onChangeFontWeight?: (value: string) => void;
}

export const Row: FC<RowProps> = ({
	label,
	value,
	onChange,
	onChangeFont,
	onChangeFontSize,
	onChangeFontWeight,
	isFile = false,
}) => {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (isFile) {
			if (e.target.files && e.target.files.length == 0) return;
			onChange(e.target.files![0]);
		} else {
			onChange(e.target.value);
		}
	};
	return (
		<div className="flex items-end space-x-2">
			<div className="flex-1">
				<Label htmlFor={label.toLowerCase()}>{label}</Label>
				{isFile ? (
					<>
						<Input
							id={label.toLowerCase()}
							type="file"
							onChange={handleInputChange}
						/>
					</>
				) : (
					<>
						{/* <Label htmlFor={label.toLowerCase()}>{label}</Label> */}
						<Input
							id={label.toLowerCase()}
							type="text"
							value={value ?? ""}
							onChange={handleInputChange}
						/>
					</>
				)}
			</div>
			{isFile == false && (
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							size="icon">
							<SlidersHorizontalIcon size={18} />
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<div className="grid gap-4">
							<div className="space-y-2">
								<h4 className="font-medium leading-none">
									Font Settings
								</h4>
								<p className="text-sm text-muted-foreground">
									Customize the {label.toLowerCase()} font.
								</p>
							</div>
							<div className="grid gap-2">
								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="font-family">
										Font family
									</Label>
									<Select
										onValueChange={(value) => {
											onChangeFont && onChangeFont(value);
										}}
										defaultValue={fonts[0].name}>
										<SelectTrigger className="w-full col-span-2">
											<SelectValue id="font-family" />
										</SelectTrigger>
										<SelectContent>
											{fonts.map((font) => {
												return (
													<SelectItem
														key={font.name}
														value={font.name}>
														{font.name}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
								</div>
								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="font-weight">
										Font weight
									</Label>
									<Select
										onValueChange={(value) => {
											onChangeFontWeight &&
												onChangeFontWeight(value);
										}}
										defaultValue={fontWeights[4].value}>
										<SelectTrigger className="w-full col-span-2">
											<SelectValue id="font-weight" />
										</SelectTrigger>
										<SelectContent>
											{fontWeights.map((weight) => {
												return (
													<SelectItem
														key={weight.name}
														value={weight.value}>
														{weight.name}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
								</div>
								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="font-size">Font size</Label>
									<Input
										id="font-size"
										defaultValue="20"
										onChange={(e) => {
											onChangeFontSize &&
												onChangeFontSize(
													e.target.value
												);
										}}
										className="col-span-2 h-8"
									/>
								</div>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			)}
		</div>
	);
};

interface FileInputProps {
	id: string;
	value: string | null;
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const FileInput: FC<FileInputProps> = ({ id, value, onChange }) => {
	return (
		<div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
			<Input
				id={id}
				type="file"
				className="hidden"
				onChange={onChange}
			/>
			File: {value?.split("/").reverse()[0]}
		</div>
	);
};

export default Row;
