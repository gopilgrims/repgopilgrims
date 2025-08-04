import { Building2 } from "lucide-react";

interface CompanyLogoProps {
  logoUrl?: string | null;
  companyName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CompanyLogo({ logoUrl, companyName, size = "md", className = "" }: CompanyLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6"
  };

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`${companyName} logo`}
        className={`${sizeClasses[size]} object-contain rounded ${className}`}
        onError={(e) => {
          // Fallback to default icon if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLDivElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} bg-gray-100 rounded flex items-center justify-center ${className}`}>
      <Building2 className={`${iconSizes[size]} text-gray-400`} />
    </div>
  );
}