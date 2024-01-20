import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import Logo from "@/components/global/Logo";
const Footer = () => {
	return (
		<footer className="w-full border-t border-border py-10 mt-8">
			<nav className="max-w-7xl mx-auto flex items-center space-x-8 px-4">
				<Logo />
				<Link href="/">Home</Link>
				<Link
					href="https://github.com/mfazail"
					target="_blank">
					mfazail
				</Link>
				<Link
					href="https://github.com/mfazail"
					target="_blank">
					<Github />
				</Link>
				<Link
					href="https://twitter.com/mfazail_alam"
					target="_blank">
					<Twitter />
				</Link>
			</nav>
		</footer>
	);
};

export default Footer;
