import Link from "next/link";
import { ModeToggle } from "@/components/global/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Twitter, Github } from "lucide-react";
import Logo from "@/components/global/Logo";
const Navbar = () => {
	return (
		<nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
			<div className="inline-flex items-center space-x-2">
				<Link
					href="/"
					className="">
					<Logo />
				</Link>
				<Button
					asChild
					size="sm"
					variant="ghost">
					<Link href="https://github.com/mfazail">mfazail</Link>
				</Button>
			</div>
			<div className="inline-flex items-center space-x-2">
				<Button
					asChild
					size="icon"
					variant="ghost">
					<Link href="https://github.com/mfazail/imgsrc-clone">
						<Github />
					</Link>
				</Button>
				<Button
					asChild
					size="icon"
					variant="ghost">
					<Link href="https://twitter.com/mfazail_alam">
						<Twitter />
					</Link>
				</Button>
				<ModeToggle />
			</div>
		</nav>
	);
};

export default Navbar;
