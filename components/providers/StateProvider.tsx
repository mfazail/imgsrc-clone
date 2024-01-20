"use client";
import { gradients } from "@/lib/gradients";
import {
	Dispatch,
	FC,
	ReactNode,
	createContext,
	useContext,
	useReducer,
} from "react";

export enum STATE_ACTIONS {
	SELECT_TEMPLATE = "SELECT_TEMPLATE",
	SIZE_CHANGE = "SIZE_CHANGE",
	INPUT_CHANGE = "INPUT_CHANGE",
	LOGOS_CHANGE = "LOGOS_CHANGE",
	BACKGROUND_CHANGE = "BACKGROUND_CHANGE",
	BACKGROUND_TYPE_CHANGE = "BACKGROUND_TYPE_CHANGE",
	GRADIENT_DIRECTION_CHANGE = "GRADIENT_DIRECTION_CHANGE",
	TEXT_COLOR_CHANGE = "TEXT_COLOR_CHANGE",
	NOISE_CHANGE = "NOISE_CHANGE",
}

export type Backgrounds = keyof typeof gradients & string;
export type BackgroundType = "gradient" | "solid" | "image";

type Action =
	| {
			type: STATE_ACTIONS.SELECT_TEMPLATE;
			payload: number;
	  }
	| {
			type: STATE_ACTIONS.SIZE_CHANGE;
			payload: { width: number; height: number };
	  }
	| {
			type: STATE_ACTIONS.INPUT_CHANGE;
			payload: { name: string; value: string };
	  }
	| {
			type: STATE_ACTIONS.LOGOS_CHANGE;
			payload: { index: number; value: string };
	  }
	| {
			type: STATE_ACTIONS.BACKGROUND_CHANGE;
			payload: Backgrounds;
	  }
	| {
			type: STATE_ACTIONS.BACKGROUND_TYPE_CHANGE;
			payload: {
				bgType: BackgroundType;
				value: Backgrounds;
			};
	  }
	| {
			type: STATE_ACTIONS.GRADIENT_DIRECTION_CHANGE;
			payload: string;
	  }
	| {
			type: STATE_ACTIONS.TEXT_COLOR_CHANGE;
			payload: string;
	  }
	| {
			type: STATE_ACTIONS.NOISE_CHANGE;
			payload: number[];
	  };

interface AppState {
	selectedTemplateIndex: number;
	width: number;
	height: number;
	tag: string | null;
	title: string | null;
	description: string | null;
	logo: string | null;
	image: string | null;
	logos: string[];
	background: Backgrounds;
	backgroundType: BackgroundType;
	gradientdirection: string;
	textColor: string;
	noise: number[];
}

const reducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case STATE_ACTIONS.SELECT_TEMPLATE:
			return {
				...state,
				selectedTemplateIndex: action.payload,
			};
		case STATE_ACTIONS.SIZE_CHANGE:
			return {
				...state,
				width: action.payload.width,
				height: action.payload.height,
			};
		case STATE_ACTIONS.INPUT_CHANGE:
			return {
				...state,
				[action.payload.name.toLowerCase()]: action.payload.value,
			};
		case STATE_ACTIONS.LOGOS_CHANGE:
			return {
				...state,
				logos: state.logos.map((logo, index) =>
					index === action.payload.index ? action.payload.value : logo
				),
			};
		case STATE_ACTIONS.BACKGROUND_CHANGE:
			return {
				...state,
				background: action.payload,
			};
		case STATE_ACTIONS.BACKGROUND_TYPE_CHANGE:
			return {
				...state,
				backgroundType: action.payload.bgType,
				background: action.payload.value,
			};
		case STATE_ACTIONS.GRADIENT_DIRECTION_CHANGE:
			return {
				...state,
				gradientdirection: action.payload,
			};
		case STATE_ACTIONS.TEXT_COLOR_CHANGE:
			return {
				...state,
				textColor: action.payload,
			};
		case STATE_ACTIONS.NOISE_CHANGE:
			return {
				...state,
				noise: action.payload,
			};

		default:
			return state;
	}
};

const initialState: AppState = {
	selectedTemplateIndex: 0,
	width: 1200,
	height: 630,
	tag: null,
	title: null,
	description: null,
	logo: null,
	image: null,
	logos: ["/react.svg", "/next.svg", "/vercel.svg"],
	background: "color2",
	backgroundType: "gradient",
	gradientdirection: "to top right",
	textColor: "#1f2937",
	noise: [0.8],
};

export const AppStateContext = createContext<{
	state: AppState;
	dispatch: Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => null,
});

export const AppStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<AppStateContext.Provider value={{ state, dispatch }}>
			{children}
		</AppStateContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppStateContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within a AppStateProvider");
	}
	return context;
};
