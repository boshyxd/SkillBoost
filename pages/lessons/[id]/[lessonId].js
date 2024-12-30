import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../../../hooks/useAuth';
import { ProgressTracker } from '../../../components/lessons/ProgressTracker';
import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc, setDoc, getDocs, collection } from 'firebase/firestore';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { FaArrowRight, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { LessonNavigation } from '../../../components/lessons/LessonNavigation';

// Add Quiz component
const Quiz = ({ quiz, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    const correct = index === quiz.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
    if (correct) {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-lg p-6 mt-8"
    >
      <h3 className="text-2xl font-serif mb-6">Quiz</h3>
      <div className="space-y-6">
        <div className="text-lg text-gray-800 font-medium">{quiz.question}</div>
        
        <div className="space-y-3">
          {quiz.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 rounded-lg text-left transition-colors duration-200 ${
                selectedAnswer === index
                  ? index === quiz.correctAnswer
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
              disabled={showExplanation && isCorrect}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedAnswer === index && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-2"
                  >
                    {index === quiz.correctAnswer ? (
                      <FaCheckCircle className="text-green-500 text-xl" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-xl" />
                    )}
                  </motion.span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            <p className="font-medium mb-2">
              {isCorrect ? 'Correct!' : 'Try again!'}
            </p>
            <p className="text-sm">{quiz.explanation}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default function LessonPage() {
  const router = useRouter();
  const { id, lessonId, skillTitle, lessonData } = router.query;
  const { user } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [skillProgress, setSkillProgress] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id || !lessonId || !user) {
        console.log('Missing required data:', { id, lessonId, user });
        return;
      }

      setLoading(true);
      setError(null);
      setProgress(null); // Reset progress when fetching new lesson

      try {
        // Fetch all lessons for this skill
        const lessonsSnapshot = await getDocs(collection(db, `skills/${id}/lessons`));
        const lessons = lessonsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => a.order - b.order);
        setAllLessons(lessons);

        // Fetch skill progress to get all completed lessons
        const skillProgressRef = doc(db, 'users', user.uid, 'skillProgress', id);
        const skillProgressDoc = await getDoc(skillProgressRef);
        if (skillProgressDoc.exists()) {
          setSkillProgress(skillProgressDoc.data());
        }

        // Fetch current lesson data
        const lessonPath = `skills/${id}/lessons/${lessonId}`;
        console.log('Fetching lesson from path:', lessonPath);
        const lessonDoc = await getDoc(doc(db, lessonPath));
        console.log('Lesson doc exists:', lessonDoc.exists());

        if (!lessonDoc.exists()) {
          throw new Error('Lesson not found');
        }

        console.log('Found lesson in Firestore');
        const lessonData = lessonDoc.data();

        // Fetch user's progress for this specific lesson
        let progressData = null;
        try {
          const progressDoc = await getDoc(doc(db, 'users', user.uid, 'progress', `${id}_${lessonId}`));
          if (progressDoc.exists()) {
            progressData = progressDoc.data();
          }
        } catch (progressError) {
          console.error('Error fetching progress:', progressError);
          // Don't throw here, just log the error and continue without progress data
        }
        
        setLesson(lessonData);
        setProgress(progressData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, lessonId, user, router.query]);

  const handleProgressUpdate = async (progressData) => {
    if (!user || !id || !lessonId) return;

    try {
      // Save progress
      const progressRef = doc(db, 'users', user.uid, 'progress', `${id}_${lessonId}`);
      const progressDoc = await getDoc(progressRef);
      
      if (!progressDoc.exists()) {
        await setDoc(progressRef, {
          ...progressData,
          skillId: id,
          skillTitle: skillTitle || lesson.title,
          lessonId,
          lessonTitle: lesson.title,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } else {
        await updateDoc(progressRef, {
          ...progressData,
          updatedAt: new Date().toISOString()
        });
      }

      // If lesson is completed (progress is 100%), update user's skill progress
      if (progressData.progress === 100) {
        const skillProgressRef = doc(db, 'users', user.uid, 'skillProgress', id);
        const skillProgressDoc = await getDoc(skillProgressRef);
        
        let newCompletedLessons;
        const totalLessons = allLessons.length;

        if (!skillProgressDoc.exists()) {
          newCompletedLessons = [lessonId];
          // Create skill progress document if it doesn't exist
          await setDoc(skillProgressRef, {
            skillId: id,
            skillTitle: skillTitle || lesson.title,
            completedLessons: newCompletedLessons,
            totalLessons,
            lastCompletedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        } else {
          const existingCompletedLessons = skillProgressDoc.data().completedLessons || [];
          if (!existingCompletedLessons.includes(lessonId)) {
            newCompletedLessons = [...existingCompletedLessons, lessonId];
            // Update skill progress
            await updateDoc(skillProgressRef, {
              completedLessons: newCompletedLessons,
              totalLessons,
              lastCompletedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
          } else {
            newCompletedLessons = existingCompletedLessons;
          }
        }

        // Update userSkills collection
        const userSkillRef = doc(db, 'userSkills', `${user.uid}_${id}`);
        await setDoc(userSkillRef, {
          userId: user.uid,
          skillId: id,
          skillTitle: skillTitle || lesson.title,
          progress: (newCompletedLessons.length / totalLessons) * 100,
          completedLessons: newCompletedLessons,
          totalLessons,
          lastCompletedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, { merge: true });

        // Update local state
        setProgress(progressData);
        setSkillProgress(prev => ({
          ...prev,
          completedLessons: newCompletedLessons,
          totalLessons
        }));
      }
    } catch (err) {
      console.error('Error updating progress:', err);
      setError('Failed to update progress');
    }
  };

  const handleQuizComplete = async () => {
    if (!user || !id || !lessonId) return;

    try {
      // Save progress with 100% completion
      const progressRef = doc(db, 'users', user.uid, 'progress', `${id}_${lessonId}`);
      const progressDoc = await getDoc(progressRef);
      
      const progressData = {
        progress: 100,
        quizScore: 100,
        lastQuizAttempt: new Date().toISOString()
      };

      if (!progressDoc.exists()) {
        await setDoc(progressRef, {
          ...progressData,
          skillId: id,
          skillTitle: skillTitle || lesson.title,
          lessonId,
          lessonTitle: lesson.title,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } else {
        await updateDoc(progressRef, {
          ...progressData,
          updatedAt: new Date().toISOString()
        });
      }

      // Update user's skill progress
      const skillProgressRef = doc(db, 'users', user.uid, 'skillProgress', id);
      const skillProgressDoc = await getDoc(skillProgressRef);
      
      let newCompletedLessons;
      const totalLessons = allLessons.length;

      if (!skillProgressDoc.exists()) {
        newCompletedLessons = [lessonId];
        await setDoc(skillProgressRef, {
          skillId: id,
          skillTitle: skillTitle || lesson.title,
          completedLessons: newCompletedLessons,
          totalLessons,
          lastCompletedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } else {
        const existingCompletedLessons = skillProgressDoc.data().completedLessons || [];
        if (!existingCompletedLessons.includes(lessonId)) {
          newCompletedLessons = [...existingCompletedLessons, lessonId];
          await updateDoc(skillProgressRef, {
            completedLessons: newCompletedLessons,
            totalLessons,
            lastCompletedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        } else {
          newCompletedLessons = existingCompletedLessons;
        }
      }

      // Update local state
      setProgress(progressData);
      setSkillProgress(prev => ({
        ...prev,
        completedLessons: newCompletedLessons,
        totalLessons
      }));
    } catch (err) {
      console.error('Error updating progress:', err);
      setError('Failed to update progress');
    }
  };

  // Add this function to handle next lesson navigation
  const goToNextLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      router.push(`/lessons/${id}/${nextLesson.id}?skillTitle=${encodeURIComponent(skillTitle || '')}`);
    }
  };

  // Helper function to clean HTML content
  const cleanContent = (content) => {
    if (!content) return '';
    // Remove extra spaces around commas
    return content.replace(/\s*,\s*/g, ', ');
  };

  // Add this function to check if there's a next lesson
  const hasNextLesson = () => {
    if (!allLessons.length) return false;
    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    return currentIndex < allLessons.length - 1;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <p>The requested lesson could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Header */}
            <header className="text-center lg:text-left">
              <h1 className="text-3xl font-serif mb-3 text-gray-900">
                {lesson.title}
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                {lesson.description}
              </p>
            </header>

            {/* Lesson Content */}
            <article className="prose prose-lg prose-slate max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {cleanContent(lesson.content)}
              </ReactMarkdown>
            </article>

            {/* Key Takeaways */}
            {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
              <section className="border-t border-gray-100 pt-8">
                <h2 className="text-2xl font-serif mb-4 text-gray-900">Key Takeaways</h2>
                <ul className="space-y-6">
                  {lesson.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="space-y-2">
                      <div className="flex items-start gap-3">
                        <span className="select-none font-serif text-blue-600 text-lg">•</span>
                        <p className="text-gray-700 font-medium">
                          {typeof takeaway === 'string' ? takeaway : takeaway.point}
                        </p>
                      </div>
                      {takeaway.explanation && (
                        <p className="text-gray-600 ml-6 text-sm">
                          {takeaway.explanation}
                        </p>
                      )}
                      {takeaway.examples && takeaway.examples.length > 0 && (
                        <ul className="ml-8 space-y-1">
                          {takeaway.examples.map((example, exIndex) => (
                            <li key={exIndex} className="text-gray-600 text-sm list-disc">
                              {example}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Progress Tracker */}
            <section className="border-t border-gray-100 pt-8">
              <ProgressTracker
                lessonId={lessonId}
                skillId={id}
                tasks={[lesson.task?.description || 'Complete the lesson tasks']}
                taskDetails={[{
                  description: lesson.task?.description || '',
                  prerequisites: lesson.task?.prerequisites || [],
                  steps: lesson.task?.steps || [],
                  tips: lesson.task?.tips || [],
                  commonMistakes: lesson.task?.commonMistakes || [],
                  verificationSteps: lesson.task?.steps?.map(step => `Complete: ${step}`) || [],
                  example: lesson.task?.example || '',
                  codeExamples: lesson.task?.codeExamples || ''
                }]}
                onProgressUpdate={handleProgressUpdate}
                initialProgress={progress}
              />
            </section>

            {/* Add Quiz Section */}
            {lesson.quiz && (
              <Quiz 
                quiz={lesson.quiz} 
                onComplete={handleQuizComplete}
              />
            )}

            {/* Next Lesson Button */}
            {progress?.progress === 100 && hasNextLesson() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center border-t border-gray-100 pt-8"
              >
                <button
                  onClick={goToNextLesson}
                  className="group px-8 py-3 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
                >
                  Continue to Next Lesson
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* Completion Message */}
            {progress?.progress === 100 && !hasNextLesson() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center border-t border-gray-100 pt-8"
              >
                <div className="text-center">
                  <h3 className="text-xl font-serif text-gray-900 mb-2">Congratulations!</h3>
                  <p className="text-gray-600">You've completed this lesson.</p>
                  {allLessons.length > 1 && (
                    <p className="text-gray-600 mt-2">
                      Continue with the next lesson to complete the skill.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Lesson Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <LessonNavigation
                lessons={allLessons}
                currentLessonId={lessonId}
                completedLessons={skillProgress?.completedLessons || []}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}