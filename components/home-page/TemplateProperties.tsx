"use client";
import Row from "@/components/home-page/Row";
import {
	STATE_ACTIONS,
	useAppContext,
} from "@/components/providers/StateProvider";
import { templateElements } from "@/lib/templates";

const Properties = () => {
	const { state, dispatch } = useAppContext();
	const handleRowChange = (
		name: string,
		type: string,
		value: string | File
	) => {
		if (type == "file") {
			if (name.includes(" Logo")) {
				let index = 0;
				switch (name) {
					case "1st Logo":
						index = 0;
						break;
					case "2nd Logo":
						index = 1;
						break;
					case "3rd Logo":
						index = 2;
						break;
					default:
						index = 0;
				}
				const reader = new FileReader();
				reader.onloadend = () => {
					dispatch({
						type: STATE_ACTIONS.LOGOS_CHANGE,
						payload: {
							index,
							value: reader.result?.toString() ?? "",
						},
					});
				};
				reader.readAsDataURL(value as File);
			} else {
				const reader = new FileReader();
				reader.onloadend = () => {
					dispatch({
						type: STATE_ACTIONS.INPUT_CHANGE,
						payload: {
							name,
							value: reader.result?.toString() ?? "",
						},
					});
				};
				reader.readAsDataURL(value as File);
			}
		} else {
			dispatch({
				type: STATE_ACTIONS.INPUT_CHANGE,
				payload: { name, value: value as string },
			});
		}
	};
	return (
		<>
			<div className="space-y-2">
				{templateElements[state.selectedTemplateIndex].map(
					({ name, type, value }, index) => (
						<Row
							key={`${name}-${type}-${index}`}
							label={name}
							value={state[name.toLowerCase()] ?? value}
							isFile={type == "file"}
							onChange={(value) =>
								handleRowChange(name, type, value)
							}
							onChangeFont={(value) => {
								console.log(value);
							}}
							onChangeFontSize={(value) => {
								console.log(value);
							}}
							onChangeFontWeight={(value) => {
								console.log(value);
							}}
						/>
					)
				)}
			</div>
		</>
	);
};

export default Properties;
