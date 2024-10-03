import { Outlet } from "react-router-dom";
import Navbar from "../header/Navbar";

export default function Layout(){
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}