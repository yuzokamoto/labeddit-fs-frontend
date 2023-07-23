import styled from "styled-components";
import axios from "axios"
import ArrowUpIcon from "../svgs/arrow-up.svg"
import ArrowDownIcon from "../svgs/arrow-down.svg"
import { BASE_URL, TOKEN_NAME } from "../constants/constants";

const CommentCardContainer = styled.article`
  background-color: #FBFBFB;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 0.5rem;
  margin-top: 1rem;

  h1 {
    font-size: 18px;
    font-weight: 400;
    padding: 1rem 0;
  }

  p {
    color: #6F6F6F;
    font-size: 12px;
  }
`

const CardFooter = styled.footer`
  display: flex;
  color: #6F6F6F;

  button {
    border: none;

    &:hover {
      cursor: pointer;
    }
  }

  .vote-info {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
  }
`

export default function CommentCard(props) {
  const { comment, fetchComments } = props

  const {
    id,
    postId,
    creator,
    content,
    votesCount
  } = comment

  const voteComment = (e, vote) => {
    e.stopPropagation()

    const body = {
      commentId: id,
      vote: vote
    }

    const axiosConfig = {
      headers: {
        Authorization: window.localStorage.getItem(TOKEN_NAME)
      }
    }

    axios.put(BASE_URL + `/posts/${postId}/comments/${id}/vote`, body, axiosConfig)
      .then(res => {
        fetchComments()
      })
      .catch(err => console.log(err))
  }

  return (
    <CommentCardContainer>
      <p>Enviado por: {creator.nickname}</p>

      <h1>{content}</h1>

      <CardFooter>
        <section className="vote-info">
          <button onClick={(e) => voteComment(e, true)}>
            <img className="vote-icon" src={ArrowUpIcon} alt="Vote up" />
          </button>

          <span>{votesCount}</span>

          <button onClick={(e) => voteComment(e, false)}>
            <img className="vote-icon" src={ArrowDownIcon} alt="Vote down" />
          </button>
        </section>
      </CardFooter>
    </CommentCardContainer>
  );
}