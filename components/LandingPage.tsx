import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#1a1b1e] dark:bg-[#1a1b1e] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">Test Your Math Skills</h1>
          <p className="text-gray-400">
           Banking/Scc Score Booster Challenge yourself with our banking quiz featuring operations like square root, square, cube, cube root, and
            multiplication.
          </p>
          <Link
            href="Quizes"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#3b82f6] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#2563eb] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            prefetch={false}
          >
            Take the Quiz
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <SquareIcon className="h-8 w-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-400">Square Root</span>
          </div>
          <div className="flex flex-col items-center">
            <SquareIcon className="h-8 w-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-400">Square</span>
          </div>
          <div className="flex flex-col items-center">
            <CuboidIcon className="h-8 w-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-400">Cube</span>
          </div>
          <div className="flex flex-col items-center">
            <CuboidIcon className="h-8 w-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-400">Cube Root</span>
          </div>
          <div className="flex flex-col items-center">
            <SquareDivideIcon className="h-8 w-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-400">Multiplication</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CuboidIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z" />
      <path d="M10 22v-8L2.25 9.15" />
      <path d="m10 14 11.77-6.87" />
    </svg>
  )
}


function SquareDivideIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="8" x2="16" y1="12" y2="12" />
      <line x1="12" x2="12" y1="16" y2="16" />
      <line x1="12" x2="12" y1="8" y2="8" />
    </svg>
  )
}


function SquareIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  )
}