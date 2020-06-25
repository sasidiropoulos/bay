import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import RedditContext from '../../context/reddit/redditContext'
import { SubredditPost } from '../subreddit/SubredditPost'
import { Comments } from './Comments'
import { motion } from 'framer-motion'
import { parentVariants } from '../../utils/variants'

interface PostProps
  extends RouteComponentProps<{
    subreddit: string
    id: string
    title: string
    name: string
  }> {}

export const Post: React.FC<PostProps> = ({ match }) => {
  const {
    params: { subreddit, id, title, name }
  } = match
  const redditContext = useContext(RedditContext)
  const { post, comments, clearPostDetail, getPostDetail } = redditContext

  useEffect(() => {
    getPostDetail!(`${subreddit}/comments/${id}/${title}`, name)

    return () => {
      clearPostDetail!()
    }
  }, [])

  console.log(post)

  return (
    <Container variants={parentVariants} initial='hidden' animate='visible'>
      {post && (
        <>
          <SubredditPost post={post} />
        </>
      )}
      {comments && (
        <>
          <Comments comments={comments} />
        </>
      )}
    </Container>
  )
}

const Container = styled(motion.div)`
  padding: 6rem 1rem 1rem 1rem;
`