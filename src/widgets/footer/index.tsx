import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full h-[80px] bg-white border-t border-gray-200">
            <div className="flex items-center justify-center w-full h-full mx-auto text-gray-500 px-5">
                <p className="flex gap-2 text-sm">
                    © 2025.
                    <Link href="https://github.com/Dahoon06">Dahoon06</Link>
                    All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
