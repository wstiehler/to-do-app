import { useCallback } from 'react';
import axios from 'axios';
import { showSuccessNotification, showErrorNotification } from 'src/components/notification';

const useTodoInactivateHandler = () => {

  const handleTodoInactivate = useCallback(async (todoList) => {

    const todoListNew = { ...todoList };
    todoListNew.status = "Completed"

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/todolist/${todoList.id}`, todoListNew, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });

      if (response.status === 200) {
        showSuccessNotification(`Produto desativado com sucesso. Título: ${todoList.title}`);
      } else {
        showErrorNotification(`Erro ao desativar o produto. Contate o suporte.`);
      }
    } catch (error) {
      showErrorNotification(`Erro ao desativar o produto. Contate o suporte.`);
    }
  }, []);

  return handleTodoInactivate;
};

export default useTodoInactivateHandler;
