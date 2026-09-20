import Link from "next/link";
import { FaGlobe, FaGithub, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="mt-16 border-t border-stone-700 ">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-3 ">
        <div>
          <h2 className="text-xl font-bold">
            Recipe<span className="text-green-800">Yab</span>
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-6">
            Discover delicious meals and find recipes you love.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Quick Links</h3>

          <nav className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/" className="hover:text-green-800">
              Home
            </Link>

            <Link href="/categories" className="hover:text-green-800">
              Categories
            </Link>

            <Link href="/profile" className="hover:text-green-800">
              Profile
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-bold">
            Developed by <span className="text-green-800">Arash</span>
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              href="https://safariarash.dev/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-green-800"
            >
              <FaGlobe size={17} />
              Portfolio
            </a>

            <a
              href="https://github.com/ArashSafarighouzhdi"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-green-800"
            >
              <FaGithub size={17} />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/arash-safari/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-green-800"
            >
              <FaLinkedin size={17} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div>
        <p className="py-4 text-center text-sm ">
          © RecipeYab 2026 - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
