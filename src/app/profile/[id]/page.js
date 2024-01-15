"use client"
import { ArrowLeftCircle, Copy } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dateFormat from 'dateformat'
import Image from 'next/image'
import Link from 'next/link'
import copy from 'clipboard-copy';
import { toast } from 'react-toastify'

const Profile = ({ params }) => {

    const [profile, setprofile] = useState({})
    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState(null)
    const [defaultpic, setdefaultpic] = useState(true)
    const router = useRouter()

    // Fetch user repositories

    const handleSubmit = async () => {
        setisLoading(true);
        setdefaultpic(false);
        try {
            // Fetch user profile information
            const profileRes = await fetch(`https://api.github.com/users/${params.id}`);
            const profileData = await profileRes.json();

            // Fetch user repositories
            const reposRes = await fetch(`https://api.github.com/users/${params.id}/repos`);
            const reposData = await reposRes.json();

            // Calculate most used language
            const languageCounts = {};
            reposData.forEach(repo => {
                if (repo.language) {
                    languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
                }
            });
            const mostUsedLanguage = Object.keys(languageCounts).reduce((a, b) => languageCounts[a] > languageCounts[b] ? a : b);



            setprofile({
                ...profileData,
                repos: reposData,
                mostUsedLanguage: mostUsedLanguage,
            });
            console.log(reposData, "profile");
            seterror(null)
            setisLoading(false);
        } catch (error) {
            console.error(error.message);
            seterror("User not found");
            setisLoading(false);
        }
    };

    const handleCopy = async (url) => {

        await copy(url);
        toast.success('Copied!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "dark",

        });

    };

    useEffect(() => {
        if (params.id) {
            handleSubmit()
        }
    }, [params.id])



    return (
        <>
            {
                isLoading ?
                    <div className='h-screen w-screen flex items-center justify-center'>loading...</div>
                    :
                    <div className='h-screen w-screen p-8 bg-[#161A30] flex flex-col space-y-3 overflow-hidden'>
                        <div onClick={() => router.push("/")}>
                            <ArrowLeftCircle className='text-gray-200 h-8 cursor-pointer w-8' />
                        </div>
                        <div className='flex items-center justify-between gap-7'>
                            <div className='flex items-start justify-start gap-3'>
                                <div>
                                    <Image className='rounded-full' src={profile?.avatar_url} width={100} height={100} alt={profile?.name} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h4 className='capitalize text-lg font-normal text-white'>{profile?.name}</h4>
                                    <h5 className='text-[#3468C0] text-sm'>@{profile?.login}</h5>
                                </div>
                            </div>
                            <div>
                                <h5 className='capitalize text-xs font-normal text-white'>Create at {dateFormat(profile?.created_at, "dd mmm yyyy")}</h5>
                            </div>
                        </div>
                        <div className='flex flex-wrap items-center border-[0.5px] border-gray-300 rounded-md p-3 justify-between bg-blue-100'>
                            <div className="w-full sm:w-1/2 md:w-1/12 lg:w-1/12 xl:w-1/12 text-left mb-2 sm:mb-0 border-r-[1px] border-blue-200">
                                <h5 className="font-bold text-blue-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    S.no
                                </h5>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-2/12 lg:w-2/12 xl:w-2/12 text-left mb-2 sm:mb-0 border-r-[1px] border-blue-200">
                                <h5 className="font-bold text-blue-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    Repo name
                                </h5>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-2/12 lg:w-2/12 xl:w-2/12 text-left mb-2 sm:mb-0 border-r-[1px] border-blue-200">
                                <h5 className="font-bold text-blue-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    Creation date
                                </h5>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-2/12 lg:w-2/12 xl:w-2/12 text-left mb-2 sm:mb-0 border-r-[1px] border-blue-200">
                                <h5 className="font-bold text-blue-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    Clone Url
                                </h5>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-2/12 lg:w-2/12 xl:w-2/12 text-left mb-2 sm:mb-0 border-r-[1px] border-blue-200">
                                <h5 className="font-bold text-blue-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    Language
                                </h5>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-2/12 lg:w-2/12 xl:w-2/12 text-left mb-2 sm:mb-0">
                                <h5 className="font-bold text-blue-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    Link
                                </h5>
                            </div>
                        </div>



                        <div className='h-full overflow-y-scroll flex flex-col space-y-2'>
                            {profile?.repos && profile?.repos.map((item, index) => {
                                return (

                                    <div key={item?.id} className='flex flex-wrap items-center border-[0.5px] border-gray-200 rounded-md p-3 justify-between bg-gray-100'>
                                        <div className="w-full sm:w-1/2 md:w-1/12 lg:w-1/12 xl:w-1/12 text-left mb-2 sm:mb-0 border-r-[1px] border-gray-300">
                                            <h5 className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                                                {index + 1}
                                            </h5>
                                        </div>
                                        <div className="w-full sm:w-1/2 md:w-2/12 lg:w-2/12 xl:w-2/12 text-left mb-2 sm:mb-0 border-r-[1px] border-gray-300">
                                            <h5 className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                                                {item?.name}
                                            </h5>
                                        </div>
                                        <div className="w-full sm:w-1/2 md:w-2/12 lg:w-2/12 xl:w-2/12 text-left mb-2 sm:mb-0 border-r-[1px] border-gray-300">
                                            <h5 className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                                                {dateFormat(item?.created_at, "dd mmm yyyy")}
                                            </h5>
                                        </div>
                                        <div className="w-full sm:w-1/2 md:w-2/12 lg:w-2/12 xl:w-2/12 text-left mb-2 sm:mb-0 border-r-[1px] border-gray-300 flex items-center gap-1">
                                            <h5 className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                                                {item?.clone_url}
                                            </h5>
                                            <span className='mr-2 cursor-pointer' onClick={() => handleCopy(item?.clone_url)}>
                                                <Copy />
                                            </span>
                                        </div>
                                        <div className="w-full sm:w-1/2 md:w-2/12 lg:w-2/12 xl:w-2/12 text-left mb-2 sm:mb-0 border-r-[1px] border-gray-300">
                                            <h5 className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                                                {item?.language}
                                            </h5>
                                        </div>
                                        <div className="w-full sm:w-1/2 md:w-2/12 lg:w-2/12 xl:w-2/12 text-left mb-2 sm:mb-0 flex items-center gap-2">
                                            <Link href={item?.html_url} className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                                                {item?.html_url}
                                            </Link>
                                            <span className='mr-2 cursor-pointer' onClick={() => handleCopy(item?.html_url)}>
                                                <Copy />
                                            </span>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
            }

        </>
    )
}

export default Profile