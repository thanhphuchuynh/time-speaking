import TimeTeacher from "@/components/time-teacher"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
            Learn to Speak Time in English
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Interactive clock with multiple speaking formats to help you master telling time
          </p>
        </div>

        <TimeTeacher />
      </div>
    </main>
  )
}

