import axios from 'axios';
import { showSuccessNotification, showErrorNotification } from 'src/components/notification';

const useUpdateTodoByCompanyId = async (formData, Todo_id) => {
  const token = window.sessionStorage.getItem('accessToken')

  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/todolist/${Todo_id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      showSuccessNotification(`Produto atualizado com sucesso! Título: ${formData.title}`);
    } else {
      showErrorNotification('Erro ao atualizar o produto!', `Status: ${response.status}`);
    }
  } catch (error) {
    showErrorNotification('Erro ao atualizar o produto! Contate o suporte.');
  }
};

export default useUpdateTodoByCompanyId;
