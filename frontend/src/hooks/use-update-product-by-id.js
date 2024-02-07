import axios from 'axios';
import { showSuccessNotification, showErrorNotification } from 'src/components/notification';

const useUpdateProductByCompanyId = async (formData, product_id) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/todolist/${product_id}`, formData, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
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

export default useUpdateProductByCompanyId;
