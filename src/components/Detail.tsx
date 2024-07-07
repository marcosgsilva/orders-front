import { useEffect, useState, useCallback } from 'react';
import { Orders } from '../models/Orders';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useDetailsContext } from '@providers/DetailProvider';

type DetailProps = {
  id: number;
  closeModal: () => void;
  detail:
    | {
        created_at?: Date;
      }
    | undefined;
};
const DetalhesItem: React.FC<DetailProps> = ({ id, closeModal }) => {
  const { detailOrder } = useDetailsContext();
  const [detail, setDetail] = useState<Orders | null>(null);
  const memoizedDetailOrder = useCallback(detailOrder, []);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const orderDetail = await memoizedDetailOrder(id);
        console.log('DETAIL', orderDetail);
        setDetail(orderDetail);
      } catch (error) {
        console.log('Error ao Buscar detalhes do pedido', error);
      }
    };
    fetchDetail();
  }, [id, memoizedDetailOrder]);

  const formattedDate = detail?.created_at
    ? format(detail.created_at, 'dd MMMM yyyy', { locale: ptBR })
    : 'Data não fornecida';
  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full'>
        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>Detalhes do Pedido:</h3>
              <div className='container mx-auto px-4 py-8'>
                <p className='text-sm text-gray-600 mt-1'>
                  Informações detalhadas sobre o item ID: {id}
                </p>
              </div>
              <div className='px-4 py-2'>
                <p className='text-gray-700'>Nome do Cliente: {detail?.customer_name}</p>
                <p className='text-gray-700'>Descrição: {detail?.description}</p>
                <p className='text-gray-700'>Status: {detail?.status}</p>
                <p className='text-gray-700'>Quantidade: {detail?.quantity}</p>
                <p className='text-gray-700'>Data de Cadastro:{formattedDate}</p>
                <p className='text-gray-700'>Quantidade: {detail?.quantity}</p>
              </div>
            </div>
          </div>

          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              onClick={closeModal}
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesItem;
