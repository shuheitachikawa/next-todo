import Link from "next/link";
import styled from "styled-components";

const Todo = () => {
  return (
    <div className="">
      <h1>Todo</h1>
      <Link href={`/todo`}>戻る</Link>
    </div>
  )
}

export default Todo