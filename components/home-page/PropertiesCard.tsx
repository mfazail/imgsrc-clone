import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FC, ReactNode } from "react";
interface PropertiesCardProps {
	children: ReactNode;
	title: string;
	description: string;
}
const PropertiesCard: FC<PropertiesCardProps> = ({
	title,
	description,
	children,
}) => {
	return (
		<Card>
			<CardHeader>
				<h3 className="font-semibold">{title}</h3>
				<p className="text-sm text-gray-400 !m-0">{description}</p>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default PropertiesCard;
