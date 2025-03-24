import { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types/transaction';

interface MetricsProps {
  transactions: Transaction[];
  isPanelExpanded: boolean;
}

const Metrics: FC<MetricsProps> = ({ transactions, isPanelExpanded }) => {
  // Função para agrupar transações por mês
  const groupTransactionsByMonth = () => {
    const grouped = transactions.reduce((acc: any, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = {
          monthYear,
          income: 0,
          expense: 0,
          balance: 0
        };
      }
      
      if (transaction.type === 'income') {
        acc[monthYear].income += Number(transaction.amount);
      } else {
        acc[monthYear].expense += Number(transaction.amount);
      }
      
      acc[monthYear].balance = acc[monthYear].income - acc[monthYear].expense;
      
      return acc;
    }, {});

    const sortedData = Object.values(grouped).sort((a: any, b: any) => {
      const [monthA, yearA] = a.monthYear.split('/');
      const [monthB, yearB] = b.monthYear.split('/');
      return new Date(yearA, monthA - 1).getTime() - new Date(yearB, monthB - 1).getTime();
    });

    console.log('Dados agrupados:', sortedData);
    return sortedData;
  };

  const data = groupTransactionsByMonth();

  if (data.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-dark-green mb-4">
          Metrics
        </h1>
        <p className="text-gray-600">No transaction found to generate metrics.</p>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col items-center ${isPanelExpanded ? 'h-[90%]' : 'h-[300px]'}`}>
      <h1 className={`text-2xl font-bold text-dark-green ${isPanelExpanded ? 'mb-8' : 'mb-4'}`}>
      Metrics
      </h1>
      
      <div className="w-full flex-1 bg-bg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ 
            top: isPanelExpanded ? 20 : 10, 
            right: isPanelExpanded ? 30 : 20, 
            left: isPanelExpanded ? 20 : 10, 
            bottom: isPanelExpanded ? 20 : 10 
          }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => `$ ${value.toFixed(2)}`}
              labelFormatter={(label) => `Month/Year: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#4CAF50" 
              name="Receitas"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="expense" 
              stroke="#f44336" 
              name="Despesas"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#2196F3" 
              name="Saldo"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Metrics; 