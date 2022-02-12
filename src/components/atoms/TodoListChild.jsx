import React, { useState, useEffect } from 'react'
import { Tbody, Tr, Td, Button, Select } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useRecoilState } from 'recoil'
import { todoState } from '../../hooks/TodoState'

const TodoListChild = ({ curPage, itemLimit }) => {
  // TodoState.jsで定義したtodos,setTodosを呼び出し
  const [todos, setTodos] = useRecoilState(todoState)

  // 表示中のtodo数を監視するstateを定義
  const [curItems, setCurItems] = useState([])

  // itemLimit数に応じた新しいtodo配列を生成し、curItemsにセット
  useEffect(() => {
    const offset = curPage * itemLimit
    const getList = () => {
      setCurItems(todos.slice(offset, offset + itemLimit))
    }
    getList()
  }, [curPage, todos.length])
  {
    return (
      <Tbody>
        {curItems.map(function (data) {
          // curItemsからプロパティを取得
          const { id, status, title, created_day } = data
          return (
            <Tr key={id}>
              <Td fontSize="16px" fontWeight="bold">
                {title}
              </Td>
              <Td>
                <Button rounded="full" bg="green.50" size="lg" fontSize="12px">
                  {status}
                </Button>
              </Td>
              <Td>
                <Select borderColor="tomato" fontSize="16px">
                  <option>High</option>
                  <option>Middle</option>
                  <option>Low</option>
                </Select>
              </Td>
              <Td fontSize="14px">{created_day}</Td>
              <Td fontSize="14px">2020-11-8 18:55</Td>
              <Td>
                <EditIcon w={18} h={18} me={5} />
                <DeleteIcon w={18} h={18} />
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    )
  }
}

export default TodoListChild
