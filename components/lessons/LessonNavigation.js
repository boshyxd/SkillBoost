import { useRouter } from 'next/router';
import { FaLock, FaCheck, FaBookOpen } from 'react-icons/fa';

export const LessonNavigation = ({ lessons = [], currentLessonId, completedLessons = [] }) => {
  const router = useRouter();
  const { id: skillId } = router.query;

  const getLessonStatus = (lessonId, index) => {
    if (lessonId === currentLessonId) return 'current';
    if (completedLessons.includes(lessonId)) return 'completed';
    if (index === 0 || completedLessons.includes(lessons[index - 1]?.id)) return 'unlocked';
    return 'locked';
  };

  const navigateToLesson = (lessonId, index) => {
    const status = getLessonStatus(lessonId, index);
    if (status === 'locked') return;
    router.push(`/lessons/${skillId}/${lessonId}?skillTitle=${encodeURIComponent(router.query.skillTitle || '')}`);
  };

  return (
    <div className="border-l border-gray-100 pl-6">
      <h3 className="text-lg font-serif text-gray-900 mb-4">Lessons</h3>
      <div className="space-y-2">
        {lessons.map((lesson, index) => {
          const status = getLessonStatus(lesson.id, index);
          
          return (
            <button
              key={lesson.id}
              onClick={() => navigateToLesson(lesson.id, index)}
              className={`w-full flex items-start gap-3 py-2 px-3 rounded-lg transition-colors ${
                status === 'current'
                  ? 'bg-blue-50 text-blue-700'
                  : status === 'locked'
                  ? 'text-gray-400 cursor-not-allowed'
                  : status === 'completed'
                  ? 'text-gray-700 hover:bg-green-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex-shrink-0 mt-1">
                {status === 'locked' && <FaLock className="w-4 h-4" />}
                {status === 'completed' && <FaCheck className="w-4 h-4 text-green-500" />}
                {status === 'current' && <FaBookOpen className="w-4 h-4 text-blue-600" />}
                {status === 'unlocked' && <FaBookOpen className="w-4 h-4 text-gray-400" />}
              </span>
              <div className={`text-left ${status === 'locked' ? 'text-gray-400' : ''}`}>
                <div className="font-medium">Lesson {index + 1}</div>
                <div className="text-sm">{lesson.title}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}; 