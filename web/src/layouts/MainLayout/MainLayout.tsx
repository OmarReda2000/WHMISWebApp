type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="py-5 bg-green-800">
        <p className="text-6xl text-white font-semibold text-center ">WHOSS</p>
        <p className="text-xl text-white text-center">
          Wireless Home Occupancy Security System
        </p>
      </div>
      {children}
    </div>
  )
}

export default MainLayout
