import { useCallback } from 'react';
import axios from 'axios';
import { showSuccessNotification, showErrorNotification } from 'src/components/notification';
import { useAuth } from './use-auth';

const useTodoInactivateHandler = () => {
  const { token } = useAuth();

  const handleTodoInactivate = useCallback(async (todoList) => {

    const todoListNew = { ...todoList };
    todoListNew.status = "Completed"

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/todolist/${todoList.id}`, todoListNew, {
        headers: {
          'Authorization': `Bearer ${token}`
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
