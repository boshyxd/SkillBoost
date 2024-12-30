import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheckCircle, FaCircle, FaInfoCircle, FaLightbulb, FaExclamationTriangle, FaCheck } from 'react-icons/fa'

const TaskContent = ({ task, taskDetails = {}, onComplete, isCompleted }) => {
  const [completedSteps, setCompletedSteps] = useState(new Set());

  useEffect(() => {
    // If the lesson is completed, mark all steps as completed
    if (isCompleted) {
      const allSteps = new Set(taskDetails.steps?.map((_, index) => index) || []);
      setCompletedSteps(allSteps);
    } else {
      setCompletedSteps(new Set());
    }
  }, [isCompleted, taskDetails.steps]);

  const handleStepClick = (index) => {
    if (isCompleted) return; // Don't allow changes if lesson is completed

    const newCompletedSteps = new Set(completedSteps);
    if (completedSteps.has(index)) {
      newCompletedSteps.delete(index);
    } else {
      newCompletedSteps.add(index);
    }
    setCompletedSteps(newCompletedSteps);

    // If all steps are completed, mark the task as complete
    if (newCompletedSteps.size === taskDetails.steps?.length) {
      onComplete();
    }
  };

  return (
    <div className="space-y-8">
      {/* Task Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-serif mb-2 text-gray-900">{task}</h3>
          {taskDetails.description && (
            <p className="text-gray-600 leading-relaxed">{taskDetails.description}</p>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {/* Steps */}
        {taskDetails.steps?.length > 0 && (
          <div>
            <h4 className="text-xl font-serif mb-4 text-gray-900">Steps to Complete</h4>
            <div className="space-y-4">
              {taskDetails.steps.map((step, index) => {
                const isStepCompleted = completedSteps.has(index);
                return (
                  <motion.div
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`flex gap-4 p-4 rounded-lg ${!isCompleted && 'cursor-pointer'} transition-colors ${
                      isStepCompleted ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                    whileTap={!isCompleted ? { scale: 0.995 } : {}}
                  >
                    <motion.span 
                      className="flex-shrink-0 mt-1"
                      initial={false}
                      animate={isStepCompleted ? { scale: [1.2, 1], rotate: [0, 360] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isStepCompleted ? (
                        <FaCheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <FaCircle className="w-5 h-5 text-gray-300" />
                      )}
                    </motion.span>
                    <div className={`flex-1 text-gray-700 leading-relaxed transition-opacity ${
                      isStepCompleted ? 'opacity-50' : ''
                    }`}>
                      <p className="font-medium">{typeof step === 'string' ? step : step.instruction}</p>
                      {step.explanation && (
                        <p className="text-sm text-gray-600 mt-1">{step.explanation}</p>
                      )}
                      {step.tips?.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-sm text-gray-600 flex items-start gap-2">
                              <FaLightbulb className="flex-shrink-0 mt-1 text-yellow-500 w-4 h-4" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tips */}
        {taskDetails.tips?.length > 0 && (
          <div>
            <h4 className="text-xl font-serif mb-4 text-gray-900">Helpful Tips</h4>
            <div className="space-y-3">
              {taskDetails.tips.map((tip, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <FaLightbulb className="flex-shrink-0 mt-1.5 text-yellow-500" />
                  <div className="text-gray-700 leading-relaxed">
                    <p>{typeof tip === 'string' ? tip : tip.tip}</p>
                    {tip.context && (
                      <p className="text-sm text-gray-600 mt-1">{tip.context}</p>
                    )}
                    {tip.examples?.length > 0 && (
                      <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-600 ml-4">
                        {tip.examples.map((example, exIndex) => (
                          <li key={exIndex}>{example}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Common Mistakes */}
        {taskDetails.commonMistakes?.length > 0 && (
          <div>
            <h4 className="text-xl font-serif mb-4 text-gray-900">Watch Out For</h4>
            <div className="space-y-3">
              {taskDetails.commonMistakes.map((mistake, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <FaExclamationTriangle className="flex-shrink-0 mt-1.5 text-red-500" />
                  <div className="text-gray-700 leading-relaxed">
                    <p className="font-medium">{typeof mistake === 'string' ? mistake : mistake.mistake}</p>
                    {mistake.impact && (
                      <p className="text-sm text-gray-600 mt-1">{mistake.impact}</p>
                    )}
                    {mistake.prevention && (
                      <p className="text-sm text-blue-600 mt-2">Prevention: {mistake.prevention}</p>
                    )}
                    {mistake.solution && (
                      <p className="text-sm text-green-600 mt-1">Solution: {mistake.solution}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Examples */}
        {taskDetails.codeExamples && (
          <div>
            <h4 className="text-xl font-serif mb-4 text-gray-900">Example Code</h4>
            <pre className="bg-gray-50 text-gray-800 p-6 rounded-lg overflow-x-auto border border-gray-200 font-mono text-sm">
              <code>{taskDetails.codeExamples}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export const ProgressTracker = ({
  lessonId,
  skillId,
  tasks = [],
  taskDetails = [],
  onProgressUpdate,
  initialProgress = null
}) => {
  const [completedTasks, setCompletedTasks] = useState(
    new Set(initialProgress?.completedTasks || [])
  )

  useEffect(() => {
    setCompletedTasks(new Set(initialProgress?.completedTasks || []));
  }, [lessonId, initialProgress]);

  const handleTaskComplete = async (taskIndex, isComplete) => {
    const newCompletedTasks = new Set(completedTasks);
    
    if (isComplete) {
      newCompletedTasks.add(taskIndex);
    } else {
      newCompletedTasks.delete(taskIndex);
    }
    
    setCompletedTasks(newCompletedTasks);
    const progress = Math.round((newCompletedTasks.size / tasks.length) * 100);
    
    onProgressUpdate({
      progress,
      completedTasks: Array.from(newCompletedTasks),
      updatedAt: new Date().toISOString()
    });
  };

  const isTaskCompleted = (taskIndex) => completedTasks.has(taskIndex);
  const canStartTask = (taskIndex) => taskIndex === 0 || completedTasks.has(taskIndex - 1);

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-serif text-gray-900">Your Progress</h2>
          <span className="text-gray-600">
            {completedTasks.size} of {tasks.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-100 h-1">
          <motion.div
            className="bg-blue-600 h-1"
            initial={{ width: 0 }}
            animate={{ width: `${(completedTasks.size / tasks.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Task Steps */}
      <div>
        {tasks.map((task, index) => (
          <div 
            key={index}
            className={`${!canStartTask(index) ? 'opacity-50' : ''}`}
          >
            <TaskContent
              task={task}
              taskDetails={taskDetails[index]}
              onComplete={() => handleTaskComplete(index, true)}
              isCompleted={isTaskCompleted(index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
} 