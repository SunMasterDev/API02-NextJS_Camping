import { DarkMode } from "./DarkMode"
import DropDownListMenu from "./DropDownListMenu"
import Logo from "./Logo"
import Search from "./Search"

const Navbar = () => {
  return (
    <nav>
       <div className="container flex flex-col justify-between
       py-8 sm:flex-row sm:items-center gap-4">
         {/* Logo */}
        <Logo/>
        {/* search */}
        <Search/>
        {/* DarkMode & Profile */}
        <div className="flex gap-4">
            <DarkMode/>
            <DropDownListMenu/>
        </div>
       </div>
    </nav>
  )
}
export default Navbar