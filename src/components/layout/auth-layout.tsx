import Image from 'next/image';
import AuthToggleLangButton from '../features/auth/auth-toggle-lang-button';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // Auth Layout
    <div className="auth-layout grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Form */}
      <div className="auth-form flex flex-col items-center justify-center py-28">
        <div className="container mx-auto px-5 md:w-3/5">
          {/* Toggle Lang Button */}
          <AuthToggleLangButton />

          {/* Form Decorate Shape Top */}
          <div className="form-decorate-top mb-10 flex justify-center">
            <div className="image-container relative h-11 w-72">
              <Image
                src={
                  '/assets/images/auth/form-border-decorate.png'
                }
                alt="form border decorate shape"
                fill
                priority
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="form-content-container">
            {children}
          </div>

          {/* Form Decorate Shape bottom */}
          <div className="form-decorate-bottom mt-10 flex justify-center">
            <div className="image-container relative h-11 w-72">
              <Image
                src={
                  '/assets/images/auth/form-border-decorate.png'
                }
                alt="form border decorate shape"
                fill
                priority
                className="rotate-180"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image Part */}
      <div className="auth-bg relative hidden md:block">
        <Image
          src={'/assets/images/auth/auth-layout-bg.png'}
          alt="Decorative gift boxes background"
          fill
          priority
        />
      </div>
    </div>
  );
}
