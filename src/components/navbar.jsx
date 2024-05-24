import React from "react";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center p-2 mx-auto w-3/5 shadow-md rounded-lg mt-2 border">
      <Link to="/">
        <Button className="text-2xl text-green-700 hover:text-green-500" variant="ghost">HealthTrack</Button>
      </Link>
      <div className="ms-auto">
        <Link to="/">
          <Button variant="link">Календарь</Button>
        </Link>
        <Link to="/receipts/create">
          <Button variant="link">Назначение</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
