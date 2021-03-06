import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import Head from 'next/head'

export default function Container({ children }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  return (
    <>
      <Head>
        <title>Hello Nerds</title>
      </Head>

      <div className="min-h-screen max-w-2xl mx-auto">
        <nav className="flex justify-between items-center w-full py-8">
          <div className="">
            <NextLink href="/">
              <a className="text-gray-400 dark:text-gray-700">
                <svg className="h-6" viewBox="0 0 44 10">
                  <g className="fill-current">
                    <rect y="0" x="0" height="10" width="10" />
                    <circle cx="17" cy="5" r="5" />
                    <path d="M 33.990061,10 33.995261,9.99477 24,0 v 9.999966 z" />
                    <path d="M 38.980059,9.6432493e-6 A 5,5 0 0 0 34,4.9997043 5,5 0 0 0 38.999694,9.9999159 5,5 0 0 0 43.999906,4.9997043 5,5 0 0 0 38.999694,9.6432493e-6 a 5,5 0 0 0 -0.01964,0 z M 38.999699,2.8194757 A 2.1802361,2.1802361 0 0 1 41.18044,4.9997043 2.1802361,2.1802361 0 0 1 38.999694,7.1799331 2.1802361,2.1802361 0 0 1 36.819466,4.9997043 2.1802361,2.1802361 0 0 1 38.999694,2.8194757 Z" />
                  </g>
                </svg>
              </a>
            </NextLink>
          </div>

          <div className="flex items-center">
            {/* <NextLink href="/">
              <a className="p-1 sm:p-4 text-gray-600 dark:text-gray-600">Home</a>
            </NextLink> */}

            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="h-6 w-6 ml-4 relative overflow-hidden rounded focus:ring-gray-400 focus:outline-none focus:ring-2"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && (
                <>
                  {/* Sun */}
                  <svg
                    className={`absolute inset-0 w-6 h-6 transform transition duration-200 ease-in-out text-gray-500 ${
                      theme === 'dark' ? 'translate-y-0' : 'translate-y-full'
                    } hover:text-white`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>

                  {/* Moon */}
                  <svg
                    className={`absolute inset-0 w-6 h-6 transform transition duration-200 ease-in-out text-gray-400 ${
                      theme === 'dark' ? '-translate-y-full' : 'translate-y-0'
                    } hover:text-gray-900`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    ></path>
                  </svg>
                </>
              )}
            </button>
          </div>
        </nav>

        <main>{children}</main>
      </div>
    </>
  )
}
