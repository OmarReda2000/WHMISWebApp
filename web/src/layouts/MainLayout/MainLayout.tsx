import { routes, navigate } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

type MainLayoutProps = {
  children?: React.ReactNode
}
// flex flex-col h-screen
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Toaster
        position="top-center"
        toastOptions={{ success: { duration: 2000 } }}
      />
      <div className="py-5 bg-green-800 shadow-lg flex flex-col justify-center">
        <button onClick={() => navigate(routes.home())} className="m-auto">
          <p className="text-6xl text-white font-semibold text-center ">
            WHOSS
          </p>
        </button>
        <button onClick={() => navigate(routes.home())} className="m-auto">
          <p className="text-xl text-white text-center">
            Wireless Home Occupancy Security System
          </p>
        </button>
      </div>
      {children}
    </div>
  )
}

export default MainLayout
