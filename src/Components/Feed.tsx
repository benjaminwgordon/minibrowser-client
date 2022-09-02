import React, { useEffect, useState } from 'react'
import Post from './Post'
import fetchPosts from '../API/fetchPosts'

const Feed = () => {

  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetch = async () => {
        console.log('first')
        const data = await fetchPosts()
        console.log(data)
        if (data.data === undefined){
            console.log('empty posts return value')
        }
        else {
            setPosts(data)
        }
    }
    fetch()
  },[posts])

  return (
    <div>
        <Post/>
        <Post/>
    </div>
  )
}

export default Feed