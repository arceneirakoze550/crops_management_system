const Card = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`bg-[#0f0f16] border border-white/[0.06] rounded-xl p-5 ${hover ? 'hover:border-white/[0.1] transition-all duration-300' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
