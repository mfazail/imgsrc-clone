type ElementType = "file" | "input";

export interface Shape {
	className: string;
	children?: Shape[];
	hasColor?: boolean;
	name?: string;
	renderClass?: string;
}

export interface TemplateElement {
	name: string;
	type: ElementType;
	value:string;
}

export interface Template {
	id: string;
	name: string;
	description: string;
	shapes: Shape[];
}

export const names = {
	Logo: "Logo",
	Title: "Title",
	Tag: "Tag",
	Image: "Image",
	Description: "Description",
	"1st Logo": "1st Logo",
	"2nd Logo": "2nd Logo",
	"3rd Logo": "3rd Logo",
};

export const templateStructures: Template[] = [
	{
		id: crypto.randomUUID(),
		name: "template-1",
		description: "This is a template",
		shapes: [
			{
				className:
					"flex w-full h-full items-center justify-center space-x-3",
				children: [
					{
						className: "w-1/2 h-full",
						children: [
							{
								className: "w-[20%] aspect-square rounded-full",
								hasColor: true,
								name: names.Logo,
								renderClass: "w-[20%] aspect-square",
							},
							{
								className:
									"mt-[20%] w-[30%] aspect-[4/1] rounded-full",
								hasColor: true,
								name: names.Tag,
								renderClass:
									"mt-[20%] w-max rounded-full border-2 px-4",
							},
							{
								className:
									"mt-[10%] w-[95%] aspect-[6/1] rounded-full",
								hasColor: true,
								name: names.Title,
								renderClass: "mt-[6%] text-4xl font-bold",
							},
						],
					},
					{
						className: "relative space-y-3 w-1/2 h-full",
						children: [
							{
								className: "w-full aspect-[4/3] rounded-md mt-[25%]",
								hasColor: true,
								name: names.Image,
								renderClass:
									"absolute top-[20%] left-[15%] object-left object-cover w-full h-full rounded-md",
							},
						],
					},
				],
			},
		],
	},
	{
		id: crypto.randomUUID(),
		name: "template-2",
		description: "This is a template",
		shapes: [
			{
				className: "flex w-full h-full flex-col items-center space-y-2",
				children: [
					{
						className: "w-[20%] aspect-[6/1] rounded-full",
						hasColor: true,
						name: names.Tag,
						renderClass: "mt-[4%] border-2 rounded-full px-4 w-max",
					},
					{
						className: "w-1/2 aspect-[8/1]  rounded-full",
						hasColor: true,
						name: names.Title,
						renderClass: "text-4xl font-bold text-center",
					},
					{
						className: "w-[70%] aspect-[16/9] rounded-md",
						hasColor: true,
						name: names.Image,
						renderClass: "mt-[4%] w-[90%] object-cover object-top rounded-md",
					},
				],
			},
		],
	},
	{
		id: crypto.randomUUID(),
		name: "template-3",
		description: "This is a template",
		shapes: [
			{
				className:
					"flex w-full h-full flex-col items-center justify-center space-y-2",
				children: [
					{
						className: "w-[20%] aspect-[6/1] rounded-full",
						hasColor: true,
						name: names.Tag,
						renderClass: "rounded-full border-2 px-4 w-max",
					},
					{
						className: "w-1/2 aspect-[8/1]  rounded-full",
						hasColor: true,
						name: names.Title,
						renderClass: "pt-[2%] text-4xl font-bold text-center",
					},
					{
						className:
							"w-full flex space-x-[5%] items-center justify-center pt-[2%]",
						children: [
							{
								className: "w-[15%] aspect-square rounded-md",
								hasColor: true,
								name: names["1st Logo"],
								renderClass: "w-[10%]",
							},
							{
								className: "w-[15%] aspect-square rounded-md",
								hasColor: true,
								name: names["2nd Logo"],
								renderClass: "w-[10%]",
							},
							{
								className: "w-[15%] aspect-square rounded-md",
								hasColor: true,
								name: names["3rd Logo"],
								renderClass: "w-[10%]",
							},
						],
					},
				],
			},
		],
	},
	{
		id: crypto.randomUUID(),
		name: "template-4",
		description: "This is a template",
		shapes: [
			{
				className: "flex w-full h-full flex-col items-center justify-center space-y-[4%]",
				children: [
					{
						className: "w-[20%] aspect-square rounded-full",
						hasColor: true,
						name: names.Logo,
						renderClass:"w-[20%]"
					},
					{
						className: "w-1/2 aspect-[5/1]  rounded-full",
						hasColor: true,
						name: names.Title,
						renderClass:"text-4xl font-bold text-center"
					},
					{
						className: "w-[70%] aspect-[14/1] rounded-full",
						hasColor: true,
						name: names.Description,
						renderClass:"text-xl"
					},
				],
			},
		],
	},
	{
		id: crypto.randomUUID(),
		name: "template-4",
		description: "This is a template",
		shapes: [
			{
				className:
					"flex w-full h-full items-center justify-center space-x-2",
				children: [
					{
						className: "w-1/2 flex items-end justify-end",
						children: [
							{
								className: "w-[40%] aspect-square rounded-md",
								hasColor: true,
								name: names.Logo,
								renderClass:"w-[40%]"
							},
						],
					},
					{
						className: "w-1/2",
						children: [
							{
								className: "w-[40%] aspect-video rounded-md",
								hasColor: true,
								name: names.Title,
								renderClass:"text-4xl font-bold"
							},
							{
								className:
								"mt-1 w-[40%] aspect-[6/1] rounded-md",
								hasColor: true,
								name: names.Description,
								renderClass:"text-xl"
							},
						],
					},
				],
			},
		],
	},
];

export const templateElements: TemplateElement[][] = [
	[
		{ name: names.Tag, type: "input",value:"React" },
		{ name: names.Title, type: "input",value:"Learning React P3 - RSC, context and providers, etc." },
		{ name: names.Logo, type: "file",value:"/next.svg" },
		{ name: names.Image, type: "file",value:"/imgsrc-clone.png" },
	],
	[
		{ name: names.Tag, type: "input",value:"React" },
		{ name: names.Title, type: "input",value:"Learning React P3 - RSC, context and providers, etc." },
		{ name: names.Image, type: "file",value:"/imgsrc-clone.png" },
	],
	[
		{ name: names.Tag, type: "input",value:"React" },
		{ name: names.Title, type: "input",value:"Learning React P3 - RSC, context and providers, etc." },
		{ name: names["1st Logo"], type: "file",value:"/react.svg" },
		{ name: names["2nd Logo"], type: "file",value:"/next.svg" },
		{ name: names["3rd Logo"], type: "file",value:"/vercel.svg" },
	],
	[
		{ name: names.Title, type: "input",value:"Learning React P3 - RSC, context and providers, etc." },
		{ name: names.Description, type: "input",value:"Some long long long description" },
		{ name: names.Logo, type: "file",value:"/next.svg" },
	],
	[
		{ name: names.Title, type: "input",value:"Learning React P3" },
		{ name: names.Description, type: "input",value:"Some long long long description" },
		{ name: names.Logo, type: "file",value:"/next.svg" },
	],
];
