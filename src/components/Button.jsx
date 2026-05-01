const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', type = 'button', icon }) => {
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20',
    secondary: 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08]',
    danger: 'bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/20',
    ghost: 'hover:bg-white/[0.06] text-gray-400 hover:text-white'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
