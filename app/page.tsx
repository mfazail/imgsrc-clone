import TemplateProperties from "@/components/home-page/TemplateProperties";
import Templates from "@/components/home-page/Templates";
import Preview from "@/components/home-page/Preview";
import PropertiesCard from "@/components/home-page/PropertiesCard";
import BackgroundProperties from "@/components/home-page/BackgroundProperties";
import TextProperties from "@/components/home-page/TextProperties";
import SaveCard from "@/components/home-page/SaveCard";

export default function Home() {
	return (
		<main className="max-w-7xl mx-auto px-4">
			<Templates />
			<div className="grid gap-4 lg:grid-cols-3 mt-6">
				<div className="col-span-full lg:col-span-1 space-y-4 order-last lg:order-first">
					<PropertiesCard
						title="Template propertes"
						description="Customize your image by changing below
								properties.">
						<TemplateProperties />
					</PropertiesCard>
					<PropertiesCard
						title="Background"
						description="Set a custom background for your image.">
						<BackgroundProperties />
					</PropertiesCard>
					<PropertiesCard
						title="Text"
						description="Set a color of all text.">
						<TextProperties />
					</PropertiesCard>
				</div>
				<div className="col-span-full lg:col-span-2 order-first lg:order-last">
					<div className="sticky top-4 space-y-4">
						<Preview />
						<SaveCard />
					</div>
				</div>
			</div>
		</main>
	);
}
