import { Link } from "react-router-dom";

function MinimalHeader() {
  return (
    <header className="text-center py-7 bg-[#F6F6F4]">
      <Link to="/" className="text-4xl font-bold tracking-wide">
        WEARLY
      </Link>
    </header>
  );
}

export default MinimalHeader;
