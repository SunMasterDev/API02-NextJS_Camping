import { categories } from "@/utils/category"
import Link from "next/link"

const CategoriesList = ({ search, category }: { search?: string, category?: string }) => {
    const searchTerm = search ? `&search=${search}` : ''

    return (
        <div>
            <div className="flex justify-center my-4 font-bold capitalize gap-x-4">
                {
                categories.map((item) => {
                    const isActive=item.label === category
                        return (
                            <Link key={item.label}
                                href={`/?category=${item.label}${searchTerm}`} >
                                <article className={`flex flex-col p-3 gap-2 
                                justify-center items-center hover:text-primary hover:scale-110 hover:duration-300 ${isActive ? 'text-blue-300' : ''}`}>
                                    <item.icon />
                                    <p>{item.label}</p>
                                </article>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default CategoriesList