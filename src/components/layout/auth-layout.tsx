import Image from "next/image";
import AuthToggleLangButton from "../features/auth/auth-toggle-lang-button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // Auth Layout
    <div className="auth-layout grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Form */}
      <div className="auth-form flex flex-col items-center justify-center">
        <div className="container md:w-3/5 mx-auto px-5">
          {/* Toggle Lang Button */}
          <AuthToggleLangButton />

          {/* Form Decorate Shape Top */}
          <div className="form-decorate-top flex justify-center mb-10">
            <div className="image-container relative w-72 h-11">
              <Image src={'/assets/images/auth/form-border-decorate.png'} alt="form border decorate shape" fill priority />
            </div>
          </div>

          {/* Form Content */}
          <div className="form-content-container flex justify-center">
            {children}
          </div>

          {/* Form Decorate Shape bottom */}
          <div className="form-decorate-bottom flex justify-center mt-10">
            <div className="image-container relative w-72 h-11">
              <Image src={'/assets/images/auth/form-border-decorate.png'} alt="form border decorate shape" fill priority className="rotate-180" />
            </div>
          </div>
        </div>
      </div>

      {/* Image Part */}
      <div className="auth-bg relative hidden md:block">
        <Image src={'/assets/images/auth/auth-layout-bg.png'} alt='Decorative gift boxes background' fill priority />
      </div>
    </div>);
}
