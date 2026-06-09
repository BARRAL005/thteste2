const ReportPDF = (() => {
  function gerar(summary, state) {
    const existing = document.getElementById('printReport');
    if (existing) existing.remove();
    const box = document.createElement('section');
    box.id = 'printReport';
    box.className = 'print-report';
    box.innerHTML = `
      <h1>TH EMPREENDIMENTOS</h1>
      <h2>Resumo Mensal - ${state.currentMonthLabel}</h2>
      <div class="print-grid">
        ${card('Saldo Atual', br(summary.saldoAtual))}
        ${card('Total Emprestado', br(summary.totalEmprestado))}
        ${card('Total a Receber', br(summary.totalReceber))}
        ${card('Lucro Mensal', br(summary.lucroMensal))}
      </div>
      <h3>Indicadores</h3>
      <table class="print-table"><tbody>
        <tr><th>Total Recebido</th><td>${br(summary.totalRecebido)}</td></tr>
        <tr><th>Lucro Acumulado</th><td>${br(summary.lucroAcumulado)}</td></tr>
        <tr><th>Despesas</th><td>${br(summary.totalDespesas)}</td></tr>
        <tr><th>Clientes Ativos</th><td>${summary.clientesAtivos}</td></tr>
        <tr><th>Clientes Inadimplentes</th><td>${summary.inadimplentes}</td></tr>
      </tbody></table>
      <h3>Empréstimos</h3>
      <table class="print-table"><thead><tr><th>Cliente</th><th>Valor</th><th>Juros</th><th>Parcelas</th><th>Status</th></tr></thead><tbody>
        ${state.data.emprestimos.map(e=>`<tr><td>${esc(e.cliente)}</td><td>${br(e.valor)}</td><td>${e.jurosPercentual || 0}%</td><td>${e.parcelas || ''}</td><td>${esc(e.status)}</td></tr>`).join('')}
      </tbody></table>
      <p>Relatório gerado em ${new Date().toLocaleString('pt-BR')}.</p>`;
    document.body.appendChild(box);
    setTimeout(() => window.print(), 150);
  }
  function card(k,v){return `<div class="print-card"><strong>${k}</strong><br>${v}</div>`}
  function br(v){ return Number(v || 0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
  function esc(v){ return String(v ?? '').replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }
  return { gerar };
})();
