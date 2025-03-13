import Link from 'next/link'
import { Github } from 'lucide-react'
import { Button } from './ui/button'

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="font-semibold">
          Time Speaking Made By ThanhPhucHuynh
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/thanhphuchuynh" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
