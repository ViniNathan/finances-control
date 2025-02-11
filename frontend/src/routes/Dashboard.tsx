import { useState } from 'react';
import { 
  PlusCircle,  
  Filter, 
  Wallet, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';

// Tipos para as transações
type TransactionType = 'income' | 'expense';

interface Transaction {
  id: string;
  type: TransactionType;
  value: number;
  category: string;
  description: string;
  date: Date;
}

const Dashboard = () => {
  // Estados para gerenciar transações e filtros
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    type: 'income' as TransactionType,
    value: '',
    category: '',
    description: ''
  });
  const [filter, setFilter] = useState({
    type: 'all' as 'all' | TransactionType,
    minValue: '',
    maxValue: '',
    startDate: '',
    endDate: ''
  });

  // Categorias predefinidas
  const categories = {
    income: [
      'Salário', 
      'Freelance', 
      'Investimentos', 
      'Outros'
    ],
    expense: [
      'Alimentação', 
      'Moradia', 
      'Transporte', 
      'Lazer', 
      'Saúde', 
      'Educação', 
      'Outros'
    ]
  };

  // Função para adicionar transação
  const addTransaction = () => {
    if (!newTransaction.value || !newTransaction.category) {
      alert('Preencha todos os campos');
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      value: parseFloat(newTransaction.value),
      category: newTransaction.category,
      description: newTransaction.description,
      date: new Date()
    };

    setTransactions([...transactions, transaction]);
    
    // Limpar formulário
    setNewTransaction({
      type: 'income',
      value: '',
      category: '',
      description: ''
    });
  };

  // Calcular totais
  const calculateTotals = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0);

    return { income, expense, balance: income - expense };
  };

  // Filtrar transações
  const filteredTransactions = transactions.filter(transaction => {
    // Filtro por tipo
    if (filter.type !== 'all' && transaction.type !== filter.type) return false;

    // Filtro por valor mínimo
    if (filter.minValue && transaction.value < parseFloat(filter.minValue)) return false;

    // Filtro por valor máximo
    if (filter.maxValue && transaction.value > parseFloat(filter.maxValue)) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-stone-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Painel Financeiro</h1>

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-600 p-4 rounded flex items-center">
            <TrendingUp className="mr-2" />
            <div>
              <span className="block text-sm">Receitas</span>
              <span className="font-bold">
                R$ {calculateTotals().income.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="bg-red-600 p-4 rounded flex items-center">
            <TrendingDown className="mr-2" />
            <div>
              <span className="block text-sm">Despesas</span>
              <span className="font-bold">
                R$ {calculateTotals().expense.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="bg-blue-600 p-4 rounded flex items-center">
            <Wallet className="mr-2" />
            <div>
              <span className="block text-sm">Saldo</span>
              <span className="font-bold">
                R$ {calculateTotals().balance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Formulário de Nova Transação */}
        <div className="bg-stone-800 p-6 rounded mb-8">
          <h2 className="text-2xl mb-4">Nova Transação</h2>
          <div className="grid grid-cols-2 gap-4">
            <select 
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({
                ...newTransaction, 
                type: e.target.value as TransactionType
              })}
              className="bg-stone-700 p-2 rounded"
            >
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
            
            <select 
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({
                ...newTransaction, 
                category: e.target.value
              })}
              className="bg-stone-700 p-2 rounded"
            >
              <option value="">Selecione Categoria</option>
              {(newTransaction.type === 'income' 
                ? categories.income 
                : categories.expense
              ).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input 
              type="number"
              placeholder="Valor"
              value={newTransaction.value}
              onChange={(e) => setNewTransaction({
                ...newTransaction, 
                value: e.target.value
              })}
              className="bg-stone-700 p-2 rounded"
            />

            <input 
              type="text"
              placeholder="Descrição"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({
                ...newTransaction, 
                description: e.target.value
              })}
              className="bg-stone-700 p-2 rounded"
            />

            <button 
              onClick={addTransaction}
              className="bg-green-600 p-2 rounded col-span-2 flex items-center justify-center"
            >
              <PlusCircle className="mr-2" /> Adicionar Transação
            </button>
          </div>
        </div>

        {/* Área de Filtros */}
        <div className="bg-stone-800 p-6 rounded mb-8">
          <h2 className="text-2xl mb-4 flex items-center">
            <Filter className="mr-2" /> Filtros
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <select 
              value={filter.type}
              onChange={(e) => setFilter({
                ...filter, 
                type: e.target.value as 'all' | TransactionType
              })}
              className="bg-stone-700 p-2 rounded"
            >
              <option value="all">Todos</option>
              <option value="income">Receitas</option>
              <option value="expense">Despesas</option>
            </select>

            <input 
              type="number"
              placeholder="Valor Mínimo"
              value={filter.minValue}
              onChange={(e) => setFilter({
                ...filter, 
                minValue: e.target.value
              })}
              className="bg-stone-700 p-2 rounded"
            />

            <input 
              type="number"
              placeholder="Valor Máximo"
              value={filter.maxValue}
              onChange={(e) => setFilter({
                ...filter, 
                maxValue: e.target.value
              })}
              className="bg-stone-700 p-2 rounded"
            />
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="bg-stone-800 p-6 rounded">
          <h2 className="text-2xl mb-4">Transações</h2>
          {filteredTransactions.length === 0 ? (
            <p className="text-center text-gray-400">
              Nenhuma transação encontrada
            </p>
          ) : (
            <div className="grid gap-4">
              {filteredTransactions.map(transaction => (
                <div 
                  key={transaction.id} 
                  className={`
                    p-4 rounded flex justify-between items-center
                    ${transaction.type === 'income' 
                      ? 'bg-green-800' 
                      : 'bg-red-800'
                    }
                  `}
                >
                  <div>
                    <span className="font-bold">{transaction.category}</span>
                    <p className="text-sm">{transaction.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">
                      R$ {transaction.value.toFixed(2)}
                    </span>
                    <p className="text-sm">
                      {transaction.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;