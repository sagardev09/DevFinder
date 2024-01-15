"use client"
import Image from "next/image";
import DevProfile from "./components/DevProfile";
import { useState } from "react";
import search from "../../public/search.svg"
import { MagnifyingGlass } from "react-loader-spinner";


export default function Home() {

  const [text, settext] = useState("")
  const [profile, setprofile] = useState({})
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState(null)
  const [defaultpic, setdefaultpic] = useState(true)
  const [repos, setRepos] = useState([]);


  // Fetch user repositories






  const handleSubmit = async (e) => {
    setisLoading(true);
    setdefaultpic(false);
    e.preventDefault();

    try {
      // Fetch user profile information
      const profileRes = await fetch(`https://api.github.com/users/${text}`);
      const profileData = await profileRes.json();

      // Fetch user repositories
      const reposRes = await fetch(`https://api.github.com/users/${text}/repos`);
      const reposData = await reposRes.json();

      // Calculate most used language
      const languageCounts = {};
      reposData.forEach(repo => {
        if (repo.language) {
          languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        }
      });
      const mostUsedLanguage = Object.keys(languageCounts).reduce((a, b) => languageCounts[a] > languageCounts[b] ? a : b);

      // Set state with fetched data
      setprofile({
        ...profileData,
        repos: reposData,
        mostUsedLanguage: mostUsedLanguage
      });
      console.log(profile);

      setisLoading(false);
    } catch (error) {
      console.error(error.message);
      seterror("User not found");
      setisLoading(false);
    }
  };


  return (
    <main className="flex h-screen w-full items-center justify-center  bg-[#161A30]">
      <div className="w-full max-w-xl flex flex-col space-y-4">
        <h1 className=" font-bold text-2xl text-center uppercase text-white">DevFinder</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                value={text}
                onChange={(e) => settext(e.target.value)}
                type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Username" required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>
        </div>

        {profile?.login ? (
          <DevProfile profile={profile} />
        ) : (
          defaultpic && <Image src={search} alt="" className="h-[180px]" />
        )}
        <div className="flex items-center justify-center">
          {
            isLoading && <MagnifyingGlass
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          }
        </div>
        <div className="flex items-center justify-center">
          <h5 className="text-red-500 capitalize"> {error}</h5>
        </div>
      </div>
    </main>
  )
}
