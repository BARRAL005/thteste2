window.TH_SAMPLE_DATA = {
  clientes: [
    {id:'CLI001',nome:'João Silva',cpf:'123.456.789-00',rg:'12.345.678-9',telefone:'18999990001',whatsapp:'18999990001',endereco:'Presidente Prudente - SP',status:'Em dia',observacoes:'Bom histórico'},
    {id:'CLI002',nome:'Maria Oliveira',cpf:'987.654.321-00',rg:'98.765.432-1',telefone:'18999990002',whatsapp:'18999990002',endereco:'Presidente Prudente - SP',status:'Atrasado',observacoes:'Cobrar com antecedência'},
    {id:'CLI003',nome:'Carlos Santos',cpf:'456.789.123-00',rg:'45.678.912-3',telefone:'18999990003',whatsapp:'18999990003',endereco:'Regente Feijó - SP',status:'Em dia',observacoes:'Cliente recorrente'},
    {id:'CLI004',nome:'Ana Souza',cpf:'321.654.987-00',rg:'32.165.498-7',telefone:'18999990004',whatsapp:'18999990004',endereco:'Álvares Machado - SP',status:'Negociação',observacoes:'Renovação pendente'},
    {id:'CLI005',nome:'Bruno Lima',cpf:'789.123.456-00',rg:'78.912.345-6',telefone:'18999990005',whatsapp:'18999990005',endereco:'Presidente Prudente - SP',status:'Atrasado',observacoes:'Alto risco'}
  ],
  emprestimos: [
    {id:'EMP001',clienteId:'CLI001',cliente:'João Silva',valor:25000,jurosPercentual:12,parcelas:12,vencimento:'2026-06-15',status:'Em dia',garantia:'Contrato digital',multaAtraso:2,jurosDiario:0.4},
    {id:'EMP002',clienteId:'CLI002',cliente:'Maria Oliveira',valor:15000,jurosPercentual:10,parcelas:10,vencimento:'2026-06-12',status:'Atrasado',garantia:'Promissória',multaAtraso:2,jurosDiario:0.5},
    {id:'EMP003',clienteId:'CLI003',cliente:'Carlos Santos',valor:40000,jurosPercentual:18,parcelas:18,vencimento:'2026-06-20',status:'Em dia',garantia:'Veículo',multaAtraso:2,jurosDiario:0.35},
    {id:'EMP004',clienteId:'CLI004',cliente:'Ana Souza',valor:8000,jurosPercentual:8,parcelas:8,vencimento:'2026-06-18',status:'Em dia',garantia:'Contrato',multaAtraso:2,jurosDiario:0.4},
    {id:'EMP005',clienteId:'CLI005',cliente:'Bruno Lima',valor:20000,jurosPercentual:12,parcelas:12,vencimento:'2026-06-10',status:'Atrasado',garantia:'Cheque',multaAtraso:3,jurosDiario:0.6}
  ],
  pagamentos: [
    {data:'2026-06-02',clienteId:'CLI001',cliente:'João Silva',tipo:'Recebimento',valor:2850,forma:'Pix',observacao:'Parcela 3/12'},
    {data:'2026-06-04',clienteId:'CLI003',cliente:'Carlos Santos',tipo:'Recebimento',valor:3200,forma:'Dinheiro',observacao:'Parcela 5/18'},
    {data:'2026-06-06',clienteId:'CLI004',cliente:'Ana Souza',tipo:'Recebimento',valor:1200,forma:'Pix',observacao:'Parcela 1/8'},
    {data:'2026-06-07',clienteId:'CLI002',cliente:'Maria Oliveira',tipo:'Recebimento',valor:1650,forma:'Pix',observacao:'Parcial'},
    {data:'2026-06-09',clienteId:'CLI005',cliente:'Bruno Lima',tipo:'Recebimento',valor:2450,forma:'Pix',observacao:'Parcial'}
  ],
  despesas: [
    {data:'2026-06-03',categoria:'Operacional',descricao:'Sistema e internet',valor:350,tipo:'Empresa'},
    {data:'2026-06-05',categoria:'Pessoal',descricao:'Despesa pessoal',valor:1200,tipo:'Pessoal'},
    {data:'2026-06-08',categoria:'Empresa',descricao:'Documentação e escritório',valor:850,tipo:'Empresa'},
    {data:'2026-06-12',categoria:'Investimento',descricao:'Reserva de capital',valor:5000,tipo:'Investimento'}
  ],
  cartoes: [
    {banco:'Nubank',limite:10000,fechamento:10,vencimento:17,comprasMes:3200,status:'Aberta'},
    {banco:'Inter',limite:15000,fechamento:5,vencimento:12,comprasMes:4100,status:'Aberta'}
  ]
};
