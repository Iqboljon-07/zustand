import React from "react";
import logo from "../../assets/book.gif";
import useStore from "../../utils/zustand";

function Navbar() {
  const { datas } = useStore();
  return (
    <>
      <nav>
        <img src={logo} alt="" />
        <button>{datas.length} </button>
      </nav>
    </>
  );
}

export default Navbar;
