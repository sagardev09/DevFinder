"use client"
import { Building2, Link, MapPin, Twitter } from 'lucide-react'
import Image from 'next/image'
import React, { useRef,useState } from 'react'
import { useRouter } from 'next/navigation'
import dateFormat from 'dateformat'
import * as htmlToImage from 'html-to-image';
import './Card.css'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

const DevProfile = ({ profile }) => {
    const profileRef = useRef();
    const router = useRouter();
  
    const downloadAsImage = () => {
      htmlToImage.toPng(profileRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'devProfile.png';
          link.click();
        });
    };
  
    const handleMouseEnter = () => {
      const bounds = profileRef.current?.getBoundingClientRect();
      if (bounds) {
        document.addEventListener('mousemove', rotateToMouse);
      }
    };
  
    const handleMouseLeave = () => {
      document.removeEventListener('mousemove', rotateToMouse);
      resetCardTransform();
    };
  
    const resetCardTransform = () => {
      profileRef.current.style.transform = '';
      profileRef.current.querySelector('#glow').style.backgroundImage = '';
    };
  
    const rotateToMouse = (e) => {
      const bounds = profileRef.current?.getBoundingClientRect();
      if (bounds) {
        const mouseX = e.clientX - bounds.x || 0;
        const mouseY = e.clientY - bounds.y || 0;
        const center = {
          x: mouseX - bounds.width / 2,
          y: mouseY - bounds.height / 2,
        };
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
  
        profileRef.current.style.transform = `
          scale3d(1.07, 1.07, 1.07)
          rotate3d(
            ${center.y / 100},
            ${-center.x / 100},
            0,
            ${Math.log(distance) * 2}deg
          )
        `;
  
        profileRef.current.querySelector('#glow').style.backgroundImage = `
          radial-gradient(
            circle at ${center.x * 2 + bounds.width / 2}px
            ${center.y * 2 + bounds.height / 2}px,
            #ffffff55,
            #0000000f
          )
        `;
      }
    };
    


    return (
        <div className='flex flex-col justify-center items-center'>
            <div 
            ref={profileRef} 
             id='card' 
             className='shadow-2xl w-full flex flex-col  bg-gray-700 rounded-md relative'
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
                >
                <div id="glow" />
                <div className='w-full rounded-tr-md rounded-tl-md'>
                    <Image className='w-full h-[150px]  object-cover object-center rounded-tr-md rounded-tl-md' src={profile?.codingimg} alt={profile.name} width={100} height={100} />
                </div>
                <div className='flex flex-col space-y-4 p-4 py-6'>

                    <div className='flex items-start justify-between'>
                        <div className='flex items-start justify-start gap-4'>
                            <div>
                                <Image className='rounded-3xl' src={profile?.avatar_url} width={100} height={100} alt={profile?.name} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='capitalize text-lg font-normal text-white'>{profile?.name}</h4>
                                <h5 className='text-[#3468C0] text-sm'>@{profile?.login}</h5>
                            </div>
                        </div>
                        <div>
                            <h5 className='capitalize text-xs font-normal text-white'>{dateFormat(profile?.created_at, "dd mmm yyyy")}</h5>
                            <h5 onClick={() => router.push(`/profile/${profile?.login}`)} className='bg-blue-500 p-2 px-4 text-[10px] mt-2 text-white cursor-pointer rounded-xl'>More info</h5>
                        </div>
                    </div>
                    <div className='flex items-center justify-between my-3'>
                        <h5 className='capitalize text-sm font-normal text-slate-300'>{profile?.bio ? profile.bio : "This profile has no bio"}</h5>
                        <h5 className='capitalize text-sm font-normal text-slate-300'>Most used language : {profile?.mostUsedLanguage}</h5>
                    </div>
                    <span className="relative flex justify-center">
                        <div
                            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                        ></div>
                    </span>
                    <div className='flex items-center justify-evenly bg-gray-600 rounded-md p-3'>
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
                    <span className="relative flex justify-center">
                        <div
                            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                        ></div>
                    </span>
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
                <span
                    className="absolute inset-x-0 bottom-0 h-1 rounded-bl-sm rounded-br-sm bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                ></span>
            </div>
            
            <div className='w-full text-center bg-blue-500 text-white p-3 cursor-pointer rounded-md mt-3'>
                <button className='w-3/5' onClick={downloadAsImage}>Download</button>
            </div>
        </div>
    );
};

export default DevProfile