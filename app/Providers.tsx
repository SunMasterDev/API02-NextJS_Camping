import { ThemeProvider } from "./theme-provider"
import { Toaster } from "@/components/ui/sonner"

const Providers = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
    >
        {children}
         <Toaster />
    </ThemeProvider>
    </>
  )
}
export default Providers