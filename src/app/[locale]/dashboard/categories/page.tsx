export default function Page() {
  // !throw this error to test the error boundary
  throw new Error(
    'An error occurred while loading the categories. Please try again later.',
  );
  return <div>categories</div>;
}
