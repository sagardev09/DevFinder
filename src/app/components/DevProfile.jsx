"use client"
import { Building2, Link, MapPin, Twitter } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import dateFormat from 'dateformat'
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

const DevProfile = ({ profile }) => {

    const profileRef = useRef();
    const router = useRouter()

    const downloadAsImage = () => {
        htmlToImage.toPng(profileRef.current)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'devProfile.png';
                link.click();
            });
    };


    return (
        <>

            <div ref={profileRef} className='max-w-xl shadow-2xl w-full my-4 p-4 flex flex-col space-y-4 bg-gray-700 rounded-md'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-start justify-start gap-4'>
                        <div>
                            <Image className='rounded-full' src={profile?.avatar_url} width={100} height={100} alt={profile?.name} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h4 className='capitalize text-lg font-normal text-white'>{profile?.name}</h4>
                            <h5 className='text-[#3468C0] text-sm'>@{profile?.login}</h5>
                        </div>
                    </div>
                    <div>
                        <h5 className='capitalize text-xs font-normal text-white'>{dateFormat(profile?.created_at, "dd mmm yyyy")}</h5>
                    </div>
                </div>
                <div className='flex items-center justify-between my-3'>
                    <h5 className='capitalize text-sm font-normal text-slate-300'>{profile?.bio ? profile.bio : "This profile has no bio"}</h5>
                    <h5 className='capitalize text-sm font-normal text-slate-300'>Most used language : {profile?.mostUsedLanguage}</h5>
                </div>
                <div className='flex items-center justify-evenly bg-gray-600 rounded-md p-2'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <h4 className='capitalize text-base font-medium text-white'>Repo</h4>
                        <h5 className='capitalize text-base font-normal text-white'>{profile?.public_repos}</h5>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <h4 className='capitalize text-base font-medium text-white'>Followers</h4>
                        <h5 className='capitalize text-base font-normal text-white'>{profile?.followers}</h5>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <h4 className='capitalize text-base font-medium text-white'>Following</h4>
                        <h5 className='capitalize text-base font-normal text-white'>{profile?.following}</h5>
                    </div>
                </div>
                <div className='flex  flex-col space-y-4 my-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 flex-1'>
                            <MapPin className='text-gray-400' />
                            <h5 className='capitalize text-base font-normal text-gray-400'>{profile?.location ? profile.location : "Not Available"}</h5>
                        </div>
                        <div className='flex items-center gap-2 flex-1'>
                            <Link className='text-gray-400' />
                            <h5 onClick={() => router.push(profile?.html_url)} href={profile?.html_url} className=' cursor-pointer text-base font-normal text-gray-400'>{profile?.html_url}</h5>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 flex-1'>
                            <Twitter className='text-gray-400' />
                            <h5 className='text-base font-normal text-gray-400'>{profile?.twitter_username ? profile?.twitter_username : "Not Available"}</h5>
                        </div>
                        <div className='flex items-center gap-2 flex-1'>
                            <Building2 className='text-gray-400' />
                            <h5 className='capitalize text-base font-normal text-gray-400'>{profile?.company ? profile?.company : "Not Available"}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full text-center bg-purple-500 text-white p-3 cursor-pointer rounded-md'>
                <button className='w-full' onClick={downloadAsImage}>Download</button>
            </div>
        </>
    )
}

export default DevProfile