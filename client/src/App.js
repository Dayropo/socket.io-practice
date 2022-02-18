import { useState, useEffect } from "react"
import io from "socket.io-client"
import { FiUser } from "react-icons/fi"

const socket = io("http://localhost:4000")

function App() {
  const [state, setState] = useState({ comment: "" })
  const [comments, setComments] = useState([])

  useEffect(() => {
    socket.on("comment", ({ comment }) => {
      setComments([...comments, { comment }])
      console.log(comments)
    })
  }, [socket, comments])

  const onTextChange = e => {
    setState({ [e.target.name]: e.target.value })
  }

  const onCommentSubmit = e => {
    e.preventDefault()
    const { comment } = state
    socket.emit("comment", { comment })
    setState({ comment: "" })
  }

  return (
    <div className="font-poppins py-8 px-16 items-center">
      <h3>Comments</h3>

      <form onSubmit={onCommentSubmit} className="flex space-x-3 w-full mt-6">
        <div className="rounded-full w-12 h-12 bg-gray-200 flex items-center justify-center">
          <FiUser size={24} />
        </div>
        <input
          type="text"
          name="comment"
          placeholder="Add Comment"
          className="w-3/4 border-gray-200 border-b placeholder:text-sm px-4 py-2 focus-within:border-b-2 focus:border-black"
          onChange={e => onTextChange(e)}
          value={state.comment}
        />
        <input
          type="submit"
          value="Send"
          className="bg-[#000033] py-2 px-8 rounded-lg text-sm text-white"
        />
      </form>

      {comments.map(({ comment }, index) => (
        <div key={index}>
          <div className="flex space-x-3 mt-6">
            <div className="rounded-full w-12 h-12 bg-gray-200 flex items-center justify-center">
              <FiUser size={24} />
            </div>
            <p className="w-full">{comment}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
