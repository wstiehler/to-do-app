import axios from 'axios';
import { showSuccessNotification, showErrorNotification } from 'src/components/notification';

const useCreateProductByCompanyId = async (formData) => {

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/todolist`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
      }
      }
    );

    if (response.status === 201) {
      showSuccessNotification(`Produto criado com sucesso: ${formData.title}`);
    } else {
      showErrorNotification('Erro ao salvar os dados!', `Status: ${response.error}`);
    }
  } catch (error) {
    showErrorNotification('Erro ao salvar os dados!', 'Entre em contato com o suporte');
  }
};

export default useCreateProductByCompanyId;
