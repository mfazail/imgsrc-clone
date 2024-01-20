"use client";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STATE_ACTIONS, useAppContext } from "../providers/StateProvider";
import { ChangeEvent, useState } from "react";

const SaveCard = () => {
	const { state, dispatch } = useAppContext();
	const [loading, setLoading] = useState(false);

	const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		console.log(id, value);
		dispatch({
			type: STATE_ACTIONS.SIZE_CHANGE,
			payload: {
				width: id === "width" ? parseInt(value) : state.width,
				height: id === "height" ? parseInt(value) : state.height,
			},
		});
	};

	const handleDownload = async () => {
		setLoading(true);

		try {
			const content = document.getElementById("content");
			var formData = new FormData();
			formData.append("content", content?.innerHTML ?? "");
			formData.append("width", state.width.toString());
			formData.append("height", state.height.toString());
			const res = await fetch("/api/snapshot", {
				method: "POST",
				body: formData,
			});

			if (res.ok) {
				toast.success("Image will be automatically downloaded!", {
					description: "Image will start download automatically",
				});
				const image = await res.blob();
				var link = document.createElement("a");
				link.href = URL.createObjectURL(image);
				link.download = `imgsrc-clone-${Date.now()}.png`; // You can set the filename here

				// Append the link to the body
				document.body.appendChild(link);

				// Trigger a click on the link to start the download
				link.click();

				// Remove the link from the DOM
				document.body.removeChild(link);
			} else {
				throw res;
			}
		} catch (e: any) {
			console.log(await e.text());
			const message = await e.text();
			toast.error(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="flex items-end p-4 space-x-2">
			<div>
				<Label htmlFor="width">Width (px)</Label>
				<Input
					id="width"
					type="number"
					onChange={handleSizeChange}
					className="w-20 h-9"
					defaultValue={state.width}
				/>
			</div>
			<div>
				<Label htmlFor="height">Height (px)</Label>
				<Input
					id="height"
					type="number"
					onChange={handleSizeChange}
					className="w-20 h-9"
					defaultValue={state.height}
				/>
			</div>
			<div className="flex-1"></div>
			<Button
				onClick={handleDownload}
				disabled={loading}>
				{loading ? (
					<Loader2 className="w-4 h-4 mr-2 animate-spin" />
				) : (
					<Download className="w-4 h-4 mr-2" />
				)}
				Save image
			</Button>
		</Card>
	);
};

export default SaveCard;
