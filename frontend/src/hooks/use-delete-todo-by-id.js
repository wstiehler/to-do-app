import { useCallback } from 'react';
import axios from 'axios';
import { showSuccessNotification, showErrorNotification } from 'src/components/notification';
import { useAuth } from './use-auth';

const useTodoDeleteHandler = () => {
  const { token } = useAuth();

  const handleTodoDelete = useCallback(async (todoList) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/todolist/${todoList.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        showSuccessNotification(`Produto deletado com sucesso. Título: ${todoList.title}`);
      } else {
        showErrorNotification(`Erro ao deletar o produto. Contate o suporte.`);
      }
    } catch (error) {
      showErrorNotification(`Erro ao deletar o produto. Contate o suporte.`);
    }
  }, []);

  return handleTodoDelete;
};

export default useTodoDeleteHandler;
