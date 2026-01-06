import SectionHeader from '../components/shared/section-header';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sarabun dark:bg-zinc-800">
      <SectionHeader
        title="Testimonials"
        description="Real Words from Happy Customers"
      />
    </div>
  );
}
