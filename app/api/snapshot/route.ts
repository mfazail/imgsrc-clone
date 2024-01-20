import { launch } from "puppeteer";

export const GET = async () => {
	const browser = await launch({ headless: "new" });
	const page = await browser.newPage();

	await page.setContent(`
        <script src="https://cdn.tailwindcss.com"></script>
    <h1 class="text-red-400">Hello World</h1>
    `);
	await page.setViewport({ width: 1200, height: 630 });

	const buffer = await page.screenshot({ type: "png" });
	await browser.close();

	return new Response(buffer, {
		headers: {
			"Content-Type": "image/png",
		},
	});
};

export const POST = async (req: Request) => {
	const form = await req.formData();
	const formContent = form.get("content")?.toString();
	const width = form.get("width")?.toString();
	const height = form.get("height")?.toString();

	if (!formContent) return new Response("No content", { status: 400 });
	if (formContent.includes("<script")|| formContent.includes("<link")) {
		return new Response("scripts and links are not allowed!", { status: 400 });
	}
	// console.log({ formContent });
	const browser = await launch({ headless: "new" });
	const page = await browser.newPage();
	const content = `<script src="https://cdn.tailwindcss.com"></script>${formContent}`;
	await page.setContent(content, {
		waitUntil: "networkidle0",
	});
	await page.setViewport({
		width: parseInt(width ?? "1200"),
		height: parseInt(height ?? "630"),
	});
	const buffer = await page.screenshot({
		type: "png",
		omitBackground: true,
	});
	await page.close();
	await browser.close();
	return new Response(buffer, {
		headers: {
			"Content-Type": "image/png",
		},
	});
};
