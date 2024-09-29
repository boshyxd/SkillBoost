export default function SkillProgressList({ skills, progress }) {
  if (!skills || skills.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Skill Progress</h2>
        <p>No skills available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Skill Progress</h2>
      <ul className="space-y-4">
        {skills.map(skill => {
          const skillProgress = progress ? progress.filter(p => p.skillId === skill.id).length : 0;
          const percentage = skill.lessons && skill.lessons.length > 0 
            ? (skillProgress / skill.lessons.length) * 100 
            : 0;
          return (
            <li key={skill.id} className="flex items-center">
              <span className="w-32 font-medium">{skill.title}</span>
              <div className="flex-grow bg-gray-200 rounded-full h-2.5 ml-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="ml-2">{Math.round(percentage)}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}