import Head from 'next/head';
import Link from 'next/link';

export default function QuizResults() {
  // TODO: Fetch and display actual results
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Quiz Results - SkillBoost</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
      <p className="mb-4">Great job completing the quiz! Your results will be displayed here.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}