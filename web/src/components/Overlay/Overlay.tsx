type OverlayProps = {
  children: JSX.Element
  onClick?: (item: unknown) => void
}
const Overlay = ({ children, onClick = null }: OverlayProps) => {
  const handleClick = () => {
    onClick && onClick(null)
  }

  return (
    <button
      className="w-full h-full fixed block top-0 left-0 bg-gray-600 bg-opacity-75 z-50 hover:cursor-default"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Overlay
