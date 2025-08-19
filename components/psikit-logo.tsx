const PsiKitLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg width="32" height="32" viewBox="0 0 100 100" className={`text-blue-600 ${className}`}>
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#3B82F6", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#1D4ED8", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M20 30 Q30 10, 50 30 Q70 10, 80 30 Q70 50, 50 30 Q30 50, 20 30 Z" fill="url(#grad1)" opacity="0.8" />
    <path d="M25 45 Q35 25, 50 45 Q65 25, 75 45 Q65 65, 50 45 Q35 65, 25 45 Z" fill="currentColor" opacity="0.6" />
    <circle cx="35" cy="40" r="3" fill="white" opacity="0.9" />
    <circle cx="65" cy="40" r="3" fill="white" opacity="0.9" />
    <path d="M40 55 Q50 65, 60 55" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
  </svg>
)

export { PsiKitLogo }
