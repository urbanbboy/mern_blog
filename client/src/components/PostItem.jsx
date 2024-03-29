import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { Loader } from './Loader/Loader'

export const PostItem = ({ post }) => {
    if (!post) return <Loader />
    return (
        <Link to={`/${post._id}`}>
            <div className='flex flex-col basis-1/4 flex-grow'>
                <div
                    className={
                        post.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'
                    }
                >
                    {post.imgUrl && (
                        <img
                            src={`https://mern-app-7eoi.onrender.com/${post.imgUrl}`}
                            alt='img'
                            className='object-cover w-full'
                        />
                    )}
                </div>
                <div className='flex justify-between items-center pt-2'>
                    <div className='text-xs text-white opacity-50'>
                        {post.username}
                    </div>
                    <div className='text-xs text-white opacity-50'>
                        <Moment date={post.createdAt} format='D MMM YYYY' />
                    </div>
                </div>
                <div className='text-white text-xl'>{post.title}</div>
                <p className='text-white opacity-60 text-xs pt-4 line-clamp-4'>
                    {post.text}
                </p>

                <div className='flex gap-3 items-center mt-2'>
                    <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                        <AiFillEye /> <span>{post.views}</span>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                        <AiOutlineMessage />{' '}
                        <span>{post.comments?.length || 0} </span>
                    </button>
                </div>
            </div>
        </Link>
    )
}
